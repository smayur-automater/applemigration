"use client";

import { useActionState, useRef, useState } from "react";
import { Button } from "@/components/ui/Button";
import {
  describedBy,
  FormField,
  SelectInput,
  TextareaInput,
  TextInput,
} from "@/components/forms/fields";
import { submitContactForm, type ContactFormState } from "@/app/contact/actions";
import { countries } from "@/lib/countries";
import Link from "next/link";

const visaTypes = [
  "Student Visa",
  "Skilled Migration",
  "Partner & Family Visa",
  "Employer Sponsored",
  "Education Consulting",
  "Not sure",
];

const referralSources = ["Google search", "Referral from a friend", "Social media", "Returning client", "Other"];

const initialState: ContactFormState = { status: "idle" };

type ClientErrors = Partial<Record<string, string>>;

function validateField(name: string, value: string): string | undefined {
  switch (name) {
    case "fullName":
      return value.trim().length >= 2 ? undefined : "Please enter your full name (at least 2 characters).";
    case "email":
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim())
        ? undefined
        : "Please enter a valid email address.";
    case "country":
      return value ? undefined : "Please select your country of citizenship.";
    case "message":
      if (value.trim().length < 20) return "Please tell us a little more (at least 20 characters).";
      if (value.trim().length > 1000) return "Please keep your message under 1000 characters.";
      return undefined;
    default:
      return undefined;
  }
}

export function ContactForm() {
  const [state, formAction, pending] = useActionState(submitContactForm, initialState);
  const [clientErrors, setClientErrors] = useState<ClientErrors>({});
  const formRef = useRef<HTMLFormElement>(null);

  const errors: ClientErrors = { ...state.fieldErrors, ...clientErrors };

  function onBlur(e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    const { name, value } = e.target;
    setClientErrors((prev) => ({ ...prev, [name]: validateField(name, value) }));
  }

  if (state.status === "success") {
    return (
      <div
        role="alert"
        className="rounded-lg border border-success/40 bg-success/10 p-8 text-center"
      >
        <svg aria-hidden="true" className="mx-auto mb-4 size-12 text-success" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="10" />
          <path strokeLinecap="round" strokeLinejoin="round" d="m8.5 12.5 2.5 2.5 5-6" />
        </svg>
        <h3 className="text-xl font-semibold text-navy">
          Thank you{state.firstName ? `, ${state.firstName}` : ""}!
        </h3>
        <p className="mt-2 text-charcoal/80">We&rsquo;ll be in touch within 1 business day.</p>
        <Button
          variant="ghost"
          className="mt-6"
          onClick={() => window.location.reload()}
        >
          Send Another Message
        </Button>
      </div>
    );
  }

  return (
    <form
      ref={formRef}
      action={formAction}
      noValidate
      aria-label="Contact form"
      className="grid grid-cols-1 gap-5 sm:grid-cols-2"
    >
      <FormField id="fullName" label="Full Name" required error={errors.fullName}>
        <TextInput
          id="fullName"
          name="fullName"
          autoComplete="name"
          required
          aria-required="true"
          aria-describedby={describedBy("fullName", false, !!errors.fullName)}
          invalid={!!errors.fullName}
          onBlur={onBlur}
          disabled={pending}
        />
      </FormField>

      <FormField id="email" label="Email Address" required error={errors.email}>
        <TextInput
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          required
          aria-required="true"
          aria-describedby={describedBy("email", false, !!errors.email)}
          invalid={!!errors.email}
          onBlur={onBlur}
          disabled={pending}
        />
      </FormField>

      <FormField
        id="phone"
        label="Phone Number"
        hint="Include country code, e.g. +61 4xx xxx xxx"
        error={errors.phone}
      >
        <TextInput
          id="phone"
          name="phone"
          type="tel"
          autoComplete="tel"
          aria-describedby={describedBy("phone", true, !!errors.phone)}
          invalid={!!errors.phone}
          disabled={pending}
        />
      </FormField>

      <FormField id="visaType" label="Visa Type of Interest" error={errors.visaType}>
        <SelectInput id="visaType" name="visaType" defaultValue="" disabled={pending}>
          <option value="">Select a visa type…</option>
          {visaTypes.map((v) => (
            <option key={v} value={v}>
              {v}
            </option>
          ))}
        </SelectInput>
      </FormField>

      <FormField id="country" label="Country of Citizenship" required error={errors.country}>
        <SelectInput
          id="country"
          name="country"
          required
          aria-required="true"
          aria-describedby={describedBy("country", false, !!errors.country)}
          invalid={!!errors.country}
          defaultValue=""
          onBlur={onBlur}
          disabled={pending}
        >
          <option value="">Select your country…</option>
          {countries.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </SelectInput>
      </FormField>

      <FormField id="location" label="Current Location" error={errors.location}>
        <SelectInput id="location" name="location" defaultValue="" disabled={pending}>
          <option value="">Select…</option>
          <option value="in-australia">In Australia</option>
          <option value="outside-australia">Outside Australia</option>
        </SelectInput>
      </FormField>

      <FormField
        id="message"
        label="How can we help?"
        required
        error={errors.message}
        className="sm:col-span-2"
      >
        <TextareaInput
          id="message"
          name="message"
          required
          minLength={20}
          maxLength={1000}
          aria-required="true"
          aria-describedby={describedBy("message", false, !!errors.message)}
          invalid={!!errors.message}
          onBlur={onBlur}
          disabled={pending}
        />
      </FormField>

      <FormField
        id="referral"
        label="How did you hear about us?"
        error={errors.referral}
        className="sm:col-span-2"
      >
        <SelectInput id="referral" name="referral" defaultValue="" disabled={pending}>
          <option value="">Select…</option>
          {referralSources.map((r) => (
            <option key={r} value={r}>
              {r}
            </option>
          ))}
        </SelectInput>
      </FormField>

      {/* Honeypot — hidden from humans, attractive to bots */}
      <input
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        style={{ display: "none" }}
      />

      <div className="sm:col-span-2">
        <label className="flex items-start gap-3 text-sm text-charcoal/85">
          <input
            type="checkbox"
            name="consent"
            required
            aria-required="true"
            disabled={pending}
            className="mt-0.5 size-[18px] shrink-0 accent-[var(--color-navy)]"
          />
          <span>
            I agree to the{" "}
            <Link href="/privacy-policy" className="font-semibold text-navy underline underline-offset-2 hover:text-gold-dark">
              Privacy Policy
            </Link>
            <span aria-hidden="true" className="text-error">
              {" "}*
            </span>
          </span>
        </label>
        {errors.consent && (
          <p role="alert" className="mt-1.5 text-sm text-error">
            {errors.consent}
          </p>
        )}
      </div>

      {state.status === "error" && state.message && (
        <div
          role="alert"
          className="rounded-md border border-error/40 bg-error/10 px-4 py-3 text-sm text-error sm:col-span-2"
        >
          {state.message}
        </div>
      )}

      <div className="sm:col-span-2 sm:flex sm:justify-end">
        <Button type="submit" loading={pending} fullWidthMobile>
          {pending ? "Sending…" : "Send Message →"}
        </Button>
      </div>
    </form>
  );
}
