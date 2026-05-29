"use client"

import { useRef, useState } from "react"
import Image from "next/image"
import { SelectFileButton, DeleteButton } from "../../components/FileActionButtons"
import { uploadToStorage, makeStoragePath } from "../../../lib/supabase.upload"

const MAX_IMAGE_BYTES = 5 * 1024 * 1024 // 5 MB

interface ThumbnailManagerProps {
  eventId: number
  thumbnailUrl: string | null
  onThumbnailChange: () => void
}

export default function ThumbnailManager({
  eventId,
  thumbnailUrl,
  onThumbnailChange,
}: ThumbnailManagerProps) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [preview, setPreview] = useState<string | null>(null)
  const [uploading, setUploading] = useState(false)
  const [deleting, setDeleting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handlePickFile = (file: File | null) => {
    if (!file) return
    if (!file.type.startsWith("image/")) {
      setError("File must be an image")
      return
    }
    if (file.size > MAX_IMAGE_BYTES) {
      setError("File size must not exceed 5 MB")
      return
    }
    setError(null)
    setSelectedFile(file)
    setPreview(URL.createObjectURL(file))
  }

  const clearSelected = () => {
    setSelectedFile(null)
    setPreview(null)
    if (fileInputRef.current) fileInputRef.current.value = ""
  }

  const uploadThumbnail = async () => {
    if (!selectedFile) return
    setUploading(true)
    setError(null)

    try {
      const storagePath = makeStoragePath(`thumbnails/${eventId}`, selectedFile.name)
      const { publicUrl } = await uploadToStorage("gbc_events_photos", storagePath, selectedFile)

      const res = await fetch(`/api/admin/events/${eventId}/thumbnail`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ thumbnailUrl: publicUrl, oldThumbnailUrl: thumbnailUrl }),
      })

      if (!res.ok) {
        const err = await res.json()
        setError(err.error || "Upload failed")
        return
      }

      clearSelected()
      onThumbnailChange()
    } catch (err) {
      setError(err instanceof Error ? err.message : "Upload failed. Please try again.")
    } finally {
      setUploading(false)
    }
  }

  const deleteThumbnail = async () => {
    if (!thumbnailUrl) return
    if (!confirm("Delete this thumbnail?")) return

    setDeleting(true)
    setError(null)

    try {
      const res = await fetch(`/api/admin/events/${eventId}/thumbnail`, {
        method: "DELETE",
      })

      if (!res.ok) {
        const err = await res.json()
        setError(err.error || "Delete failed")
        return
      }

      onThumbnailChange()
    } catch {
      setError("Delete failed. Please try again.")
    } finally {
      setDeleting(false)
    }
  }

  return (
    <div className="space-y-5">
      <div>
        <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
          <i className="far fa-image text-accent" /> Thumbnail
        </h3>
        <p className="text-slate-500 text-xs mt-1">
          Used as the card image in the public events list. Max 5 MB.
        </p>
      </div>

      {error && (
        <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-100 rounded-xl text-red-600 text-sm">
          <i className="fas fa-exclamation-circle shrink-0" />
          {error}
          <button onClick={() => setError(null)} className="ml-auto cursor-pointer">
            <i className="fas fa-times" />
          </button>
        </div>
      )}

      {/* Current thumbnail */}
      <div className="rounded-2xl overflow-hidden border border-slate-200 bg-slate-50 aspect-video relative">
        {preview ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={preview} alt="Preview" className="w-full h-full object-cover" />
        ) : thumbnailUrl ? (
          <Image
            src={thumbnailUrl}
            alt="Event thumbnail"
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center gap-2 text-slate-400">
            <i className="far fa-image text-3xl" />
            <span className="text-sm">No thumbnail</span>
          </div>
        )}
      </div>

      {/* Actions */}
      <div className="flex items-center gap-2 flex-wrap">
        <SelectFileButton
          onClick={() => fileInputRef.current?.click()}
          disabled={uploading || deleting}
          label="Select Image"
        />

        {selectedFile && (
          <>
            <button
              onClick={uploadThumbnail}
              type="button"
              disabled={uploading}
              className="px-4 py-2 bg-gradient-to-r from-accent to-[#00a8b0] text-white rounded-lg text-sm font-semibold hover:shadow-lg hover:shadow-accent/25 transition-all cursor-pointer disabled:opacity-50 flex items-center gap-2"
            >
              {uploading ? (
                <>
                  <i className="fas fa-spinner fa-spin" /> Uploading...
                </>
              ) : (
                <>
                  <i className="fas fa-upload" /> Upload
                </>
              )}
            </button>
            <button
              onClick={clearSelected}
              type="button"
              disabled={uploading}
              className="px-4 py-2 bg-white border border-slate-200 shadow-sm text-slate-500 rounded-lg text-sm font-medium hover:bg-slate-50 transition-colors cursor-pointer"
            >
              Cancel
            </button>
          </>
        )}

        {thumbnailUrl && !selectedFile && (
          <DeleteButton
            onClick={deleteThumbnail}
            disabled={deleting}
            loading={deleting}
            label="Delete Thumbnail"
          />
        )}
      </div>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => handlePickFile(e.target.files?.[0] || null)}
      />
    </div>
  )
}
