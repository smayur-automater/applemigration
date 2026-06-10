import type { ClientStatus, CaseStatus } from '@/lib/crm/types';

type Status = ClientStatus | CaseStatus;

const statusConfig: Record<Status, { label: string; bg: string; color: string }> = {
  lead:       { label: 'Lead',       bg: 'rgba(74,144,196,0.15)',  color: 'var(--color-sky)' },
  active:     { label: 'Active',     bg: 'rgba(39,174,96,0.15)',   color: 'var(--color-success)' },
  granted:    { label: 'Granted',    bg: 'rgba(212,168,67,0.2)',   color: 'var(--color-gold-dark)' },
  closed:     { label: 'Closed',     bg: 'rgba(45,45,45,0.1)',     color: 'var(--color-charcoal)' },
  assessment: { label: 'Assessment', bg: 'rgba(74,144,196,0.15)',  color: 'var(--color-sky)' },
  documents:  { label: 'Documents',  bg: 'rgba(230,126,34,0.15)', color: 'var(--color-warning)' },
  lodged:     { label: 'Lodged',     bg: 'rgba(212,168,67,0.2)',   color: 'var(--color-gold-dark)' },
  decision:   { label: 'Decision',   bg: 'rgba(74,144,196,0.15)',  color: 'var(--color-sky)' },
  refused:    { label: 'Refused',    bg: 'rgba(192,57,43,0.12)',   color: 'var(--color-error)' },
};

export function StatusBadge({ status }: { status: Status }) {
  const cfg = statusConfig[status] ?? { label: status, bg: 'var(--color-surface)', color: 'var(--color-charcoal)' };
  return (
    <span
      className="inline-block text-xs font-semibold px-2.5 py-1 rounded-full"
      style={{ backgroundColor: cfg.bg, color: cfg.color }}
    >
      {cfg.label}
    </span>
  );
}
