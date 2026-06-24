"use client";

import { createBrowserClient } from "@supabase/ssr";
import type { Database } from "@/app/types/database";

function isValidSupabaseUrl(value: string | undefined): value is string {
  return typeof value === "string" && /^https?:\/\//.test(value);
}

export function createClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!isValidSupabaseUrl(supabaseUrl) || !supabaseAnonKey) {
    return null;
  }

  return createBrowserClient<Database>(
    supabaseUrl,
    supabaseAnonKey,
  );
}