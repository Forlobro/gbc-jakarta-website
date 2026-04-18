"use client";

import Image from "next/image";
import { useTranslation } from "../lib/LanguageContext";
import ScrollReveal from "./ScrollReveal";

export default function AboutSection() {
  const { t } = useTranslation();

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
      icon: "fas fa-file-signature",
      title: t("legalSupport"),
      desc: t("businessRegistrationGuidance"),
    },
    {
      icon: "fas fa-bullhorn",
      title: t("tradePromotion"),
      desc: t("tradeShowsExhibitions"),
    },
  ];

  return (
    <section className="py-36 bg-white relative" id="about">

      {/* Wave divider top — matches Video gray-50 bg */}
      <div className="absolute top-0 left-0 right-0 pointer-events-none">
        <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
          <path d="M0,30 C480,60 960,0 1440,40 L1440,0 L0,0 Z" fill="#f9fafb"/>
        </svg>
      </div>

      {/* Dot pattern */}
      <div className="absolute inset-0 pointer-events-none" style={{
        backgroundImage: "radial-gradient(circle, rgba(0,194,203,0.18) 1.5px, transparent 1.5px)",
        backgroundSize: "26px 26px",
      }} />

      {/* Large circle outline — top left */}
      <div className="absolute -top-40 -left-40 w-[650px] h-[650px] rounded-full border-[60px] border-accent/10 pointer-events-none" />

      {/* Second circle outline inside — top left */}
      <div className="absolute -top-16 -left-16 w-[350px] h-[350px] rounded-full border-[30px] border-primary/8 pointer-events-none" />

      {/* Large blurred cyan blob — bottom right */}
      <div className="absolute -bottom-32 -right-32 w-[550px] h-[550px] rounded-full bg-accent/10 blur-2xl pointer-events-none" />

      {/* Bold circle outline — bottom right */}
      <div className="absolute -bottom-20 -right-20 w-[380px] h-[380px] rounded-full border-[50px] border-accent/8 pointer-events-none" />

      {/* Blurred primary blob — top right */}
      <div className="absolute -top-16 right-[15%] w-[300px] h-[300px] rounded-full bg-primary/8 blur-3xl pointer-events-none" />

      {/* Floating symbols */}
      <div className="absolute top-16 right-[8%] text-accent/15 text-8xl font-bold pointer-events-none select-none leading-none">+</div>
      <div className="absolute bottom-24 left-[5%] text-primary/8 text-7xl font-bold pointer-events-none select-none leading-none">×</div>
      <div className="absolute top-1/2 left-[2%] text-accent/12 text-5xl font-bold pointer-events-none select-none leading-none">◦</div>

      {/* Decorative lines — left side */}
      <div className="absolute left-[3%] top-1/3 flex flex-col gap-3 pointer-events-none">
        {[70, 110, 50, 90, 60, 100].map((w, i) => (
          <div key={i} className="h-[3px] bg-accent/20 rounded-full" style={{ width: `${w}px` }} />
        ))}
      </div>

      <div className="max-w-[1400px] mx-auto px-[5%] relative z-[2]">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
          {/* Content */}
          <ScrollReveal>
            <div className="inline-flex items-center gap-3 text-accent font-semibold text-[0.9rem] tracking-[0.1em] uppercase mb-4 before:content-[''] before:w-10 before:h-0.5 before:bg-accent before:block">
              {t("aboutLabel")}
            </div>

            <h2 className="font-display text-3xl md:text-[3rem] font-extrabold text-primary mb-6 leading-[1.2]">
              {t("aboutTitle")}
            </h2>

            <p className="text-text-light text-lg leading-[1.9] mb-8">
              {t("aboutDescription")}
            </p>
            <p className="text-text-light text-lg leading-[1.9] mb-8">
              {t("aboutDescription2")}
            </p>

            {/* Features Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-10">
              {features.map((feature) => (
                <div
                  key={feature.title}
                  className="flex items-start gap-4"
                >
                  <div className="w-[50px] h-[50px] bg-gradient-to-br from-accent/10 to-accent/5 rounded-xl flex items-center justify-center text-accent text-xl shrink-0">
                    <i className={feature.icon} />
                  </div>
                  <div>
                    <h4 className="text-base font-bold text-text mb-1">
                      {feature.title}
                    </h4>
                    <p className="text-[0.9rem] text-text-light m-0">
                      {feature.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </ScrollReveal>

          {/* Image */}
          <ScrollReveal className="relative">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl">
              <Image
                src="/images/ceremonial.png"
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
      </div>
    </section>
  );
}
