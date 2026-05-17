"use client"

import { useTranslation } from "../../lib/LanguageContext"
import PageBadge from "../../components/PageBadge"
import DotPattern from "../../components/DotPattern"

export default function EventsHeaderSection() {
  const { t } = useTranslation()

  return (
    <section
      className="min-h-screen flex items-center bg-gradient-to-br from-primary via-primary-light to-[#2d5a9e] relative overflow-hidden pb-20"
      id="events-header"
    >
      {/* Background radial blobs */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(circle at 10% 90%, rgba(0, 194, 203, 0.15) 0%, transparent 40%), radial-gradient(circle at 90% 10%, rgba(255, 255, 255, 0.05) 0%, transparent 40%)",
        }}
      />

      {/* Dot pattern */}
      <DotPattern variant="dark" />

      {/* Blurred accent — top right (contained within section) */}
      <div className="absolute -top-20 -right-20 w-[500px] h-[500px] rounded-full bg-accent/10 blur-2xl pointer-events-none" />

      {/* Circle outline — top right */}
      <div className="absolute -top-10 -right-10 w-[350px] h-[350px] rounded-full border-[50px] border-white/8 pointer-events-none" />

      {/* Blurred — bottom left */}
      <div className="absolute -bottom-20 -left-20 w-[450px] h-[450px] rounded-full bg-white/5 blur-2xl pointer-events-none" />

      {/* Circle outline — bottom left */}
      <div className="absolute -bottom-10 -left-10 w-[300px] h-[300px] rounded-full border-[40px] border-accent/10 pointer-events-none" />

      {/* Floating symbols */}
      <div className="absolute top-20 right-[10%] text-white/10 text-8xl font-bold pointer-events-none select-none leading-none">
        +
      </div>
      <div className="absolute bottom-28 left-[6%] text-accent/15 text-7xl font-bold pointer-events-none select-none leading-none">
        ×
      </div>

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

      {/* Wave transition — overlaps 1px to prevent gap line */}
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
