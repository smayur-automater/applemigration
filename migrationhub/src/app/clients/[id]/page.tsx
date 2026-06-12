import Link from "next/link";
import { notFound } from "next/navigation";
import { addNote, toggleChecklistItem } from "@/lib/actions";
import { Badge, Card, EmptyState, PageHeader } from "@/components/ui";
import {
  getAgent,
  getApplications,
  getClient,
  getCourse,
  getProvider,
  getUser,
  getVisaCases,
} from "@/lib/data";
import { formatDate, humanise } from "@/lib/format";
import { VISA_SUBCLASS_NAMES } from "@/lib/types";

export default async function ClientDetailPage(props: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await props.params;
  const client = await getClient(id);
  if (!client) notFound();

  const [applications, visas, counsellor, agent] = await Promise.all([
    getApplications(client.id),
    getVisaCases(client.id),
    getUser(client.counsellorId),
    client.agentId ? getAgent(client.agentId) : Promise.resolve(undefined),
  ]);
  const appRows = await Promise.all(
    applications.map(async (app) => ({
      app,
      course: await getCourse(app.courseId),
      provider: await getProvider(app.providerId),
    })),
  );

  return (
    <>
      <PageHeader
        title={`${client.firstName} ${client.lastName}`}
        subtitle={`${client.nationality} · ${client.email} · ${client.phone}`}
        action={<Badge value={client.status} label={humanise(client.status)} />}
      />

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          <Card>
            <h2 className="mb-3 font-semibold text-navy">Applications</h2>
            {appRows.length === 0 ? (
              <EmptyState message="No applications yet." />
            ) : (
              <ul className="divide-y divide-line">
                {appRows.map(({ app, course, provider }) => (
                  <li key={app.id} className="flex items-center justify-between gap-3 py-3">
                    <div>
                      <p className="font-medium text-navy">{course?.name ?? app.courseId}</p>
                      <p className="text-xs text-charcoal/60">
                        {provider?.name} · {app.intake} · updated {formatDate(app.updatedAt)}
                      </p>
                    </div>
                    <Badge value={app.status} label={humanise(app.status)} />
                  </li>
                ))}
              </ul>
            )}
          </Card>

          <Card>
            <h2 className="mb-3 font-semibold text-navy">Visa cases</h2>
            {visas.length === 0 ? (
              <EmptyState message="No visa cases yet." />
            ) : (
              <div className="space-y-4">
                {visas.map((visa) => (
                  <div key={visa.id} className="rounded-lg border border-line p-4">
                    <div className="flex items-center justify-between">
                      <p className="font-medium text-navy">
                        Subclass {visa.subclass} — {VISA_SUBCLASS_NAMES[visa.subclass]}
                      </p>
                      <Badge value={visa.status} label={humanise(visa.status)} />
                    </div>
                    <p className="mt-1 text-xs text-charcoal/60">
                      Lodged {formatDate(visa.lodgedDate)} · Granted {formatDate(visa.grantDate)} · Expires {formatDate(visa.expiryDate)}
                    </p>
                    {visa.checklist.length > 0 && (
                      <ul className="mt-3 grid gap-1 sm:grid-cols-2">
                        {visa.checklist.map((item) => (
                          <li key={item.id}>
                            <form
                              action={toggleChecklistItem.bind(null, visa.id, item.id)}
                            >
                              <button
                                type="submit"
                                className="flex w-full items-center gap-2 rounded px-1 py-0.5 text-left text-sm hover:bg-off-white"
                              >
                                <span
                                  aria-hidden="true"
                                  className={`flex size-4 items-center justify-center rounded border text-[10px] ${
                                    item.done
                                      ? "border-success bg-success text-white"
                                      : "border-line bg-white"
                                  }`}
                                >
                                  {item.done ? "✓" : ""}
                                </span>
                                <span className={item.done ? "text-charcoal/50 line-through" : ""}>
                                  {item.label}
                                </span>
                              </button>
                            </form>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
              </div>
            )}
          </Card>

          <Card>
            <h2 className="mb-3 font-semibold text-navy">Notes</h2>
            <form action={addNote.bind(null, client.id)} className="mb-4 flex gap-2">
              <input
                name="body"
                required
                placeholder="Add a note…"
                aria-label="Add a note"
                className="h-10 flex-1 rounded-lg border border-line px-3 text-sm outline-none focus:border-gold"
              />
              <button
                type="submit"
                className="rounded-lg bg-navy px-4 text-sm font-semibold text-white hover:bg-navy-light"
              >
                Add
              </button>
            </form>
            {client.notes.length === 0 ? (
              <p className="text-sm text-charcoal/50">No notes yet.</p>
            ) : (
              <ul className="space-y-3">
                {client.notes.map((note) => (
                  <li key={note.id} className="rounded-lg bg-off-white p-3 text-sm">
                    <p>{note.body}</p>
                    <p className="mt-1 text-xs text-charcoal/50">{formatDate(note.createdAt)}</p>
                  </li>
                ))}
              </ul>
            )}
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <h2 className="mb-3 font-semibold text-navy">Profile</h2>
            <dl className="space-y-2 text-sm">
              {[
                ["Date of birth", formatDate(client.dateOfBirth)],
                ["Passport", client.passportNo],
                ["Referred by", agent?.name ?? "Direct"],
                ["Counsellor", counsellor?.name ?? "—"],
                ["Client since", formatDate(client.createdAt)],
              ].map(([label, value]) => (
                <div key={label} className="flex justify-between gap-3">
                  <dt className="text-charcoal/60">{label}</dt>
                  <dd className="font-medium text-right">{value}</dd>
                </div>
              ))}
            </dl>
          </Card>
          <Link
            href="/clients"
            className="block text-center text-sm font-medium text-sky hover:underline"
          >
            ← Back to all clients
          </Link>
        </div>
      </div>
    </>
  );
}
