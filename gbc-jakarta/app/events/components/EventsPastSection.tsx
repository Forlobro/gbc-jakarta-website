"use client"

import { useEffect, useMemo, useState } from "react"
import { useTranslation } from "../../lib/LanguageContext"
import ScrollReveal from "../../components/ScrollReveal"
import SectionBadge from "../../components/SectionBadge"
import ContentCard from "../../components/ContentCard"
import SearchBar from "../../components/SearchBar"
import FilterPills from "../../components/FilterPills"
import Pagination from "../../components/Pagination"
import type { GbcEventWithPhotos } from "../../lib/supabase"
import { formatDate } from "../../lib/date"

const PAGE_SIZE = 9

function SkeletonCard() {
  return (
    <div className="animate-pulse bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 h-full flex flex-col">
      <div className="h-48 bg-gray-200" />
      <div className="p-6 flex flex-col gap-3 flex-1">
        <div className="h-3 w-32 bg-gray-200 rounded" />
        <div className="h-5 w-3/4 bg-gray-200 rounded" />
        <div className="h-3 w-full bg-gray-200 rounded" />
        <div className="h-3 w-5/6 bg-gray-200 rounded" />
        <div className="h-3 w-2/3 bg-gray-200 rounded" />
        <div className="h-4 w-24 bg-gray-200 rounded mt-auto" />
      </div>
    </div>
  )
}

export default function EventsPastSection() {
  const { t, language } = useTranslation()
  const [allEvents, setAllEvents] = useState<GbcEventWithPhotos[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState("")
  const [activeYear, setActiveYear] = useState("all")
  const [currentPage, setCurrentPage] = useState(1)

  useEffect(() => {
    async function fetchEvents() {
      try {
        const res = await fetch("/api/events")
        if (!res.ok) {
          console.error("[EventsPastSection] API error:", res.status, await res.text())
          return
        }
        const data: GbcEventWithPhotos[] = await res.json()
        console.log("[EventsPastSection] Total events from API:", data.length)
        console.log(
          "[EventsPastSection] Statuses:",
          data.map((e) => e.status),
        )
        const accomplished = data.filter((e) => e.status === "accomplished")
        console.log("[EventsPastSection] Accomplished events:", accomplished.length)
        setAllEvents(accomplished)
      } catch (err) {
        console.error("[EventsPastSection] Fetch error:", err)
      } finally {
        setLoading(false)
      }
    }
    fetchEvents()
  }, [])

  // Extract unique years from event_start — slice raw string to avoid UTC shift
  const yearItems = useMemo(() => {
    const years = Array.from(
      new Set(
        allEvents
          .map((e) => (e.event_start ? e.event_start.slice(0, 4) : null))
          .filter(Boolean) as string[],
      ),
    ).sort((a, b) => Number(a) - Number(b))

    return [{ key: "all", label: t("all") }, ...years.map((y) => ({ key: y, label: y }))]
  }, [allEvents, t])

  // Filter by search and year
  const filtered = useMemo(() => {
    const q = search.toLowerCase()
    return allEvents.filter((e) => {
      const matchesSearch =
        !q ||
        e.title.toLowerCase().includes(q) ||
        e.location.toLowerCase().includes(q) ||
        e.venue.toLowerCase().includes(q)

      const matchesYear =
        activeYear === "all" || (e.event_start ? e.event_start.slice(0, 4) === activeYear : false)

      return matchesSearch && matchesYear
    })
  }, [allEvents, search, activeYear])

  // Reset to page 1 when filters change
  useEffect(() => {
    setCurrentPage(1)
  }, [search, activeYear])

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE)
  const paginated = filtered.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE)

  // Total events in the active year (ignoring search), for accurate count label
  const yearTotal = useMemo(() => {
    if (activeYear === "all") return allEvents.length
    return allEvents.filter((e) => e.event_start && e.event_start.slice(0, 4) === activeYear).length
  }, [allEvents, activeYear])

  return (
    <section className="py-24 relative" id="events-past">
      <div className="max-w-[1400px] mx-auto px-[5%] relative z-[2]">
        <ScrollReveal className="text-center max-w-[600px] mx-auto mb-14">
          <SectionBadge centered>{t("eventsPastTag")}</SectionBadge>
          <h2 className="font-display text-3xl md:text-4xl font-extrabold text-primary leading-[1.2]">
            {t("eventsPastTitle")}
          </h2>
        </ScrollReveal>

        {/* Search + Filter */}
        {!loading && allEvents.length > 0 && (
          <div className="flex flex-col items-center gap-4 mb-10 w-full overflow-hidden">
            <SearchBar
              value={search}
              onChange={setSearch}
              placeholder={language === "id" ? "Cari event..." : "Search events..."}
              maxWidth="max-w-lg w-full"
            />
            {yearItems.length > 1 && (
              <div className="w-full">
                <FilterPills
                  items={yearItems}
                  activeKey={activeYear}
                  onSelect={(key) => setActiveYear(key)}
                />
              </div>
            )}
          </div>
        )}

        {/* Grid */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {Array.from({ length: 9 }).map((_, i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-text-light text-lg mb-4">
              {language === "id" ? "Tidak ada event ditemukan." : "No events found."}
            </p>
            {(search || activeYear !== "all") && (
              <button
                onClick={() => {
                  setSearch("")
                  setActiveYear("all")
                }}
                className="text-accent font-semibold hover:underline"
              >
                {t("clearSearch")}
              </button>
            )}
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-10">
              {paginated.map((event) => {
                const photoUrl = event.thumbnail_url || undefined
                const description =
                  language === "id"
                    ? event.description_id || event.description_en
                    : event.description_en || event.description_id
                return (
                  <ScrollReveal key={event.id}>
                    <ContentCard
                      href={`/events/${event.id}`}
                      image={photoUrl}
                      logoUrl={photoUrl ? undefined : null}
                      logoFallback={event.title}
                      year={
                        event.event_start ? new Date(event.event_start).getFullYear() : undefined
                      }
                      meta={[
                        { icon: "far fa-calendar-alt", text: formatDate(event.event_start) },
                        { icon: "fas fa-map-marker-alt", text: event.location },
                      ]}
                      title={event.title}
                      description={description}
                      ctaLabel={t("viewDetails")}
                    />
                  </ScrollReveal>
                )
              })}
            </div>

            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
              countLabel={
                <>
                  {t("showing")}{" "}
                  <strong className="font-semibold text-text">{paginated.length}</strong> {t("of")}{" "}
                  <strong className="font-semibold text-text">{yearTotal}</strong> {t("events")}
                  {activeYear !== "all" && (
                    <span className="text-text-muted/70"> · {activeYear}</span>
                  )}
                </>
              }
            />
          </>
        )}
      </div>
    </section>
  )
}
