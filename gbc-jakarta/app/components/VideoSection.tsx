"use client";

import { useState } from "react";
import { useTranslation } from "../lib/LanguageContext";

const VIDEOS = [
  { id: "J4aWZjyJ3A4", title: "GBC Jakarta Video 1" },
  { id: "VtZSCi0TgqI", title: "GBC Jakarta Video 2" },
];

export default function VideoSection() {
  const [current, setCurrent] = useState(0);
  const { t } = useTranslation();

  const prev = () => setCurrent((c) => (c === 0 ? VIDEOS.length - 1 : c - 1));
  const next = () => setCurrent((c) => (c === VIDEOS.length - 1 ? 0 : c + 1));

  return (
    <section className="py-20 bg-gray-50 relative" id="video">

      {/* Wave divider top — matches Hero dark bg */}
      <div className="absolute top-0 left-0 right-0 pointer-events-none">
        <svg viewBox="0 0 1440 70" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
          <path d="M0,40 C360,70 1080,0 1440,30 L1440,0 L0,0 Z" fill="#0f2847"/>
        </svg>
      </div>

      {/* Dot pattern */}
      <div className="absolute inset-0 pointer-events-none" style={{
        backgroundImage: "radial-gradient(circle, rgba(0,194,203,0.18) 1.5px, transparent 1.5px)",
        backgroundSize: "28px 28px",
      }} />

      {/* Large blurred circle — top left */}
      <div className="absolute -top-28 -left-28 w-[500px] h-[500px] rounded-full bg-accent/15 blur-2xl pointer-events-none" />

      {/* Large blurred circle — bottom right */}
      <div className="absolute -bottom-28 -right-28 w-[450px] h-[450px] rounded-full bg-primary/10 blur-2xl pointer-events-none" />

      {/* Bold circle outline — top right */}
      <div className="absolute -top-20 right-[10%] w-[320px] h-[320px] rounded-full border-[50px] border-accent/10 pointer-events-none" />

      {/* Bold circle outline — bottom left */}
      <div className="absolute -bottom-20 left-[5%] w-[250px] h-[250px] rounded-full border-[40px] border-primary/8 pointer-events-none" />

      {/* Floating symbols */}
      <div className="absolute top-10 right-[20%] text-accent/25 text-7xl font-bold pointer-events-none select-none leading-none">+</div>
      <div className="absolute bottom-10 left-[18%] text-primary/15 text-6xl font-bold pointer-events-none select-none leading-none">×</div>

      {/* Decorative lines — right side */}
      <div className="absolute right-[4%] top-1/2 -translate-y-1/2 flex flex-col gap-3 pointer-events-none">
        {[90, 60, 110, 50, 80, 40].map((w, i) => (
          <div key={i} className="h-[3px] bg-accent/20 rounded-full" style={{ width: `${w}px` }} />
        ))}
      </div>

      <div className="max-w-[1400px] mx-auto px-[5%] relative z-[2]">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-block text-[0.8rem] font-semibold tracking-[0.1em] uppercase text-accent bg-accent/10 px-4 py-2 rounded-full mb-4">
            {t("videoLabel")}
          </div>
          <h2 className="font-display text-3xl md:text-4xl font-extrabold text-text leading-tight">
            {t("videoTitle")}
          </h2>
        </div>

        {/* Slider */}
        <div className="max-w-4xl mx-auto relative">
          {/* Video */}
          <div className="rounded-2xl overflow-hidden shadow-xl">
            <div className="relative w-full" style={{ paddingTop: "56.25%" }}>
              <iframe
                key={VIDEOS[current].id}
                className="absolute inset-0 w-full h-full"
                src={`https://www.youtube.com/embed/${VIDEOS[current].id}`}
                title={VIDEOS[current].title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>

          {/* Prev Button */}
          <button
            onClick={prev}
            className="absolute -left-5 top-1/2 -translate-y-1/2 w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-all duration-300"
            aria-label="Previous"
          >
            <i className="fas fa-chevron-left text-sm" />
          </button>

          {/* Next Button */}
          <button
            onClick={next}
            className="absolute -right-5 top-1/2 -translate-y-1/2 w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-all duration-300"
            aria-label="Next"
          >
            <i className="fas fa-chevron-right text-sm" />
          </button>

          {/* Dots */}
          <div className="flex justify-center gap-2 mt-6">
            {VIDEOS.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                  i === current ? "bg-accent w-6" : "bg-gray-300"
                }`}
                aria-label={`Video ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
