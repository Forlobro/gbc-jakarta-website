import { NextRequest, NextResponse } from "next/server";
import { createServerClient } from "../../../../lib/supabase";

interface RouteParams {
  params: Promise<{ id: string }>;
}

// GET /api/admin/companies/[id]
export async function GET(_request: NextRequest, { params }: RouteParams) {
  const { id } = await params;
  const supabase = createServerClient();
  const companyId = parseInt(id);

  const { data: company, error } = await supabase
    .from("gbc_companies")
    .select("*")
    .eq("id", companyId)
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 404 });
  }

  const { data: photos } = await supabase
    .from("gbc_companies_photos")
    .select("*")
    .eq("gbc_company_id", companyId);

  return NextResponse.json({
    ...company,
    gbc_companies_photos: photos ?? [],
  });
}

// PUT /api/admin/companies/[id]
export async function PUT(request: NextRequest, { params }: RouteParams) {
  const { id } = await params;
  const supabase = createServerClient();
  const body = await request.json();

  const { name, category, description } = body;

  const { data, error } = await supabase
    .from("gbc_companies")
    .update({ name, category, description })
    .eq("id", parseInt(id))
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data);
}

// DELETE /api/admin/companies/[id]
export async function DELETE(_request: NextRequest, { params }: RouteParams) {
  const { id } = await params;
  const supabase = createServerClient();

  // Delete photos from storage first
  const { data: photos } = await supabase
    .from("gbc_companies_photos")
    .select("photo_url")
    .eq("gbc_company_id", parseInt(id));

  if (photos && photos.length > 0) {
    const filePaths = photos
      .map((p) => {
        if (!p.photo_url) return null;
        // Extract path from full URL
        const url = new URL(p.photo_url);
        const path = url.pathname.split("/storage/v1/object/public/gbc_companies_photos/")[1];
        return path || null;
      })
      .filter(Boolean) as string[];

    if (filePaths.length > 0) {
      await supabase.storage.from("gbc_companies_photos").remove(filePaths);
    }
  }

  // Delete photos from DB
  await supabase
    .from("gbc_companies_photos")
    .delete()
    .eq("gbc_company_id", parseInt(id));

  // Delete company
  const { error } = await supabase
    .from("gbc_companies")
    .delete()
    .eq("id", parseInt(id));

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
