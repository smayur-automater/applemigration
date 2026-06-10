import { promises as fs } from 'fs';
import path from 'path';
import type { StaffUser, Client, Case, Document, Note, Task } from './types';

// NOTE: This uses the filesystem as a simple datastore. Works for
// dev/self-hosted. On serverless hosts (Vercel/Lambda) the deploy bundle is
// read-only, so we fall back to /tmp — writable, but ephemeral and
// per-instance. Set CRM_DATA_DIR explicitly (e.g. a mounted volume), or swap
// this module for a DB/KV store, for durable production data.
function resolveDataDir(): string {
  if (process.env.CRM_DATA_DIR) return process.env.CRM_DATA_DIR;
  if (process.env.VERCEL || process.env.AWS_LAMBDA_FUNCTION_NAME) {
    return path.join('/tmp', 'applemigration-crm');
  }
  return path.join(process.cwd(), 'data', 'crm');
}
const DATA_DIR = resolveDataDir();

type CollectionName = 'staff' | 'clients' | 'cases' | 'documents' | 'notes' | 'tasks';
type CollectionType = {
  staff: StaffUser[];
  clients: Client[];
  cases: Case[];
  documents: Document[];
  notes: Note[];
  tasks: Task[];
};

// Simple per-collection write lock to prevent race conditions
const writeLocks = new Map<string, Promise<void>>();

async function ensureDir(): Promise<void> {
  await fs.mkdir(DATA_DIR, { recursive: true });
}

function filePath(collection: CollectionName): string {
  return path.join(DATA_DIR, `${collection}.json`);
}

export async function readCollection<K extends CollectionName>(
  collection: K
): Promise<CollectionType[K]> {
  try {
    const raw = await fs.readFile(filePath(collection), 'utf-8');
    return JSON.parse(raw) as CollectionType[K];
  } catch {
    return [] as unknown as CollectionType[K];
  }
}

export async function writeCollection<K extends CollectionName>(
  collection: K,
  data: CollectionType[K]
): Promise<void> {
  await ensureDir();
  const prev = writeLocks.get(collection) ?? Promise.resolve();
  const next = prev.then(() =>
    fs.writeFile(filePath(collection), JSON.stringify(data, null, 2), 'utf-8')
  );
  writeLocks.set(collection, next.then(() => undefined).catch(() => undefined));
  await next;
}

export function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}
