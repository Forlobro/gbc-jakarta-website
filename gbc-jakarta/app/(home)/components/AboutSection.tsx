"use client"

import React from "react"
import Image from "next/image"
import { useTranslation } from "@/app/lib/LanguageContext"
import ScrollReveal from "@/app/components/ScrollReveal"
import SectionBadge from "@/app/components/SectionBadge"

export default function AboutSection() {
  const { t } = useTranslation()

  const features = [
    {
      icon: "fas fa-search-dollar",
      title: t("marketResearch"),
      desc: t("IndepthIndonesianmarketanalysis"),
    },
    {
      icon: "fas fa-users",
      title: t("businessMatching"),
      desc: t("connectWithLocalDistributors"),
    },
    {
      icon: "fas fa-bullhorn",
      title: t("tradePromotion"),
      desc: t("tradeShowsExhibitions"),
    },
  ]

  return (
    <section className="min-h-screen py-36 relative" id="about">
      {/* Wave divider top — matches Video gray-50 bg */}
      <div className="absolute top-0 left-0 right-0 pointer-events-none">
        <svg
          viewBox="0 0 1440 60"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full"
        >
          <path d="M0,30 C480,60 960,0 1440,40 L1440,0 L0,0 Z" fill="#f9fafb" />
        </svg>
      </div>

      <div className="max-w-[1400px] mx-auto px-[5%] relative z-[2]">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
          {/* Content */}
          <ScrollReveal>
            <SectionBadge>{t("aboutLabel")}</SectionBadge>

            <h2 className="font-display text-3xl md:text-[3rem] font-extrabold text-primary mb-6 leading-[1.2]">
              {t("aboutTitle")}
            </h2>

            <p className="text-text-light text-lg leading-[1.9] mb-8 text-justify">
              {t("aboutDescription")}
            </p>
            <p className="text-text-light text-lg leading-[1.9] mb-8 text-justify">
              {t("aboutDescription2")}
            </p>
          </ScrollReveal>

          {/* Image */}
          <ScrollReveal className="relative">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl">
              <Image
                src="/images/gbc-hero.jpeg"
                alt="GBC Jakarta Opening Ceremony"
                width={800}
                height={600}
                className="w-full h-auto block object-cover aspect-[4/3]"
              />
            </div>
            {/* Decoration */}
            <div className="absolute w-[200px] h-[200px] border-[3px] border-accent rounded-3xl -top-[30px] -right-[30px] -z-[1]" />
          </ScrollReveal>
        </div>

        {/* Features Grid — full width below */}
        <ScrollReveal>
          <div className="flex flex-col sm:flex-row justify-between gap-6 mt-16 pt-10">
            {features.map((feature, idx) => (
              <React.Fragment key={feature.title}>
                {idx > 0 && <div className="hidden sm:block w-px self-stretch bg-gray-200" />}
                <div className="flex items-start gap-4 flex-1 p-4 rounded-2xl transition-all duration-300 hover:bg-accent/5 hover:-translate-y-0.5 cursor-default">
                  <div className="w-[50px] h-[50px] bg-gradient-to-br from-accent/10 to-accent/5 rounded-xl flex items-center justify-center text-accent text-xl shrink-0 transition-all duration-300 group-[]:hover:scale-110">
                    <i className={feature.icon} />
                  </div>
                  <div>
                    <h4 className="text-base font-bold text-text mb-1">{feature.title}</h4>
                    <p className="text-[0.9rem] text-text-light m-0 text-justify">{feature.desc}</p>
                  </div>
                </div>
              </React.Fragment>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
