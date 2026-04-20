"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

// ── Event Data ──────────────────────────────────────────────
const EVENTS: Record<string, {
  id: number;
  tag: string;
  title: string;
  date: string;
  location: string;
  image: string;
  description: string;
  details: string;
  video_url?: string;
}> = {
  "1": {
    id: 1,
    tag: "Roadshow",
    title: "Korea–Indonesia SmartCity Roadshow 2024",
    date: "16 May 2024",
    location: "Sheraton Grand Jakarta, Randsome City Hotel",
    image: "/images/Suwon.jpg",
    description: "Connecting Korean and Indonesian companies through SmartCity & ICT innovation excellence.",
    details:
      "Korea–Indonesia SmartCity & ICT Roadshow will be an exclusive platform for networking, providing an opportunity for Indonesian companies to directly connect with leading Korean companies in the SmartCity and ICT sector. As a valued participant, you will have the chance to engage in one-on-one business meetings with key representatives from Korean companies.",
    video_url: "https://www.youtube.com/embed/J4aWZjyJ3A4",
  },
  "2": {
    id: 2,
    tag: "B2B Matching",
    title: "B2B Business Matching Session — Q1 2024",
    date: "8 March 2024",
    location: "DBS Tower, Jakarta",
    image: "/images/ceremonial.png",
    description: "Direct business matching between 15 Gyeonggi SMEs and Indonesian distributors across 5 industry sectors.",
    details:
      "An intensive B2B matching session designed to facilitate direct connections between Gyeonggi Province SMEs and potential Indonesian business partners. The session covered 5 key industry sectors and resulted in numerous partnership agreements.",
  },
  "3": {
    id: 3,
    tag: "Trade Mission",
    title: "Gyeonggi Trade Mission to Jakarta",
    date: "20 February 2024",
    location: "Jakarta, Indonesia",
    image: "/images/gedung.jpg",
    description: "Official trade mission delegation from Gyeonggi Province exploring partnership opportunities in Indonesia.",
    details:
      "An official delegation from Gyeonggi Province visited Jakarta to explore and strengthen bilateral trade and investment opportunities. The mission included site visits, government meetings, and business networking sessions.",
  },
  "4": {
    id: 4,
    tag: "Ceremony",
    title: "GBC Jakarta Opening Ceremony",
    date: "14 November 2023",
    location: "DBS Tower Suite #905, Jakarta",
    image: "/images/ceremonial.png",
    description: "Grand opening of GBC Jakarta marking the official establishment of Gyeonggi Business Center in Indonesia.",
    details:
      "The official grand opening of GBC Jakarta was attended by representatives from Gyeonggi Provincial Government, Korean Embassy in Indonesia, and key Indonesian business stakeholders. This milestone marks the beginning of GBC Jakarta's mission to bridge Korean and Indonesian businesses.",
  },
  "5": {
    id: 5,
    tag: "Exhibition",
    title: "K-Beauty & Lifestyle Exhibition",
    date: "5 October 2023",
    location: "Grand Indonesia, Jakarta",
    image: "/images/Suwon.jpg",
    description: "Showcasing premium Korean beauty and lifestyle products to Indonesian consumers and retail partners.",
    details:
      "A curated exhibition featuring premium Korean beauty and lifestyle brands from Gyeonggi Province. The event attracted thousands of Indonesian consumers and retail buyers, with live demonstrations, product sampling, and exclusive launch events.",
  },
  "6": {
    id: 6,
    tag: "Forum",
    title: "Korea–Indonesia Industry Forum",
    date: "18 August 2023",
    location: "Pullman Jakarta, Indonesia",
    image: "/images/gedung.jpg",
    description: "High-level forum discussing bilateral trade opportunities between Korea's Gyeonggi Province and Indonesia.",
    details:
      "A high-level industry forum bringing together government officials, business leaders, and trade associations from both Korea and Indonesia. Key topics included regulatory frameworks, investment opportunities, and sector-specific collaboration strategies.",
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

function EventGallery() {
  const [current, setCurrent] = useState(0);

  const prev = () => setCurrent((c) => (c === 0 ? GALLERY_PHOTOS.length - 1 : c - 1));
  const next = () => setCurrent((c) => (c === GALLERY_PHOTOS.length - 1 ? 0 : c + 1));

  return (
    <section className="py-16 bg-white">
      <div className="max-w-[1400px] mx-auto px-[5%]">
        <h2 className="font-display text-3xl font-extrabold text-primary mb-10 text-center">
          Event Gallery
        </h2>

        <div className="relative max-w-4xl mx-auto">
          {/* Main Photo */}
          <div className="rounded-2xl overflow-hidden" style={{ aspectRatio: "16/9" }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              key={current}
              src={GALLERY_PHOTOS[current]}
              alt={`Gallery ${current + 1}`}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Prev Button */}
          <button
            onClick={prev}
            className="absolute -left-5 top-1/2 -translate-y-1/2 w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-all duration-300"
          >
            <i className="fas fa-chevron-left text-sm" />
          </button>

          {/* Next Button */}
          <button
            onClick={next}
            className="absolute -right-5 top-1/2 -translate-y-1/2 w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-all duration-300"
          >
            <i className="fas fa-chevron-right text-sm" />
          </button>

          {/* Dots */}
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

          {/* Counter */}
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
  const event = EVENTS[id];
  const [activeFilter, setActiveFilter] = useState("All");

  const filteredExhibitors =
    activeFilter === "All"
      ? EXHIBITORS
      : EXHIBITORS.filter((e) => e.category === activeFilter);

  if (!event) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <p className="text-text-light text-lg mb-4">Event not found.</p>
            <Link href="/events" className="text-accent font-semibold hover:underline">
              ← Back to Events
            </Link>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />

      {/* ── Hero Banner ── */}
      <section
        className="pt-36 pb-20 relative overflow-hidden"
        style={{
          backgroundImage: `linear-gradient(rgba(15,40,71,0.85), rgba(15,40,71,0.85)), url('${event.image}')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="max-w-[1400px] mx-auto px-[5%]">
          <Link
            href="/events"
            className="inline-flex items-center gap-2 text-white/60 hover:text-white text-sm mb-8 transition-colors"
          >
            <i className="fas fa-arrow-left" /> Back to Events
          </Link>

          <span
            className={`inline-block text-[0.75rem] font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-4 ${
              TAG_COLORS[event.tag] ?? "bg-gray-100 text-gray-600"
            }`}
          >
            {event.tag}
          </span>

          <h1 className="font-display text-4xl md:text-5xl font-extrabold text-white leading-[1.15] mb-6 max-w-[750px]">
            {event.title}
          </h1>

          <div className="flex flex-wrap gap-6 text-white/70 text-[0.9rem]">
            <span className="flex items-center gap-2">
              <i className="fas fa-calendar-alt text-accent" />
              {event.date}
            </span>
            <span className="flex items-center gap-2">
              <i className="fas fa-map-marker-alt text-accent" />
              {event.location}
            </span>
          </div>
        </div>
      </section>

      {/* ── Event Detail ── */}
      <section className="py-16 bg-white">
        <div className="max-w-[1400px] mx-auto px-[5%]">
          <div className="max-w-[800px]">
            <h2 className="font-display text-2xl font-extrabold text-primary mb-4">
              About This Event
            </h2>
            <p className="text-text-light text-[1rem] leading-[1.9]">
              {event.details}
            </p>
          </div>
        </div>
      </section>

      {/* ── Event Video ── */}
      {event.video_url && (
        <section className="py-16 bg-[#f8fafc]">
          <div className="max-w-[1400px] mx-auto px-[5%]">
            <h2 className="font-display text-3xl font-extrabold text-primary mb-10 text-center">
              Event Video
            </h2>
            <div className="max-w-4xl mx-auto rounded-2xl overflow-hidden shadow-xl">
              <div className="relative w-full" style={{ paddingTop: "56.25%" }}>
                <iframe
                  src={event.video_url}
                  className="absolute inset-0 w-full h-full"
                  title={event.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ── Event Gallery (only event 1) ── */}
      {id === "1" && <EventGallery />}

      {/* ── Exhibitor List (only event 1) ── */}
      {id === "1" && (
        <section className="py-16 bg-[#f8fafc]">
          <div className="max-w-[1400px] mx-auto px-[5%]">
            <h2 className="font-display text-3xl font-extrabold text-primary mb-10 text-center">
              Exhibitor List
            </h2>

            {/* Filter Tabs */}
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

            {/* Exhibitor Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {filteredExhibitors.map((exhibitor) => (
                <div
                  key={exhibitor.id}
                  className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:-translate-y-1 hover:shadow-md transition-all duration-300 flex flex-col items-center text-center"
                >
                  {/* Logo placeholder */}
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
                      Brochure
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
