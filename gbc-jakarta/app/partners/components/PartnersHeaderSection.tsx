"use client"

import ScrollReveal from "../../components/ScrollReveal"
import { useTranslation } from "../../lib/LanguageContext"
import { usePartners } from "../context/PartnersContext"

export default function PartnersHeaderSection() {
  const { t } = useTranslation()
  const {
    loading,
    search,
    setSearch,
    availableYears,
    selectedYear,
    setSelectedYear,
    categoryNames,
    activeFilter,
    setActiveFilter,
    setCurrentPage,
  } = usePartners()

  return (
    <section className="pt-32 pb-6 bg-[#f8fafc] relative" id="partners-header">
      {/* Decorative background */}
      <div className="absolute -top-32 -right-32 w-[600px] h-[600px] rounded-full bg-primary/8 blur-2xl pointer-events-none" />
      <div className="absolute -top-24 -right-24 w-[450px] h-[450px] rounded-full border-[55px] border-primary/8 pointer-events-none" />
      <div className="absolute -bottom-32 -left-32 w-[500px] h-[500px] rounded-full bg-accent/8 blur-2xl pointer-events-none" />
      <div className="absolute -bottom-20 -left-20 w-[350px] h-[350px] rounded-full border-[45px] border-accent/10 pointer-events-none" />
      <div
        className="absolute inset-y-0 left-0 w-32 pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(circle, rgba(0,194,203,0.2) 1.5px, transparent 1.5px)",
          backgroundSize: "20px 20px",
        }}
      />
      <div className="absolute top-20 left-[8%] text-accent/15 text-8xl font-bold pointer-events-none select-none leading-none">
        +
      </div>
      <div className="absolute bottom-28 right-[6%] text-primary/10 text-7xl font-bold pointer-events-none select-none leading-none">
        +
      </div>
      <div className="absolute top-1/2 right-[3%] text-accent/12 text-6xl font-bold pointer-events-none select-none leading-none">
        ×
      </div>
      <div className="absolute top-[30%] left-[3%] text-primary/8 text-5xl font-bold pointer-events-none select-none leading-none">
        ◦
      </div>
      <div className="absolute right-[3%] top-1/3 flex flex-col gap-3 pointer-events-none">
        {[80, 50, 100, 60, 90, 40].map((w, i) => (
          <div key={i} className="h-[3px] bg-primary/15 rounded-full" style={{ width: `${w}px` }} />
        ))}
      </div>

      <div className="max-w-350 mx-auto px-[5%] relative z-[2] w-full">
        {/* Title + Search */}
        <ScrollReveal className="text-center max-w-175 mx-auto mb-12">
          <div className="inline-flex items-center gap-3 text-accent font-semibold text-[0.9rem] tracking-widest uppercase mb-4 before:content-[''] before:w-10 before:h-0.5 before:bg-accent before:block">
            GMS Program
          </div>
          <h2 className="font-display text-3xl md:text-[3rem] font-extrabold text-primary mb-4 leading-[1.2]">
            {t("featured")}
          </h2>
          <p className="text-text-light text-lg mb-6 text-justify">{t("discover")}</p>

          <div className="relative max-w-md mx-auto">
            <i className="fas fa-search absolute left-4 top-1/2 -translate-y-1/2 text-text-muted" />
            <input
              type="text"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value)
                setCurrentPage(1)
              }}
              placeholder={t("searchPlaceholder")}
              className="w-full pl-11 pr-4 py-3 border-2 border-gray-200 rounded-full text-sm focus:outline-none focus:border-accent transition-all"
            />
          </div>
        </ScrollReveal>

        {/* Year Filter */}
        {!loading && availableYears.length > 0 && (
          <ScrollReveal className="flex justify-center gap-2 flex-wrap mb-6">
            <button
              onClick={() => {
                setSelectedYear(null)
                setCurrentPage(1)
              }}
              className={`px-5 py-2.5 border-2 rounded-full text-[0.85rem] font-semibold cursor-pointer transition-all duration-300 ${
                selectedYear === null
                  ? "bg-primary border-primary text-white"
                  : "bg-white border-gray-200 text-text-light hover:border-primary hover:text-primary"
              }`}
            >
              {t("all")}
            </button>
            {availableYears.map((year) => (
              <button
                key={year}
                onClick={() => {
                  setSelectedYear(year)
                  setCurrentPage(1)
                }}
                className={`px-5 py-2.5 border-2 rounded-full text-[0.85rem] font-semibold cursor-pointer transition-all duration-300 ${
                  selectedYear === year
                    ? "bg-primary border-primary text-white"
                    : "bg-white border-gray-200 text-text-light hover:border-primary hover:text-primary"
                }`}
              >
                {year}
              </button>
            ))}
          </ScrollReveal>
        )}

        {/* Category Filter */}
        {!loading && categoryNames.length > 1 && (
          <div className="flex gap-2 overflow-x-auto pb-2 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
            {categoryNames.map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  setActiveFilter(cat)
                  setCurrentPage(1)
                }}
                className={`px-5 py-2.5 border-2 rounded-full text-[0.85rem] font-semibold cursor-pointer transition-all duration-300 shrink-0 ${
                  activeFilter === cat
                    ? "bg-primary border-primary text-white"
                    : "bg-white border-gray-200 text-text-light hover:border-primary hover:text-primary"
                }`}
              >
                {cat === "All" ? t("all") : cat}
              </button>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
