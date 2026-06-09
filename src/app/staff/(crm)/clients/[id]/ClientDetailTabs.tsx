'use client';

import { useState, useTransition } from 'react';
import Link from 'next/link';
import { StatusBadge } from '@/components/crm/StatusBadge';
import { PriorityBadge } from '@/components/crm/PriorityBadge';
import { addNoteAction, addTaskAction, toggleTaskAction } from '../actions';
import type { Client, Case, Note, Task, Role } from '@/lib/crm/types';

interface Props {
  client: Client;
  cases: Case[];
  notes: Note[];
  tasks: Task[];
  currentUserId: string;
  currentRole: Role;
}

type Tab = 'cases' | 'notes' | 'tasks';

export function ClientDetailTabs({ client, cases, notes, tasks, currentUserId, currentRole }: Props) {
  const [tab, setTab] = useState<Tab>('cases');
  const [noteText, setNoteText] = useState('');
  const [taskTitle, setTaskTitle] = useState('');
  const [taskDue, setTaskDue] = useState('');
  const [taskPriority, setTaskPriority] = useState<'high' | 'medium' | 'low'>('medium');
  const [isPending, startTransition] = useTransition();

  const tabBtnStyle = (t: Tab) => ({
    color: tab === t ? 'var(--color-navy)' : 'var(--color-charcoal)',
    opacity: tab === t ? 1 : 0.6,
    padding: '8px 16px',
    fontSize: '0.875rem',
    fontWeight: 600,
    cursor: 'pointer',
    background: 'none',
    border: 'none',
    borderBottom: `2px solid ${tab === t ? 'var(--color-gold)' : 'transparent'}`,
  } as React.CSSProperties);

  const submitNote = () => {
    if (!noteText.trim()) return;
    startTransition(async () => {
      await addNoteAction({ clientId: client.id, content: noteText });
      setNoteText('');
    });
  };

  const submitTask = () => {
    if (!taskTitle.trim() || !taskDue) return;
    startTransition(async () => {
      await addTaskAction({
        assignedTo: currentUserId,
        clientId: client.id,
        title: taskTitle,
        dueDate: taskDue,
        priority: taskPriority,
      });
      setTaskTitle('');
      setTaskDue('');
    });
  };

  return (
    <div className="bg-white rounded-xl overflow-hidden" style={{ boxShadow: 'var(--shadow-sm)' }}>
      {/* Tab bar */}
      <div className="flex border-b" style={{ borderColor: 'var(--color-border)' }}>
        {(['cases', 'notes', 'tasks'] as Tab[]).map((t) => (
          <button key={t} style={tabBtnStyle(t)} onClick={() => setTab(t)}>
            {t.charAt(0).toUpperCase() + t.slice(1)}
            <span className="ml-1.5 text-xs px-1.5 py-0.5 rounded-full" style={{ backgroundColor: 'var(--color-surface)', color: 'var(--color-navy)' }}>
              {t === 'cases' ? cases.length : t === 'notes' ? notes.length : tasks.length}
            </span>
          </button>
        ))}
      </div>

      <div className="p-6">
        {/* Cases tab */}
        {tab === 'cases' && (
          <div className="space-y-3">
            {cases.length === 0 ? (
              <p className="text-sm" style={{ color: 'var(--color-charcoal)', opacity: 0.5 }}>No cases yet.</p>
            ) : (
              cases.map((c) => (
                <Link
                  key={c.id}
                  href={`/staff/cases/${c.id}`}
                  className="flex items-center justify-between p-4 rounded-lg border hover:bg-[var(--color-surface)] transition-colors"
                  style={{ borderColor: 'var(--color-border)' }}
                >
                  <div>
                    <p className="font-medium text-sm" style={{ color: 'var(--color-navy)' }}>
                      {c.visaType} — Subclass {c.subclass}
                    </p>
                    <p className="text-xs mt-0.5" style={{ color: 'var(--color-charcoal)', opacity: 0.5 }}>
                      Opened {new Date(c.createdAt).toLocaleDateString('en-AU')}
                    </p>
                  </div>
                  <StatusBadge status={c.status} />
                </Link>
              ))
            )}
            {currentRole !== 'receptionist' && (
              <Link
                href={`/staff/cases?clientId=${client.id}`}
                className="inline-block text-sm font-semibold mt-2"
                style={{ color: 'var(--color-gold)' }}
              >
                + Open New Case
              </Link>
            )}
          </div>
        )}

        {/* Notes tab */}
        {tab === 'notes' && (
          <div className="space-y-4">
            <div>
              <textarea
                value={noteText}
                onChange={(e) => setNoteText(e.target.value)}
                placeholder="Add a note…"
                rows={3}
                className="w-full px-3 py-2 rounded-lg border text-sm resize-none outline-none"
                style={{ borderColor: 'var(--color-border)' }}
              />
              <button
                onClick={submitNote}
                disabled={isPending || !noteText.trim()}
                className="mt-2 px-4 py-2 rounded-full text-sm font-semibold text-white disabled:opacity-60"
                style={{ backgroundColor: 'var(--color-navy)' }}
              >
                {isPending ? 'Saving…' : 'Add Note'}
              </button>
            </div>
            <div className="space-y-3">
              {notes.map((n) => (
                <div key={n.id} className="p-4 rounded-lg" style={{ backgroundColor: 'var(--color-surface)' }}>
                  <p className="text-sm" style={{ color: 'var(--color-charcoal)' }}>{n.content}</p>
                  <p className="text-xs mt-2" style={{ color: 'var(--color-charcoal)', opacity: 0.5 }}>
                    {n.authorName} · {new Date(n.createdAt).toLocaleString('en-AU')}
                  </p>
                </div>
              ))}
              {notes.length === 0 && <p className="text-sm" style={{ color: 'var(--color-charcoal)', opacity: 0.5 }}>No notes yet.</p>}
            </div>
          </div>
        )}

        {/* Tasks tab */}
        {tab === 'tasks' && (
          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <input
                value={taskTitle}
                onChange={(e) => setTaskTitle(e.target.value)}
                placeholder="Task title…"
                className="col-span-1 sm:col-span-1 px-3 py-2 rounded-lg border text-sm outline-none"
                style={{ borderColor: 'var(--color-border)' }}
              />
              <input
                type="date"
                value={taskDue}
                onChange={(e) => setTaskDue(e.target.value)}
                className="px-3 py-2 rounded-lg border text-sm outline-none"
                style={{ borderColor: 'var(--color-border)' }}
              />
              <div className="flex gap-2">
                <select
                  value={taskPriority}
                  onChange={(e) => setTaskPriority(e.target.value as 'high' | 'medium' | 'low')}
                  className="flex-1 px-3 py-2 rounded-lg border text-sm outline-none"
                  style={{ borderColor: 'var(--color-border)' }}
                >
                  <option value="high">High</option>
                  <option value="medium">Medium</option>
                  <option value="low">Low</option>
                </select>
                <button
                  onClick={submitTask}
                  disabled={isPending || !taskTitle.trim() || !taskDue}
                  className="px-4 py-2 rounded-lg text-sm font-semibold text-white disabled:opacity-60"
                  style={{ backgroundColor: 'var(--color-navy)' }}
                >
                  Add
                </button>
              </div>
            </div>
            <div className="space-y-2">
              {tasks.map((t) => (
                <div
                  key={t.id}
                  className="flex items-center gap-3 p-3 rounded-lg border"
                  style={{ borderColor: 'var(--color-border)', opacity: t.completed ? 0.5 : 1 }}
                >
                  <button
                    onClick={() => startTransition(() => toggleTaskAction(t.id))}
                    className="w-5 h-5 rounded border-2 flex items-center justify-center shrink-0"
                    style={{
                      borderColor: t.completed ? 'var(--color-success)' : 'var(--color-border)',
                      backgroundColor: t.completed ? 'var(--color-success)' : 'white',
                    }}
                    aria-label={t.completed ? 'Mark incomplete' : 'Mark complete'}
                  >
                    {t.completed && <span className="text-white text-xs">✓</span>}
                  </button>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm" style={{ color: 'var(--color-navy)', textDecoration: t.completed ? 'line-through' : 'none' }}>
                      {t.title}
                    </p>
                    <p className="text-xs" style={{ color: 'var(--color-charcoal)', opacity: 0.5 }}>
                      Due {new Date(t.dueDate).toLocaleDateString('en-AU')}
                    </p>
                  </div>
                  <PriorityBadge priority={t.priority} />
                </div>
              ))}
              {tasks.length === 0 && <p className="text-sm" style={{ color: 'var(--color-charcoal)', opacity: 0.5 }}>No tasks.</p>}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
