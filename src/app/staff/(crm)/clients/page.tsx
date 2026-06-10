import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import { verifySession } from '@/lib/crm/auth';
import { readCollection } from '@/lib/crm/db';
import { StatusBadge } from '@/components/crm/StatusBadge';

export const metadata = { title: 'Clients — CRM' };

export default async function ClientsPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; status?: string }>;
}) {
  const cookieStore = await cookies();
  const token = cookieStore.get('crm_session')?.value;
  if (!token) redirect('/staff/login');
  const session = await verifySession(token);
  if (!session) redirect('/staff/login');

  const params = await searchParams;
  const [clients, staff] = await Promise.all([
    readCollection('clients'),
    readCollection('staff'),
  ]);

  let filtered = session.role === 'agent'
    ? clients.filter((c) => c.assignedAgentId === session.staffId)
    : clients;

  if (params.q) {
    const q = params.q.toLowerCase();
    filtered = filtered.filter(
      (c) =>
        c.name.toLowerCase().includes(q) ||
        c.email.toLowerCase().includes(q) ||
        c.citizenship.toLowerCase().includes(q)
    );
  }
  if (params.status) {
    filtered = filtered.filter((c) => c.status === params.status);
  }

  filtered = [...filtered].sort((a, b) => b.createdAt.localeCompare(a.createdAt));

  const agentName = (agentId?: string) =>
    staff.find((s) => s.id === agentId)?.name ?? '—';

  return (
    <div className="max-w-5xl space-y-4">
      {/* Header row */}
      <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between">
        <div className="flex flex-col sm:flex-row gap-2 flex-1">
          <form className="flex gap-2 flex-1">
            <input
              name="q"
              defaultValue={params.q}
              placeholder="Search clients…"
              className="flex-1 px-4 py-2 rounded-lg text-sm border"
              style={{ borderColor: 'var(--color-border)', outline: 'none', maxWidth: 280 }}
            />
            <select
              name="status"
              defaultValue={params.status}
              className="px-3 py-2 rounded-lg text-sm border"
              style={{ borderColor: 'var(--color-border)', outline: 'none' }}
            >
              <option value="">All statuses</option>
              <option value="lead">Lead</option>
              <option value="active">Active</option>
              <option value="granted">Granted</option>
              <option value="closed">Closed</option>
            </select>
            <button
              type="submit"
              className="px-4 py-2 rounded-lg text-sm font-semibold text-white"
              style={{ backgroundColor: 'var(--color-navy)' }}
            >
              Filter
            </button>
          </form>
        </div>
        <Link
          href="/staff/clients/new"
          className="shrink-0 px-4 py-2 rounded-full text-sm font-semibold text-white"
          style={{ backgroundColor: 'var(--color-gold)', color: 'var(--color-navy)' }}
        >
          + New Client
        </Link>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl overflow-hidden" style={{ boxShadow: 'var(--shadow-sm)' }}>
        <div className="px-6 py-4 border-b flex items-center justify-between" style={{ borderColor: 'var(--color-border)' }}>
          <p className="text-sm font-medium" style={{ color: 'var(--color-charcoal)', opacity: 0.6 }}>
            {filtered.length} client{filtered.length !== 1 ? 's' : ''}
          </p>
        </div>

        {filtered.length === 0 ? (
          <div className="p-12 text-center">
            <p className="text-4xl mb-3">👥</p>
            <p className="text-sm" style={{ color: 'var(--color-charcoal)', opacity: 0.5 }}>No clients found.</p>
            <Link href="/staff/clients/new" className="inline-block mt-4 text-sm font-semibold" style={{ color: 'var(--color-gold)' }}>
              Add your first client →
            </Link>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b" style={{ borderColor: 'var(--color-border)' }}>
                  {['Name', 'Citizenship', 'Status', 'Assigned Agent', 'Created'].map((h) => (
                    <th key={h} className="text-left px-6 py-3 text-xs font-semibold uppercase tracking-wider" style={{ color: 'var(--color-charcoal)', opacity: 0.5 }}>
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map((c) => (
                  <tr
                    key={c.id}
                    className="border-b last:border-0 hover:bg-[var(--color-surface)] transition-colors"
                    style={{ borderColor: 'var(--color-border)' }}
                  >
                    <td className="px-6 py-4">
                      <Link href={`/staff/clients/${c.id}`} className="font-medium hover:underline" style={{ color: 'var(--color-navy)' }}>
                        {c.name}
                      </Link>
                      <p className="text-xs mt-0.5" style={{ color: 'var(--color-charcoal)', opacity: 0.5 }}>{c.email}</p>
                    </td>
                    <td className="px-6 py-4" style={{ color: 'var(--color-charcoal)' }}>{c.citizenship}</td>
                    <td className="px-6 py-4"><StatusBadge status={c.status} /></td>
                    <td className="px-6 py-4" style={{ color: 'var(--color-charcoal)' }}>{agentName(c.assignedAgentId)}</td>
                    <td className="px-6 py-4 text-xs" style={{ color: 'var(--color-charcoal)', opacity: 0.5 }}>
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
