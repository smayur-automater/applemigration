import type { Priority } from '@/lib/crm/types';

const cfg: Record<Priority, { label: string; bg: string; color: string }> = {
  high:   { label: 'High',   bg: 'rgba(192,57,43,0.12)', color: 'var(--color-error)' },
  medium: { label: 'Medium', bg: 'rgba(230,126,34,0.15)', color: 'var(--color-warning)' },
  low:    { label: 'Low',    bg: 'rgba(39,174,96,0.15)', color: 'var(--color-success)' },
};

export function PriorityBadge({ priority }: { priority: Priority }) {
  const c = cfg[priority];
  return (
    <span className="inline-block text-xs font-semibold px-2 py-0.5 rounded" style={{ backgroundColor: c.bg, color: c.color }}>
      {c.label}
    </span>
  );
}
