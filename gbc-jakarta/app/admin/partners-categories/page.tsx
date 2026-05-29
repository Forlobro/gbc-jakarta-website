"use client"

import { useEffect, useState, useRef } from "react"
import { GbcCompanyCategory } from "../../lib/supabase"

export const dynamic = "force-dynamic"

const PAGE_SIZE = 8

export default function AdminPartnersCategoriesPage() {
  const [categories, setCategories] = useState<GbcCompanyCategory[]>([])
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [newName, setNewName] = useState("")
  const [adding, setAdding] = useState(false)
  const [editingId, setEditingId] = useState<number | null>(null)
  const [editingName, setEditingName] = useState("")
  const [savingId, setSavingId] = useState<number | null>(null)
  const [deletingId, setDeletingId] = useState<number | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [search, setSearch] = useState("")
  const editInputRef = useRef<HTMLInputElement>(null)
  const modalInputRef = useRef<HTMLInputElement>(null)

  const fetchPartnersCategories = () => {
    setLoading(true)
    fetch("/api/admin/partners-categories")
      .then((r) => r.json())
      .then((data) => {
        if (Array.isArray(data)) setCategories(data)
      })
      .finally(() => setLoading(false))
  }

  useEffect(() => {
    fetchPartnersCategories()
  }, [])

  useEffect(() => {
    if (editingId !== null) editInputRef.current?.focus()
  }, [editingId])

  useEffect(() => {
    if (showModal) setTimeout(() => modalInputRef.current?.focus(), 50)
  }, [showModal])

  const filtered = categories.filter((c) => c.name.toLowerCase().includes(search.toLowerCase()))
  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE))
  const safePage = Math.min(currentPage, totalPages)
  const paginated = filtered.slice((safePage - 1) * PAGE_SIZE, safePage * PAGE_SIZE)

  const openModal = () => {
    setNewName("")
    setError(null)
    setShowModal(true)
  }

  const closeModal = () => {
    setShowModal(false)
    setNewName("")
  }

  const handleAdd = async (e: React.SyntheticEvent) => {
    e.preventDefault()
    const name = newName.trim()
    if (!name) return
    setAdding(true)
    setError(null)

    try {
      const res = await fetch("/api/admin/partners-categories", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name }),
      })
      const data = await res.json()
      if (!res.ok) {
        setError(data.error)
        return
      }
      closeModal()
      fetchPartnersCategories()
      setCurrentPage(1)
    } catch {
      setError("Failed to add category. Please try again.")
    } finally {
      setAdding(false)
    }
  }

  const startEdit = (cat: GbcCompanyCategory) => {
    setEditingId(cat.id)
    setEditingName(cat.name)
    setError(null)
  }

  const cancelEdit = () => {
    setEditingId(null)
    setEditingName("")
  }

  const handleUpdate = async (id: number) => {
    const name = editingName.trim()
    if (!name) return
    setSavingId(id)
    setError(null)

    try {
      const res = await fetch(`/api/admin/partners-categories/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name }),
      })
      const data = await res.json()
      if (!res.ok) {
        setError(data.error)
        return
      }
      setEditingId(null)
      fetchPartnersCategories()
    } catch {
      setError("Failed to update category. Please try again.")
    } finally {
      setSavingId(null)
    }
  }

  const handleDelete = async (id: number, name: string) => {
    if (!confirm(`Delete category "${name}"? Partners using this category will not be affected.`))
      return
    setDeletingId(id)
    setError(null)

    try {
      const res = await fetch(`/api/admin/partners-categories/${id}`, { method: "DELETE" })
      if (!res.ok) {
        const data = await res.json()
        setError(data.error)
        return
      }
      fetchPartnersCategories()
    } catch {
      setError("Failed to delete category. Please try again.")
    } finally {
      setDeletingId(null)
    }
  }

  return (
    <div className="flex flex-col flex-1">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Categories</h1>
          <p className="text-slate-500 text-sm mt-1">
            Manage Partner categories used in the partner form.
          </p>
        </div>
        <button
          onClick={openModal}
          className="inline-flex items-center gap-2 px-5 py-3 bg-linear-to-r from-accent to-[#00a8b0] text-white rounded-xl text-sm font-semibold hover:shadow-lg hover:shadow-accent/25 transition-all hover:-translate-y-0.5 cursor-pointer"
        >
          <i className="fas fa-plus" /> Add Category
        </button>
      </div>

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
            placeholder="Search categories..."
            className="w-full pl-11 pr-4 py-3 bg-white border border-slate-200 rounded-xl text-slate-900 placeholder:text-slate-400 text-sm focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/20 shadow-sm transition-all"
          />
        </div>
      </div>

      {/* Error banner */}
      {error && (
        <div className="mb-6 flex items-center gap-2 p-4 bg-red-50 border border-red-100 rounded-xl text-red-600 text-sm">
          <i className="fas fa-exclamation-circle shrink-0" />
          {error}
          <button
            onClick={() => setError(null)}
            className="ml-auto text-red-400 hover:text-red-600 cursor-pointer"
          >
            <i className="fas fa-times" />
          </button>
        </div>
      )}

      {/* Categories List */}
      {/* List + Pagination */}
      <div className="flex flex-col justify-between flex-1">
        <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
          {loading ? (
            <div className="p-12 text-center">
              <i className="fas fa-spinner fa-spin text-2xl text-accent mb-3" />
              <p className="text-slate-500 text-sm">Loading categories...</p>
            </div>
          ) : categories.length === 0 ? (
            <div className="p-12 text-center">
              <i className="fas fa-tags text-4xl text-slate-300 mb-3" />
              <p className="text-slate-500 text-sm">No categories yet.</p>
              <button
                onClick={openModal}
                className="inline-flex items-center gap-2 mt-4 px-5 py-2.5 bg-slate-100 text-slate-700 font-medium rounded-xl text-sm hover:bg-slate-200 transition-colors cursor-pointer"
              >
                <i className="fas fa-plus" /> Add your first category
              </button>
            </div>
          ) : filtered.length === 0 ? (
            <div className="p-12 text-center">
              <i className="fas fa-search text-4xl text-slate-300 mb-3" />
              <p className="text-slate-500 text-sm">No categories match your search.</p>
            </div>
          ) : (
            <ul className="divide-y divide-slate-100">
              {paginated.map((cat) => (
                <li
                  key={cat.id}
                  className="flex items-center gap-3 px-6 py-4 hover:bg-slate-50 transition-colors"
                >
                  {editingId === cat.id ? (
                    <div className="flex items-center gap-2 flex-1">
                      <input
                        ref={editInputRef}
                        type="text"
                        value={editingName}
                        onChange={(e) => setEditingName(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") handleUpdate(cat.id)
                          if (e.key === "Escape") cancelEdit()
                        }}
                        className="flex-1 px-3 py-2 bg-white border border-accent rounded-lg text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-accent/20"
                      />
                      <button
                        onClick={() => handleUpdate(cat.id)}
                        disabled={savingId === cat.id || !editingName.trim()}
                        className="p-2 text-white bg-accent hover:bg-[#00a8b0] rounded-lg transition-colors disabled:opacity-50 cursor-pointer"
                        title="Save"
                      >
                        {savingId === cat.id ? (
                          <i className="fas fa-spinner fa-spin text-sm" />
                        ) : (
                          <i className="fas fa-check text-sm" />
                        )}
                      </button>
                      <button
                        onClick={cancelEdit}
                        className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
                        title="Cancel"
                      >
                        <i className="fas fa-times text-sm" />
                      </button>
                    </div>
                  ) : (
                    <>
                      <div className="w-8 h-8 bg-accent/10 rounded-lg flex items-center justify-center shrink-0">
                        <i className="fas fa-tag text-accent text-xs" />
                      </div>
                      <span className="flex-1 text-sm font-medium text-slate-800">{cat.name}</span>
                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => startEdit(cat)}
                          className="p-2 text-slate-400 hover:text-accent hover:bg-accent/10 rounded-lg transition-colors cursor-pointer"
                          title="Edit"
                        >
                          <i className="fas fa-pen text-sm" />
                        </button>
                        <button
                          onClick={() => handleDelete(cat.id, cat.name)}
                          disabled={deletingId === cat.id}
                          className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-50 cursor-pointer"
                          title="Delete"
                        >
                          {deletingId === cat.id ? (
                            <i className="fas fa-spinner fa-spin text-sm" />
                          ) : (
                            <i className="far fa-trash-alt text-sm" />
                          )}
                        </button>
                      </div>
                    </>
                  )}
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Footer: count + pagination */}
        {!loading && filtered.length > 0 && (
          <div className="mt-4 flex flex-col sm:flex-row items-center justify-between gap-3">
            <p className="text-slate-500 text-sm">
              Showing <span className="font-semibold text-slate-700">{paginated.length}</span> of{" "}
              <span className="font-semibold text-slate-700">{filtered.length}</span>{" "}
              {filtered.length === 1 ? "category" : "categories"}
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

      {/* Add Category Modal */}
      {showModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm"
          onClick={(e) => e.target === e.currentTarget && closeModal()}
        >
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <i className="fas fa-tags text-accent" /> Add Category
              </h2>
              <button
                onClick={closeModal}
                className="w-8 h-8 flex items-center justify-center text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
              >
                <i className="fas fa-times" />
              </button>
            </div>

            {error && (
              <div className="mb-4 flex items-center gap-2 p-3 bg-red-50 border border-red-100 rounded-xl text-red-600 text-sm">
                <i className="fas fa-exclamation-circle shrink-0" />
                {error}
              </div>
            )}

            <form onSubmit={handleAdd} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Category Name <span className="text-red-400">*</span>
                </label>
                <input
                  ref={modalInputRef}
                  type="text"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  placeholder="e.g. Industrial Equipment"
                  className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl text-slate-900 placeholder:text-slate-400 text-sm focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all"
                  disabled={adding}
                />
              </div>
              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={closeModal}
                  className="flex-1 px-5 py-3 bg-slate-100 text-slate-700 rounded-xl text-sm font-semibold hover:bg-slate-200 transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={adding || !newName.trim()}
                  className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-3 bg-linear-to-r from-accent to-[#00a8b0] text-white rounded-xl text-sm font-semibold hover:shadow-lg hover:shadow-accent/25 transition-all disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                >
                  {adding ? (
                    <>
                      <i className="fas fa-spinner fa-spin" /> Adding...
                    </>
                  ) : (
                    <>
                      <i className="fas fa-plus" /> Add Category
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
