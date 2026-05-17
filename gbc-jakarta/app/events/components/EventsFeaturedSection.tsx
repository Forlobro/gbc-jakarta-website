"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { useTranslation } from "../../lib/LanguageContext"
import ScrollReveal from "../../components/ScrollReveal"
import SectionBadge from "../../components/SectionBadge"
import SectionDecor from "../../components/SectionDecor"
import StatusBadge from "../../components/StatusBadge"
import DotPattern from "../../components/DotPattern"
import type { GbcEventWithPhotos } from "../../lib/supabase"

const FALLBACK_IMAGE = "/images/gbc-hero.jpeg"

function formatDate(dateStr: string | null): string {
  if (!dateStr) return "—"
  return new Date(dateStr).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  })
}

function FeaturedSkeleton() {
  return (
    <div className="flex flex-col gap-16">
      {[0, 1].map((i) => (
        <div key={i} className="animate-pulse">
          <div className="h-5 w-32 bg-gray-200 rounded mb-2" />
          <div className="h-8 w-64 bg-gray-200 rounded mb-6" />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 rounded-3xl overflow-hidden shadow-lg">
            <div className="h-64 lg:h-80 bg-gray-200" />
            <div className="p-10 bg-gray-100 flex flex-col gap-4">
              <div className="h-4 w-24 bg-gray-200 rounded-full" />
              <div className="h-7 w-3/4 bg-gray-200 rounded" />
              <div className="h-4 w-40 bg-gray-200 rounded" />
              <div className="h-4 w-32 bg-gray-200 rounded" />
              <div className="h-20 bg-gray-200 rounded" />
              <div className="h-10 w-36 bg-gray-200 rounded-full" />
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default function EventsFeaturedSection() {
  const { t, language } = useTranslation()
  const [upcomingEvents, setUpcomingEvents] = useState<GbcEventWithPhotos[]>([])
  const [latestEvent, setLatestEvent] = useState<GbcEventWithPhotos | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchEvents() {
      try {
        const res = await fetch("/api/events", {
          headers: { "Accept-Language": language === "id" ? "id" : "en" },
        })
        if (!res.ok) return
        const data: GbcEventWithPhotos[] = await res.json()

        // Upcoming: status === "upcoming", sorted by event_start ascending (nearest first), max 3
        const upcoming = data
          .filter((e) => e.status === "upcoming")
          .sort((a, b) => {
            if (!a.event_start) return 1
            if (!b.event_start) return -1
            return new Date(a.event_start).getTime() - new Date(b.event_start).getTime()
          })
          .slice(0, 3)

        // Latest: status === "accomplished", sorted by event_start ascending (oldest first), take 1
        const accomplished = data
          .filter((e) => e.status === "accomplished")
          .sort((a, b) => {
            if (!a.event_start) return 1
            if (!b.event_start) return -1
            return new Date(a.event_start).getTime() - new Date(b.event_start).getTime()
          })

        setUpcomingEvents(upcoming)
        setLatestEvent(accomplished[0] ?? null)
      } catch {
        // silently fail — sections will be hidden
      } finally {
        setLoading(false)
      }
    }
    fetchEvents()
  }, [language])

  const hasUpcoming = upcomingEvents.length > 0
  const hasLatest = latestEvent !== null

  if (!loading && !hasUpcoming && !hasLatest) return null

  return (
    <section className="py-24 relative" id="events-featured">
      <DotPattern />
      {/* Wave divider top — matches header gradient */}
      <div className="absolute top-0 left-0 right-0 pointer-events-none">
        <svg
          viewBox="0 0 1440 60"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full"
        >
          <path d="M0,30 C480,60 960,0 1440,40 L1440,0 L0,0 Z" fill="white" />
        </svg>
      </div>
      <SectionDecor symbols lines />
      <div className="max-w-[1400px] mx-auto px-[5%] relative z-[2]">
        {loading ? (
          <FeaturedSkeleton />
        ) : (
          <div className="flex flex-col gap-16">
            {/* Upcoming events */}
            {hasUpcoming &&
              upcomingEvents.map((event, idx) => {
                const image = event.gbc_events_photos[0]?.photo_url ?? FALLBACK_IMAGE
                const description = language === "id" ? event.description_id : event.description_en
                return (
                  <ScrollReveal key={event.id}>
                    <div className="mb-6">
                      <SectionBadge>{t("eventsFeaturedTag")}</SectionBadge>
                      <h2 className="font-display text-3xl md:text-4xl font-extrabold text-primary leading-[1.2]">
                        {t("eventsUpcomingLabel")}
                      </h2>
                    </div>
                    <div
                      className={`grid grid-cols-1 lg:grid-cols-2 gap-0 rounded-3xl overflow-hidden shadow-lg ${
                        idx % 2 === 1 ? "lg:[direction:rtl]" : ""
                      }`}
                    >
                      {/* Image */}
                      <div
                        className="h-64 lg:h-auto min-h-[280px] bg-cover bg-center"
                        style={{ backgroundImage: `url('${image}')`, direction: "ltr" }}
                      />

                      {/* Content */}
                      <div
                        className="p-10 flex flex-col justify-center"
                        style={{ backgroundColor: "#0f2847", direction: "ltr" }}
                      >
                        <StatusBadge dark>{event.status}</StatusBadge>

                        <h3 className="font-display text-2xl font-extrabold leading-[1.3] mb-3 text-white">
                          {event.title}
                        </h3>

                        <div className="flex flex-col gap-1 text-[0.85rem] mb-5 text-white/60">
                          <span>
                            <i className="far fa-calendar-alt mr-2" />
                            {formatDate(event.event_start)}
                          </span>
                          <span>
                            <i className="fas fa-map-marker-alt mr-2" />
                            {event.location}
                          </span>
                        </div>

                        <p className="text-[0.95rem] leading-[1.8] mb-7 text-justify text-white/75">
                          {description}
                        </p>

                        <Link
                          href={`/events/${event.id}`}
                          className="inline-flex items-center gap-2 text-sm font-semibold transition-all duration-300 hover:-translate-y-0.5 hover:gap-3 px-7 py-3.5 text-accent bg-accent/50 rounded-full border-2 border-accent shadow-[0_4px_20px_rgba(0,194,203,0.4)] hover:bg-accent hover:text-primary"
                        >
                          {t("eventsUpcomingCta")} <i className="fas fa-arrow-right text-xs" />
                        </Link>
                      </div>
                    </div>
                  </ScrollReveal>
                )
              })}

            {/* Latest accomplished event */}
            {hasLatest &&
              (() => {
                const event = latestEvent!
                const image = event.gbc_events_photos[0]?.photo_url ?? FALLBACK_IMAGE
                const description = language === "id" ? event.description_id : event.description_en
                return (
                  <ScrollReveal key={event.id}>
                    <div className="mb-6">
                      <SectionBadge>{t("eventsLatestTag")}</SectionBadge>
                      <h2 className="font-display text-3xl md:text-4xl font-extrabold text-primary leading-[1.2]">
                        {t("eventsLatestLabel")}
                      </h2>
                    </div>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 rounded-3xl overflow-hidden shadow-lg lg:[direction:rtl]">
                      {/* Image */}
                      <div
                        className="h-64 lg:h-auto min-h-[280px] bg-cover bg-center"
                        style={{ backgroundImage: `url('${image}')`, direction: "ltr" }}
                      />

                      {/* Content */}
                      <div
                        className="p-10 flex flex-col justify-center"
                        style={{ backgroundColor: "#f8fafc", direction: "ltr" }}
                      >
                        <StatusBadge dark={false}>{event.status}</StatusBadge>

                        <h3 className="font-display text-2xl font-extrabold leading-[1.3] mb-3 text-primary">
                          {event.title}
                        </h3>

                        <div className="flex flex-col gap-1 text-[0.85rem] mb-5 text-text-light">
                          <span>
                            <i className="far fa-calendar-alt mr-2" />
                            {formatDate(event.event_start)}
                          </span>
                          <span>
                            <i className="fas fa-map-marker-alt mr-2" />
                            {event.location}
                          </span>
                        </div>

                        <p className="text-[0.95rem] leading-[1.8] mb-7 text-justify text-text-light">
                          {description}
                        </p>

                        <Link
                          href={`/events/${event.id}`}
                          className="inline-flex items-center gap-2 text-sm font-semibold transition-all duration-300 hover:-translate-y-0.5 hover:gap-3 text-primary"
                        >
                          {t("eventsLatestCta")} <i className="fas fa-arrow-right text-xs" />
                        </Link>
                      </div>
                    </div>
                  </ScrollReveal>
                )
              })()}
          </div>
        )}
      </div>
    </section>
  )
}
