import { createClient, type SupabaseClient } from "@supabase/supabase-js";

const SUPABASE_URL = process.env.SUPABASE_URL ?? process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_ANON_KEY =
  process.env.SUPABASE_ANON_KEY ?? process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

let cachedServiceClient: SupabaseClient | null = null;

/**
 * Create a Supabase client using the service role key. Only available on the server.
 */
export const getSupabaseServiceRoleClient = (): SupabaseClient | null => {
  if (typeof window !== "undefined") {
    throw new Error("getSupabaseServiceRoleClient must only be used on the server");
  }

  if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
    if (process.env.NODE_ENV !== "production") {
      console.warn("Supabase service role env not configured: SUPABASE_URL / SUPABASE_ANON_KEY");
    }
    return null;
  }

  if (!cachedServiceClient) {
    cachedServiceClient = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
      auth: { persistSession: false, autoRefreshToken: false },
    });
  }

  return cachedServiceClient;
};
