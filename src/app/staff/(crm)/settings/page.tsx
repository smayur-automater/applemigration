import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { verifySession } from '@/lib/crm/auth';
import { readCollection } from '@/lib/crm/db';
import { StaffTable } from './StaffTable';
import { NewStaffForm } from './NewStaffForm';

export const metadata = { title: 'Settings — CRM' };

export default async function SettingsPage() {
  const cookieStore = await cookies();
  const token = cookieStore.get('crm_session')?.value;
  if (!token) redirect('/staff/login');
  const session = await verifySession(token);
  if (!session || session.role !== 'admin') redirect('/staff/dashboard');

  const staff = await readCollection('staff');
  // Never expose password hashes to client
  const safeStaff = staff.map(({ passwordHash: _, ...s }) => s);

  return (
    <div className="max-w-3xl space-y-8">
      <div className="bg-white rounded-xl p-6" style={{ boxShadow: 'var(--shadow-sm)' }}>
        <h2 className="font-bold text-lg mb-6" style={{ color: 'var(--color-slate-900)' }}>Staff Accounts</h2>
        <StaffTable staff={safeStaff} currentUserId={session.staffId} />
      </div>

      <div className="bg-white rounded-xl p-6" style={{ boxShadow: 'var(--shadow-sm)' }}>
        <h2 className="font-bold text-lg mb-6" style={{ color: 'var(--color-slate-900)' }}>Add Staff Member</h2>
        <NewStaffForm />
      </div>
    </div>
  );
}
