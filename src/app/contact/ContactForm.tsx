"use client";

import { useState } from "react";

const visaOptions = [
  "Student Visa (Subclass 500)",
  "Skilled Independent (189)",
  "Skilled Nominated (190/491)",
  "Employer Sponsored (482/186)",
  "Partner Visa (820/801)",
  "Parent Visa",
  "Education Consulting",
  "Not sure",
];

const howHeardOptions = [
  "Google search",
  "Referral from a friend",
  "Social media",
  "Immigration forum",
  "Other",
];

interface FormData {
  fullName: string;
  email: string;
  phone: string;
  visaType: string;
  country: string;
  location: string;
  message: string;
  howHeard: string;
  consent: boolean;
  website: string; // honeypot
}

interface FormErrors {
  fullName?: string;
  email?: string;
  country?: string;
  message?: string;
  consent?: string;
}

type SubmitState = "idle" | "submitting" | "success" | "error";

export function ContactForm() {
  const [form, setForm] = useState<FormData>({
    fullName: "",
    email: "",
    phone: "",
    visaType: "",
    country: "",
    location: "",
    message: "",
    howHeard: "",
    consent: false,
    website: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitState, setSubmitState] = useState<SubmitState>("idle");

  const validate = (): FormErrors => {
    const e: FormErrors = {};
    if (!form.fullName.trim() || form.fullName.trim().length < 2) e.fullName = "Please enter your full name.";
    if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = "Please enter a valid email address.";
    if (!form.country.trim()) e.country = "Please enter your country of citizenship.";
    if (!form.message.trim() || form.message.trim().length < 20) e.message = "Please describe how we can help (minimum 20 characters).";
    if (!form.consent) e.consent = "Please agree to the Privacy Policy to continue.";
    return e;
  };

  const handleBlur = (field: keyof FormErrors) => {
    const e = validate();
    setErrors((prev) => ({ ...prev, [field]: e[field] }));
  };

  const handleSubmit = async (ev: React.FormEvent) => {
    ev.preventDefault();
    if (form.website) return; // honeypot
    const e = validate();
    if (Object.keys(e).length > 0) {
      setErrors(e);
      const firstErrorField = document.querySelector("[aria-invalid='true']") as HTMLElement;
      firstErrorField?.focus();
      return;
    }
    setSubmitState("submitting");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) setSubmitState("success");
      else setSubmitState("error");
    } catch {
      setSubmitState("error");
    }
  };

  if (submitState === "success") {
    return (
      <div role="alert" className="p-6 rounded-xl" style={{ backgroundColor: "#f0fdf4", border: "1px solid var(--color-success)" }}>
        <p className="text-lg font-semibold mb-2" style={{ color: "var(--color-success)" }}>
          ✅ Message sent!
        </p>
        <p className="text-base" style={{ color: "var(--color-charcoal)" }}>
          Thank you, {form.fullName.split(" ")[0]}! We&apos;ll be in touch within 1 business day.
        </p>
        <button
          onClick={() => { setSubmitState("idle"); setForm({ fullName: "", email: "", phone: "", visaType: "", country: "", location: "", message: "", howHeard: "", consent: false, website: "" }); }}
          className="mt-4 px-6 py-2 rounded-full text-sm font-semibold border-2 transition-colors duration-150"
          style={{ borderColor: "var(--color-border)", color: "var(--color-navy)" }}
        >
          Send Another Message
        </button>
      </div>
    );
  }

  const inputStyle = (field?: string) => ({
    border: `1px solid ${field && errors[field as keyof FormErrors] ? "var(--color-error)" : "var(--color-border)"}`,
    borderRadius: "var(--radius-md)",
    height: "44px",
    width: "100%",
    padding: "0 12px",
    fontSize: "1rem",
    color: "var(--color-charcoal)",
    backgroundColor: field && errors[field as keyof FormErrors] ? "rgba(192,57,43,0.05)" : "white",
    outline: "none",
  });

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      aria-label="Contact form"
    >
      {/* Honeypot */}
      <input
        type="text"
        name="website"
        value={form.website}
        onChange={(e) => setForm((p) => ({ ...p, website: e.target.value }))}
        tabIndex={-1}
        aria-hidden="true"
        style={{ display: "none" }}
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {/* Full Name */}
        <div>
          <label htmlFor="fullName" className="block text-sm font-medium mb-1.5" style={{ color: "var(--color-navy)" }}>
            Full Name <span aria-hidden="true">*</span>
          </label>
          <input
            id="fullName"
            type="text"
            value={form.fullName}
            onChange={(e) => setForm((p) => ({ ...p, fullName: e.target.value }))}
            onBlur={() => handleBlur("fullName")}
            aria-required="true"
            aria-invalid={!!errors.fullName}
            aria-describedby={errors.fullName ? "fullName-error" : undefined}
            style={inputStyle("fullName")}
          />
          {errors.fullName && (
            <p id="fullName-error" role="alert" aria-live="polite" className="mt-1 text-xs" style={{ color: "var(--color-error)" }}>
              {errors.fullName}
            </p>
          )}
        </div>

        {/* Email */}
        <div>
          <label htmlFor="email" className="block text-sm font-medium mb-1.5" style={{ color: "var(--color-navy)" }}>
            Email Address <span aria-hidden="true">*</span>
          </label>
          <input
            id="email"
            type="email"
            value={form.email}
            onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))}
            onBlur={() => handleBlur("email")}
            aria-required="true"
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? "email-error" : "email-hint"}
            style={inputStyle("email")}
          />
          {errors.email ? (
            <p id="email-error" role="alert" aria-live="polite" className="mt-1 text-xs" style={{ color: "var(--color-error)" }}>
              {errors.email}
            </p>
          ) : null}
        </div>

        {/* Phone */}
        <div>
          <label htmlFor="phone" className="block text-sm font-medium mb-1.5" style={{ color: "var(--color-navy)" }}>
            Phone Number
          </label>
          <input
            id="phone"
            type="tel"
            value={form.phone}
            onChange={(e) => setForm((p) => ({ ...p, phone: e.target.value }))}
            aria-describedby="phone-hint"
            style={inputStyle()}
          />
          <p id="phone-hint" className="mt-1 text-xs" style={{ color: "var(--color-charcoal)", opacity: 0.6 }}>
            Include country code, e.g. +61 4xx xxx xxx
          </p>
        </div>

        {/* Visa Type */}
        <div>
          <label htmlFor="visaType" className="block text-sm font-medium mb-1.5" style={{ color: "var(--color-navy)" }}>
            Visa Type of Interest
          </label>
          <select
            id="visaType"
            value={form.visaType}
            onChange={(e) => setForm((p) => ({ ...p, visaType: e.target.value }))}
            style={{ ...inputStyle(), padding: "0 12px" }}
          >
            <option value="">Select a visa type…</option>
            {visaOptions.map((o) => <option key={o} value={o}>{o}</option>)}
          </select>
        </div>

        {/* Country */}
        <div>
          <label htmlFor="country" className="block text-sm font-medium mb-1.5" style={{ color: "var(--color-navy)" }}>
            Country of Citizenship <span aria-hidden="true">*</span>
          </label>
          <input
            id="country"
            type="text"
            value={form.country}
            onChange={(e) => setForm((p) => ({ ...p, country: e.target.value }))}
            onBlur={() => handleBlur("country")}
            aria-required="true"
            aria-invalid={!!errors.country}
            aria-describedby={errors.country ? "country-error" : undefined}
            placeholder="e.g. India, China, United Kingdom…"
            style={inputStyle("country")}
          />
          {errors.country && (
            <p id="country-error" role="alert" aria-live="polite" className="mt-1 text-xs" style={{ color: "var(--color-error)" }}>
              {errors.country}
            </p>
          )}
        </div>

        {/* Location */}
        <div>
          <label htmlFor="location" className="block text-sm font-medium mb-1.5" style={{ color: "var(--color-navy)" }}>
            Current Location
          </label>
          <select
            id="location"
            value={form.location}
            onChange={(e) => setForm((p) => ({ ...p, location: e.target.value }))}
            style={{ ...inputStyle(), padding: "0 12px" }}
          >
            <option value="">Select…</option>
            <option value="in-australia">In Australia</option>
            <option value="outside-australia">Outside Australia</option>
          </select>
        </div>
      </div>

      {/* Message */}
      <div className="mt-6">
        <label htmlFor="message" className="block text-sm font-medium mb-1.5" style={{ color: "var(--color-navy)" }}>
          How can we help? <span aria-hidden="true">*</span>
        </label>
        <textarea
          id="message"
          value={form.message}
          onChange={(e) => setForm((p) => ({ ...p, message: e.target.value }))}
          onBlur={() => handleBlur("message")}
          aria-required="true"
          aria-invalid={!!errors.message}
          aria-describedby={errors.message ? "message-error" : "message-hint"}
          maxLength={1000}
          style={{
            border: `1px solid ${errors.message ? "var(--color-error)" : "var(--color-border)"}`,
            borderRadius: "var(--radius-md)",
            minHeight: "120px",
            width: "100%",
            padding: "12px",
            fontSize: "1rem",
            color: "var(--color-charcoal)",
            backgroundColor: errors.message ? "rgba(192,57,43,0.05)" : "white",
            resize: "vertical",
            outline: "none",
          }}
        />
        <p id="message-hint" className="mt-1 text-xs" style={{ color: "var(--color-charcoal)", opacity: 0.6 }}>
          Max 1,000 characters · {form.message.length}/1000 used
        </p>
        {errors.message && (
          <p id="message-error" role="alert" aria-live="polite" className="mt-1 text-xs" style={{ color: "var(--color-error)" }}>
            {errors.message}
          </p>
        )}
      </div>

      {/* How did you hear */}
      <div className="mt-6">
        <label htmlFor="howHeard" className="block text-sm font-medium mb-1.5" style={{ color: "var(--color-navy)" }}>
          How did you hear about us?
        </label>
        <select
          id="howHeard"
          value={form.howHeard}
          onChange={(e) => setForm((p) => ({ ...p, howHeard: e.target.value }))}
          style={{ border: "1px solid var(--color-border)", borderRadius: "var(--radius-md)", height: "44px", width: "100%", padding: "0 12px", fontSize: "1rem", color: "var(--color-charcoal)", backgroundColor: "white", outline: "none" }}
        >
          <option value="">Select…</option>
          {howHeardOptions.map((o) => <option key={o} value={o}>{o}</option>)}
        </select>
      </div>

      {/* Consent */}
      <div className="mt-6">
        <label className="flex items-start gap-3 cursor-pointer">
          <input
            type="checkbox"
            checked={form.consent}
            onChange={(e) => {
              setForm((p) => ({ ...p, consent: e.target.checked }));
              if (errors.consent) setErrors((p) => ({ ...p, consent: undefined }));
            }}
            aria-required="true"
            aria-invalid={!!errors.consent}
            aria-describedby={errors.consent ? "consent-error" : undefined}
            className="mt-0.5 w-4 h-4 shrink-0"
            style={{ accentColor: "var(--color-navy)" }}
          />
          <span className="text-sm" style={{ color: "var(--color-charcoal)" }}>
            I agree to the{" "}
            <a href="/privacy-policy" className="underline" style={{ color: "var(--color-gold)" }}>
              Privacy Policy
            </a>
            <span aria-hidden="true"> *</span>
          </span>
        </label>
        {errors.consent && (
          <p id="consent-error" role="alert" aria-live="polite" className="mt-1 text-xs ml-7" style={{ color: "var(--color-error)" }}>
            {errors.consent}
          </p>
        )}
      </div>

      {/* Error alert */}
      {submitState === "error" && (
        <div role="alert" className="mt-6 p-4 rounded-lg text-sm" style={{ backgroundColor: "rgba(192,57,43,0.08)", border: "1px solid var(--color-error)", color: "var(--color-error)" }}>
          Something went wrong. Please try again or{" "}
          <a href="tel:+61200000000" className="underline">call us directly</a>.
        </div>
      )}

      {/* Submit */}
      <div className="mt-8 flex justify-end">
        <button
          type="submit"
          disabled={submitState === "submitting"}
          aria-busy={submitState === "submitting"}
          className="flex items-center gap-2 px-8 py-4 rounded-full text-base font-semibold text-white transition-all duration-250 disabled:opacity-85 disabled:cursor-not-allowed"
          style={{ backgroundColor: "var(--color-navy)" }}
        >
          {submitState === "submitting" && (
            <svg aria-hidden="true" className="w-5 h-5" style={{ animation: "spin 700ms linear infinite" }} fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
          )}
          {submitState === "submitting" ? "Sending…" : "Send Message →"}
        </button>
      </div>
    </form>
  );
}
