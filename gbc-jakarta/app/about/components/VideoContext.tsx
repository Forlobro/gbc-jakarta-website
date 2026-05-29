// contexts/VideoContext.tsx
"use client"

import { createContext, useContext, useState, useCallback } from "react"

type VideoContextType = {
  hasPlayedOnce: boolean
  isMuted: boolean
  markAsPlayed: () => void
  updateMuteState: (muted: boolean) => void
}

const VideoContext = createContext<VideoContextType | null>(null)

export function VideoProvider({ children }: { children: React.ReactNode }) {
  const [hasPlayedOnce, setHasPlayedOnce] = useState(false)
  const [isMuted, setIsMuted] = useState(true)

  const markAsPlayed = useCallback(() => {
    setHasPlayedOnce(true)
  }, [])

  const updateMuteState = useCallback((muted: boolean) => {
    setIsMuted(muted)
  }, [])

  return (
    <VideoContext.Provider value={{ hasPlayedOnce, isMuted, markAsPlayed, updateMuteState }}>
      {children}
    </VideoContext.Provider>
  )
}

export function useVideoContext() {
  const context = useContext(VideoContext)
  if (!context) throw new Error("useVideoContext must be used inside VideoProvider")
  return context
}
