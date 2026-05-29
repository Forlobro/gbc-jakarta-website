"use client"

import { useState, useCallback } from "react"
import { GbcEventPhoto } from "../../../lib/supabase"
import { uploadToStorage, makeStoragePath } from "../../../lib/supabase.upload"
import DropZone from "../../components/DropZone"
import UploadQueue, { UploadQueueItem } from "../../components/UploadQueue"
import PhotoGrid from "../../components/PhotoGrid"

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
  const [queue, setQueue] = useState<UploadQueueItem[]>([])
  const [deletingId, setDeletingId] = useState<number | null>(null)
  const [error, setError] = useState<string | null>(null)

  const uploadingCount = queue.filter((i) => i.status === "uploading").length

  const addFiles = useCallback(
    (files: File[]) => {
      setError(null)
      const imageFiles = files.filter((f) => f.type.startsWith("image/"))
      const pendingCount = queue.filter((i) => i.status === "pending").length
      const totalAfter = pendingCount + imageFiles.length

      if (totalAfter > 8) {
        setError(
          `You can upload a maximum of 8 photos at a time (currently ${pendingCount} queued)`,
        )
        return
      }

      const oversized = imageFiles.filter((f) => f.size > 5 * 1024 * 1024)
      if (oversized.length > 0) {
        setError(`Files exceed 5 MB and were skipped: ${oversized.map((f) => f.name).join(", ")}`)
      }

      const valid = imageFiles.filter((f) => f.size <= 5 * 1024 * 1024)
      const newItems: UploadQueueItem[] = valid.map((f) => ({
        file: f,
        previewUrl: URL.createObjectURL(f),
        status: "pending",
      }))

      setQueue((prev) => [...prev, ...newItems])
    },
    [queue],
  )

  const removeFromQueue = (index: number) => {
    setQueue((prev) => {
      URL.revokeObjectURL(prev[index].previewUrl)
      return prev.filter((_, i) => i !== index)
    })
  }

  const uploadOneFile = async (idx: number) => {
    const fileItem = queue[idx]
    if (!fileItem) return

    setQueue((prev) => prev.map((item, i) => (i === idx ? { ...item, status: "uploading" } : item)))

    try {
      const storagePath = makeStoragePath(`${eventId}/gallery`, fileItem.file.name)
      const { publicUrl } = await uploadToStorage("gbc_events_photos", storagePath, fileItem.file)

      const res = await fetch(`/api/admin/events/${eventId}/photos`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ photoUrl: publicUrl }),
      })

      const data = await res.json()

      if (!res.ok) {
        const errMsg = data.error || `Upload failed (${res.status})`
        setQueue((prev) =>
          prev.map((item, i) =>
            i === idx ? { ...item, status: "error", errorMsg: errMsg } : item,
          ),
        )
      } else {
        setQueue((prev) => prev.map((item, i) => (i === idx ? { ...item, status: "done" } : item)))
        onPhotosChange()
      }
    } catch (err) {
      const errMsg = err instanceof Error ? err.message : "Upload failed"
      setQueue((prev) =>
        prev.map((item, i) => (i === idx ? { ...item, status: "error", errorMsg: errMsg } : item)),
      )
    }
  }

  const handleUploadAll = async () => {
    const pendingIdx = queue
      .map((item, i) => (item.status === "pending" ? i : -1))
      .filter((i) => i !== -1)
    for (const idx of pendingIdx) {
      await uploadOneFile(idx)
    }
  }

  const clearDone = () => {
    setQueue((prev) => {
      prev
        .filter((i) => i.status === "done" || i.status === "error")
        .forEach((i) => URL.revokeObjectURL(i.previewUrl))
      return prev.filter((i) => i.status === "pending" || i.status === "uploading")
    })
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
    <div className="space-y-6 flex flex-col h-full">
      <div>
        <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
          <i className="far fa-images text-accent" /> Photos
        </h3>
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

      {/* Photos Grid */}
      <PhotoGrid
        photos={photos}
        onDelete={deletePhoto}
        deletingId={deletingId}
        aspect="aspect-square"
        showViewLink={false}
        altText="Event photo"
      />

      {/* Drop Zone */}
      <DropZone
        onFiles={addFiles}
        accept="image/*"
        multiple
        disabled={uploadingCount > 0}
        hint="JPG, PNG, WebP — max 5 MB each — up to 8 photos at a time"
      />

      {/* Upload Queue */}
      <UploadQueue
        queue={queue}
        onRemove={removeFromQueue}
        onUploadAll={handleUploadAll}
        onClearDone={clearDone}
        uploading={uploadingCount > 0}
      />

      {photos.length === 0 && queue.length === 0 && (
        <p className="text-slate-400 text-sm text-center py-6 border-2 border-dashed border-slate-200 rounded-xl">
          No photos yet. Drop files above to upload.
        </p>
      )}
    </div>
  )
}
