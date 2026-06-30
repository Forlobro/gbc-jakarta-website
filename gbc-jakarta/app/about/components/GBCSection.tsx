"use client"

import Image from "next/image"
import { useTranslation } from "../../lib/LanguageContext"
import ScrollReveal from "../../components/ScrollReveal"
import { VideoEmbed } from "./VideoEmbed"
import { VideoProvider } from "./VideoContext"

export default function GBCSection() {
  const { t, language } = useTranslation()

  return (
    <section className="py-16 md:py-20 lg:py-24 relative overflow-hidden" id="global-network">
      <div className="max-w-[1200px] mx-auto px-[5%] relative z-[2]">
        <ScrollReveal className="text-center max-w-[600px] mx-auto mb-12">
          <h2 className="font-display text-3xl md:text-4xl font-extrabold text-primary leading-tight mb-3 justify-center">
            GBC — Gyeonggi Business Center
          </h2>
          <p className="text-text-light text-lg text-center">{t("globalNetworkDesc")}</p>
        </ScrollReveal>

        <ScrollReveal>
          <VideoProvider>
            <VideoEmbed
              srcId={process.env.NEXT_PUBLIC_HPANEL_VIDEO_PROFILE_GBC_ID || ""}
              srcEn={process.env.NEXT_PUBLIC_HPANEL_VIDEO_PROFILE_GBC_EN || ""}
              captionId={t("globalNetworkVideoCaption")}
              captionEn={t("globalNetworkVideoCaption")}
            />
          </VideoProvider>
        </ScrollReveal>

        <ScrollReveal>
          <div className="bg-white rounded-3xl shadow-lg border border-gray-100 p-8 md:p-10">
            <Image
              src={language === "en" ? "/images/GBC around the world (2).png" : "/images/GBC around the world.png"}
              alt="GBC Network Map"
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
