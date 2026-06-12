import { Badge, Card, PageHeader } from "@/components/ui";
import { getAgents, getClients } from "@/lib/data";
import { humanise } from "@/lib/format";
import type { Agent } from "@/lib/types";

export const metadata = { title: "Agents & Sub-agents" };

export default async function AgentsPage() {
  const [agents, clients] = await Promise.all([getAgents(), getClients()]);
  const referralCount = (agentId: string) =>
    clients.filter((c) => c.agentId === agentId).length;
  const childrenOf = (parentId: string | null) =>
    agents.filter((a) => a.parentAgentId === parentId);

  function AgentNode({ agent, depth }: { agent: Agent; depth: number }) {
    const children = childrenOf(agent.id);
    return (
      <li style={{ marginLeft: depth * 24 }}>
        <Card className="mb-2 flex items-center justify-between gap-3 !p-4">
          <div>
            <p className="font-semibold text-navy">
              {depth > 0 && <span aria-hidden="true" className="mr-1 text-charcoal/40">↳</span>}
              {agent.name}
            </p>
            <p className="text-xs text-charcoal/60">
              {agent.country} · {agent.email}
            </p>
          </div>
          <div className="flex items-center gap-4 text-sm">
            <span className="text-charcoal/70">
              {referralCount(agent.id)} referral{referralCount(agent.id) === 1 ? "" : "s"}
            </span>
            {agent.parentAgentId !== null && (
              <span className="rounded-full bg-gold/15 px-2.5 py-0.5 text-xs font-bold text-gold">
                {agent.splitPct}% split
              </span>
            )}
            <Badge value={agent.status} label={humanise(agent.status)} />
          </div>
        </Card>
        {children.length > 0 && (
          <ul>
            {children.map((child) => (
              <AgentNode key={child.id} agent={child} depth={depth + 1} />
            ))}
          </ul>
        )}
      </li>
    );
  }

  return (
    <>
      <PageHeader
        title="Agents & Sub-agents"
        subtitle="The referral network. Splits are a share of net (ex-GST) commission and cascade down the tree."
      />
      <ul>
        {childrenOf(null).map((root) => (
          <AgentNode key={root.id} agent={root} depth={0} />
        ))}
      </ul>
    </>
  );
}
