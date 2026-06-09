import { cookies } from 'next/headers';
import { redirect, notFound } from 'next/navigation';
import Link from 'next/link';
import { verifySession } from '@/lib/crm/auth';
import { readCollection } from '@/lib/crm/db';
import { StatusBadge } from '@/components/crm/StatusBadge';
import { ClientDetailTabs } from './ClientDetailTabs';

export default async function ClientDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const cookieStore = await cookies();
  const token = cookieStore.get('crm_session')?.value;
  if (!token) redirect('/staff/login');
  const session = await verifySession(token);
  if (!session) redirect('/staff/login');

  const { id } = await params;

  const [clients, cases, notes, tasks, staff] = await Promise.all([
    readCollection('clients'),
    readCollection('cases'),
    readCollection('notes'),
    readCollection('tasks'),
    readCollection('staff'),
  ]);

  const client = clients.find((c) => c.id === id);
  if (!client) notFound();

  const clientCases = cases.filter((c) => c.clientId === id);
  const clientNotes = notes.filter((n) => n.clientId === id).sort((a, b) => b.createdAt.localeCompare(a.createdAt));
  const clientTasks = tasks.filter((t) => t.clientId === id).sort((a, b) => a.dueDate.localeCompare(b.dueDate));
  const agentName = staff.find((s) => s.id === client.assignedAgentId)?.name;

  return (
    <div className="max-w-4xl space-y-6">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm" style={{ color: 'var(--color-charcoal)', opacity: 0.6 }}>
        <Link href="/staff/clients" className="hover:underline">Clients</Link>
        <span>/</span>
        <span style={{ opacity: 1, color: 'var(--color-navy)' }}>{client.name}</span>
      </div>

      {/* Client header card */}
      <div className="bg-white rounded-xl p-6" style={{ boxShadow: 'var(--shadow-sm)' }}>
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div
                className="w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold text-white"
                style={{ backgroundColor: 'var(--color-navy)' }}
              >
                {client.name.charAt(0)}
              </div>
              <div>
                <h2 className="text-xl font-bold" style={{ color: 'var(--color-navy)' }}>{client.name}</h2>
                <p className="text-sm" style={{ color: 'var(--color-charcoal)', opacity: 0.6 }}>{client.email}</p>
              </div>
            </div>
          </div>
          <StatusBadge status={client.status} />
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6 pt-6 border-t" style={{ borderColor: 'var(--color-border)' }}>
          {[
            { label: 'Citizenship', value: client.citizenship },
            { label: 'Phone', value: client.phone || '—' },
            { label: 'Location', value: client.currentLocation === 'in-australia' ? 'In Australia' : 'Outside Australia' },
            { label: 'Assigned Agent', value: agentName ?? 'Unassigned' },
          ].map((item) => (
            <div key={item.label}>
              <p className="text-xs font-medium uppercase tracking-wider mb-1" style={{ color: 'var(--color-charcoal)', opacity: 0.5 }}>
                {item.label}
              </p>
              <p className="text-sm font-medium" style={{ color: 'var(--color-navy)' }}>{item.value}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Tabs: Cases, Notes, Tasks */}
      <ClientDetailTabs
        client={client}
        cases={clientCases}
        notes={clientNotes}
        tasks={clientTasks}
        currentUserId={session.staffId}
        currentRole={session.role}
      />
    </div>
  );
}
