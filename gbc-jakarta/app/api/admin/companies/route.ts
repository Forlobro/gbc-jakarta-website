import { NextRequest, NextResponse } from "next/server"
import { createServerClient } from "../../../lib/supabase"

// GET /api/admin/companies — list all companies with photos
export async function GET() {
  const supabase = createServerClient()

  // Fetch companies
  const { data: companies, error: companiesError } = await supabase
    .from("gbc_companies")
    .select("*")
    .order("id", { ascending: false })

  if (companiesError) {
    console.error("[GET /api/admin/companies] Supabase error:", companiesError)
    return NextResponse.json({ error: companiesError.message }, { status: 500 })
  }

  // Fetch all photos
  const { data: photos } = await supabase
    .from("gbc_companies_photos")
    .select("*")

  // Merge manually
  const result = (companies ?? []).map((company) => ({
    ...company,
    gbc_companies_photos: (photos ?? []).filter(
      (p) => p.gbc_company_id === company.id,
    ),
  }))

  return NextResponse.json(result)
}

// POST /api/admin/companies — create new company
export async function POST(request: NextRequest) {
  const supabase = createServerClient()

  let body
  try {
    body = await request.json()
  } catch (e) {
    console.error("[POST /api/admin/companies] JSON parse error:", e)
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 })
  }

  const { name, category, description_id, description_en, start_date, end_date, link_video } = body
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
    typeof start_date === "string" && start_date.trim().length > 0
      ? start_date.trim()
      : null
  const normalizedEndDate =
    typeof end_date === "string" && end_date.trim().length > 0
      ? end_date.trim()
      : null
  const normalizedLinkVideo =
    typeof link_video === "string" && link_video.trim().length > 0
      ? link_video.trim()
      : null

  console.log("[POST /api/admin/companies] Inserting:", {
    name: normalizedName,
    category: normalizedCategory,
    description_id: normalizedDescriptionId,
    description_en: normalizedDescriptionEn,
    start_date: normalizedStartDate,
    end_date: normalizedEndDate,
    link_video: normalizedLinkVideo,
  })

  if (!normalizedName) {
    return NextResponse.json(
      { error: "Company name is required" },
      { status: 400 },
    )
  }

  if (!normalizedCategory) {
    return NextResponse.json({ error: "Category is required" }, { status: 400 })
  }

  if (normalizedStartDate && Number.isNaN(Date.parse(normalizedStartDate))) {
    return NextResponse.json(
      { error: "Invalid start_date format" },
      { status: 400 },
    )
  }

  if (normalizedEndDate && Number.isNaN(Date.parse(normalizedEndDate))) {
    return NextResponse.json(
      { error: "Invalid end_date format" },
      { status: 400 },
    )
  }

  if (
    normalizedStartDate &&
    normalizedEndDate &&
    normalizedStartDate > normalizedEndDate
  ) {
    return NextResponse.json(
      { error: "start_date cannot be later than end_date" },
      { status: 400 },
    )
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
    console.error("[POST /api/admin/companies] Supabase error:", error)
    return NextResponse.json(
      {
        error: error.message,
        code: error.code,
        details: error.details,
        hint: error.hint,
      },
      { status: 500 },
    )
  }

  return NextResponse.json(data, { status: 201 })
}
