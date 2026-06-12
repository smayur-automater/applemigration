'use client';

import { useTransition } from 'react';
import { toggleStaffActiveAction } from './actions';
import type { Role } from '@/lib/crm/types';

interface SafeStaff {
  id: string;
  name: string;
  email: string;
  role: Role;
  active: boolean;
  createdAt: string;
}

interface Props {
  staff: SafeStaff[];
  currentUserId: string;
}

const roleColors: Record<Role, string> = {
  admin: 'var(--color-error)',
  agent: 'var(--color-accent-dark)',
  receptionist: 'var(--color-sky)',
};

export function StaffTable({ staff, currentUserId }: Props) {
  const [isPending, startTransition] = useTransition();

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b" style={{ borderColor: 'var(--color-border)' }}>
            {['Name', 'Email', 'Role', 'Status', ''].map((h) => (
              <th key={h} className="text-left pb-3 text-xs font-semibold uppercase tracking-wider" style={{ color: 'var(--color-slate-600)', opacity: 0.5 }}>
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {staff.map((s) => (
            <tr key={s.id} className="border-b last:border-0" style={{ borderColor: 'var(--color-border)' }}>
              <td className="py-3 pr-4 font-medium" style={{ color: 'var(--color-slate-900)' }}>
                {s.name} {s.id === currentUserId && <span className="text-xs opacity-50">(you)</span>}
              </td>
              <td className="py-3 pr-4 text-xs" style={{ color: 'var(--color-slate-600)', opacity: 0.7 }}>{s.email}</td>
              <td className="py-3 pr-4">
                <span className="text-xs font-semibold capitalize px-2 py-0.5 rounded-full" style={{ backgroundColor: `${roleColors[s.role]}22`, color: roleColors[s.role] }}>
                  {s.role}
                </span>
              </td>
              <td className="py-3 pr-4">
                <span className="text-xs font-semibold" style={{ color: s.active ? 'var(--color-success)' : 'var(--color-error)' }}>
                  {s.active ? 'Active' : 'Inactive'}
                </span>
              </td>
              <td className="py-3">
                {s.id !== currentUserId && (
                  <button
                    onClick={() => startTransition(async () => { await toggleStaffActiveAction(s.id); })}
                    disabled={isPending}
                    className="text-xs font-semibold hover:underline disabled:opacity-50"
                    style={{ color: s.active ? 'var(--color-error)' : 'var(--color-success)' }}
                  >
                    {s.active ? 'Deactivate' : 'Activate'}
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
