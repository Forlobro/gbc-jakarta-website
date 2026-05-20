import { NextRequest, NextResponse } from "next/server"
import { createServerClient } from "../../../lib/supabase.server"
import { getLang, getMsg } from "../../../lib/messages"

// GET /api/admin/events
export async function GET(request: NextRequest) {
  const lang = getLang(request)
  const m = getMsg(lang)

  try {
    const supabase = createServerClient()

    const { data: events, error } = await supabase
      .from("gbc_events")
      .select("*")
      .order("id", { ascending: false })

    if (error) {
      return NextResponse.json({ error: m.serverError }, { status: 500 })
    }

    const { data: photos } = await supabase.from("gbc_events_photos").select("*")

    const result = (events ?? []).map((event) => ({
      ...event,
      gbc_events_photos: (photos ?? []).filter((p) => p.gbc_event_id === event.id),
    }))

    return NextResponse.json(result)
  } catch (err) {
    console.error("[GET /api/admin/events] Unexpected error:", err)
    return NextResponse.json({ error: m.serverError }, { status: 500 })
  }
}

// POST /api/admin/events
export async function POST(request: NextRequest) {
  const lang = getLang(request)
  const m = getMsg(lang)

  try {
    const supabase = createServerClient()

    let body
    try {
      body = await request.json()
    } catch {
      return NextResponse.json({ error: m.invalidJson }, { status: 400 })
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
    const normalizedEventStart =
      typeof event_start === "string" && event_start.trim() ? event_start.trim() : null
    const normalizedEventEnd =
      typeof event_end === "string" && event_end.trim() ? event_end.trim() : null

    if (!normalizedTitle) return NextResponse.json({ error: m.eventTitleRequired }, { status: 400 })
    if (!normalizedLocation)
      return NextResponse.json({ error: m.eventLocationRequired }, { status: 400 })
    if (!normalizedVenue) return NextResponse.json({ error: m.eventVenueRequired }, { status: 400 })
    if (!normalizedDescEn || !normalizedDescId)
      return NextResponse.json({ error: m.eventDescriptionRequired }, { status: 400 })
    if (!["upcoming", "accomplished"].includes(normalizedStatus))
      return NextResponse.json({ error: m.eventStatusRequired }, { status: 400 })

    const now = new Date().toISOString()

    const { data, error } = await supabase
      .from("gbc_events")
      .insert({
        title: normalizedTitle,
        location: normalizedLocation,
        venue: normalizedVenue,
        description_en: normalizedDescEn,
        description_id: normalizedDescId,
        status: normalizedStatus,
        is_published: normalizedIsPublished,
        link_video_1: normalizedVideo1,
        link_video_2: normalizedVideo2,
        event_start: normalizedEventStart,
        event_end: normalizedEventEnd,
        created_at: now,
        created_by: "ADMIN",
        updated_at: now,
        updated_by: "ADMIN",
      })
      .select()
      .single()

    if (error) {
      return NextResponse.json({ error: m.serverError }, { status: 500 })
    }

    return NextResponse.json({ ...data, message: m.eventCreateSuccess }, { status: 201 })
  } catch (err) {
    console.error("[POST /api/admin/events] Unexpected error:", err)
    return NextResponse.json({ error: m.serverError }, { status: 500 })
  }
}
