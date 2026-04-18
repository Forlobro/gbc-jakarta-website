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

// POST /api/admin/companies/[id]/logo — upload/replace single logo
export async function POST(request: NextRequest, { params }: RouteParams) {
  const { id } = await params
  const companyId = parseInt(id)

  if (Number.isNaN(companyId)) {
    return NextResponse.json({ error: "Invalid company id" }, { status: 400 })
  }

  const supabase = createServerClient()
  const formData = await request.formData()
  const logo = formData.get("logo") as File | null

  if (!logo) {
    return NextResponse.json({ error: "No logo provided" }, { status: 400 })
  }

  if (!logo.type.startsWith("image/")) {
    return NextResponse.json(
      { error: "Logo must be an image" },
      { status: 400 },
    )
  }

  if (logo.size > 10 * 1024 * 1024) {
    return NextResponse.json(
      { error: "Logo max size is 10MB" },
      { status: 400 },
    )
  }

  const { data: company, error: companyError } = await supabase
    .from("gbc_companies")
    .select("logo_url")
    .eq("id", companyId)
    .single()

  if (companyError) {
    return NextResponse.json({ error: companyError.message }, { status: 404 })
  }

  const ext = logo.name.split(".").pop()?.toLowerCase() || "jpg"
  const fileName = `${companyId}/logo/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`

  const { error: uploadError } = await supabase.storage
    .from("gbc_companies_photos")
    .upload(fileName, logo, {
      contentType: logo.type,
      cacheControl: "3600",
      upsert: false,
    })

  if (uploadError) {
    return NextResponse.json({ error: uploadError.message }, { status: 500 })
  }

  const { data: urlData } = supabase.storage
    .from("gbc_companies_photos")
    .getPublicUrl(fileName)

  const newLogoUrl = urlData.publicUrl
  const oldLogoUrl = company.logo_url

  const { error: updateError } = await supabase
    .from("gbc_companies")
    .update({ logo_url: newLogoUrl })
    .eq("id", companyId)

  if (updateError) {
    await supabase.storage.from("gbc_companies_photos").remove([fileName])
    return NextResponse.json({ error: updateError.message }, { status: 500 })
  }

  const oldPath = oldLogoUrl ? extractStoragePath(oldLogoUrl) : null
  if (oldPath && oldPath !== fileName) {
    await supabase.storage.from("gbc_companies_photos").remove([oldPath])
  }

  return NextResponse.json({ logo_url: newLogoUrl }, { status: 201 })
}

// DELETE /api/admin/companies/[id]/logo — remove logo and clear logo_url
export async function DELETE(_request: NextRequest, { params }: RouteParams) {
  const { id } = await params
  const companyId = parseInt(id)

  if (Number.isNaN(companyId)) {
    return NextResponse.json({ error: "Invalid company id" }, { status: 400 })
  }

  const supabase = createServerClient()

  const { data: company, error: companyError } = await supabase
    .from("gbc_companies")
    .select("logo_url")
    .eq("id", companyId)
    .single()

  if (companyError) {
    return NextResponse.json({ error: companyError.message }, { status: 404 })
  }

  const oldLogoUrl = company.logo_url
  const oldPath = oldLogoUrl ? extractStoragePath(oldLogoUrl) : null

  const { error: updateError } = await supabase
    .from("gbc_companies")
    .update({ logo_url: null })
    .eq("id", companyId)

  if (updateError) {
    return NextResponse.json({ error: updateError.message }, { status: 500 })
  }

  if (oldPath) {
    await supabase.storage.from("gbc_companies_photos").remove([oldPath])
  }

  return NextResponse.json({ success: true })
}
