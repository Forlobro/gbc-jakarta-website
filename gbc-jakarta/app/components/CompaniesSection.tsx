"use client"

import Link from "next/link"
import { useEffect, useMemo, useState } from "react"
import { useTranslation } from "../lib/LanguageContext"
import ScrollReveal from "./ScrollReveal"
import { GbcCompanyWithPhotos } from "../lib/supabase"

function getCompanyLogoText(name: string | null | undefined) {
  const safeName = (name || "?").trim()
  if (!safeName) return "?"
  return safeName.split(" ").slice(0, 2).join(" ")
}

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
    for (let year = from; year <= to; year += 1) years.push(year)
    return years
  }
  if (startYear) return [startYear]
  if (endYear) return [endYear]
  return []
}

export default function CompaniesSection() {
  const { t } = useTranslation()
  const [companies, setCompanies] = useState<GbcCompanyWithPhotos[]>([])
  const [loading, setLoading] = useState(true)
  const [activeFilter, setActiveFilter] = useState("All")
  const [search, setSearch] = useState("")
  const [selectedYear, setSelectedYear] = useState<number | null>(null)

  useEffect(() => {
    fetch("/api/companies")
      .then((r) => r.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setCompanies(data)
          const years = Array.from(
            new Set(data.flatMap((c: GbcCompanyWithPhotos) => getCoveredYears(c)))
          ).sort((a, b) => b - a)
          setSelectedYear((prev) => prev ?? years[0] ?? null)
        }
      })
      .finally(() => setLoading(false))
  }, [])

  const categories = [
    "All",
    ...Array.from(new Set(companies.map((c) => c.category).filter(Boolean))),
  ] as string[]

  const availableYears = useMemo(() => {
    const years = new Set<number>()
    for (const company of companies) {
      for (const year of getCoveredYears(company)) years.add(year)
    }
    return Array.from(years).sort((a, b) => b - a)
  }, [companies])

  const filtered = companies
    .filter((c) => {
      const years = getCoveredYears(c)
      const matchesYear = selectedYear === null || years.includes(selectedYear)
      const matchesSearch =
        (c.name ?? "").toLowerCase().includes(search.toLowerCase()) ||
        (c.category ?? "").toLowerCase().includes(search.toLowerCase())
      const matchesFilter = activeFilter === "All" || c.category === activeFilter
      return matchesYear && matchesSearch && matchesFilter
    })
    .slice(0, 6)

  return (
    <section
      className="py-36 bg-[#f8fafc] relative overflow-hidden"
      id="companies"
    >
      {/* Wave divider top */}
      <div className="absolute top-0 left-0 right-0 pointer-events-none">
        <svg
          viewBox="0 0 1440 60"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full"
        >
          <path d="M0,30 C360,60 1080,0 1440,30 L1440,0 L0,0 Z" fill="white" />
        </svg>
      </div>

      {/* Large blurred primary circle — top right */}
      <div className="absolute -top-32 -right-32 w-[600px] h-[600px] rounded-full bg-primary/8 blur-2xl pointer-events-none" />

      {/* Bold circle outline — top right */}
      <div className="absolute -top-24 -right-24 w-[450px] h-[450px] rounded-full border-[55px] border-primary/8 pointer-events-none" />

      {/* Large blurred accent — bottom left */}
      <div className="absolute -bottom-32 -left-32 w-[500px] h-[500px] rounded-full bg-accent/8 blur-2xl pointer-events-none" />

      {/* Bold circle outline — bottom left */}
      <div className="absolute -bottom-20 -left-20 w-[350px] h-[350px] rounded-full border-[45px] border-accent/10 pointer-events-none" />

      {/* Dot pattern — left strip */}
      <div
        className="absolute inset-y-0 left-0 w-32 pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(0,194,203,0.2) 1.5px, transparent 1.5px)",
          backgroundSize: "20px 20px",
        }}
      />

      {/* Floating symbols */}
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

      {/* Decorative lines — right side */}
      <div className="absolute right-[3%] top-1/3 flex flex-col gap-3 pointer-events-none">
        {[80, 50, 100, 60, 90, 40].map((w, i) => (
          <div
            key={i}
            className="h-[3px] bg-primary/15 rounded-full"
            style={{ width: `${w}px` }}
          />
        ))}
      </div>

      <div className="max-w-[1400px] mx-auto px-[5%] relative z-[2]">
        {/* Header */}
        <ScrollReveal className="text-center max-w-[700px] mx-auto mb-10">
          <div className="inline-flex items-center gap-3 text-accent font-semibold text-[0.9rem] tracking-[0.1em] uppercase mb-4 before:content-[''] before:w-10 before:h-0.5 before:bg-accent before:block">
            GMS Program
          </div>
          <h2 className="font-display text-3xl md:text-[3rem] font-extrabold text-primary mb-6 leading-[1.2]">
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

        {/* Year Filter */}
        {!loading && availableYears.length > 0 && (
          <ScrollReveal className="flex justify-center gap-2 flex-wrap mb-4">
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

        {/* Category Filter Buttons */}
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
                {cat === "All" ? t("all") : cat}
              </button>
            ))}
          </ScrollReveal>
        )}

        {/* Company Cards Grid */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="bg-white rounded-[20px] p-8 border border-gray-100 animate-pulse"
              >
                <div className="w-20 h-20 bg-gray-200 rounded-2xl mb-6" />
                <div className="h-5 bg-gray-200 rounded mb-3 w-3/4" />
                <div className="h-4 bg-gray-100 rounded mb-2 w-1/3" />
                <div className="h-4 bg-gray-100 rounded mb-1 w-full" />
                <div className="h-4 bg-gray-100 rounded w-4/5" />
              </div>
            ))}
          </div>
        ) : companies.length === 0 ? (
          <div className="text-center py-16 text-text-light">
            <i className="fas fa-building text-4xl mb-4 opacity-30" />
            <p>No companies available yet.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filtered.map((company) => (
              <ScrollReveal key={company.id}>
                <div className="bg-white rounded-[20px] p-8 transition-all duration-400 ease-[cubic-bezier(0.4,0,0.2,1)] border border-gray-100 relative overflow-hidden group hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(0,0,0,0.1)] before:content-[''] before:absolute before:top-0 before:left-0 before:right-0 before:h-1 before:bg-gradient-to-r before:from-accent before:to-[#00a8b0] before:scale-x-0 before:transition-transform before:duration-400 hover:before:scale-x-100">
                  {/* Logo 20x20: image if exists, text if not */}
                  <div className="w-20 h-20 bg-[#f9fafb] rounded-2xl flex items-center justify-center mb-6 overflow-hidden">
                    {company.logo_url ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={company.logo_url}
                        alt={company.name ?? ""}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <span className="font-display font-bold text-[0.75rem] text-primary text-center p-2 leading-tight">
                        {getCompanyLogoText(company.name)}
                      </span>
                    )}
                  </div>

                  <h4 className="text-lg font-bold text-text mb-2">
                    {company.name}
                  </h4>

                  {company.category && (
                    <span className="inline-block bg-accent/10 text-primary-light px-3.5 py-1.5 rounded-[20px] text-[0.75rem] font-semibold mb-4">
                      {company.category}
                    </span>
                  )}

                  {company.description && (
                    <p className="text-[0.9rem] text-text-light leading-[1.7] mb-6 line-clamp-3">
                      {company.description}
                    </p>
                  )}

                  <Link
                    href={`/companies/${company.id}`}
                    className="inline-flex items-center gap-2 text-primary font-semibold text-[0.9rem] transition-all duration-300 hover:gap-3"
                  >
                    {t("viewDetails")} <i className="fas fa-arrow-right" />
                  </Link>
                </div>
              </ScrollReveal>
            ))}
          </div>
        )}

        {/* View All Button */}
        {!loading && companies.length > 0 && (
          <div className="text-center mt-12">
            <Link
              href="/companies"
              className="inline-flex items-center gap-3 px-8 py-4 bg-primary text-white rounded-full font-semibold text-base shadow-[0_4px_20px_rgba(15,40,71,0.3)] transition-all duration-400 hover:bg-primary-light hover:-translate-y-[3px] hover:shadow-[0_8px_30px_rgba(15,40,71,0.4)]"
            >
              <span className="text-white">{t("viewAllCompanies")}</span>{" "}
              <i className="fas fa-arrow-right text-white" />
            </Link>
          </div>
        )}
      </div>
    </section>
  )
}
