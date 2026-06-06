"use client"

import { useEffect, useState, use, useCallback } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import EventForm, { EventFormData } from "../../components/EventForm"
import EventPhotoManager from "../../components/PhotoManager"
import ThumbnailManager from "../../components/ThumbnailManager"
import AlertBanner from "../../../components/AlertBanner"
import { GbcEventWithPhotos } from "../../../../lib/supabase"

export const dynamic = "force-dynamic"

export default function AdminEditEventPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const [event, setEvent] = useState<GbcEventWithPhotos | null>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [pageError, setPageError] = useState<string | null>(null)
  const router = useRouter()

  const fetchEvent = useCallback(() => {
    fetch(`/api/admin/events/${id}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          setPageError("Event not found")
          router.push("/admin/events")
          return
        }
        setEvent(data)
      })
      .finally(() => setLoading(false))
  }, [id, router])

  useEffect(() => {
    fetchEvent()
  }, [fetchEvent])

  const handleSubmit = async (data: EventFormData) => {
    setSaving(true)
    setPageError(null)
    try {
      const res = await fetch(`/api/admin/events/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })

      if (!res.ok) {
        const err = await res.json()
        setPageError(err.error || "Update failed")
        return
      }

      router.push("/admin/events")
    } catch {
      setPageError("Failed to update. Please try again.")
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-24">
        <i className="fas fa-spinner fa-spin text-2xl text-accent" />
      </div>
    )
  }

  if (!event) return null

  return (
    <div>
      <div className="mb-8">
        <Link
          href="/admin/events"
          className="inline-flex items-center gap-2 text-slate-500 hover:text-slate-900 text-sm mb-4 transition-colors"
        >
          <i className="fas fa-arrow-left" /> Back to Events
        </Link>
        <h1 className="text-2xl font-bold text-slate-900">{event.title}</h1>
      </div>

      {pageError && (
        <div className="mb-6">
          <AlertBanner message={pageError} onDismiss={() => setPageError(null)} />
        </div>
      )}

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 items-start xl:items-stretch">
        {/* Event Form */}
        <div className="bg-white border border-slate-200 shadow-sm rounded-2xl p-4 sm:p-8 flex flex-col h-full">
          <h2 className="text-lg font-bold text-slate-900 mb-6 flex items-center gap-2">
            <i className="far fa-edit text-accent" /> Event Details
          </h2>
          <EventForm
            initialData={{
              title: event.title,
              location: event.location,
              venue: event.venue,
              description_en: event.description_en,
              description_id: event.description_id,
              status: event.status,
              is_published: event.is_published,
              link_video_1: event.link_video_1 || "",
              link_video_2: event.link_video_2 || "",
              event_start: event.event_start || "",
              event_end: event.event_end || "",
            }}
            onSubmit={handleSubmit}
            submitLabel="Update Event"
            loading={saving}
          />
        </div>

        {/* Right column: Thumbnail + Photos */}
        <div className="flex flex-col gap-8 h-full">
          {/* Thumbnail Manager */}
          <div className="bg-white border border-slate-200 shadow-sm rounded-2xl p-4 sm:p-8">
            <ThumbnailManager
              eventId={event.id}
              thumbnailUrl={event.thumbnail_url}
              onThumbnailChange={fetchEvent}
            />
          </div>

          {/* Photo Manager — flex-1 fills remaining height */}
          <div className="bg-white border border-slate-200 shadow-sm rounded-2xl p-4 sm:p-8 flex flex-col flex-1">
            <EventPhotoManager
              eventId={event.id}
              photos={event.gbc_events_photos || []}
              onPhotosChange={fetchEvent}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
