import { NextRequest, NextResponse } from "next/server";
import { createServerClient } from "../../../lib/supabase";

// GET /api/admin/companies — list all companies with photos
export async function GET() {
  const supabase = createServerClient();

  // Fetch companies
  const { data: companies, error: companiesError } = await supabase
    .from("gbc_companies")
    .select("*")
    .order("created_at", { ascending: false });

  if (companiesError) {
    console.error("[GET /api/admin/companies] Supabase error:", companiesError);
    return NextResponse.json({ error: companiesError.message }, { status: 500 });
  }

  // Fetch all photos
  const { data: photos } = await supabase
    .from("gbc_companies_photos")
    .select("*");

  // Merge manually
  const result = (companies ?? []).map((company) => ({
    ...company,
    gbc_companies_photos: (photos ?? []).filter(
      (p) => p.gbc_company_id === company.id
    ),
  }));

  return NextResponse.json(result);
}

// POST /api/admin/companies — create new company
export async function POST(request: NextRequest) {
  const supabase = createServerClient();

  let body;
  try {
    body = await request.json();
  } catch (e) {
    console.error("[POST /api/admin/companies] JSON parse error:", e);
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const { name, category, description } = body;
  console.log("[POST /api/admin/companies] Inserting:", { name, category, description });

  if (!name) {
    return NextResponse.json(
      { error: "Company name is required" },
      { status: 400 }
    );
  }

  const { data, error } = await supabase
    .from("gbc_companies")
    .insert({ name, category, description })
    .select()
    .single();

  if (error) {
    console.error("[POST /api/admin/companies] Supabase error:", error);
    return NextResponse.json({ error: error.message, code: error.code, details: error.details, hint: error.hint }, { status: 500 });
  }

  return NextResponse.json(data, { status: 201 });
}
