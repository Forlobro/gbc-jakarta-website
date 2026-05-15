"use client"

import { useRef, useEffect } from "react"
import Image from "next/image"
import { useTranslation } from "../lib/LanguageContext"
import ScrollReveal from "../components/ScrollReveal"
import Navbar from "../components/Navbar"
import Footer from "../components/Footer"

const GYEONGGI_STATS = [
  {
    value: "527 Triliun KRW",
    label: "Total produksi regional (#1 Korea, 25.4%)",
    labelEn: "Total regional output (#1 Korea, 25.4%)",
    color: "text-[#f59e0b]",
  },
  {
    value: "13.6 Juta",
    label: "Total populasi (26.4% total Korea)",
    labelEn: "Total population (26.4% of Korea)",
    color: "text-[#60a5fa]",
  },
  {
    value: "1.84 Juta UKM",
    label: "UKM terdaftar (25.3% nasional)",
    labelEn: "Registered SMEs (25.3% national)",
    color: "text-[#a78bfa]",
  },
  {
    value: "470 Triliun KRW",
    label: "Total belanja R&D (50.5% nasional)",
    labelEn: "Total R&D spending (50.5% national)",
    color: "text-[#34d399]",
  },
  {
    value: "250,652",
    label: "Tenaga R&D (33.5% nasional Korea)",
    labelEn: "R&D workforce (33.5% of Korea)",
    color: "text-[#f472b6]",
  },
]

const GYEONGGI_FACTS = [
  {
    icon: "fas fa-microchip",
    text: "Pusat industri semikonduktor Korea — home to Samsung Electronics, SK Hynix",
    textEn: "Korea's semiconductor industry hub — home to Samsung Electronics, SK Hynix",
  },
  {
    icon: "fas fa-flask",
    text: "Hub bio & healthcare terbesar di Asia Tenggara Korea",
    textEn: "Korea's largest bio & healthcare hub in Northeast Asia",
  },
  {
    icon: "fas fa-chart-line",
    text: "Menyumbang 60% lapangan kerja nasional Korea",
    textEn: "Contributes 60% of Korea's national employment",
  },
  {
    icon: "fas fa-globe-asia",
    text: "Koridor ekonomi Asia Timur Laut — populasi 1.6 miliar dalam jangkauan",
    textEn: "Northeast Asia economic corridor — 1.6 billion population within reach",
  },
]

const TIMELINE = [
  {
    year: "1997",
    text: "Pendirian yayasan pendukung UKM Gyeonggi",
    textEn: "Establishment of Gyeonggi SME support foundation",
  },
  {
    year: "2008",
    text: "GBC Kuala Lumpur — ekspansi pertama ke Asia Tenggara",
    textEn: "GBC Kuala Lumpur — first Southeast Asian expansion",
  },
  {
    year: "2010",
    text: "GBC Shanghai dibuka, cabang regional barat & selatan",
    textEn: "GBC Shanghai opened, western & southern regional branches",
  },
  {
    year: "2016",
    text: "GBC Guangzhou & Ho Chi Minh dibuka",
    textEn: "GBC Guangzhou & Ho Chi Minh opened",
  },
  {
    year: "2017",
    text: "GBSA resmi diluncurkan sebagai lembaga terintegrasi",
    textEn: "GBSA officially launched as an integrated institution",
    note: "Integrasi Small and Medium Business Center + Science Technology Promotion Agency",
    noteEn: "Integration of Small and Medium Business Center + Science Technology Promotion Agency",
  },
  {
    year: "2020",
    text: "GBC Bangkok dibuka. Penghargaan Presiden Korea",
    textEn: "GBC Bangkok opened. Korean Presidential Award",
  },
  {
    year: "2023",
    text: "GBC Jakarta, dibuka. Digital GBC diluncurkan di 5 lokasi.",
    textEn: "GBC Jakarta, opened. Digital GBC launched in 5 locations.",
    highlight: true,
  },
  {
    year: "2025",
    text: "draft",
    textEn: "draft",
    highlight: true,
  },
]

function SectionBg({ flip = false }: { flip?: boolean }) {
  return (
    <>
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(circle, rgba(0,194,203,0.18) 1.5px, transparent 1.5px)",
          backgroundSize: "26px 26px",
        }}
      />
      <div
        className={`absolute ${flip ? "-top-32 -right-32" : "-top-32 -left-32"} w-[500px] h-[500px] rounded-full bg-accent/10 blur-2xl pointer-events-none`}
      />
      <div
        className={`absolute ${flip ? "-bottom-32 -left-32" : "-bottom-32 -right-32"} w-[500px] h-[500px] rounded-full bg-primary/8 blur-2xl pointer-events-none`}
      />
      <div
        className={`absolute ${flip ? "-top-20 -right-20" : "-top-20 -left-20"} w-[380px] h-[380px] rounded-full border-[55px] border-accent/10 pointer-events-none`}
      />
      <div
        className={`absolute ${flip ? "-bottom-20 -left-20" : "-bottom-20 -right-20"} w-[340px] h-[340px] rounded-full border-[45px] border-primary/8 pointer-events-none`}
      />
      <div className="absolute top-16 right-[8%] text-accent/15 text-8xl font-bold pointer-events-none select-none leading-none">
        +
      </div>
      <div className="absolute bottom-24 left-[5%] text-primary/8 text-7xl font-bold pointer-events-none select-none leading-none">
        ×
      </div>
    </>
  )
}

function VideoEmbed({
  srcId,
  srcEn,
  captionId,
  captionEn,
}: {
  srcId: string
  srcEn: string
  captionId: string
  captionEn: string
}) {
  const { language } = useTranslation()
  const src = language === "id" ? srcId : srcEn
  const caption = language === "id" ? captionId : captionEn

  const isMp4 = src?.endsWith(".mp4")
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    if (!isMp4 || !videoRef.current) return

    const videoEl = videoRef.current

    // Ensure video starts paused and muted (required for autoplay policy)
    videoEl.pause()
    videoEl.muted = true

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            videoEl.muted = true // Always muted before play to satisfy autoplay policy
            videoEl.play().catch(() => {
              // Autoplay blocked — silently ignore
            })
          } else {
            videoEl.pause()
          }
        })
      },
      {
        threshold: 0.5,
        // Use the document root, not a scrolling ancestor, to avoid ScrollReveal interference
        root: null,
      },
    )

    // Small delay so ScrollReveal animations settle before we start observing
    const timer = setTimeout(() => {
      observer.observe(videoEl)
    }, 300)

    return () => {
      clearTimeout(timer)
      observer.unobserve(videoEl)
    }
  }, [isMp4, src])

  return (
    <div className="max-w-4xl mx-auto mb-16">
      <div className="rounded-2xl overflow-hidden shadow-xl bg-black">
        <div className="relative w-full" style={{ paddingTop: "56.25%" }}>
          {isMp4 ? (
            <video
              ref={videoRef}
              key={src}
              className="absolute inset-0 w-full h-full object-cover"
              controls
              muted
              playsInline
              preload="metadata"
              src={src}
              title={caption}
            />
          ) : (
            <iframe
              key={src}
              className="absolute inset-0 w-full h-full"
              src={src}
              title={caption}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          )}
        </div>
      </div>
      <p className="text-center text-sm text-text-light mt-3">{caption}</p>
    </div>
  )
}

function AboutHero() {
  const { language } = useTranslation()
  const isId = language === "id"

  return (
    <section className="relative bg-white pt-32 pb-16" id="about-intro">
      <div className="max-w-[1200px] mx-auto px-[5%]">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left: text */}
          <div>
            <h1 className="font-display text-4xl md:text-[2.8rem] font-extrabold text-primary leading-[1.15] mb-5">
              {isId ? "Tentang GBC Jakarta" : "About GBC Jakarta"}
            </h1>
            <p className="text-text-light text-base leading-[1.85] mb-4 text-justify">
              {isId
                ? "GBC Jakarta (Gyeonggi Business Center Jakarta) adalah kantor perwakilan resmi dari Gyeonggi Business & Science Accelerator (GBSA) — lembaga pemerintah Provinsi Gyeonggi, Korea Selatan — yang berdedikasi memfasilitasi ekspansi bisnis perusahaan Korea ke pasar Indonesia."
                : "GBC Jakarta (Gyeonggi Business Center Jakarta) is the official representative office of Gyeonggi Business & Science Accelerator (GBSA) — a government agency of Gyeonggi Province, South Korea — dedicated to facilitating Korean business expansion into the Indonesian market."}
            </p>
            <p className="text-text-light text-base leading-[1.85] text-justify">
              {isId
                ? "Kami hadir sebagai jembatan antara ekosistem inovasi Gyeonggi yang dinamis dengan peluang bisnis yang terus berkembang di Indonesia, memberikan dukungan nyata bagi UKM Korea yang ingin tumbuh di Asia Tenggara."
                : "We serve as a bridge between Gyeonggi's dynamic innovation ecosystem and the growing business opportunities in Indonesia, providing tangible support for Korean SMEs looking to grow in Southeast Asia."}
            </p>
          </div>

          {/* Right: logos */}
          <div className="flex flex-col items-center gap-10">
            {/* Gyeonggi-do + GBSA side by side */}
            <div className="flex items-center justify-center gap-16 w-full">
              <div className="flex flex-col items-center gap-2">
                <Image
                  src="/images/gyeonggi-logo.jpeg"
                  alt="Gyeonggi-do"
                  width={280}
                  height={140}
                  className="w-auto object-contain mix-blend-multiply"
                  style={{ height: "60px" }}
                />
                <span className="text-[0.68rem] font-semibold text-text-light tracking-wide uppercase">
                  Gyeonggi-do
                </span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <Image
                  src="/images/Desain_tanpa_judul__1_-removebg-preview.png"
                  alt="GBSA"
                  width={280}
                  height={140}
                  className="w-auto object-contain"
                  style={{ height: "50px" }}
                />
                <span className="text-[0.68rem] font-semibold text-text-light tracking-wide uppercase">
                  GBSA
                </span>
              </div>
            </div>

            {/* GBC Jakarta */}
            <div className="flex flex-col items-center gap-2">
              <Image
                src="/images/logo.jpg"
                alt="GBC Jakarta"
                width={140}
                height={70}
                className="h-16 w-auto object-contain mix-blend-multiply"
              />
              <span className="text-[0.68rem] font-semibold text-primary/50 tracking-wide uppercase">
                GBC Jakarta
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function GlobalNetworkSection() {
  const { language } = useTranslation()
  const isId = language === "id"
  return (
    <section className="py-24 bg-gray-50 relative overflow-hidden" id="global-network">
      <div className="absolute top-0 left-0 right-0 pointer-events-none">
        <svg
          viewBox="0 0 1440 60"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full"
        >
          <path d="M0,20 C360,60 1080,0 1440,35 L1440,0 L0,0 Z" fill="white" />
        </svg>
      </div>

      <SectionBg flip />

      <div className="max-w-[1200px] mx-auto px-[5%] relative z-[2]">
        <ScrollReveal className="text-center max-w-[600px] mx-auto mb-12">
          <h2 className="font-display text-3xl md:text-4xl font-extrabold text-primary leading-tight mb-3">
            GBC — Gyeonggi Business Center
          </h2>
          <p className="text-text-light text-lg text-justify">
            {isId
              ? "Jaringan kantor perwakilan luar negeri GBSA di 21 negara dengan 28 kantor."
              : "GBSA's overseas representative network in 21 countries with 28 offices."}
          </p>
        </ScrollReveal>

        <ScrollReveal>
          <VideoEmbed
            srcId={process.env.NEXT_PUBLIC_HPANEL_VIDEO_PROFILE_GBC_ID || ""}
            srcEn={process.env.NEXT_PUBLIC_HPANEL_VIDEO_PROFILE_GBC_EN || ""}
            captionId="Video perkenalan jaringan GBC global (Indonesia)"
            captionEn="Video perkenalan jaringan GBC global (English)"
          />
        </ScrollReveal>

        <ScrollReveal>
          <div className="bg-white rounded-3xl shadow-lg border border-gray-100 p-8 md:p-10">
            <Image
              src="/images/gbc.png"
              alt="GBC Network Map — 19 lokasi di 14 negara"
              width={1200}
              height={800}
              className="w-full h-auto rounded-2xl"
            />
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}

function GBSASection() {
  const { language } = useTranslation()
  const isId = language === "id"
  return (
    <section className="py-24 bg-white relative overflow-hidden" id="gbsa">
      <div className="absolute top-0 left-0 right-0 pointer-events-none">
        <svg
          viewBox="0 0 1440 60"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full"
        >
          <path d="M0,30 C480,60 960,0 1440,40 L1440,0 L0,0 Z" fill="#f9fafb" />
        </svg>
      </div>

      <SectionBg />

      <div className="max-w-[1200px] mx-auto px-[5%] relative z-[2]">
        {/* Header */}
        <ScrollReveal className="text-center max-w-[640px] mx-auto mb-12">
          <h2 className="font-display text-3xl md:text-[2.6rem] font-extrabold text-primary mb-3 leading-[1.2]">
            GBSA — Gyeonggido Business & Science Accelerator
          </h2>
          <p className="text-text-light text-lg text-center">
            {isId
              ? "Lembaga publik resmi milik Pemerintah Provinsi Gyeonggi yang menjadi induk dari seluruh jaringan GBC di dunia."
              : "Official public institution of Gyeonggi Provincial Government that oversees the entire global GBC network."}
          </p>
        </ScrollReveal>

        {/* Video */}
        <ScrollReveal>
          <VideoEmbed
            srcId={process.env.NEXT_PUBLIC_HPANEL_VIDEO_PROFILE_GBSA || ""}
            srcEn={process.env.NEXT_PUBLIC_HPANEL_VIDEO_PROFILE_GBSA || ""}
            captionId="Video perkenalan GBSA (English — versi Indonesia dalam proses)"
            captionEn="Video introduction of GBSA (English)"
          />
        </ScrollReveal>

        {/* Description + Misi/Visi — 2 kolom */}
        <ScrollReveal>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start mb-14">
            {/* Kiri: deskripsi */}
            <div>
              <p className="text-text-light text-base leading-[1.9] mb-4 text-justify">
                {isId
                  ? "GBSA (경기도경제과학진흥원) adalah lembaga publik resmi milik Pemerintah Provinsi Gyeonggi, Korea Selatan. Diluncurkan pada Januari 2017 sebagai hasil integrasi Small and Medium Business Center dan Science Technology Promotion Agency."
                  : "GBSA (경기도경제과학진흥원) is an official public institution of Gyeonggi Provincial Government, South Korea. Launched in January 2017 as the integration of the Small and Medium Business Center and Science Technology Promotion Agency."}
              </p>
              <p className="text-text-light text-base leading-[1.9] text-justify">
                {isId
                  ? "GBSA hadir sebagai mitra terpercaya bagi UKM di seluruh siklus bisnis — mulai dari startup, komersialisasi, investasi, ekspor, hingga R&D sains dan teknologi — dengan tujuan menjadikan Provinsi Gyeonggi sebagai pusat peluang pertumbuhan dunia."
                  : "GBSA serves as a trusted partner for SMEs across the entire business cycle — from startup, commercialization, investment, and export, to science and technology R&D — with the goal of making Gyeonggi Province a global hub of growth opportunities."}
              </p>
            </div>

            {/* Kanan: Misi & Visi */}
            <div className="flex flex-col gap-4">
              <div className="bg-white rounded-2xl px-7 py-6 border-2 border-gray-200">
                <p className="text-[0.65rem] font-bold uppercase tracking-[0.15em] text-black/40 mb-2">
                  {isId ? "Misi" : "Mission"}
                </p>
                <p className="text-base font-bold text-black leading-snug">
                  Making Gyeonggi Province abound with growth opportunities
                </p>
              </div>
              <div className="bg-white rounded-2xl px-7 py-6 border-2 border-gray-200">
                <p className="text-[0.65rem] font-bold uppercase tracking-[0.15em] text-black/40 mb-2">
                  {isId ? "Visi" : "Vision"}
                </p>
                <p className="text-base font-bold text-black leading-snug">
                  GBSA — Partner for SMEs Innovation
                </p>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}

function GyeonggiSection() {
  const { language } = useTranslation()
  const isId = language === "id"
  return (
    <section className="py-24 bg-gray-50 relative overflow-hidden" id="gyeonggi">
      <div className="absolute top-0 left-0 right-0 pointer-events-none">
        <svg
          viewBox="0 0 1440 60"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full"
        >
          <path d="M0,20 C360,60 1080,0 1440,35 L1440,0 L0,0 Z" fill="white" />
        </svg>
      </div>

      <SectionBg flip />

      <div className="max-w-[1200px] mx-auto px-[5%] relative z-[2]">
        {/* Header */}
        <ScrollReveal className="text-center max-w-[640px] mx-auto mb-12">
          <h2 className="font-display text-3xl md:text-[2.8rem] font-extrabold text-primary mb-3 leading-[1.2]">
            Gyeonggi-do
          </h2>
          <p className="text-text-light text-lg leading-[1.8] text-center">
            {isId
              ? "Provinsi terbesar di Korea Selatan — pusat ekonomi, inovasi, dan teknologi yang menyumbang 25.4% total produksi nasional dan menjadi rumah bagi konglomerat global seperti Samsung Electronics & SK Hynix."
              : "The largest province in South Korea — the center of economy, innovation, and technology, contributing 25.4% of national output and home to global conglomerates like Samsung Electronics & SK Hynix."}
          </p>
        </ScrollReveal>

        {/* Video */}
        <ScrollReveal>
          <VideoEmbed
            srcId={process.env.NEXT_PUBLIC_HPANEL_VIDEO_PROFILE_GYEONGGIDO || ""}
            srcEn={process.env.NEXT_PUBLIC_HPANEL_VIDEO_PROFILE_GYEONGGIDO || ""}
            captionId="Video perkenalan Gyeonggi-do"
            captionEn="Video introduction of Gyeonggi-do"
          />
        </ScrollReveal>

        {/* Stats + Facts */}
        <ScrollReveal>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            {/* Stats panel */}
            <div className="bg-white rounded-2xl p-8 flex flex-col gap-4 border-2 border-gray-200">
              <p className="text-[0.7rem] font-bold uppercase tracking-[0.15em] text-gray-400">
                {isId ? "GYEONGGI-DO DALAM ANGKA" : "GYEONGGI-DO IN NUMBERS"}
              </p>
              {GYEONGGI_STATS.map((s) => (
                <div key={s.value} className="flex flex-col gap-0.5">
                  <span className={`text-xl font-extrabold leading-tight ${s.color}`}>
                    {s.value}
                  </span>
                  <span className="text-xs text-gray-500">{isId ? s.label : s.labelEn}</span>
                </div>
              ))}
            </div>

            {/* Facts */}
            <div className="flex flex-col gap-4 justify-center">
              {GYEONGGI_FACTS.map((f) => (
                <div
                  key={f.text}
                  className="flex items-start gap-4 bg-white rounded-xl px-5 py-4 border border-gray-100 shadow-sm"
                >
                  <div className="w-9 h-9 bg-accent/10 rounded-lg flex items-center justify-center text-accent shrink-0">
                    <i className={f.icon} />
                  </div>
                  <p className="text-sm text-text leading-relaxed">{isId ? f.text : f.textEn}</p>
                </div>
              ))}
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}

function TimelineSection() {
  const { language } = useTranslation()
  const isId = language === "id"
  return (
    <section className="py-24 bg-[#f8fafc] relative overflow-hidden" id="history">
      <div className="absolute top-0 left-0 right-0 pointer-events-none">
        <svg
          viewBox="0 0 1440 60"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full"
        >
          <path d="M0,20 C360,60 1080,0 1440,35 L1440,0 L0,0 Z" fill="white" />
        </svg>
      </div>

      <SectionBg flip />

      <div className="max-w-[1200px] mx-auto px-[5%] relative z-[2]">
        <ScrollReveal className="max-w-[600px] mx-auto text-center mb-14">
          <h2 className="font-display text-3xl md:text-[2.8rem] font-extrabold text-primary mb-3 leading-[1.2]">
            {isId ? "Perjalanan GBSA & GBC " : "GBSA & GBC Journey "} <br />{" "}
            {isId ? "(1997–2023)" : "(1997–2023)"}
          </h2>
          <p className="text-text-light text-lg text-center">
            {isId
              ? "Kronologi lengkap dari pendirian awal hingga pembukaan GBC Jakarta."
              : "Complete chronology from founding to GBC Jakarta opening."}
          </p>
        </ScrollReveal>

        <ScrollReveal className="max-w-2xl mx-auto">
          <div className="relative pl-10">
            <div className="absolute left-[7px] top-2 bottom-8 w-[2px] bg-gray-200 rounded-full" />

            {TIMELINE.map((item) => (
              <div
                key={item.year}
                className={`relative mb-8 last:mb-0 ${
                  item.highlight ? "bg-amber-50 border border-amber-200 rounded-2xl p-5 ml-2" : ""
                }`}
              >
                <div
                  className={`absolute top-1.5 rounded-full border-2 border-white shadow ${
                    item.highlight
                      ? "-left-[36px] w-4 h-4 bg-amber-400 shadow-amber-200"
                      : "-left-[28px] w-3 h-3 bg-gray-300"
                  }`}
                />
                <div className="flex flex-col gap-1">
                  <span
                    className={`text-sm font-extrabold tracking-wide ${item.highlight ? "text-amber-600" : "text-primary"}`}
                  >
                    {item.year}
                  </span>
                  <span className="text-[0.95rem] text-text leading-relaxed">
                    {isId ? item.text : item.textEn}
                  </span>
                  {item.note && (
                    <span className="text-xs text-text-light italic mt-0.5">
                      {isId ? item.note : ((item as { noteEn?: string }).noteEn ?? item.note)}
                    </span>
                  )}
                </div>
              </div>
            ))}

            <p className="text-xs text-text-light italic mt-6">
              {isId
                ? "Timeline lengkap: 20 milestone · Sumber: GBSA Brochure 2023"
                : "Full timeline: 20 milestones · Source: GBSA Brochure 2023"}
            </p>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}

export default function AboutPage() {
  return (
    <main>
      <Navbar />
      <AboutHero />
      <GlobalNetworkSection />
      <GBSASection />
      <GyeonggiSection />
      <TimelineSection />
      <Footer />
    </main>
  )
}
