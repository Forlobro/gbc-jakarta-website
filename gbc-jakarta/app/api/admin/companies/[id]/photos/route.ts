import { NextRequest, NextResponse } from "next/server";
import { createServerClient } from "../../../../../lib/supabase";

interface RouteParams {
  params: Promise<{ id: string }>;
}

// POST /api/admin/companies/[id]/photos — upload multiple photos
export async function POST(request: NextRequest, { params }: RouteParams) {
  const { id } = await params;
  const supabase = createServerClient();
  const companyId = parseInt(id);

  const formData = await request.formData();
  const files = formData.getAll("photos") as File[];

  if (!files || files.length === 0) {
    return NextResponse.json({ error: "No files provided" }, { status: 400 });
  }

  const uploadedPhotos = [];
  const errors: string[] = [];

  console.log(`[photos POST] companyId=${companyId}, files=${files.length}`);

  for (const file of files) {
    console.log(`[photos POST] file: name=${file.name} type=${file.type} size=${file.size}`);

    // Validate file type
    if (!file.type.startsWith("image/")) {
      const msg = `${file.name}: Not an image (type=${file.type})`;
      console.error("[photos POST] type error:", msg);
      errors.push(msg);
      continue;
    }

    // Validate file size (10MB max)
    if (file.size > 10 * 1024 * 1024) {
      errors.push(`${file.name}: File too large (max 10MB)`);
      continue;
    }

    // Create unique filename under company folder
    const ext = file.name.split(".").pop()?.toLowerCase() || "jpg";
    const fileName = `${companyId}/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;

    // Upload to Supabase Storage
    const { error: uploadError } = await supabase.storage
      .from("gbc_companies_photos")
      .upload(fileName, file, {
        contentType: file.type,
        cacheControl: "3600",
        upsert: false,
      });

    if (uploadError) {
      console.error("[photos POST] Storage upload error:", uploadError);
      errors.push(`${file.name}: ${uploadError.message}`);
      continue;
    }

    // Get public URL
    const { data: urlData } = supabase.storage
      .from("gbc_companies_photos")
      .getPublicUrl(fileName);

    // Save to database using correct FK column: gbc_company_id
    const { data: photo, error: dbError } = await supabase
      .from("gbc_companies_photos")
      .insert({
        gbc_company_id: companyId,
        photo_url: urlData.publicUrl,
      })
      .select()
      .single();

    if (dbError) {
      console.error("[photos POST] DB insert error:", dbError);
      // Attempt to clean up uploaded file
      await supabase.storage.from("gbc_companies_photos").remove([fileName]);
      errors.push(`${file.name}: DB error — ${dbError.message}`);
      continue;
    }

    uploadedPhotos.push(photo);
  }

  console.log(`[photos POST] Done: ${uploadedPhotos.length} ok, errors:`, errors);

  return NextResponse.json(
    { uploaded: uploadedPhotos, errors },
    { status: uploadedPhotos.length > 0 ? 201 : 400 }
  );
}

// DELETE /api/admin/companies/[id]/photos?photoId=X
export async function DELETE(request: NextRequest, { params }: RouteParams) {
  const { id } = await params;
  const supabase = createServerClient();

  const { searchParams } = new URL(request.url);
  const photoId = searchParams.get("photoId");

  if (!photoId) {
    return NextResponse.json({ error: "photoId is required" }, { status: 400 });
  }

  // Get photo record
  const { data: photo } = await supabase
    .from("gbc_companies_photos")
    .select("photo_url")
    .eq("id", parseInt(photoId))
    .eq("gbc_company_id", parseInt(id))
    .single();

  // Delete from Storage
  if (photo?.photo_url) {
    try {
      const url = new URL(photo.photo_url);
      const path = url.pathname.split(
        "/storage/v1/object/public/gbc_companies_photos/"
      )[1];
      if (path) {
        await supabase.storage.from("gbc_companies_photos").remove([path]);
      }
    } catch {
      // Continue to DB delete even if storage cleanup fails
    }
  }

  // Delete from DB
  const { error } = await supabase
    .from("gbc_companies_photos")
    .delete()
    .eq("id", parseInt(photoId));

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
