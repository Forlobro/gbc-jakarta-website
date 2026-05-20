import { NextRequest, NextResponse } from "next/server"
import { createServerClient } from "../../../lib/supabase.server"
import { getLang, getMsg } from "../../../lib/messages"

interface RouteParams {
  params: Promise<{ id: string }>
}

// GET /api/events/[id] — public, single published event with photos
export async function GET(request: NextRequest, { params }: RouteParams) {
  const lang = getLang(request)
  const m = getMsg(lang)

  try {
    const { id } = await params
    const supabase = createServerClient()
    const eventId = parseInt(id)

    if (isNaN(eventId)) {
      return NextResponse.json({ error: m.eventNotFound }, { status: 404 })
    }

    const { data: event, error } = await supabase
      .from("gbc_events")
      .select("*")
      .eq("id", eventId)
      .eq("is_published", true)
      .single()

    if (error || !event) {
      return NextResponse.json({ error: m.eventNotFound }, { status: 404 })
    }

    const { data: photos } = await supabase
      .from("gbc_events_photos")
      .select("*")
      .eq("gbc_event_id", eventId)

    return NextResponse.json({
      ...event,
      gbc_events_photos: photos ?? [],
    })
  } catch (err) {
    console.error("[GET /api/events/[id]] Unexpected error:", err)
    return NextResponse.json({ error: m.serverError }, { status: 500 })
  }
}
