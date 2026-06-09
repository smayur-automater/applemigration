'use client';

import { useState, useTransition } from 'react';
import { createStaffAction } from './actions';
import type { Role } from '@/lib/crm/types';

const inputCls = "w-full px-3 py-2 rounded-lg border text-sm outline-none";
const inputStyle = { borderColor: 'var(--color-border)', color: 'var(--color-charcoal)' };

export function NewStaffForm() {
  const [isPending, startTransition] = useTransition();
  const [result, setResult] = useState<{ success?: boolean; error?: string } | null>(null);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    setResult(null);
    startTransition(async () => {
      const res = await createStaffAction({
        name: fd.get('name') as string,
        email: fd.get('email') as string,
        password: fd.get('password') as string,
        role: fd.get('role') as Role,
      });
      setResult(res as { success?: boolean; error?: string });
      if (res && 'success' in res && res.success) {
        (e.target as HTMLFormElement).reset();
      }
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1" style={{ color: 'var(--color-navy)' }}>Full Name *</label>
          <input name="name" required className={inputCls} style={inputStyle} />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1" style={{ color: 'var(--color-navy)' }}>Email *</label>
          <input name="email" type="email" required className={inputCls} style={inputStyle} />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1" style={{ color: 'var(--color-navy)' }}>Temporary Password *</label>
          <input name="password" type="password" required minLength={8} className={inputCls} style={inputStyle} />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1" style={{ color: 'var(--color-navy)' }}>Role *</label>
          <select name="role" className={inputCls} style={{ ...inputStyle, height: '40px' }}>
            <option value="agent">Agent</option>
            <option value="receptionist">Receptionist</option>
            <option value="admin">Admin</option>
          </select>
        </div>
      </div>

      {result?.error && (
        <p className="text-sm" style={{ color: 'var(--color-error)' }}>{result.error}</p>
      )}
      {result?.success && (
        <p className="text-sm" style={{ color: 'var(--color-success)' }}>✅ Staff member created successfully.</p>
      )}

      <button
        type="submit"
        disabled={isPending}
        className="px-6 py-2.5 rounded-full text-sm font-semibold text-white disabled:opacity-70"
        style={{ backgroundColor: 'var(--color-navy)' }}
      >
        {isPending ? 'Creating…' : 'Create Staff Account'}
      </button>
    </form>
  );
}
