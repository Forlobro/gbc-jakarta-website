import { createBrowserClient } from "@supabase/ssr"
import { createClient as createSupabaseClient } from "@supabase/supabase-js"

// Types matching Supabase tables
export interface GbcCompany {
  id: number
  name: string
  category: string
  description: string | null
  start_date: string | null
  end_date: string | null
  link_video: string | null
  logo_url: string | null
  created_at?: string | null
}

export interface GbcCompanyPhoto {
  id: number
  gbc_company_id: number | null
  photo_url: string | null
}

export interface GbcCompanyWithPhotos extends GbcCompany {
  gbc_companies_photos: GbcCompanyPhoto[]
}

// Browser client (for client components)
export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  )
}

// Simple server client (for API routes / server actions)
// Uses Service Role Key to bypass RLS — only runs server-side
export function createServerClient() {
  return createSupabaseClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
  )
}
