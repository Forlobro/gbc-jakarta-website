import { NextRequest, NextResponse } from "next/server"
import { createServerClient } from "../../../../lib/supabase.server"
import { msg } from "../../../../lib/messages"

interface RouteParams {
  params: Promise<{ id: string }>
}

// PUT /api/admin/partners-categories/[id]
export async function PUT(request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params
    const categoryId = parseInt(id)

    if (Number.isNaN(categoryId)) {
      return NextResponse.json({ error: msg.invalidId }, { status: 400 })
    }

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

    const supabase = createServerClient()

    const { data, error } = await supabase
      .from("gbc_companies_categories")
      .update({ name })
      .eq("id", categoryId)
      .select()
      .single()

    if (error) {
      if (error.code === "23505") {
        return NextResponse.json({ error: msg.categoryAlreadyExists }, { status: 409 })
      }
      return NextResponse.json({ error: msg.serverError }, { status: 500 })
    }

    return NextResponse.json({ ...data, message: msg.categoryUpdateSuccess })
  } catch (err) {
    console.error("[PUT /api/admin/partners-categories/[id]] Unexpected error:", err)
    return NextResponse.json({ error: msg.serverError }, { status: 500 })
  }
}

// DELETE /api/admin/partners-categories/[id]
export async function DELETE(request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params
    const categoryId = parseInt(id)

    if (Number.isNaN(categoryId)) {
      return NextResponse.json({ error: msg.invalidId }, { status: 400 })
    }

    const supabase = createServerClient()

    const { error } = await supabase.from("gbc_companies_categories").delete().eq("id", categoryId)

    if (error) {
      return NextResponse.json({ error: msg.serverError }, { status: 500 })
    }

    return NextResponse.json({ success: true, message: msg.categoryDeleteSuccess })
  } catch (err) {
    console.error("[DELETE /api/admin/partners-categories/[id]] Unexpected error:", err)
    return NextResponse.json({ error: msg.serverError }, { status: 500 })
  }
}
