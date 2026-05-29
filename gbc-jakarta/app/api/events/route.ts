import { NextResponse } from "next/server"
import { createServerClient } from "../../lib/supabase.server"
import { msg } from "../../lib/messages"

// GET /api/events — public, all published events with photos
export async function GET() {
  try {
    const supabase = createServerClient()

    const { data: events, error } = await supabase
      .from("gbc_events")
      .select("*")
      .eq("is_published", true)
      .order("title", { ascending: true })

    if (error) {
      console.error("[GET /api/events] Supabase error:", error)
      return NextResponse.json({ error: msg.serverError, detail: error.message }, { status: 500 })
    }

    console.log(`[GET /api/events] Found ${events?.length ?? 0} published events`)

    const { data: photos } = await supabase.from("gbc_events_photos").select("*")

    const result = (events ?? []).map((event) => ({
      ...event,
      gbc_events_photos: (photos ?? []).filter((p) => p.gbc_event_id === event.id),
    }))

    return NextResponse.json(result)
  } catch (err) {
    console.error("[GET /api/events] Unexpected error:", err)
    return NextResponse.json({ error: msg.serverError }, { status: 500 })
  }
}
