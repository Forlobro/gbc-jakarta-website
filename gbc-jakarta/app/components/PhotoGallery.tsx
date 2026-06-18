"use client"

import { useState, useCallback, useEffect } from "react"
import { createPortal } from "react-dom"
import Image from "next/image"

interface PhotoGalleryProps {
  photos: string[]
  title?: string
  altPrefix?: string
}

export default function PhotoGallery({ photos, title, altPrefix = "Photo" }: PhotoGalleryProps) {
  const [current, setCurrent] = useState(0)
  const [zoomed, setZoomed] = useState(false)

  if (photos.length === 0) return null

  const prev = () => setCurrent((c) => (c === 0 ? photos.length - 1 : c - 1))
  const next = () => setCurrent((c) => (c === photos.length - 1 ? 0 : c + 1))

  return (
    <>
      <div>
        {title && <h3 className="font-display text-xl font-extrabold text-primary mb-5">{title}</h3>}

        {/* Main photo */}
        <div className="mb-4 flex justify-center">
          <div
            className="rounded-2xl overflow-hidden shadow-xl relative group cursor-zoom-in"
            onClick={() => setZoomed(true)}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              key={current}
              src={photos[current]}
              alt={`${altPrefix} ${current + 1}`}
              className="block max-w-full max-h-[50vh] w-auto h-auto transition-opacity duration-300"
            />

            {photos.length > 1 && (
              <>
                <button
                  onClick={(e) => { e.stopPropagation(); prev() }}
                  aria-label="Previous photo"
                  className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 bg-white/90 hover:bg-white rounded-full shadow-md flex items-center justify-center text-primary transition-all duration-200 opacity-0 group-hover:opacity-100"
                >
                  <i className="fas fa-chevron-left text-xs" />
                </button>
                <button
                  onClick={(e) => { e.stopPropagation(); next() }}
                  aria-label="Next photo"
                  className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 bg-white/90 hover:bg-white rounded-full shadow-md flex items-center justify-center text-primary transition-all duration-200 opacity-0 group-hover:opacity-100"
                >
                  <i className="fas fa-chevron-right text-xs" />
                </button>

                <span className="absolute bottom-3 right-3 bg-black/50 text-white text-xs px-2.5 py-1 rounded-full backdrop-blur-sm">
                  {current + 1} / {photos.length}
                </span>
              </>
            )}
          </div>
        </div>

        {/* Thumbnails / Dots */}
        {photos.length > 1 && (
          <>
            {photos.length <= 8 ? (
              <div className="flex gap-2 flex-wrap justify-center">
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

      {zoomed && (
        <PhotoLightbox
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

function PhotoLightbox({ photos, current, setCurrent, altPrefix, onClose }: LightboxProps) {
  const prev = useCallback(
    () => setCurrent(current === 0 ? photos.length - 1 : current - 1),
    [current, photos.length, setCurrent],
  )
  const next = useCallback(
    () => setCurrent(current === photos.length - 1 ? 0 : current + 1),
    [current, photos.length, setCurrent],
  )

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
      if (e.key === "ArrowLeft") prev()
      if (e.key === "ArrowRight") next()
    }
    document.addEventListener("keydown", handleKey)
    return () => document.removeEventListener("keydown", handleKey)
  }, [onClose, prev, next])

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
      <button
        onClick={onClose}
        className="absolute top-4 right-4 z-10 w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white transition-colors"
        aria-label="Close zoom"
      >
        <i className="fas fa-times text-xl" />
      </button>

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

        {photos.length > 1 && (
          <>
            <button
              onClick={prev}
              className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white transition-all"
              aria-label="Previous photo"
            >
              <i className="fas fa-chevron-left" />
            </button>
            <button
              onClick={next}
              className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white transition-all"
              aria-label="Next photo"
            >
              <i className="fas fa-chevron-right" />
            </button>
          </>
        )}
      </div>

      {photos.length > 1 && (
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/70 text-sm">
          {current + 1} / {photos.length}
        </div>
      )}
    </div>
  )

  return createPortal(content, document.body)
}
