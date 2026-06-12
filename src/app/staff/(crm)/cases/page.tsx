import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import { verifySession } from '@/lib/crm/auth';
import { readCollection } from '@/lib/crm/db';
import { StatusBadge } from '@/components/crm/StatusBadge';
import { NewCaseForm } from './NewCaseForm';

export const metadata = { title: 'Cases — CRM' };

export default async function CasesPage({
  searchParams,
}: {
  searchParams: Promise<{ status?: string; clientId?: string }>;
}) {
  const cookieStore = await cookies();
  const token = cookieStore.get('crm_session')?.value;
  if (!token) redirect('/staff/login');
  const session = await verifySession(token);
  if (!session) redirect('/staff/login');

  const params = await searchParams;
  const [cases, clients, staff] = await Promise.all([
    readCollection('cases'),
    readCollection('clients'),
    readCollection('staff'),
  ]);

  let filtered = session.role === 'agent'
    ? cases.filter((c) => c.assignedAgentId === session.staffId)
    : cases;

  if (params.status) filtered = filtered.filter((c) => c.status === params.status);

  filtered = [...filtered].sort((a, b) => b.createdAt.localeCompare(a.createdAt));

  const clientName = (clientId: string) => clients.find((c) => c.id === clientId)?.name ?? '—';

  const showNewCaseForm = params.clientId && session.role !== 'receptionist';
  const preselectedClient = params.clientId ? clients.find((c) => c.id === params.clientId) : undefined;
  const agentsForForm = staff.filter((s) => s.active && (s.role === 'agent' || s.role === 'admin'));

  return (
    <div className="max-w-5xl space-y-6">
      {showNewCaseForm && preselectedClient && (
        <div className="bg-white rounded-xl p-6" style={{ boxShadow: 'var(--shadow-sm)' }}>
          <h3 className="font-bold text-lg mb-4" style={{ color: 'var(--color-slate-900)' }}>
            New Case for {preselectedClient.name}
          </h3>
          <NewCaseForm
            clientId={preselectedClient.id}
            agents={agentsForForm}
            currentUserId={session.staffId}
          />
        </div>
      )}

      <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between">
        <form className="flex gap-2">
          <select
            name="status"
            defaultValue={params.status}
            className="px-3 py-2 rounded-lg text-sm border"
            style={{ borderColor: 'var(--color-border)', outline: 'none' }}
          >
            <option value="">All statuses</option>
            {['assessment', 'documents', 'lodged', 'decision', 'granted', 'refused'].map((s) => (
              <option key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</option>
            ))}
          </select>
          <button type="submit" className="px-4 py-2 rounded-lg text-sm font-semibold text-white" style={{ backgroundColor: 'var(--color-slate-900)' }}>
            Filter
          </button>
        </form>
      </div>

      <div className="bg-white rounded-xl overflow-hidden" style={{ boxShadow: 'var(--shadow-sm)' }}>
        <div className="px-6 py-4 border-b" style={{ borderColor: 'var(--color-border)' }}>
          <p className="text-sm font-medium" style={{ color: 'var(--color-slate-600)', opacity: 0.6 }}>
            {filtered.length} case{filtered.length !== 1 ? 's' : ''}
          </p>
        </div>
        {filtered.length === 0 ? (
          <div className="p-12 text-center">
            <p className="text-4xl mb-3">📁</p>
            <p className="text-sm" style={{ color: 'var(--color-slate-600)', opacity: 0.5 }}>No cases found.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b" style={{ borderColor: 'var(--color-border)' }}>
                  {['Client', 'Visa', 'Status', 'Lodged', 'Opened'].map((h) => (
                    <th key={h} className="text-left px-6 py-3 text-xs font-semibold uppercase tracking-wider" style={{ color: 'var(--color-slate-600)', opacity: 0.5 }}>
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map((c) => (
                  <tr key={c.id} className="border-b last:border-0 hover:bg-[var(--color-slate-100)] transition-colors" style={{ borderColor: 'var(--color-border)' }}>
                    <td className="px-6 py-4">
                      <Link href={`/staff/cases/${c.id}`} className="font-medium hover:underline" style={{ color: 'var(--color-slate-900)' }}>
                        {clientName(c.clientId)}
                      </Link>
                    </td>
                    <td className="px-6 py-4" style={{ color: 'var(--color-slate-600)' }}>
                      {c.visaType} <span className="text-xs opacity-60">{c.subclass}</span>
                    </td>
                    <td className="px-6 py-4"><StatusBadge status={c.status} /></td>
                    <td className="px-6 py-4 text-xs" style={{ color: 'var(--color-slate-600)', opacity: 0.6 }}>
                      {c.lodgementDate ? new Date(c.lodgementDate).toLocaleDateString('en-AU') : '—'}
                    </td>
                    <td className="px-6 py-4 text-xs" style={{ color: 'var(--color-slate-600)', opacity: 0.5 }}>
                      {new Date(c.createdAt).toLocaleDateString('en-AU')}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
