"use client"

import { useTranslation } from "@/app/lib/LanguageContext"
import SectionBadge from "@/app/components/SectionBadge"

export default function MapSection() {
  const { t } = useTranslation()

  return (
    <section className="py-16 md:py-24 lg:py-32 relative" id="location">
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
