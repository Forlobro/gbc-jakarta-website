import { NextRequest, NextResponse } from "next/server"
import { createServerClient } from "../../../../../lib/supabase.server"
import { msg } from "../../../../../lib/messages"

interface RouteParams {
  params: Promise<{ id: string }>
}

// POST /api/admin/events/[id]/photos
export async function POST(request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params
    const supabase = createServerClient()
    const eventId = parseInt(id)

    if (Number.isNaN(eventId)) {
      return NextResponse.json({ error: msg.invalidId }, { status: 400 })
    }

    const formData = await request.formData()
    const files = formData.getAll("photos") as File[]

    if (!files || files.length === 0) {
      return NextResponse.json({ error: msg.noPhotosProvided }, { status: 400 })
    }

    if (files.length > 8) {
      return NextResponse.json({ error: msg.tooManyPhotos(8) }, { status: 400 })
    }

    const uploadedPhotos = []
    const errors: string[] = []

    for (const file of files) {
      if (!file.type.startsWith("image/")) {
        errors.push(msg.photoNotImage(file.name))
        continue
      }

      if (file.size > 5 * 1024 * 1024) {
        errors.push(msg.photoTooLarge(file.name))
        continue
      }

      const ext = file.name.split(".").pop()?.toLowerCase() || "jpg"
      const fileName = `${eventId}/gallery/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`

      const { error: uploadError } = await supabase.storage
        .from("gbc_events_photos")
        .upload(fileName, file, { contentType: file.type, cacheControl: "3600", upsert: false })

      if (uploadError) {
        errors.push(msg.photoUploadFailed(file.name, uploadError.message))
        continue
      }

      const { data: urlData } = supabase.storage.from("gbc_events_photos").getPublicUrl(fileName)

      const { data: photo, error: dbError } = await supabase
        .from("gbc_events_photos")
        .insert({ gbc_event_id: eventId, photo_url: urlData.publicUrl })
        .select()
        .single()

      if (dbError) {
        await supabase.storage.from("gbc_events_photos").remove([fileName])
        errors.push(msg.photoDbError(file.name, dbError.message))
        continue
      }

      uploadedPhotos.push(photo)
    }

    return NextResponse.json(
      { uploaded: uploadedPhotos, errors },
      { status: uploadedPhotos.length > 0 ? 201 : 400 },
    )
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
