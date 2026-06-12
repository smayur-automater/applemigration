import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { verifySession } from '@/lib/crm/auth';
import { readCollection } from '@/lib/crm/db';
import type { Client, Task } from '@/lib/crm/types';
import { PriorityBadge } from '@/components/crm/PriorityBadge';
import { TaskToggle } from './TaskToggle';

export const metadata = { title: 'Tasks — CRM' };

function clientNameFor(clients: Client[], clientId?: string) {
  return clientId ? clients.find((c) => c.id === clientId)?.name : undefined;
}

function TaskList({ items, clients, emptyMsg }: { items: Task[]; clients: Client[]; emptyMsg: string }) {
  if (items.length === 0) {
    return (
      <p className="text-sm py-2" style={{ color: 'var(--color-slate-600)', opacity: 0.5 }}>{emptyMsg}</p>
    );
  }
  return (
    <ul className="space-y-2">
      {items.map((t) => (
        <li
          key={t.id}
          className="flex items-center gap-3 p-3 rounded-lg bg-white border"
          style={{ borderColor: 'var(--color-border)', opacity: t.completed ? 0.6 : 1 }}
        >
          <TaskToggle taskId={t.id} completed={t.completed} />
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium" style={{ color: 'var(--color-slate-900)', textDecoration: t.completed ? 'line-through' : 'none' }}>
              {t.title}
            </p>
            <p className="text-xs mt-0.5" style={{ color: 'var(--color-slate-600)', opacity: 0.5 }}>
              {clientNameFor(clients, t.clientId) ? `${clientNameFor(clients, t.clientId)} · ` : ''}
              Due {new Date(t.dueDate).toLocaleDateString('en-AU')}
            </p>
          </div>
          <PriorityBadge priority={t.priority} />
        </li>
      ))}
    </ul>
  );
}

function Section({ title, items, clients, accent, emptyMsg }: { title: string; items: Task[]; clients: Client[]; accent?: string; emptyMsg: string }) {
  return (
    <div>
      <h3 className="font-semibold text-sm uppercase tracking-wider mb-3" style={{ color: accent ?? 'var(--color-slate-600)', opacity: accent ? 1 : 0.5 }}>
        {title} ({items.length})
      </h3>
      <TaskList items={items} clients={clients} emptyMsg={emptyMsg} />
    </div>
  );
}

export default async function TasksPage() {
  const cookieStore = await cookies();
  const token = cookieStore.get('crm_session')?.value;
  if (!token) redirect('/staff/login');
  const session = await verifySession(token);
  if (!session) redirect('/staff/login');

  const [tasks, clients] = await Promise.all([
    readCollection('tasks'),
    readCollection('clients'),
  ]);

  const today = new Date().toISOString().slice(0, 10);
  const myTasks = tasks.filter((t) => t.assignedTo === session.staffId);

  const overdue = myTasks.filter((t) => !t.completed && t.dueDate.slice(0, 10) < today);
  const dueToday = myTasks.filter((t) => !t.completed && t.dueDate.slice(0, 10) === today);
  const upcoming = myTasks.filter((t) => !t.completed && t.dueDate.slice(0, 10) > today);
  const completed = myTasks.filter((t) => t.completed).slice(0, 10);

  return (
    <div className="max-w-2xl space-y-8">
      <Section title="Overdue" items={overdue} clients={clients} accent="var(--color-error)" emptyMsg="No overdue tasks 🎉" />
      <Section title="Due Today" items={dueToday} clients={clients} accent="var(--color-warning)" emptyMsg="Nothing due today." />
      <Section title="Upcoming" items={upcoming} clients={clients} emptyMsg="No upcoming tasks." />
      <Section title="Recently Completed" items={completed} clients={clients} emptyMsg="No completed tasks yet." />
    </div>
  );
}
