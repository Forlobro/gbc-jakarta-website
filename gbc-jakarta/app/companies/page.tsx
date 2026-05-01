"use client"

import Link from "next/link"
import { useEffect, useMemo, useState } from "react"
import { useTranslation } from "../lib/LanguageContext"
import Navbar from "../components/Navbar"
import Footer from "../components/Footer"
import ScrollReveal from "../components/ScrollReveal"
import { GbcCompanyWithPhotos } from "../lib/supabase"

const PAGE_SIZE = 9

function getYear(dateValue: string | null | undefined): number | null {
  if (!dateValue) return null
  const match = dateValue.match(/^(\d{4})/)
  if (!match) return null

  const year = Number(match[1])
  return Number.isNaN(year) ? null : year
}

function getCoveredYears(company: GbcCompanyWithPhotos): number[] {
  const startYear = getYear(company.start_date)
  const endYear = getYear(company.end_date)

  if (startYear && endYear) {
    const from = Math.min(startYear, endYear)
    const to = Math.max(startYear, endYear)

    const years: number[] = []
    for (let year = from; year <= to; year += 1) {
      years.push(year)
    }

    return years
  }

  if (startYear) return [startYear]
  if (endYear) return [endYear]
  return []
}

export default function CompaniesPage() {
  const { t, language } = useTranslation()
  const [companies, setCompanies] = useState<GbcCompanyWithPhotos[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState("")
  const [activeFilter, setActiveFilter] = useState("All")
  const [selectedYear, setSelectedYear] = useState<number | null>(null)
  const [currentPage, setCurrentPage] = useState(1)

  useEffect(() => {
    fetch("/api/companies")
      .then((r) => r.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setCompanies(data)

          const years = Array.from(
            new Set(
              data.flatMap((company: GbcCompanyWithPhotos) =>
                getCoveredYears(company),
              ),
            ),
          ).sort((a, b) => b - a)

          setSelectedYear((prev) => prev ?? years[0] ?? null)
        }
      })
      .finally(() => setLoading(false))
  }, [])

  // Reset to page 1 whenever filters/search change
  useEffect(() => {
    setCurrentPage(1)
  }, [search, activeFilter, selectedYear])

  // Unique categories
  const categories = [
    "All",
    ...Array.from(new Set(companies.map((c) => c.category).filter(Boolean))),
  ] as string[]

  const availableYears = useMemo(() => {
    const years = new Set<number>()
    for (const company of companies) {
      for (const year of getCoveredYears(company)) {
        years.add(year)
      }
    }
    return Array.from(years).sort((a, b) => b - a)
  }, [companies])

  // Full filtered list — used for pagination total
  const filtered = companies.filter((c) => {
    const years = getCoveredYears(c)
    const matchesYear = selectedYear === null || years.includes(selectedYear)
    const matchesSearch =
      (c.name ?? "").toLowerCase().includes(search.toLowerCase()) ||
      (c.category ?? "").toLowerCase().includes(search.toLowerCase()) ||
      (c.description_id ?? "").toLowerCase().includes(search.toLowerCase()) ||
      (c.description_en ?? "").toLowerCase().includes(search.toLowerCase())
    const matchesFilter = activeFilter === "All" || c.category === activeFilter
    return matchesYear && matchesSearch && matchesFilter
  })

  // "Y" = total matching the current CATEGORY filter only (ignores year & search)
  const categoryTotal = useMemo(() => {
    if (activeFilter === "All") return companies.length
    return companies.filter((c) => c.category === activeFilter).length
  }, [companies, activeFilter])

  // Pagination
  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE))
  const safePage = Math.min(currentPage, totalPages)
  const paginated = filtered.slice((safePage - 1) * PAGE_SIZE, safePage * PAGE_SIZE)

  return (
    <>
      <Navbar />

      <section className="pt-32 pb-36 bg-[#f8fafc] relative" id="companies">

        {/* Decorative background */}
        <div className="absolute -top-32 -right-32 w-[600px] h-[600px] rounded-full bg-primary/8 blur-2xl pointer-events-none" />
        <div className="absolute -top-24 -right-24 w-[450px] h-[450px] rounded-full border-[55px] border-primary/8 pointer-events-none" />
        <div className="absolute -bottom-32 -left-32 w-[500px] h-[500px] rounded-full bg-accent/8 blur-2xl pointer-events-none" />
        <div className="absolute -bottom-20 -left-20 w-[350px] h-[350px] rounded-full border-[45px] border-accent/10 pointer-events-none" />
        <div className="absolute inset-y-0 left-0 w-32 pointer-events-none" style={{
          backgroundImage: "radial-gradient(circle, rgba(0,194,203,0.2) 1.5px, transparent 1.5px)",
          backgroundSize: "20px 20px",
        }} />
        <div className="absolute top-20 left-[8%] text-accent/15 text-8xl font-bold pointer-events-none select-none leading-none">+</div>
        <div className="absolute bottom-28 right-[6%] text-primary/10 text-7xl font-bold pointer-events-none select-none leading-none">+</div>
        <div className="absolute top-1/2 right-[3%] text-accent/12 text-6xl font-bold pointer-events-none select-none leading-none">×</div>
        <div className="absolute top-[30%] left-[3%] text-primary/8 text-5xl font-bold pointer-events-none select-none leading-none">◦</div>
        <div className="absolute right-[3%] top-1/3 flex flex-col gap-3 pointer-events-none">
          {[80, 50, 100, 60, 90, 40].map((w, i) => (
            <div key={i} className="h-[3px] bg-primary/15 rounded-full" style={{ width: `${w}px` }} />
          ))}
        </div>

        <div className="max-w-350 mx-auto px-[5%] relative z-[2]">
          {/* Header */}
          <ScrollReveal className="text-center max-w-175 mx-auto mb-12">
            <div className="inline-flex items-center gap-3 text-accent font-semibold text-[0.9rem] tracking-widest uppercase mb-4 before:content-[''] before:w-10 before:h-0.5 before:bg-accent before:block">
              GMS Program
            </div>
            <h2 className="font-display text-3xl md:text-[3rem] font-extrabold text-primary mb-4 leading-[1.2]">
              {t("featured")}
            </h2>
            <p className="text-text-light text-lg mb-6">{t("discover")}</p>

            {/* Search */}
            <div className="relative max-w-md mx-auto">
              <i className="fas fa-search absolute left-4 top-1/2 -translate-y-1/2 text-text-muted" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search companies..."
                className="w-full pl-11 pr-4 py-3 border-2 border-gray-200 rounded-full text-sm focus:outline-none focus:border-accent transition-all"
              />
            </div>
          </ScrollReveal>

          {/* Year Filter — includes "All Years" */}
          {!loading && availableYears.length > 0 && (
            <ScrollReveal className="flex justify-center gap-2 flex-wrap mb-6">
              <button
                onClick={() => setSelectedYear(null)}
                className={`px-5 py-2.5 border-2 rounded-full text-[0.85rem] font-semibold cursor-pointer transition-all duration-300 ${
                  selectedYear === null
                    ? "bg-accent border-accent text-primary"
                    : "bg-white border-gray-200 text-text-light hover:border-accent hover:text-primary"
                }`}
              >
                All Years
              </button>
              {availableYears.map((year) => (
                <button
                  key={year}
                  onClick={() => setSelectedYear(year)}
                  className={`px-5 py-2.5 border-2 rounded-full text-[0.85rem] font-semibold cursor-pointer transition-all duration-300 ${
                    selectedYear === year
                      ? "bg-accent border-accent text-primary"
                      : "bg-white border-gray-200 text-text-light hover:border-accent hover:text-primary"
                  }`}
                >
                  {year}
                </button>
              ))}
            </ScrollReveal>
          )}

          {/* Category Filter */}
          {!loading && categories.length > 1 && (
            <ScrollReveal className="flex justify-center gap-2 flex-wrap mb-10">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveFilter(cat)}
                  className={`px-5 py-2.5 border-2 rounded-full text-[0.85rem] font-semibold cursor-pointer transition-all duration-300 ${
                    activeFilter === cat
                      ? "bg-primary border-primary text-white"
                      : "bg-white border-gray-200 text-text-light hover:border-primary hover:text-primary"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </ScrollReveal>
          )}

          {/* Cards */}
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...Array(9)].map((_, i) => (
                <div
                  key={i}
                  className="bg-white rounded-[20px] p-8 border border-gray-100 animate-pulse"
                >
                  <div className="w-full h-40 bg-gray-200 rounded-2xl mb-6" />
                  <div className="h-5 bg-gray-200 rounded mb-3 w-3/4" />
                  <div className="h-4 bg-gray-100 rounded mb-2 w-1/3" />
                  <div className="h-4 bg-gray-100 rounded w-full" />
                </div>
              ))}
            </div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-20 text-text-light">
              <i className="fas fa-building text-5xl mb-5 opacity-20" />
              <p className="text-lg">No companies found.</p>
              {search && (
                <button
                  onClick={() => setSearch("")}
                  className="mt-4 text-accent underline text-sm cursor-pointer"
                >
                  Clear search
                </button>
              )}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {paginated.map((company) => (
                <ScrollReveal key={company.id}>
                  <div className="bg-white rounded-[20px] p-8 transition-all duration-400 ease-in-out border border-gray-100 relative overflow-hidden group hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(0,0,0,0.1)] before:content-[''] before:absolute before:top-0 before:left-0 before:right-0 before:h-1 before:bg-linear-to-r before:from-accent before:to-[#00a8b0] before:scale-x-0 before:transition-transform before:duration-400 hover:before:scale-x-100 h-full flex flex-col">
                    {/* Photo or initials */}
                    {company.gbc_companies_photos?.[0]?.photo_url ? (
                      <div className="w-full h-44 rounded-2xl overflow-hidden mb-6 shrink-0">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={company.gbc_companies_photos[0].photo_url}
                          alt={company.name ?? ""}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ) : (
                      <div className="w-20 h-20 bg-[#f9fafb] rounded-2xl flex items-center justify-center mb-6 font-display font-bold text-[0.75rem] text-primary text-center p-2 shrink-0">
                        {(company.name ?? "?").split(" ").slice(0, 2).join(" ")}
                      </div>
                    )}

                    <h4 className="text-lg font-bold text-text mb-2">
                      {company.name}
                    </h4>

                    {company.category && (
                      <span className="inline-block bg-accent/10 text-primary-light px-3.5 py-1.5 rounded-[20px] text-[0.75rem] font-semibold mb-4 w-fit">
                        {company.category}
                      </span>
                    )}

                    {(company.description_id || company.description_en) && (
                      <p className="text-[0.9rem] text-text-light leading-[1.7] mb-6 flex-1 line-clamp-3">
                        {language === "en"
                          ? company.description_en || company.description_id
                          : company.description_id || company.description_en}
                      </p>
                    )}

                    <Link
                      href={`/companies/${company.id}`}
                      className="inline-flex items-center gap-2 text-primary font-semibold text-[0.9rem] transition-all duration-300 hover:gap-3 mt-auto"
                    >
                      {t("viewDetails")} <i className="fas fa-arrow-right" />
                    </Link>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          )}

          {/* Bottom bar: count + pagination */}
          {!loading && filtered.length > 0 && (
            <div className="mt-12 flex flex-col sm:flex-row items-center justify-between gap-4">
              {/* Count label */}
              <p className="text-text-muted text-sm">
                {selectedYear && (
                  <>
                    <span className="font-semibold text-primary">{selectedYear}</span>
                    {" • "}
                  </>
                )}
                Showing{" "}
                <span className="font-semibold text-text">{paginated.length}</span>
                {" "}of{" "}
                <span className="font-semibold text-text">{categoryTotal}</span>
                {" "}companies
                {activeFilter !== "All" && (
                  <span className="text-text-muted/70"> in {activeFilter}</span>
                )}
              </p>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex items-center gap-1.5">
                  {/* Prev */}
                  <button
                    onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                    disabled={safePage === 1}
                    className="w-9 h-9 flex items-center justify-center rounded-full border-2 border-gray-200 text-text-light text-sm transition-all duration-200 hover:border-primary hover:text-primary disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
                    aria-label="Previous page"
                  >
                    <i className="fas fa-chevron-left text-xs" />
                  </button>

                  {/* Page numbers with ellipsis */}
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => {
                    const isActive = page === safePage
                    const show =
                      page === 1 ||
                      page === totalPages ||
                      Math.abs(page - safePage) <= 1

                    if (!show) {
                      if (page === 2 || page === totalPages - 1) {
                        return (
                          <span
                            key={page}
                            className="w-9 h-9 flex items-center justify-center text-text-muted text-sm select-none"
                          >
                            …
                          </span>
                        )
                      }
                      return null
                    }

                    return (
                      <button
                        key={page}
                        onClick={() => setCurrentPage(page)}
                        className={`w-9 h-9 flex items-center justify-center rounded-full border-2 text-sm font-semibold transition-all duration-200 cursor-pointer ${
                          isActive
                            ? "bg-primary border-primary text-white shadow-md"
                            : "border-gray-200 text-text-light hover:border-primary hover:text-primary"
                        }`}
                        aria-label={`Page ${page}`}
                        aria-current={isActive ? "page" : undefined}
                      >
                        {page}
                      </button>
                    )
                  })}

                  {/* Next */}
                  <button
                    onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                    disabled={safePage === totalPages}
                    className="w-9 h-9 flex items-center justify-center rounded-full border-2 border-gray-200 text-text-light text-sm transition-all duration-200 hover:border-primary hover:text-primary disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
                    aria-label="Next page"
                  >
                    <i className="fas fa-chevron-right text-xs" />
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </section>

      <Footer />
    </>
  )
}
