'use server';

import { cookies } from 'next/headers';
import { revalidatePath } from 'next/cache';
import { readCollection, writeCollection, generateId } from '@/lib/crm/db';
import { verifySession } from '@/lib/crm/auth';
import type { Client, Note, Task } from '@/lib/crm/types';

async function getSession() {
  const cookieStore = await cookies();
  const token = cookieStore.get('crm_session')?.value;
  if (!token) throw new Error('Unauthenticated');
  const session = await verifySession(token);
  if (!session) throw new Error('Invalid session');
  return session;
}

export async function createClientAction(data: Omit<Client, 'id' | 'createdAt' | 'updatedAt'>) {
  const session = await getSession();
  const now = new Date().toISOString();
  const client: Client = {
    ...data,
    id: generateId(),
    assignedAgentId: data.assignedAgentId ?? (session.role === 'agent' ? session.staffId : undefined),
    createdAt: now,
    updatedAt: now,
  };
  const clients = await readCollection('clients');
  clients.push(client);
  await writeCollection('clients', clients);
  revalidatePath('/staff/clients');
  return { id: client.id };
}

export async function updateClientAction(id: string, data: Partial<Client>) {
  const session = await getSession();
  const clients = await readCollection('clients');
  const idx = clients.findIndex((c) => c.id === id);
  if (idx === -1) throw new Error('Client not found');
  if (session.role === 'receptionist') throw new Error('Insufficient permissions');
  clients[idx] = { ...clients[idx], ...data, updatedAt: new Date().toISOString() };
  await writeCollection('clients', clients);
  revalidatePath('/staff/clients');
  revalidatePath(`/staff/clients/${id}`);
}

export async function addNoteAction(note: { clientId?: string; caseId?: string; content: string }) {
  const session = await getSession();
  const notes = await readCollection('notes');
  const newNote: Note = {
    id: generateId(),
    ...note,
    authorId: session.staffId,
    authorName: session.name,
    createdAt: new Date().toISOString(),
  };
  notes.push(newNote);
  await writeCollection('notes', notes);
  if (note.clientId) revalidatePath(`/staff/clients/${note.clientId}`);
  if (note.caseId) revalidatePath(`/staff/cases/${note.caseId}`);
}

export async function addTaskAction(task: Omit<Task, 'id' | 'createdAt' | 'completed'>) {
  const session = await getSession();
  const tasks = await readCollection('tasks');
  const newTask: Task = {
    ...task,
    id: generateId(),
    completed: false,
    createdAt: new Date().toISOString(),
  };
  tasks.push(newTask);
  await writeCollection('tasks', tasks);
  revalidatePath('/staff/tasks');
  if (task.clientId) revalidatePath(`/staff/clients/${task.clientId}`);
}

export async function toggleTaskAction(taskId: string) {
  await getSession();
  const tasks = await readCollection('tasks');
  const idx = tasks.findIndex((t) => t.id === taskId);
  if (idx !== -1) {
    tasks[idx].completed = !tasks[idx].completed;
    await writeCollection('tasks', tasks);
  }
  revalidatePath('/staff/tasks');
  revalidatePath('/staff/dashboard');
}
