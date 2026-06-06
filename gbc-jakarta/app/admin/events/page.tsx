"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { GbcEventWithPhotos } from "../../lib/supabase"
import { formatDateShort } from "../../lib/date"
import AlertBanner from "../components/AlertBanner"

export const dynamic = "force-dynamic"

const PAGE_SIZE = 8

export default function AdminEventsPage() {
  const [events, setEvents] = useState<GbcEventWithPhotos[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState("")
  const [deletingId, setDeletingId] = useState<number | null>(null)
  const [pageError, setPageError] = useState<string | null>(null)
  const [currentPage, setCurrentPage] = useState(1)

  const fetchEvents = () => {
    setLoading(true)
    fetch("/api/admin/events")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) setEvents(data)
      })
      .finally(() => setLoading(false))
  }

  useEffect(() => {
    fetchEvents()
  }, [])

  const handleDelete = async (id: number, title: string) => {
    if (!confirm(`Delete "${title}"? This will also delete all photos.`)) return
    setDeletingId(id)
    setPageError(null)
    try {
      const res = await fetch(`/api/admin/events/${id}`, { method: "DELETE" })
      if (res.ok) {
        setEvents((prev) => prev.filter((e) => e.id !== id))
      } else {
        const err = await res.json()
        setPageError(`Delete failed: ${err.error}`)
      }
    } catch {
      setPageError("Delete failed. Please try again.")
    } finally {
      setDeletingId(null)
    }
  }

  const filtered = events.filter(
    (e) =>
      (e.title || "").toLowerCase().includes(search.toLowerCase()) ||
      (e.location || "").toLowerCase().includes(search.toLowerCase()) ||
      (e.venue || "").toLowerCase().includes(search.toLowerCase()),
  )

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE))
  const safePage = Math.min(currentPage, totalPages)
  const paginated = filtered.slice((safePage - 1) * PAGE_SIZE, safePage * PAGE_SIZE)

  return (
    <div className="flex flex-col flex-1">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Events</h1>
          <p className="text-slate-500 text-sm mt-1">Manage all events</p>
        </div>
        <Link
          href="/admin/events/new"
          className="inline-flex items-center gap-2 px-5 py-3 bg-linear-to-r from-accent to-[#00a8b0] !text-white rounded-xl text-sm font-semibold hover:shadow-lg hover:shadow-accent/25 transition-all hover:-translate-y-0.5"
        >
          <i className="fas fa-plus" /> Add Event
        </Link>
      </div>
      {pageError && (
        <div className="mb-6">
          <AlertBanner message={pageError} onDismiss={() => setPageError(null)} />
        </div>
      )}{" "}
      {/* Search */}
      <div className="mb-6">
        <div className="relative max-w-md">
          <i className="fas fa-search absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value)
              setCurrentPage(1)
            }}
            placeholder="Search events..."
            className="w-full pl-11 pr-4 py-3 bg-white border border-slate-200 rounded-xl text-slate-900 placeholder:text-slate-400 text-sm focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/20 shadow-sm transition-all"
          />
        </div>
      </div>
      {/* Table + Pagination */}
      <div className="flex flex-col justify-between flex-1">
        <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
          {loading ? (
            <div className="p-12 text-center">
              <i className="fas fa-spinner fa-spin text-2xl text-accent mb-3" />
              <p className="text-slate-500 text-sm">Loading events...</p>
            </div>
          ) : filtered.length === 0 ? (
            <div className="p-12 text-center">
              <i className="far fa-calendar text-4xl text-slate-300 mb-3" />
              <p className="text-slate-500 text-sm">
                {search ? "No events match your search" : "No events yet"}
              </p>
              {!search && (
                <Link
                  href="/admin/events/new"
                  className="inline-flex items-center gap-2 mt-4 px-5 py-2.5 bg-slate-100 text-slate-700 font-medium rounded-xl text-sm hover:bg-slate-200 transition-colors"
                >
                  <i className="fas fa-plus" /> Add your first event
                </Link>
              )}
            </div>
          ) : (
            /* Scrollable container — scoped to the table card, not the viewport */
            <div className="overflow-x-auto admin-table-scroll">
              <table className="w-full border-collapse" style={{ minWidth: "1100px" }}>
                <thead>
                  <tr className="border-b border-slate-200 bg-white">
                    <th className="text-left px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider whitespace-nowrap">
                      Title
                    </th>
                    <th className="text-left px-6 py-4 text-xs font-semibold text-slate-400 uppercase tracking-wider whitespace-nowrap">
                      Location
                    </th>
                    <th className="text-left px-6 py-4 text-xs font-semibold text-slate-400 uppercase tracking-wider whitespace-nowrap">
                      Venue
                    </th>
                    <th className="text-left px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider whitespace-nowrap">
                      Date
                    </th>
                    <th className="text-center px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider whitespace-nowrap">
                      Status
                    </th>
                    <th className="text-center px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider whitespace-nowrap">
                      Published
                    </th>
                    <th className="text-center px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider whitespace-nowrap">
                      Photos
                    </th>
                    <th className="text-left px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider whitespace-nowrap">
                      Created At
                    </th>
                    <th className="text-left px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider whitespace-nowrap">
                      Created By
                    </th>
                    <th className="text-left px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider whitespace-nowrap">
                      Updated At
                    </th>
                    <th className="text-left px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider whitespace-nowrap">
                      Updated By
                    </th>
                    {/* Sticky actions column */}
                    <th className="text-right px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider whitespace-nowrap sticky right-0 bg-white shadow-[-8px_0_12px_-4px_rgba(0,0,0,0.06)]">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {paginated.map((event) => (
                    <tr key={event.id} className="hover:bg-slate-50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <span
                            title={event.title}
                            className="text-slate-900 text-sm font-medium whitespace-nowrap max-w-[200px] truncate block"
                          >
                            {event.title}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span
                          title={event.location}
                          className="text-slate-600 text-sm whitespace-nowrap"
                        >
                          {event.location}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span
                          title={event.venue}
                          className="text-slate-500 text-sm whitespace-nowrap"
                        >
                          {event.venue}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-slate-500 text-xs whitespace-nowrap">
                          {formatDateShort(event.event_start)}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <span
                          className={`inline-block px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap ${
                            event.status === "upcoming"
                              ? "bg-blue-50 text-blue-600 border border-blue-200"
                              : "bg-slate-100 text-slate-600 border border-slate-200"
                          }`}
                        >
                          {event.status === "upcoming" ? "Upcoming" : "Accomplished"}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <span
                          className={`inline-block px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap ${
                            event.is_published
                              ? "bg-emerald-50 text-emerald-600 border border-emerald-200"
                              : "bg-amber-50 text-amber-600 border border-amber-200"
                          }`}
                        >
                          {event.is_published ? "Published" : "Draft"}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <span className="text-slate-500 text-sm">
                          {event.gbc_events_photos?.length || 0}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-slate-500 text-xs whitespace-nowrap">
                          {formatDateShort(event.created_at)}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-slate-500 text-xs whitespace-nowrap">
                          {event.created_by || "-"}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-slate-500 text-xs whitespace-nowrap">
                          {formatDateShort(event.updated_at)}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-slate-500 text-xs whitespace-nowrap">
                          {event.updated_by || "-"}
                        </span>
                      </td>
                      {/* Sticky actions */}
                      <td className="px-6 py-4 sticky right-0 bg-white group-hover:bg-slate-50 shadow-[-8px_0_12px_-4px_rgba(0,0,0,0.06)]">
                        <div className="flex items-center justify-end gap-2">
                          <Link
                            href={`/admin/events/${event.id}/edit`}
                            className="p-2 text-slate-400 hover:text-accent hover:bg-accent/10 rounded-lg transition-colors"
                            title="Edit"
                          >
                            <i className="fas fa-pen text-sm" />
                          </Link>
                          <button
                            onClick={() => handleDelete(event.id, event.title)}
                            disabled={deletingId === event.id}
                            className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-50 cursor-pointer"
                            title="Delete"
                          >
                            {deletingId === event.id ? (
                              <i className="fas fa-spinner fa-spin text-sm" />
                            ) : (
                              <i className="far fa-trash-alt text-sm" />
                            )}
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Footer: count + pagination */}
        {!loading && filtered.length > 0 && (
          <div className="mt-4 flex flex-col sm:flex-row items-center justify-between gap-3">
            <p className="text-slate-500 text-sm">
              Showing <span className="font-semibold text-slate-700">{paginated.length}</span> of{" "}
              <span className="font-semibold text-slate-700">{filtered.length}</span> events
            </p>
            {totalPages > 1 && (
              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  disabled={safePage === 1}
                  className="w-8 h-8 flex items-center justify-center rounded-lg border border-slate-200 text-slate-500 text-sm hover:border-accent hover:text-accent disabled:opacity-30 disabled:cursor-not-allowed transition-all cursor-pointer"
                >
                  <i className="fas fa-chevron-left text-xs" />
                </button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => {
                  const show = page === 1 || page === totalPages || Math.abs(page - safePage) <= 1
                  if (!show) {
                    if (page === 2 || page === totalPages - 1)
                      return (
                        <span
                          key={page}
                          className="w-8 h-8 flex items-center justify-center text-slate-400 text-sm"
                        >
                          …
                        </span>
                      )
                    return null
                  }
                  return (
                    <button
                      key={page}
                      onClick={() => setCurrentPage(page)}
                      className={`w-8 h-8 flex items-center justify-center rounded-lg border text-sm font-semibold transition-all cursor-pointer ${
                        page === safePage
                          ? "bg-accent border-accent text-white shadow-sm"
                          : "border-slate-200 text-slate-500 hover:border-accent hover:text-accent"
                      }`}
                    >
                      {page}
                    </button>
                  )
                })}
                <button
                  onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                  disabled={safePage === totalPages}
                  className="w-8 h-8 flex items-center justify-center rounded-lg border border-slate-200 text-slate-500 text-sm hover:border-accent hover:text-accent disabled:opacity-30 disabled:cursor-not-allowed transition-all cursor-pointer"
                >
                  <i className="fas fa-chevron-right text-xs" />
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
