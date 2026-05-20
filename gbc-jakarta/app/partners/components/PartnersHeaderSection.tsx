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
      <div className="max-w-350 mx-auto px-[5%] relative z-[2] w-full">
        {/* Title + Search */}
        <ScrollReveal className="text-center max-w-180 mx-auto mb-6">
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
