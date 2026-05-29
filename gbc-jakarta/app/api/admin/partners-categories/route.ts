import { NextRequest, NextResponse } from "next/server"
import { createServerClient } from "../../../lib/supabase.server"
import { msg } from "../../../lib/messages"

// GET /api/admin/partners-categories
export async function GET(request: NextRequest) {
  try {
    const supabase = createServerClient()

    const { data, error } = await supabase
      .from("gbc_companies_categories")
      .select("*")
      .order("name", { ascending: true })

    if (error) {
      console.error("[GET /api/admin/partners-categories]", error)
      return NextResponse.json({ error: msg.serverError, detail: error.message }, { status: 500 })
    }

    return NextResponse.json(data ?? [])
  } catch (err) {
    console.error("[GET /api/admin/partners-categories] Unexpected error:", err)
    return NextResponse.json({ error: msg.serverError }, { status: 500 })
  }
}

// POST /api/admin/partners-categories
export async function POST(request: NextRequest) {
  try {
    const supabase = createServerClient()

    let body
    try {
      body = await request.json()
    } catch {
      return NextResponse.json({ error: msg.invalidJson }, { status: 400 })
    }

    const name = typeof body.name === "string" ? body.name.trim() : ""
    if (!name) {
      return NextResponse.json({ error: msg.categoryNameRequired }, { status: 400 })
    }

    const { data, error } = await supabase
      .from("gbc_companies_categories")
      .insert({ name })
      .select()
      .single()

    if (error) {
      if (error.code === "23505") {
        return NextResponse.json({ error: msg.categoryAlreadyExists }, { status: 409 })
      }
      console.error("[POST /api/admin/partners-categories]", error)
      return NextResponse.json({ error: msg.serverError, detail: error.message }, { status: 500 })
    }

    return NextResponse.json({ ...data, message: msg.categoryCreateSuccess }, { status: 201 })
  } catch (err) {
    console.error("[POST /api/admin/partners-categories] Unexpected error:", err)
    return NextResponse.json({ error: msg.serverError }, { status: 500 })
  }
}
