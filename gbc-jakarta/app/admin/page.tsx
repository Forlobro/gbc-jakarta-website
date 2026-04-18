"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { GbcCompanyWithPhotos } from "../lib/supabase"

export default function AdminDashboard() {
  const [companies, setCompanies] = useState<GbcCompanyWithPhotos[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch("/api/admin/companies")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) setCompanies(data)
      })
      .finally(() => setLoading(false))
  }, [])

  const totalPhotos = companies.reduce(
    (acc, c) => acc + (c.gbc_companies_photos?.length || 0),
    0,
  )

  return (
    <div>
      {/* Header */}
      <div className="mb-8" >
        <h1 className="text-2xl font-bold text-white">Dashboard</h1>
        <p className="text-slate-400 text-sm mt-1">
          Welcome back! Here&#39;s an overview of your data.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        {[
          {
            label: "Total Companies",
            value: loading ? "—" : companies.length,
            icon: "fas fa-building",
            color: "from-blue-500 to-blue-600",
          },
          {
            label: "Total Photos",
            value: loading ? "—" : totalPhotos,
            icon: "fas fa-images",
            color: "from-emerald-500 to-emerald-600",
          },
          {
            label: "Categories",
            value: loading
              ? "—"
              : new Set(companies.map((c) => c.category).filter(Boolean)).size,
            icon: "fas fa-tags",
            color: "from-violet-500 to-violet-600",
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
            className="bg-slate-800/50 border border-slate-700/50 rounded-2xl p-6 backdrop-blur-sm"
          >
            <div className="flex items-center justify-between mb-4">
              <div
                className={`w-11 h-11 bg-linear-to-br ${stat.color} rounded-xl flex items-center justify-center shadow-lg`}
              >
                <i className={`${stat.icon} text-white text-sm`} />
              </div>
            </div>
            <p className="text-2xl font-bold text-white">{stat.value}</p>
            <p className="text-slate-400 text-sm mt-0.5">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="bg-slate-800/50 border border-slate-700/50 rounded-2xl p-6 backdrop-blur-sm">
        <h2 className="text-lg font-bold text-white mb-4">Quick Actions</h2>
        <div className="flex flex-wrap gap-3">
          <Link
            href="/admin/companies/new"
            className="inline-flex items-center gap-2 px-5 py-3 bg-linear-to-r from-accent to-[#00a8b0] text-white rounded-xl text-sm font-semibold hover:shadow-lg hover:shadow-accent/25 transition-all"
          >
            <i className="fas fa-plus" /> Add Company
          </Link>
          <Link
            href="/admin/companies"
            className="inline-flex items-center gap-2 px-5 py-3 bg-[#00c2cb] text-white rounded-xl text-sm font-medium hover:bg-[#00a8b0] transition-colors"
          >
            <i className="fas fa-list" /> Manage Companies
          </Link>
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-5 py-3 bg-[#00c2cb] text-white rounded-xl text-sm font-medium hover:bg-[#00a8b0] transition-colors"
          >
            <i className="fas fa-external-link-alt" /> View Website
          </Link>
        </div>
      </div>

      {/* Recent Companies */}
      {!loading && companies.length > 0 && (
        <div className="mt-8 bg-slate-800/50 border border-slate-700/50 rounded-2xl p-6 backdrop-blur-sm">
          <h2 className="text-lg font-bold text-white mb-4">
            Recently Added Companies
          </h2>
          <div className="space-y-3">
            {companies.slice(0, 5).map((company) => (
              <Link
                key={company.id}
                href={`/admin/companies/${company.id}/edit`}
                className="flex items-center justify-between p-4 bg-slate-900/50 rounded-xl hover:bg-slate-700/50 transition-colors group"
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-slate-700 rounded-lg flex items-center justify-center text-slate-300 font-bold text-xs">
                    {(company.name || "?").charAt(0)}
                  </div>
                  <div>
                    <p className="text-white text-sm font-medium">
                      {company.name}
                    </p>
                    <p className="text-slate-500 text-xs">{company.category}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 text-sm">
                  <span className="text-slate-500">
                    {company.gbc_companies_photos?.length || 0} photos
                  </span>
                  <i className="fas fa-chevron-right text-slate-600 group-hover:text-slate-400 transition-colors" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
