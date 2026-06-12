import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import { verifySession } from '@/lib/crm/auth';
import { readCollection } from '@/lib/crm/db';
import { StatusBadge } from '@/components/crm/StatusBadge';
import { PriorityBadge } from '@/components/crm/PriorityBadge';

export const metadata = { title: 'Dashboard — CRM' };

export default async function DashboardPage() {
  const cookieStore = await cookies();
  const token = cookieStore.get('crm_session')?.value;
  if (!token) redirect('/staff/login');
  const session = await verifySession(token);
  if (!session) redirect('/staff/login');

  const [clients, cases, tasks, notes] = await Promise.all([
    readCollection('clients'),
    readCollection('cases'),
    readCollection('tasks'),
    readCollection('notes'),
  ]);

  const today = new Date().toISOString().slice(0, 10);

  const myClients = session.role === 'agent'
    ? clients.filter((c) => c.assignedAgentId === session.staffId)
    : clients;

  const activeClients = myClients.filter((c) => c.status === 'active').length;
  const openCases = cases.filter((c) => c.status !== 'granted' && c.status !== 'refused').length;
  const tasksDueToday = tasks.filter(
    (t) => !t.completed && t.assignedTo === session.staffId && t.dueDate.slice(0, 10) <= today
  ).length;
  const newLeads = myClients.filter((c) => c.status === 'lead').length;

  const recentClients = [...myClients]
    .sort((a, b) => b.createdAt.localeCompare(a.createdAt))
    .slice(0, 5);

  const recentTasks = tasks
    .filter((t) => t.assignedTo === session.staffId && !t.completed)
    .sort((a, b) => a.dueDate.localeCompare(b.dueDate))
    .slice(0, 5);

  const stats = [
    { label: 'Active Clients', value: activeClients, icon: '👥', href: '/staff/clients?status=active' },
    { label: 'Open Cases', value: openCases, icon: '📁', href: '/staff/cases' },
    { label: 'Tasks Due', value: tasksDueToday, icon: '⏰', href: '/staff/tasks', alert: tasksDueToday > 0 },
    { label: 'New Leads', value: newLeads, icon: '🌟', href: '/staff/clients?status=lead' },
  ];

  return (
    <div className="space-y-6 max-w-5xl">
      <div>
        <h2 className="text-2xl font-bold mb-1" style={{ color: 'var(--color-slate-900)' }}>
          Welcome back, {session.name.split(' ')[0]} 👋
        </h2>
        <p className="text-sm" style={{ color: 'var(--color-slate-600)', opacity: 0.6 }}>
          {new Date().toLocaleDateString('en-AU', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((s) => (
          <Link
            key={s.label}
            href={s.href}
            className="block bg-white rounded-xl p-5 border-l-4 transition-all duration-150"
            style={{
              boxShadow: 'var(--shadow-sm)',
              borderLeftColor: s.alert ? 'var(--color-error)' : 'var(--color-accent)',
            }}
          >
            <div className="text-2xl mb-2" aria-hidden="true">{s.icon}</div>
            <p className="text-2xl font-bold font-display" style={{ color: s.alert ? 'var(--color-error)' : 'var(--color-slate-900)' }}>
              {s.value}
            </p>
            <p className="text-xs font-medium mt-1" style={{ color: 'var(--color-slate-600)', opacity: 0.7 }}>
              {s.label}
            </p>
          </Link>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Clients */}
        <div className="bg-white rounded-xl p-6" style={{ boxShadow: 'var(--shadow-sm)' }}>
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold" style={{ color: 'var(--color-slate-900)' }}>Recent Clients</h3>
            <Link href="/staff/clients" className="text-xs font-semibold" style={{ color: 'var(--color-accent)' }}>
              View all →
            </Link>
          </div>
          {recentClients.length === 0 ? (
            <p className="text-sm" style={{ color: 'var(--color-slate-600)', opacity: 0.5 }}>No clients yet.</p>
          ) : (
            <ul className="space-y-3">
              {recentClients.map((c) => (
                <li key={c.id}>
                  <Link
                    href={`/staff/clients/${c.id}`}
                    className="flex items-center justify-between hover:bg-[var(--color-slate-100)] rounded-lg px-2 py-1.5 -mx-2 transition-colors"
                  >
                    <div>
                      <p className="text-sm font-medium" style={{ color: 'var(--color-slate-900)' }}>{c.name}</p>
                      <p className="text-xs" style={{ color: 'var(--color-slate-600)', opacity: 0.6 }}>
                        {c.citizenship} · {c.email}
                      </p>
                    </div>
                    <StatusBadge status={c.status} />
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Upcoming Tasks */}
        <div className="bg-white rounded-xl p-6" style={{ boxShadow: 'var(--shadow-sm)' }}>
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold" style={{ color: 'var(--color-slate-900)' }}>My Tasks</h3>
            <Link href="/staff/tasks" className="text-xs font-semibold" style={{ color: 'var(--color-accent)' }}>
              View all →
            </Link>
          </div>
          {recentTasks.length === 0 ? (
            <p className="text-sm" style={{ color: 'var(--color-slate-600)', opacity: 0.5 }}>All caught up! 🎉</p>
          ) : (
            <ul className="space-y-3">
              {recentTasks.map((t) => (
                <li key={t.id} className="flex items-start gap-3">
                  <div className="mt-0.5">
                    <PriorityBadge priority={t.priority} />
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-medium truncate" style={{ color: 'var(--color-slate-900)' }}>{t.title}</p>
                    <p className="text-xs" style={{ color: t.dueDate.slice(0, 10) < today ? 'var(--color-error)' : 'var(--color-slate-600)', opacity: 0.7 }}>
                      Due {new Date(t.dueDate).toLocaleDateString('en-AU')}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {/* Quick actions */}
      <div className="bg-white rounded-xl p-6" style={{ boxShadow: 'var(--shadow-sm)' }}>
        <h3 className="font-semibold mb-4" style={{ color: 'var(--color-slate-900)' }}>Quick Actions</h3>
        <div className="flex flex-wrap gap-3">
          <Link href="/staff/clients/new" className="inline-flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium text-white transition-all duration-150" style={{ backgroundColor: 'var(--color-slate-900)' }}>
            + New Client
          </Link>
          <Link href="/staff/cases" className="inline-flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium border-2 transition-colors duration-150" style={{ borderColor: 'var(--color-accent)', color: 'var(--color-slate-900)' }}>
            View Cases
          </Link>
          <Link href="/staff/tasks" className="inline-flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium border transition-colors duration-150" style={{ borderColor: 'var(--color-border)', color: 'var(--color-slate-900)' }}>
            My Tasks
          </Link>
        </div>
      </div>
    </div>
  );
}
