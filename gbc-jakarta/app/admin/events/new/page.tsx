"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import EventForm, { EventFormData } from "../components/EventForm"
import AlertBanner from "../components/AlertBanner"

export const dynamic = "force-dynamic"

export default function AdminNewEventPage() {
  const [loading, setLoading] = useState(false)
  const [pageError, setPageError] = useState<string | null>(null)
  const router = useRouter()

  const handleSubmit = async (data: EventFormData) => {
    setLoading(true)
    setPageError(null)
    try {
      const res = await fetch("/api/admin/events", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })

      if (!res.ok) {
        const err = await res.json()
        setPageError(err.error || "Create failed")
        return
      }

      const event = await res.json()
      router.push(`/admin/events/${event.id}/edit`)
    } catch {
      setPageError("Failed to create event. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <div className="mb-8">
        <Link
          href="/admin/events"
          className="inline-flex items-center gap-2 text-slate-500 hover:text-slate-900 text-sm mb-4 transition-colors"
        >
          <i className="fas fa-arrow-left" /> Back to Events
        </Link>
        <h1 className="text-2xl font-bold text-slate-900">Add New Event</h1>
        <p className="text-slate-500 text-sm mt-1">
          Create a new event. You can add photos after saving.
        </p>
      </div>

      {pageError && (
        <div className="max-w-2xl mb-6">
          <AlertBanner message={pageError} onDismiss={() => setPageError(null)} />
        </div>
      )}

      <div className="max-w-2xl bg-white border border-slate-200 rounded-2xl p-4 sm:p-8 shadow-sm flex flex-col">
        <EventForm onSubmit={handleSubmit} submitLabel="Create Event" loading={loading} />
      </div>
    </div>
  )
}
