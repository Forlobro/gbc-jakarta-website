"use client"

import { useRef, useEffect, useLayoutEffect, useState, useCallback } from "react"
import { useTranslation } from "../../lib/LanguageContext"
import { useVideoContext } from "./VideoContext"

export function VideoEmbed({
  srcId,
  srcEn,
  captionId,
  captionEn,
  posterSrc
}: {
  srcId: string
  srcEn: string
  captionId: string
  captionEn: string
  posterSrc?: string
}) {
  const { language } = useTranslation()
  const src = language === "id" ? srcId : srcEn
  const caption = language === "id" ? captionId : captionEn
  const poster = posterSrc

  const isMp4 = src?.endsWith(".mp4")
  const videoRef = useRef<HTMLVideoElement>(null)

  // Shared state dari context — sama untuk semua instance
  const { hasPlayedOnce, isMuted, markAsPlayed, updateMuteState } = useVideoContext()

  const [isPlaying, setIsPlaying] = useState(false)
  const [showMutedBadge, setShowMutedBadge] = useState(false)
  const badgeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const showBadgeBriefly = useCallback(() => {
    setShowMutedBadge(true)
    if (badgeTimerRef.current) clearTimeout(badgeTimerRef.current)
    badgeTimerRef.current = setTimeout(() => setShowMutedBadge(false), 2500)
  }, [])

  useLayoutEffect(() => {
    if (!isMp4 || !videoRef.current) return
    const videoEl = videoRef.current
    videoEl.pause()
    videoEl.muted = true
    videoEl.currentTime = 0
  }, [isMp4, src])

  useEffect(() => {
    if (!isMp4 || !videoRef.current) return
    const videoEl = videoRef.current

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (!hasPlayedOnce) {
              videoEl.muted = true
              updateMuteState(true)
              markAsPlayed()
              showBadgeBriefly()
            } else {
              videoEl.muted = isMuted
              if (isMuted) showBadgeBriefly()
            }

            videoEl.play().catch(() => {})
            setIsPlaying(true)
          } else {
            videoEl.pause()
            setIsPlaying(false)
          }
        })
      },
      { threshold: 0.5, root: null },
    )

    observer.observe(videoEl)

    return () => {
      observer.unobserve(videoEl)
      if (badgeTimerRef.current) clearTimeout(badgeTimerRef.current)
    }
  }, [isMp4, src, hasPlayedOnce, isMuted, markAsPlayed, updateMuteState, showBadgeBriefly])

  return (
    <div className="max-w-4xl mx-auto mb-16">
      <div className="rounded-2xl overflow-hidden shadow-xl bg-black">
        <div className="relative w-full" style={{ paddingTop: "56.25%" }}>
          {isMp4 ? (
            <>
              <video
                ref={videoRef}
                key={src}
                className="absolute inset-0 w-full h-full object-cover"
                controls
                muted
                autoPlay={false}
                playsInline
                preload="none"
                poster={poster}
                src={src}
                title={caption}
                onLoadedMetadata={(e) => {
                  e.currentTarget.pause()
                  e.currentTarget.muted = true
                }}
                onPlay={() => setIsPlaying(true)}
                onPause={() => setIsPlaying(false)}
                onVolumeChange={(e) => {
                  const muted = e.currentTarget.muted
                  updateMuteState(muted)
                  if (muted) showBadgeBriefly()
                }}
              />

              <div
                className={`
                  absolute top-3 right-3 z-10
                  flex items-center gap-1.5
                  bg-black/60 backdrop-blur-sm
                  text-white text-xs font-medium
                  px-2.5 py-1.5 rounded-full
                  pointer-events-none
                  transition-opacity duration-500
                  ${showMutedBadge && isMuted && isPlaying ? "opacity-100" : "opacity-0"}
                `}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-3.5 h-3.5 shrink-0"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                  <line x1="23" y1="9" x2="17" y2="15" />
                  <line x1="17" y1="9" x2="23" y2="15" />
                </svg>
                <span className="hidden sm:inline">Muted</span>
              </div>
            </>
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
