"use client"

import { useRef, useState } from "react"
import Image from "next/image"
import { GbcEventPhoto } from "../../../lib/supabase"
import { SelectFileButton, DeleteButton } from "../../components/FileActionButtons"

interface EventPhotoManagerProps {
  eventId: number
  photos: GbcEventPhoto[]
  onPhotosChange: () => void
}

export default function EventPhotoManager({
  eventId,
  photos,
  onPhotosChange,
}: EventPhotoManagerProps) {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([])
  const [uploading, setUploading] = useState(false)
  const [deletingId, setDeletingId] = useState<number | null>(null)
  const [error, setError] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handlePickFiles = (files: FileList | null) => {
    if (!files) return
    setError(null)

    const incoming = Array.from(files)
    const totalAfter = selectedFiles.length + incoming.length
    if (totalAfter > 8) {
      setError(
        `You can upload a maximum of 8 photos at a time (currently ${selectedFiles.length} selected)`,
      )
      return
    }

    const valid: File[] = []
    for (const file of incoming) {
      if (!file.type.startsWith("image/")) {
        setError(`${file.name}: File is not an image`)
        continue
      }
      if (file.size > 5 * 1024 * 1024) {
        setError(`${file.name}: File size exceeds 5 MB`)
        continue
      }
      valid.push(file)
    }
    setSelectedFiles((prev) => [...prev, ...valid])
  }

  const removeSelected = (idx: number) => {
    setSelectedFiles((prev) => prev.filter((_, i) => i !== idx))
  }

  const uploadPhotos = async () => {
    if (!selectedFiles.length) return
    setUploading(true)
    setError(null)

    try {
      const formData = new FormData()
      selectedFiles.forEach((f) => formData.append("photos", f))

      const res = await fetch(`/api/admin/events/${eventId}/photos`, {
        method: "POST",
        body: formData,
      })

      const data = await res.json()
      if (!res.ok) {
        setError(data.errors?.join(", ") || data.error)
        return
      }

      setSelectedFiles([])
      if (fileInputRef.current) fileInputRef.current.value = ""
      onPhotosChange()
    } catch {
      setError("Upload failed. Please try again.")
    } finally {
      setUploading(false)
    }
  }

  const deletePhoto = async (photoId: number) => {
    if (!confirm("Delete this photo?")) return
    setDeletingId(photoId)

    try {
      const res = await fetch(`/api/admin/events/${eventId}/photos?photoId=${photoId}`, {
        method: "DELETE",
      })
      if (!res.ok) {
        const err = await res.json()
        setError(err.error)
        return
      }
      onPhotosChange()
    } catch {
      setError("Delete failed. Please try again.")
    } finally {
      setDeletingId(null)
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
          <i className="far fa-images text-accent" /> Event Photos
        </h3>
        <p className="text-slate-500 text-xs mt-1">
          Upload photos for this event gallery. Max 8 photos, 5 MB each.
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

      {/* Upload area */}
      <div className="space-y-3">
        <div className="flex items-center gap-2 flex-wrap">
          <SelectFileButton
            onClick={() => fileInputRef.current?.click()}
            disabled={uploading}
            label="Select Photos"
          />
          {selectedFiles.length > 0 && (
            <button
              onClick={uploadPhotos}
              disabled={uploading}
              className="px-4 py-2 bg-linear-to-r from-accent to-[#00a8b0] text-white rounded-lg text-sm font-semibold hover:shadow-lg hover:shadow-accent/25 transition-all cursor-pointer disabled:opacity-50 flex items-center gap-2"
            >
              {uploading ? (
                <>
                  <i className="fas fa-spinner fa-spin" /> Uploading...
                </>
              ) : (
                <>
                  <i className="fas fa-upload" /> Upload {selectedFiles.length} photo
                  {selectedFiles.length > 1 ? "s" : ""}
                </>
              )}
            </button>
          )}
        </div>

        {/* Selected files preview */}
        {selectedFiles.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {selectedFiles.map((f, i) => (
              <div key={i} className="relative group">
                <div className="w-16 h-16 rounded-lg overflow-hidden bg-slate-100 border border-slate-200">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={URL.createObjectURL(f)}
                    alt={f.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <button
                  onClick={() => removeSelected(i)}
                  className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-red-500 text-white rounded-full text-xs flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                >
                  <i className="fas fa-times" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Existing photos grid */}
      {photos.length > 0 && (
        <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
          {photos.map((photo) => (
            <div
              key={photo.id}
              className="relative group aspect-square rounded-xl overflow-hidden bg-slate-100 border border-slate-200"
            >
              <Image
                src={photo.photo_url}
                alt="Event photo"
                fill
                className="object-cover"
                sizes="(max-width: 640px) 33vw, 25vw"
              />
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <DeleteButton
                  onClick={() => deletePhoto(photo.id)}
                  loading={deletingId === photo.id}
                  label=""
                  loadingLabel=""
                />
              </div>
            </div>
          ))}
        </div>
      )}

      {photos.length === 0 && selectedFiles.length === 0 && (
        <p className="text-slate-400 text-sm text-center py-6 border-2 border-dashed border-slate-200 rounded-xl">
          No photos yet. Select files to upload.
        </p>
      )}

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        multiple
        className="hidden"
        onChange={(e) => handlePickFiles(e.target.files)}
      />
    </div>
  )
}
