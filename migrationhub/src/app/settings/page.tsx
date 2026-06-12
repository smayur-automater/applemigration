import { Badge, Card, PageHeader, Table } from "@/components/ui";
import { getBranches, getUsers } from "@/lib/data";
import { humanise } from "@/lib/format";

export const metadata = { title: "Settings" };

export default async function SettingsPage() {
  const [users, branches] = await Promise.all([getUsers(), getBranches()]);
  const branchById = new Map(branches.map((b) => [b.id, b]));

  return (
    <>
      <PageHeader
        title="Settings & Administration"
        subtitle="Team, roles and branches for this agency tenant."
      />
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <h2 className="mb-3 font-semibold text-navy">Team</h2>
          <Table head={["Name", "Email", "Role", "Branch"]}>
            {users.map((user) => (
              <tr key={user.id} className="hover:bg-off-white">
                <td className="px-4 py-3 font-medium text-navy">{user.name}</td>
                <td className="px-4 py-3 text-charcoal/70">{user.email}</td>
                <td className="px-4 py-3">
                  <Badge value={user.role === "owner" ? "coe_issued" : "applied"} label={humanise(user.role)} />
                </td>
                <td className="px-4 py-3 text-charcoal/70">
                  {branchById.get(user.branchId)?.name ?? "—"}
                </td>
              </tr>
            ))}
          </Table>
        </div>
        <div>
          <h2 className="mb-3 font-semibold text-navy">Branches</h2>
          <div className="space-y-3">
            {branches.map((branch) => (
              <Card key={branch.id} className="!p-4">
                <p className="font-medium text-navy">{branch.name}</p>
                <p className="text-xs text-charcoal/60">
                  {branch.city}, {branch.country}
                </p>
              </Card>
            ))}
          </div>
          <Card className="mt-6 border-dashed !p-4 text-sm text-charcoal/60">
            Authentication, role permissions and tenant management activate with
            the Supabase backend — see <code>supabase/schema.sql</code> and the
            README.
          </Card>
        </div>
      </div>
    </>
  );
}
