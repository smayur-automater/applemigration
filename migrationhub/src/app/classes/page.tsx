import Link from "next/link";
import { Card, PageHeader } from "@/components/ui";
import { getClassBatches, getClients } from "@/lib/data";
import { formatDate, formatMoney } from "@/lib/format";

export const metadata = { title: "Classes" };

export default async function ClassesPage() {
  const [batches, clients] = await Promise.all([getClassBatches(), getClients()]);
  const clientById = new Map(clients.map((c) => [c.id, c]));

  return (
    <>
      <PageHeader
        title="Coaching Classes"
        subtitle="IELTS, PTE and NAATI CCL batches run by the agency."
      />
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {batches.map((batch) => {
          const seatsLeft = batch.capacity - batch.enrolledClientIds.length;
          return (
            <Card key={batch.id}>
              <div className="flex items-start justify-between gap-2">
                <div>
                  <h2 className="font-semibold text-navy">{batch.name}</h2>
                  <p className="text-xs text-charcoal/60">
                    {batch.type} · {batch.teacher}
                  </p>
                </div>
                <span
                  className={`rounded-full px-2.5 py-0.5 text-xs font-bold ${
                    seatsLeft === 0 ? "bg-error/10 text-error" : "bg-success/15 text-success"
                  }`}
                >
                  {seatsLeft === 0 ? "Full" : `${seatsLeft} seats left`}
                </span>
              </div>
              <dl className="mt-3 space-y-1 text-sm">
                <div className="flex justify-between">
                  <dt className="text-charcoal/60">Schedule</dt>
                  <dd className="font-medium">{batch.schedule}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-charcoal/60">Starts</dt>
                  <dd className="font-medium">{formatDate(batch.startDate)}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-charcoal/60">Fee</dt>
                  <dd className="font-medium">{formatMoney(batch.feePerStudent)}</dd>
                </div>
              </dl>
              <div className="mt-3 border-t border-line pt-3">
                <p className="mb-1 text-xs font-semibold tracking-wider text-charcoal/50 uppercase">
                  Enrolled ({batch.enrolledClientIds.length}/{batch.capacity})
                </p>
                {batch.enrolledClientIds.length === 0 ? (
                  <p className="text-sm text-charcoal/50">No students yet.</p>
                ) : (
                  <ul className="space-y-0.5 text-sm">
                    {batch.enrolledClientIds.map((clientId) => {
                      const client = clientById.get(clientId);
                      return (
                        <li key={clientId}>
                          <Link href={`/clients/${clientId}`} className="text-sky hover:underline">
                            {client ? `${client.firstName} ${client.lastName}` : clientId}
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                )}
              </div>
            </Card>
          );
        })}
      </div>
    </>
  );
}
