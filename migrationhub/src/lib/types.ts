// ─── Tenancy & administration ────────────────────────────────────

export type Role = "owner" | "admin" | "counsellor" | "accounts" | "subagent";

export interface Branch {
  id: string;
  name: string;
  city: string;
  country: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
  branchId: string;
}

// ─── Education providers & courses ───────────────────────────────

export type ProviderType = "university" | "tafe" | "college" | "school";

export interface Provider {
  id: string;
  name: string;
  type: ProviderType;
  country: string;
  cricosCode: string;
  city: string;
  /** Base commission the provider pays the agency, as a percentage of first-year tuition. */
  commissionPct: number;
  /** Optional bonus percentage once yearly enrolments pass the threshold. */
  bonusPct?: number;
  bonusThreshold?: number;
}

export type CourseLevel =
  | "english"
  | "certificate"
  | "diploma"
  | "bachelor"
  | "master"
  | "phd";

export interface Course {
  id: string;
  providerId: string;
  name: string;
  level: CourseLevel;
  cricosCode: string;
  durationMonths: number;
  tuitionPerYear: number;
  currency: string;
  intakes: string[];
}

// ─── Agents & sub-agents ─────────────────────────────────────────

export interface Agent {
  id: string;
  name: string;
  email: string;
  country: string;
  /** null = the agency itself (head office); otherwise the recruiting parent in the referral tree. */
  parentAgentId: string | null;
  /** Share of the agency's received commission paid to this sub-agent. */
  splitPct: number;
  status: "active" | "suspended";
}

// ─── Clients & students ──────────────────────────────────────────

export type ClientStatus =
  | "lead"
  | "active"
  | "enrolled"
  | "visa_holder"
  | "archived";

export interface Note {
  id: string;
  authorId: string;
  body: string;
  createdAt: string;
}

export interface Client {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  nationality: string;
  dateOfBirth: string;
  passportNo: string;
  status: ClientStatus;
  /** Referring agent (sub-agent) or null when the client came direct. */
  agentId: string | null;
  counsellorId: string;
  branchId: string;
  createdAt: string;
  notes: Note[];
}

// ─── Applications (education pipeline) ───────────────────────────

export const APPLICATION_STAGES = [
  "enquiry",
  "applied",
  "conditional_offer",
  "unconditional_offer",
  "gte_gs",
  "coe_issued",
  "enrolled",
] as const;

export type ApplicationStage = (typeof APPLICATION_STAGES)[number];

export type ApplicationStatus = ApplicationStage | "deferred" | "withdrawn";

export interface Application {
  id: string;
  clientId: string;
  providerId: string;
  courseId: string;
  intake: string;
  status: ApplicationStatus;
  createdAt: string;
  updatedAt: string;
}

// ─── Visa cases ──────────────────────────────────────────────────

export type VisaSubclass =
  | "500"
  | "485"
  | "482"
  | "186"
  | "189"
  | "190"
  | "820"
  | "600";

export const VISA_SUBCLASS_NAMES: Record<VisaSubclass, string> = {
  "500": "Student",
  "485": "Temporary Graduate",
  "482": "Skills in Demand",
  "186": "Employer Nomination",
  "189": "Skilled Independent",
  "190": "Skilled Nominated",
  "820": "Partner (Onshore)",
  "600": "Visitor",
};

export type VisaStatus =
  | "preparing"
  | "lodged"
  | "granted"
  | "refused"
  | "expired";

export interface ChecklistItem {
  id: string;
  label: string;
  done: boolean;
}

export interface VisaCase {
  id: string;
  clientId: string;
  subclass: VisaSubclass;
  status: VisaStatus;
  lodgedDate?: string;
  grantDate?: string;
  expiryDate?: string;
  checklist: ChecklistItem[];
}

// ─── Commissions ─────────────────────────────────────────────────

export type CommissionStatus =
  | "expected"
  | "invoiced"
  | "received"
  | "subagent_paid";

export interface Commission {
  id: string;
  applicationId: string;
  providerId: string;
  /** Sub-agent owed a split, if the client was referred. */
  agentId: string | null;
  grossAmount: number;
  currency: string;
  gstAmount: number;
  subAgentAmount: number;
  status: CommissionStatus;
  invoiceDate?: string;
  receivedDate?: string;
}

// ─── Classes (coaching: IELTS / PTE / NAATI) ─────────────────────

export type ClassType = "IELTS" | "PTE" | "NAATI CCL";

export interface ClassBatch {
  id: string;
  name: string;
  type: ClassType;
  teacher: string;
  schedule: string;
  startDate: string;
  feePerStudent: number;
  capacity: number;
  enrolledClientIds: string[];
}
