"use client"

import Image from "next/image"

export interface PhotoGridItem {
  id: number
  photo_url: string | null
}

interface PhotoGridProps {
  photos: PhotoGridItem[]
  onDelete: (id: number) => void
  deletingId?: number | null
  /** Grid columns class, e.g. "grid-cols-2 sm:grid-cols-3" */
  cols?: string
  /** Aspect ratio class, e.g. "aspect-square" or "aspect-4/3" */
  aspect?: string
  /** Show "View full size" link on hover */
  showViewLink?: boolean
  /** Alt text prefix */
  altText?: string
  /** Empty state message */
  emptyText?: string
}

export default function PhotoGrid({
  photos,
  onDelete,
  deletingId = null,
  aspect = "aspect-4/3",
  showViewLink = true,
  altText = "Photo",
  emptyText = "No photos saved yet.",
}: PhotoGridProps) {
  if (photos.length === 0) {
    return <p className="text-slate-500 text-sm">{emptyText}</p>
  }

  return (
    <div className={`grid grid-cols-3 sm:grid-cols-4 gap-3`}>
      {photos.map((photo) => (
        <div
          key={photo.id}
          className={`group relative rounded-xl overflow-hidden bg-slate-100 border border-slate-200 ${aspect}`}
        >
          {photo.photo_url && (
            <Image
              src={photo.photo_url}
              alt={altText}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 50vw, 33vw"
            />
          )}
          <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center gap-2">
            {showViewLink && photo.photo_url && (
              <a
                href={photo.photo_url}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 bg-slate-700 text-white rounded-lg hover:bg-slate-600 transition-colors"
                title="View full size"
              >
                <i className="fas fa-external-link-alt text-sm" />
              </a>
            )}
            <button
              onClick={() => onDelete(photo.id)}
              disabled={deletingId === photo.id}
              className="p-2.5 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors disabled:opacity-50 cursor-pointer"
              title="Delete photo"
            >
              {deletingId === photo.id ? (
                <i className="fas fa-spinner fa-spin text-sm" />
              ) : (
                <i className="far fa-trash-alt text-sm" />
              )}
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}
