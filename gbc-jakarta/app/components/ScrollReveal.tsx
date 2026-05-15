"use client"

import { useEffect, useRef, ReactNode } from "react"

interface ScrollRevealProps {
  children: ReactNode
  className?: string
}

export default function ScrollReveal({ children, className = "" }: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const element = ref.current
    if (!element) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.remove("reveal-hidden")
            entry.target.classList.add("reveal-visible")
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.1 },
    )

    observer.observe(element)

    return () => {
      observer.unobserve(element)
    }
  }, [])

  return (
    <div ref={ref} className={`reveal-hidden ${className}`}>
      {children}
    </div>
  )
}
