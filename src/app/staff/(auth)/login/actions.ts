'use server';

import { cookies } from 'next/headers';
import { readCollection } from '@/lib/crm/db';
import { verifyPassword, createSession, cookieOptions, SESSION_COOKIE } from '@/lib/crm/auth';
import { ensureSeeded } from '@/lib/crm/seed';

export async function loginAction(
  email: string,
  password: string
): Promise<{ error?: string }> {
  await ensureSeeded();

  const staff = await readCollection('staff');
  const user = staff.find(
    (s) => s.email.toLowerCase() === email.toLowerCase() && s.active
  );

  if (!user) {
    return { error: 'Invalid email or password.' };
  }

  const valid = await verifyPassword(password, user.passwordHash);
  if (!valid) {
    return { error: 'Invalid email or password.' };
  }

  const token = await createSession({
    staffId: user.id,
    role: user.role,
    name: user.name,
    email: user.email,
  });

  const cookieStore = await cookies();
  cookieStore.set(SESSION_COOKIE, token, cookieOptions);

  return {};
}

export async function logoutAction(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete(SESSION_COOKIE);
}
