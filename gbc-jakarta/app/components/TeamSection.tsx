"use client";

import ScrollReveal from "./ScrollReveal";
import { useTranslation } from "../lib/LanguageContext";

const directors = [
  {
    name: "Shin Ho Jin",
    role: "Director General",
    roleId: "Direktur Utama",
  },
];

function PersonSilhouette() {
  return (
    <svg viewBox="0 0 160 260" fill="currentColor" className="w-full h-full">
      {/* Head */}
      <circle cx="80" cy="58" r="38" />
      {/* Shoulders / body */}
      <path d="M10,260 L10,175 C10,130 38,108 80,102 C122,108 150,130 150,175 L150,260 Z" />
    </svg>
  );
}

export default function TeamSection() {
  const { t } = useTranslation();

  return (
    <section className="py-36 bg-white relative" id="team">

      {/* Wave divider top */}
      <div className="absolute top-0 left-0 right-0 pointer-events-none">
        <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
          <path d="M0,0 C480,60 960,0 1440,40 L1440,0 L0,0 Z" fill="#f8fafc"/>
        </svg>
      </div>

      {/* Dot pattern */}
      <div className="absolute inset-0 pointer-events-none" style={{
        backgroundImage: "radial-gradient(circle, rgba(15,40,71,0.06) 1.5px, transparent 1.5px)",
        backgroundSize: "24px 24px",
      }} />

      {/* Large blurred accent — bottom left */}
      <div className="absolute -bottom-40 -left-40 w-[650px] h-[650px] rounded-full bg-accent/10 blur-2xl pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-[420px] h-[420px] rounded-full border-[55px] border-accent/10 pointer-events-none" />

      {/* Large blurred primary — top right */}
      <div className="absolute -top-32 -right-32 w-[550px] h-[550px] rounded-full bg-primary/8 blur-2xl pointer-events-none" />
      <div className="absolute -top-20 -right-20 w-[380px] h-[380px] rounded-full border-[50px] border-primary/8 pointer-events-none" />

      {/* Floating symbols */}
      <div className="absolute top-20 left-[6%] text-accent/15 text-8xl font-bold pointer-events-none select-none leading-none">×</div>
      <div className="absolute bottom-16 right-[8%] text-primary/10 text-7xl font-bold pointer-events-none select-none leading-none">+</div>

      {/* Decorative lines — left */}
      <div className="absolute left-[3%] top-1/2 -translate-y-1/2 flex flex-col gap-3 pointer-events-none">
        {[90, 55, 120, 45, 100, 60, 80].map((w, i) => (
          <div key={i} className="h-[3px] bg-accent/25 rounded-full" style={{ width: `${w}px` }} />
        ))}
      </div>

      {/* Decorative lines — right */}
      <div className="absolute right-[3%] top-1/2 -translate-y-1/2 flex flex-col gap-3 pointer-events-none">
        {[70, 100, 50, 90, 40, 80].map((w, i) => (
          <div key={i} className="h-[3px] bg-primary/12 rounded-full ml-auto" style={{ width: `${w}px` }} />
        ))}
      </div>

      <div className="max-w-[1400px] mx-auto px-[5%] relative z-[2]">

        {/* Header */}
        <ScrollReveal className="text-center max-w-[600px] mx-auto mb-20">
          <div className="inline-flex items-center gap-3 text-accent font-semibold text-[0.9rem] tracking-[0.1em] uppercase mb-4 before:content-[''] before:w-10 before:h-0.5 before:bg-accent before:block">
            {t("directorLabel")}
          </div>
          <h2 className="font-display text-3xl md:text-[3rem] font-extrabold text-primary mb-6 leading-[1.2]">
            Shin Ho Jin
          </h2>
        </ScrollReveal>

        {/* Director Cards — slide style */}
        <div className="space-y-10 mb-20 max-w-[900px] mx-auto">
          {directors.map((director) => (
            <ScrollReveal key={director.name}>
              <div className="grid grid-cols-1 lg:grid-cols-2 rounded-3xl overflow-hidden shadow-xl border border-gray-100">

                {/* Left: Title */}
                <div className="bg-white flex flex-col justify-center px-14 py-16">
                  <h3 className="font-display text-4xl md:text-5xl font-extrabold text-text leading-tight mb-5">
                    {t("messageTitle")}
                  </h3>
                  <div className="w-36 h-[5px] bg-[#00c2cb] rounded-full mb-6" />
                  <p className="text-text-light text-base leading-[1.9]">
                    {t("messageText")}
                  </p>
                </div>

                {/* Right: Person + diagonal background */}
                <div className="relative bg-gradient-to-br from-blue-50 via-slate-50 to-sky-100 flex flex-col items-center justify-end pt-10 pb-8 overflow-hidden min-h-[320px]">
                  {/* Diagonal streaks */}
                  <div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                      background:
                        "repeating-linear-gradient(135deg, rgba(100,160,230,0.07) 0px, rgba(100,160,230,0.07) 2px, transparent 2px, transparent 44px)",
                    }}
                  />

                  {/* Silhouette */}
                  <div className="relative z-[1] w-44 h-56 text-slate-800">
                    <PersonSilhouette />
                  </div>

                  {/* Name tag */}
                  <div className="relative z-[1] flex items-center gap-3 mt-5 bg-white/70 backdrop-blur-sm px-6 py-2.5 rounded-full shadow-sm">
                    <span className="text-text-light text-sm">{director.roleId}</span>
                    <span className="text-gray-300 font-light">|</span>
                    <span className="font-bold text-text text-sm">{director.name}</span>
                  </div>
                </div>

              </div>
            </ScrollReveal>
          ))}
        </div>


      </div>
    </section>
  );
}
