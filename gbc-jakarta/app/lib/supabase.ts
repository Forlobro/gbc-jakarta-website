import { createBrowserClient } from "@supabase/ssr"

// Types matching Supabase tables
export interface GbcCompany {
  id: number
  name: string
  category: string
  description_id: string | null
  description_en: string | null
  start_date: string
  end_date: string
  link_video: string | null
  link_brochure: string | null
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

export interface GbcCompanyCategory {
  id: number
  name: string
}

export interface GbcEvent {
  id: number
  title: string
  location: string
  venue: string
  description_en: string
  description_id: string
  status: "upcoming" | "accomplished"
  is_published: boolean
  link_video_1: string | null
  link_video_2: string | null
  event_start: string | null
  event_end: string | null
  created_at: string | null
  created_by: string | null
  updated_at: string | null
  updated_by: string | null
}

export interface GbcEventPhoto {
  id: number
  photo_url: string
  gbc_event_id: number
}

export interface GbcEventWithPhotos extends GbcEvent {
  gbc_events_photos: GbcEventPhoto[]
}

// Browser client (for client components)
// Returns null during build/SSR when env vars are not available
export function createClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  if (!url || !key) return null as never
  return createBrowserClient(url, key)
}
