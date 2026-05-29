"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { useTranslation } from "../../lib/LanguageContext"
import ScrollReveal from "../../components/ScrollReveal"
import StatusBadge from "../../components/StatusBadge"
import type { GbcEventWithPhotos } from "../../lib/supabase"
import { formatDate } from "../../lib/date"

const FALLBACK_IMAGE = "/images/gbc-hero.jpeg"

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
  const [accomplishedEvents, setAccomplishedEvents] = useState<GbcEventWithPhotos[]>([])
  const [loading, setLoading] = useState(true)
  const [upcomingSliderIndex, setUpcomingSliderIndex] = useState(0)
  const [sliderIndex, setSliderIndex] = useState(0)

  useEffect(() => {
    async function fetchEvents() {
      try {
        const res = await fetch("/api/events")
        if (!res.ok) return
        const data: GbcEventWithPhotos[] = await res.json()

        const upcoming = data
          .filter((e) => e.status === "upcoming")
          .sort((a, b) => {
            if (!a.event_start) return 1
            if (!b.event_start) return -1
            return new Date(a.event_start).getTime() - new Date(b.event_start).getTime()
          })
          .slice(0, 3)

        const accomplished = data
          .filter((e) => e.status === "accomplished")
          .sort((a, b) => {
            if (!a.event_start) return 1
            if (!b.event_start) return -1
            return new Date(b.event_start).getTime() - new Date(a.event_start).getTime()
          })

        setUpcomingEvents(upcoming)
        setAccomplishedEvents(accomplished)
      } catch {
        // silently fail
      } finally {
        setLoading(false)
      }
    }
    fetchEvents()
  }, [])

  const prevUpcoming = () => setUpcomingSliderIndex((i) => Math.max(0, i - 1))
  const nextUpcoming = () => setUpcomingSliderIndex((i) => Math.min(upcomingEvents.length - 1, i + 1))

  const prevSlide = () => setSliderIndex((i) => Math.max(0, i - 1))
  const nextSlide = () => setSliderIndex((i) => Math.min(accomplishedEvents.length - 1, i + 1))

  const hasUpcoming = upcomingEvents.length > 0
  const hasAccomplished = accomplishedEvents.length > 0

  if (!loading && !hasUpcoming && !hasAccomplished) return null

  return (
    <section className="py-24 relative" id="events-featured">
      <div className="max-w-[1400px] mx-auto px-[5%] relative z-[2]">
        {loading ? (
          <FeaturedSkeleton />
        ) : (
          <div className="flex flex-col gap-16">

            {/* Upcoming events slider */}
            {hasUpcoming && (() => {
              const event = upcomingEvents[upcomingSliderIndex]
              const image = event.gbc_events_photos[0]?.photo_url ?? FALLBACK_IMAGE
              const description = language === "id" ? event.description_id : event.description_en
              return (
                <ScrollReveal key={event.id}>
                  <div className="mb-6 flex items-end justify-between flex-wrap gap-4">
                    <div>
                      <h2 className="font-display text-3xl md:text-4xl font-extrabold text-primary leading-[1.2]">
                        {t("eventsUpcomingLabel")}
                      </h2>
                    </div>
                    {upcomingEvents.length > 1 && (
                      <div className="flex items-center gap-3 pb-1">
                        <button
                          onClick={prevUpcoming}
                          disabled={upcomingSliderIndex === 0}
                          className="w-11 h-11 rounded-full border-2 border-primary/20 flex items-center justify-center text-primary transition-all duration-300 hover:bg-primary hover:text-white hover:border-primary disabled:opacity-30 disabled:cursor-not-allowed"
                        >
                          <i className="fas fa-chevron-left text-sm" />
                        </button>
                        <span className="text-sm text-text-light font-medium">
                          {upcomingSliderIndex + 1} / {upcomingEvents.length}
                        </span>
                        <button
                          onClick={nextUpcoming}
                          disabled={upcomingSliderIndex === upcomingEvents.length - 1}
                          className="w-11 h-11 rounded-full border-2 border-primary/20 flex items-center justify-center text-primary transition-all duration-300 hover:bg-primary hover:text-white hover:border-primary disabled:opacity-30 disabled:cursor-not-allowed"
                        >
                          <i className="fas fa-chevron-right text-sm" />
                        </button>
                      </div>
                    )}
                  </div>

                  <div
                    className={`grid grid-cols-5 md:mx-[5%] lg:mx-[10%] gap-0 rounded-3xl overflow-hidden shadow-lg ${upcomingSliderIndex % 2 === 1 ? "[direction:rtl]" : ""} transition-all duration-500`}
                  >
                    {/* Image */}
                    <div
                      className="col-span-2 h-auto min-h-[140px] sm:min-h-[280px] md:min-h-[360px] lg:min-h-[450px] bg-cover bg-center"
                      style={{ backgroundImage: `url('${image}')`, direction: "ltr" }}
                    />

                    {/* Content */}
                    <div
                      className="p-3 sm:p-6 md:p-8 lg:p-10 col-span-3 flex flex-col justify-center"
                      style={{ backgroundColor: "#0f2847", direction: "ltr" }}
                    >
                      <h3 className="font-display text-xs sm:text-lg md:text-xl lg:text-2xl font-extrabold leading-[1.2] mb-1 sm:mb-2 lg:mb-3 text-white">
                        {event.title}
                      </h3>

                      <div className="flex flex-col gap-0.5 sm:gap-1 text-[0.6rem] sm:text-[0.75rem] md:text-[0.85rem] mb-2 sm:mb-4 lg:mb-5 text-white/60">
                        <span>
                          <i className="far fa-calendar-alt mr-2" />
                          {formatDate(event.event_start)}
                        </span>
                        <span>
                          <i className="fas fa-map-marker-alt mr-2" />
                          {event.location}
                        </span>
                      </div>

                      <p className="text-[0.65rem] sm:text-[0.8rem] md:text-sm lg:text-[0.95rem] leading-[1.3] sm:leading-[1.6] lg:leading-[1.8] mb-3 sm:mb-5 lg:mb-7 text-justify text-white/75 line-clamp-3 sm:line-clamp-none">
                        {description}
                      </p>

                      <Link
                        href={`/events/${event.id}`}
                        className="w-fit inline-flex items-center gap-1 sm:gap-2 text-[0.6rem] sm:text-xs lg:text-sm font-semibold transition-all duration-300 hover:-translate-y-0.5 hover:gap-3 px-3 py-1.5 sm:px-5 sm:py-2.5 lg:px-7 lg:py-3.5 text-accent bg-accent/50 rounded-full border-2 border-accent shadow-[0_4px_20px_rgba(0,194,203,0.4)] hover:bg-accent hover:text-primary"
                      >
                        {t("eventsUpcomingCta")} <i className="fas fa-arrow-right text-xs" />
                      </Link>
                    </div>
                  </div>
                </ScrollReveal>
              )
            })()}

            {/* Recent Highlights slider */}
            {hasAccomplished &&
              (() => {
                const event = accomplishedEvents[sliderIndex]
                const image = event.gbc_events_photos[0]?.photo_url ?? FALLBACK_IMAGE
                const description = language === "id" ? event.description_id : event.description_en
                return (
                  <ScrollReveal key={event.id}>
                    <div className="mb-6 flex items-end justify-between flex-wrap gap-4">
                      <div>
                        <h2 className="font-display text-3xl md:text-4xl font-extrabold text-primary leading-[1.2]">
                          {t("eventsLatestLabel")}
                        </h2>
                      </div>
                      {accomplishedEvents.length > 1 && (
                        <div className="flex items-center gap-3 pb-1">
                          <button
                            onClick={prevSlide}
                            disabled={sliderIndex === 0}
                            className="w-11 h-11 rounded-full border-2 border-primary/20 flex items-center justify-center text-primary transition-all duration-300 hover:bg-primary hover:text-white hover:border-primary disabled:opacity-30 disabled:cursor-not-allowed"
                          >
                            <i className="fas fa-chevron-left text-sm" />
                          </button>
                          <span className="text-sm text-text-light font-medium">
                            {sliderIndex + 1} / {accomplishedEvents.length}
                          </span>
                          <button
                            onClick={nextSlide}
                            disabled={sliderIndex === accomplishedEvents.length - 1}
                            className="w-11 h-11 rounded-full border-2 border-primary/20 flex items-center justify-center text-primary transition-all duration-300 hover:bg-primary hover:text-white hover:border-primary disabled:opacity-30 disabled:cursor-not-allowed"
                          >
                            <i className="fas fa-chevron-right text-sm" />
                          </button>
                        </div>
                      )}
                    </div>

                  <div className="grid grid-cols-5 md:mx-[5%] lg:mx-[10%] gap-0 rounded-3xl overflow-hidden shadow-lg [direction:rtl] transition-all duration-500">
                    <div
                      className="col-span-2 h-auto min-h-[140px] sm:min-h-[280px] md:min-h-[360px] lg:min-h-[520px] bg-cover bg-center"
                      style={{ backgroundImage: `url('${image}')`, direction: "ltr" }}
                    />
                    <div
                      className="p-3 sm:p-6 md:p-8 lg:p-14 col-span-3 flex flex-col justify-center"
                      style={{ backgroundColor: "#f8fafc", direction: "ltr" }}
                    >
                      <h3 className="font-display text-xs sm:text-lg md:text-2xl lg:text-3xl xl:text-4xl font-extrabold leading-[1.2] mb-1 sm:mb-3 lg:mb-4 text-primary">
                        {event.title}
                      </h3>
                      <div className="flex flex-col gap-0.5 sm:gap-1 text-[0.6rem] sm:text-[0.75rem] md:text-[0.85rem] lg:text-[1rem] mb-2 sm:mb-4 lg:mb-6 text-text-light">
                        <span><i className="far fa-calendar-alt mr-2" />{formatDate(event.event_start)}</span>
                        <span><i className="fas fa-map-marker-alt mr-2" />{event.location}</span>
                      </div>
                      <p className="text-[0.65rem] sm:text-[0.8rem] md:text-sm lg:text-[1.05rem] leading-[1.3] sm:leading-[1.6] lg:leading-[1.9] mb-3 sm:mb-6 lg:mb-8 text-justify text-text-light line-clamp-3 sm:line-clamp-none">
                        {description}
                      </p>
                      <Link
                        href={`/events/${event.id}`}
                        className="w-fit inline-flex items-center gap-1 sm:gap-2 text-[0.6rem] sm:text-xs lg:text-sm font-semibold transition-all duration-300 hover:-translate-y-0.5 hover:gap-3 text-primary"
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