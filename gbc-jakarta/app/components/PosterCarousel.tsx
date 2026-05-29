"use client"

/**
 * PosterCarousel — portrait poster carousel for upcoming events.
 * Manual slide only (no auto-play).
 * Adapts to any image aspect ratio — container height is driven by the active image.
 */

import { useState } from "react"

interface PosterCarouselProps {
  photos: string[]
  altPrefix?: string
}

export default function PosterCarousel({ photos, altPrefix = "Poster" }: PosterCarouselProps) {
  const [current, setCurrent] = useState(0)

  if (photos.length === 0) return null

  const prev = () => setCurrent((c) => (c === 0 ? photos.length - 1 : c - 1))
  const next = () => setCurrent((c) => (c === photos.length - 1 ? 0 : c + 1))

  return (
    <div className="flex flex-col items-center gap-6">
      {/* Main poster — capped to 70vh so it fits within viewport */}
      <div className="relative w-full max-w-xs sm:max-w-sm md:max-w-md mx-auto [&_img]:max-h-[70vh]">
        {photos.map((src, i) => (
          <div
            key={src}
            className={`${i === current ? "relative" : "absolute inset-0"} rounded-3xl overflow-hidden shadow-2xl transition-opacity duration-700`}
            style={{ opacity: i === current ? 1 : 0 }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={src} alt={`${altPrefix} ${i + 1}`} className="w-full h-auto block" />
          </div>
        ))}

        {/* Prev / Next buttons — only when multiple posters */}
        {photos.length > 1 && (
          <>
            <button
              onClick={prev}
              aria-label="Previous poster"
              className="absolute left-3 top-1/2 -translate-y-1/2 z-10 w-11 h-11 bg-white/90 hover:bg-white rounded-full shadow-lg flex items-center justify-center text-primary transition-all duration-200 hover:-translate-x-0.5"
            >
              <i className="fas fa-chevron-left text-sm" />
            </button>
            <button
              onClick={next}
              aria-label="Next poster"
              className="absolute right-3 top-1/2 -translate-y-1/2 z-10 w-11 h-11 bg-white/90 hover:bg-white rounded-full shadow-lg flex items-center justify-center text-primary transition-all duration-200 hover:translate-x-0.5"
            >
              <i className="fas fa-chevron-right text-sm" />
            </button>
          </>
        )}
      </div>

      {/* Dots + counter */}
      {photos.length > 1 && (
        <div className="flex flex-col items-center gap-3">
          <div className="flex gap-3">
            {photos.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                aria-label={`Go to poster ${i + 1}`}
                className={`h-3 rounded-full transition-all duration-300 ${
                  i === current ? "bg-accent w-10" : "bg-gray-300 w-3 hover:bg-gray-400"
                }`}
              />
            ))}
          </div>
          <span className="text-text-muted text-sm">
            {current + 1} / {photos.length}
          </span>
        </div>
      )}
    </div>
  )
}
