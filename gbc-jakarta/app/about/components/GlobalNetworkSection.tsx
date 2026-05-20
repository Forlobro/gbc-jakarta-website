"use client"

import Image from "next/image"
import { useTranslation } from "../../lib/LanguageContext"
import ScrollReveal from "../../components/ScrollReveal"
import { VideoEmbed } from "./shared"

export default function GlobalNetworkSection() {
  const { t } = useTranslation()

  return (
    <section className="min-h-screen py-24 relative overflow-hidden" id="global-network">
      <div className="max-w-[1200px] mx-auto px-[5%] relative z-[2]">
        <ScrollReveal className="text-center max-w-[600px] mx-auto mb-12">
          <h2 className="font-display text-3xl md:text-4xl font-extrabold text-primary leading-tight mb-3">
            GBC — Gyeonggi Business Center
          </h2>
          <p className="text-text-light text-lg text-justify">{t("globalNetworkDesc")}</p>
        </ScrollReveal>

        <ScrollReveal>
          <VideoEmbed
            srcId={process.env.NEXT_PUBLIC_HPANEL_VIDEO_PROFILE_GBC_ID || ""}
            srcEn={process.env.NEXT_PUBLIC_HPANEL_VIDEO_PROFILE_GBC_EN || ""}
            captionId={t("globalNetworkVideoCaption")}
            captionEn={t("globalNetworkVideoCaption")}
          />
        </ScrollReveal>

        <ScrollReveal>
          <div className="bg-white rounded-3xl shadow-lg border border-gray-100 p-8 md:p-10">
            <Image
              src="/images/gbc.png"
              alt="GBC Network Map — 19 lokasi di 14 negara"
              width={1200}
              height={800}
              className="w-full h-auto rounded-2xl"
            />
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
