import { readCollection, writeCollection, generateId } from './db';
import { hashPassword } from './auth';

export async function ensureSeeded(): Promise<void> {
  const staff = await readCollection('staff');
  if (staff.length > 0) return;

  const seedPassword = process.env.CRM_SEED_PASSWORD ?? 'ChangeMe123!';
  const passwordHash = await hashPassword(seedPassword);

  await writeCollection('staff', [
    {
      id: generateId(),
      name: 'Admin User',
      email: 'admin@applemigration.com.au',
      passwordHash,
      role: 'admin',
      active: true,
      createdAt: new Date().toISOString(),
    },
    {
      id: generateId(),
      name: 'Sarah Thompson',
      email: 'sarah@applemigration.com.au',
      passwordHash: await hashPassword(seedPassword),
      role: 'agent',
      active: true,
      createdAt: new Date().toISOString(),
    },
    {
      id: generateId(),
      name: 'Michael Chen',
      email: 'michael@applemigration.com.au',
      passwordHash: await hashPassword(seedPassword),
      role: 'agent',
      active: true,
      createdAt: new Date().toISOString(),
    },
  ]);
  console.log('[CRM] Seeded initial staff users. Default password:', seedPassword);
}
