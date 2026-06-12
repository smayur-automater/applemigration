import Link from "next/link";
import { updateCommissionStatus } from "@/lib/actions";
import { Badge, PageHeader, StatCard, Table } from "@/components/ui";
import { commissionTotals } from "@/lib/commission";
import {
  getAgents,
  getApplications,
  getClients,
  getCommissions,
  getProviders,
} from "@/lib/data";
import { formatDate, formatMoney, humanise } from "@/lib/format";
import type { Commission, CommissionStatus } from "@/lib/types";

export const metadata = { title: "Commissions" };

const NEXT_STEP: Partial<Record<CommissionStatus, { to: CommissionStatus; label: string }>> = {
  expected: { to: "invoiced", label: "Mark invoiced" },
  invoiced: { to: "received", label: "Mark received" },
  received: { to: "subagent_paid", label: "Pay sub-agent" },
};

export default async function CommissionsPage() {
  const [commissions, providers, agents, applications, clients] = await Promise.all([
    getCommissions(),
    getProviders(),
    getAgents(),
    getApplications(),
    getClients(),
  ]);
  const totals = commissionTotals(commissions);
  const providerById = new Map(providers.map((p) => [p.id, p]));
  const agentById = new Map(agents.map((a) => [a.id, a]));
  const appById = new Map(applications.map((a) => [a.id, a]));
  const clientById = new Map(clients.map((c) => [c.id, c]));

  const clientFor = (commission: Commission) => {
    const app = appById.get(commission.applicationId);
    return app ? clientById.get(app.clientId) : undefined;
  };

  return (
    <>
      <PageHeader
        title="Commissions"
        subtitle="Expected → invoiced → received → sub-agent paid. GST is 1/11 of gross; splits apply to net."
      />
      <div className="mb-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Expected" value={formatMoney(totals.expected)} />
        <StatCard label="Invoiced" value={formatMoney(totals.invoiced)} />
        <StatCard label="Received" value={formatMoney(totals.received)} />
        <StatCard label="Owed to sub-agents" value={formatMoney(totals.subAgentOwed)} />
      </div>

      <Table head={["Student", "Provider", "Sub-agent", "Gross", "GST", "Sub-agent share", "Status", "Dates", ""]}>
        {commissions.map((commission) => {
          const client = clientFor(commission);
          const step = NEXT_STEP[commission.status];
          const needsSubAgentStep = commission.status === "received" && commission.subAgentAmount > 0;
          return (
            <tr key={commission.id} className="hover:bg-off-white">
              <td className="px-4 py-3">
                {client ? (
                  <Link href={`/clients/${client.id}`} className="font-medium text-navy hover:underline">
                    {client.firstName} {client.lastName}
                  </Link>
                ) : (
                  "—"
                )}
              </td>
              <td className="px-4 py-3">{providerById.get(commission.providerId)?.name ?? "—"}</td>
              <td className="px-4 py-3 text-charcoal/80">
                {commission.agentId ? (agentById.get(commission.agentId)?.name ?? "—") : "Direct"}
              </td>
              <td className="px-4 py-3 font-medium">{formatMoney(commission.grossAmount, commission.currency)}</td>
              <td className="px-4 py-3 text-charcoal/60">{formatMoney(commission.gstAmount, commission.currency)}</td>
              <td className="px-4 py-3 text-charcoal/60">
                {commission.subAgentAmount > 0
                  ? formatMoney(commission.subAgentAmount, commission.currency)
                  : "—"}
              </td>
              <td className="px-4 py-3">
                <Badge value={commission.status} label={humanise(commission.status)} />
              </td>
              <td className="px-4 py-3 text-xs text-charcoal/60">
                {commission.invoiceDate && <>Inv {formatDate(commission.invoiceDate)}<br /></>}
                {commission.receivedDate && <>Rec {formatDate(commission.receivedDate)}</>}
              </td>
              <td className="px-4 py-3">
                {step && (commission.status !== "received" || needsSubAgentStep) && (
                  <form action={updateCommissionStatus.bind(null, commission.id, step.to)}>
                    <button
                      type="submit"
                      className="rounded-md border border-line px-2.5 py-1 text-xs font-medium text-navy whitespace-nowrap hover:border-gold hover:bg-gold/10"
                    >
                      {step.label}
                    </button>
                  </form>
                )}
              </td>
            </tr>
          );
        })}
      </Table>
    </>
  );
}
