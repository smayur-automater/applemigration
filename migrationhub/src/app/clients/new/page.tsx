import { PageHeader } from "@/components/ui";
import { getAgents, getBranches, getUsers } from "@/lib/data";
import { ClientForm } from "./ClientForm";

export const metadata = { title: "New Client" };

export default async function NewClientPage() {
  const [agents, users, branches] = await Promise.all([
    getAgents(),
    getUsers(),
    getBranches(),
  ]);
  return (
    <>
      <PageHeader
        title="New Client"
        subtitle="Create a client record. They start as a lead and move through the pipeline from there."
      />
      <ClientForm
        agents={agents.filter((a) => a.status === "active")}
        counsellors={users.filter((u) => u.role === "counsellor" || u.role === "admin" || u.role === "owner")}
        branches={branches}
      />
    </>
  );
}
