import { NextRequest, NextResponse } from "next/server"
import { createServerClient } from "../../lib/supabase.server"
import { msg } from "../../lib/messages"

// GET /api/partners — public, read all companies with photos
export async function GET(request: NextRequest) {
  try {
    const supabase = createServerClient()

    const { data: companies, error } = await supabase
      .from("gbc_companies")
      .select("*")
      .order("id", { ascending: true })

    if (error) {
      return NextResponse.json({ error: msg.serverError }, { status: 500 })
    }

    const { data: photos } = await supabase.from("gbc_companies_photos").select("*")

    const result = (companies ?? []).map((company) => ({
      ...company,
      gbc_companies_photos: (photos ?? []).filter((p) => p.gbc_company_id === company.id),
    }))

    return NextResponse.json(result)
  } catch (err) {
    console.error("[GET /api/partners] Unexpected error:", err)
    return NextResponse.json({ error: msg.serverError }, { status: 500 })
  }
}
