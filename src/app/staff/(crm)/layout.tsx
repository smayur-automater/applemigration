import { headers, cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { verifySession } from '@/lib/crm/auth';
import { CRMShell } from './CRMShell';

export default async function CRMLayout({ children }: { children: React.ReactNode }) {
  // Read user from cookie (middleware already verified, but we need the payload here)
  const cookieStore = await cookies();
  const token = cookieStore.get('crm_session')?.value;

  if (!token) redirect('/staff/login');

  const user = await verifySession(token);
  if (!user) redirect('/staff/login');

  return (
    <CRMShell role={user.role} userName={user.name}>
      {children}
    </CRMShell>
  );
}
