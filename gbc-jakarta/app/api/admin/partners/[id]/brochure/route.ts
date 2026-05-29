import { NextRequest, NextResponse } from "next/server"
import { createServerClient } from "../../../../../lib/supabase.server"
import { msg } from "../../../../../lib/messages"

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

// POST /api/admin/partners/[id]/brochure — upload/replace PDF brochure
export async function POST(request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params
    const partnerId = parseInt(id)

    if (Number.isNaN(partnerId)) {
      return NextResponse.json({ error: msg.invalidId }, { status: 400 })
    }

    const supabase = createServerClient()
    const formData = await request.formData()
    const file = formData.get("brochure") as File | null

    if (!file) {
      return NextResponse.json({ error: msg.noBrochureProvided }, { status: 400 })
    }

    if (file.type !== "application/pdf") {
      return NextResponse.json({ error: msg.brochureMustBePdf }, { status: 400 })
    }

    if (file.size > 20 * 1024 * 1024) {
      return NextResponse.json({ error: msg.brochureTooLarge }, { status: 400 })
    }

    const { data: company, error: companyError } = await supabase
      .from("gbc_companies")
      .select("link_brochure")
      .eq("id", partnerId)
      .single()

    if (companyError) {
      return NextResponse.json({ error: msg.partnerNotFound }, { status: 404 })
    }

    const fileName = `pdf/${partnerId}/${Date.now()}-${Math.random().toString(36).slice(2)}.pdf`

    const { error: uploadError } = await supabase.storage
      .from("gbc_companies_photos")
      .upload(fileName, file, {
        contentType: "application/pdf",
        cacheControl: "3600",
        upsert: false,
      })

    if (uploadError) {
      console.error("[POST brochure] Upload error:", uploadError)
      return NextResponse.json({ error: uploadError.message }, { status: 500 })
    }

    const { data: urlData } = supabase.storage.from("gbc_companies_photos").getPublicUrl(fileName)

    const newBrochureUrl = urlData.publicUrl
    const oldBrochureUrl = company.link_brochure

    const { error: updateError } = await supabase
      .from("gbc_companies")
      .update({ link_brochure: newBrochureUrl })
      .eq("id", partnerId)

    if (updateError) {
      console.error("[POST brochure] DB update error:", updateError)
      await supabase.storage.from("gbc_companies_photos").remove([fileName])
      return NextResponse.json({ error: updateError.message }, { status: 500 })
    }

    const oldPath = oldBrochureUrl ? extractStoragePath(oldBrochureUrl) : null
    if (oldPath && oldPath !== fileName && oldPath.startsWith("pdf/")) {
      await supabase.storage.from("gbc_companies_photos").remove([oldPath])
    }

    return NextResponse.json(
      { link_brochure: newBrochureUrl, message: msg.brochureUploadSuccess },
      { status: 201 },
    )
  } catch (err) {
    console.error("[POST brochure] Unexpected error:", err)
    return NextResponse.json({ error: msg.serverError }, { status: 500 })
  }
}

// DELETE /api/admin/partners/[id]/brochure — remove brochure and clear link_brochure
export async function DELETE(request: NextRequest, { params }: RouteParams) {
  const { id } = await params
  const partnerId = parseInt(id)

  if (Number.isNaN(partnerId)) {
    return NextResponse.json({ error: msg.invalidId }, { status: 400 })
  }

  const supabase = createServerClient()

  const { data: company, error: companyError } = await supabase
    .from("gbc_companies")
    .select("link_brochure")
    .eq("id", partnerId)
    .single()

  if (companyError) {
    return NextResponse.json({ error: msg.partnerNotFound }, { status: 404 })
  }

  const oldBrochureUrl = company.link_brochure
  const oldPath = oldBrochureUrl ? extractStoragePath(oldBrochureUrl) : null

  const { error: updateError } = await supabase
    .from("gbc_companies")
    .update({ link_brochure: null })
    .eq("id", partnerId)

  if (updateError) {
    return NextResponse.json({ error: updateError.message }, { status: 500 })
  }

  if (oldPath && oldPath.startsWith("pdf/")) {
    await supabase.storage.from("gbc_companies_photos").remove([oldPath])
  }

  return NextResponse.json({ success: true, message: msg.brochureDeleteSuccess })
}
