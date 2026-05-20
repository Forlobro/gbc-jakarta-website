"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import Link from "next/link"
import Navbar from "../../components/Navbar"
import Footer from "../../components/Footer"
import { useTranslation } from "../../lib/LanguageContext"
import type { GbcEventWithPhotos } from "../../lib/supabase"
import HeroDecor from "../../components/HeroDecor"
import EventDetailPageDecor from "../components/EventDetailPageDecor"
import EventDetailsSection from "../components/EventDetailsSection"
import EventRegisterSection from "../components/EventRegisterSection"

function formatDate(dateStr: string | null): string {
  if (!dateStr) return "—"
  return new Date(dateStr).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  })
}

function formatTime(dateStr: string | null): string {
  if (!dateStr) return "—"
  const d = new Date(dateStr)
  const hh = String(d.getHours()).padStart(2, "0")
  const mm = String(d.getMinutes()).padStart(2, "0")
  return `${hh}:${mm} WIB`
}

function EventGallery({ photos, title }: { photos: string[]; title: string }) {
  const [current, setCurrent] = useState(0)

  if (photos.length === 0) return null

  const prev = () => setCurrent((c) => (c === 0 ? photos.length - 1 : c - 1))
  const next = () => setCurrent((c) => (c === photos.length - 1 ? 0 : c + 1))

  return (
    <section className="py-16 relative">
      <div className="max-w-[1400px] mx-auto px-[5%] relative z-[2]">
        <h2 className="font-display text-3xl font-extrabold text-primary mb-10 text-center">
          {title}
        </h2>

        <div className="relative max-w-4xl mx-auto">
          <div className="rounded-2xl overflow-hidden" style={{ aspectRatio: "16/9" }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              key={current}
              src={photos[current]}
              alt={`Gallery ${current + 1}`}
              className="w-full h-full object-cover"
            />
          </div>

          <button
            onClick={prev}
            className="absolute -left-5 top-1/2 -translate-y-1/2 w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-all duration-300"
          >
            <i className="fas fa-chevron-left text-sm" />
          </button>

          <button
            onClick={next}
            className="absolute -right-5 top-1/2 -translate-y-1/2 w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-all duration-300"
          >
            <i className="fas fa-chevron-right text-sm" />
          </button>

          <div className="flex justify-center gap-2 mt-5">
            {photos.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  i === current ? "bg-accent w-6" : "bg-gray-300 w-2"
                }`}
              />
            ))}
          </div>

          <p className="text-center text-text-muted text-sm mt-3">
            {current + 1} / {photos.length}
          </p>
        </div>
      </div>
    </section>
  )
}

function LoadingSkeleton() {
  return (
    <>
      <Navbar />
      <div className="animate-pulse">
        {/* Hero skeleton */}
        <div className="pt-36 pb-20 bg-gray-800">
          <div className="max-w-[1400px] mx-auto px-[5%]">
            <div className="h-4 w-24 bg-gray-600 rounded-full mb-4" />
            <div className="h-10 w-2/3 bg-gray-600 rounded mb-6" />
            <div className="flex gap-6">
              <div className="h-4 w-32 bg-gray-600 rounded" />
              <div className="h-4 w-40 bg-gray-600 rounded" />
            </div>
          </div>
        </div>
        {/* Content skeleton */}
        <div className="py-16 bg-white">
          <div className="max-w-[1400px] mx-auto px-[5%]">
            <div className="max-w-[800px] flex flex-col gap-3">
              <div className="h-7 w-48 bg-gray-200 rounded mb-2" />
              <div className="h-4 w-full bg-gray-200 rounded" />
              <div className="h-4 w-full bg-gray-200 rounded" />
              <div className="h-4 w-5/6 bg-gray-200 rounded" />
              <div className="h-4 w-4/5 bg-gray-200 rounded" />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}

export default function EventDetailPage() {
  const params = useParams()
  const id = params.id as string
  const { t, language } = useTranslation()

  const [event, setEvent] = useState<GbcEventWithPhotos | null>(null)
  const [loading, setLoading] = useState(true)
  const [notFound, setNotFound] = useState(false)

  useEffect(() => {
    async function fetchEvent() {
      setLoading(true)
      setNotFound(false)
      try {
        const res = await fetch(`/api/events/${id}`, {
          headers: { "Accept-Language": language === "id" ? "id" : "en" },
        })
        if (res.status === 404) {
          setNotFound(true)
          return
        }
        if (!res.ok) {
          setNotFound(true)
          return
        }
        const data: GbcEventWithPhotos = await res.json()
        setEvent(data)
      } catch {
        setNotFound(true)
      } finally {
        setLoading(false)
      }
    }
    fetchEvent()
  }, [id, language])

  if (loading) return <LoadingSkeleton />

  if (notFound || !event) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <p className="text-text-light text-lg mb-4">
              {language === "id" ? "Event tidak ditemukan." : "Event not found."}
            </p>
            <Link href="/events" className="text-accent font-semibold hover:underline">
              ← {t("backToEvents")}
            </Link>
          </div>
        </div>
        <Footer />
      </>
    )
  }

  const title = event.title
  const date = formatDate(event.event_start)
  const time = formatTime(event.event_start)
  const location = event.location
  const description =
    language === "id"
      ? event.description_id || event.description_en
      : event.description_en || event.description_id

  const galleryPhotos = event.gbc_events_photos.map((p) => p.photo_url).filter(Boolean) as string[]

  const isUpcoming = event.status === "upcoming"

  return (
    <>
      <Navbar />

      {/* ── Event Hero ── */}
      <section className="pt-36 pb-20 bg-gradient-to-br from-primary via-primary-light to-[#2d5a9e] relative overflow-hidden">
        <HeroDecor />
        <div className="max-w-[1400px] mx-auto px-[5%] relative z-10">
          <span className="inline-block text-[0.75rem] font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-4 bg-accent/20 text-accent">
            {event.venue}
          </span>

          <h1 className="font-display text-4xl md:text-5xl font-extrabold text-white leading-[1.15] mb-6 max-w-[750px]">
            {title}
          </h1>

          <div className="flex flex-wrap gap-6 text-white/70 text-[0.9rem]">
            <span className="flex items-center gap-2">
              <i className="far fa-calendar-alt text-accent" />
              {date}
            </span>
            <span className="flex items-center gap-2">
              <i className="fas fa-map-marker-alt text-accent" />
              {location}
            </span>
          </div>
        </div>
      </section>

      {/* ── Event Detail (description) ── */}
      <main className="relative bg-white overflow-hidden">
        <EventDetailPageDecor />

        <section className="py-16 relative">
          <div className="max-w-[1400px] mx-auto px-[5%] relative z-[2]">
            <div className="max-w-[800px]">
              <h2 className="font-display text-2xl font-extrabold text-primary mb-4">
                {t("aboutThisEvent")}
              </h2>
              <p className="text-text-light text-[1rem] leading-[1.9] text-justify">
                {description}
              </p>
            </div>
          </div>
        </section>

        {/* ── Event Video 1 ── */}
        {event.link_video_1 && (
          <section className="py-16 relative">
            <div className="max-w-[1400px] mx-auto px-[5%] relative z-[2]">
              <h2 className="font-display text-3xl font-extrabold text-primary mb-10 text-center">
                {t("eventVideo")}
              </h2>
              <div className="max-w-4xl mx-auto rounded-2xl overflow-hidden shadow-xl">
                <div className="relative w-full" style={{ paddingTop: "56.25%" }}>
                  <iframe
                    src={event.link_video_1}
                    className="absolute inset-0 w-full h-full"
                    title={title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              </div>
            </div>
          </section>
        )}

        {/* ── Event Video 2 ── */}
        {event.link_video_2 && (
          <section className="py-16 relative">
            <div className="max-w-[1400px] mx-auto px-[5%] relative z-[2]">
              <div className="max-w-4xl mx-auto rounded-2xl overflow-hidden shadow-xl">
                <div className="relative w-full" style={{ paddingTop: "56.25%" }}>
                  <iframe
                    src={event.link_video_2}
                    className="absolute inset-0 w-full h-full"
                    title={`${title} — Video 2`}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              </div>
            </div>
          </section>
        )}

        {/* ── Event Gallery ── */}
        {galleryPhotos.length > 0 && (
          <EventGallery photos={galleryPhotos} title={t("eventGallery")} />
        )}

        {/* ── Upcoming-only sections ── */}
        {isUpcoming && (
          <>
            <EventDetailsSection
              date={date}
              time={time}
              location={location}
              venue={event.venue}
              note={t("upcomingEventDetailsNote")}
            />
            <EventRegisterSection
              title={t("upcomingEventRegisterTitle")}
              description={t("upcomingEventRegisterDesc")}
              ctaLabel={t("upcomingEventRegisterCta")}
            />
          </>
        )}
      </main>

      <Footer />
    </>
  )
}
