"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useTranslation } from "../lib/LanguageContext";
import { GbcCompanyWithPhotos } from "../lib/supabase";
import ScrollReveal from "./ScrollReveal";

export default function CompanyVideosSection() {
  const { t } = useTranslation();
  const [companies, setCompanies] = useState<GbcCompanyWithPhotos[]>([]);
  const [current, setCurrent] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/companies")
      .then((r) => r.json())
      .then((data) => {
        if (Array.isArray(data)) {
          const withVideo = data.filter((c) => !!c.link_video);
          setCompanies(withVideo);
        }
      })
      .finally(() => setLoading(false));
  }, []);

  if (!loading && companies.length === 0) return null;

  const prev = () => setCurrent((c) => (c === 0 ? companies.length - 1 : c - 1));
  const next = () => setCurrent((c) => (c === companies.length - 1 ? 0 : c + 1));

  const company = companies[current];

  return (
    <section className="py-24 bg-white relative" id="company-videos">

      {/* Wave divider top */}
      <div className="absolute top-0 left-0 right-0 pointer-events-none">
        <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
          <path d="M0,20 C480,60 960,10 1440,40 L1440,0 L0,0 Z" fill="#f9fafb"/>
        </svg>
      </div>

      {/* Blurred accent — top right */}
      <div className="absolute -top-28 -right-28 w-[450px] h-[450px] rounded-full bg-accent/8 blur-2xl pointer-events-none" />
      {/* Blurred primary — bottom left */}
      <div className="absolute -bottom-28 -left-28 w-[400px] h-[400px] rounded-full bg-primary/6 blur-2xl pointer-events-none" />
      {/* Circle outline — top left */}
      <div className="absolute -top-16 -left-16 w-[320px] h-[320px] rounded-full border-[45px] border-accent/10 pointer-events-none" />
      {/* Circle outline — bottom right */}
      <div className="absolute -bottom-16 -right-16 w-[280px] h-[280px] rounded-full border-[40px] border-primary/8 pointer-events-none" />

      {/* Floating symbols */}
      <div className="absolute top-12 left-[7%] text-accent/12 text-7xl font-bold pointer-events-none select-none leading-none">+</div>
      <div className="absolute bottom-12 right-[7%] text-primary/8 text-6xl font-bold pointer-events-none select-none leading-none">×</div>

      {/* Decorative lines */}
      <div className="absolute left-[3%] top-1/2 -translate-y-1/2 flex flex-col gap-3 pointer-events-none">
        {[80, 50, 110, 40, 90, 60].map((w, i) => (
          <div key={i} className="h-[3px] bg-accent/20 rounded-full" style={{ width: `${w}px` }} />
        ))}
      </div>

      <div className="max-w-[1400px] mx-auto px-[5%] relative z-[2]">

        {/* Header */}
        <ScrollReveal className="text-center max-w-[650px] mx-auto mb-14">
          <div className="inline-flex items-center gap-3 text-accent font-semibold text-[0.9rem] tracking-[0.1em] uppercase mb-4 before:content-[''] before:w-10 before:h-0.5 before:bg-accent before:block">
            {t("companyVideosLabel")}
          </div>
          <h2 className="font-display text-3xl md:text-[2.8rem] font-extrabold text-primary mb-4 leading-[1.2]">
            {t("companyVideosTitle")}
          </h2>
          <p className="text-text-light text-lg">{t("companyVideosDesc")}</p>
        </ScrollReveal>

        {/* Slider */}
        {loading ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center animate-pulse">
            <div className="rounded-2xl bg-gray-200 aspect-video w-full" />
            <div className="space-y-4">
              <div className="h-5 bg-gray-200 rounded w-1/3" />
              <div className="h-8 bg-gray-200 rounded w-3/4" />
              <div className="h-4 bg-gray-100 rounded w-full" />
              <div className="h-4 bg-gray-100 rounded w-4/5" />
            </div>
          </div>
        ) : company ? (
          <>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">

              {/* Photo / Thumbnail */}
              <Link href={`/companies/${company.id}`} className="block group">
                <div className="rounded-2xl overflow-hidden shadow-xl border border-gray-100 relative aspect-video bg-gray-100">
                  {company.gbc_companies_photos?.[0]?.photo_url ? (
                    /* eslint-disable-next-line @next/next/no-img-element */
                    <img
                      src={company.gbc_companies_photos[0].photo_url}
                      alt={company.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary/10 to-accent/10">
                      <i className="fas fa-play-circle text-6xl text-primary/30" />
                    </div>
                  )}

                  {/* Play overlay */}
                  <div className="absolute inset-0 bg-primary/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center shadow-xl">
                      <i className="fas fa-play text-primary text-xl ml-1" />
                    </div>
                  </div>

                  {/* Video badge */}
                  <div className="absolute top-4 left-4 bg-accent text-white text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1.5">
                    <i className="fas fa-video text-[10px]" /> Video
                  </div>
                </div>
              </Link>

              {/* Company Info */}
              <div>
                {company.category && (
                  <span className="inline-block bg-accent/10 text-primary-light px-4 py-1.5 rounded-full text-[0.78rem] font-semibold mb-4">
                    {company.category}
                  </span>
                )}
                <h3 className="font-display text-2xl md:text-3xl font-extrabold text-primary mb-4 leading-[1.3]">
                  {company.name}
                </h3>
            

                <Link
                  href={`/companies/${company.id}`}
                  className="inline-flex items-center gap-3 px-7 py-3.5 bg-gradient-to-br from-primary to-primary-light text-white rounded-full font-semibold text-sm shadow-[0_4px_20px_rgba(15,40,71,0.3)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_8px_30px_rgba(15,40,71,0.4)]"
                >
                  <i className="fas fa-play" /> {t("viewDetails")}
                </Link>

                {/* Counter */}
                <p className="text-sm text-text-light mt-6">
                  <span className="font-bold text-primary">{current + 1}</span> / {companies.length}
                </p>
              </div>
            </div>

            {/* Navigation */}
            {companies.length > 1 && (
              <div className="flex items-center justify-center gap-6 mt-10">
                <button
                  onClick={prev}
                  className="w-12 h-12 bg-white rounded-full shadow-md border border-gray-100 flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-all duration-300"
                  aria-label="Previous"
                >
                  <i className="fas fa-chevron-left text-sm" />
                </button>

                <div className="flex gap-2">
                  {companies.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setCurrent(i)}
                      className={`h-2.5 rounded-full transition-all duration-300 ${
                        i === current ? "bg-accent w-8" : "bg-gray-300 w-2.5"
                      }`}
                      aria-label={`Company ${i + 1}`}
                    />
                  ))}
                </div>

                <button
                  onClick={next}
                  className="w-12 h-12 bg-white rounded-full shadow-md border border-gray-100 flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-all duration-300"
                  aria-label="Next"
                >
                  <i className="fas fa-chevron-right text-sm" />
                </button>
              </div>
            )}
          </>
        ) : null}
      </div>
    </section>
  );
}
