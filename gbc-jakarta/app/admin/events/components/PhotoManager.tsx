"use client"

import { useState, useCallback } from "react"
import { GbcEventPhoto } from "../../../lib/supabase"
import { uploadToStorage, makeStoragePath } from "../../../lib/supabase.upload"
import DropZone from "../../components/DropZone"
import UploadQueue, { UploadQueueItem } from "../../components/UploadQueue"
import PhotoGrid from "../../components/PhotoGrid"
import AlertBanner from "../../components/AlertBanner"

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

  const MAX_PHOTOS = 8
  const uploadingCount = queue.filter((i) => i.status === "uploading").length
  const pendingCount = queue.filter((i) => i.status === "pending").length
  const remainingSlots = MAX_PHOTOS - photos.length - pendingCount
  const isAtLimit = remainingSlots <= 0

  const addFiles = useCallback(
    (files: File[]) => {
      setError(null)
      const imageFiles = files.filter((f) => f.type.startsWith("image/"))

      if (remainingSlots <= 0) {
        setError(`Maximum ${MAX_PHOTOS} photos reached. Delete existing photos to upload new ones.`)
        return
      }

      if (imageFiles.length > remainingSlots) {
        setError(`You can only add ${remainingSlots} more photo${remainingSlots > 1 ? "s" : ""}`)
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
    [remainingSlots],
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
          <span className="text-slate-500 text-sm font-normal ml-1">
            ({photos.length}/{MAX_PHOTOS} saved)
          </span>
        </h3>
      </div>

      {error && <AlertBanner message={error} onDismiss={() => setError(null)} />}

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
        disabled={uploadingCount > 0 || isAtLimit}
        hint={
          isAtLimit
            ? `Maximum ${MAX_PHOTOS} photos reached. Delete existing photos to upload new ones.`
            : `JPG, PNG, WebP — max 5 MB each — ${remainingSlots} slot${remainingSlots > 1 ? "s" : ""} remaining`
        }
      />

      {/* Upload Queue */}
      <UploadQueue
        queue={queue}
        onRemove={removeFromQueue}
        onUploadAll={handleUploadAll}
        onClearDone={clearDone}
        uploading={uploadingCount > 0}
      />
    </div>
  )
}
