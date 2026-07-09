import { createClient, SupabaseClient } from "@supabase/supabase-js";

let client: SupabaseClient | null = null;

/**
 * Lazily creates the Supabase client on first use. Falls back to placeholder
 * values when env vars are unset so importing this module (e.g. during
 * build-time page-data collection) never throws.
 */
function getSupabase(): SupabaseClient {
  if (!client) {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://placeholder.supabase.co";
    const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "placeholder-anon-key";
    client = createClient(url, anon);
  }
  return client;
}

// Proxy so existing call sites (`supabase.from(...)`) keep working unchanged.
export const supabase = new Proxy({} as SupabaseClient, {
  get(_target, prop, receiver) {
    return Reflect.get(getSupabase(), prop, receiver);
  },
});
