import { NextRequest, NextResponse } from "next/server"
import { createServerClient } from "../../../../../lib/supabase.server"
import { msg } from "../../../../../lib/messages"

export const dynamic = "force-dynamic"

interface RouteParams {
  params: Promise<{ id: string }>
}

function extractStoragePath(publicUrl: string): string | null {
  try {
    const url = new URL(publicUrl)
    return url.pathname.split("/storage/v1/object/public/gbc_events_photos/")[1] || null
  } catch {
    return null
  }
}

// POST /api/admin/events/[id]/thumbnail
export async function POST(request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params
    const eventId = parseInt(id)

    if (Number.isNaN(eventId)) {
      return NextResponse.json({ error: msg.invalidId }, { status: 400 })
    }

    let body: { thumbnailUrl?: string; oldThumbnailUrl?: string }
    try {
      body = await request.json()
    } catch {
      return NextResponse.json({ error: msg.invalidJson }, { status: 400 })
    }

    const { thumbnailUrl, oldThumbnailUrl } = body

    if (!thumbnailUrl) {
      return NextResponse.json({ error: "No thumbnail URL provided" }, { status: 400 })
    }

    const supabase = createServerClient()

    const { error: updateError } = await supabase
      .from("gbc_events")
      .update({
        thumbnail_url: thumbnailUrl,
        updated_at: new Date().toISOString(),
        updated_by: "ADMIN",
      })
      .eq("id", eventId)

    if (updateError) {
      console.error("[POST thumbnail] DB update error:", updateError)
      return NextResponse.json({ error: updateError.message }, { status: 500 })
    }

    if (oldThumbnailUrl) {
      const oldPath = extractStoragePath(oldThumbnailUrl)
      if (oldPath && oldPath.startsWith("thumbnails/")) {
        await supabase.storage.from("gbc_events_photos").remove([oldPath])
      }
    }

    return NextResponse.json({ thumbnail_url: thumbnailUrl }, { status: 201 })
  } catch (err) {
    console.error("[POST /api/admin/events/[id]/thumbnail] Unexpected error:", err)
    return NextResponse.json({ error: msg.serverError }, { status: 500 })
  }
}

// DELETE /api/admin/events/[id]/thumbnail
export async function DELETE(request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params
    const eventId = parseInt(id)

    if (Number.isNaN(eventId)) {
      return NextResponse.json({ error: msg.invalidId }, { status: 400 })
    }

    const supabase = createServerClient()

    const { data: event, error: fetchError } = await supabase
      .from("gbc_events")
      .select("thumbnail_url")
      .eq("id", eventId)
      .single()

    if (fetchError) {
      return NextResponse.json({ error: msg.eventNotFound }, { status: 404 })
    }

    const { error: updateError } = await supabase
      .from("gbc_events")
      .update({ thumbnail_url: null, updated_at: new Date().toISOString(), updated_by: "ADMIN" })
      .eq("id", eventId)

    if (updateError) {
      return NextResponse.json({ error: updateError.message }, { status: 500 })
    }

    const oldPath = event.thumbnail_url ? extractStoragePath(event.thumbnail_url) : null
    if (oldPath && oldPath.startsWith("thumbnails/")) {
      await supabase.storage.from("gbc_events_photos").remove([oldPath])
    }

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error("[DELETE /api/admin/events/[id]/thumbnail] Unexpected error:", err)
    return NextResponse.json({ error: msg.serverError }, { status: 500 })
  }
}
