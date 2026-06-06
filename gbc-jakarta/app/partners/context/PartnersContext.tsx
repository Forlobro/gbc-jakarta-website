"use client"

import { createContext, useContext, useEffect, useMemo, useState } from "react"
import { GbcCompanyWithPhotos, GbcCompanyCategory } from "../../lib/supabase"

export const PAGE_SIZE = 9

export function getYear(dateValue: string | null | undefined): number | null {
  if (!dateValue) return null
  const match = dateValue.match(/^(\d{4})/)
  if (!match) return null
  const year = Number(match[1])
  return Number.isNaN(year) ? null : year
}

/**
 * Returns the single year a company belongs to, derived from start_date only.
 * Using start_date exclusively ensures each company appears in exactly one year bucket.
 */
export function getCompanyYear(company: GbcCompanyWithPhotos): number | null {
  return getYear(company.start_date)
}

interface PartnersContextValue {
  companies: GbcCompanyWithPhotos[]
  setCompanies: React.Dispatch<React.SetStateAction<GbcCompanyWithPhotos[]>>
  categories: GbcCompanyCategory[]
  setCategories: React.Dispatch<React.SetStateAction<GbcCompanyCategory[]>>
  loading: boolean
  setLoading: React.Dispatch<React.SetStateAction<boolean>>
  search: string
  setSearch: React.Dispatch<React.SetStateAction<string>>
  activeFilter: string
  setActiveFilter: React.Dispatch<React.SetStateAction<string>>
  selectedYear: number | null
  setSelectedYear: React.Dispatch<React.SetStateAction<number | null>>
  currentPage: number
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>
  // Computed
  filtered: GbcCompanyWithPhotos[]
  paginated: GbcCompanyWithPhotos[]
  availableYears: number[]
  categoryNames: string[]
  categoryTotal: number
  totalPages: number
  safePage: number
}

const PartnersContext = createContext<PartnersContextValue | null>(null)

export function usePartners(): PartnersContextValue {
  const ctx = useContext(PartnersContext)
  if (!ctx) throw new Error("usePartners must be used within PartnersProvider")
  return ctx
}

export function PartnersProvider({ children }: { children: React.ReactNode }) {
  const [companies, setCompanies] = useState<GbcCompanyWithPhotos[]>([])
  const [categories, setCategories] = useState<GbcCompanyCategory[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState("")
  const [activeFilter, setActiveFilter] = useState("All")
  const [selectedYear, setSelectedYear] = useState<number | null>(null)
  const [currentPage, setCurrentPage] = useState(1)

  useEffect(() => {
    async function loadPartners() {
      try {
        const r = await fetch("/api/partners")
        const data = await r.json()
        if (Array.isArray(data)) {
          // Preload all logo images before hiding skeleton
          const allLogos = data
            .map((c: GbcCompanyWithPhotos) => c.logo_url)
            .filter(Boolean) as string[]

          await Promise.all(
            allLogos.map(
              (url) =>
                new Promise<void>((resolve) => {
                  const img = new window.Image()
                  img.onload = () => resolve()
                  img.onerror = () => resolve()
                  img.src = url
                }),
            ),
          )

          setCompanies(data)
          setSelectedYear((prev) => prev ?? null)
        }
      } catch {
        // silently fail
      } finally {
        setLoading(false)
      }
    }
    loadPartners()
  }, [])

  useEffect(() => {
    fetch("/api/partners-categories")
      .then((r) => r.json())
      .then((data) => {
        if (Array.isArray(data)) setCategories(data)
      })
  }, [])

  const categoryNames = ["All", ...categories.map((c) => c.name)]

  const availableYears = useMemo(() => {
    const years = new Set<number>()
    for (const company of companies) {
      const year = getCompanyYear(company)
      if (year !== null) years.add(year)
    }
    return Array.from(years).sort((a, b) => a - b)
  }, [companies])

  const filtered = companies.filter((c) => {
    const companyYear = getCompanyYear(c)
    const matchesYear = selectedYear === null || companyYear === selectedYear
    const matchesSearch =
      (c.name ?? "").toLowerCase().includes(search.toLowerCase()) ||
      (c.category ?? "").toLowerCase().includes(search.toLowerCase()) ||
      (c.description_id ?? "").toLowerCase().includes(search.toLowerCase()) ||
      (c.description_en ?? "").toLowerCase().includes(search.toLowerCase())
    const matchesFilter = activeFilter === "All" || c.category === activeFilter
    return matchesYear && matchesSearch && matchesFilter
  })

  const categoryTotal = useMemo(() => {
    // Count respects both year and category filters (but not search)
    return companies.filter((c) => {
      const companyYear = getCompanyYear(c)
      const matchesYear = selectedYear === null || companyYear === selectedYear
      const matchesFilter = activeFilter === "All" || c.category === activeFilter
      return matchesYear && matchesFilter
    }).length
  }, [companies, activeFilter, selectedYear])

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE))
  const safePage = Math.min(currentPage, totalPages)
  const paginated = filtered.slice((safePage - 1) * PAGE_SIZE, safePage * PAGE_SIZE)

  return (
    <PartnersContext.Provider
      value={{
        companies,
        setCompanies,
        categories,
        setCategories,
        loading,
        setLoading,
        search,
        setSearch,
        activeFilter,
        setActiveFilter,
        selectedYear,
        setSelectedYear,
        currentPage,
        setCurrentPage,
        filtered,
        paginated,
        availableYears,
        categoryNames,
        categoryTotal,
        totalPages,
        safePage,
      }}
    >
      {children}
    </PartnersContext.Provider>
  )
}
