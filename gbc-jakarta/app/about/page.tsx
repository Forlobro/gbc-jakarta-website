"use client";

import Image from "next/image";
import { useTranslation } from "../lib/LanguageContext";
import ScrollReveal from "../components/ScrollReveal";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";  

// ─── Data ─────────────────────────────────────────────────────────────────────

const GBSA_STATS = [
  { value: "527 Triliun KRW", label: "GDP terbesar di Korea (#1, 25.4%)",      color: "text-[#f59e0b]" },
  { value: "13.6 Juta",       label: "Populasi (26.4% total Korea)",            color: "text-[#60a5fa]" },
  { value: "1.84 Juta UKM",  label: "Terdaftar di Gyeonggi (28.3% nasional)", color: "text-[#a78bfa]" },
  { value: "470 Triliun KRW",label: "Total belanja R&D (50.5% nasional)",      color: "text-[#34d399]" },
  { value: "250,652",         label: "Tenaga R&D (33.5% nasional Korea)",       color: "text-[#f472b6]" },
];

const STRATEGIES = [
  { dot: "bg-green-500",  title: "Industri masa depan",  desc: "Semikonduktor, bio, mobilitas, hidrogen, digitalisasi manufaktur" },
  { dot: "bg-blue-500",   title: "Ekosistem inovasi",    desc: "Startup, Techno Valley, kolaborasi industri-akademik" },
  { dot: "bg-amber-500",  title: "Daya saing global",    desc: "Ekspor, investasi, GBC network, hidden champions global" },
  { dot: "bg-purple-500", title: "Manajemen ESG",        desc: "Keberlanjutan, digital, transparansi, keamanan" },
];



const TIMELINE = [
  { year: "1997", text: "Pendirian yayasan pendukung UKM Gyeonggi" },
  { year: "2005", text: "GBC pertama dibuka di Mumbai, India. Penghargaan PM Korea" },
  { year: "2008", text: "GBC Kuala Lumpur — ekspansi pertama ke Asia Tenggara" },
  { year: "2010", text: "GBC Shanghai dibuka, cabang regional barat & selatan" },
  { year: "2016", text: "GBC Guangzhou & Ho Chi Minh dibuka" },
  {
    year: "2017",
    text: "GBSA resmi diluncurkan sebagai lembaga terintegrasi",
    note: "Integrasi Small and Medium Business Center + Science Technology Promotion Agency",
  },
  { year: "2020", text: "GBC Bangkok dibuka. Penghargaan Presiden Korea" },
  {
    year: "2023",
    text: "GBC Jakarta, Bengaluru, Tashkent dibuka. Digital GBC diluncurkan di 5 lokasi.",
    highlight: true,
  },
];

// ─── Shared decorative background (matches existing sections) ─────────────────
function SectionBg({ flip = false }: { flip?: boolean }) {
  return (
    <>
    <Navbar />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(circle, rgba(0,194,203,0.18) 1.5px, transparent 1.5px)",
          backgroundSize: "26px 26px",
        }}
      />
      <div className={`absolute ${flip ? "-top-32 -right-32" : "-top-32 -left-32"} w-[500px] h-[500px] rounded-full bg-accent/10 blur-2xl pointer-events-none`} />
      <div className={`absolute ${flip ? "-bottom-32 -left-32" : "-bottom-32 -right-32"} w-[500px] h-[500px] rounded-full bg-primary/8 blur-2xl pointer-events-none`} />
      <div className={`absolute ${flip ? "-top-20 -right-20" : "-top-20 -left-20"} w-[380px] h-[380px] rounded-full border-[55px] border-accent/10 pointer-events-none`} />
      <div className={`absolute ${flip ? "-bottom-20 -left-20" : "-bottom-20 -right-20"} w-[340px] h-[340px] rounded-full border-[45px] border-primary/8 pointer-events-none`} />
      <div className="absolute top-16 right-[8%] text-accent/15 text-8xl font-bold pointer-events-none select-none leading-none">+</div>
      <div className="absolute bottom-24 left-[5%] text-primary/8 text-7xl font-bold pointer-events-none select-none leading-none">×</div>
    </>
  );
}

// ─── 1. Hero / About GBC Jakarta ──────────────────────────────────────────────
function AboutHero() {
  const { t } = useTranslation();

  const features = [
    { icon: "fas fa-search-dollar",  title: t("marketResearch"),   desc: t("IndepthIndonesianmarketanalysis") },
    { icon: "fas fa-users",          title: t("businessMatching"), desc: t("connectWithLocalDistributors") },
    { icon: "fas fa-file-signature", title: t("legalSupport"),     desc: t("businessRegistrationGuidance") },
    { icon: "fas fa-bullhorn",       title: t("tradePromotion"),   desc: t("tradeShowsExhibitions") },
  ];

  return (
    <section className="pt-36 pb-24 bg-white relative" id="about-intro">
      {/* Wave divider top — matches section above */}
      <div className="absolute top-0 left-0 right-0 pointer-events-none">
        <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
          <path d="M0,30 C480,60 960,0 1440,40 L1440,0 L0,0 Z" fill="#f9fafb" />
        </svg>
      </div>

      <SectionBg />

      {/* Decorative lines — left side */}
      <div className="absolute left-[3%] top-1/3 flex flex-col gap-3 pointer-events-none">
        {[70, 110, 50, 90, 60, 100].map((w, i) => (
          <div key={i} className="h-[3px] bg-accent/20 rounded-full" style={{ width: `${w}px` }} />
        ))}
      </div>

      <div className="max-w-[1400px] mx-auto px-[5%] relative z-[2]">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">

          {/* Left: Content */}
          <ScrollReveal>
            <div className="inline-flex items-center gap-3 text-accent font-semibold text-[0.9rem] tracking-[0.1em] uppercase mb-4 before:content-[''] before:w-10 before:h-0.5 before:bg-accent before:block">
              {t("aboutLabel")}
            </div>

            <h1 className="font-display text-4xl md:text-[3.8rem] font-extrabold text-primary mb-6 leading-[1.15]">
              {t("aboutTitle")}
            </h1>

            <p className="text-text-light text-lg leading-[1.9] mb-5">
              {t("aboutDescription")}
            </p>
            <p className="text-text-light text-lg leading-[1.9] mb-8">
              {t("aboutDescription2")}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-10">
              {features.map((f) => (
                <div key={f.title} className="flex items-start gap-4">
                  <div className="w-[50px] h-[50px] bg-gradient-to-br from-accent/10 to-accent/5 rounded-xl flex items-center justify-center text-accent text-xl shrink-0">
                    <i className={f.icon} />
                  </div>
                  <div>
                    <h4 className="text-base font-bold text-text mb-1">{f.title}</h4>
                    <p className="text-[0.9rem] text-text-light m-0">{f.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </ScrollReveal>

          {/* Right: Image + logos */}
          <ScrollReveal className="relative">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl">
              <Image
                src="/images/ceremonial.png"
                alt="GBC Jakarta Opening Ceremony"
                width={800}
                height={600}
                className="w-full h-auto block object-cover aspect-[4/3]"
              />
            </div>
            {/* Corner accent */}
            <div className="absolute w-[200px] h-[200px] border-[3px] border-accent rounded-3xl -top-[30px] -right-[30px] -z-[1]" />

            {/* Logo row */}
            <div className="flex items-center gap-6 mt-8 flex-wrap">
              <Image
                src="/images/Desain_tanpa_judul__1_-removebg-preview.png"
                alt="GBSA"
                width={100}
                height={44}
                className="h-10 w-auto mix-blend-multiply opacity-80"
              />
              <Image
                src="/images/gyeonggi-logo.jpeg"
                alt="Gyeonggi-do"
                width={100}
                height={44}
                className="h-10 w-auto mix-blend-multiply opacity-80"
              />
              <Image
                src="/images/logo-panjang.png"
                alt="GBC Jakarta"
                width={130}
                height={44}
                className="h-10 w-auto"
              />
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}

// ─── 2. Global Network ────────────────────────────────────────────────────────
function GlobalNetworkSection() {
  return (
    <section className="py-36 bg-gray-50 relative" id="global-network">
      {/* Wave top */}
      <div className="absolute top-0 left-0 right-0 pointer-events-none">
        <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
          <path d="M0,20 C360,60 1080,0 1440,35 L1440,0 L0,0 Z" fill="white" />
        </svg>
      </div>

      <SectionBg flip />

      {/* Decorative lines — right side */}
      <div className="absolute right-[4%] top-1/2 -translate-y-1/2 flex flex-col gap-3 pointer-events-none">
        {[90, 60, 110, 50, 80, 40].map((w, i) => (
          <div key={i} className="h-[3px] bg-accent/20 rounded-full" style={{ width: `${w}px` }} />
        ))}
      </div>

      <div className="max-w-[1400px] mx-auto px-[5%] relative z-[2]">

        {/* Header */}
        <ScrollReveal className="text-center max-w-[640px] mx-auto mb-14">
          <div className="inline-block text-[0.8rem] font-semibold tracking-[0.1em] uppercase text-accent bg-accent/10 px-4 py-2 rounded-full mb-4">
            JARINGAN GLOBAL
          </div>
          <h2 className="font-display text-3xl md:text-4xl font-extrabold text-primary leading-tight mb-3">
            GBC — Gyeonggi Business Center
          </h2>
          <p className="text-text-light text-lg">
            Jaringan kantor perwakilan luar negeri GBSA di 14 negara dengan 19 kantor.
          </p>
        </ScrollReveal>

        {/* Video */}
        <ScrollReveal className="max-w-4xl mx-auto mb-16">
          <div className="rounded-2xl overflow-hidden shadow-xl">
            <div className="relative w-full" style={{ paddingTop: "56.25%" }}>
              <iframe
                className="absolute inset-0 w-full h-full"
                src="https://www.youtube.com/embed/viTmdnYlmQo"
                title="Video perkenalan jaringan GBC global"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
          <p className="text-center text-sm text-text-light mt-3">Video perkenalan jaringan GBC global</p>
        </ScrollReveal>

        {/* Locations grid card */}
        <ScrollReveal>
          <div className="bg-white rounded-3xl shadow-lg border border-gray-100 p-8 md:p-12">
            <div className="mb-10">
              <Image
                src="/images/gbc.png"
                alt="GBC Network Map — 19 lokasi di 14 negara"
                width={1200}
                height={800}
                className="w-full h-auto rounded-2xl"
              />
            </div>
            
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}

// ─── 3. Parent Organization (Gyeonggi-do / GBSA) ──────────────────────────────
function ParentOrgSection() {
  return (
    <section className="py-36 bg-white relative" id="parent-org">
      {/* Wave top */}
      <div className="absolute top-0 left-0 right-0 pointer-events-none">
        <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
          <path d="M0,30 C480,60 960,0 1440,40 L1440,0 L0,0 Z" fill="#f9fafb" />
        </svg>
      </div>

      <SectionBg />

      <div className="max-w-[1400px] mx-auto px-[5%] relative z-[2]">

        {/* Header */}
        <ScrollReveal className="max-w-[640px] mb-14">
          <div className="inline-flex items-center gap-3 text-accent font-semibold text-[0.9rem] tracking-[0.1em] uppercase mb-4 before:content-[''] before:w-10 before:h-0.5 before:bg-accent before:block">
            LEMBAGA INDUK
          </div>
          <h2 className="font-display text-3xl md:text-[3rem] font-extrabold text-primary mb-3 leading-[1.2]">
            GBSA - Gyeonggido Business & Science Accelerator
          </h2>
          <p className="text-text-light text-lg">
            Lembaga resmi Pemerintah Provinsi Gyeonggi yang mengelola seluruh jaringan GBC.
          </p>
        </ScrollReveal>

        {/* Video */}
        <ScrollReveal className="max-w-4xl mx-auto mb-16">
          <div className="rounded-2xl overflow-hidden shadow-xl">
            <div className="relative w-full" style={{ paddingTop: "56.25%" }}>
              <iframe
                className="absolute inset-0 w-full h-full"
                src="https://www.youtube.com/embed/E722_8UgqHY"
                title="Video perkenalan GBSA"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
          <p className="text-center text-sm text-text-light mt-3">Video perkenalan GBC</p>
        </ScrollReveal>

                <ScrollReveal className="max-w-[640px] mb-14">
          <div className="inline-flex items-center gap-3 text-accent font-semibold text-[0.9rem] tracking-[0.1em] uppercase mb-4 before:content-[''] before:w-10 before:h-0.5 before:bg-accent before:block">
            LEMBAGA INDUK
          </div>
          <h2 className="font-display text-3xl md:text-[3rem] font-extrabold text-primary mb-3 leading-[1.2]">
            Gyeonggi-do
          </h2>
          <p className="text-text-light text-lg">
            Lembaga resmi Pemerintah Provinsi Gyeonggi yang mengelola seluruh jaringan GBC.
          </p>
        </ScrollReveal>

        {/* Video */}
        <ScrollReveal className="max-w-4xl mx-auto mb-16">
          <div className="rounded-2xl overflow-hidden shadow-xl">
            <div className="relative w-full" style={{ paddingTop: "56.25%" }}>
              <iframe
                className="absolute inset-0 w-full h-full"
                src="https://www.youtube.com/embed/xm02usuSO6Q"
                title="Video perkenalan GBSA"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
          <p className="text-center text-sm text-text-light mt-3">Video perkenalan GBSA</p>
        </ScrollReveal>
        

        {/* Description + Stats */}
        <ScrollReveal>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12">

            {/* Left */}
            <div className="flex flex-col gap-6">
              <p className="text-text-light text-lg leading-[1.9]">
                GBSA (경기도경제과학진흥원) adalah lembaga publik resmi milik Pemerintah Provinsi
                Gyeonggi. Berdiri sejak 1997, mendukung UKM melalui seluruh siklus: startup,
                komersialisasi, investasi, ekspor, R&D.
              </p>
              <div className="flex flex-col gap-3">
                <div className="bg-gray-50 rounded-xl px-5 py-4 border border-gray-100">
                  <p className="text-[0.7rem] font-bold uppercase tracking-widest text-text-light mb-1">Misi</p>
                  <p className="text-base font-semibold text-primary">
                    Making Gyeonggi Province abound with growth opportunities
                  </p>
                </div>
                <div className="bg-gray-50 rounded-xl px-5 py-4 border border-gray-100">
                  <p className="text-[0.7rem] font-bold uppercase tracking-widest text-text-light mb-1">Visi</p>
                  <p className="text-base font-semibold text-primary">
                    GBSA — Partner for SMEs Innovation
                  </p>
                </div>
              </div>
            </div>

            {/* Right: Stats dark panel */}
            <div className="bg-primary rounded-2xl p-8 flex flex-col gap-5">
              <p className="text-[0.7rem] font-bold uppercase tracking-[0.15em] text-white/40">
                PROVINSI GYEONGGI DALAM ANGKA
              </p>
              {GBSA_STATS.map((s) => (
                <div key={s.value} className="flex flex-col gap-0.5">
                  <span className={`text-xl font-extrabold leading-tight ${s.color}`}>{s.value}</span>
                  <span className="text-xs text-white/50">{s.label}</span>
                </div>
              ))}
            </div>
          </div>
        </ScrollReveal>

        {/* Strategy cards */}
        <ScrollReveal>
          <p className="text-sm font-semibold text-text-light mb-4">Empat strategi utama GBSA</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {STRATEGIES.map((s) => (
              <div
                key={s.title}
                className="bg-gray-50 border border-gray-100 rounded-2xl p-6 flex flex-col gap-3 hover:shadow-md transition-shadow duration-300"
              >
                <span className={`w-2.5 h-2.5 rounded-full ${s.dot}`} />
                <h4 className="text-sm font-bold text-text">{s.title}</h4>
                <p className="text-xs text-text-light leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}

// ─── 4. Timeline ──────────────────────────────────────────────────────────────
function TimelineSection() {
  return (
    <section className="py-36 bg-[#f8fafc] relative" id="history">
      {/* Wave top */}
      <div className="absolute top-0 left-0 right-0 pointer-events-none">
        <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
          <path d="M0,20 C360,60 1080,0 1440,35 L1440,0 L0,0 Z" fill="white" />
        </svg>
      </div>

      <SectionBg flip />

      <div className="max-w-[1400px] mx-auto px-[5%] relative z-[2]">

        {/* Header */}
        <ScrollReveal className="max-w-[640px] mx-auto text-center mb-16">
          <div className="inline-block text-[0.8rem] font-semibold tracking-[0.1em] uppercase text-accent bg-accent/10 px-4 py-2 rounded-full mb-4">
            SEJARAH
          </div>
          <h2 className="font-display text-3xl md:text-[3rem] font-extrabold text-primary mb-3 leading-[1.2]">
            Perjalanan GBSA &amp; GBC (1997–2023)
          </h2>
          <p className="text-text-light text-lg">
            Kronologi lengkap dari pendirian awal hingga pembukaan GBC Jakarta.
          </p>
        </ScrollReveal>

        {/* Timeline list */}
        <ScrollReveal className="max-w-2xl mx-auto">
          <div className="relative pl-8">
            {/* Vertical line */}
            <div className="absolute left-[7px] top-2 bottom-8 w-[2px] bg-gray-200 rounded-full" />

            {TIMELINE.map((item) => (
              <div
                key={item.year}
                className={`relative mb-8 last:mb-0 ${
                  item.highlight
                    ? "bg-amber-50 border border-amber-200 rounded-2xl p-5 ml-4"
                    : ""
                }`}
              >
                {/* Dot */}
                <div
                  className={`absolute top-1 rounded-full border-2 border-white shadow ${
                    item.highlight
                      ? "-left-[38px] w-4 h-4 bg-amber-400 shadow-amber-200"
                      : "-left-[30px] w-3 h-3 bg-gray-300"
                  }`}
                />
                <div className="flex flex-col gap-1">
                  <span
                    className={`text-sm font-extrabold tracking-wide ${
                      item.highlight ? "text-amber-600" : "text-primary"
                    }`}
                  >
                    {item.year}
                  </span>
                  <span className="text-[0.95rem] text-text leading-relaxed">{item.text}</span>
                  {item.note && (
                    <span className="text-xs text-text-light italic mt-0.5">{item.note}</span>
                  )}
                </div>
              </div>
            ))}

            <p className="text-xs text-text-light italic mt-6">
              Timeline lengkap: 20 milestone · Sumber: GBSA Brochure 2023
            </p>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}

// ─── Page export ──────────────────────────────────────────────────────────────
export default function AboutPage() {
  return (
    <main>
      <AboutHero />
      <GlobalNetworkSection />
      <ParentOrgSection />
      <TimelineSection />
      <Footer />
    </main>
  );
}