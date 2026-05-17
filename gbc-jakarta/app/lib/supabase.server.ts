import { createClient } from "@supabase/supabase-js"

/**
 * Server-only Supabase client using the Service Role Key.
 * Import this ONLY in API routes and server actions — never in client components.
 * Uses Service Role Key to bypass RLS.
 */
export function createServerClient() {
  return createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!)
}
