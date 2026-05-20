"use client"

import { useTranslation } from "../../lib/LanguageContext"
import PageBadge from "../../components/PageBadge"
import HeroDecor from "../../components/HeroDecor"

export default function EventsHeaderSection() {
  const { t } = useTranslation()

  return (
    <section
      className="min-h-screen flex items-center bg-gradient-to-br from-primary via-primary-light to-[#2d5a9e] relative overflow-hidden pb-20"
      id="events-header"
    >
      <HeroDecor />

      {/* Content */}
      <div className="max-w-[1400px] mx-auto px-[5%] relative z-10">
        <div className="max-w-[700px]">
          <PageBadge>{t("eventsPageBadge")}</PageBadge>
          <h1 className="font-display text-4xl md:text-5xl font-extrabold text-white leading-[1.15] mb-5">
            {t("eventsPageTitle")}
          </h1>
          <p className="text-white/70 text-lg leading-[1.8] text-justify">{t("eventsPageDesc")}</p>
        </div>
      </div>

      {/* Wave transition */}
      <div className="absolute -bottom-[1px] left-0 right-0 pointer-events-none">
        <svg
          viewBox="0 0 1440 80"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full block"
          preserveAspectRatio="none"
        >
          <path d="M0,40 C360,80 1080,0 1440,50 L1440,80 L0,80 Z" fill="white" />
        </svg>
      </div>
    </section>
  )
}
