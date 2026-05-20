"use client"

import { useRef, useEffect } from "react"
import { useTranslation } from "../../lib/LanguageContext"

export function VideoEmbed({
  srcId,
  srcEn,
  captionId,
  captionEn,
}: {
  srcId: string
  srcEn: string
  captionId: string
  captionEn: string
}) {
  const { language } = useTranslation()
  const src = language === "id" ? srcId : srcEn
  const caption = language === "id" ? captionId : captionEn

  const isMp4 = src?.endsWith(".mp4")
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    if (!isMp4 || !videoRef.current) return

    const videoEl = videoRef.current

    // Ensure video starts paused and muted (required for autoplay policy)
    videoEl.pause()
    videoEl.muted = true

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            videoEl.muted = true // Always muted before play to satisfy autoplay policy
            videoEl.play().catch(() => {
              // Autoplay blocked — silently ignore
            })
          } else {
            videoEl.pause()
          }
        })
      },
      {
        threshold: 0.5,
        // Use the document root, not a scrolling ancestor, to avoid ScrollReveal interference
        root: null,
      },
    )

    // Small delay so ScrollReveal animations settle before we start observing
    const timer = setTimeout(() => {
      observer.observe(videoEl)
    }, 300)

    return () => {
      clearTimeout(timer)
      observer.unobserve(videoEl)
    }
  }, [isMp4, src])

  return (
    <div className="max-w-4xl mx-auto mb-16">
      <div className="rounded-2xl overflow-hidden shadow-xl bg-black">
        <div className="relative w-full" style={{ paddingTop: "56.25%" }}>
          {isMp4 ? (
            <video
              ref={videoRef}
              key={src}
              className="absolute inset-0 w-full h-full object-cover"
              controls
              muted
              playsInline
              preload="metadata"
              src={src}
              title={caption}
            />
          ) : (
            <iframe
              key={src}
              className="absolute inset-0 w-full h-full"
              src={src}
              title={caption}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          )}
        </div>
      </div>
      <p className="text-center text-sm text-text-light mt-3">{caption}</p>
    </div>
  )
}
