"use client"

/**
 * PosterCarousel — supports both portrait & landscape poster images.
 * Lightbox is rendered via React Portal to escape stacking context issues.
 */

import { useState, useCallback, useEffect } from "react"
import { createPortal } from "react-dom"
import Image from "next/image"

interface PosterCarouselProps {
  photos: string[]
  altPrefix?: string
}

export default function PosterCarousel({ photos, altPrefix = "Poster" }: PosterCarouselProps) {
  const [current, setCurrent] = useState(0)
  const [zoomed, setZoomed] = useState(false)

  if (photos.length === 0) return null

  const prev = () => setCurrent((c) => (c === 0 ? photos.length - 1 : c - 1))
  const next = () => setCurrent((c) => (c === photos.length - 1 ? 0 : c + 1))

  return (
    <>
      <div className="flex flex-col items-center gap-6">
        {/* Main poster — adapts to portrait or landscape, max-w matches video embed (max-w-4xl) */}
        <div className="relative w-full max-w-4xl mx-auto">
          <div className="relative w-full flex items-center justify-center">
            {photos.map((src, i) => (
              <div
                key={src}
                className={`${i === current ? "relative" : "absolute inset-0"} rounded-3xl overflow-hidden shadow-2xl transition-opacity duration-700 cursor-zoom-in flex items-center justify-center`}
                style={{
                  opacity: i === current ? 1 : 0,
                  pointerEvents: i === current ? "auto" : "none",
                }}
                onClick={() => setZoomed(true)}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={src}
                  alt={`${altPrefix} ${i + 1}`}
                  className="max-w-full max-h-[70vh] w-auto h-auto object-contain block rounded-3xl"
                />
              </div>
            ))}
          </div>

          {/* Prev / Next buttons */}
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

          {/* Zoom hint */}
          <button
            onClick={() => setZoomed(true)}
            className="absolute bottom-4 right-4 z-10 w-10 h-10 bg-white/90 hover:bg-white rounded-full shadow-lg flex items-center justify-center text-primary/70 hover:text-primary transition-all duration-200"
            aria-label="Zoom poster"
          >
            <i className="fas fa-search-plus text-sm" />
          </button>
        </div>

        {/* Dots + counter */}
        {photos.length > 1 && (
          <div className="flex flex-col items-center">
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
          </div>
        )}
      </div>

      {/* Lightbox rendered via Portal to escape stacking contexts */}
      {zoomed && (
        <PosterLightbox
          photos={photos}
          current={current}
          setCurrent={setCurrent}
          altPrefix={altPrefix}
          onClose={() => setZoomed(false)}
        />
      )}
    </>
  )
}

/* ─── Lightbox (Portal) ─── */

interface LightboxProps {
  photos: string[]
  current: number
  setCurrent: (i: number) => void
  altPrefix: string
  onClose: () => void
}

function PosterLightbox({ photos, current, setCurrent, altPrefix, onClose }: LightboxProps) {
  const prev = useCallback(
    () => setCurrent(current === 0 ? photos.length - 1 : current - 1),
    [current, photos.length, setCurrent],
  )
  const next = useCallback(
    () => setCurrent(current === photos.length - 1 ? 0 : current + 1),
    [current, photos.length, setCurrent],
  )

  // Keyboard navigation
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
      if (e.key === "ArrowLeft") prev()
      if (e.key === "ArrowRight") next()
    }
    document.addEventListener("keydown", handleKey)
    return () => document.removeEventListener("keydown", handleKey)
  }, [onClose, prev, next])

  // Prevent scroll and hide navbar
  useEffect(() => {
    document.body.style.overflow = "hidden"
    document.documentElement.style.overflow = "hidden"
    const navbar = document.getElementById("navbar")
    if (navbar) navbar.style.display = "none"
    return () => {
      document.body.style.overflow = ""
      document.documentElement.style.overflow = ""
      if (navbar) navbar.style.display = ""
    }
  }, [])

  const content = (
    <div
      className="fixed inset-0 z-[9999] bg-black/90 backdrop-blur-sm flex items-center justify-center overflow-hidden touch-none"
      onClick={onClose}
    >
      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 z-10 w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white transition-colors"
        aria-label="Close zoom"
      >
        <i className="fas fa-times text-xl" />
      </button>

      {/* Image container */}
      <div
        className="relative w-[90vw] h-[90vh] flex items-center justify-center"
        onClick={(e) => e.stopPropagation()}
      >
        {photos.map((src, i) => (
          <div
            key={src}
            className="absolute inset-0 flex items-center justify-center transition-opacity duration-500"
            style={{
              opacity: i === current ? 1 : 0,
              pointerEvents: i === current ? "auto" : "none",
            }}
          >
            <Image
              src={src}
              alt={`${altPrefix} ${i + 1}`}
              fill
              className="object-contain"
              sizes="90vw"
              priority={i === current}
            />
          </div>
        ))}

        {/* Navigation */}
        {photos.length > 1 && (
          <>
            <button
              onClick={prev}
              className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white transition-all"
              aria-label="Previous poster"
            >
              <i className="fas fa-chevron-left" />
            </button>
            <button
              onClick={next}
              className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white transition-all"
              aria-label="Next poster"
            >
              <i className="fas fa-chevron-right" />
            </button>
          </>
        )}
      </div>

      {/* Counter */}
      {photos.length > 1 && (
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/70 text-sm">
          {current + 1} / {photos.length}
        </div>
      )}
    </div>
  )

  return createPortal(content, document.body)
}
