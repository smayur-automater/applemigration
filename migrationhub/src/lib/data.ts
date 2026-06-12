import { store } from "./store";
import type {
  Agent,
  Application,
  ClassBatch,
  Client,
  Commission,
  Course,
  Provider,
  User,
  VisaCase,
} from "./types";

/**
 * Read-side data access. All functions are async so the seed-backed
 * implementation can be swapped for Supabase queries without touching
 * any page or component.
 */

export async function getBranches() {
  return store.branches;
}

export async function getUsers() {
  return store.users;
}

export async function getUser(id: string): Promise<User | undefined> {
  return store.users.find((u) => u.id === id);
}

export async function getProviders() {
  return store.providers;
}

export async function getProvider(id: string): Promise<Provider | undefined> {
  return store.providers.find((p) => p.id === id);
}

export async function getCourses(providerId?: string): Promise<Course[]> {
  return providerId
    ? store.courses.filter((c) => c.providerId === providerId)
    : store.courses;
}

export async function getCourse(id: string): Promise<Course | undefined> {
  return store.courses.find((c) => c.id === id);
}

export async function getAgents(): Promise<Agent[]> {
  return store.agents;
}

export async function getAgent(id: string): Promise<Agent | undefined> {
  return store.agents.find((a) => a.id === id);
}

export async function getClients(query?: string): Promise<Client[]> {
  if (!query) return store.clients;
  const q = query.toLowerCase();
  return store.clients.filter((c) =>
    [c.firstName, c.lastName, c.email, c.nationality, c.passportNo]
      .join(" ")
      .toLowerCase()
      .includes(q),
  );
}

export async function getClient(id: string): Promise<Client | undefined> {
  return store.clients.find((c) => c.id === id);
}

export async function getApplications(clientId?: string): Promise<Application[]> {
  return clientId
    ? store.applications.filter((a) => a.clientId === clientId)
    : store.applications;
}

export async function getVisaCases(clientId?: string): Promise<VisaCase[]> {
  return clientId
    ? store.visaCases.filter((v) => v.clientId === clientId)
    : store.visaCases;
}

export async function getCommissions(): Promise<Commission[]> {
  return store.commissions;
}

export async function getClassBatches(): Promise<ClassBatch[]> {
  return store.classBatches;
}

/** Visas expiring within `days` from now, soonest first. */
export async function getExpiringVisas(days: number): Promise<VisaCase[]> {
  const limit = Date.now() + days * 86_400_000;
  return store.visaCases
    .filter(
      (v) =>
        v.status === "granted" &&
        v.expiryDate &&
        new Date(v.expiryDate).getTime() <= limit,
    )
    .sort(
      (a, b) =>
        new Date(a.expiryDate!).getTime() - new Date(b.expiryDate!).getTime(),
    );
}
