'use client';

import { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { createClientAction } from '../actions';
import type { StaffUser, Role } from '@/lib/crm/types';

interface Props {
  agents: Pick<StaffUser, 'id' | 'name'>[];
  currentUserId: string;
  currentRole: Role;
}

const inputCls = "w-full px-3 py-2 rounded-lg border text-sm outline-none";
const inputStyle = { borderColor: 'var(--color-border)', color: 'var(--color-slate-600)' };
const labelCls = "block text-sm font-medium mb-1";
const labelStyle = { color: 'var(--color-slate-900)' };

export function NewClientForm({ agents, currentUserId, currentRole }: Props) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const data = {
      name: fd.get('name') as string,
      email: fd.get('email') as string,
      phone: fd.get('phone') as string,
      dateOfBirth: fd.get('dateOfBirth') as string,
      citizenship: fd.get('citizenship') as string,
      currentVisa: fd.get('currentVisa') as string,
      currentLocation: fd.get('currentLocation') as 'in-australia' | 'outside-australia',
      status: fd.get('status') as 'lead' | 'active' | 'granted' | 'closed',
      assignedAgentId: fd.get('assignedAgentId') as string || undefined,
    };
    startTransition(async () => {
      try {
        const result = await createClientAction(data);
        router.push(`/staff/clients/${result.id}`);
      } catch (err) {
        setError('Failed to create client. Please try again.');
      }
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor="name" className={labelCls} style={labelStyle}>Full Name *</label>
          <input id="name" name="name" required className={inputCls} style={inputStyle} />
        </div>
        <div>
          <label htmlFor="email" className={labelCls} style={labelStyle}>Email *</label>
          <input id="email" name="email" type="email" required className={inputCls} style={inputStyle} />
        </div>
        <div>
          <label htmlFor="phone" className={labelCls} style={labelStyle}>Phone</label>
          <input id="phone" name="phone" type="tel" className={inputCls} style={inputStyle} placeholder="+61 4xx xxx xxx" />
        </div>
        <div>
          <label htmlFor="dateOfBirth" className={labelCls} style={labelStyle}>Date of Birth</label>
          <input id="dateOfBirth" name="dateOfBirth" type="date" className={inputCls} style={inputStyle} />
        </div>
        <div>
          <label htmlFor="citizenship" className={labelCls} style={labelStyle}>Citizenship *</label>
          <input id="citizenship" name="citizenship" required className={inputCls} style={inputStyle} placeholder="e.g. India" />
        </div>
        <div>
          <label htmlFor="currentVisa" className={labelCls} style={labelStyle}>Current Visa</label>
          <input id="currentVisa" name="currentVisa" className={inputCls} style={inputStyle} placeholder="e.g. Visitor 600" />
        </div>
        <div>
          <label htmlFor="currentLocation" className={labelCls} style={labelStyle}>Current Location</label>
          <select id="currentLocation" name="currentLocation" className={inputCls} style={{ ...inputStyle, height: '40px' }}>
            <option value="outside-australia">Outside Australia</option>
            <option value="in-australia">In Australia</option>
          </select>
        </div>
        <div>
          <label htmlFor="status" className={labelCls} style={labelStyle}>Status</label>
          <select id="status" name="status" className={inputCls} style={{ ...inputStyle, height: '40px' }}>
            <option value="lead">Lead</option>
            <option value="active">Active</option>
          </select>
        </div>
      </div>

      {(currentRole === 'admin' || currentRole === 'receptionist') && (
        <div>
          <label htmlFor="assignedAgentId" className={labelCls} style={labelStyle}>Assign to Agent</label>
          <select id="assignedAgentId" name="assignedAgentId" className={inputCls} style={{ ...inputStyle, height: '40px' }}>
            <option value="">Unassigned</option>
            {agents.map((a) => (
              <option key={a.id} value={a.id}>{a.name}</option>
            ))}
          </select>
        </div>
      )}

      {error && (
        <p className="text-sm" style={{ color: 'var(--color-error)' }}>{error}</p>
      )}

      <div className="flex gap-3 pt-2">
        <button
          type="submit"
          disabled={isPending}
          className="px-6 py-2.5 rounded-md text-sm font-medium text-white disabled:opacity-70"
          style={{ backgroundColor: 'var(--color-slate-900)' }}
        >
          {isPending ? 'Creating…' : 'Create Client'}
        </button>
        <button
          type="button"
          onClick={() => router.back()}
          className="px-6 py-2.5 rounded-md text-sm font-medium border"
          style={{ borderColor: 'var(--color-border)', color: 'var(--color-slate-900)' }}
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
