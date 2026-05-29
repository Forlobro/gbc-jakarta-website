"use client"

import Image from "next/image"
import { useTranslation } from "../../lib/LanguageContext"

export default function AboutHero() {
  const { t } = useTranslation()

  return (
    <section
      className="relative pt-24 pb-10 md:pt-28 md:pb-14 lg:pt-32 lg:pb-16 flex items-center"
      id="about-intro"
    >
      <div className="max-w-[1200px] mx-auto px-[5%]">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-10 lg:gap-12 items-center">
          {/* Left: text */}
          <div>
            <h1 className="font-display text-4xl md:text-[2.8rem] font-extrabold text-primary leading-[1.15] mb-5">
              {t("aboutPageTitle")}
            </h1>
            <p className="text-text-light text-base leading-[1.85] mb-4 text-justify">
              {t("aboutPageDesc1")}
            </p>
            <p className="text-text-light text-base leading-[1.85] text-justify">
              {t("aboutPageDesc2")}
            </p>
          </div>

          {/* Right: logos */}
          <div className="flex flex-col items-center gap-10">
            {/* Gyeonggi-do + GBSA side by side */}
            <div className="flex items-center justify-center gap-16 w-full">
              <div className="flex flex-col items-center gap-2">
                <Image
                  src="/images/gyeonggi-logo.jpeg"
                  alt="Gyeonggi-do"
                  width={280}
                  height={140}
                  className="w-auto object-contain mix-blend-multiply"
                  style={{ height: "60px" }}
                />
                <span className="text-[0.68rem] font-semibold text-text-light tracking-wide uppercase">
                  Gyeonggi-do
                </span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <Image
                  src="/images/Desain_tanpa_judul__1_-removebg-preview.png"
                  alt="GBSA"
                  width={280}
                  height={140}
                  className="w-auto object-contain"
                  style={{ height: "50px" }}
                />
                <span className="text-[0.68rem] font-semibold text-text-light tracking-wide uppercase">
                  GBSA
                </span>
              </div>
            </div>

            {/* GBC Jakarta */}
            <div className="flex flex-col items-center gap-2">
              <Image
                src="/images/logo.jpg"
                alt="GBC Jakarta"
                width={140}
                height={70}
                className="h-16 w-auto object-contain mix-blend-multiply"
              />
              <span className="text-[0.68rem] font-semibold text-primary/50 tracking-wide uppercase">
                GBC Jakarta
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
