import { NextRequest, NextResponse } from "next/server"
import { createServerClient } from "../../lib/supabase.server"
import { msg } from "../../lib/messages"

// GET /api/partners-categories — public, read all categories
export async function GET(request: NextRequest) {
  try {
    const supabase = createServerClient()

    const { data, error } = await supabase
      .from("gbc_companies_categories")
      .select("id, name")
      .order("name", { ascending: true })

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json(data ?? [])
  } catch (err) {
    console.error("[GET /api/partners-categories] Unexpected error:", err)
    return NextResponse.json({ error: msg.serverError }, { status: 500 })
  }
}
