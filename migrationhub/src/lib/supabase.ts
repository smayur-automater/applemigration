import { createClient as createSupabaseClient } from "@supabase/supabase-js";

/**
 * Supabase backend (DATA_BACKEND=supabase).
 *
 * Apply `supabase/schema.sql` to your project, set the env vars from
 * `.env.example`, then port the functions in `data.ts`/`actions.ts` to
 * queries on this client. Row-level security in the schema scopes every
 * table to the caller's agency (tenant), so the anon-key client is safe
 * to use with authenticated users.
 */
export function getSupabase() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) {
    throw new Error(
      "Set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY to use the Supabase backend.",
    );
  }
  return createSupabaseClient(url, key);
}

export function isSupabaseEnabled(): boolean {
  return process.env.DATA_BACKEND === "supabase";
}
