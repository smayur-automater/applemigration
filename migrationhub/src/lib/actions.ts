"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import { calculateCommission } from "./commission";
import { newId, store } from "./store";
import type { ApplicationStatus, CommissionStatus } from "./types";
import { APPLICATION_STAGES } from "./types";

const clientSchema = z.object({
  firstName: z.string().min(2, "First name is required"),
  lastName: z.string().min(2, "Last name is required"),
  email: z.string().email("Enter a valid email"),
  phone: z.string().min(6, "Enter a valid phone number"),
  nationality: z.string().min(2, "Nationality is required"),
  dateOfBirth: z.string().min(1, "Date of birth is required"),
  passportNo: z.string().min(5, "Passport number is required"),
  agentId: z.string(),
  counsellorId: z.string().min(1),
  branchId: z.string().min(1),
});

export interface FormState {
  errors?: Record<string, string[]>;
  message?: string;
}

export async function createClient(
  _prev: FormState,
  formData: FormData,
): Promise<FormState> {
  const parsed = clientSchema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) {
    return { errors: z.flattenError(parsed.error).fieldErrors };
  }
  const d = parsed.data;
  const id = newId("cl");
  store.clients.unshift({
    id,
    firstName: d.firstName,
    lastName: d.lastName,
    email: d.email,
    phone: d.phone,
    nationality: d.nationality,
    dateOfBirth: d.dateOfBirth,
    passportNo: d.passportNo,
    status: "lead",
    agentId: d.agentId === "direct" ? null : d.agentId,
    counsellorId: d.counsellorId,
    branchId: d.branchId,
    createdAt: new Date().toISOString().slice(0, 10),
    notes: [],
  });
  revalidatePath("/clients");
  redirect(`/clients/${id}`);
}

export async function updateApplicationStatus(
  applicationId: string,
  status: ApplicationStatus,
): Promise<void> {
  const app = store.applications.find((a) => a.id === applicationId);
  if (!app) return;
  app.status = status;
  app.updatedAt = new Date().toISOString().slice(0, 10);

  // Reaching CoE creates the expected commission record; enrolment updates
  // the client's lifecycle status.
  if (status === "coe_issued" && !store.commissions.some((c) => c.applicationId === app.id)) {
    const course = store.courses.find((c) => c.id === app.courseId);
    const provider = store.providers.find((p) => p.id === app.providerId);
    const client = store.clients.find((c) => c.id === app.clientId);
    const subAgent = client?.agentId
      ? (store.agents.find((a) => a.id === client.agentId) ?? null)
      : null;
    if (course && provider) {
      const b = calculateCommission(course, provider, subAgent);
      store.commissions.push({
        id: newId("cm"),
        applicationId: app.id,
        providerId: provider.id,
        agentId: subAgent?.id ?? null,
        grossAmount: b.grossAmount,
        gstAmount: b.gstAmount,
        subAgentAmount: b.subAgentAmount,
        currency: course.currency,
        status: "expected",
      });
    }
  }
  if (status === "enrolled") {
    const client = store.clients.find((c) => c.id === app.clientId);
    if (client && (client.status === "lead" || client.status === "active")) {
      client.status = "enrolled";
    }
  }
  revalidatePath("/applications");
  revalidatePath("/commissions");
  revalidatePath(`/clients/${app.clientId}`);
  revalidatePath("/");
}

export async function advanceApplication(applicationId: string): Promise<void> {
  const app = store.applications.find((a) => a.id === applicationId);
  if (!app) return;
  const idx = APPLICATION_STAGES.indexOf(app.status as (typeof APPLICATION_STAGES)[number]);
  if (idx === -1 || idx === APPLICATION_STAGES.length - 1) return;
  await updateApplicationStatus(applicationId, APPLICATION_STAGES[idx + 1]);
}

export async function updateCommissionStatus(
  commissionId: string,
  status: CommissionStatus,
): Promise<void> {
  const commission = store.commissions.find((c) => c.id === commissionId);
  if (!commission) return;
  commission.status = status;
  const today = new Date().toISOString().slice(0, 10);
  if (status === "invoiced") commission.invoiceDate = today;
  if (status === "received") commission.receivedDate = today;
  revalidatePath("/commissions");
  revalidatePath("/");
}

export async function toggleChecklistItem(
  visaCaseId: string,
  itemId: string,
): Promise<void> {
  const visa = store.visaCases.find((v) => v.id === visaCaseId);
  const item = visa?.checklist.find((i) => i.id === itemId);
  if (!visa || !item) return;
  item.done = !item.done;
  revalidatePath("/visas");
  revalidatePath(`/clients/${visa.clientId}`);
}

export async function addNote(
  clientId: string,
  formData: FormData,
): Promise<void> {
  const body = (formData.get("body") as string | null)?.trim();
  if (!body) return;
  const client = store.clients.find((c) => c.id === clientId);
  if (!client) return;
  client.notes.unshift({
    id: newId("n"),
    authorId: "u-priya",
    body,
    createdAt: new Date().toISOString().slice(0, 10),
  });
  revalidatePath(`/clients/${clientId}`);
}
