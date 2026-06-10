import { cookies } from 'next/headers';
import { redirect, notFound } from 'next/navigation';
import Link from 'next/link';
import { verifySession } from '@/lib/crm/auth';
import { readCollection } from '@/lib/crm/db';
import { StatusBadge } from '@/components/crm/StatusBadge';
import { CaseStatusStepper } from './CaseStatusStepper';
import { addNoteAction } from '../../clients/actions';
import { updateCaseStatusAction } from '../actions';

export default async function CaseDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const cookieStore = await cookies();
  const token = cookieStore.get('crm_session')?.value;
  if (!token) redirect('/staff/login');
  const session = await verifySession(token);
  if (!session) redirect('/staff/login');

  const { id } = await params;
  const [cases, clients, notes] = await Promise.all([
    readCollection('cases'),
    readCollection('clients'),
    readCollection('notes'),
  ]);

  const caseData = cases.find((c) => c.id === id);
  if (!caseData) notFound();

  const client = clients.find((c) => c.id === caseData.clientId);
  const caseNotes = notes
    .filter((n) => n.caseId === id)
    .sort((a, b) => b.createdAt.localeCompare(a.createdAt));

  return (
    <div className="max-w-4xl space-y-6">
      <div className="flex items-center gap-2 text-sm" style={{ color: 'var(--color-charcoal)', opacity: 0.6 }}>
        <Link href="/staff/cases" className="hover:underline">Cases</Link>
        <span>/</span>
        <span style={{ opacity: 1, color: 'var(--color-navy)' }}>
          {caseData.visaType} — {client?.name}
        </span>
      </div>

      <div className="bg-white rounded-xl p-6" style={{ boxShadow: 'var(--shadow-sm)' }}>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <h2 className="text-xl font-bold" style={{ color: 'var(--color-navy)' }}>
              {caseData.visaType} (Subclass {caseData.subclass})
            </h2>
            <Link href={`/staff/clients/${client?.id}`} className="text-sm hover:underline mt-1 inline-block" style={{ color: 'var(--color-gold)' }}>
              {client?.name} →
            </Link>
          </div>
          <StatusBadge status={caseData.status} />
        </div>

        {/* Pipeline stepper */}
        <CaseStatusStepper
          caseId={id}
          currentStatus={caseData.status}
          canEdit={session.role !== 'receptionist'}
        />

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-6 pt-6 border-t" style={{ borderColor: 'var(--color-border)' }}>
          {[
            { label: 'Opened', value: new Date(caseData.createdAt).toLocaleDateString('en-AU') },
            { label: 'Lodged', value: caseData.lodgementDate ? new Date(caseData.lodgementDate).toLocaleDateString('en-AU') : 'Not yet' },
            { label: 'Decision', value: caseData.decisionDate ? new Date(caseData.decisionDate).toLocaleDateString('en-AU') : 'Pending' },
          ].map((item) => (
            <div key={item.label}>
              <p className="text-xs font-medium uppercase tracking-wider mb-1" style={{ color: 'var(--color-charcoal)', opacity: 0.5 }}>{item.label}</p>
              <p className="text-sm font-medium" style={{ color: 'var(--color-navy)' }}>{item.value}</p>
            </div>
          ))}
        </div>

        {caseData.notes && (
          <div className="mt-6 p-4 rounded-lg" style={{ backgroundColor: 'var(--color-surface)' }}>
            <p className="text-xs font-semibold uppercase tracking-wider mb-1" style={{ color: 'var(--color-charcoal)', opacity: 0.5 }}>Case Notes</p>
            <p className="text-sm" style={{ color: 'var(--color-charcoal)' }}>{caseData.notes}</p>
          </div>
        )}
      </div>

      {/* Case notes */}
      <div className="bg-white rounded-xl p-6" style={{ boxShadow: 'var(--shadow-sm)' }}>
        <h3 className="font-semibold mb-4" style={{ color: 'var(--color-navy)' }}>Activity Log</h3>
        <form action={async (fd: FormData) => {
          'use server';
          const content = fd.get('content') as string;
          if (content?.trim()) await addNoteAction({ caseId: id, content });
        }}>
          <textarea
            name="content"
            rows={2}
            placeholder="Add a note to this case…"
            className="w-full px-3 py-2 rounded-lg border text-sm resize-none outline-none mb-2"
            style={{ borderColor: 'var(--color-border)' }}
          />
          <button type="submit" className="px-4 py-2 rounded-full text-sm font-semibold text-white" style={{ backgroundColor: 'var(--color-navy)' }}>
            Add Note
          </button>
        </form>
        <div className="mt-4 space-y-3">
          {caseNotes.map((n) => (
            <div key={n.id} className="p-3 rounded-lg" style={{ backgroundColor: 'var(--color-surface)' }}>
              <p className="text-sm" style={{ color: 'var(--color-charcoal)' }}>{n.content}</p>
              <p className="text-xs mt-1" style={{ color: 'var(--color-charcoal)', opacity: 0.5 }}>
                {n.authorName} · {new Date(n.createdAt).toLocaleString('en-AU')}
              </p>
            </div>
          ))}
          {caseNotes.length === 0 && <p className="text-sm" style={{ color: 'var(--color-charcoal)', opacity: 0.5 }}>No activity yet.</p>}
        </div>
      </div>
    </div>
  );
}
