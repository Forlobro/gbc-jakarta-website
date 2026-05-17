"use client"

import { useState, useEffect } from "react"
import { GbcCompany, GbcCompanyCategory } from "@/app/lib/supabase"

export type PartnerFormData = Pick<
  GbcCompany,
  | "name"
  | "category"
  | "description_id"
  | "description_en"
  | "start_date"
  | "end_date"
  | "link_video"
>

interface PartnerFormProps {
  initialData?: PartnerFormData
  onSubmit: (data: PartnerFormData) => Promise<void>
  submitLabel: string
  loading?: boolean
}

export default function PartnerForm({
  initialData,
  onSubmit,
  submitLabel,
  loading = false,
}: PartnerFormProps) {
  const [name, setName] = useState(initialData?.name || "")
  const [category, setCategory] = useState(initialData?.category || "")
  const [descriptionId, setDescriptionId] = useState(initialData?.description_id || "")
  const [descriptionEn, setDescriptionEn] = useState(initialData?.description_en || "")
  const [startDate, setStartDate] = useState(initialData?.start_date || "")
  const [endDate, setEndDate] = useState(initialData?.end_date || "")
  const [linkVideo, setLinkVideo] = useState(initialData?.link_video || "")

  const [categories, setCategories] = useState<GbcCompanyCategory[]>([])
  const [categoriesLoading, setCategoriesLoading] = useState(true)

  useEffect(() => {
    fetch("/api/admin/partners-categories")
      .then((r) => r.json())
      .then((data) => {
        if (Array.isArray(data)) setCategories(data)
      })
      .finally(() => setCategoriesLoading(false))
  }, [])

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault()
    await onSubmit({
      name,
      category,
      description_id: descriptionId,
      description_en: descriptionEn,
      start_date: startDate,
      end_date: endDate,
      link_video: linkVideo,
    })
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6 h-full">
      {/* Partner Name */}
      <div>
        <label className="block text-sm font-medium text-slate-700 mb-2">
          Partner Name <span className="text-red-400">*</span>
        </label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl text-slate-900 placeholder:text-slate-400 text-sm focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all"
        />
      </div>

      {/* Category */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <label className="block text-sm font-medium text-slate-700">
            Category <span className="text-red-400">*</span>
          </label>
          <a
            href="/admin/partners-categories"
            className="text-xs text-accent hover:underline flex items-center gap-1"
          >
            <i className="fas fa-arrow-right text-[10px]" /> Manage categories
          </a>
        </div>

        {categoriesLoading ? (
          <div className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-400 text-sm flex items-center gap-2">
            <i className="fas fa-spinner fa-spin text-xs" /> Loading categories...
          </div>
        ) : (
          <div className="relative">
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
              className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl text-slate-900 text-sm focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all appearance-none cursor-pointer"
            >
              <option value="">Select category...</option>
              {categories.map((c) => (
                <option key={c.id} value={c.name}>
                  {c.name}
                </option>
              ))}
            </select>
            <i className="fas fa-chevron-down absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 text-xs pointer-events-none" />
          </div>
        )}

        {!categoriesLoading && categories.length === 0 && (
          <p className="text-xs text-amber-600 mt-1.5 flex items-center gap-1">
            <i className="fas fa-exclamation-triangle" />
            No categories found.{" "}
            <a href="/admin/partners-categories" className="underline">
              Add categories first.
            </a>
          </p>
        )}
      </div>

      {/* Description (ID) */}
      <div>
        <label className="block text-sm font-medium text-slate-700 mb-2">Description (ID)</label>
        <textarea
          value={descriptionId}
          onChange={(e) => setDescriptionId(e.target.value)}
          placeholder="Deskripsi perusahaan (Bahasa Indonesia)..."
          rows={6}
          className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl text-slate-900 placeholder:text-slate-400 text-sm focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all resize-y"
        />
      </div>

      {/* Description (EN) */}
      <div>
        <label className="block text-sm font-medium text-slate-700 mb-2">Description (EN)</label>
        <textarea
          value={descriptionEn}
          onChange={(e) => setDescriptionEn(e.target.value)}
          placeholder="Partner description (English)..."
          rows={6}
          className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl text-slate-900 placeholder:text-slate-400 text-sm focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all resize-y"
        />
      </div>

      {/* Start Batch */}
      <div>
        <label className="block text-sm font-medium text-slate-700 mb-2">
          Start Batch <span className="text-red-400">*</span>
        </label>
        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          required
          className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl text-slate-900 text-sm focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all"
        />
      </div>

      {/* End Batch */}
      <div>
        <label className="block text-sm font-medium text-slate-700 mb-2">
          End Batch <span className="text-red-400">*</span>
        </label>
        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          required
          className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl text-slate-900 text-sm focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all"
        />
      </div>

      {/* Video Profile */}
      <div>
        <label className="block text-sm font-medium text-slate-700 mb-2">Video Profile</label>
        <input
          type="url"
          value={linkVideo}
          onChange={(e) => setLinkVideo(e.target.value)}
          placeholder="https://..."
          className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl text-slate-900 placeholder:text-slate-400 text-sm focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all"
        />
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={loading || !name || !category || !startDate || !endDate}
        className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-linear-to-r from-accent to-[#00a8b0] text-white font-semibold rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-accent/25 hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0 text-sm mt-auto cursor-pointer"
      >
        {loading ? (
          <>
            <i className="fas fa-spinner fa-spin" /> Saving...
          </>
        ) : (
          <>
            <i className="far fa-save" /> {submitLabel}
          </>
        )}
      </button>
    </form>
  )
}
