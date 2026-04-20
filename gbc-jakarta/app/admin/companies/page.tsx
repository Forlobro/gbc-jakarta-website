"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { GbcCompanyWithPhotos } from "../../lib/supabase"

export default function AdminCompaniesPage() {
  const [companies, setCompanies] = useState<GbcCompanyWithPhotos[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState("")
  const [deletingId, setDeletingId] = useState<number | null>(null)

  const fetchCompanies = () => {
    setLoading(true)
    fetch("/api/admin/companies")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) setCompanies(data)
      })
      .finally(() => setLoading(false))
  }

  useEffect(() => {
    fetchCompanies()
  }, [])

  const handleDelete = async (id: number, name: string) => {
    if (!confirm(`Delete "${name}"? This will also delete all photos.`)) return
    setDeletingId(id)

    try {
      const res = await fetch(`/api/admin/companies/${id}`, {
        method: "DELETE",
      })
      if (res.ok) {
        setCompanies((prev) => prev.filter((c) => c.id !== id))
      } else {
        const err = await res.json()
        alert(`Delete failed: ${err.error}`)
      }
    } catch {
      alert("Delete failed. Please try again.")
    } finally {
      setDeletingId(null)
    }
  }

  const filtered = companies.filter(
    (c) =>
      (c.name || "").toLowerCase().includes(search.toLowerCase()) ||
      (c.category || "").toLowerCase().includes(search.toLowerCase()),
  )

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-white">Companies</h1>
          <p className="text-slate-400 text-sm mt-1">
            Manage all registered companies
          </p>
        </div>
        <Link
          href="/admin/companies/new"
          className="inline-flex items-center gap-2 px-5 py-3 bg-linear-to-r from-accent to-[#00a8b0] text-white rounded-xl text-sm font-semibold hover:shadow-lg hover:shadow-accent/25 transition-all hover:-translate-y-0.5"
        >
          <i className="fas fa-plus" /> Add Company
        </Link>
      </div>

      {/* Search */}
      <div className="mb-6">
        <div className="relative max-w-md">
          <i className="fas fa-search absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search companies..."
            className="w-full pl-11 pr-4 py-3 bg-slate-800/50 border border-slate-700/50 rounded-xl text-white placeholder:text-slate-500 text-sm focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all"
          />
        </div>
      </div>

      {/* Table */}
      <div className="bg-slate-800/50 border border-slate-700/50 rounded-2xl overflow-hidden backdrop-blur-sm">
        {loading ? (
          <div className="p-12 text-center">
            <i className="fas fa-spinner fa-spin text-2xl text-accent mb-3" />
            <p className="text-slate-400 text-sm">Loading companies...</p>
          </div>
        ) : filtered.length === 0 ? (
          <div className="p-12 text-center">
            <i className="fas fa-building text-4xl text-slate-600 mb-3" />
            <p className="text-slate-400 text-sm">
              {search ? "No companies match your search" : "No companies yet"}
            </p>
            {!search && (
              <Link
                href="/admin/companies/new"
                className="inline-flex items-center gap-2 mt-4 px-5 py-2.5 bg-slate-700 text-white rounded-xl text-sm hover:bg-slate-600 transition-colors"
              >
                <i className="fas fa-plus" /> Add your first company
              </Link>
            )}
          </div>
        ) : (
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-700/50">
                <th className="text-left px-6 py-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">
                  Company
                </th>
                <th className="text-left px-6 py-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">
                  Category
                </th>
                <th className="text-center px-6 py-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">
                  Photos
                </th>
                <th className="text-left px-6 py-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">
                  Period
                </th>
                <th className="text-right px-6 py-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-700/30">
              {filtered.map((company) => (
                <tr
                  key={company.id}
                  className="hover:bg-slate-700/20 transition-colors"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 bg-slate-700 rounded-lg flex items-center justify-center text-slate-300 font-bold text-xs shrink-0">
                        {(company.name || "?").charAt(0)}
                      </div>
                      <span className="text-white text-sm font-medium truncate max-w-62.5">
                        {company.name}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    {company.category && (
                      <span className="inline-block bg-slate-700/50 text-slate-300 px-3 py-1 rounded-lg text-xs font-medium">
                        {company.category}
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span className="text-slate-400 text-sm">
                      {company.gbc_companies_photos?.length || 0}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-slate-500 text-sm">
                      {company.start_date && company.end_date
                        ? `${new Date(company.start_date).toLocaleDateString()} - ${new Date(company.end_date).toLocaleDateString()}`
                        : company.start_date
                          ? `Start: ${new Date(company.start_date).toLocaleDateString()}`
                          : company.end_date
                            ? `End: ${new Date(company.end_date).toLocaleDateString()}`
                            : "-"}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end gap-2">
                      <Link
                        href={`/admin/companies/${company.id}/edit`}
                        className="p-2 text-white hover:text-accent hover:bg-accent/10 rounded-lg transition-colors"
                        title="Edit"
                      >
                        <i className="fas fa-pen text-sm text-white" />
                      </Link>
                      <button
                        onClick={() =>
                          handleDelete(company.id, company.name || "")
                        }
                        disabled={deletingId === company.id}
                        className="p-2 text-slate-400 hover:text-red-400 hover:bg-red-400/10 rounded-lg transition-colors disabled:opacity-50 cursor-pointer"
                        title="Delete"
                      >
                        {deletingId === company.id ? (
                          <i className="fas fa-spinner fa-spin text-sm" />
                        ) : (
                          <i className="fas fa-trash-alt text-sm" />
                        )}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Count */}
      {!loading && filtered.length > 0 && (
        <p className="text-slate-500 text-sm mt-4">
          Showing {filtered.length} of {companies.length} companies
        </p>
      )}
    </div>
  )
}
