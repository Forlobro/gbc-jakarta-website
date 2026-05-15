"use client"

import Link from "next/link"
import Navbar from "../../components/Navbar"
import Footer from "../../components/Footer"
import ScrollReveal from "../../components/ScrollReveal"
import { useTranslation } from "../../lib/LanguageContext"

export default function UpcomingEventPage() {
  const { t } = useTranslation()

  const EXPECT_POINTS = [
    { icon: "far fa-handshake", text: t("upcomingEventPoint1") },
    { icon: "far fa-building", text: t("upcomingEventPoint2") },
    { icon: "far fa-comments", text: t("upcomingEventPoint3") },
    { icon: "far fa-lightbulb", text: t("upcomingEventPoint4") },
  ]

  return (
    <>
      <Navbar />

      {/* ── Hero Banner ── */}
      <section
        className="pt-36 pb-20 relative overflow-hidden"
        style={{
          backgroundImage:
            "linear-gradient(rgba(15,40,71,0.88), rgba(15,40,71,0.88)), url('/images/gbc-hero.jpeg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="max-w-[1400px] mx-auto px-[5%]">
          <Link
            href="/events"
            className="inline-flex items-center gap-2 text-white/60 hover:text-white text-sm mb-8 transition-colors"
          >
            <i className="fas fa-arrow-left" /> {t("backToEvents")}
          </Link>

          <div className="inline-flex items-center gap-2 bg-accent/20 border border-accent/30 px-4 py-2 rounded-full text-accent text-[0.85rem] font-semibold mb-6">
            <span className="w-2 h-2 rounded-full bg-accent animate-pulse inline-block" />
            {t("upcomingEventBadge")}
          </div>

          <h1 className="font-display text-4xl md:text-5xl font-extrabold text-white leading-[1.15] mb-5 max-w-[750px]">
            {t("upcomingEventTitle")}
          </h1>

          <div className="flex flex-wrap gap-6 text-white/70 text-[0.9rem]">
            <span className="flex items-center gap-2">
              <i className="far fa-calendar-alt text-accent" />
              {t("upcomingEventDate")}
            </span>
            <span className="flex items-center gap-2">
              <i className="fas fa-map-marker-alt text-accent" />
              {t("upcomingEventLocation")}
            </span>
          </div>
        </div>
      </section>

      {/* ── About This Event ── */}
      <section className="py-20 bg-white relative">
        <div className="absolute -top-24 -right-24 w-[400px] h-[400px] rounded-full bg-accent/8 blur-2xl pointer-events-none" />
        <div className="absolute -top-12 -right-12 w-[280px] h-[280px] rounded-full border-[40px] border-accent/10 pointer-events-none" />
        <div className="absolute top-10 left-[6%] text-accent/12 text-7xl font-bold pointer-events-none select-none leading-none">
          +
        </div>
        <div className="absolute left-[3%] top-1/2 -translate-y-1/2 flex flex-col gap-3 pointer-events-none">
          {[70, 45, 100, 50, 80, 40].map((w, i) => (
            <div
              key={i}
              className="h-[3px] bg-accent/20 rounded-full"
              style={{ width: `${w}px` }}
            />
          ))}
        </div>

        <div className="max-w-[1400px] mx-auto px-[5%] relative z-[2]">
          <ScrollReveal>
            <div className="max-w-[800px]">
              <div className="inline-flex items-center gap-3 text-accent font-semibold text-[0.9rem] tracking-[0.1em] uppercase mb-4 before:content-[''] before:w-10 before:h-0.5 before:bg-accent before:block">
                {t("upcomingEventAboutTitle")}
              </div>
              <h2 className="font-display text-3xl md:text-4xl font-extrabold text-primary mb-6 leading-[1.2]">
                {t("upcomingEventTitle")}
              </h2>
              <p className="text-text-light text-[1.05rem] leading-[1.9] text-justify">
                {t("upcomingEventAboutDesc")}
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ── What to Expect ── */}
      <section className="py-20 bg-[#f8fafc] relative">
        <div className="absolute -bottom-28 -left-28 w-[400px] h-[400px] rounded-full bg-primary/6 blur-2xl pointer-events-none" />
        <div className="absolute -bottom-16 -right-16 w-[300px] h-[300px] rounded-full border-[40px] border-accent/10 pointer-events-none" />
        <div className="absolute bottom-10 right-[6%] text-primary/8 text-6xl font-bold pointer-events-none select-none leading-none">
          ×
        </div>
        <div className="absolute right-[3%] top-1/3 flex flex-col gap-3 pointer-events-none">
          {[65, 40, 95, 55, 80, 38].map((w, i) => (
            <div
              key={i}
              className="h-[3px] bg-primary/15 rounded-full"
              style={{ width: `${w}px` }}
            />
          ))}
        </div>

        <div className="max-w-[1400px] mx-auto px-[5%] relative z-[2]">
          <ScrollReveal className="text-center max-w-[600px] mx-auto mb-14">
            <div className="inline-flex items-center gap-3 text-accent font-semibold text-[0.9rem] tracking-[0.1em] uppercase mb-3 before:content-[''] before:w-10 before:h-0.5 before:bg-accent before:block after:content-[''] after:w-10 after:h-0.5 after:bg-accent after:block">
              {t("upcomingEventExpectTitle")}
            </div>
            <h2 className="font-display text-3xl md:text-4xl font-extrabold text-primary leading-[1.2]">
              {t("upcomingEventExpectTitle")}
            </h2>
          </ScrollReveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-[900px] mx-auto">
            {EXPECT_POINTS.map((point, i) => (
              <ScrollReveal key={i}>
                <div className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm flex items-start gap-5 hover:-translate-y-1 hover:shadow-md transition-all duration-300">
                  <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center text-accent text-xl shrink-0">
                    <i className={point.icon} />
                  </div>
                  <p className="text-text font-semibold text-[1rem] leading-[1.6] mt-1">
                    {point.text}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Event Details ── */}
      <section className="py-20 bg-white relative">
        <div className="absolute -top-24 -right-24 w-[400px] h-[400px] rounded-full bg-accent/8 blur-2xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-[350px] h-[350px] rounded-full bg-primary/6 blur-2xl pointer-events-none" />
        <div className="absolute top-10 right-[6%] text-accent/12 text-7xl font-bold pointer-events-none select-none leading-none">
          +
        </div>
        <div className="absolute right-[3%] top-1/2 -translate-y-1/2 flex flex-col gap-3 pointer-events-none">
          {[65, 40, 95, 55, 80, 38].map((w, i) => (
            <div
              key={i}
              className="h-[3px] bg-accent/20 rounded-full"
              style={{ width: `${w}px` }}
            />
          ))}
        </div>

        <div className="max-w-[1400px] mx-auto px-[5%] relative z-[2]">
          <ScrollReveal className="text-center max-w-[600px] mx-auto mb-14">
            <div className="inline-flex items-center gap-3 text-accent font-semibold text-[0.9rem] tracking-[0.1em] uppercase mb-3 before:content-[''] before:w-10 before:h-0.5 before:bg-accent before:block after:content-[''] after:w-10 after:h-0.5 after:bg-accent after:block">
              {t("upcomingEventDetailsLabel")}
            </div>
            <h2 className="font-display text-3xl md:text-4xl font-extrabold text-primary leading-[1.2]">
              {t("upcomingEventDetailsTitle")}
            </h2>
          </ScrollReveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-[1000px] mx-auto items-stretch">
            {[
              {
                bg: "bg-primary",
                iconBg: "bg-white/10",
                iconColor: "text-accent",
                labelColor: "text-white/60",
                textColor: "text-white",
                icon: "far fa-calendar-alt",
                label: t("upcomingEventDetailsDateLabel"),
                value: t("upcomingEventDetailsDate"),
              },
              {
                bg: "bg-accent",
                iconBg: "bg-primary/20",
                iconColor: "text-primary",
                labelColor: "text-primary/60",
                textColor: "text-primary",
                icon: "far fa-clock",
                label: t("upcomingEventDetailsTimeLabel"),
                value: t("upcomingEventDetailsTime"),
              },
              {
                bg: "bg-primary",
                iconBg: "bg-white/10",
                iconColor: "text-accent",
                labelColor: "text-white/60",
                textColor: "text-white",
                icon: "fas fa-map-marker-alt",
                label: t("upcomingEventDetailsLocationLabel"),
                value: t("upcomingEventDetailsLocation"),
              },
              {
                bg: "bg-primary",
                iconBg: "bg-white/10",
                iconColor: "text-accent",
                labelColor: "text-white/60",
                textColor: "text-white",
                icon: "far fa-building",
                label: t("upcomingEventDetailsVenueLabel"),
                value: t("upcomingEventDetailsVenue"),
              },
            ].map((card, i) => (
              <ScrollReveal key={i} className="h-full">
                <div
                  className={`${card.bg} rounded-3xl p-8 text-center flex flex-col items-center justify-center gap-4 shadow-lg h-full min-h-[200px]`}
                >
                  <div
                    className={`w-14 h-14 ${card.iconBg} rounded-2xl flex items-center justify-center ${card.iconColor} text-2xl shrink-0`}
                  >
                    <i className={card.icon} />
                  </div>
                  <div>
                    <p
                      className={`${card.labelColor} text-[0.75rem] font-semibold uppercase tracking-widest mb-2`}
                    >
                      {card.label}
                    </p>
                    <p
                      className={`${card.textColor} font-display font-extrabold text-xl leading-tight`}
                    >
                      {card.value}
                    </p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>

          <p className="text-center text-text-muted text-[0.82rem] mt-10 italic max-w-[600px] mx-auto">
            {t("upcomingEventDetailsNote")}
          </p>
        </div>
      </section>

      {/* ── Register CTA ── */}
      <section className="py-24 bg-gradient-to-br from-primary via-primary-light to-[#2d5a9e] relative overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage:
              "radial-gradient(circle at 80% 20%, rgba(0,194,203,0.15) 0%, transparent 50%), radial-gradient(circle at 20% 80%, rgba(255,255,255,0.05) 0%, transparent 40%)",
          }}
        />
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage:
              "radial-gradient(circle, rgba(255,255,255,0.08) 1.5px, transparent 1.5px)",
            backgroundSize: "28px 28px",
          }}
        />

        <div className="max-w-[1400px] mx-auto px-[5%] relative z-[1]">
          <ScrollReveal className="text-center max-w-[650px] mx-auto">
            <div className="w-16 h-16 bg-accent/20 rounded-2xl flex items-center justify-center text-accent text-2xl mx-auto mb-6">
              <i className="far fa-calendar-check" />
            </div>
            <h2 className="font-display text-3xl md:text-4xl font-extrabold text-white mb-4 leading-[1.2]">
              {t("upcomingEventRegisterTitle")}
            </h2>
            <p className="text-white/70 text-lg mb-10 text-justify">
              {t("upcomingEventRegisterDesc")}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="mailto:chat.gbcjkt@gmail.com"
                className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-accent text-primary rounded-full font-semibold text-[1rem] shadow-[0_4px_20px_rgba(0,194,203,0.4)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_8px_30px_rgba(0,194,203,0.5)]"
              >
                <i className="far fa-envelope" />
                {t("upcomingEventRegisterCta")}
              </a>
              <Link
                href="/events"
                className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-white/10 text-white border-2 border-white/20 rounded-full font-semibold text-[1rem] transition-all duration-300 hover:bg-white/20 hover:-translate-y-0.5"
              >
                <i className="fas fa-arrow-left text-sm" />
                {t("backToEvents")}
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <Footer />
    </>
  )
}
