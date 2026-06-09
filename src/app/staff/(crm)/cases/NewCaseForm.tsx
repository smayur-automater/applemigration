'use client';

import { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { createCaseAction } from './actions';
import type { StaffUser } from '@/lib/crm/types';

interface Props {
  clientId: string;
  agents: Pick<StaffUser, 'id' | 'name'>[];
  currentUserId: string;
}

const visaTypes = [
  { label: 'Student Visa', subclass: '500' },
  { label: 'Skilled Independent', subclass: '189' },
  { label: 'Skilled Nominated', subclass: '190' },
  { label: 'Skilled Work Regional', subclass: '491' },
  { label: 'Partner Visa (Temporary)', subclass: '820' },
  { label: 'Partner Visa (Permanent)', subclass: '801' },
  { label: 'Partner Visa (Offshore)', subclass: '309/100' },
  { label: 'Temporary Skill Shortage', subclass: '482' },
  { label: 'Employer Nomination Scheme', subclass: '186' },
  { label: 'Visitor Visa', subclass: '600' },
];

export function NewCaseForm({ clientId, agents, currentUserId }: Props) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [selectedVisa, setSelectedVisa] = useState('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const visaEntry = visaTypes.find((v) => `${v.label}|${v.subclass}` === fd.get('visa'));
    startTransition(async () => {
      const result = await createCaseAction({
        clientId,
        visaType: visaEntry?.label ?? (fd.get('visa') as string),
        subclass: visaEntry?.subclass ?? '',
        status: 'assessment',
        assignedAgentId: fd.get('assignedAgentId') as string || currentUserId,
        lodgementDate: fd.get('lodgementDate') as string || undefined,
        notes: fd.get('notes') as string || '',
      });
      router.push(`/staff/cases/${result.id}`);
    });
  };

  const inputCls = "w-full px-3 py-2 rounded-lg border text-sm outline-none";
  const inputStyle = { borderColor: 'var(--color-border)', color: 'var(--color-charcoal)' };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1" style={{ color: 'var(--color-navy)' }}>Visa Type *</label>
          <select
            name="visa"
            required
            className={inputCls}
            style={{ ...inputStyle, height: '40px' }}
          >
            <option value="">Select visa type…</option>
            {visaTypes.map((v) => (
              <option key={v.subclass} value={`${v.label}|${v.subclass}`}>
                {v.label} (Subclass {v.subclass})
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1" style={{ color: 'var(--color-navy)' }}>Assign To</label>
          <select name="assignedAgentId" className={inputCls} style={{ ...inputStyle, height: '40px' }}>
            {agents.map((a) => (
              <option key={a.id} value={a.id} selected={a.id === currentUserId}>{a.name}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1" style={{ color: 'var(--color-navy)' }}>Lodgement Date</label>
          <input type="date" name="lodgementDate" className={inputCls} style={inputStyle} />
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium mb-1" style={{ color: 'var(--color-navy)' }}>Notes</label>
        <textarea name="notes" rows={2} className={inputCls} style={inputStyle} />
      </div>
      <div className="flex gap-3">
        <button type="submit" disabled={isPending} className="px-5 py-2 rounded-full text-sm font-semibold text-white disabled:opacity-70" style={{ backgroundColor: 'var(--color-navy)' }}>
          {isPending ? 'Creating…' : 'Open Case'}
        </button>
        <button type="button" onClick={() => router.back()} className="px-5 py-2 rounded-full text-sm font-semibold border" style={{ borderColor: 'var(--color-border)', color: 'var(--color-navy)' }}>
          Cancel
        </button>
      </div>
    </form>
  );
}
