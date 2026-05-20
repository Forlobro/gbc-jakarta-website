"use client"

import { useTranslation } from "../../lib/LanguageContext"
import ScrollReveal from "../../components/ScrollReveal"
import { VideoEmbed } from "./shared"

export default function GBSASection() {
  const { t } = useTranslation()

  return (
    <section className="min-h-screen py-24 relative overflow-hidden" id="gbsa">
      <div className="max-w-[1200px] mx-auto px-[5%] relative z-[2]">
        {/* Header */}
        <ScrollReveal className="text-center max-w-[640px] mx-auto mb-12">
          <h2 className="font-display text-3xl md:text-[2.6rem] font-extrabold text-primary mb-3 leading-[1.2]">
            GBSA — Gyeonggido Business & Science Accelerator
          </h2>
          <p className="text-text-light text-lg text-center">{t("gbsaDesc")}</p>
        </ScrollReveal>

        {/* Video */}
        <ScrollReveal>
          <VideoEmbed
            srcId={process.env.NEXT_PUBLIC_HPANEL_VIDEO_PROFILE_GBSA || ""}
            srcEn={process.env.NEXT_PUBLIC_HPANEL_VIDEO_PROFILE_GBSA || ""}
            captionId={t("gbsaVideoCaption")}
            captionEn={t("gbsaVideoCaption")}
          />
        </ScrollReveal>

        {/* Description + Misi/Visi — 2 kolom */}
        <ScrollReveal>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start mb-14">
            {/* Kiri: deskripsi */}
            <div>
              <p className="text-text-light text-base leading-[1.9] mb-4 text-justify">
                {t("gbsaDesc1")}
              </p>
              <p className="text-text-light text-base leading-[1.9] text-justify">
                {t("gbsaDesc2")}
              </p>
            </div>

            {/* Kanan: Misi & Visi */}
            <div className="flex flex-col gap-4">
              <div className="bg-white rounded-2xl px-7 py-6 border-2 border-gray-200">
                <p className="text-[0.65rem] font-bold uppercase tracking-[0.15em] text-black/40 mb-2">
                  {t("gbsaMission")}
                </p>
                <p className="text-base font-bold text-black leading-snug">
                  Making Gyeonggi Province abound with growth opportunities
                </p>
              </div>
              <div className="bg-white rounded-2xl px-7 py-6 border-2 border-gray-200">
                <p className="text-[0.65rem] font-bold uppercase tracking-[0.15em] text-black/40 mb-2">
                  {t("gbsaVision")}
                </p>
                <p className="text-base font-bold text-black leading-snug">
                  GBSA — Partner for SMEs Innovation
                </p>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
