import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { verifySession } from '@/lib/crm/auth';
import { readCollection } from '@/lib/crm/db';
import { PriorityBadge } from '@/components/crm/PriorityBadge';
import { TaskToggle } from './TaskToggle';

export const metadata = { title: 'Tasks — CRM' };

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

  const clientName = (clientId?: string) =>
    clientId ? clients.find((c) => c.id === clientId)?.name : undefined;

  const TaskList = ({ items, emptyMsg }: { items: typeof myTasks; emptyMsg: string }) => (
    items.length === 0 ? (
      <p className="text-sm py-2" style={{ color: 'var(--color-charcoal)', opacity: 0.5 }}>{emptyMsg}</p>
    ) : (
      <ul className="space-y-2">
        {items.map((t) => (
          <li
            key={t.id}
            className="flex items-center gap-3 p-3 rounded-lg bg-white border"
            style={{ borderColor: 'var(--color-border)', opacity: t.completed ? 0.6 : 1 }}
          >
            <TaskToggle taskId={t.id} completed={t.completed} />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium" style={{ color: 'var(--color-navy)', textDecoration: t.completed ? 'line-through' : 'none' }}>
                {t.title}
              </p>
              <p className="text-xs mt-0.5" style={{ color: 'var(--color-charcoal)', opacity: 0.5 }}>
                {clientName(t.clientId) ? `${clientName(t.clientId)} · ` : ''}
                Due {new Date(t.dueDate).toLocaleDateString('en-AU')}
              </p>
            </div>
            <PriorityBadge priority={t.priority} />
          </li>
        ))}
      </ul>
    )
  );

  const Section = ({ title, items, accent, emptyMsg }: { title: string; items: typeof myTasks; accent?: string; emptyMsg: string }) => (
    <div>
      <h3 className="font-semibold text-sm uppercase tracking-wider mb-3" style={{ color: accent ?? 'var(--color-charcoal)', opacity: accent ? 1 : 0.5 }}>
        {title} ({items.length})
      </h3>
      <TaskList items={items} emptyMsg={emptyMsg} />
    </div>
  );

  return (
    <div className="max-w-2xl space-y-8">
      <Section title="Overdue" items={overdue} accent="var(--color-error)" emptyMsg="No overdue tasks 🎉" />
      <Section title="Due Today" items={dueToday} accent="var(--color-warning)" emptyMsg="Nothing due today." />
      <Section title="Upcoming" items={upcoming} emptyMsg="No upcoming tasks." />
      <Section title="Recently Completed" items={completed} emptyMsg="No completed tasks yet." />
    </div>
  );
}
