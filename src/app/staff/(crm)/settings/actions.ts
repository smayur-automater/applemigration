'use server';

import { cookies } from 'next/headers';
import { revalidatePath } from 'next/cache';
import { readCollection, writeCollection, generateId } from '@/lib/crm/db';
import { verifySession, hashPassword } from '@/lib/crm/auth';
import type { StaffUser, Role } from '@/lib/crm/types';

async function requireAdmin() {
  const cookieStore = await cookies();
  const token = cookieStore.get('crm_session')?.value;
  if (!token) throw new Error('Unauthenticated');
  const session = await verifySession(token);
  if (!session || session.role !== 'admin') throw new Error('Admin required');
  return session;
}

export async function createStaffAction(data: { name: string; email: string; password: string; role: Role }) {
  await requireAdmin();
  const staff = await readCollection('staff');
  if (staff.some((s) => s.email.toLowerCase() === data.email.toLowerCase())) {
    return { error: 'Email already in use.' };
  }
  const passwordHash = await hashPassword(data.password);
  const newUser: StaffUser = {
    id: generateId(),
    name: data.name,
    email: data.email,
    passwordHash,
    role: data.role,
    active: true,
    createdAt: new Date().toISOString(),
  };
  staff.push(newUser);
  await writeCollection('staff', staff);
  revalidatePath('/staff/settings');
  return { success: true };
}

export async function toggleStaffActiveAction(id: string) {
  const session = await requireAdmin();
  if (id === session.staffId) return { error: 'Cannot deactivate yourself.' };
  const staff = await readCollection('staff');
  const idx = staff.findIndex((s) => s.id === id);
  if (idx === -1) return { error: 'User not found.' };
  staff[idx].active = !staff[idx].active;
  await writeCollection('staff', staff);
  revalidatePath('/staff/settings');
  return { success: true };
}
