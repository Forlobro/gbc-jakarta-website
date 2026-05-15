"use client"

import { useEffect, useState, useRef } from "react"
import { GbcCompanyCategory } from "../../lib/supabase"

export const dynamic = "force-dynamic"

export default function AdminPartnersCategoriesPage() {
  const [categories, setCategories] = useState<GbcCompanyCategory[]>([])
  const [loading, setLoading] = useState(true)
  const [newName, setNewName] = useState("")
  const [adding, setAdding] = useState(false)
  const [editingId, setEditingId] = useState<number | null>(null)
  const [editingName, setEditingName] = useState("")
  const [savingId, setSavingId] = useState<number | null>(null)
  const [deletingId, setDeletingId] = useState<number | null>(null)
  const [error, setError] = useState<string | null>(null)
  const editInputRef = useRef<HTMLInputElement>(null)

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
    if (editingId !== null) {
      editInputRef.current?.focus()
    }
  }, [editingId])

  const handleAdd = async (e: React.FormEvent) => {
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
      setNewName("")
      fetchPartnersCategories()
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
    if (!confirm(`Delete category "${name}"? Companies using this category will not be affected.`))
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
    <div>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-900">Categories</h1>
        <p className="text-slate-500 text-sm mt-1">
          Manage Partner categories used in the partner form.
        </p>
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

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Add Category Form */}
        <div className="lg:col-span-1">
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm sticky top-8">
            <h2 className="text-base font-bold text-slate-900 mb-4 flex items-center gap-2">
              <i className="fas fa-plus-circle text-accent" /> Add Category
            </h2>
            <form onSubmit={handleAdd} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Category Name <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  placeholder="e.g. Industrial Equipment"
                  className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl text-slate-900 placeholder:text-slate-400 text-sm focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all"
                  disabled={adding}
                />
              </div>
              <button
                type="submit"
                disabled={adding || !newName.trim()}
                className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 bg-linear-to-r from-accent to-[#00a8b0] text-white rounded-xl text-sm font-semibold hover:shadow-lg hover:shadow-accent/25 transition-all disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
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
            </form>
          </div>
        </div>

        {/* Categories List */}
        <div className="lg:col-span-2">
          <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
            {loading ? (
              <div className="p-12 text-center">
                <i className="fas fa-spinner fa-spin text-2xl text-accent mb-3" />
                <p className="text-slate-500 text-sm">Loading categories...</p>
              </div>
            ) : categories.length === 0 ? (
              <div className="p-12 text-center">
                <i className="fas fa-tags text-4xl text-slate-300 mb-3" />
                <p className="text-slate-500 text-sm">No categories yet. Add one to get started.</p>
              </div>
            ) : (
              <ul className="divide-y divide-slate-100">
                {categories.map((cat) => (
                  <li
                    key={cat.id}
                    className="flex items-center gap-3 px-6 py-4 hover:bg-slate-50 transition-colors"
                  >
                    {editingId === cat.id ? (
                      /* Edit mode */
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
                      /* View mode */
                      <>
                        <div className="w-8 h-8 bg-accent/10 rounded-lg flex items-center justify-center shrink-0">
                          <i className="fas fa-tag text-accent text-xs" />
                        </div>
                        <span className="flex-1 text-sm font-medium text-slate-800">
                          {cat.name}
                        </span>
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

          {!loading && categories.length > 0 && (
            <p className="text-slate-500 text-xs mt-3">
              {categories.length} {categories.length === 1 ? "category" : "categories"} total
            </p>
          )}
        </div>
      </div>
    </div>
  )
}
