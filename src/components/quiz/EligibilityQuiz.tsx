"use client";

import Link from "next/link";
import { useReducer, useRef, useState, useTransition } from "react";
import { Button } from "@/components/ui/Button";
import { TextInput } from "@/components/forms/fields";
import { submitQuizLead } from "@/app/eligibility-check/actions";
import { countries } from "@/lib/countries";
import { site } from "@/lib/site";

/* ── Step definitions ─────────────────────────────────────────── */

interface Option {
  label: string;
  value: string;
  note?: string;
}

interface QuizStep {
  id: string;
  question: string;
  subtext?: string;
  type: "single-choice" | "country" | "english" | "contact";
  options?: Option[];
}

const stepPurpose: QuizStep = {
  id: "purpose",
  question: "What is your main goal in Australia?",
  type: "single-choice",
  options: [
    { label: "Study at a school, TAFE, or university", value: "study" },
    { label: "Work in Australia", value: "work" },
    { label: "Join a family member or partner", value: "family" },
    { label: "Invest or start a business", value: "business" },
    { label: "I'm not sure", value: "not-sure" },
  ],
};

const branchSteps: Record<string, QuizStep | null> = {
  study: {
    id: "studyLevel",
    question: "What level of study are you planning?",
    type: "single-choice",
    options: [
      { label: "Primary / Secondary school", value: "school" },
      { label: "English language course", value: "elicos" },
      { label: "TAFE / VET / Certificate", value: "vet" },
      { label: "Bachelor's degree", value: "bachelor" },
      { label: "Postgraduate (Masters / PhD)", value: "postgrad" },
      { label: "Other", value: "other" },
    ],
  },
  work: {
    id: "workType",
    question: "What best describes your work situation?",
    type: "single-choice",
    options: [
      { label: "I have a job offer in Australia", value: "job-offer" },
      { label: "I want to apply without a job offer (points-based)", value: "points" },
      { label: "My employer wants to sponsor me", value: "sponsor" },
      { label: "I want to apply for state/territory nomination", value: "state" },
    ],
  },
  family: {
    id: "relationship",
    question: "What is your relationship to the person in Australia?",
    type: "single-choice",
    options: [
      { label: "Spouse or de facto partner", value: "partner" },
      { label: "Child (under 18)", value: "child" },
      { label: "Parent", value: "parent" },
      { label: "Other family member", value: "other" },
    ],
  },
  business: {
    id: "businessType",
    question: "What type of business activity?",
    type: "single-choice",
    options: [
      { label: "Start a new business", value: "start" },
      { label: "Invest in an existing business", value: "invest" },
      { label: "Manage a business", value: "manage" },
    ],
  },
  "not-sure": null,
};

const stepAge: QuizStep = {
  id: "age",
  question: "How old are you?",
  type: "single-choice",
  options: [
    { label: "Under 18", value: "u18" },
    { label: "18–24", value: "18-24" },
    { label: "25–32", value: "25-32", note: "Maximum age points for skilled visas" },
    { label: "33–44", value: "33-44" },
    { label: "45–54", value: "45-54", note: "Points-tested skilled visas close at 45" },
    { label: "55 or older", value: "55+" },
  ],
};

const stepCountry: QuizStep = {
  id: "country",
  question: "What is your country of citizenship?",
  subtext: "This helps us check working holiday and other bilateral agreements.",
  type: "country",
};

const stepEnglish: QuizStep = {
  id: "english",
  question: "How would you describe your English language ability?",
  type: "english",
  options: [
    { label: "Native / fluent speaker", value: "native" },
    { label: "I have an IELTS / PTE / TOEFL score", value: "tested" },
    { label: "I am still studying English", value: "studying" },
    { label: "I have not taken a test yet", value: "untested" },
  ],
};

const stepVisaStatus: QuizStep = {
  id: "visaStatus",
  question: "What is your current visa situation?",
  type: "single-choice",
  options: [
    { label: "I am currently outside Australia", value: "offshore" },
    { label: "I am in Australia on a valid visa", value: "onshore" },
    { label: "I am in Australia and my visa has expired", value: "expired" },
    { label: "I am an Australian permanent resident", value: "pr" },
  ],
};

const stepContact: QuizStep = {
  id: "contact",
  question: "Where should we send your personalised eligibility report?",
  type: "contact",
};

function buildSteps(purpose?: string): QuizStep[] {
  const steps: QuizStep[] = [stepPurpose];
  if (purpose) {
    const branch = branchSteps[purpose];
    if (branch) steps.push(branch);
  } else {
    steps.push(branchSteps.study!); // placeholder for total count before branch known
  }
  steps.push(stepAge, stepCountry, stepEnglish, stepVisaStatus, stepContact);
  return steps;
}

/* ── Results logic ────────────────────────────────────────────── */

interface VisaResult {
  name: string;
  confidence: "High" | "Medium";
  description: string;
  href: string;
}

function computeResults(answers: Record<string, string>): VisaResult[] {
  const results: VisaResult[] = [];
  const under45 = ["u18", "18-24", "25-32", "33-44"].includes(answers.age);

  switch (answers.purpose) {
    case "study":
      results.push({
        name: "Student Visa (Subclass 500)",
        confidence: "High",
        description:
          "Lets you study a registered course in Australia for up to five years, with work rights of 48 hours per fortnight during term.",
        href: "/services/student-visas",
      });
      if (["bachelor", "postgrad"].includes(answers.studyLevel)) {
        results.push({
          name: "Temporary Graduate Visa (Subclass 485)",
          confidence: "Medium",
          description:
            "After graduating, the 485 gives you post-study work rights — often a stepping stone to skilled migration.",
          href: "/services/skilled-migration",
        });
      }
      break;

    case "work":
      if (answers.workType === "job-offer" || answers.workType === "sponsor") {
        results.push({
          name: "Skills in Demand Visa (Subclass 482)",
          confidence: "High",
          description:
            "Employer-sponsored visa for up to four years with pathways to permanent residency through the 186 visa.",
          href: "/services/employer-sponsored",
        });
        if (under45) {
          results.push({
            name: "Employer Nomination Scheme (Subclass 186)",
            confidence: "Medium",
            description:
              "Direct permanent residency where your employer nominates you for an eligible role.",
            href: "/services/employer-sponsored",
          });
        }
      } else if (answers.workType === "state") {
        results.push({
          name: under45 ? "Skilled Nominated Visa (Subclass 190)" : "Employer Sponsored Pathways",
          confidence: under45 ? "High" : "Medium",
          description: under45
            ? "Permanent residency with nomination from an Australian state or territory — worth 5 extra points."
            : "Points-tested visas close at 45, but employer-sponsored options may remain open depending on your occupation.",
          href: under45 ? "/services/skilled-migration" : "/services/employer-sponsored",
        });
        if (under45) {
          results.push({
            name: "Skilled Work Regional Visa (Subclass 491)",
            confidence: "Medium",
            description:
              "A five-year regional visa worth 15 extra points, with a permanent residency pathway via the 191 visa.",
            href: "/services/skilled-migration",
          });
        }
      } else {
        results.push({
          name: under45 ? "Skilled Independent Visa (Subclass 189)" : "Employer Sponsored Pathways",
          confidence: under45 ? "High" : "Medium",
          description: under45
            ? "Points-tested permanent residency with no sponsor required — live and work anywhere in Australia."
            : "Points-tested visas close at 45, but employer-sponsored options may remain open depending on your occupation.",
          href: under45 ? "/services/skilled-migration" : "/services/employer-sponsored",
        });
        if (under45) {
          results.push({
            name: "Skilled Nominated Visa (Subclass 190)",
            confidence: "Medium",
            description:
              "State nomination adds 5 points to your score — often the difference between waiting and an invitation.",
            href: "/services/skilled-migration",
          });
        }
      }
      break;

    case "family":
      if (answers.relationship === "partner") {
        results.push({
          name: "Partner Visa (Subclass 820/801 or 309/100)",
          confidence: "High",
          description:
            "Two-stage visa for spouses and de facto partners of Australians, leading to permanent residency.",
          href: "/services/partner-family-visas",
        });
      } else if (answers.relationship === "child") {
        results.push({
          name: "Child Visa (Subclass 101/802)",
          confidence: "High",
          description: "Permanent visa for dependent children of Australian citizens or permanent residents.",
          href: "/services/partner-family-visas",
        });
      } else if (answers.relationship === "parent") {
        results.push({
          name: "Contributory Parent Visa (Subclass 143)",
          confidence: "Medium",
          description:
            "Permanent residency for parents of settled Australians. Queues and costs vary significantly between options — advice matters here.",
          href: "/services/partner-family-visas",
        });
      } else {
        results.push({
          name: "Family Visa Options",
          confidence: "Medium",
          description:
            "Options for other family members are limited and case-specific — a consultation is the fastest way to map yours.",
          href: "/services/partner-family-visas",
        });
      }
      break;

    case "business":
      results.push({
        name: "Business & Investment Pathways",
        confidence: "Medium",
        description:
          "Australia's business migration settings are changing, with the National Innovation Visa replacing earlier programs. A consultation will map current options for your situation.",
        href: "/contact",
      });
      break;

    default:
      results.push({
        name: "Student Visa (Subclass 500)",
        confidence: "Medium",
        description: "Studying in Australia is often the most accessible starting point and builds future skilled pathways.",
        href: "/services/student-visas",
      });
      if (under45) {
        results.push({
          name: "Skilled Migration (189/190/491)",
          confidence: "Medium",
          description: "If your occupation is in demand, points-tested visas offer permanent residency without a sponsor.",
          href: "/services/skilled-migration",
        });
      }
  }

  return results.slice(0, 3);
}

/* ── Reducer ──────────────────────────────────────────────────── */

interface QuizState {
  stepIndex: number;
  answers: Record<string, string>;
  finished: boolean;
  skippedContact: boolean;
}

type QuizAction =
  | { type: "answer"; id: string; value: string }
  | { type: "next" }
  | { type: "back" }
  | { type: "finish"; skippedContact: boolean }
  | { type: "reset" };

const initialState: QuizState = {
  stepIndex: 0,
  answers: {},
  finished: false,
  skippedContact: false,
};

function reducer(state: QuizState, action: QuizAction): QuizState {
  switch (action.type) {
    case "answer": {
      const answers = { ...state.answers, [action.id]: action.value };
      if (action.id === "purpose") {
        // Changing purpose invalidates any previous branch answer.
        delete answers.studyLevel;
        delete answers.workType;
        delete answers.relationship;
        delete answers.businessType;
      }
      return { ...state, answers };
    }
    case "next":
      return { ...state, stepIndex: state.stepIndex + 1 };
    case "back":
      return { ...state, stepIndex: Math.max(0, state.stepIndex - 1) };
    case "finish":
      return { ...state, finished: true, skippedContact: action.skippedContact };
    case "reset":
      return initialState;
    default:
      return state;
  }
}

/* ── Component ───────────────────────────────────────────────── */

export function EligibilityQuiz() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [contact, setContact] = useState({ firstName: "", email: "", phone: "", consent: false });
  const [contactError, setContactError] = useState<string | undefined>();
  const [pending, startTransition] = useTransition();
  const liveRef = useRef<HTMLParagraphElement>(null);

  const steps = buildSteps(state.answers.purpose);
  // "Not sure" has no branch step, so the flow may be one step shorter.
  const effectiveSteps =
    state.answers.purpose && !branchSteps[state.answers.purpose]
      ? steps.filter((s) => s.id !== branchSteps.study!.id)
      : steps;
  const total = effectiveSteps.length;
  const step = effectiveSteps[Math.min(state.stepIndex, total - 1)];
  const currentAnswer = state.answers[step.id];

  function next() {
    if (state.stepIndex >= total - 1) return;
    dispatch({ type: "next" });
  }

  function selectAndAdvance(value: string) {
    dispatch({ type: "answer", id: step.id, value });
    // Single-choice selections advance automatically per spec keyboard flow.
    setTimeout(() => dispatch({ type: "next" }), 150);
  }

  function submitContact() {
    if (!contact.firstName.trim()) {
      setContactError("Please enter your first name.");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contact.email)) {
      setContactError("Please enter a valid email address.");
      return;
    }
    if (!contact.consent) {
      setContactError("Please agree to be contacted, or view results without saving.");
      return;
    }
    setContactError(undefined);
    startTransition(async () => {
      const result = await submitQuizLead({
        firstName: contact.firstName,
        email: contact.email,
        phone: contact.phone,
        consent: contact.consent,
        answers: state.answers,
      });
      if (result.ok) {
        dispatch({ type: "finish", skippedContact: false });
      } else {
        setContactError(result.message);
      }
    });
  }

  /* ── Results screen ── */
  if (state.finished) {
    const results = computeResults(state.answers);
    return (
      <div className="mx-auto w-full max-w-[640px] rounded-xl bg-white p-6 shadow-lg sm:p-10">
        <h2 className="font-display text-2xl font-bold text-navy sm:text-3xl">
          {state.skippedContact
            ? "Based on your answers, you may be eligible for:"
            : `Here's What We Found${contact.firstName ? `, ${contact.firstName}` : ""}`}
        </h2>
        <ul className="mt-8 space-y-4">
          {results.map((r) => (
            <li key={r.name} className="rounded-lg border border-border p-6">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <h3 className="font-semibold text-navy">{r.name}</h3>
                <span
                  className={`rounded-full px-3 py-0.5 text-xs font-semibold uppercase tracking-[0.05em] ${
                    r.confidence === "High"
                      ? "bg-success/15 text-success"
                      : "bg-warning/15 text-warning"
                  }`}
                >
                  {r.confidence} confidence
                </span>
              </div>
              <p className="mt-2 text-sm text-charcoal/80">{r.description}</p>
              <Link
                href={r.href}
                className="mt-3 inline-block text-sm font-semibold text-gold-dark underline-offset-2 hover:underline"
              >
                Learn more
              </Link>
            </li>
          ))}
        </ul>
        <Button href="/book" size="lg" className="mt-8 w-full">
          Book a Free Consultation to Confirm
        </Button>
        <button
          onClick={() => dispatch({ type: "reset" })}
          className="mt-4 w-full rounded-full py-2 font-medium text-navy hover:bg-surface"
        >
          Start Again
        </button>
        <p className="mt-6 text-center text-xs text-charcoal/60">
          Results are indicative only and do not constitute migration advice. MARN {site.marn}.
        </p>
      </div>
    );
  }

  const progress = ((state.stepIndex + 1) / total) * 100;

  return (
    <div className="mx-auto w-full max-w-[640px] rounded-xl bg-white p-6 shadow-lg sm:p-10">
      {/* Progress */}
      <div
        role="progressbar"
        aria-valuenow={state.stepIndex + 1}
        aria-valuemin={1}
        aria-valuemax={total}
        aria-label={`Step ${state.stepIndex + 1} of ${total}`}
        className="h-2 w-full overflow-hidden rounded-full bg-surface"
      >
        <div
          className="h-full rounded-full bg-gold transition-[width] duration-(--duration-slow)"
          style={{ width: `${progress}%` }}
        />
      </div>
      <p ref={liveRef} aria-live="polite" className="mt-2 text-sm text-charcoal/60">
        Step {state.stepIndex + 1} of {total}
      </p>

      {/* Question */}
      <div key={step.id} className="mt-6 animate-[fadeIn_200ms_var(--ease-out)]">
        <h2 className="font-display text-xl font-bold text-navy sm:text-2xl">{step.question}</h2>
        {step.subtext && <p className="mt-2 text-sm text-charcoal/70">{step.subtext}</p>}

        {(step.type === "single-choice" || step.type === "english") && (
          <div role="radiogroup" aria-label={step.question} className="mt-6 flex flex-col gap-3">
            {step.options!.map((opt) => {
              const selected = currentAnswer === opt.value;
              return (
                <button
                  key={opt.value}
                  role="radio"
                  aria-checked={selected}
                  onClick={() => selectAndAdvance(opt.value)}
                  className={`rounded-lg border-2 px-5 py-4 text-left transition-colors duration-(--duration-fast) ${
                    selected
                      ? "border-gold bg-gold/10 font-semibold text-navy"
                      : "border-border bg-white text-charcoal hover:border-gold/60"
                  }`}
                >
                  {opt.label}
                  {opt.note && <span className="mt-1 block text-xs text-charcoal/60">{opt.note}</span>}
                </button>
              );
            })}
          </div>
        )}

        {step.type === "country" && (
          <div className="mt-6">
            <label htmlFor="quiz-country" className="sr-only">
              Country of citizenship
            </label>
            <input
              id="quiz-country"
              list="quiz-country-list"
              value={currentAnswer ?? ""}
              onChange={(e) => dispatch({ type: "answer", id: "country", value: e.target.value })}
              placeholder="Start typing your country…"
              className="h-11 w-full rounded-md border border-border bg-white px-3.5 focus:border-gold focus:shadow-[var(--shadow-gold)] focus:outline-none"
            />
            <datalist id="quiz-country-list">
              {countries.map((c) => (
                <option key={c} value={c} />
              ))}
            </datalist>
          </div>
        )}

        {step.type === "contact" && (
          <div className="mt-6 flex flex-col gap-4">
            <div>
              <label htmlFor="quiz-firstName" className="text-sm font-semibold text-navy">
                First Name <span aria-hidden="true" className="text-error">*</span>
              </label>
              <TextInput
                id="quiz-firstName"
                value={contact.firstName}
                onChange={(e) => setContact({ ...contact, firstName: e.target.value })}
                autoComplete="given-name"
                required
                className="mt-1.5"
              />
            </div>
            <div>
              <label htmlFor="quiz-email" className="text-sm font-semibold text-navy">
                Email Address <span aria-hidden="true" className="text-error">*</span>
              </label>
              <TextInput
                id="quiz-email"
                type="email"
                value={contact.email}
                onChange={(e) => setContact({ ...contact, email: e.target.value })}
                autoComplete="email"
                required
                className="mt-1.5"
              />
            </div>
            <div>
              <label htmlFor="quiz-phone" className="text-sm font-semibold text-navy">
                Phone <span className="font-normal text-charcoal/60">(optional)</span>
              </label>
              <TextInput
                id="quiz-phone"
                type="tel"
                value={contact.phone}
                onChange={(e) => setContact({ ...contact, phone: e.target.value })}
                autoComplete="tel"
                className="mt-1.5"
              />
            </div>
            <label className="flex items-start gap-3 text-sm text-charcoal/85">
              <input
                type="checkbox"
                checked={contact.consent}
                onChange={(e) => setContact({ ...contact, consent: e.target.checked })}
                className="mt-0.5 size-[18px] shrink-0 accent-[var(--color-navy)]"
              />
              <span>
                I agree to be contacted by {site.name}.{" "}
                <Link href="/privacy-policy" className="font-semibold text-navy underline underline-offset-2">
                  Privacy Policy
                </Link>{" "}
                applies.
              </span>
            </label>
            {contactError && (
              <p role="alert" className="text-sm text-error">
                {contactError}
              </p>
            )}
            <Button onClick={submitContact} loading={pending} size="lg" className="w-full">
              {pending ? "Sending…" : "See My Results →"}
            </Button>
            <button
              onClick={() => dispatch({ type: "finish", skippedContact: true })}
              className="rounded-full py-2 text-sm font-medium text-charcoal/70 hover:bg-surface hover:text-navy"
            >
              View results without saving
            </button>
          </div>
        )}
      </div>

      {/* Controls */}
      {step.type !== "contact" && (
        <div className="mt-8 flex items-center justify-between">
          {state.stepIndex > 0 ? (
            <Button variant="ghost" size="sm" onClick={() => dispatch({ type: "back" })} aria-label="Go to previous step">
              ← Back
            </Button>
          ) : (
            <span />
          )}
          {(step.type === "country" || step.type === "english") && currentAnswer && (
            <Button size="sm" onClick={next}>
              Next →
            </Button>
          )}
          {step.type === "single-choice" && currentAnswer && (
            <Button size="sm" onClick={next}>
              Next →
            </Button>
          )}
        </div>
      )}
    </div>
  );
}
