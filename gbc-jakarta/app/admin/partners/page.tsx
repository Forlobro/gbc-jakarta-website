"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { GbcCompanyWithPhotos } from "../../lib/supabase"
import AlertBanner from "../components/AlertBanner"

export const dynamic = "force-dynamic"

const PAGE_SIZE = 8

export default function AdminPartnersPage() {
  const [companies, setCompanies] = useState<GbcCompanyWithPhotos[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState("")
  const [deletingId, setDeletingId] = useState<number | null>(null)
  const [pageError, setPageError] = useState<string | null>(null)
  const [currentPage, setCurrentPage] = useState(1)

  const fetchPartners = () => {
    setLoading(true)
    fetch("/api/admin/partners")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) setCompanies(data)
      })
      .finally(() => setLoading(false))
  }

  useEffect(() => {
    fetchPartners()
  }, [])

  const handleDelete = async (id: number, name: string) => {
    if (!confirm(`Delete "${name}"? This will also delete all photos.`)) return
    setDeletingId(id)
    setPageError(null)

    try {
      const res = await fetch(`/api/admin/partners/${id}`, { method: "DELETE" })
      if (res.ok) {
        setCompanies((prev) => prev.filter((c) => c.id !== id))
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

  const filtered = companies.filter(
    (c) =>
      (c.name || "").toLowerCase().includes(search.toLowerCase()) ||
      (c.category || "").toLowerCase().includes(search.toLowerCase()),
  )

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE))
  const safePage = Math.min(currentPage, totalPages)
  const paginated = filtered.slice((safePage - 1) * PAGE_SIZE, safePage * PAGE_SIZE)

  return (
    <div className="flex flex-col flex-1">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Partners</h1>
          <p className="text-slate-500 text-sm mt-1">Manage all registered partners</p>
        </div>
        <Link
          href="/admin/partners/new"
          className="inline-flex items-center gap-2 px-5 py-3 bg-linear-to-r from-accent to-[#00a8b0] !text-white rounded-xl text-sm font-semibold hover:shadow-lg hover:shadow-accent/25 transition-all hover:-translate-y-0.5 cursor-pointer"
        >
          <i className="fas fa-plus" /> Add Partner
        </Link>
      </div>

      {pageError && (
        <div className="mb-6">
          <AlertBanner message={pageError} onDismiss={() => setPageError(null)} />
        </div>
      )}

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
            placeholder="Search Partners..."
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
              <p className="text-slate-500 text-sm">Loading Partners...</p>
            </div>
          ) : filtered.length === 0 ? (
            <div className="p-12 text-center">
              <i className="far fa-building text-4xl text-slate-300 mb-3" />
              <p className="text-slate-500 text-sm">
                {search ? "No Partners match your search" : "No Partners yet"}
              </p>
              {!search && (
                <Link
                  href="/admin/partners/new"
                  className="inline-flex items-center gap-2 mt-4 px-5 py-2.5 bg-slate-100 text-slate-700 font-medium rounded-xl text-sm hover:bg-slate-200 transition-colors"
                >
                  <i className="fas fa-plus" /> Add your first partner
                </Link>
              )}
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full min-w-max">
                <thead>
                  <tr className="border-b border-slate-200">
                    <th className="text-left px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                      Partner
                    </th>
                    <th className="text-left px-6 py-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">
                      Category
                    </th>
                    <th className="text-center px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                      Photos
                    </th>
                    <th className="text-left px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                      Period
                    </th>
                    <th className="text-right px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {paginated.map((company) => (
                    <tr key={company.id} className="hover:bg-slate-50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 bg-slate-100 border border-slate-200 rounded-lg flex items-center justify-center text-slate-600 font-bold text-xs shrink-0">
                            {(company.name || "?").charAt(0)}
                          </div>
                          <span className="text-slate-900 text-sm font-medium truncate max-w-[15rem]">
                            {company.name}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        {company.category && (
                          <span className="inline-block bg-slate-100 border border-slate-200 text-slate-600 px-3 py-1 rounded-lg text-xs font-medium">
                            {company.category}
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-4 text-center">
                        <span className="text-slate-500 text-sm">
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
                            href={`/admin/partners/${company.id}/edit`}
                            className="p-2 text-slate-400 hover:text-accent hover:bg-accent/10 rounded-lg transition-colors"
                            title="Edit"
                          >
                            <i className="fas fa-pen text-sm" />
                          </Link>
                          <button
                            onClick={() => handleDelete(company.id, company.name || "")}
                            disabled={deletingId === company.id}
                            className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-50 cursor-pointer"
                            title="Delete"
                          >
                            {deletingId === company.id ? (
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
              <span className="font-semibold text-slate-700">{filtered.length}</span> partners
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
