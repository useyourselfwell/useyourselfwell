import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

// Create a properly typed supabase client or a stub that logs
function createSupabaseClient() {
  if (supabaseUrl && supabaseKey) {
    return createClient(supabaseUrl, supabaseKey);
  }
  return null;
}

export const supabase = createSupabaseClient();

export function requireSupabase() {
  if (!supabase) {
    throw new Error(
      "Supabase is not configured. Set NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY.",
    );
  }
  return supabase;
}
