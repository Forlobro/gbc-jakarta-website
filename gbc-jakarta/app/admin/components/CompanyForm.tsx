"use client"

import { useState, FormEvent } from "react"

export interface CompanyFormData {
  name: string
  category: string
  description_id: string
  description_en: string
  start_date: string
  end_date: string
  link_video: string
}

interface CompanyFormProps {
  initialData?: CompanyFormData
  onSubmit: (data: CompanyFormData) => Promise<void>
  submitLabel: string
  loading?: boolean
}

const categories = [
  "Industrial Equipment",
  "Safety Equipment",
  "Eco-Friendly",
  "Lifestyle",
  "Construction",
  "Safety Tech",
  "Industry",
  "Crushing",
  "Safety Technology",
  "Eco-Friendly Technology",
  "Industrial Safety",
  "Animal Nutrition",
  "Eco Fuel Technology",
  "Healthcare Technology",
  "Industrial Monitoring",
  "Audio Technology",
  "Beauty Products",
  "Education Technology",
  "Medical Beauty",
  "Health Technology",
  "Agriculture",
  "Agriculture Technology",
  "Eco Agriculture",
  "Food Innovation",
  "Food Products",
  "Construction Technology",
  "Industrial Pumps",
  "Air Purification",
  "Lifestyle Products",
  "Gas Safety Technology",
  "Packaging Equipment",
  "Water Technology",
  "Industrial Automation",
  "Textile Technology",
  "Industrial Sensors",
]

export default function CompanyForm({
  initialData,
  onSubmit,
  submitLabel,
  loading = false,
}: CompanyFormProps) {
  const [name, setName] = useState(initialData?.name || "")
  const [category, setCategory] = useState(initialData?.category || "")
  const [descriptionId, setDescriptionId] = useState(initialData?.description_id || "")
  const [descriptionEn, setDescriptionEn] = useState(initialData?.description_en || "")
  const [startDate, setStartDate] = useState(initialData?.start_date || "")
  const [endDate, setEndDate] = useState(initialData?.end_date || "")
  const [linkVideo, setLinkVideo] = useState(initialData?.link_video || "")

  const handleSubmit = async (e: FormEvent) => {
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
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Company Name */}
      <div>
        <label className="block text-sm font-medium text-slate-300 mb-2">
          Company Name <span className="text-red-400">*</span>
        </label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="e.g. ROBOTECH ENG CO.,LTD."
          required
          className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-xl text-white placeholder:text-slate-500 text-sm focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all"
        />
      </div>

      {/* Category */}
      <div>
        <label className="block text-sm font-medium text-slate-300 mb-2">
          Category <span className="text-red-400">*</span>
        </label>
        <div className="relative">
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
            className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-xl text-white text-sm focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all appearance-none cursor-pointer"
          >
            <option value="">Select category...</option>
            {categories.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
          <i className="fas fa-chevron-down absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 text-xs pointer-events-none" />
        </div>
        <p className="text-slate-500 text-xs mt-1.5">
          Or type a custom category below
        </p>
        <input
          type="text"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          placeholder="Custom category..."
          required
          className="w-full mt-2 px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-xl text-white placeholder:text-slate-500 text-sm focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all"
        />
      </div>

      {/* Description (ID) */}
      <div>
        <label className="block text-sm font-medium text-slate-300 mb-2">
          Description (ID)
        </label>
        <textarea
          value={descriptionId}
          onChange={(e) => setDescriptionId(e.target.value)}
          placeholder="Deskripsi perusahaan (Bahasa Indonesia)..."
          rows={6}
          className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-xl text-white placeholder:text-slate-500 text-sm focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all resize-y"
        />
      </div>

      {/* Description (EN) */}
      <div>
        <label className="block text-sm font-medium text-slate-300 mb-2">
          Description (EN)
        </label>
        <textarea
          value={descriptionEn}
          onChange={(e) => setDescriptionEn(e.target.value)}
          placeholder="Company description (English)..."
          rows={6}
          className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-xl text-white placeholder:text-slate-500 text-sm focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all resize-y"
        />
      </div>

      {/* Start Batch */}
      <div>
        <label className="block text-sm font-medium text-slate-300 mb-2">
          Start Batch
        </label>
        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-xl text-white text-sm focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all"
        />
      </div>

      {/* End Batch */}
      <div>
        <label className="block text-sm font-medium text-slate-300 mb-2">
          End Batch
        </label>
        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-xl text-white text-sm focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all"
        />
      </div>

      {/* Video Profile */}
      <div>
        <label className="block text-sm font-medium text-slate-300 mb-2">
          Video Profile
        </label>
        <input
          type="url"
          value={linkVideo}
          onChange={(e) => setLinkVideo(e.target.value)}
          placeholder="https://..."
          className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-xl text-white placeholder:text-slate-500 text-sm focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all"
        />
      </div>


      {/* Submit */}
      <button
        type="submit"
        disabled={loading || !name || !category}
        className="inline-flex items-center gap-2 px-6 py-3 bg-linear-to-r from-accent to-[#00a8b0] text-white font-semibold rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-accent/25 hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0 text-sm"
      >
        {loading ? (
          <>
            <i className="fas fa-spinner fa-spin" /> Saving...
          </>
        ) : (
          <>
            <i className="fas fa-save" /> {submitLabel}
          </>
        )}
      </button>
    </form>
  )
}
