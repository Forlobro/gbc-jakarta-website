"use client"

import { useEffect, useState } from "react"
import { useTranslation } from "../../lib/LanguageContext"

export default function AboutDotNav() {
  const { t } = useTranslation()
  const [active, setActive] = useState("about-intro")

  const sections = [
    { id: "about-intro", label: t("aboutNavAbout") },
    { id: "gbc", label: "GBC" },
    { id: "gbsa", label: "GBSA" },
    { id: "gyeonggi", label: "Gyeonggi-do" },
    { id: "history", label: t("aboutNavHistory") },
  ]

  useEffect(() => {
    const observers: IntersectionObserver[] = []

    sections.forEach(({ id }) => {
      const el = document.getElementById(id)
      if (!el) return

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActive(id)
        },
        { threshold: 0.4 },
      )

      observer.observe(el)
      observers.push(observer)
    })

    return () => observers.forEach((o) => o.disconnect())
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <nav className="fixed right-6 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-3">
      {sections.map(({ id, label }) => {
        const isActive = active === id
        return (
          <button
            key={id}
            onClick={() => scrollTo(id)}
            title={label}
            className="group relative flex items-center justify-end cursor-pointer"
          >
            <span className="absolute right-5 opacity-0 group-hover:opacity-100 transition-all duration-200 translate-x-1 group-hover:translate-x-0 text-[0.7rem] font-semibold text-primary bg-white/90 backdrop-blur-sm px-2.5 py-1 rounded-full shadow-sm whitespace-nowrap pointer-events-none">
              {label}
            </span>
            <span
              className={`block rounded-full transition-all duration-300 ${
                isActive
                  ? "w-3 h-3 bg-accent shadow-[0_0_8px_rgba(0,194,203,0.6)]"
                  : "w-2 h-2 bg-primary/25 group-hover:bg-primary/50"
              }`}
            />
          </button>
        )
      })}
    </nav>
  )
}
