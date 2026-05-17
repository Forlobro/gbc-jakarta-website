import { NextRequest, NextResponse } from "next/server"
import { createServerClient } from "../../../../lib/supabase.server"
import { getLang, getMsg } from "../../../../lib/messages"

interface RouteParams {
  params: Promise<{ id: string }>
}

// GET /api/admin/partners/[id]
export async function GET(request: NextRequest, { params }: RouteParams) {
  const lang = getLang(request)
  const m = getMsg(lang)
  const { id } = await params
  const supabase = createServerClient()
  const companyId = parseInt(id)

  const { data: company, error } = await supabase
    .from("gbc_companies")
    .select("*")
    .eq("id", companyId)
    .single()

  if (error) {
    return NextResponse.json({ error: m.companyNotFound }, { status: 404 })
  }

  const { data: photos } = await supabase
    .from("gbc_companies_photos")
    .select("*")
    .eq("gbc_company_id", companyId)

  return NextResponse.json({
    ...company,
    gbc_companies_photos: photos ?? [],
  })
}

// PUT /api/admin/partners/[id]
export async function PUT(request: NextRequest, { params }: RouteParams) {
  const lang = getLang(request)
  const m = getMsg(lang)
  const { id } = await params
  const supabase = createServerClient()
  const companyId = parseInt(id)

  if (Number.isNaN(companyId)) {
    return NextResponse.json({ error: m.invalidId }, { status: 400 })
  }

  let body
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: m.invalidJson }, { status: 400 })
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
    typeof start_date === "string" && start_date.trim().length > 0 ? start_date.trim() : null
  const normalizedEndDate =
    typeof end_date === "string" && end_date.trim().length > 0 ? end_date.trim() : null
  const normalizedLinkVideo =
    typeof link_video === "string" && link_video.trim().length > 0 ? link_video.trim() : null

  if (!normalizedName) {
    return NextResponse.json({ error: m.nameRequired }, { status: 400 })
  }

  if (!normalizedCategory) {
    return NextResponse.json({ error: m.categoryRequired }, { status: 400 })
  }

  if (normalizedStartDate && Number.isNaN(Date.parse(normalizedStartDate))) {
    return NextResponse.json({ error: m.invalidStartDate }, { status: 400 })
  }

  if (normalizedEndDate && Number.isNaN(Date.parse(normalizedEndDate))) {
    return NextResponse.json({ error: m.invalidEndDate }, { status: 400 })
  }

  if (normalizedStartDate && normalizedEndDate && normalizedStartDate > normalizedEndDate) {
    return NextResponse.json({ error: m.startAfterEnd }, { status: 400 })
  }

  const { data, error } = await supabase
    .from("gbc_companies")
    .update({
      name: normalizedName,
      category: normalizedCategory,
      description_id: normalizedDescriptionId,
      description_en: normalizedDescriptionEn,
      start_date: normalizedStartDate,
      end_date: normalizedEndDate,
      link_video: normalizedLinkVideo,
    })
    .eq("id", companyId)
    .select()
    .single()

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ ...data, message: m.companyUpdateSuccess })
}

// DELETE /api/admin/partners/[id]
export async function DELETE(request: NextRequest, { params }: RouteParams) {
  const lang = getLang(request)
  const m = getMsg(lang)
  const { id } = await params
  const supabase = createServerClient()
  const companyId = parseInt(id)

  if (Number.isNaN(companyId)) {
    return NextResponse.json({ error: m.invalidId }, { status: 400 })
  }

  // Delete logo from storage first
  const { data: company } = await supabase
    .from("gbc_companies")
    .select("logo_url")
    .eq("id", companyId)
    .single()

  if (company?.logo_url) {
    try {
      const url = new URL(company.logo_url)
      const path = url.pathname.split("/storage/v1/object/public/gbc_companies_photos/")[1]
      if (path) {
        await supabase.storage.from("gbc_companies_photos").remove([path])
      }
    } catch {
      // Continue delete flow even if logo storage cleanup fails
    }
  }

  // Delete photos from storage first
  const { data: photos } = await supabase
    .from("gbc_companies_photos")
    .select("photo_url")
    .eq("gbc_company_id", companyId)

  if (photos && photos.length > 0) {
    const filePaths = photos
      .map((p) => {
        if (!p.photo_url) return null
        try {
          const url = new URL(p.photo_url)
          return url.pathname.split("/storage/v1/object/public/gbc_companies_photos/")[1] || null
        } catch {
          return null
        }
      })
      .filter(Boolean) as string[]

    if (filePaths.length > 0) {
      await supabase.storage.from("gbc_companies_photos").remove(filePaths)
    }
  }

  // Delete photos from DB
  await supabase.from("gbc_companies_photos").delete().eq("gbc_company_id", companyId)

  // Delete Partner
  const { error } = await supabase.from("gbc_companies").delete().eq("id", companyId)

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ success: true, message: m.companyDeleteSuccess })
}
