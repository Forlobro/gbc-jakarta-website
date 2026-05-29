import { NextRequest, NextResponse } from "next/server"
import { createServerClient } from "../../../../../lib/supabase.server"
import { msg } from "../../../../../lib/messages"

export const dynamic = "force-dynamic"

interface RouteParams {
  params: Promise<{ id: string }>
}

// POST /api/admin/partners/[id]/photos
export async function POST(request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params
    const companyId = parseInt(id)

    if (Number.isNaN(companyId)) {
      return NextResponse.json({ error: msg.invalidId }, { status: 400 })
    }

    let body: { photoUrl?: string }
    try {
      body = await request.json()
    } catch {
      return NextResponse.json({ error: msg.invalidJson }, { status: 400 })
    }

    const { photoUrl } = body

    if (!photoUrl) {
      return NextResponse.json({ error: msg.noPhotosProvided }, { status: 400 })
    }

    const supabase = createServerClient()

    const { data: photo, error: dbError } = await supabase
      .from("gbc_companies_photos")
      .insert({ gbc_company_id: companyId, photo_url: photoUrl })
      .select()
      .single()

    if (dbError) {
      console.error("[POST photos] DB insert error:", dbError)
      return NextResponse.json({ error: dbError.message }, { status: 500 })
    }

    return NextResponse.json({ uploaded: [photo] }, { status: 201 })
  } catch (err) {
    console.error("[POST /api/admin/partners/[id]/photos] Unexpected error:", err)
    return NextResponse.json({ error: msg.serverError }, { status: 500 })
  }
}

// DELETE /api/admin/partners/[id]/photos?photoId=X
export async function DELETE(request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params
    const supabase = createServerClient()

    const { searchParams } = new URL(request.url)
    const photoId = searchParams.get("photoId")

    if (!photoId) {
      return NextResponse.json({ error: msg.photoIdRequired }, { status: 400 })
    }

    const { data: photo } = await supabase
      .from("gbc_companies_photos")
      .select("photo_url")
      .eq("id", parseInt(photoId))
      .eq("gbc_company_id", parseInt(id))
      .single()

    if (photo?.photo_url) {
      try {
        const url = new URL(photo.photo_url)
        const path = url.pathname.split("/storage/v1/object/public/gbc_companies_photos/")[1]
        if (path) {
          await supabase.storage.from("gbc_companies_photos").remove([path])
        }
      } catch {
        // Continue to DB delete even if storage cleanup fails
      }
    }

    const { error } = await supabase
      .from("gbc_companies_photos")
      .delete()
      .eq("id", parseInt(photoId))

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ success: true, message: msg.photoDeleteSuccess })
  } catch (err) {
    console.error("[DELETE /api/admin/partners/[id]/photos] Unexpected error:", err)
    return NextResponse.json({ error: msg.serverError }, { status: 500 })
  }
}
