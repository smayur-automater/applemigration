'use server';

import { cookies } from 'next/headers';
import { revalidatePath } from 'next/cache';
import { readCollection, writeCollection, generateId } from '@/lib/crm/db';
import { verifySession } from '@/lib/crm/auth';
import type { Case } from '@/lib/crm/types';

async function getSession() {
  const cookieStore = await cookies();
  const token = cookieStore.get('crm_session')?.value;
  if (!token) throw new Error('Unauthenticated');
  const session = await verifySession(token);
  if (!session) throw new Error('Invalid session');
  return session;
}

export async function createCaseAction(data: Omit<Case, 'id' | 'createdAt' | 'updatedAt'>) {
  const session = await getSession();
  if (session.role === 'receptionist') throw new Error('Insufficient permissions');
  const now = new Date().toISOString();
  const newCase: Case = {
    ...data,
    id: generateId(),
    createdAt: now,
    updatedAt: now,
  };
  const cases = await readCollection('cases');
  cases.push(newCase);
  await writeCollection('cases', cases);
  revalidatePath('/staff/cases');
  revalidatePath(`/staff/clients/${data.clientId}`);
  return { id: newCase.id };
}

export async function updateCaseStatusAction(id: string, status: Case['status']) {
  const session = await getSession();
  if (session.role === 'receptionist') throw new Error('Insufficient permissions');
  const cases = await readCollection('cases');
  const idx = cases.findIndex((c) => c.id === id);
  if (idx === -1) throw new Error('Case not found');
  cases[idx] = { ...cases[idx], status, updatedAt: new Date().toISOString() };
  await writeCollection('cases', cases);
  revalidatePath('/staff/cases');
  revalidatePath(`/staff/cases/${id}`);
}
