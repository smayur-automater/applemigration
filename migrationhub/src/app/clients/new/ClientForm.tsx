"use client";

import { useActionState } from "react";
import { createClient, type FormState } from "@/lib/actions";
import type { Agent, Branch, User } from "@/lib/types";

const initialState: FormState = {};

function Field({
  label,
  name,
  error,
  children,
}: {
  label: string;
  name: string;
  error?: string[];
  children: React.ReactNode;
}) {
  return (
    <div>
      <label htmlFor={name} className="mb-1 block text-sm font-medium text-navy">
        {label}
      </label>
      {children}
      {error && (
        <p role="alert" className="mt-1 text-xs text-error">
          {error[0]}
        </p>
      )}
    </div>
  );
}

const inputClass =
  "h-11 w-full rounded-lg border border-line bg-white px-3 text-sm outline-none focus:border-gold";

export function ClientForm({
  agents,
  counsellors,
  branches,
}: {
  agents: Agent[];
  counsellors: User[];
  branches: Branch[];
}) {
  const [state, formAction, pending] = useActionState(createClient, initialState);

  return (
    <form action={formAction} className="max-w-2xl rounded-xl border border-line bg-white p-6">
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="First name" name="firstName" error={state.errors?.firstName}>
          <input id="firstName" name="firstName" required className={inputClass} />
        </Field>
        <Field label="Last name" name="lastName" error={state.errors?.lastName}>
          <input id="lastName" name="lastName" required className={inputClass} />
        </Field>
        <Field label="Email" name="email" error={state.errors?.email}>
          <input id="email" name="email" type="email" required className={inputClass} />
        </Field>
        <Field label="Phone" name="phone" error={state.errors?.phone}>
          <input id="phone" name="phone" type="tel" required placeholder="+61 4xx xxx xxx" className={inputClass} />
        </Field>
        <Field label="Nationality" name="nationality" error={state.errors?.nationality}>
          <input id="nationality" name="nationality" required className={inputClass} />
        </Field>
        <Field label="Date of birth" name="dateOfBirth" error={state.errors?.dateOfBirth}>
          <input id="dateOfBirth" name="dateOfBirth" type="date" required className={inputClass} />
        </Field>
        <Field label="Passport number" name="passportNo" error={state.errors?.passportNo}>
          <input id="passportNo" name="passportNo" required className={inputClass} />
        </Field>
        <Field label="Referred by" name="agentId" error={state.errors?.agentId}>
          <select id="agentId" name="agentId" defaultValue="direct" className={inputClass}>
            <option value="direct">Direct (no agent)</option>
            {agents.map((a) => (
              <option key={a.id} value={a.id}>
                {a.name} — {a.country}
              </option>
            ))}
          </select>
        </Field>
        <Field label="Counsellor" name="counsellorId" error={state.errors?.counsellorId}>
          <select id="counsellorId" name="counsellorId" required className={inputClass}>
            {counsellors.map((u) => (
              <option key={u.id} value={u.id}>
                {u.name}
              </option>
            ))}
          </select>
        </Field>
        <Field label="Branch" name="branchId" error={state.errors?.branchId}>
          <select id="branchId" name="branchId" required className={inputClass}>
            {branches.map((b) => (
              <option key={b.id} value={b.id}>
                {b.name}
              </option>
            ))}
          </select>
        </Field>
      </div>
      <button
        type="submit"
        disabled={pending}
        aria-busy={pending}
        className="mt-6 rounded-full bg-navy px-6 py-2.5 text-sm font-semibold text-white hover:bg-navy-light disabled:opacity-60"
      >
        {pending ? "Creating…" : "Create client"}
      </button>
    </form>
  );
}
