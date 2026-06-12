import Link from "next/link";
import { Badge, PageHeader, Table } from "@/components/ui";
import { getClients, getVisaCases } from "@/lib/data";
import { daysUntil, formatDate, humanise } from "@/lib/format";
import { VISA_SUBCLASS_NAMES } from "@/lib/types";

export const metadata = { title: "Visas" };

export default async function VisasPage() {
  const [visas, clients] = await Promise.all([getVisaCases(), getClients()]);
  const clientById = new Map(clients.map((c) => [c.id, c]));
  const sorted = [...visas].sort((a, b) => {
    const aExp = a.expiryDate ? new Date(a.expiryDate).getTime() : Infinity;
    const bExp = b.expiryDate ? new Date(b.expiryDate).getTime() : Infinity;
    return aExp - bExp;
  });

  return (
    <>
      <PageHeader
        title="Visa Cases"
        subtitle="Every case across the client base, soonest expiry first. Checklists live on the client page."
      />
      <Table head={["Client", "Subclass", "Status", "Lodged", "Granted", "Expires", "Checklist"]}>
        {sorted.map((visa) => {
          const client = clientById.get(visa.clientId);
          const days = visa.expiryDate ? daysUntil(visa.expiryDate) : null;
          const done = visa.checklist.filter((i) => i.done).length;
          return (
            <tr key={visa.id} className="hover:bg-off-white">
              <td className="px-4 py-3">
                <Link href={`/clients/${visa.clientId}`} className="font-medium text-navy hover:underline">
                  {client ? `${client.firstName} ${client.lastName}` : visa.clientId}
                </Link>
              </td>
              <td className="px-4 py-3">
                {visa.subclass} — {VISA_SUBCLASS_NAMES[visa.subclass]}
              </td>
              <td className="px-4 py-3">
                <Badge value={visa.status} label={humanise(visa.status)} />
              </td>
              <td className="px-4 py-3 text-charcoal/60">{formatDate(visa.lodgedDate)}</td>
              <td className="px-4 py-3 text-charcoal/60">{formatDate(visa.grantDate)}</td>
              <td className="px-4 py-3">
                {visa.expiryDate ? (
                  <span className={days !== null && days <= 90 ? (days <= 30 ? "font-bold text-error" : "font-semibold text-warning") : ""}>
                    {formatDate(visa.expiryDate)}
                    {days !== null && days <= 90 && ` (${days}d)`}
                  </span>
                ) : (
                  "—"
                )}
              </td>
              <td className="px-4 py-3 text-charcoal/60">
                {visa.checklist.length > 0 ? `${done}/${visa.checklist.length} complete` : "—"}
              </td>
            </tr>
          );
        })}
      </Table>
    </>
  );
}
