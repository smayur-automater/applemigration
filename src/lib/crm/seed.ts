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
      name: 'Rashmi',
      email: 'rashmi@applemigration.com.au',
      passwordHash,
      role: 'admin',
      active: true,
      createdAt: new Date().toISOString(),
    },
    {
      id: generateId(),
      name: 'Yeshan',
      email: 'yeshan@applemigration.com.au',
      passwordHash: await hashPassword(seedPassword),
      role: 'agent',
      active: true,
      createdAt: new Date().toISOString(),
    },
    {
      id: generateId(),
      name: 'Ameer Sohail',
      email: 'ameer@applemigration.com.au',
      passwordHash: await hashPassword(seedPassword),
      role: 'agent',
      active: true,
      createdAt: new Date().toISOString(),
    },
    {
      id: generateId(),
      name: 'Umesh Indukuri',
      email: 'umesh@applemigration.com.au',
      passwordHash: await hashPassword(seedPassword),
      role: 'agent',
      active: true,
      createdAt: new Date().toISOString(),
    },
  ]);
  console.log('[CRM] Seeded initial staff users. Default password:', seedPassword);
}
