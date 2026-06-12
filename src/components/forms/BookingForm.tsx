"use client";

import { useActionState } from "react";
import { Button } from "@/components/ui/Button";
import {
  describedBy,
  FormField,
  SelectInput,
  TextareaInput,
  TextInput,
} from "@/components/forms/fields";
import { submitBooking, type BookingFormState } from "@/app/(public)/book/actions";

const timeSlots = [
  "9:00am – 9:45am",
  "10:00am – 10:45am",
  "11:00am – 11:45am",
  "1:00pm – 1:45pm",
  "2:00pm – 2:45pm",
  "3:00pm – 3:45pm",
  "4:00pm – 4:45pm",
];

const visaTypes = [
  "Student Visa",
  "Skilled Migration",
  "Partner & Family Visa",
  "Employer Sponsored",
  "Education Consulting",
  "Not sure",
];

const consultationTypes = [
  { value: "phone", label: "Phone" },
  { value: "video", label: "Video" },
  { value: "in-person", label: "In-Person" },
];

const initialState: BookingFormState = { status: "idle" };

export function BookingForm() {
  const [state, formAction, pending] = useActionState(submitBooking, initialState);
  const errors = state.fieldErrors ?? {};
  const today = new Date().toISOString().slice(0, 10);

  if (state.status === "success") {
    return (
      <div role="alert" className="rounded-lg border border-success/40 bg-success/10 p-8">
        <h2 className="text-xl font-semibold text-slate-900">Booking Request Received</h2>
        {state.summary ? (
          <>
            <dl className="mt-4 space-y-2 text-sm text-slate-600">
              <div className="flex gap-2">
                <dt className="font-semibold">Name:</dt>
                <dd>{state.summary.name}</dd>
              </div>
              <div className="flex gap-2">
                <dt className="font-semibold">Date:</dt>
                <dd>{state.summary.date}</dd>
              </div>
              <div className="flex gap-2">
                <dt className="font-semibold">Time:</dt>
                <dd>{state.summary.timeSlot} (AEST)</dd>
              </div>
              <div className="flex gap-2">
                <dt className="font-semibold">Type:</dt>
                <dd className="capitalize">{state.summary.consultationType.replace("-", " ")}</dd>
              </div>
            </dl>
            <p className="mt-4 text-sm text-slate-500">
              We&rsquo;ll confirm your appointment by email at{" "}
              <strong>{state.summary.email}</strong> within 1 business day.
            </p>
          </>
        ) : (
          <p className="mt-2 text-sm text-slate-500">We&rsquo;ll be in touch shortly.</p>
        )}
      </div>
    );
  }

  return (
    <form
      action={formAction}
      noValidate
      aria-label="Booking form"
      className="grid grid-cols-1 gap-5 sm:grid-cols-2"
    >
      <FormField id="firstName" label="First Name" required error={errors.firstName}>
        <TextInput
          id="firstName"
          name="firstName"
          autoComplete="given-name"
          required
          aria-required="true"
          aria-describedby={describedBy("firstName", false, !!errors.firstName)}
          invalid={!!errors.firstName}
          disabled={pending}
        />
      </FormField>

      <FormField id="lastName" label="Last Name" required error={errors.lastName}>
        <TextInput
          id="lastName"
          name="lastName"
          autoComplete="family-name"
          required
          aria-required="true"
          aria-describedby={describedBy("lastName", false, !!errors.lastName)}
          invalid={!!errors.lastName}
          disabled={pending}
        />
      </FormField>

      <FormField id="email" label="Email" required error={errors.email}>
        <TextInput
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          required
          aria-required="true"
          aria-describedby={describedBy("email", false, !!errors.email)}
          invalid={!!errors.email}
          disabled={pending}
        />
      </FormField>

      <FormField id="phone" label="Phone" required error={errors.phone} hint="Include country code, e.g. +61 4xx xxx xxx">
        <TextInput
          id="phone"
          name="phone"
          type="tel"
          autoComplete="tel"
          required
          aria-required="true"
          aria-describedby={describedBy("phone", true, !!errors.phone)}
          invalid={!!errors.phone}
          disabled={pending}
        />
      </FormField>

      <FormField id="date" label="Preferred Date" required error={errors.date}>
        <TextInput
          id="date"
          name="date"
          type="date"
          min={today}
          required
          aria-required="true"
          aria-describedby={describedBy("date", false, !!errors.date)}
          invalid={!!errors.date}
          disabled={pending}
        />
      </FormField>

      <FormField id="timeSlot" label="Preferred Time Slot (AEST)" required error={errors.timeSlot}>
        <SelectInput
          id="timeSlot"
          name="timeSlot"
          required
          aria-required="true"
          aria-describedby={describedBy("timeSlot", false, !!errors.timeSlot)}
          invalid={!!errors.timeSlot}
          defaultValue=""
          disabled={pending}
        >
          <option value="">Select a time…</option>
          {timeSlots.map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </SelectInput>
      </FormField>

      <fieldset className="sm:col-span-2">
        <legend className="text-sm font-semibold text-slate-900">
          Consultation Type
          <span aria-hidden="true" className="text-error">
            {" "}*
          </span>
        </legend>
        <div role="radiogroup" aria-label="Consultation type" className="mt-2 flex flex-col gap-3 sm:flex-row">
          {consultationTypes.map((ct) => (
            <label
              key={ct.value}
              className="flex flex-1 cursor-pointer items-center gap-2.5 rounded-md border border-slate-200 bg-white px-4 py-3 text-sm font-medium text-slate-700 transition-colors duration-(--duration-fast) has-checked:border-accent has-checked:bg-accent/10 has-checked:text-slate-900"
            >
              <input
                type="radio"
                name="consultationType"
                value={ct.value}
                required
                disabled={pending}
                className="size-[18px] accent-accent"
              />
              {ct.label}
            </label>
          ))}
        </div>
        {errors.consultationType && (
          <p role="alert" className="mt-1.5 text-sm text-error">
            {errors.consultationType}
          </p>
        )}
      </fieldset>

      <FormField id="visaType" label="Visa Type of Interest" className="sm:col-span-2">
        <SelectInput id="visaType" name="visaType" defaultValue="" disabled={pending}>
          <option value="">Select a visa type…</option>
          {visaTypes.map((v) => (
            <option key={v} value={v}>
              {v}
            </option>
          ))}
        </SelectInput>
      </FormField>

      <FormField
        id="description"
        label="Brief description of your situation"
        className="sm:col-span-2"
      >
        <TextareaInput id="description" name="description" maxLength={1000} disabled={pending} />
      </FormField>

      {/* Honeypot */}
      <input
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        style={{ display: "none" }}
      />

      {state.status === "error" && state.message && (
        <div
          role="alert"
          className="rounded-md border border-error/40 bg-error/10 px-4 py-3 text-sm text-error sm:col-span-2"
        >
          {state.message}
        </div>
      )}

      <div className="sm:col-span-2 sm:flex sm:justify-end">
        <Button type="submit" loading={pending} fullWidthMobile size="lg">
          {pending ? "Sending…" : "Request Booking →"}
        </Button>
      </div>
    </form>
  );
}
