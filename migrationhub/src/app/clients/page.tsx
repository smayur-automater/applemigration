import Link from "next/link";
import { Badge, EmptyState, PageHeader, Table } from "@/components/ui";
import { getAgents, getClients, getUsers } from "@/lib/data";
import { formatDate, humanise } from "@/lib/format";

export const metadata = { title: "Clients" };

export default async function ClientsPage(props: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q } = await props.searchParams;
  const [clients, agents, users] = await Promise.all([
    getClients(q),
    getAgents(),
    getUsers(),
  ]);
  const agentById = new Map(agents.map((a) => [a.id, a]));
  const userById = new Map(users.map((u) => [u.id, u]));

  return (
    <>
      <PageHeader
        title="Clients"
        subtitle={q ? `Search results for “${q}” — ${clients.length} match(es)` : `${clients.length} clients across all branches`}
        action={
          <Link
            href="/clients/new"
            className="rounded-full bg-navy px-5 py-2 text-sm font-semibold text-white hover:bg-navy-light"
          >
            + New Client
          </Link>
        }
      />
      {clients.length === 0 ? (
        <EmptyState message="No clients match this search." />
      ) : (
        <Table head={["Name", "Nationality", "Status", "Referred by", "Counsellor", "Created"]}>
          {clients.map((client) => (
            <tr key={client.id} className="hover:bg-off-white">
              <td className="px-4 py-3">
                <Link href={`/clients/${client.id}`} className="font-medium text-navy hover:underline">
                  {client.firstName} {client.lastName}
                </Link>
                <p className="text-xs text-charcoal/60">{client.email}</p>
              </td>
              <td className="px-4 py-3">{client.nationality}</td>
              <td className="px-4 py-3">
                <Badge value={client.status} label={humanise(client.status)} />
              </td>
              <td className="px-4 py-3 text-charcoal/80">
                {client.agentId ? (agentById.get(client.agentId)?.name ?? "—") : "Direct"}
              </td>
              <td className="px-4 py-3 text-charcoal/80">
                {userById.get(client.counsellorId)?.name ?? "—"}
              </td>
              <td className="px-4 py-3 text-charcoal/60">{formatDate(client.createdAt)}</td>
            </tr>
          ))}
        </Table>
      )}
    </>
  );
}
