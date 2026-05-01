"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useTranslation } from "../lib/LanguageContext";

const HIGHLIGHT_BY_LANG: Record<string, string> = {
  en: "Gyeonggi Excellence",
  id: "Keunggulan Gyeonggi",
};

const BG_IMAGES = [
  "/images/gbc-hero.jpeg",
  "/images/ceremonial.png",
  "/images/Suwon.jpg",
  "/images/gedung.jpg",
];

export default function HeroSection() {
  const { t, language } = useTranslation();
  const [current, setCurrent] = useState(0);

  const highlight = HIGHLIGHT_BY_LANG[language] ?? HIGHLIGHT_BY_LANG.en;
  const titleParts = t("heroTitle").split(highlight);

  // Auto-slide every 5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((c) => (c === BG_IMAGES.length - 1 ? 0 : c + 1));
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const prev = () => setCurrent((c) => (c === 0 ? BG_IMAGES.length - 1 : c - 1));
  const next = () => setCurrent((c) => (c === BG_IMAGES.length - 1 ? 0 : c + 1));

  return (
    <section
      className="min-h-screen relative flex items-center overflow-hidden"
      id="home"
    >
      {/* Background Images (fade transition) */}
      {BG_IMAGES.map((src, i) => (
        <div
          key={src}
          className="absolute inset-0 transition-opacity duration-1000"
          style={{
            opacity: i === current ? 1 : 0,
            backgroundImage: `linear-gradient(rgba(15, 40, 71, 0.8), rgba(30, 65, 117, 0.8)), url('${src}')`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        />
      ))}

      {/* Background Pattern */}
      <div
        className="absolute inset-0 animate-bg-float z-[1]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 20% 50%, rgba(0, 194, 203, 0.1) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(255, 255, 255, 0.05) 0%, transparent 40%), radial-gradient(circle at 40% 80%, rgba(0, 194, 203, 0.08) 0%, transparent 40%)",
        }}
      />

      {/* Grid Overlay */}
      <div
        className="absolute inset-0 z-[1]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      <div className="max-w-[1400px] mx-auto px-[5%] relative z-[2] w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center py-[120px]">
          {/* Hero Text */}
          <div className="text-white text-center lg:text-left">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-accent/15 border border-accent/30 px-5 py-2 rounded-full text-[0.85rem] font-medium mb-8 text-accent animate-fade-in-up opacity-0">
              <i className="fas fa-certificate text-[0.75rem]" />
              <span>{t("heroBadge")}</span>
            </div>

            {/* Title */}
            <h1
              className="font-display text-4xl md:text-5xl lg:text-[4rem] font-extrabold leading-[1.1] mb-6 opacity-0"
              style={{ animation: "fadeInUp 0.8s ease 0.1s forwards" }}
            >
              {titleParts[0]}
              <span className="bg-gradient-to-br from-accent to-[#00a8b0] bg-clip-text text-transparent">
                {highlight}
              </span>
              {titleParts[1] ?? ""}
            </h1>

            {/* Description */}
            <p
              className="text-xl opacity-0 mb-10 max-w-[500px] leading-[1.8] mx-auto lg:mx-0"
              style={{ animation: "fadeInUp 0.8s ease 0.2s forwards" }}
            >
              {t("heroDesc")}
            </p>

            {/* Button — only Learn More */}
            <div
              className="flex gap-4 opacity-0 justify-center lg:justify-start"
              style={{ animation: "fadeInUp 0.8s ease 0.3s forwards" }}
            >
              <Link
                href="/#about"
                className="px-8 py-4 rounded-full font-semibold text-base inline-flex items-center gap-3 transition-all duration-400 bg-transparent text-white border-2 border-white/30 hover:bg-white/10 hover:border-white/50"
              >
                <span>{t("learn")}</span>
                <i className="fas fa-arrow-right" />
              </Link>
            </div>
          </div>

          {/* Hero Visual */}
          <div
            className="relative opacity-0"
            style={{ animation: "fadeInUp 0.8s ease 0.4s forwards" }}
          >
            {/* Stats Card */}
            <div className="bg-white/10 backdrop-blur-[20px] border border-white/20 rounded-3xl p-10 relative overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-accent to-[#00a8b0]" />
              <div className="grid grid-cols-2 gap-8">
                {[
                  { number: "40+", label: t("partnerCompanies") },
                  { number: "5", label: t("industrySectors") },
                  { number: "100+", label: t("businessMatches") },
                  { number: "2023", label: t("established") },
                ].map((stat) => (
                  <div
                    key={stat.label}
                    className="text-center p-6 bg-white/5 rounded-2xl transition-all duration-300 hover:bg-white/10 hover:-translate-y-[5px]"
                  >
                    <span className="font-display text-5xl font-extrabold text-accent block leading-none mb-2">
                      {stat.number}
                    </span>
                    <span className="text-white/70 text-[0.9rem] font-medium">
                      {stat.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>


          </div>
        </div>
      </div>

      {/* Slider Controls */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-[3] flex items-center gap-6">
        {/* Prev */}
        <button
          onClick={prev}
          className="w-12 h-12 bg-white/20 hover:bg-white/40 rounded-full flex items-center justify-center text-white transition-all duration-300"
        >
          <i className="fas fa-chevron-left text-base" />
        </button>

        {/* Dots */}
        <div className="flex gap-3">
          {BG_IMAGES.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`h-3 rounded-full transition-all duration-300 ${
                i === current ? "bg-accent w-10" : "bg-white/50 w-3"
              }`}
            />
          ))}
        </div>

        {/* Next */}
        <button
          onClick={next}
          className="w-12 h-12 bg-white/20 hover:bg-white/40 rounded-full flex items-center justify-center text-white transition-all duration-300"
        >
          <i className="fas fa-chevron-right text-base" />
        </button>
      </div>
    </section>
  );
}
