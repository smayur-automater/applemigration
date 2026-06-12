import * as seed from "./seed";
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

/**
 * In-memory data store used when DATA_BACKEND=seed (the default).
 *
 * Every read/write in `data.ts` and `actions.ts` goes through this object,
 * so swapping to the Supabase backend (see `supabase/schema.sql` and
 * `supabase.ts`) only means replacing the implementations in `data.ts` —
 * pages and components never touch storage directly.
 */
export interface Store {
  branches: Branch[];
  users: User[];
  providers: Provider[];
  courses: Course[];
  agents: Agent[];
  clients: Client[];
  applications: Application[];
  visaCases: VisaCase[];
  commissions: Commission[];
  classBatches: ClassBatch[];
}

function createStore(): Store {
  return structuredClone({
    branches: seed.branches,
    users: seed.users,
    providers: seed.providers,
    courses: seed.courses,
    agents: seed.agents,
    clients: seed.clients,
    applications: seed.applications,
    visaCases: seed.visaCases,
    commissions: seed.commissions,
    classBatches: seed.classBatches,
  });
}

// Survive dev-server HMR by stashing the store on globalThis.
const globalForStore = globalThis as unknown as { __migrationhubStore?: Store };

export const store: Store = (globalForStore.__migrationhubStore ??= createStore());

export function newId(prefix: string): string {
  return `${prefix}-${Math.random().toString(36).slice(2, 8)}`;
}
