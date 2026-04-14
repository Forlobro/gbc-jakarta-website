import { NextRequest, NextResponse } from "next/server";
import { createServerClient } from "../../../lib/supabase";

interface RouteParams {
  params: Promise<{ id: string }>;
}

// GET /api/companies/[id] — public, single company with photos
export async function GET(_req: NextRequest, { params }: RouteParams) {
  const { id } = await params;
  const supabase = createServerClient();
  const companyId = parseInt(id);

  const { data: company, error } = await supabase
    .from("gbc_companies")
    .select("*")
    .eq("id", companyId)
    .single();

  if (error || !company) {
    return NextResponse.json({ error: "Company not found" }, { status: 404 });
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
