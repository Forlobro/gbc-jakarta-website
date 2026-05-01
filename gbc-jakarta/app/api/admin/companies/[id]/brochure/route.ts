import { NextRequest, NextResponse } from "next/server"
import { createServerClient } from "../../../../../lib/supabase"

interface RouteParams {
  params: Promise<{ id: string }>
}

function extractStoragePath(publicUrl: string) {
  try {
    const url = new URL(publicUrl)
    return (
      url.pathname.split(
        "/storage/v1/object/public/gbc_companies_photos/",
      )[1] || null
    )
  } catch {
    return null
  }
}

// POST /api/admin/companies/[id]/brochure — upload/replace PDF brochure
export async function POST(request: NextRequest, { params }: RouteParams) {
  const { id } = await params
  const companyId = parseInt(id)

  if (Number.isNaN(companyId)) {
    return NextResponse.json({ error: "Invalid company id" }, { status: 400 })
  }

  const supabase = createServerClient()
  const formData = await request.formData()
  const file = formData.get("brochure") as File | null

  if (!file) {
    return NextResponse.json({ error: "No file provided" }, { status: 400 })
  }

  if (file.type !== "application/pdf") {
    return NextResponse.json(
      { error: "File harus berupa PDF" },
      { status: 400 },
    )
  }

  if (file.size > 20 * 1024 * 1024) {
    return NextResponse.json(
      { error: "Ukuran file PDF maksimal 20MB" },
      { status: 400 },
    )
  }

  const { data: company, error: companyError } = await supabase
    .from("gbc_companies")
    .select("link_brochure")
    .eq("id", companyId)
    .single()

  if (companyError) {
    return NextResponse.json({ error: companyError.message }, { status: 404 })
  }

  // Store under pdf/<companyId>/ folder
  const fileName = `pdf/${companyId}/${Date.now()}-${Math.random().toString(36).slice(2)}.pdf`

  const { error: uploadError } = await supabase.storage
    .from("gbc_companies_photos")
    .upload(fileName, file, {
      contentType: "application/pdf",
      cacheControl: "3600",
      upsert: false,
    })

  if (uploadError) {
    return NextResponse.json({ error: uploadError.message }, { status: 500 })
  }

  const { data: urlData } = supabase.storage
    .from("gbc_companies_photos")
    .getPublicUrl(fileName)

  const newBrochureUrl = urlData.publicUrl
  const oldBrochureUrl = company.link_brochure

  const { error: updateError } = await supabase
    .from("gbc_companies")
    .update({ link_brochure: newBrochureUrl })
    .eq("id", companyId)

  if (updateError) {
    await supabase.storage.from("gbc_companies_photos").remove([fileName])
    return NextResponse.json({ error: updateError.message }, { status: 500 })
  }

  // Remove old brochure from storage if it was in the pdf/ folder
  const oldPath = oldBrochureUrl ? extractStoragePath(oldBrochureUrl) : null
  if (oldPath && oldPath !== fileName && oldPath.startsWith("pdf/")) {
    await supabase.storage.from("gbc_companies_photos").remove([oldPath])
  }

  return NextResponse.json({ link_brochure: newBrochureUrl }, { status: 201 })
}

// DELETE /api/admin/companies/[id]/brochure — remove brochure and clear link_brochure
export async function DELETE(_request: NextRequest, { params }: RouteParams) {
  const { id } = await params
  const companyId = parseInt(id)

  if (Number.isNaN(companyId)) {
    return NextResponse.json({ error: "Invalid company id" }, { status: 400 })
  }

  const supabase = createServerClient()

  const { data: company, error: companyError } = await supabase
    .from("gbc_companies")
    .select("link_brochure")
    .eq("id", companyId)
    .single()

  if (companyError) {
    return NextResponse.json({ error: companyError.message }, { status: 404 })
  }

  const oldBrochureUrl = company.link_brochure
  const oldPath = oldBrochureUrl ? extractStoragePath(oldBrochureUrl) : null

  const { error: updateError } = await supabase
    .from("gbc_companies")
    .update({ link_brochure: null })
    .eq("id", companyId)

  if (updateError) {
    return NextResponse.json({ error: updateError.message }, { status: 500 })
  }

  if (oldPath && oldPath.startsWith("pdf/")) {
    await supabase.storage.from("gbc_companies_photos").remove([oldPath])
  }

  return NextResponse.json({ success: true })
}
