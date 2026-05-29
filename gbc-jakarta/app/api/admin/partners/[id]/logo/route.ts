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

// POST /api/admin/partners/[id]/logo
export async function POST(request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params
    const partnerId = parseInt(id)

    if (Number.isNaN(partnerId)) {
      return NextResponse.json({ error: msg.invalidId }, { status: 400 })
    }

    let body: { logoUrl?: string; oldLogoUrl?: string }
    try {
      body = await request.json()
    } catch {
      return NextResponse.json({ error: msg.invalidJson }, { status: 400 })
    }

    const { logoUrl, oldLogoUrl } = body

    if (!logoUrl) {
      return NextResponse.json({ error: msg.noLogoProvided }, { status: 400 })
    }

    const supabase = createServerClient()

    const { error: updateError } = await supabase
      .from("gbc_companies")
      .update({ logo_url: logoUrl })
      .eq("id", partnerId)

    if (updateError) {
      return NextResponse.json({ error: updateError.message }, { status: 500 })
    }

    if (oldLogoUrl) {
      const oldPath = extractStoragePath(oldLogoUrl)
      if (oldPath) {
        await supabase.storage.from("gbc_companies_photos").remove([oldPath])
      }
    }

    return NextResponse.json({ logo_url: logoUrl, message: msg.logoUploadSuccess }, { status: 201 })
  } catch (err) {
    console.error("[POST logo] Unexpected error:", err)
    return NextResponse.json({ error: msg.serverError }, { status: 500 })
  }
}

// DELETE /api/admin/partners/[id]/logo
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
      .select("logo_url")
      .eq("id", partnerId)
      .single()

    if (companyError) {
      return NextResponse.json({ error: msg.partnerNotFound }, { status: 404 })
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

    return NextResponse.json({ success: true, message: msg.logoDeleteSuccess })
  } catch (err) {
    console.error("[DELETE logo] Unexpected error:", err)
    return NextResponse.json({ error: msg.serverError }, { status: 500 })
  }
}
