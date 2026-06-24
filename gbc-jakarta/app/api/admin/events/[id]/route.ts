import { NextRequest, NextResponse } from "next/server"
import { createServerClient } from "../../../../lib/supabase.server"
import { msg } from "../../../../lib/messages"

interface RouteParams {
  params: Promise<{ id: string }>
}

// GET /api/admin/events/[id]
export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params
    const supabase = createServerClient()
    const eventId = parseInt(id)

    const { data: event, error } = await supabase
      .from("gbc_events")
      .select("*")
      .eq("id", eventId)
      .single()

    if (error) {
      return NextResponse.json({ error: msg.eventNotFound }, { status: 404 })
    }

    const { data: photos } = await supabase
      .from("gbc_events_photos")
      .select("*")
      .eq("gbc_event_id", eventId)

    return NextResponse.json({ ...event, gbc_events_photos: photos ?? [] })
  } catch (err) {
    console.error("[GET /api/admin/events/[id]] Unexpected error:", err)
    return NextResponse.json({ error: msg.serverError }, { status: 500 })
  }
}

// PUT /api/admin/events/[id]
export async function PUT(request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params
    const supabase = createServerClient()
    const eventId = parseInt(id)

    if (Number.isNaN(eventId)) {
      return NextResponse.json({ error: msg.invalidId }, { status: 400 })
    }

    let body
    try {
      body = await request.json()
    } catch {
      return NextResponse.json({ error: msg.invalidJson }, { status: 400 })
    }

    const {
      title,
      location,
      venue,
      description_en,
      description_id,
      status,
      is_published,
      link_video_1,
      link_video_2,
      link_form_register,
      link_website,
      event_start,
      event_end,
    } = body

    const normalizedTitle = typeof title === "string" ? title.trim() : ""
    const normalizedLocation = typeof location === "string" ? location.trim() : ""
    const normalizedVenue = typeof venue === "string" ? venue.trim() : ""
    const normalizedDescEn = typeof description_en === "string" ? description_en.trim() : ""
    const normalizedDescId = typeof description_id === "string" ? description_id.trim() : ""
    const normalizedStatus = typeof status === "string" ? status.trim() : ""
    const normalizedIsPublished = typeof is_published === "boolean" ? is_published : false
    const normalizedVideo1 =
      typeof link_video_1 === "string" && link_video_1.trim() ? link_video_1.trim() : null
    const normalizedVideo2 =
      typeof link_video_2 === "string" && link_video_2.trim() ? link_video_2.trim() : null
    const normalizedFormRegister =
      typeof link_form_register === "string" && link_form_register.trim()
        ? link_form_register.trim()
        : null
    const normalizedWebsite =
      typeof link_website === "string" && link_website.trim() ? link_website.trim() : null
    const normalizedEventStart =
      typeof event_start === "string" && event_start.trim() ? event_start.trim() : null
    const normalizedEventEnd =
      typeof event_end === "string" && event_end.trim() ? event_end.trim() : null

    if (!normalizedTitle)
      return NextResponse.json({ error: msg.eventTitleRequired }, { status: 400 })
    if (!normalizedLocation)
      return NextResponse.json({ error: msg.eventLocationRequired }, { status: 400 })
    if (!normalizedVenue)
      return NextResponse.json({ error: msg.eventVenueRequired }, { status: 400 })
    if (!normalizedDescEn || !normalizedDescId)
      return NextResponse.json({ error: msg.eventDescriptionRequired }, { status: 400 })
    if (!["upcoming", "accomplished"].includes(normalizedStatus))
      return NextResponse.json({ error: msg.eventStatusRequired }, { status: 400 })

    const { data, error } = await supabase
      .from("gbc_events")
      .update({
        title: normalizedTitle,
        location: normalizedLocation,
        venue: normalizedVenue,
        description_en: normalizedDescEn,
        description_id: normalizedDescId,
        status: normalizedStatus,
        is_published: normalizedIsPublished,
        link_video_1: normalizedVideo1,
        link_video_2: normalizedVideo2,
        link_form_register: normalizedFormRegister,
        link_website: normalizedWebsite,
        event_start: normalizedEventStart,
        event_end: normalizedEventEnd,
        updated_at: new Date().toISOString(),
        updated_by: "ADMIN",
      })
      .eq("id", eventId)
      .select()
      .single()

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ ...data, message: msg.eventUpdateSuccess })
  } catch (err) {
    console.error("[PUT /api/admin/events/[id]] Unexpected error:", err)
    return NextResponse.json({ error: msg.serverError }, { status: 500 })
  }
}

// DELETE /api/admin/events/[id]
export async function DELETE(request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params
    const supabase = createServerClient()
    const eventId = parseInt(id)

    if (Number.isNaN(eventId)) {
      return NextResponse.json({ error: msg.invalidId }, { status: 400 })
    }

    // Delete photos from storage
    const { data: photos } = await supabase
      .from("gbc_events_photos")
      .select("photo_url")
      .eq("gbc_event_id", eventId)

    if (photos && photos.length > 0) {
      const filePaths = photos
        .map((p) => {
          try {
            const url = new URL(p.photo_url)
            return url.pathname.split("/storage/v1/object/public/gbc_events_photos/")[1] || null
          } catch {
            return null
          }
        })
        .filter(Boolean) as string[]

      if (filePaths.length > 0) {
        await supabase.storage.from("gbc_events_photos").remove(filePaths)
      }
    }

    // Delete photos from DB
    await supabase.from("gbc_events_photos").delete().eq("gbc_event_id", eventId)

    // Delete event
    const { error } = await supabase.from("gbc_events").delete().eq("id", eventId)

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ success: true, message: msg.eventDeleteSuccess })
  } catch (err) {
    console.error("[DELETE /api/admin/events/[id]] Unexpected error:", err)
    return NextResponse.json({ error: msg.serverError }, { status: 500 })
  }
}
