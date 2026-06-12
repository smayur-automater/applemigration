import type { Agent, Commission, Course, Provider } from "./types";

/**
 * Commission engine.
 *
 * Conventions (Australian agency practice):
 * - Gross commission = first-year tuition × provider rate. Providers quote
 *   GST-inclusive amounts, so GST payable is 1/11 of gross.
 * - A sub-agent's split applies to the net (ex-GST) amount.
 */
export interface CommissionBreakdown {
  grossAmount: number;
  gstAmount: number;
  netAmount: number;
  subAgentAmount: number;
  agencyAmount: number;
}

const round2 = (n: number) => Math.round(n * 100) / 100;

export function calculateCommission(
  course: Course,
  provider: Provider,
  subAgent: Agent | null,
): CommissionBreakdown {
  const grossAmount = round2(course.tuitionPerYear * (provider.commissionPct / 100));
  const gstAmount = round2(grossAmount / 11);
  const netAmount = round2(grossAmount - gstAmount);
  const subAgentAmount = subAgent
    ? round2(netAmount * (subAgent.splitPct / 100))
    : 0;
  return {
    grossAmount,
    gstAmount,
    netAmount,
    subAgentAmount,
    agencyAmount: round2(netAmount - subAgentAmount),
  };
}

export function commissionTotals(rows: Commission[]) {
  const sum = (filter: (c: Commission) => boolean) =>
    round2(rows.filter(filter).reduce((acc, c) => acc + c.grossAmount, 0));
  return {
    expected: sum((c) => c.status === "expected"),
    invoiced: sum((c) => c.status === "invoiced"),
    received: sum((c) => c.status === "received" || c.status === "subagent_paid"),
    subAgentOwed: round2(
      rows
        .filter((c) => c.status === "received")
        .reduce((acc, c) => acc + c.subAgentAmount, 0),
    ),
  };
}
