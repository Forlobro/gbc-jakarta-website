import { NextRequest, NextResponse } from "next/server"
import { createServerClient } from "../../../../../lib/supabase.server"
import { msg } from "../../../../../lib/messages"

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

// POST /api/admin/events/[id]/thumbnail — upload/replace event thumbnail
export async function POST(request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params
    const eventId = parseInt(id)

    if (Number.isNaN(eventId)) {
      return NextResponse.json({ error: msg.invalidId }, { status: 400 })
    }

    const supabase = createServerClient()
    const formData = await request.formData()
    const file = formData.get("thumbnail") as File | null

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 })
    }

    if (!file.type.startsWith("image/")) {
      return NextResponse.json({ error: "File must be an image" }, { status: 400 })
    }

    if (file.size > 10 * 1024 * 1024) {
      return NextResponse.json({ error: "File size must not exceed 10 MB" }, { status: 400 })
    }

    // Fetch current thumbnail to delete old one after upload
    const { data: event, error: fetchError } = await supabase
      .from("gbc_events")
      .select("thumbnail_url")
      .eq("id", eventId)
      .single()

    if (fetchError) {
      return NextResponse.json({ error: msg.eventNotFound }, { status: 404 })
    }

    const ext = file.type.split("/")[1] || "jpg"
    const fileName = `thumbnails/${eventId}/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`

    const { error: uploadError } = await supabase.storage
      .from("gbc_events_photos")
      .upload(fileName, file, {
        contentType: file.type,
        cacheControl: "3600",
        upsert: false,
      })

    if (uploadError) {
      console.error("[POST /api/admin/events/[id]/thumbnail] Upload error:", uploadError)
      return NextResponse.json({ error: uploadError.message }, { status: 500 })
    }

    const { data: urlData } = supabase.storage.from("gbc_events_photos").getPublicUrl(fileName)
    const newThumbnailUrl = urlData.publicUrl

    const { error: updateError } = await supabase
      .from("gbc_events")
      .update({
        thumbnail_url: newThumbnailUrl,
        updated_at: new Date().toISOString(),
        updated_by: "ADMIN",
      })
      .eq("id", eventId)

    if (updateError) {
      console.error("[POST /api/admin/events/[id]/thumbnail] DB update error:", updateError)
      await supabase.storage.from("gbc_events_photos").remove([fileName])
      return NextResponse.json({ error: updateError.message }, { status: 500 })
    }

    // Delete old thumbnail from storage
    const oldPath = event.thumbnail_url ? extractStoragePath(event.thumbnail_url) : null
    if (oldPath && oldPath !== fileName && oldPath.startsWith("thumbnails/")) {
      await supabase.storage.from("gbc_events_photos").remove([oldPath])
    }

    return NextResponse.json({ thumbnail_url: newThumbnailUrl }, { status: 201 })
  } catch (err) {
    console.error("[POST /api/admin/events/[id]/thumbnail] Unexpected error:", err)
    return NextResponse.json({ error: "An unexpected error occurred." }, { status: 500 })
  }
}

// DELETE /api/admin/events/[id]/thumbnail — remove thumbnail
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
    return NextResponse.json({ error: "An unexpected error occurred." }, { status: 500 })
  }
}
