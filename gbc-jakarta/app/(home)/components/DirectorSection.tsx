"use client"

import Image from "next/image"
import ScrollReveal from "@/app/components/ScrollReveal"
import SectionBadge from "@/app/components/SectionBadge"
import { useTranslation } from "@/app/lib/LanguageContext"

const directors = [
  {
    name: "Shin Ho Jin",
    photo: "/images/GBC Director Jakarta.png",
  },
]

export default function DirectorSection() {
  const { t } = useTranslation()

  return (
    <section className="min-h-screen py-36 relative" id="team">
      <div className="max-w-[1400px] mx-auto px-[5%] relative z-[2]">
        {/* Header */}
        <ScrollReveal className="text-center max-w-[600px] mx-auto mb-20">
          <SectionBadge centered>{t("directorLabel")}</SectionBadge>
          <h2 className="font-display text-3xl md:text-[3rem] font-extrabold text-primary mb-6 leading-[1.2]">
            Shin Ho Jin
          </h2>
        </ScrollReveal>

        {/* Director Cards — slide style */}
        <div className="space-y-10 mb-20 max-w-[900px] mx-auto">
          {directors.map((director) => (
            <ScrollReveal key={director.name}>
              <div className="grid grid-cols-1 lg:grid-cols-2 rounded-3xl overflow-hidden shadow-xl border border-gray-100">
                {/* Left: Title */}
                <div className="bg-white flex flex-col justify-center px-10 py-12">
                  <h3 className="font-display text-3xl font-extrabold text-text leading-tight mb-4">
                    {t("messageTitle")}
                  </h3>
                  <div className="w-28 h-[4px] bg-[#00c2cb] rounded-full mb-5" />
                  <p className="text-text-light text-sm leading-[1.8] text-justify">
                    {t("messageText")}
                  </p>
                </div>

                {/* Right: Photo */}
                <div className="relative bg-gradient-to-br from-blue-50 via-slate-50 to-sky-100 flex flex-col items-center justify-center gap-6 py-12 px-10 overflow-hidden">
                  {/* Diagonal streaks */}
                  <div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                      background:
                        "repeating-linear-gradient(135deg, rgba(100,160,230,0.07) 0px, rgba(100,160,230,0.07) 2px, transparent 2px, transparent 44px)",
                    }}
                  />

                  {/* Director Photo */}
                  <div className="relative z-[1] w-full max-w-[280px] aspect-[3/4] rounded-2xl overflow-hidden shadow-xl">
                    <Image
                      src={director.photo}
                      alt={director.name}
                      fill
                      className="object-cover object-top"
                    />
                  </div>

                  {/* Name tag */}
                  <div className="relative z-[1] flex items-center gap-3 bg-white/80 backdrop-blur-sm px-6 py-3 rounded-full shadow-md">
                    <span className="text-text-light text-sm">{t("directorLabel")}</span>
                    <span className="text-gray-300 font-light">|</span>
                    <span className="font-bold text-text text-sm">{director.name}</span>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
