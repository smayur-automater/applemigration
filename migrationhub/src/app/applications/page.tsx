import Link from "next/link";
import { advanceApplication, updateApplicationStatus } from "@/lib/actions";
import { PageHeader } from "@/components/ui";
import { getApplications, getClients, getCourses, getProviders } from "@/lib/data";
import { humanise } from "@/lib/format";
import { APPLICATION_STAGES } from "@/lib/types";

export const metadata = { title: "Applications" };

export default async function ApplicationsPage() {
  const [applications, clients, courses, providers] = await Promise.all([
    getApplications(),
    getClients(),
    getCourses(),
    getProviders(),
  ]);
  const clientById = new Map(clients.map((c) => [c.id, c]));
  const courseById = new Map(courses.map((c) => [c.id, c]));
  const providerById = new Map(providers.map((p) => [p.id, p]));
  const inactive = applications.filter(
    (a) => a.status === "withdrawn" || a.status === "deferred",
  );

  return (
    <>
      <PageHeader
        title="Application Pipeline"
        subtitle="Enquiry through to enrolment. Advancing past CoE automatically raises the expected commission."
      />
      <div className="flex gap-4 overflow-x-auto pb-4">
        {APPLICATION_STAGES.map((stage) => {
          const column = applications.filter((a) => a.status === stage);
          return (
            <section
              key={stage}
              aria-label={humanise(stage)}
              className="w-64 shrink-0 rounded-xl bg-surface p-3"
            >
              <h2 className="mb-3 flex items-center justify-between px-1 text-xs font-bold tracking-wider text-charcoal/60 uppercase">
                {humanise(stage)}
                <span className="rounded-full bg-white px-2 py-0.5 text-charcoal/50">
                  {column.length}
                </span>
              </h2>
              <div className="space-y-2">
                {column.map((app) => {
                  const client = clientById.get(app.clientId);
                  const course = courseById.get(app.courseId);
                  const provider = providerById.get(app.providerId);
                  const isLast = stage === "enrolled";
                  return (
                    <article key={app.id} className="rounded-lg border border-line bg-white p-3">
                      <Link
                        href={`/clients/${app.clientId}`}
                        className="text-sm font-semibold text-navy hover:underline"
                      >
                        {client ? `${client.firstName} ${client.lastName}` : app.clientId}
                      </Link>
                      <p className="mt-1 text-xs text-charcoal/70">{course?.name}</p>
                      <p className="text-xs text-charcoal/50">
                        {provider?.name} · {app.intake}
                      </p>
                      {!isLast && (
                        <form action={advanceApplication.bind(null, app.id)} className="mt-2">
                          <button
                            type="submit"
                            className="w-full rounded-md border border-line px-2 py-1 text-xs font-medium text-navy hover:border-gold hover:bg-gold/10"
                          >
                            Advance →
                          </button>
                        </form>
                      )}
                    </article>
                  );
                })}
              </div>
            </section>
          );
        })}
      </div>

      {inactive.length > 0 && (
        <section className="mt-4">
          <h2 className="mb-2 text-xs font-bold tracking-wider text-charcoal/50 uppercase">
            Deferred / withdrawn
          </h2>
          <ul className="flex flex-wrap gap-2">
            {inactive.map((app) => {
              const client = clientById.get(app.clientId);
              return (
                <li
                  key={app.id}
                  className="flex items-center gap-2 rounded-full border border-line bg-white px-3 py-1 text-xs"
                >
                  <span className="font-medium">
                    {client ? `${client.firstName} ${client.lastName}` : app.clientId}
                  </span>
                  <span className="text-charcoal/50">{humanise(app.status)}</span>
                  <form action={updateApplicationStatus.bind(null, app.id, "enquiry")}>
                    <button type="submit" className="text-sky hover:underline">
                      Reopen
                    </button>
                  </form>
                </li>
              );
            })}
          </ul>
        </section>
      )}
    </>
  );
}
