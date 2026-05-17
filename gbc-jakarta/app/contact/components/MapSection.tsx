"use client"

import { useTranslation } from "@/app/lib/LanguageContext"
import SectionBadge from "@/app/components/SectionBadge"
import DotPattern from "@/app/components/DotPattern"

export default function MapSection() {
  const { t } = useTranslation()

  return (
    <section className="min-h-screen py-36 bg-gradient-to-b from-[#f0f7ff] to-white relative" id="location">
      {/* Dot pattern */}
      <DotPattern />

      {/* Blurred accent — top left */}
      <div className="absolute -top-32 -left-32 w-[500px] h-[500px] rounded-full bg-accent/8 blur-2xl pointer-events-none" />

      {/* Circle outline — top left */}
      <div className="absolute -top-20 -left-20 w-[360px] h-[360px] rounded-full border-[50px] border-accent/10 pointer-events-none" />

      {/* Floating symbols */}
      <div className="absolute top-16 right-[8%] text-accent/15 text-8xl font-bold pointer-events-none select-none leading-none">
        +
      </div>
      <div className="absolute bottom-16 left-[6%] text-primary/10 text-7xl font-bold pointer-events-none select-none leading-none">
        ×
      </div>

      <div className="max-w-[1400px] mx-auto px-[5%] relative z-[2]">
        {/* Header */}
        <div className="text-center max-w-[600px] mx-auto mb-8">
          <SectionBadge centered>{t("mapLabel")}</SectionBadge>
          <h2 className="font-display text-3xl md:text-[3rem] font-extrabold text-primary mb-4 leading-[1.2]">
            {t("mapTitle")}
          </h2>
          <p className="text-text-light text-lg">
            DBS Tower Suite #905,
            <br /> Jl. Prof. Dr. Satrio Kav.3, Kuningan, South Jakarta 12940
          </p>
        </div>

        {/* Map — full width, clickable */}
        <a
          href="https://maps.app.goo.gl/2pfY976JZ8GiKhjX6"
          target="_blank"
          rel="noopener noreferrer"
          className="block relative rounded-3xl overflow-hidden shadow-2xl border border-gray-100 group"
        >
          <iframe
            src="https://maps.google.com/maps?q=GBC+Gyeonggi+Business+Center+Jakarta&ftid=0x2e69f300357af55f:0xfa5a6df37d1ec5bf&output=embed&z=17"
            className="w-full h-[500px] pointer-events-none"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="GBC Jakarta Location"
          />
          {/* Hover overlay */}
          <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/10 transition-all duration-300 flex items-center justify-center">
            <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white/90 backdrop-blur-sm px-6 py-3 rounded-full shadow-lg flex items-center gap-3 text-primary font-semibold text-sm">
              <i className="fas fa-external-link-alt" /> {t("mapOpenInMaps")}
            </div>
          </div>
        </a>
      </div>
    </section>
  )
}
