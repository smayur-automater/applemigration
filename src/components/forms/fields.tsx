import type {
  InputHTMLAttributes,
  SelectHTMLAttributes,
  TextareaHTMLAttributes,
} from "react";

interface FieldWrapperProps {
  id: string;
  label: string;
  required?: boolean;
  error?: string;
  hint?: string;
  children: React.ReactNode;
  className?: string;
}

export function FormField({
  id,
  label,
  required,
  error,
  hint,
  children,
  className = "",
}: FieldWrapperProps) {
  return (
    <div role="group" className={`flex flex-col gap-1.5 ${className}`}>
      <label htmlFor={id} className="text-sm font-semibold text-slate-900">
        {label}
        {required && (
          <span aria-hidden="true" className="text-error">
            {" "}*
          </span>
        )}
      </label>
      {children}
      {hint && (
        <p id={`${id}-hint`} className="text-sm text-slate-400">
          {hint}
        </p>
      )}
      {error && (
        <p id={`${id}-error`} role="alert" className="flex items-center gap-1 text-sm text-error">
          <svg aria-hidden="true" className="size-4 shrink-0" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M18 10a8 8 0 1 1-16 0 8 8 0 0 1 16 0Zm-8-5a.75.75 0 0 1 .75.75v4.5a.75.75 0 0 1-1.5 0v-4.5A.75.75 0 0 1 10 5Zm0 10a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z" clipRule="evenodd" />
          </svg>
          {error}
        </p>
      )}
    </div>
  );
}

const inputBase =
  "h-11 w-full rounded-md border bg-white px-3.5 text-slate-700 transition-[border-color,box-shadow] duration-(--duration-fast) focus:border-accent focus:shadow-[0 0 0 3px rgb(29 78 216 / 0.12)] focus:outline-none disabled:opacity-60";

export function describedBy(id: string, hasHint?: boolean, hasError?: boolean) {
  const ids = [hasHint && `${id}-hint`, hasError && `${id}-error`].filter(Boolean);
  return ids.length ? ids.join(" ") : undefined;
}

export function TextInput({
  invalid,
  className = "",
  ...props
}: InputHTMLAttributes<HTMLInputElement> & { invalid?: boolean }) {
  return (
    <input
      className={`${inputBase} ${invalid ? "border-error bg-error/5" : "border-slate-200"} ${className}`}
      aria-invalid={invalid || undefined}
      {...props}
    />
  );
}

export function SelectInput({
  invalid,
  className = "",
  children,
  ...props
}: SelectHTMLAttributes<HTMLSelectElement> & { invalid?: boolean }) {
  return (
    <div className="relative">
      <select
        className={`${inputBase} appearance-none pr-10 ${invalid ? "border-error bg-error/5" : "border-slate-200"} ${className}`}
        aria-invalid={invalid || undefined}
        {...props}
      >
        {children}
      </select>
      <svg
        aria-hidden="true"
        className="pointer-events-none absolute right-3.5 top-1/2 size-4 -translate-y-1/2 text-slate-400"
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 0 1 1.06.02L10 11.17l3.71-3.94a.75.75 0 1 1 1.08 1.04l-4.25 4.5a.75.75 0 0 1-1.08 0l-4.25-4.5a.75.75 0 0 1 .02-1.06Z" clipRule="evenodd" />
      </svg>
    </div>
  );
}

export function TextareaInput({
  invalid,
  className = "",
  ...props
}: TextareaHTMLAttributes<HTMLTextAreaElement> & { invalid?: boolean }) {
  return (
    <textarea
      className={`min-h-[120px] w-full resize-y rounded-md border bg-white px-3.5 py-2.5 text-slate-700 transition-[border-color,box-shadow] duration-(--duration-fast) focus:border-accent focus:shadow-[0 0 0 3px rgb(29 78 216 / 0.12)] focus:outline-none disabled:opacity-60 ${
        invalid ? "border-error bg-error/5" : "border-slate-200"
      } ${className}`}
      aria-invalid={invalid || undefined}
      {...props}
    />
  );
}
