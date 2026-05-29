import { NextRequest, NextResponse } from "next/server"
import { createServerClient } from "../../../../../lib/supabase.server"
import { msg } from "../../../../../lib/messages"

export const dynamic = "force-dynamic"

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

// POST /api/admin/partners/[id]/brochure
export async function POST(request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params
    const partnerId = parseInt(id)

    if (Number.isNaN(partnerId)) {
      return NextResponse.json({ error: msg.invalidId }, { status: 400 })
    }

    let body: { brochureUrl?: string; oldBrochureUrl?: string }
    try {
      body = await request.json()
    } catch {
      return NextResponse.json({ error: msg.invalidJson }, { status: 400 })
    }

    const { brochureUrl, oldBrochureUrl } = body

    if (!brochureUrl) {
      return NextResponse.json({ error: msg.noBrochureProvided }, { status: 400 })
    }

    const supabase = createServerClient()

    const { error: updateError } = await supabase
      .from("gbc_companies")
      .update({ link_brochure: brochureUrl })
      .eq("id", partnerId)

    if (updateError) {
      console.error("[POST brochure] DB update error:", updateError)
      return NextResponse.json({ error: updateError.message }, { status: 500 })
    }

    if (oldBrochureUrl) {
      const oldPath = extractStoragePath(oldBrochureUrl)
      if (oldPath && oldPath.startsWith("pdf/")) {
        await supabase.storage.from("gbc_companies_photos").remove([oldPath])
      }
    }

    return NextResponse.json(
      { link_brochure: brochureUrl, message: msg.brochureUploadSuccess },
      { status: 201 },
    )
  } catch (err) {
    console.error("[POST brochure] Unexpected error:", err)
    return NextResponse.json({ error: msg.serverError }, { status: 500 })
  }
}

// DELETE /api/admin/partners/[id]/brochure
export async function DELETE(request: NextRequest, { params }: RouteParams) {
  try {
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
  } catch (err) {
    console.error("[DELETE brochure] Unexpected error:", err)
    return NextResponse.json({ error: msg.serverError }, { status: 500 })
  }
}
