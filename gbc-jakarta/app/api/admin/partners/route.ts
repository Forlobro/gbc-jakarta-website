import { NextRequest, NextResponse } from "next/server"
import { createServerClient } from "../../../lib/supabase.server"
import { msg } from "../../../lib/messages"

// GET /api/admin/partners — list all companies with photos
export async function GET(request: NextRequest) {
  try {
    const supabase = createServerClient()

    const { data: companies, error: companiesError } = await supabase
      .from("gbc_companies")
      .select("*")
      .order("id", { ascending: false })

    if (companiesError) {
      console.error("[GET /api/admin/partners] Supabase error:", companiesError)
      return NextResponse.json({ error: msg.serverError }, { status: 500 })
    }

    const { data: photos } = await supabase.from("gbc_companies_photos").select("*")

    const result = (companies ?? []).map((company) => ({
      ...company,
      gbc_companies_photos: (photos ?? []).filter((p) => p.gbc_company_id === company.id),
    }))

    return NextResponse.json(result)
  } catch (err) {
    console.error("[GET /api/admin/partners] Unexpected error:", err)
    return NextResponse.json({ error: msg.serverError }, { status: 500 })
  }
}

// POST /api/admin/partners — create new company
export async function POST(request: NextRequest) {
  try {
    const supabase = createServerClient()

    let body
    try {
      body = await request.json()
    } catch (e) {
      console.error("[POST /api/admin/partners] JSON parse error:", e)
      return NextResponse.json({ error: msg.invalidJson }, { status: 400 })
    }

    const { name, category, description_id, description_en, start_date, end_date, link_video } =
      body
    const normalizedName = typeof name === "string" ? name.trim() : ""
    const normalizedCategory = typeof category === "string" ? category.trim() : ""
    const normalizedDescriptionId =
      typeof description_id === "string" && description_id.trim().length > 0
        ? description_id.trim()
        : null
    const normalizedDescriptionEn =
      typeof description_en === "string" && description_en.trim().length > 0
        ? description_en.trim()
        : null
    const normalizedStartDate =
      typeof start_date === "string" && start_date.trim().length > 0 ? start_date.trim() : null
    const normalizedEndDate =
      typeof end_date === "string" && end_date.trim().length > 0 ? end_date.trim() : null
    const normalizedLinkVideo =
      typeof link_video === "string" && link_video.trim().length > 0 ? link_video.trim() : null

    if (!normalizedName) {
      return NextResponse.json({ error: msg.nameRequired }, { status: 400 })
    }

    if (!normalizedCategory) {
      return NextResponse.json({ error: msg.partnerRequired }, { status: 400 })
    }

    if (normalizedStartDate && Number.isNaN(Date.parse(normalizedStartDate))) {
      return NextResponse.json({ error: msg.invalidStartDate }, { status: 400 })
    }

    if (normalizedEndDate && Number.isNaN(Date.parse(normalizedEndDate))) {
      return NextResponse.json({ error: msg.invalidEndDate }, { status: 400 })
    }

    if (normalizedStartDate && normalizedEndDate && normalizedStartDate > normalizedEndDate) {
      return NextResponse.json({ error: msg.startAfterEnd }, { status: 400 })
    }

    const { data, error } = await supabase
      .from("gbc_companies")
      .insert({
        name: normalizedName,
        category: normalizedCategory,
        description_id: normalizedDescriptionId,
        description_en: normalizedDescriptionEn,
        start_date: normalizedStartDate,
        end_date: normalizedEndDate,
        link_video: normalizedLinkVideo,
      })
      .select()
      .single()

    if (error) {
      console.error("[POST /api/admin/partners] Supabase error:", error)
      return NextResponse.json({ error: msg.serverError }, { status: 500 })
    }

    return NextResponse.json({ ...data, message: msg.partnerCreateSuccess }, { status: 201 })
  } catch (err) {
    console.error("[POST /api/admin/partners] Unexpected error:", err)
    return NextResponse.json({ error: msg.serverError }, { status: 500 })
  }
}
