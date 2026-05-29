/**
 * Direct-to-Supabase Storage upload utilities.
 *
 * Files are uploaded directly from the browser to Supabase Storage,
 * bypassing the Next.js API route (and Vercel's 4.5 MB body limit).
 * After upload, only the resulting public URL is sent to the API route
 * to update the database — a tiny JSON payload.
 */

import { createClient } from "./supabase"

export interface UploadResult {
  publicUrl: string
  storagePath: string
}

/**
 * Upload a single file to a Supabase Storage bucket directly from the browser.
 * Returns the public URL and storage path on success, throws on error.
 */
export async function uploadToStorage(
  bucket: string,
  path: string,
  file: File,
): Promise<UploadResult> {
  const supabase = createClient()

  const { error: uploadError } = await supabase.storage.from(bucket).upload(path, file, {
    contentType: file.type,
    cacheControl: "3600",
    upsert: false,
  })

  if (uploadError) {
    throw new Error(uploadError.message)
  }

  const { data: urlData } = supabase.storage.from(bucket).getPublicUrl(path)
  return { publicUrl: urlData.publicUrl, storagePath: path }
}

/** Generate a unique storage path */
export function makeStoragePath(prefix: string, filename: string): string {
  const ext = filename.split(".").pop()?.toLowerCase() || "bin"
  return `${prefix}/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`
}
