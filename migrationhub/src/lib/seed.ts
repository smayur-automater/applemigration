import type {
  Agent,
  Application,
  Branch,
  ClassBatch,
  Client,
  Commission,
  Course,
  Provider,
  User,
  VisaCase,
} from "./types";

export const branches: Branch[] = [
  { id: "br-syd", name: "Sydney Head Office", city: "Sydney", country: "Australia" },
  { id: "br-mel", name: "Melbourne Branch", city: "Melbourne", country: "Australia" },
];

export const users: User[] = [
  { id: "u-priya", name: "Priya Sharma", email: "priya@agency.example", role: "owner", branchId: "br-syd" },
  { id: "u-marco", name: "Marco Rossi", email: "marco@agency.example", role: "counsellor", branchId: "br-syd" },
  { id: "u-linh", name: "Linh Tran", email: "linh@agency.example", role: "counsellor", branchId: "br-mel" },
  { id: "u-dev", name: "Dev Patel", email: "dev@agency.example", role: "accounts", branchId: "br-syd" },
];

export const providers: Provider[] = [
  {
    id: "pr-usyd", name: "University of Sydney", type: "university", country: "Australia",
    city: "Sydney", cricosCode: "00026A", commissionPct: 15, bonusPct: 2.5, bonusThreshold: 20,
  },
  {
    id: "pr-unimelb", name: "University of Melbourne", type: "university", country: "Australia",
    city: "Melbourne", cricosCode: "00116K", commissionPct: 12.5,
  },
  {
    id: "pr-tafensw", name: "TAFE NSW", type: "tafe", country: "Australia",
    city: "Sydney", cricosCode: "00591E", commissionPct: 20,
  },
  {
    id: "pr-navitas", name: "Navitas English", type: "college", country: "Australia",
    city: "Sydney", cricosCode: "00289M", commissionPct: 25,
  },
  {
    id: "pr-deakin", name: "Deakin University", type: "university", country: "Australia",
    city: "Melbourne", cricosCode: "00113B", commissionPct: 15, bonusPct: 2, bonusThreshold: 15,
  },
];

export const courses: Course[] = [
  { id: "c-usyd-mit", providerId: "pr-usyd", name: "Master of Information Technology", level: "master", cricosCode: "077202M", durationMonths: 24, tuitionPerYear: 51500, currency: "AUD", intakes: ["Feb 2027", "Jul 2027"] },
  { id: "c-usyd-bcom", providerId: "pr-usyd", name: "Bachelor of Commerce", level: "bachelor", cricosCode: "001541G", durationMonths: 36, tuitionPerYear: 49000, currency: "AUD", intakes: ["Feb 2027", "Jul 2027"] },
  { id: "c-melb-mds", providerId: "pr-unimelb", name: "Master of Data Science", level: "master", cricosCode: "088750C", durationMonths: 24, tuitionPerYear: 52000, currency: "AUD", intakes: ["Feb 2027", "Jul 2027"] },
  { id: "c-melb-meng", providerId: "pr-unimelb", name: "Master of Engineering", level: "master", cricosCode: "061344J", durationMonths: 36, tuitionPerYear: 50500, currency: "AUD", intakes: ["Feb 2027"] },
  { id: "c-tafe-cookery", providerId: "pr-tafensw", name: "Certificate IV in Commercial Cookery", level: "certificate", cricosCode: "099887B", durationMonths: 18, tuitionPerYear: 16500, currency: "AUD", intakes: ["Jan 2027", "Apr 2027", "Jul 2027", "Oct 2027"] },
  { id: "c-tafe-auto", providerId: "pr-tafensw", name: "Diploma of Automotive Technology", level: "diploma", cricosCode: "098123A", durationMonths: 24, tuitionPerYear: 15200, currency: "AUD", intakes: ["Feb 2027", "Jul 2027"] },
  { id: "c-nav-eng", providerId: "pr-navitas", name: "General English (ELICOS)", level: "english", cricosCode: "012345F", durationMonths: 6, tuitionPerYear: 9600, currency: "AUD", intakes: ["Monthly"] },
  { id: "c-deakin-mba", providerId: "pr-deakin", name: "Master of Business Administration", level: "master", cricosCode: "063543E", durationMonths: 24, tuitionPerYear: 46800, currency: "AUD", intakes: ["Mar 2027", "Jul 2027", "Nov 2027"] },
  { id: "c-deakin-bnurs", providerId: "pr-deakin", name: "Bachelor of Nursing", level: "bachelor", cricosCode: "059996F", durationMonths: 36, tuitionPerYear: 41200, currency: "AUD", intakes: ["Mar 2027"] },
];

export const agents: Agent[] = [
  { id: "ag-head", name: "Head Office (Direct)", email: "admissions@agency.example", country: "Australia", parentAgentId: null, splitPct: 0, status: "active" },
  { id: "ag-ktm", name: "Everest Education Link", email: "info@everestlink.example", country: "Nepal", parentAgentId: "ag-head", splitPct: 50, status: "active" },
  { id: "ag-del", name: "Delhi Study Bridge", email: "hello@studybridge.example", country: "India", parentAgentId: "ag-head", splitPct: 45, status: "active" },
  { id: "ag-hcmc", name: "Saigon Pathways", email: "contact@saigonpathways.example", country: "Vietnam", parentAgentId: "ag-head", splitPct: 50, status: "active" },
  { id: "ag-pkr", name: "Pokhara Overseas", email: "team@pokharaoverseas.example", country: "Nepal", parentAgentId: "ag-ktm", splitPct: 20, status: "active" },
];

export const clients: Client[] = [
  {
    id: "cl-anita", firstName: "Anita", lastName: "Gurung", email: "anita.g@example.com", phone: "+977 98 1234 5678",
    nationality: "Nepal", dateOfBirth: "2002-04-18", passportNo: "PA0192837", status: "active",
    agentId: "ag-ktm", counsellorId: "u-marco", branchId: "br-syd", createdAt: "2026-03-02",
    notes: [{ id: "n-1", authorId: "u-marco", body: "Strong academics, IELTS 7.0. Targeting Feb 2027 MIT at USYD.", createdAt: "2026-03-02" }],
  },
  {
    id: "cl-rahul", firstName: "Rahul", lastName: "Mehta", email: "rahul.mehta@example.com", phone: "+91 98765 43210",
    nationality: "India", dateOfBirth: "2000-11-03", passportNo: "Z4455667", status: "enrolled",
    agentId: "ag-del", counsellorId: "u-marco", branchId: "br-syd", createdAt: "2025-11-14",
    notes: [{ id: "n-2", authorId: "u-marco", body: "CoE issued, visa granted. Commenced Feb 2026 intake.", createdAt: "2026-02-20" }],
  },
  {
    id: "cl-thao", firstName: "Thao", lastName: "Nguyen", email: "thao.nguyen@example.com", phone: "+84 90 123 4567",
    nationality: "Vietnam", dateOfBirth: "2003-07-22", passportNo: "C7788990", status: "active",
    agentId: "ag-hcmc", counsellorId: "u-linh", branchId: "br-mel", createdAt: "2026-04-10",
    notes: [{ id: "n-3", authorId: "u-linh", body: "Needs GS statement review before lodgement.", createdAt: "2026-05-28" }],
  },
  {
    id: "cl-sita", firstName: "Sita", lastName: "Thapa", email: "sita.thapa@example.com", phone: "+977 98 5555 1212",
    nationality: "Nepal", dateOfBirth: "2001-01-30", passportNo: "PA5566778", status: "lead",
    agentId: "ag-pkr", counsellorId: "u-marco", branchId: "br-syd", createdAt: "2026-05-25",
    notes: [],
  },
  {
    id: "cl-james", firstName: "James", lastName: "Okafor", email: "james.okafor@example.com", phone: "+234 803 555 0142",
    nationality: "Nigeria", dateOfBirth: "1998-09-12", passportNo: "A09887654", status: "active",
    agentId: null, counsellorId: "u-linh", branchId: "br-mel", createdAt: "2026-02-17",
    notes: [{ id: "n-4", authorId: "u-linh", body: "Direct enquiry via website. MBA at Deakin, Jul 2027.", createdAt: "2026-02-17" }],
  },
  {
    id: "cl-maria", firstName: "Maria", lastName: "Santos", email: "maria.santos@example.com", phone: "+63 917 555 0188",
    nationality: "Philippines", dateOfBirth: "1996-05-09", passportNo: "P3344556", status: "visa_holder",
    agentId: null, counsellorId: "u-marco", branchId: "br-syd", createdAt: "2024-08-01",
    notes: [{ id: "n-5", authorId: "u-marco", body: "485 expiring soon — assess 482/186 employer options.", createdAt: "2026-06-01" }],
  },
  {
    id: "cl-arjun", firstName: "Arjun", lastName: "Singh", email: "arjun.singh@example.com", phone: "+91 99887 76655",
    nationality: "India", dateOfBirth: "2004-02-14", passportNo: "Z9988776", status: "active",
    agentId: "ag-del", counsellorId: "u-marco", branchId: "br-syd", createdAt: "2026-04-29",
    notes: [],
  },
  {
    id: "cl-mei", firstName: "Mei", lastName: "Chen", email: "mei.chen@example.com", phone: "+86 138 0013 8000",
    nationality: "China", dateOfBirth: "2002-12-01", passportNo: "E12349876", status: "lead",
    agentId: null, counsellorId: "u-linh", branchId: "br-mel", createdAt: "2026-06-05",
    notes: [],
  },
];

export const applications: Application[] = [
  { id: "ap-1", clientId: "cl-anita", providerId: "pr-usyd", courseId: "c-usyd-mit", intake: "Feb 2027", status: "unconditional_offer", createdAt: "2026-03-05", updatedAt: "2026-05-20" },
  { id: "ap-2", clientId: "cl-rahul", providerId: "pr-tafensw", courseId: "c-tafe-cookery", intake: "Feb 2026", status: "enrolled", createdAt: "2025-11-20", updatedAt: "2026-02-20" },
  { id: "ap-3", clientId: "cl-thao", providerId: "pr-unimelb", courseId: "c-melb-mds", intake: "Feb 2027", status: "gte_gs", createdAt: "2026-04-12", updatedAt: "2026-05-28" },
  { id: "ap-4", clientId: "cl-sita", providerId: "pr-navitas", courseId: "c-nav-eng", intake: "Monthly", status: "enquiry", createdAt: "2026-05-25", updatedAt: "2026-05-25" },
  { id: "ap-5", clientId: "cl-james", providerId: "pr-deakin", courseId: "c-deakin-mba", intake: "Jul 2027", status: "conditional_offer", createdAt: "2026-02-20", updatedAt: "2026-05-11" },
  { id: "ap-6", clientId: "cl-arjun", providerId: "pr-usyd", courseId: "c-usyd-bcom", intake: "Jul 2027", status: "applied", createdAt: "2026-05-01", updatedAt: "2026-05-02" },
  { id: "ap-7", clientId: "cl-mei", providerId: "pr-unimelb", courseId: "c-melb-meng", intake: "Feb 2027", status: "enquiry", createdAt: "2026-06-05", updatedAt: "2026-06-05" },
  { id: "ap-8", clientId: "cl-anita", providerId: "pr-deakin", courseId: "c-deakin-mba", intake: "Mar 2027", status: "withdrawn", createdAt: "2026-03-05", updatedAt: "2026-04-15" },
  { id: "ap-9", clientId: "cl-thao", providerId: "pr-deakin", courseId: "c-deakin-bnurs", intake: "Mar 2027", status: "coe_issued", createdAt: "2026-04-12", updatedAt: "2026-06-08" },
];

const studentChecklist = (done: number) =>
  [
    "Valid passport",
    "Confirmation of Enrolment (CoE)",
    "Genuine Student (GS) statement",
    "English test result",
    "Financial capacity evidence",
    "OSHC health cover",
    "Health examination",
  ].map((label, i) => ({ id: `chk-${i}`, label, done: i < done }));

export const visaCases: VisaCase[] = [
  { id: "v-1", clientId: "cl-rahul", subclass: "500", status: "granted", lodgedDate: "2026-01-08", grantDate: "2026-02-02", expiryDate: "2027-09-15", checklist: studentChecklist(7) },
  { id: "v-2", clientId: "cl-thao", subclass: "500", status: "preparing", checklist: studentChecklist(4) },
  { id: "v-3", clientId: "cl-maria", subclass: "485", status: "granted", lodgedDate: "2024-09-10", grantDate: "2024-12-05", expiryDate: "2026-08-04", checklist: [] },
  { id: "v-4", clientId: "cl-anita", subclass: "500", status: "preparing", checklist: studentChecklist(3) },
  { id: "v-5", clientId: "cl-james", subclass: "600", status: "granted", lodgedDate: "2025-10-02", grantDate: "2025-10-20", expiryDate: "2026-07-01", checklist: [] },
  { id: "v-6", clientId: "cl-maria", subclass: "482", status: "lodged", lodgedDate: "2026-05-22", checklist: [
    { id: "chk-0", label: "Employer nomination approved", done: true },
    { id: "chk-1", label: "Skills assessment", done: true },
    { id: "chk-2", label: "English test result", done: true },
    { id: "chk-3", label: "Health examination", done: false },
  ] },
];

// Commission maths in the seed follows the engine's rules: gross = tuition × rate,
// GST = 1/11 of gross (AU GST-inclusive convention), sub-agent split applies to net.
export const commissions: Commission[] = [
  { id: "cm-1", applicationId: "ap-2", providerId: "pr-tafensw", agentId: "ag-del", grossAmount: 3300, currency: "AUD", gstAmount: 300, subAgentAmount: 1350, status: "received", invoiceDate: "2026-03-01", receivedDate: "2026-04-02" },
  { id: "cm-2", applicationId: "ap-9", providerId: "pr-deakin", agentId: "ag-hcmc", grossAmount: 6180, currency: "AUD", gstAmount: 561.82, subAgentAmount: 2809.09, status: "invoiced", invoiceDate: "2026-06-09" },
  { id: "cm-3", applicationId: "ap-1", providerId: "pr-usyd", agentId: "ag-ktm", grossAmount: 7725, currency: "AUD", gstAmount: 702.27, subAgentAmount: 3511.36, status: "expected" },
  { id: "cm-4", applicationId: "ap-5", providerId: "pr-deakin", agentId: null, grossAmount: 7020, currency: "AUD", gstAmount: 638.18, subAgentAmount: 0, status: "expected" },
];

export const classBatches: ClassBatch[] = [
  { id: "cb-1", name: "IELTS Evening Batch 14", type: "IELTS", teacher: "Sarah Whitmore", schedule: "Mon/Wed/Fri 6–8 pm", startDate: "2026-06-22", feePerStudent: 450, capacity: 16, enrolledClientIds: ["cl-sita", "cl-mei"] },
  { id: "cb-2", name: "PTE Weekend Intensive 8", type: "PTE", teacher: "Daniel Kim", schedule: "Sat/Sun 10 am–1 pm", startDate: "2026-07-04", feePerStudent: 520, capacity: 12, enrolledClientIds: ["cl-arjun"] },
  { id: "cb-3", name: "NAATI CCL Hindi Prep 3", type: "NAATI CCL", teacher: "Kavita Rao", schedule: "Tue/Thu 7–9 pm", startDate: "2026-07-14", feePerStudent: 680, capacity: 10, enrolledClientIds: [] },
];
