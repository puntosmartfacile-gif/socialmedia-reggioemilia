import { createClient } from "@supabase/supabase-js";
import type { Database } from "@/app/types/database";

function isValidSupabaseUrl(value: string | undefined): value is string {
  return typeof value === "string" && /^https?:\/\//.test(value);
}

export function createAdminClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!isValidSupabaseUrl(supabaseUrl) || !serviceRoleKey) {
    return null;
  }

  return createClient<Database>(
    supabaseUrl,
    serviceRoleKey,
    {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    },
  );
}