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

        {/* Map + Info */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">

          {/* Map Embed */}
          <div className="lg:col-span-2 rounded-3xl overflow-hidden shadow-2xl border border-gray-100 min-h-[450px]">
            <iframe
              src="https://maps.google.com/maps?q=DBS+Tower+Jl+Prof+Dr+Satrio+Kav+3+Kuningan+Jakarta+Selatan&output=embed&z=16"
              className="w-full h-full min-h-[450px]"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="GBC Jakarta Location"
            />
          </div>

          {/* Info Cards */}
          <div className="flex flex-col gap-5">

            {/* Address */}
            <div className="bg-white rounded-2xl p-7 shadow-md border border-gray-100 flex gap-5 items-start">
              <div className="w-[52px] h-[52px] bg-gradient-to-br from-accent/10 to-accent/5 rounded-xl flex items-center justify-center text-accent text-xl shrink-0">
                <i className="fas fa-map-marker-alt" />
              </div>
              <div>
                <h4 className="text-[0.85rem] font-semibold text-text/50 uppercase tracking-[0.05em] mb-1">{t("mapAddress")}</h4>
                <p className="text-[0.95rem] text-text leading-[1.7]">
                  DBS Tower Suite #905<br />
                  Jl. Prof. Dr. Satrio Kav.3<br />
                  Kuningan, South Jakarta 12940
                </p>
              </div>
            </div>



            {/* Open in Maps button */}
            <a
              href="https://maps.app.goo.gl/2pfY976JZ8GiKhjX6"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gradient-to-br from-primary to-primary-light text-white rounded-2xl p-7 shadow-md flex gap-5 items-center group hover:-translate-y-1 transition-transform duration-300"
            >
              <div className="w-[52px] h-[52px] bg-white/15 rounded-xl flex items-center justify-center text-white text-xl shrink-0">
                <i className="fas fa-directions" />
              </div>
              <div>
                <h4 className="font-bold text-base mb-0.5 text-white">{t("mapOpenInMaps")}</h4>
                <p className="text-white/70 text-sm">{t("mapGetDirections")}</p>
              </div>
              <i className="fas fa-arrow-right ml-auto text-white/60 group-hover:translate-x-1 transition-transform" />
            </a>

          </div>
        </div>

      </div>
    </section>
  );
}
