"use client";

import { useTranslation } from "../lib/LanguageContext";

export default function MapSection() {
  const { t } = useTranslation();

  return (
    <section className="py-36 bg-[#f8fafc] relative" id="location">

      {/* Wave divider top — matches Team white bg */}
      <div className="absolute top-0 left-0 right-0 pointer-events-none">
        <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
          <path d="M0,20 C360,60 1080,0 1440,35 L1440,0 L0,0 Z" fill="white"/>
        </svg>
      </div>

      {/* Dot pattern */}
      <div className="absolute inset-0 pointer-events-none" style={{
        backgroundImage: "radial-gradient(circle, rgba(0,194,203,0.12) 1.5px, transparent 1.5px)",
        backgroundSize: "26px 26px",
      }} />

      {/* Blurred accent — top left */}
      <div className="absolute -top-32 -left-32 w-[500px] h-[500px] rounded-full bg-accent/8 blur-2xl pointer-events-none" />

      {/* Blurred primary — bottom right */}
      <div className="absolute -bottom-32 -right-32 w-[500px] h-[500px] rounded-full bg-primary/8 blur-2xl pointer-events-none" />

      {/* Circle outline — top left */}
      <div className="absolute -top-20 -left-20 w-[360px] h-[360px] rounded-full border-[50px] border-accent/10 pointer-events-none" />

      {/* Circle outline — bottom right */}
      <div className="absolute -bottom-20 -right-20 w-[360px] h-[360px] rounded-full border-[50px] border-primary/8 pointer-events-none" />

      {/* Floating symbols */}
      <div className="absolute top-16 right-[8%] text-accent/15 text-8xl font-bold pointer-events-none select-none leading-none">+</div>
      <div className="absolute bottom-16 left-[6%] text-primary/10 text-7xl font-bold pointer-events-none select-none leading-none">×</div>

      <div className="max-w-[1400px] mx-auto px-[5%] relative z-[2]">

        {/* Header */}
        <div className="text-center max-w-[600px] mx-auto mb-14">
          <div className="inline-flex items-center gap-3 text-accent font-semibold text-[0.9rem] tracking-[0.1em] uppercase mb-4 before:content-[''] before:w-10 before:h-0.5 before:bg-accent before:block">
            {t("mapLabel")}
          </div>
          <h2 className="font-display text-3xl md:text-[3rem] font-extrabold text-primary mb-4 leading-[1.2]">
            {t("mapTitle")}
          </h2>
          <p className="text-text-light text-lg">
            DBS Tower Suite #905, Jl. Prof. Dr. Satrio Kav.3, Kuningan, South Jakarta 12940
          </p>
        </div>

        {/* Map — full width, clickable */}
        <a
          href="https://maps.app.goo.gl/2pfY976JZ8GiKhjX6"
          target="_blank"
          rel="noopener noreferrer"
          className="block relative rounded-3xl overflow-hidden shadow-2xl border border-gray-100 group"
        >
          <iframe
            src="https://maps.google.com/maps?q=GBC+Gyeonggi+Business+Center+Jakarta&ftid=0x2e69f300357af55f:0xfa5a6df37d1ec5bf&output=embed&z=17"
            className="w-full h-[500px] pointer-events-none"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="GBC Jakarta Location"
          />
          {/* Hover overlay */}
          <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/10 transition-all duration-300 flex items-center justify-center">
            <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white/90 backdrop-blur-sm px-6 py-3 rounded-full shadow-lg flex items-center gap-3 text-primary font-semibold text-sm">
              <i className="fas fa-external-link-alt" /> {t("mapOpenInMaps")}
            </div>
          </div>
        </a>

      </div>
    </section>
  );
}
