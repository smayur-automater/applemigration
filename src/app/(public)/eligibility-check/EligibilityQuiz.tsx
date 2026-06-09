"use client";

import { useReducer } from "react";
import Link from "next/link";

type PathType = "student" | "skilled" | "family" | "business" | "general" | null;

interface QuizState {
  step: number;
  path: PathType;
  answers: Record<string, string>;
  direction: "forward" | "back";
  submitted: boolean;
  contact: { firstName: string; email: string; phone: string; consent: boolean };
}

type QuizAction =
  | { type: "ANSWER"; key: string; value: string; nextStep: number; path?: PathType }
  | { type: "BACK" }
  | { type: "SUBMIT_CONTACT"; contact: QuizState["contact"] }
  | { type: "RESTART" };

const TOTAL_STEPS = 7;

function reducer(state: QuizState, action: QuizAction): QuizState {
  switch (action.type) {
    case "ANSWER":
      return {
        ...state,
        step: action.nextStep,
        path: action.path ?? state.path,
        answers: { ...state.answers, [action.key]: action.value },
        direction: "forward",
      };
    case "BACK":
      return { ...state, step: Math.max(1, state.step - 1), direction: "back" };
    case "SUBMIT_CONTACT":
      return { ...state, submitted: true, contact: action.contact };
    case "RESTART":
      return initialState;
    default:
      return state;
  }
}

const initialState: QuizState = {
  step: 1,
  path: null,
  answers: {},
  direction: "forward",
  submitted: false,
  contact: { firstName: "", email: "", phone: "", consent: false },
};

function getResults(answers: Record<string, string>, path: PathType) {
  const results: { name: string; subclass: string; confidence: "High" | "Medium"; desc: string; href: string }[] = [];
  if (path === "student") {
    results.push({ name: "Student Visa", subclass: "Subclass 500", confidence: "High", desc: "For international students enrolling in a registered Australian course at any level.", href: "/services/student-visas" });
  }
  if (path === "skilled") {
    results.push({ name: "Skilled Independent", subclass: "Subclass 189", confidence: "Medium", desc: "Points-tested visa for skilled workers who are not sponsored by an employer or state/territory.", href: "/services/skilled-migration" });
    results.push({ name: "Skilled Nominated", subclass: "Subclass 190", confidence: "Medium", desc: "Points-tested visa for skilled workers nominated by an Australian state or territory.", href: "/services/skilled-migration" });
  }
  if (path === "family") {
    results.push({ name: "Partner Visa", subclass: "Subclass 820/801", confidence: "High", desc: "For the spouse or de facto partner of an Australian citizen, permanent resident, or eligible NZ citizen.", href: "/services/partner-family-visas" });
  }
  if (path === "business" || path === "general" || results.length === 0) {
    results.push({ name: "Skilled Nominated", subclass: "Subclass 190", confidence: "Medium", desc: "A state-nominated pathway for skilled workers, with lower points requirements than the 189.", href: "/services/skilled-migration" });
    results.push({ name: "Partner Visa", subclass: "Subclass 820/801", confidence: "Medium", desc: "For eligible partners of Australian residents or citizens.", href: "/services/partner-family-visas" });
  }
  return results;
}

const radioCardStyle = (selected: boolean) => ({
  border: `2px solid ${selected ? "var(--color-navy)" : "var(--color-border)"}`,
  borderRadius: "var(--radius-lg)",
  padding: "16px",
  cursor: "pointer",
  backgroundColor: selected ? "var(--color-surface)" : "white",
  transition: "border-color 150ms, background-color 150ms",
  display: "flex" as const,
  alignItems: "center" as const,
  gap: 12,
  width: "100%",
  textAlign: "left" as const,
});

export function EligibilityQuiz() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [contactForm, setContactForm] = useReducer(
    (prev: QuizState["contact"], patch: Partial<QuizState["contact"]>) => ({ ...prev, ...patch }),
    initialState.contact
  );

  const progress = (state.step / TOTAL_STEPS) * 100;

  if (state.submitted) {
    const results = getResults(state.answers, state.path);
    return (
      <div className="bg-white rounded-2xl p-8 sm:p-10" style={{ boxShadow: "var(--shadow-lg)" }}>
        <h2 className="font-display font-bold text-2xl mb-2" style={{ color: "var(--color-navy)" }}>
          Here&apos;s What We Found{state.contact.firstName ? `, ${state.contact.firstName}` : ""}
        </h2>
        <p className="text-sm mb-8" style={{ color: "var(--color-charcoal)", opacity: 0.7 }}>
          Based on your answers, you may be eligible for:
        </p>
        <div className="space-y-4 mb-8">
          {results.map((r) => (
            <div key={r.subclass} className="p-6 rounded-xl border" style={{ borderColor: "var(--color-border)", backgroundColor: "var(--color-surface)" }}>
              <div className="flex items-start justify-between mb-2">
                <div>
                  <h3 className="font-semibold text-lg" style={{ color: "var(--color-navy)" }}>{r.name}</h3>
                  <p className="text-xs" style={{ color: "var(--color-charcoal)", opacity: 0.6 }}>{r.subclass}</p>
                </div>
                <span
                  className="text-xs font-semibold px-3 py-1 rounded-full"
                  style={{
                    backgroundColor: r.confidence === "High" ? "rgba(39,174,96,0.15)" : "rgba(212,168,67,0.2)",
                    color: r.confidence === "High" ? "var(--color-success)" : "var(--color-gold-dark)",
                  }}
                >
                  {r.confidence} Match
                </span>
              </div>
              <p className="text-sm mb-3" style={{ color: "var(--color-charcoal)" }}>{r.desc}</p>
              <Link href={r.href} className="text-sm font-semibold" style={{ color: "var(--color-gold)" }}>
                Learn More →
              </Link>
            </div>
          ))}
        </div>
        <Link
          href="/book"
          className="block w-full text-center px-8 py-4 rounded-full text-base font-semibold text-white mb-3 transition-all duration-250"
          style={{ backgroundColor: "var(--color-navy)" }}
        >
          Book a Free Consultation to Discuss Your Options
        </Link>
        <button
          onClick={() => dispatch({ type: "RESTART" })}
          className="block w-full text-center px-8 py-4 rounded-full text-sm font-semibold border-2 transition-colors duration-150"
          style={{ borderColor: "var(--color-border)", color: "var(--color-navy)" }}
        >
          Start Again
        </button>
        <p className="mt-6 text-xs text-center" style={{ color: "var(--color-charcoal)", opacity: 0.5 }}>
          Results are indicative only and do not constitute migration advice. MARN 2318293.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl p-8 sm:p-10" style={{ boxShadow: "var(--shadow-lg)" }}>
      {/* Progress bar */}
      <div className="mb-6">
        <div
          role="progressbar"
          aria-valuenow={state.step}
          aria-valuemin={1}
          aria-valuemax={TOTAL_STEPS}
          aria-label={`Step ${state.step} of ${TOTAL_STEPS}`}
          className="h-2 rounded-full overflow-hidden"
          style={{ backgroundColor: "var(--color-surface)" }}
        >
          <div
            className="h-full rounded-full transition-all duration-400"
            style={{ width: `${progress}%`, backgroundColor: "var(--color-gold)" }}
          />
        </div>
        <p className="text-xs mt-2 text-center" style={{ color: "var(--color-charcoal)", opacity: 0.5 }}>
          Step {state.step} of {TOTAL_STEPS}
        </p>
      </div>

      {/* Step 1 — Purpose */}
      {state.step === 1 && (
        <div>
          <h2 className="font-display font-bold text-2xl mb-2" style={{ color: "var(--color-navy)" }}>
            What is your main goal in Australia?
          </h2>
          <p className="text-sm mb-6" style={{ color: "var(--color-charcoal)", opacity: 0.7 }}>Select the option that best describes your situation.</p>
          <div className="space-y-3">
            {[
              { label: "Study at a school, TAFE, or university", icon: "🎓", path: "student" as PathType, next: 2 },
              { label: "Work in Australia", icon: "💼", path: "skilled" as PathType, next: 3 },
              { label: "Join a family member or partner", icon: "❤️", path: "family" as PathType, next: 4 },
              { label: "Invest or start a business", icon: "🏢", path: "business" as PathType, next: 5 },
              { label: "I'm not sure", icon: "🤔", path: "general" as PathType, next: 5 },
            ].map((opt) => (
              <button
                key={opt.label}
                onClick={() => dispatch({ type: "ANSWER", key: "purpose", value: opt.label, nextStep: opt.next, path: opt.path })}
                style={radioCardStyle(state.answers.purpose === opt.label)}
              >
                <span className="text-2xl" aria-hidden="true">{opt.icon}</span>
                <span className="text-sm font-medium" style={{ color: "var(--color-navy)" }}>{opt.label}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Step 2 — Student: Education Level */}
      {state.step === 2 && (
        <div>
          <h2 className="font-display font-bold text-2xl mb-2" style={{ color: "var(--color-navy)" }}>
            What level of study are you planning?
          </h2>
          <div className="space-y-3 mt-6">
            {[
              "Primary / Secondary school",
              "English language course",
              "TAFE / VET / Certificate",
              "Bachelor's degree",
              "Postgraduate (Masters / PhD)",
              "Other",
            ].map((opt) => (
              <button
                key={opt}
                onClick={() => dispatch({ type: "ANSWER", key: "studyLevel", value: opt, nextStep: 5 })}
                style={radioCardStyle(state.answers.studyLevel === opt)}
              >
                <span className="text-sm font-medium" style={{ color: "var(--color-navy)" }}>{opt}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Step 3 — Skilled: Work Type */}
      {state.step === 3 && (
        <div>
          <h2 className="font-display font-bold text-2xl mb-2" style={{ color: "var(--color-navy)" }}>
            What best describes your work situation?
          </h2>
          <div className="space-y-3 mt-6">
            {[
              "I have a job offer in Australia",
              "I want to apply without a job offer (points-based)",
              "My employer wants to sponsor me",
              "I want to apply for state/territory nomination",
            ].map((opt) => (
              <button
                key={opt}
                onClick={() => dispatch({ type: "ANSWER", key: "workSituation", value: opt, nextStep: 5 })}
                style={radioCardStyle(state.answers.workSituation === opt)}
              >
                <span className="text-sm font-medium" style={{ color: "var(--color-navy)" }}>{opt}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Step 4 — Family: Relationship */}
      {state.step === 4 && (
        <div>
          <h2 className="font-display font-bold text-2xl mb-2" style={{ color: "var(--color-navy)" }}>
            What is your relationship to the person in Australia?
          </h2>
          <div className="space-y-3 mt-6">
            {[
              "Spouse or de facto partner",
              "Child (under 18)",
              "Parent",
              "Other family member",
            ].map((opt) => (
              <button
                key={opt}
                onClick={() => dispatch({ type: "ANSWER", key: "relationship", value: opt, nextStep: 5 })}
                style={radioCardStyle(state.answers.relationship === opt)}
              >
                <span className="text-sm font-medium" style={{ color: "var(--color-navy)" }}>{opt}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Step 5 — Age */}
      {state.step === 5 && (
        <div>
          <h2 className="font-display font-bold text-2xl mb-2" style={{ color: "var(--color-navy)" }}>How old are you?</h2>
          <p className="text-sm mb-6" style={{ color: "var(--color-charcoal)", opacity: 0.7 }}>
            Age affects eligibility for some visa pathways.
          </p>
          <div className="grid grid-cols-2 gap-3">
            {["Under 18", "18–24", "25–32", "33–44", "45–54", "55 or older"].map((opt) => (
              <button
                key={opt}
                onClick={() => dispatch({ type: "ANSWER", key: "age", value: opt, nextStep: 6 })}
                style={{ ...radioCardStyle(state.answers.age === opt), justifyContent: "center" }}
              >
                <span className="text-sm font-semibold" style={{ color: "var(--color-navy)" }}>{opt}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Step 6 — English Proficiency */}
      {state.step === 6 && (
        <div>
          <h2 className="font-display font-bold text-2xl mb-2" style={{ color: "var(--color-navy)" }}>
            How would you describe your English language ability?
          </h2>
          <div className="space-y-3 mt-6">
            {[
              "Native / fluent speaker",
              "I have an IELTS / PTE / TOEFL score",
              "I am still studying English",
              "I have not taken a test yet",
            ].map((opt) => (
              <button
                key={opt}
                onClick={() => dispatch({ type: "ANSWER", key: "english", value: opt, nextStep: 7 })}
                style={radioCardStyle(state.answers.english === opt)}
              >
                <span className="text-sm font-medium" style={{ color: "var(--color-navy)" }}>{opt}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Step 7 — Contact Collection */}
      {state.step === 7 && (
        <div>
          <h2 className="font-display font-bold text-2xl mb-2" style={{ color: "var(--color-navy)" }}>
            Where should we send your eligibility report?
          </h2>
          <p className="text-sm mb-6" style={{ color: "var(--color-charcoal)", opacity: 0.7 }}>
            We&apos;ll personalise your results and send a summary to your email.
          </p>
          <div className="space-y-4">
            <div>
              <label htmlFor="quiz-firstName" className="block text-sm font-medium mb-1.5" style={{ color: "var(--color-navy)" }}>
                First Name *
              </label>
              <input
                id="quiz-firstName"
                type="text"
                value={contactForm.firstName}
                onChange={(e) => setContactForm({ firstName: e.target.value })}
                style={{ border: "1px solid var(--color-border)", borderRadius: "var(--radius-md)", height: "44px", width: "100%", padding: "0 12px", fontSize: "1rem", outline: "none" }}
              />
            </div>
            <div>
              <label htmlFor="quiz-email" className="block text-sm font-medium mb-1.5" style={{ color: "var(--color-navy)" }}>
                Email Address *
              </label>
              <input
                id="quiz-email"
                type="email"
                value={contactForm.email}
                onChange={(e) => setContactForm({ email: e.target.value })}
                style={{ border: "1px solid var(--color-border)", borderRadius: "var(--radius-md)", height: "44px", width: "100%", padding: "0 12px", fontSize: "1rem", outline: "none" }}
              />
            </div>
            <div>
              <label htmlFor="quiz-phone" className="block text-sm font-medium mb-1.5" style={{ color: "var(--color-navy)" }}>
                Phone (optional)
              </label>
              <input
                id="quiz-phone"
                type="tel"
                value={contactForm.phone}
                onChange={(e) => setContactForm({ phone: e.target.value })}
                style={{ border: "1px solid var(--color-border)", borderRadius: "var(--radius-md)", height: "44px", width: "100%", padding: "0 12px", fontSize: "1rem", outline: "none" }}
              />
            </div>
            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={contactForm.consent}
                onChange={(e) => setContactForm({ consent: e.target.checked })}
                className="mt-0.5 w-4 h-4 shrink-0"
                style={{ accentColor: "var(--color-navy)" }}
              />
              <span className="text-xs" style={{ color: "var(--color-charcoal)" }}>
                I agree to be contacted by Apple Education & Immigration.{" "}
                <a href="/privacy-policy" className="underline" style={{ color: "var(--color-gold)" }}>Privacy Policy</a> applies.
              </span>
            </label>
          </div>
          <button
            onClick={() => {
              if (!contactForm.firstName || !contactForm.email) return;
              dispatch({ type: "SUBMIT_CONTACT", contact: contactForm });
            }}
            className="w-full mt-6 px-8 py-4 rounded-full text-base font-semibold text-white transition-all duration-250"
            style={{ backgroundColor: "var(--color-navy)" }}
          >
            See My Results →
          </button>
          <button
            onClick={() => dispatch({ type: "SUBMIT_CONTACT", contact: contactForm })}
            className="w-full mt-3 text-sm text-center transition-colors duration-150"
            style={{ color: "var(--color-charcoal)", opacity: 0.6 }}
          >
            View results without saving
          </button>
        </div>
      )}

      {/* Back button */}
      {state.step > 1 && (
        <div className="mt-6 pt-6 border-t" style={{ borderColor: "var(--color-border)" }}>
          <button
            onClick={() => dispatch({ type: "BACK" })}
            aria-label="Go to previous step"
            className="text-sm font-medium transition-colors duration-150"
            style={{ color: "var(--color-navy)" }}
          >
            ← Back
          </button>
        </div>
      )}
    </div>
  );
}
