import { NextRequest, NextResponse } from "next/server"
import { createServerClient } from "../../../lib/supabase"
import { getLang, getMsg } from "../../../api/messages"

// GET /api/admin/categories
export async function GET(request: NextRequest) {
  const lang = getLang(request)
  const m = getMsg(lang)
  const supabase = createServerClient()

  const { data, error } = await supabase
    .from("gbc_companies_categories")
    .select("*")
    .order("name", { ascending: true })

  if (error) {
    console.error("[GET /api/admin/categories]", error)
    return NextResponse.json({ error: m.serverError, detail: error.message }, { status: 500 })
  }

  return NextResponse.json(data ?? [])
}

// POST /api/admin/categories
export async function POST(request: NextRequest) {
  const lang = getLang(request)
  const m = getMsg(lang)
  const supabase = createServerClient()

  let body
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: m.invalidJson }, { status: 400 })
  }

  const name = typeof body.name === "string" ? body.name.trim() : ""
  if (!name) {
    return NextResponse.json({ error: m.categoryNameRequired }, { status: 400 })
  }

  const { data, error } = await supabase
    .from("gbc_companies_categories")
    .insert({ name })
    .select()
    .single()

  if (error) {
    if (error.code === "23505") {
      return NextResponse.json({ error: m.categoryAlreadyExists }, { status: 409 })
    }
    console.error("[POST /api/admin/categories]", error)
    return NextResponse.json({ error: m.serverError, detail: error.message }, { status: 500 })
  }

  return NextResponse.json({ ...data, message: m.categoryCreateSuccess }, { status: 201 })
}
