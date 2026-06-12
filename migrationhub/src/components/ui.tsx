import type { ReactNode } from "react";

export function PageHeader({
  title,
  subtitle,
  action,
}: {
  title: string;
  subtitle?: string;
  action?: ReactNode;
}) {
  return (
    <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
      <div>
        <h1 className="font-display text-3xl font-bold text-navy">{title}</h1>
        {subtitle && <p className="mt-1 text-sm text-charcoal/60">{subtitle}</p>}
      </div>
      {action}
    </div>
  );
}

export function Card({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`rounded-xl border border-line bg-white p-5 ${className}`}>
      {children}
    </div>
  );
}

export function StatCard({
  label,
  value,
  hint,
}: {
  label: string;
  value: string;
  hint?: string;
}) {
  return (
    <Card>
      <p className="text-xs font-semibold tracking-wider text-charcoal/50 uppercase">
        {label}
      </p>
      <p className="mt-2 font-display text-3xl font-bold text-navy">{value}</p>
      {hint && <p className="mt-1 text-xs text-charcoal/60">{hint}</p>}
    </Card>
  );
}

const BADGE_TONES: Record<string, string> = {
  // application stages
  enquiry: "bg-surface text-charcoal",
  applied: "bg-sky/15 text-sky",
  conditional_offer: "bg-warning/15 text-warning",
  unconditional_offer: "bg-sky/15 text-sky",
  gte_gs: "bg-warning/15 text-warning",
  coe_issued: "bg-gold/20 text-gold",
  enrolled: "bg-success/15 text-success",
  deferred: "bg-surface text-charcoal/70",
  withdrawn: "bg-error/10 text-error",
  // client lifecycle
  lead: "bg-surface text-charcoal",
  active: "bg-sky/15 text-sky",
  visa_holder: "bg-gold/20 text-gold",
  archived: "bg-surface text-charcoal/50",
  // visas
  preparing: "bg-surface text-charcoal",
  lodged: "bg-sky/15 text-sky",
  granted: "bg-success/15 text-success",
  refused: "bg-error/10 text-error",
  expired: "bg-error/10 text-error",
  // commissions
  expected: "bg-surface text-charcoal",
  invoiced: "bg-warning/15 text-warning",
  received: "bg-success/15 text-success",
  subagent_paid: "bg-gold/20 text-gold",
  suspended: "bg-error/10 text-error",
};

export function Badge({ value, label }: { value: string; label: string }) {
  return (
    <span
      className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-semibold whitespace-nowrap ${
        BADGE_TONES[value] ?? "bg-surface text-charcoal"
      }`}
    >
      {label}
    </span>
  );
}

export function Table({
  head,
  children,
}: {
  head: string[];
  children: ReactNode;
}) {
  return (
    <div className="overflow-x-auto rounded-xl border border-line bg-white">
      <table className="w-full text-left text-sm">
        <thead>
          <tr className="border-b border-line bg-off-white">
            {head.map((h) => (
              <th
                key={h}
                className="px-4 py-3 text-xs font-semibold tracking-wider text-charcoal/50 uppercase"
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-line">{children}</tbody>
      </table>
    </div>
  );
}

export function EmptyState({ message }: { message: string }) {
  return (
    <p className="rounded-xl border border-dashed border-line bg-white px-4 py-10 text-center text-sm text-charcoal/50">
      {message}
    </p>
  );
}
