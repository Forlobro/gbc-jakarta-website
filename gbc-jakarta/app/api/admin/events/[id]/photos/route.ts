import { NextRequest, NextResponse } from "next/server"
import { createServerClient } from "../../../../../lib/supabase.server"
import { msg } from "../../../../../lib/messages"

export const dynamic = "force-dynamic"

interface RouteParams {
  params: Promise<{ id: string }>
}

// POST /api/admin/events/[id]/photos
export async function POST(request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params
    const eventId = parseInt(id)

    if (Number.isNaN(eventId)) {
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
      .from("gbc_events_photos")
      .insert({ gbc_event_id: eventId, photo_url: photoUrl })
      .select()
      .single()

    if (dbError) {
      console.error("[POST events photos] DB insert error:", dbError)
      return NextResponse.json({ error: dbError.message }, { status: 500 })
    }

    return NextResponse.json({ uploaded: [photo] }, { status: 201 })
  } catch (err) {
    console.error("[POST /api/admin/events/[id]/photos] Unexpected error:", err)
    return NextResponse.json({ error: msg.serverError }, { status: 500 })
  }
}

// DELETE /api/admin/events/[id]/photos?photoId=X
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
      .from("gbc_events_photos")
      .select("photo_url")
      .eq("id", parseInt(photoId))
      .eq("gbc_event_id", parseInt(id))
      .single()

    if (photo?.photo_url) {
      try {
        const url = new URL(photo.photo_url)
        const path = url.pathname.split("/storage/v1/object/public/gbc_events_photos/")[1]
        if (path) await supabase.storage.from("gbc_events_photos").remove([path])
      } catch {
        // Continue even if storage cleanup fails
      }
    }

    const { error } = await supabase.from("gbc_events_photos").delete().eq("id", parseInt(photoId))

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ success: true, message: msg.eventPhotoDeleteSuccess })
  } catch (err) {
    console.error("[DELETE /api/admin/events/[id]/photos] Unexpected error:", err)
    return NextResponse.json({ error: msg.serverError }, { status: 500 })
  }
}
