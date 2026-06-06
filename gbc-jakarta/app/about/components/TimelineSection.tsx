"use client"

import { useTranslation } from "../../lib/LanguageContext"
import ScrollReveal from "../../components/ScrollReveal"

const TIMELINE = [
  { year: "1997", key: "timeline1997" as const },
  { year: "2008", key: "timeline2008" as const },
  { year: "2010", key: "timeline2010" as const },
  { year: "2016", key: "timeline2016" as const },
  { year: "2017", key: "timeline2017" as const, noteKey: "timeline2017Note" as const },
  { year: "2020", key: "timeline2020" as const },
  { year: "2023", key: "timeline2023" as const, highlight: true },
  { year: "2025", key: "timeline2025" as const, highlight: true },
]

export default function TimelineSection() {
  const { t } = useTranslation()

  return (
    <section className="py-16 md:py-20 lg:py-24 relative overflow-hidden" id="history">
      <div className="max-w-[1200px] mx-auto px-[5%] relative z-[2]">
        <ScrollReveal className="max-w-[600px] mx-auto text-center mb-14">
          <h2 className="font-display text-3xl md:text-[2.8rem] font-extrabold text-primary mb-3 leading-[1.2]">
            {t("timelineTitle")} <br /> {t("timelineSubtitle")}
          </h2>
          <p className="text-text-light text-lg text-center">{t("timelineDesc")}</p>
        </ScrollReveal>

        <ScrollReveal className="max-w-2xl mx-auto">
          <div className="relative pl-10">
            <div className="absolute left-[7px] top-2 bottom-8 w-[2px] bg-gray-200 rounded-full" />

            {TIMELINE.map((item) => (
              <div
                key={item.year}
                className={`relative mb-8 last:mb-0 ${
                  item.highlight ? "bg-amber-50 border border-amber-200 rounded-2xl p-5 ml-2" : ""
                }`}
              >
                <div
                  className={`absolute top-1.5 rounded-full border-2 border-white shadow ${
                    item.highlight
                      ? "-left-[36px] w-4 h-4 bg-amber-400 shadow-amber-200"
                      : "-left-[28px] w-3 h-3 bg-gray-300"
                  }`}
                />
                <div className="flex flex-col gap-1">
                  <span
                    className={`text-sm font-extrabold tracking-wide ${item.highlight ? "text-amber-600" : "text-primary"}`}
                  >
                    {item.year}
                  </span>
                  <span className="text-[0.95rem] text-text leading-relaxed">{t(item.key)}</span>
                  {"noteKey" in item && item.noteKey && (
                    <span className="text-xs text-text-light italic mt-0.5">{t(item.noteKey)}</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
