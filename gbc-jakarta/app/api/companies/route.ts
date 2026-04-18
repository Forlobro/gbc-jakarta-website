import { NextResponse } from "next/server"
import { createServerClient } from "../../lib/supabase"

// GET /api/companies — public, read all companies with photos
export async function GET() {
  const supabase = createServerClient()

  const { data: companies, error } = await supabase
    .from("gbc_companies")
    .select("*")
    .order("id", { ascending: true })

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  const { data: photos } = await supabase
    .from("gbc_companies_photos")
    .select("*")

  const result = (companies ?? []).map((company) => ({
    ...company,
    gbc_companies_photos: (photos ?? []).filter(
      (p) => p.gbc_company_id === company.id,
    ),
  }))

  return NextResponse.json(result)
}
