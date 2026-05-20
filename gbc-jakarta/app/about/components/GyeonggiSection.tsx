"use client"

import { useTranslation } from "../../lib/LanguageContext"
import ScrollReveal from "../../components/ScrollReveal"
import { VideoEmbed } from "./shared"

const GYEONGGI_STATS = [
  {
    value: "350 Milliar USD",
    labelKey: "gyeonggiStat1" as const,
    color: "text-[#f59e0b]",
  },
  {
    value: "13.6 Juta",
    labelKey: "gyeonggiStat2" as const,
    color: "text-[#60a5fa]",
  },
  {
    value: "1.84 Juta UKM",
    labelKey: "gyeonggiStat3" as const,
    color: "text-[#a78bfa]",
  },
  {
    value: "312 Milliar USD",
    labelKey: "gyeonggiStat4" as const,
    color: "text-[#34d399]",
  },
  {
    value: "250,652",
    labelKey: "gyeonggiStat5" as const,
    color: "text-[#f472b6]",
  },
]

const GYEONGGI_FACTS = [
  { icon: "fas fa-microchip", key: "gyeonggiFact1" as const },
  { icon: "fas fa-flask", key: "gyeonggiFact2" as const },
  { icon: "fas fa-chart-line", key: "gyeonggiFact3" as const },
  { icon: "fas fa-globe-asia", key: "gyeonggiFact4" as const },
]

export default function GyeonggiSection() {
  const { t } = useTranslation()

  return (
    <section className="min-h-screen py-24 relative overflow-hidden" id="gyeonggi">
      <div className="max-w-[1200px] mx-auto px-[5%] relative z-[2]">
        {/* Header */}
        <ScrollReveal className="text-center max-w-[640px] mx-auto mb-12">
          <h2 className="font-display text-3xl md:text-[2.8rem] font-extrabold text-primary mb-3 leading-[1.2]">
            Gyeonggi-do
          </h2>
          <p className="text-text-light text-lg leading-[1.8] text-center">{t("gyeonggiDesc")}</p>
        </ScrollReveal>

        {/* Video */}
        <ScrollReveal>
          <VideoEmbed
            srcId={process.env.NEXT_PUBLIC_HPANEL_VIDEO_PROFILE_GYEONGGIDO || ""}
            srcEn={process.env.NEXT_PUBLIC_HPANEL_VIDEO_PROFILE_GYEONGGIDO || ""}
            captionId={t("gyeonggiVideoCaption")}
            captionEn={t("gyeonggiVideoCaption")}
          />
        </ScrollReveal>

        {/* Stats + Facts */}
        <ScrollReveal>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            {/* Stats panel */}
            <div className="bg-white rounded-2xl p-8 flex flex-col gap-4 border-2 border-gray-200">
              <p className="text-[0.7rem] font-bold uppercase tracking-[0.15em] text-gray-400">
                {t("gyeonggiInNumbers")}
              </p>
              {GYEONGGI_STATS.map((s) => (
                <div key={s.value} className="flex flex-col gap-0.5">
                  <span className={`text-xl font-extrabold leading-tight ${s.color}`}>
                    {s.value}
                  </span>
                  <span className="text-xs text-gray-500">{t(s.labelKey)}</span>
                </div>
              ))}
            </div>

            {/* Facts */}
            <div className="flex flex-col gap-4 justify-center">
              {GYEONGGI_FACTS.map((f) => (
                <div
                  key={f.key}
                  className="flex items-start gap-4 bg-white rounded-xl px-5 py-4 border border-gray-100 shadow-sm"
                >
                  <div className="w-9 h-9 bg-accent/10 rounded-lg flex items-center justify-center text-accent shrink-0">
                    <i className={f.icon} />
                  </div>
                  <p className="text-sm text-text leading-relaxed">{t(f.key)}</p>
                </div>
              ))}
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
