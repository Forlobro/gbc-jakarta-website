import { NextResponse } from "next/server"
import { createServerClient } from "../../lib/supabase.server"

// GET /api/partners-categories — public, read all categories
export async function GET() {
  const supabase = createServerClient()

  const { data, error } = await supabase
    .from("gbc_companies_categories")
    .select("id, name")
    .order("name", { ascending: true })

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json(data ?? [])
}
