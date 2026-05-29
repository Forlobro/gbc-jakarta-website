"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { GbcCompanyWithPhotos } from "../lib/supabase"

export const dynamic = "force-dynamic"

export default function AdminDashboard() {
  const [companies, setCompanies] = useState<GbcCompanyWithPhotos[]>([])
  const [events, setEvents] = useState<unknown[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    Promise.all([
      fetch("/api/admin/partners").then((res) => res.json()),
      fetch("/api/admin/events").then((res) => res.json()),
    ])
      .then(([partnersData, eventsData]) => {
        if (Array.isArray(partnersData)) setCompanies(partnersData)
        if (Array.isArray(eventsData)) setEvents(eventsData)
      })
      .finally(() => setLoading(false))
  }, [])

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-900">Dashboard</h1>
        <p className="text-slate-500 text-sm mt-1">
          Welcome back! Here&#39;s an overview of your data.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        {[
          {
            label: "Total Partners",
            value: loading ? "—" : companies.length,
            icon: "far fa-building",
            color: "from-blue-500 to-blue-600",
          },
          {
            label: "Categories",
            value: loading ? "—" : new Set(companies.map((c) => c.category).filter(Boolean)).size,
            icon: "fas fa-tags",
            color: "from-violet-500 to-violet-600",
          },
          {
            label: "Total Events",
            value: loading ? "—" : events.length,
            icon: "far fa-calendar",
            color: "from-emerald-500 to-emerald-600",
          },
          {
            label: "Last Updated",
            value: loading
              ? "—"
              : companies.length > 0
                ? companies[0].end_date
                  ? new Date(companies[0].end_date).toLocaleDateString()
                  : companies[0].start_date
                    ? new Date(companies[0].start_date).toLocaleDateString()
                    : "N/A"
                : "N/A",
            icon: "fas fa-clock",
            color: "from-amber-500 to-amber-600",
          },
        ].map((stat) => (
          <div
            key={stat.label}
            className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm"
          >
            <div className="flex items-center justify-between mb-4">
              <div
                className={`w-11 h-11 bg-linear-to-br ${stat.color} rounded-xl flex items-center justify-center shadow-md`}
              >
                <i className={`${stat.icon} text-white text-sm`} />
              </div>
            </div>
            <p className="text-2xl font-bold text-slate-900">{stat.value}</p>
            <p className="text-slate-500 text-sm mt-0.5">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
        <h2 className="text-lg font-bold text-slate-900 mb-4">Quick Actions</h2>
        <div className="flex flex-wrap gap-3">
          <Link
            href="/admin/partners/new"
            className="inline-flex items-center gap-2 px-5 py-3 bg-linear-to-r from-accent to-[#00a8b0] !text-white rounded-xl text-sm font-semibold hover:shadow-lg hover:shadow-accent/25 transition-all"
          >
            <i className="fas fa-plus" /> Add Partner
          </Link>
          <Link
            href="/admin/categories/new"
            className="inline-flex items-center gap-2 px-5 py-3 bg-[#00c2cb] !text-white rounded-xl text-sm font-medium hover:bg-[#00a8b0] transition-colors"
          >
            <i className="fas fa-plus" /> Add Categories
          </Link>
          <Link
            href="/admin/events/new"
            className="inline-flex items-center gap-2 px-5 py-3 bg-[#00c2cb] !text-white rounded-xl text-sm font-medium hover:bg-[#00a8b0] transition-colors"
          >
            <i className="fas fa-plus" /> Add Events
          </Link>
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-5 py-3 bg-[#00c2cb] !text-white rounded-xl text-sm font-medium hover:bg-[#00a8b0] transition-colors"
          >
            <i className="fas fa-external-link-alt" /> View Website
          </Link>
        </div>
      </div>

      {/* Recent Companies */}
      {!loading && companies.length > 0 && (
        <div className="mt-8 bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
          <h2 className="text-lg font-bold text-slate-900 mb-4">Recently Added Partners</h2>
          <div className="space-y-3">
            {companies.slice(0, 5).map((company) => (
              <Link
                key={company.id}
                href={`/admin/partners/${company.id}/edit`}
                className="flex items-center justify-between p-4 bg-slate-50 rounded-xl hover:bg-slate-100 transition-colors group"
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-slate-200 rounded-lg flex items-center justify-center text-slate-600 font-bold text-xs">
                    {(company.name || "?").charAt(0)}
                  </div>
                  <div>
                    <p className="text-slate-900 text-sm font-medium">{company.name}</p>
                    <p className="text-slate-500 text-xs">{company.category}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 text-sm">
                  <span className="text-slate-500">
                    {company.gbc_companies_photos?.length || 0} photos
                  </span>
                  <i className="fas fa-chevron-right text-slate-400 group-hover:text-slate-600 transition-colors" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
