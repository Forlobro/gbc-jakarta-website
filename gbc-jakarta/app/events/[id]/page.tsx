"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { useTranslation } from "../../lib/LanguageContext";
import { TranslationKey } from "../../lib/translations";

// ── Event Data ──────────────────────────────────────────────
const EVENTS: Record<string, {
  id: number;
  tag: string;
  titleKey: TranslationKey;
  dateKey: TranslationKey;
  locationKey: TranslationKey;
  image: string;
  descKey: TranslationKey;
  detailsKey: TranslationKey;
  video_url?: string;
}> = {
  "1": {
    id: 1,
    tag: "Roadshow",
    titleKey: "eventsP1Title",
    dateKey: "eventsP1Date",
    locationKey: "eventsP1Location",
    image: "/images/Suwon.jpg",
    descKey: "eventsP1Desc",
    detailsKey: "eventsP1Details",
    video_url: "https://www.youtube.com/embed/J4aWZjyJ3A4",
  },
  "2": {
    id: 2,
    tag: "B2B Matching",
    titleKey: "eventsP2Title",
    dateKey: "eventsP2Date",
    locationKey: "eventsP2Location",
    image: "/images/ceremonial.png",
    descKey: "eventsP2Desc",
    detailsKey: "eventsP2Details",
  },
  "3": {
    id: 3,
    tag: "Trade Mission",
    titleKey: "eventsP3Title",
    dateKey: "eventsP3Date",
    locationKey: "eventsP3Location",
    image: "/images/gedung.jpg",
    descKey: "eventsP3Desc",
    detailsKey: "eventsP3Details",
  },
  "4": {
    id: 4,
    tag: "Ceremony",
    titleKey: "eventsP4Title",
    dateKey: "eventsP4Date",
    locationKey: "eventsP4Location",
    image: "/images/ceremonial.png",
    descKey: "eventsP4Desc",
    detailsKey: "eventsP4Details",
  },
  "5": {
    id: 5,
    tag: "Exhibition",
    titleKey: "eventsP5Title",
    dateKey: "eventsP5Date",
    locationKey: "eventsP5Location",
    image: "/images/Suwon.jpg",
    descKey: "eventsP5Desc",
    detailsKey: "eventsP5Details",
  },
  "6": {
    id: 6,
    tag: "Forum",
    titleKey: "eventsP6Title",
    dateKey: "eventsP6Date",
    locationKey: "eventsP6Location",
    image: "/images/gedung.jpg",
    descKey: "eventsP6Desc",
    detailsKey: "eventsP6Details",
  },
};

// ── Exhibitor Data (only event 1 for now) ───────────────────
const EXHIBITORS = [
  {
    id: 1,
    name: "ROBOTECH ENG CO., LTD.",
    category: "Industrial",
    description: "Leading Korean manufacturer of high-quality fans, blowers, and motors with 20+ years of export experience.",
    logo: "ROBOTECH",
  },
  {
    id: 2,
    name: "SENKO CO., LTD.",
    category: "Safety & Environment",
    description: "Gas detectors designed for safety in hazardous environments with real-time monitoring capabilities.",
    logo: "SENKO",
  },
  {
    id: 3,
    name: "SEONGHAN CORP.",
    category: "Industrial",
    description: "Eco-friendly waterproofing solution with excellent adhesion, flexibility, and crack-bridging capability.",
    logo: "SEONGHAN",
  },
  {
    id: 4,
    name: "MIRICO CO., LTD.",
    category: "Safety & Environment",
    description: "Certified gas safety technology including detectors, alarms, and automatic extinguishing systems.",
    logo: "MIRICO",
  },
  {
    id: 5,
    name: "SMARTECH KOREA",
    category: "ICT & Smart",
    description: "Innovative smart city solutions integrating IoT, AI, and big data for urban infrastructure management.",
    logo: "SMARTECH",
  },
  {
    id: 6,
    name: "INNOVA SYSTEMS",
    category: "ICT & Smart",
    description: "End-to-end IoT infrastructure provider specializing in smart building and energy management systems.",
    logo: "INNOVA",
  },
  {
    id: 7,
    name: "ANGEL TRAY CO.",
    category: "Industrial",
    description: "Innovation in eco-friendly dining solutions with recyclable and biodegradable collagen trays.",
    logo: "ANGEL TRAY",
  },
  {
    id: 8,
    name: "SILLIMANN CO., LTD.",
    category: "ICT & Smart",
    description: "Premium silicone products from kitchenware to kidsware with award-winning design.",
    logo: "SILLIMANN",
  },
];

const EXHIBITOR_CATEGORIES = ["All", "Industrial", "Safety & Environment", "ICT & Smart"];

const GALLERY_PHOTOS = [
  "/images/ceremonial.png",
  "/images/Suwon.jpg",
  "/images/gedung.jpg",
  "/images/ceremonial.png",
  "/images/Suwon.jpg",
  "/images/gedung.jpg",
];

function EventGallery({ title }: { title: string }) {
  const [current, setCurrent] = useState(0);

  const prev = () => setCurrent((c) => (c === 0 ? GALLERY_PHOTOS.length - 1 : c - 1));
  const next = () => setCurrent((c) => (c === GALLERY_PHOTOS.length - 1 ? 0 : c + 1));

  return (
    <section className="py-16 bg-white relative">
      {/* Blurred accent — top left */}
      <div className="absolute -top-24 -left-24 w-[380px] h-[380px] rounded-full bg-accent/8 blur-2xl pointer-events-none" />
      {/* Circle outline — bottom right */}
      <div className="absolute -bottom-16 -right-16 w-[300px] h-[300px] rounded-full border-[40px] border-primary/8 pointer-events-none" />
      {/* Blurred primary — bottom right */}
      <div className="absolute -bottom-20 -right-20 w-[350px] h-[350px] rounded-full bg-primary/6 blur-2xl pointer-events-none" />
      {/* Floating symbols */}
      <div className="absolute top-10 right-[6%] text-accent/12 text-7xl font-bold pointer-events-none select-none leading-none">+</div>
      <div className="absolute bottom-10 left-[5%] text-primary/8 text-6xl font-bold pointer-events-none select-none leading-none">◦</div>
      {/* Decorative lines — right */}
      <div className="absolute right-[3%] top-1/3 flex flex-col gap-3 pointer-events-none">
        {[60, 40, 90, 50, 75, 35].map((w, i) => (
          <div key={i} className="h-[3px] bg-primary/15 rounded-full" style={{ width: `${w}px` }} />
        ))}
      </div>
      <div className="max-w-[1400px] mx-auto px-[5%] relative z-[2]">
        <h2 className="font-display text-3xl font-extrabold text-primary mb-10 text-center">
          {title}
        </h2>

        <div className="relative max-w-4xl mx-auto">
          <div className="rounded-2xl overflow-hidden" style={{ aspectRatio: "16/9" }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              key={current}
              src={GALLERY_PHOTOS[current]}
              alt={`Gallery ${current + 1}`}
              className="w-full h-full object-cover"
            />
          </div>

          <button
            onClick={prev}
            className="absolute -left-5 top-1/2 -translate-y-1/2 w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-all duration-300"
          >
            <i className="fas fa-chevron-left text-sm" />
          </button>

          <button
            onClick={next}
            className="absolute -right-5 top-1/2 -translate-y-1/2 w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-all duration-300"
          >
            <i className="fas fa-chevron-right text-sm" />
          </button>

          <div className="flex justify-center gap-2 mt-5">
            {GALLERY_PHOTOS.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  i === current ? "bg-accent w-6" : "bg-gray-300 w-2"
                }`}
              />
            ))}
          </div>

          <p className="text-center text-text-muted text-sm mt-3">
            {current + 1} / {GALLERY_PHOTOS.length}
          </p>
        </div>
      </div>
    </section>
  );
}

const TAG_COLORS: Record<string, string> = {
  Roadshow: "bg-blue-100 text-blue-700",
  "B2B Matching": "bg-cyan-100 text-cyan-700",
  "Trade Mission": "bg-green-100 text-green-700",
  Ceremony: "bg-purple-100 text-purple-700",
  Exhibition: "bg-orange-100 text-orange-700",
  Forum: "bg-red-100 text-red-700",
};

export default function EventDetailPage() {
  const params = useParams();
  const id = params.id as string;
  const { t } = useTranslation();
  const eventMeta = EVENTS[id];
  const [activeFilter, setActiveFilter] = useState("All");

  const filteredExhibitors =
    activeFilter === "All"
      ? EXHIBITORS
      : EXHIBITORS.filter((e) => e.category === activeFilter);

  if (!eventMeta) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <p className="text-text-light text-lg mb-4">Event not found.</p>
            <Link href="/events" className="text-accent font-semibold hover:underline">
              ← {t("backToEvents")}
            </Link>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  const title = t(eventMeta.titleKey);
  const date = t(eventMeta.dateKey);
  const location = t(eventMeta.locationKey);
  const details = t(eventMeta.detailsKey);

  return (
    <>
      <Navbar />

      {/* ── Hero Banner ── */}
      <section
        className="pt-36 pb-20 relative overflow-hidden"
        style={{
          backgroundImage: `linear-gradient(rgba(15,40,71,0.85), rgba(15,40,71,0.85)), url('${eventMeta.image}')`,
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

          <span
            className={`inline-block text-[0.75rem] font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-4 ${
              TAG_COLORS[eventMeta.tag] ?? "bg-gray-100 text-gray-600"
            }`}
          >
            {eventMeta.tag}
          </span>

          <h1 className="font-display text-4xl md:text-5xl font-extrabold text-white leading-[1.15] mb-6 max-w-[750px]">
            {title}
          </h1>

          <div className="flex flex-wrap gap-6 text-white/70 text-[0.9rem]">
            <span className="flex items-center gap-2">
              <i className="fas fa-calendar-alt text-accent" />
              {date}
            </span>
            <span className="flex items-center gap-2">
              <i className="fas fa-map-marker-alt text-accent" />
              {location}
            </span>
          </div>
        </div>
      </section>

      {/* ── Event Detail ── */}
      <section className="py-16 bg-white relative">
        {/* Blurred accent — top right */}
        <div className="absolute -top-24 -right-24 w-[400px] h-[400px] rounded-full bg-accent/8 blur-2xl pointer-events-none" />
        {/* Circle outline — top right */}
        <div className="absolute -top-12 -right-12 w-[280px] h-[280px] rounded-full border-[40px] border-accent/10 pointer-events-none" />
        {/* Blurred primary — bottom left */}
        <div className="absolute -bottom-24 -left-24 w-[400px] h-[400px] rounded-full bg-primary/6 blur-2xl pointer-events-none" />
        {/* Floating symbols */}
        <div className="absolute top-10 left-[6%] text-accent/12 text-7xl font-bold pointer-events-none select-none leading-none">+</div>
        <div className="absolute bottom-10 right-[6%] text-primary/8 text-6xl font-bold pointer-events-none select-none leading-none">×</div>
        {/* Decorative lines — left */}
        <div className="absolute left-[3%] top-1/2 -translate-y-1/2 flex flex-col gap-3 pointer-events-none">
          {[70, 45, 100, 50, 80, 40].map((w, i) => (
            <div key={i} className="h-[3px] bg-accent/20 rounded-full" style={{ width: `${w}px` }} />
          ))}
        </div>
        <div className="max-w-[1400px] mx-auto px-[5%] relative z-[2]">
          <div className="max-w-[800px]">
            <h2 className="font-display text-2xl font-extrabold text-primary mb-4">
              {t("aboutThisEvent")}
            </h2>
            <p className="text-text-light text-[1rem] leading-[1.9]">
              {details}
            </p>
          </div>
        </div>
      </section>

      {/* ── Event Video ── */}
      {eventMeta.video_url && (
        <section className="py-16 bg-[#f8fafc] relative">
          {/* Dot pattern */}
          <div className="absolute inset-y-0 left-0 w-32 pointer-events-none" style={{
            backgroundImage: "radial-gradient(circle, rgba(0,194,203,0.18) 1.5px, transparent 1.5px)",
            backgroundSize: "20px 20px",
          }} />
          <div className="absolute -top-20 -left-20 w-[300px] h-[300px] rounded-full bg-primary/6 blur-2xl pointer-events-none" />
          <div className="absolute -bottom-20 -right-20 w-[300px] h-[300px] rounded-full bg-accent/8 blur-2xl pointer-events-none" />
          <div className="absolute top-8 right-[7%] text-primary/8 text-7xl font-bold pointer-events-none select-none leading-none">◦</div>
          <div className="max-w-[1400px] mx-auto px-[5%] relative z-[2]">
            <h2 className="font-display text-3xl font-extrabold text-primary mb-10 text-center">
              {t("eventVideo")}
            </h2>
            <div className="max-w-4xl mx-auto rounded-2xl overflow-hidden shadow-xl">
              <div className="relative w-full" style={{ paddingTop: "56.25%" }}>
                <iframe
                  src={eventMeta.video_url}
                  className="absolute inset-0 w-full h-full"
                  title={title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ── Event Gallery (only event 1) ── */}
      {id === "1" && <EventGallery title={t("eventGallery")} />}

      {/* ── Exhibitor List (only event 1) ── */}
      {id === "1" && (
        <section className="py-16 bg-[#f8fafc] relative">
          {/* Blurred primary — top right */}
          <div className="absolute -top-24 -right-24 w-[400px] h-[400px] rounded-full bg-primary/8 blur-2xl pointer-events-none" />
          {/* Circle outline — top right */}
          <div className="absolute -top-14 -right-14 w-[300px] h-[300px] rounded-full border-[40px] border-primary/8 pointer-events-none" />
          {/* Blurred accent — bottom left */}
          <div className="absolute -bottom-24 -left-24 w-[400px] h-[400px] rounded-full bg-accent/8 blur-2xl pointer-events-none" />
          {/* Circle outline — bottom left */}
          <div className="absolute -bottom-14 -left-14 w-[280px] h-[280px] rounded-full border-[38px] border-accent/10 pointer-events-none" />
          {/* Dot pattern — left strip */}
          <div className="absolute inset-y-0 left-0 w-28 pointer-events-none" style={{
            backgroundImage: "radial-gradient(circle, rgba(0,194,203,0.18) 1.5px, transparent 1.5px)",
            backgroundSize: "20px 20px",
          }} />
          {/* Floating symbols */}
          <div className="absolute top-12 left-[7%] text-accent/12 text-7xl font-bold pointer-events-none select-none leading-none">+</div>
          <div className="absolute bottom-12 right-[6%] text-primary/8 text-6xl font-bold pointer-events-none select-none leading-none">×</div>
          {/* Decorative lines — right */}
          <div className="absolute right-[3%] top-1/2 -translate-y-1/2 flex flex-col gap-3 pointer-events-none">
            {[65, 40, 95, 55, 80, 38].map((w, i) => (
              <div key={i} className="h-[3px] bg-primary/15 rounded-full" style={{ width: `${w}px` }} />
            ))}
          </div>
          <div className="max-w-[1400px] mx-auto px-[5%] relative z-[2]">
            <h2 className="font-display text-3xl font-extrabold text-primary mb-10 text-center">
              {t("exhibitorList")}
            </h2>

            <div className="flex justify-center gap-2 flex-wrap mb-12">
              {EXHIBITOR_CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveFilter(cat)}
                  className={`px-5 py-2 rounded-full text-[0.85rem] font-semibold border-2 transition-all duration-300 cursor-pointer ${
                    activeFilter === cat
                      ? "bg-primary border-primary text-white"
                      : "bg-white border-gray-200 text-text-light hover:border-primary hover:text-primary"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {filteredExhibitors.map((exhibitor) => (
                <div
                  key={exhibitor.id}
                  className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:-translate-y-1 hover:shadow-md transition-all duration-300 flex flex-col items-center text-center"
                >
                  <div className="w-20 h-20 bg-[#f0f4f8] rounded-2xl flex items-center justify-center mb-4 font-display font-bold text-[0.7rem] text-primary p-2">
                    {exhibitor.logo}
                  </div>

                  <h4 className="font-bold text-text text-[0.9rem] mb-2 leading-[1.3]">
                    {exhibitor.name}
                  </h4>

                  <span className="inline-block bg-accent/10 text-primary text-[0.72rem] font-semibold px-3 py-1 rounded-full mb-3">
                    {exhibitor.category}
                  </span>

                  <p className="text-text-light text-[0.8rem] leading-[1.6] line-clamp-3 mb-4">
                    {exhibitor.description}
                  </p>

                  <div className="flex gap-2 mt-auto">
                    <button className="px-4 py-1.5 bg-primary text-white text-[0.75rem] font-semibold rounded-full hover:bg-primary-light transition-colors">
                      {t("brochure")}
                    </button>
                    <button className="px-4 py-1.5 border-2 border-primary text-primary text-[0.75rem] font-semibold rounded-full hover:bg-primary hover:text-white transition-colors">
                      Website
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      <Footer />
    </>
  );
}
