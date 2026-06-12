import Link from "next/link";
import { Badge, Card, PageHeader, StatCard } from "@/components/ui";
import { commissionTotals } from "@/lib/commission";
import {
  getApplications,
  getClients,
  getCommissions,
  getExpiringVisas,
} from "@/lib/data";
import { daysUntil, formatDate, formatMoney, humanise } from "@/lib/format";
import { VISA_SUBCLASS_NAMES } from "@/lib/types";

export default async function DashboardPage() {
  const [clients, applications, commissions, expiring] = await Promise.all([
    getClients(),
    getApplications(),
    getCommissions(),
    getExpiringVisas(90),
  ]);
  const totals = commissionTotals(commissions);
  const activePipeline = applications.filter(
    (a) => a.status !== "enrolled" && a.status !== "withdrawn" && a.status !== "deferred",
  );
  const recentApps = [...applications]
    .sort((a, b) => b.updatedAt.localeCompare(a.updatedAt))
    .slice(0, 6);
  const clientById = new Map(clients.map((c) => [c.id, c]));

  return (
    <>
      <PageHeader
        title="Dashboard"
        subtitle="Snapshot across clients, pipeline, commissions and visa deadlines."
      />
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Clients" value={String(clients.length)} hint={`${clients.filter((c) => c.status === "lead").length} new leads`} />
        <StatCard label="Open applications" value={String(activePipeline.length)} hint={`${applications.length} total`} />
        <StatCard label="Commission expected" value={formatMoney(totals.expected)} hint={`${formatMoney(totals.invoiced)} invoiced`} />
        <StatCard label="Commission received" value={formatMoney(totals.received)} hint={`${formatMoney(totals.subAgentOwed)} owed to sub-agents`} />
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="font-semibold text-navy">Recent application activity</h2>
            <Link href="/applications" className="text-sm font-medium text-sky hover:underline">
              View pipeline →
            </Link>
          </div>
          <ul className="divide-y divide-line">
            {recentApps.map((app) => {
              const client = clientById.get(app.clientId);
              return (
                <li key={app.id} className="flex items-center justify-between gap-3 py-3">
                  <div>
                    <Link href={`/clients/${app.clientId}`} className="font-medium text-navy hover:underline">
                      {client ? `${client.firstName} ${client.lastName}` : app.clientId}
                    </Link>
                    <p className="text-xs text-charcoal/60">
                      {app.intake} · updated {formatDate(app.updatedAt)}
                    </p>
                  </div>
                  <Badge value={app.status} label={humanise(app.status)} />
                </li>
              );
            })}
          </ul>
        </Card>

        <Card>
          <div className="mb-4 flex items-center justify-between">
            <h2 className="font-semibold text-navy">Visas expiring ≤ 90 days</h2>
            <Link href="/visas" className="text-sm font-medium text-sky hover:underline">
              All visas →
            </Link>
          </div>
          {expiring.length === 0 ? (
            <p className="text-sm text-charcoal/50">Nothing expiring soon.</p>
          ) : (
            <ul className="space-y-3">
              {expiring.map((visa) => {
                const client = clientById.get(visa.clientId);
                const days = daysUntil(visa.expiryDate!);
                return (
                  <li key={visa.id} className="rounded-lg border border-line p-3">
                    <div className="flex items-center justify-between">
                      <Link href={`/clients/${visa.clientId}`} className="text-sm font-medium text-navy hover:underline">
                        {client ? `${client.firstName} ${client.lastName}` : visa.clientId}
                      </Link>
                      <span className={`text-xs font-bold ${days <= 30 ? "text-error" : "text-warning"}`}>
                        {days}d left
                      </span>
                    </div>
                    <p className="mt-1 text-xs text-charcoal/60">
                      Subclass {visa.subclass} ({VISA_SUBCLASS_NAMES[visa.subclass]}) · expires {formatDate(visa.expiryDate)}
                    </p>
                  </li>
                );
              })}
            </ul>
          )}
        </Card>
      </div>
    </>
  );
}
