import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import { verifySession } from '@/lib/crm/auth';
import { readCollection } from '@/lib/crm/db';
import { NewClientForm } from './NewClientForm';

export const metadata = { title: 'New Client — CRM' };

export default async function NewClientPage() {
  const cookieStore = await cookies();
  const token = cookieStore.get('crm_session')?.value;
  if (!token) redirect('/staff/login');
  const session = await verifySession(token);
  if (!session) redirect('/staff/login');

  const staff = await readCollection('staff');
  const agents = staff.filter((s) => s.active && (s.role === 'agent' || s.role === 'admin'));

  return (
    <div className="max-w-2xl">
      <div className="flex items-center gap-3 mb-6">
        <Link href="/staff/clients" className="text-sm" style={{ color: 'var(--color-slate-600)', opacity: 0.6 }}>
          ← Clients
        </Link>
      </div>
      <div className="bg-white rounded-xl p-6 sm:p-8" style={{ boxShadow: 'var(--shadow-sm)' }}>
        <h2 className="font-bold text-xl mb-6" style={{ color: 'var(--color-slate-900)' }}>New Client</h2>
        <NewClientForm agents={agents} currentUserId={session.staffId} currentRole={session.role} />
      </div>
    </div>
  );
}
