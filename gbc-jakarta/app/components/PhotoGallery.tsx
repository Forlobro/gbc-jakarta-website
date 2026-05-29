"use client"

/**
 * PhotoGallery — unified gallery component for events and partners detail pages.
 *
 * Props:
 * - photos: array of image URLs
 * - title: optional section heading
 * - altPrefix: alt text prefix for images (e.g. "Event", "Company Name")
 */

import { useState } from "react"
import Image from "next/image"

interface PhotoGalleryProps {
  photos: string[]
  title?: string
  altPrefix?: string
}

export default function PhotoGallery({ photos, title, altPrefix = "Photo" }: PhotoGalleryProps) {
  const [current, setCurrent] = useState(0)

  if (photos.length === 0) return null

  const prev = () => setCurrent((c) => (c === 0 ? photos.length - 1 : c - 1))
  const next = () => setCurrent((c) => (c === photos.length - 1 ? 0 : c + 1))

  return (
    <div>
      {title && <h3 className="font-display text-xl font-extrabold text-primary mb-5">{title}</h3>}

      {/* Main photo */}
      <div className="rounded-2xl overflow-hidden shadow-xl mb-4 aspect-video relative group">
        <Image
          key={current}
          src={photos[current]}
          alt={`${altPrefix} ${current + 1}`}
          fill
          className="object-cover transition-opacity duration-300"
          sizes="(max-width: 768px) 100vw, 66vw"
        />

        {/* Prev / Next — only shown when multiple photos */}
        {photos.length > 1 && (
          <>
            <button
              onClick={prev}
              aria-label="Previous photo"
              className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 bg-white/90 hover:bg-white rounded-full shadow-md flex items-center justify-center text-primary transition-all duration-200 opacity-0 group-hover:opacity-100"
            >
              <i className="fas fa-chevron-left text-xs" />
            </button>
            <button
              onClick={next}
              aria-label="Next photo"
              className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 bg-white/90 hover:bg-white rounded-full shadow-md flex items-center justify-center text-primary transition-all duration-200 opacity-0 group-hover:opacity-100"
            >
              <i className="fas fa-chevron-right text-xs" />
            </button>

            {/* Counter badge */}
            <span className="absolute bottom-3 right-3 bg-black/50 text-white text-xs px-2.5 py-1 rounded-full backdrop-blur-sm">
              {current + 1} / {photos.length}
            </span>
          </>
        )}
      </div>

      {/* Dot indicators + thumbnails */}
      {photos.length > 1 && (
        <>
          {/* Thumbnails — shown when ≤8 photos */}
          {photos.length <= 8 ? (
            <div className="flex gap-2 flex-wrap">
              {photos.map((src, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrent(idx)}
                  aria-label={`View photo ${idx + 1}`}
                  className={`w-16 h-12 sm:w-20 sm:h-14 rounded-xl overflow-hidden border-2 transition-all duration-200 cursor-pointer shrink-0 ${
                    idx === current
                      ? "border-accent scale-105 shadow-md"
                      : "border-transparent opacity-55 hover:opacity-90"
                  }`}
                >
                  <Image
                    src={src}
                    alt={`${altPrefix} thumbnail ${idx + 1}`}
                    width={80}
                    height={56}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          ) : (
            /* Dot indicators — shown when >8 photos */
            <div className="flex justify-center gap-2 mt-2">
              {photos.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  aria-label={`Go to photo ${i + 1}`}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    i === current ? "bg-accent w-6" : "bg-gray-300 w-2"
                  }`}
                />
              ))}
            </div>
          )}
        </>
      )}
    </div>
  )
}
