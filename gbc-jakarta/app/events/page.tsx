"use client";

import Link from "next/link";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ScrollReveal from "../components/ScrollReveal";
import { useTranslation } from "../lib/LanguageContext";

const CATEGORY_COLORS: Record<string, string> = {
  Roadshow: "bg-blue-100 text-blue-700",
  "B2B Matching": "bg-accent/10 text-accent",
  "Trade Mission": "bg-green-100 text-green-700",
  Ceremony: "bg-purple-100 text-purple-700",
  Exhibition: "bg-orange-100 text-orange-700",
  Forum: "bg-red-100 text-red-700",
};

export default function EventsPage() {
  const { t } = useTranslation();

  const FEATURED_EVENTS = [
    {
      id: 1,
      tag: t("eventsF1Tag"),
      title: t("eventsF1Title"),
      date: t("eventsF1Date"),
      location: t("eventsF1Location"),
      description: t("eventsF1Desc"),
      highlights: [t("eventsF1H1"), t("eventsF1H2"), t("eventsF1H3")],
      image: "/images/ceremonial.png",
      dark: true,
    },
    {
      id: 2,
      tag: t("eventsF2Tag"),
      title: t("eventsF2Title"),
      date: t("eventsF2Date"),
      location: t("eventsF2Location"),
      description: t("eventsF2Desc"),
      highlights: [t("eventsF2H1"), t("eventsF2H2"), t("eventsF2H3")],
      image: "/images/gedung.jpg",
      dark: false,
    },
  ];

  const PAST_EVENTS = [
    {
      id: 1,
      title: t("eventsP1Title"),
      date: t("eventsP1Date"),
      location: t("eventsP1Location"),
      category: t("eventsP1Category"),
      image: "/images/Suwon.jpg",
      description: t("eventsP1Desc"),
    },
    {
      id: 2,
      title: t("eventsP2Title"),
      date: t("eventsP2Date"),
      location: t("eventsP2Location"),
      category: t("eventsP2Category"),
      image: "/images/ceremonial.png",
      description: t("eventsP2Desc"),
    },
    {
      id: 3,
      title: t("eventsP3Title"),
      date: t("eventsP3Date"),
      location: t("eventsP3Location"),
      category: t("eventsP3Category"),
      image: "/images/gedung.jpg",
      description: t("eventsP3Desc"),
    },
    {
      id: 4,
      title: t("eventsP4Title"),
      date: t("eventsP4Date"),
      location: t("eventsP4Location"),
      category: t("eventsP4Category"),
      image: "/images/ceremonial.png",
      description: t("eventsP4Desc"),
    },
    {
      id: 5,
      title: t("eventsP5Title"),
      date: t("eventsP5Date"),
      location: t("eventsP5Location"),
      category: t("eventsP5Category"),
      image: "/images/Suwon.jpg",
      description: t("eventsP5Desc"),
    },
    {
      id: 6,
      title: t("eventsP6Title"),
      date: t("eventsP6Date"),
      location: t("eventsP6Location"),
      category: t("eventsP6Category"),
      image: "/images/gedung.jpg",
      description: t("eventsP6Desc"),
    },
  ];

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
        <div className="max-w-[1400px] mx-auto px-[5%] relative z-10">
          <div className="max-w-[700px]">
            <div className="inline-flex items-center gap-2 bg-accent/20 border border-accent/30 px-4 py-2 rounded-full text-accent text-[0.85rem] font-semibold mb-6">
              <i className="fas fa-calendar-alt text-xs" />
              {t("eventsPageBadge")}
            </div>
            <h1 className="font-display text-4xl md:text-5xl font-extrabold text-white leading-[1.15] mb-5">
              {t("eventsPageTitle").split("Korea")[0]}
              <span className="text-accent">Korea</span>
              {t("eventsPageTitle").split("Korea")[1]}
            </h1>
            <p className="text-white/70 text-lg leading-[1.8]">
              {t("eventsPageDesc")}
            </p>
          </div>
        </div>
      </section>

      {/* ── Featured Events ── */}
      <section className="py-24 bg-white relative">
        {/* Blurred accent — top right */}
        <div className="absolute -top-28 -right-28 w-[450px] h-[450px] rounded-full bg-accent/8 blur-2xl pointer-events-none" />
        {/* Circle outline — top right */}
        <div className="absolute -top-16 -right-16 w-[320px] h-[320px] rounded-full border-[45px] border-accent/10 pointer-events-none" />
        {/* Floating symbols */}
        <div className="absolute top-12 left-[7%] text-accent/12 text-7xl font-bold pointer-events-none select-none leading-none">+</div>
        <div className="absolute bottom-12 right-[7%] text-primary/8 text-6xl font-bold pointer-events-none select-none leading-none">×</div>
        {/* Decorative lines — left side */}
        <div className="absolute left-[3%] top-1/2 -translate-y-1/2 flex flex-col gap-3 pointer-events-none">
          {[80, 50, 110, 40, 90, 60].map((w, i) => (
            <div key={i} className="h-[3px] bg-accent/20 rounded-full" style={{ width: `${w}px` }} />
          ))}
        </div>
        <div className="max-w-[1400px] mx-auto px-[5%] relative z-[2]">
          <ScrollReveal className="mb-14">
            <div className="inline-flex items-center gap-3 text-accent font-semibold text-[0.9rem] tracking-[0.1em] uppercase mb-3 before:content-[''] before:w-10 before:h-0.5 before:bg-accent before:block">
              {t("eventsFeaturedLabel")}
            </div>
            <h2 className="font-display text-3xl md:text-4xl font-extrabold text-primary leading-[1.2]">
              {t("eventsFeaturedTitle")}
            </h2>
          </ScrollReveal>

          <div className="flex flex-col gap-10">
            {FEATURED_EVENTS.map((event, idx) => (
              <ScrollReveal key={event.id}>
                <div
                  className={`grid grid-cols-1 lg:grid-cols-2 gap-0 rounded-3xl overflow-hidden shadow-lg ${
                    idx % 2 === 1 ? "lg:[direction:rtl]" : ""
                  }`}
                >
                  {/* Image */}
                  <div
                    className="h-64 lg:h-auto min-h-[280px] bg-cover bg-center"
                    style={{
                      backgroundImage: `url('${event.image}')`,
                      direction: "ltr",
                    }}
                  />

                  {/* Content */}
                  <div
                    className="p-10 flex flex-col justify-center"
                    style={{
                      backgroundColor: event.dark ? "#0f2847" : "#f8fafc",
                      direction: "ltr",
                    }}
                  >
                    <span
                      className={`inline-block text-[0.75rem] font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-4 w-fit ${
                        event.dark
                          ? "bg-accent/20 text-accent"
                          : "bg-primary/10 text-primary"
                      }`}
                    >
                      {event.tag}
                    </span>

                    <h3
                      className={`font-display text-2xl font-extrabold leading-[1.3] mb-3 ${
                        event.dark ? "text-white" : "text-primary"
                      }`}
                    >
                      {event.title}
                    </h3>

                    <div
                      className={`flex flex-col gap-1 text-[0.85rem] mb-5 ${
                        event.dark ? "text-white/60" : "text-text-light"
                      }`}
                    >
                      <span>
                        <i className="fas fa-calendar-alt mr-2" />
                        {event.date}
                      </span>
                      <span>
                        <i className="fas fa-map-marker-alt mr-2" />
                        {event.location}
                      </span>
                    </div>

                    <p
                      className={`text-[0.95rem] leading-[1.8] mb-7 ${
                        event.dark ? "text-white/75" : "text-text-light"
                      }`}
                    >
                      {event.description}
                    </p>

                    <div className="flex flex-wrap gap-3">
                      {event.highlights.map((h) => (
                        <div
                          key={h}
                          className={`flex items-center gap-2 px-4 py-2 rounded-full text-[0.82rem] font-semibold ${
                            event.dark
                              ? "bg-white/10 text-white"
                              : "bg-primary/10 text-primary"
                          }`}
                        >
                          <i className="fas fa-check-circle text-accent text-xs" />
                          {h}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Past Events ── */}
      <section className="py-24 bg-[#f8fafc] relative">
        {/* Blurred primary — top left */}
        <div className="absolute -top-32 -left-32 w-[500px] h-[500px] rounded-full bg-primary/8 blur-2xl pointer-events-none" />
        {/* Circle outline — bottom right */}
        <div className="absolute -bottom-20 -right-20 w-[350px] h-[350px] rounded-full border-[45px] border-primary/8 pointer-events-none" />
        {/* Blurred accent — bottom right */}
        <div className="absolute -bottom-28 -right-28 w-[400px] h-[400px] rounded-full bg-accent/8 blur-2xl pointer-events-none" />
        {/* Dot pattern — right strip */}
        <div className="absolute inset-y-0 right-0 w-32 pointer-events-none" style={{
          backgroundImage: "radial-gradient(circle, rgba(0,194,203,0.15) 1.5px, transparent 1.5px)",
          backgroundSize: "20px 20px",
        }} />
        {/* Floating symbols */}
        <div className="absolute top-16 right-[8%] text-accent/12 text-8xl font-bold pointer-events-none select-none leading-none">+</div>
        <div className="absolute bottom-20 left-[5%] text-primary/8 text-7xl font-bold pointer-events-none select-none leading-none">◦</div>
        {/* Decorative lines — right side */}
        <div className="absolute right-[3%] top-1/3 flex flex-col gap-3 pointer-events-none">
          {[70, 45, 95, 55, 80, 35].map((w, i) => (
            <div key={i} className="h-[3px] bg-primary/15 rounded-full" style={{ width: `${w}px` }} />
          ))}
        </div>
        <div className="max-w-[1400px] mx-auto px-[5%] relative z-[2]">
          <ScrollReveal className="text-center max-w-[600px] mx-auto mb-14">
            <div className="inline-flex items-center gap-3 text-accent font-semibold text-[0.9rem] tracking-[0.1em] uppercase mb-3 before:content-[''] before:w-10 before:h-0.5 before:bg-accent before:block after:content-[''] after:w-10 after:h-0.5 after:bg-accent after:block">
              {t("eventsPastLabel")}
            </div>
            <h2 className="font-display text-3xl md:text-4xl font-extrabold text-primary leading-[1.2]">
              {t("eventsPastTitle")}
            </h2>
          </ScrollReveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {PAST_EVENTS.map((event) => (
              <ScrollReveal key={event.id}>
                <Link href={`/events/${event.id}`} className="block group">
                  <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:-translate-y-2 hover:shadow-lg transition-all duration-300">
                    <div className="relative h-48 overflow-hidden">
                      <div
                        className="w-full h-full bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                        style={{ backgroundImage: `url('${event.image}')` }}
                      />
                      <div className="absolute inset-0 bg-primary/30" />
                      <span
                        className={`absolute top-4 left-4 text-[0.72rem] font-bold px-3 py-1 rounded-full ${
                          CATEGORY_COLORS[event.category] ??
                          "bg-gray-100 text-gray-600"
                        }`}
                      >
                        {event.category}
                      </span>
                    </div>

                    <div className="p-6">
                      <div className="flex items-center gap-2 text-text-muted text-[0.8rem] mb-3">
                        <i className="fas fa-calendar-alt" />
                        <span>{event.date}</span>
                        <span className="mx-1">·</span>
                        <i className="fas fa-map-marker-alt" />
                        <span className="truncate">{event.location}</span>
                      </div>
                      <h4 className="font-bold text-text text-[1rem] leading-[1.4] mb-3">
                        {event.title}
                      </h4>
                      <p className="text-text-light text-[0.85rem] leading-[1.7] line-clamp-2">
                        {event.description}
                      </p>
                      <span className="inline-flex items-center gap-2 text-accent text-[0.85rem] font-semibold mt-4">
                        {t("viewDetail")} <i className="fas fa-arrow-right text-xs" />
                      </span>
                    </div>
                  </div>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
