import { NextRequest, NextResponse } from "next/server"
import { createServerClient } from "../../../lib/supabase.server"
import { msg } from "../../../lib/messages"

interface RouteParams {
  params: Promise<{ id: string }>
}

// GET /api/partners/[id] — public, single company with photos
export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params
    const supabase = createServerClient()
    const companyId = parseInt(id)

    const { data: company, error } = await supabase
      .from("gbc_companies")
      .select("*")
      .eq("id", companyId)
      .single()

    if (error || !company) {
      return NextResponse.json({ error: msg.partnerNotFound }, { status: 404 })
    }

    const { data: photos } = await supabase
      .from("gbc_companies_photos")
      .select("*")
      .eq("gbc_company_id", companyId)

    return NextResponse.json({
      ...company,
      gbc_companies_photos: photos ?? [],
    })
  } catch (err) {
    console.error("[GET /api/partners/[id]] Unexpected error:", err)
    return NextResponse.json({ error: msg.serverError }, { status: 500 })
  }
}
