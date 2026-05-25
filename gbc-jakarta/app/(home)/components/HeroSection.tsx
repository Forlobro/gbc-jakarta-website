"use client"

import { useState, useEffect } from "react"
import { useTranslation } from "@/app/lib/LanguageContext"

function CountUp({ target, duration = 3000 }: { target: number; duration?: number }) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    let startTime: number | null = null

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp
      const progress = Math.min((timestamp - startTime) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setCount(Math.floor(eased * target))
      if (progress < 1) requestAnimationFrame(animate)
      else setCount(target)
    }

    requestAnimationFrame(animate)
  }, [target, duration])

  return <>{count}</>
}

const HIGHLIGHT_BY_LANG: Record<string, string> = {
  en: "Gyeonggi Excellence",
  id: "Keunggulan Gyeonggi",
}

const BG_IMAGES = [
  "/images/gbc-hero.jpeg",
  "/images/gbc-hero1.jpeg",
  "/images/gbc-hero2.jpeg",
  "/images/gbc-hero3.jpeg",
  "/images/gbc-hero5.jpeg",
  "/images/gbc-hero6.jpeg",
]

export default function HeroSection() {
  const { t, language } = useTranslation()
  const [current, setCurrent] = useState(0)

  const highlight = HIGHLIGHT_BY_LANG[language] ?? HIGHLIGHT_BY_LANG.en
  const titleParts = t("heroTitle").split(highlight)

  // Auto-slide every 5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((c) => (c === BG_IMAGES.length - 1 ? 0 : c + 1))
    }, 5000)
    return () => clearInterval(timer)
  }, [])

  return (
    <section className="min-h-screen relative flex items-center overflow-hidden" id="home">
      {/* Background Images (fade transition) */}
      {BG_IMAGES.map((src, i) => (
        <div
          key={src}
          className="absolute inset-0 transition-opacity duration-1000"
          style={{
            opacity: i === current ? 1 : 0,
            backgroundImage: `linear-gradient(rgba(15, 40, 71, 0.8), rgba(30, 65, 117, 0.8)), url('${src}')`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        />
      ))}

      {/* Background Pattern */}
      <div
        className="absolute inset-0 animate-bg-float z-[1]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 20% 50%, rgba(0, 194, 203, 0.1) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(255, 255, 255, 0.05) 0%, transparent 40%), radial-gradient(circle at 40% 80%, rgba(0, 194, 203, 0.08) 0%, transparent 40%)",
        }}
      />

      {/* Grid Overlay */}
      <div
        className="absolute inset-0 z-[1]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      <div className="max-w-[1400px] mx-auto px-[5%] relative z-[2] w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center py-24 lg:py-[67px]">
          {/* Hero Text */}
          <div className="text-white text-center lg:text-left">
            {/* Title */}
            <h1
              className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-[4rem] font-extrabold leading-[1.1] mb-5 opacity-0"
              style={{ animation: "fadeInUp 0.8s ease 0.1s forwards" }}
            >
              {titleParts[0]}
              <span className="bg-gradient-to-br from-accent to-[#00a8b0] bg-clip-text text-transparent">
                {highlight}
              </span>
              {titleParts[1] ?? ""}
            </h1>

            {/* Description */}
            <p
              className="text-base sm:text-lg md:text-xl opacity-0 mb-8 md:mb-10 max-w-[500px] leading-[1.8] mx-auto lg:mx-0"
              style={{ animation: "fadeInUp 0.8s ease 0.2s forwards" }}
            >
              {t("heroDesc")}
            </p>

          </div>

          {/* Hero Visual */}
          <div
            className="relative opacity-0"
            style={{ animation: "fadeInUp 0.8s ease 0.4s forwards" }}
          >
            {/* Stats Card */}
            <div className="bg-white/10 backdrop-blur-[20px] border border-white/20 rounded-3xl p-5 relative overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-accent to-[#00a8b0]" />
              <div className="grid grid-cols-2 gap-4 sm:gap-8">
                {[
                  { target: 50, suffix: "+", prefix: "", label: t("partnerCompanies") },
                  { target: 562.518, suffix: "", prefix: "$", label: t("partnerExport") },
                  { target: 999, suffix: "+", prefix: "", label: t("businessMatches") },
                  { target: 2023, suffix: "", prefix: "", label: t("established") },
                ].map((stat) => (
                  <div
                    key={stat.label}
                    className="text-center p-4 sm:p-6 bg-white/5 rounded-2xl transition-all duration-300 hover:bg-white/10 hover:-translate-y-[5px]"
                  >
                    <span className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold text-accent block leading-none mb-2">
                      {stat.prefix}<CountUp target={stat.target} />
                      {stat.suffix}
                    </span>
                    <span className="text-white/70 text-[0.75rem] sm:text-[0.9rem] font-medium">{stat.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

    </section>
  )
}
