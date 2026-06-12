import type { ClientStatus, CaseStatus } from '@/lib/crm/types';

type Status = ClientStatus | CaseStatus;

const statusConfig: Record<Status, { label: string; bg: string; color: string }> = {
  lead:       { label: 'Lead',       bg: '#EFF6FF', color: '#1D4ED8' },
  active:     { label: 'Active',     bg: '#F0FDF4', color: '#15803D' },
  granted:    { label: 'Granted',    bg: '#F0FDF4', color: '#15803D' },
  closed:     { label: 'Closed',     bg: '#F1F5F9', color: '#475569' },
  assessment: { label: 'Assessment', bg: '#EFF6FF', color: '#1D4ED8' },
  documents:  { label: 'Documents',  bg: '#FFFBEB', color: '#B45309' },
  lodged:     { label: 'Lodged',     bg: '#EFF6FF', color: '#1D4ED8' },
  decision:   { label: 'Decision',   bg: '#FFFBEB', color: '#B45309' },
  refused:    { label: 'Refused',    bg: '#FEF2F2', color: '#B91C1C' },
};

export function StatusBadge({ status }: { status: Status }) {
  const cfg = statusConfig[status] ?? { label: status, bg: '#F1F5F9', color: '#475569' };
  return (
    <span
      className="inline-block rounded px-2 py-0.5 text-xs font-medium capitalize"
      style={{ backgroundColor: cfg.bg, color: cfg.color }}
    >
      {cfg.label}
    </span>
  );
}
