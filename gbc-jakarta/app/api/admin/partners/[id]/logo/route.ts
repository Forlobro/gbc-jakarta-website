import { NextRequest, NextResponse } from "next/server"
import { createServerClient } from "../../../../../lib/supabase"
import { getLang, getMsg } from "../../../../../api/messages"

interface RouteParams {
  params: Promise<{ id: string }>
}

function extractStoragePath(publicUrl: string) {
  try {
    const url = new URL(publicUrl)
    return url.pathname.split("/storage/v1/object/public/gbc_companies_photos/")[1] || null
  } catch {
    return null
  }
}

// POST /api/admin/partners/[id]/logo — upload/replace single logo
export async function POST(request: NextRequest, { params }: RouteParams) {
  const lang = getLang(request)
  const m = getMsg(lang)
  const { id } = await params
  const partnerId = parseInt(id)

  if (Number.isNaN(partnerId)) {
    return NextResponse.json({ error: m.invalidId }, { status: 400 })
  }

  const supabase = createServerClient()
  const formData = await request.formData()
  const logo = formData.get("logo") as File | null

  if (!logo) {
    return NextResponse.json({ error: m.noLogoProvided }, { status: 400 })
  }

  if (logo.type !== "image/png") {
    return NextResponse.json({ error: m.logoMustBePng }, { status: 400 })
  }

  if (logo.size > 10 * 1024 * 1024) {
    return NextResponse.json({ error: m.logoTooLarge }, { status: 400 })
  }

  const { data: company, error: companyError } = await supabase
    .from("gbc_companies")
    .select("logo_url")
    .eq("id", partnerId)
    .single()

  if (companyError) {
    return NextResponse.json({ error: m.companyNotFound }, { status: 404 })
  }

  const ext = logo.name.split(".").pop()?.toLowerCase() || "png"
  const fileName = `${partnerId}/logo/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`

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

  const { data: urlData } = supabase.storage.from("gbc_companies_photos").getPublicUrl(fileName)

  const newLogoUrl = urlData.publicUrl
  const oldLogoUrl = company.logo_url

  const { error: updateError } = await supabase
    .from("gbc_companies")
    .update({ logo_url: newLogoUrl })
    .eq("id", partnerId)

  if (updateError) {
    await supabase.storage.from("gbc_companies_photos").remove([fileName])
    return NextResponse.json({ error: updateError.message }, { status: 500 })
  }

  const oldPath = oldLogoUrl ? extractStoragePath(oldLogoUrl) : null
  if (oldPath && oldPath !== fileName) {
    await supabase.storage.from("gbc_companies_photos").remove([oldPath])
  }

  return NextResponse.json({ logo_url: newLogoUrl, message: m.logoUploadSuccess }, { status: 201 })
}

// DELETE /api/admin/partners/[id]/logo — remove logo and clear logo_url
export async function DELETE(request: NextRequest, { params }: RouteParams) {
  const lang = getLang(request)
  const m = getMsg(lang)
  const { id } = await params
  const partnerId = parseInt(id)

  if (Number.isNaN(partnerId)) {
    return NextResponse.json({ error: m.invalidId }, { status: 400 })
  }

  const supabase = createServerClient()

  const { data: company, error: companyError } = await supabase
    .from("gbc_companies")
    .select("logo_url")
    .eq("id", partnerId)
    .single()

  if (companyError) {
    return NextResponse.json({ error: m.companyNotFound }, { status: 404 })
  }

  const oldLogoUrl = company.logo_url
  const oldPath = oldLogoUrl ? extractStoragePath(oldLogoUrl) : null

  const { error: updateError } = await supabase
    .from("gbc_companies")
    .update({ logo_url: null })
    .eq("id", partnerId)

  if (updateError) {
    return NextResponse.json({ error: updateError.message }, { status: 500 })
  }

  if (oldPath) {
    await supabase.storage.from("gbc_companies_photos").remove([oldPath])
  }

  return NextResponse.json({ success: true, message: m.logoDeleteSuccess })
}
