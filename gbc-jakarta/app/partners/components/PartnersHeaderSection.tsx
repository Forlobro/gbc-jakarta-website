"use client"

import ScrollReveal from "../../components/ScrollReveal"
import SectionBadge from "../../components/SectionBadge"
import FilterPills from "../../components/FilterPills"
import SearchBar from "../../components/SearchBar"
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
    <section className="pt-32 pb-6 relative" id="partners-header">
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
        <ScrollReveal className="text-center max-w-175 mx-auto mb-6">
          <SectionBadge centered>GMS Program</SectionBadge>
          <h2 className="font-display text-3xl md:text-[3rem] font-extrabold text-primary mb-4 leading-[1.2]">
            {t("featured")}
          </h2>
          <p className="text-text-light text-lg mb-4 text-justify">{t("discover")}</p>

          <div className="relative max-w-md mx-auto">
            <SearchBar
              value={search}
              onChange={(val) => {
                setSearch(val)
                setCurrentPage(1)
              }}
              placeholder={t("searchPlaceholder")}
            />
          </div>
        </ScrollReveal>

        {/* Year Filter */}
        {!loading && availableYears.length > 0 && (
          <div className="mb-4">
            <FilterPills
              items={[
                { key: "__all__", label: t("all") },
                ...availableYears.map((y) => ({ key: String(y), label: String(y) })),
              ]}
              activeKey={selectedYear === null ? "__all__" : String(selectedYear)}
              onSelect={(key) => {
                setSelectedYear(key === "__all__" ? null : Number(key))
                setCurrentPage(1)
              }}
            />
          </div>
        )}

        {/* Category Filter */}
        {!loading && categoryNames.length > 1 && (
          <FilterPills
            items={categoryNames.map((cat) => ({
              key: cat,
              label: cat === "All" ? t("all") : cat,
            }))}
            activeKey={activeFilter}
            onSelect={(key) => {
              setActiveFilter(key)
              setCurrentPage(1)
            }}
          />
        )}
      </div>
    </section>
  )
}
