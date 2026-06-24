"use client"

import { useState } from "react"
import { GbcEvent } from "../../../lib/supabase"

export type EventFormData = Pick<
  GbcEvent,
  | "title"
  | "location"
  | "venue"
  | "description_en"
  | "description_id"
  | "status"
  | "is_published"
  | "link_video_1"
  | "link_video_2"
  | "link_form_register"
  | "link_website"
  | "event_start"
  | "event_end"
>

interface EventFormProps {
  initialData?: Partial<EventFormData>
  onSubmit: (data: EventFormData) => Promise<void>
  submitLabel: string
  loading?: boolean
}

export default function EventForm({
  initialData,
  onSubmit,
  submitLabel,
  loading = false,
}: EventFormProps) {
  const [title, setTitle] = useState(initialData?.title || "")
  const [location, setLocation] = useState(initialData?.location || "")
  const [venue, setVenue] = useState(initialData?.venue || "")
  const [descriptionEn, setDescriptionEn] = useState(initialData?.description_en || "")
  const [descriptionId, setDescriptionId] = useState(initialData?.description_id || "")
  const [status, setStatus] = useState<"upcoming" | "accomplished">(
    initialData?.status || "upcoming",
  )
  const [isPublished, setIsPublished] = useState(initialData?.is_published ?? false)
  const [linkVideo1, setLinkVideo1] = useState(initialData?.link_video_1 || "")
  const [linkVideo2, setLinkVideo2] = useState(initialData?.link_video_2 || "")
  const [linkFormRegister, setLinkFormRegister] = useState(initialData?.link_form_register || "")
  const [linkWebsite, setLinkWebsite] = useState(initialData?.link_website || "")
  const [eventStart, setEventStart] = useState(
    initialData?.event_start ? initialData.event_start.slice(0, 16) : "",
  )
  const [eventEnd, setEventEnd] = useState(
    initialData?.event_end ? initialData.event_end.slice(0, 16) : "",
  )

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault()
    await onSubmit({
      title,
      location,
      venue,
      description_en: descriptionEn,
      description_id: descriptionId,
      status,
      is_published: isPublished,
      link_video_1: linkVideo1 || null,
      link_video_2: linkVideo2 || null,
      link_form_register: linkFormRegister || null,
      link_website: linkWebsite || null,
      event_start: eventStart || null,
      event_end: eventEnd || null,
    })
  }

  const inputClass =
    "w-full px-4 py-3 bg-white border border-slate-200 rounded-xl text-slate-900 placeholder:text-slate-400 text-sm focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all"
  const labelClass = "block text-sm font-medium text-slate-700 mb-2"

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6 h-full">
      {/* Title */}
      <div>
        <label className={labelClass}>
          Title <span className="text-red-400">*</span>
        </label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="e.g. GBC Jakarta Business Networking 2025"
          required
          className={inputClass}
        />
      </div>

      {/* Location + Venue */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className={labelClass}>
            Location <span className="text-red-400">*</span>
          </label>
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="e.g. Jakarta, Indonesia"
            required
            className={inputClass}
          />
        </div>
        <div>
          <label className={labelClass}>
            Venue <span className="text-red-400">*</span>
          </label>
          <input
            type="text"
            value={venue}
            onChange={(e) => setVenue(e.target.value)}
            placeholder="e.g. DBS Tower, Kuningan"
            required
            className={inputClass}
          />
        </div>
      </div>

      {/* Description EN */}
      <div>
        <label className={labelClass}>
          Description (EN) <span className="text-red-400">*</span>
        </label>
        <textarea
          value={descriptionEn}
          onChange={(e) => setDescriptionEn(e.target.value)}
          placeholder="Event description (English)..."
          rows={4}
          required
          className={`${inputClass} resize-y`}
        />
      </div>

      {/* Description ID */}
      <div>
        <label className={labelClass}>
          Description (ID) <span className="text-red-400">*</span>
        </label>
        <textarea
          value={descriptionId}
          onChange={(e) => setDescriptionId(e.target.value)}
          placeholder="Deskripsi event (Bahasa Indonesia)..."
          rows={4}
          required
          className={`${inputClass} resize-y`}
        />
      </div>

      {/* Status + Published */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className={labelClass}>
            Status <span className="text-red-400">*</span>
          </label>
          <div className="relative">
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value as "upcoming" | "accomplished")}
              required
              className={`${inputClass} appearance-none cursor-pointer`}
            >
              <option value="upcoming">Upcoming</option>
              <option value="accomplished">Accomplished</option>
            </select>
            <i className="fas fa-chevron-down absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 text-xs pointer-events-none" />
          </div>
        </div>

        <div>
          <label className={labelClass}>Visibility</label>
          <button
            type="button"
            onClick={() => setIsPublished((v) => !v)}
            className={`w-full px-4 py-3 rounded-xl text-sm font-medium border-2 transition-all cursor-pointer flex items-center gap-2 ${
              isPublished
                ? "bg-emerald-50 border-emerald-300 text-emerald-700"
                : "bg-slate-50 border-slate-200 text-slate-500"
            }`}
          >
            <i className={`fas ${isPublished ? "fa-eye" : "fa-eye-slash"} text-xs`} />
            {isPublished ? "Published" : "Draft"}
          </button>
        </div>
      </div>

      {/* Event Start + End */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className={labelClass}>Event Start</label>
          <input
            type="datetime-local"
            value={eventStart}
            onChange={(e) => setEventStart(e.target.value)}
            className={inputClass}
          />
        </div>
        <div>
          <label className={labelClass}>Event End</label>
          <input
            type="datetime-local"
            value={eventEnd}
            onChange={(e) => setEventEnd(e.target.value)}
            className={inputClass}
          />
        </div>
      </div>

      {/* Video 1 */}
      <div>
        <label className={labelClass}>Video 1 (YouTube URL)</label>
        <input
          type="url"
          value={linkVideo1}
          onChange={(e) => setLinkVideo1(e.target.value)}
          placeholder="https://youtube.com/watch?v=..."
          className={inputClass}
        />
      </div>

      {/* Video 2 */}
      <div>
        <label className={labelClass}>Video 2 (YouTube URL)</label>
        <input
          type="url"
          value={linkVideo2}
          onChange={(e) => setLinkVideo2(e.target.value)}
          placeholder="https://youtube.com/watch?v=..."
          className={inputClass}
        />
      </div>

      {/* Registration Form Link */}
      <div>
        <label className={labelClass}>Registration Form Link</label>
        <input
          type="url"
          value={linkFormRegister}
          onChange={(e) => setLinkFormRegister(e.target.value)}
          placeholder="https://forms.google.com/..."
          className={inputClass}
        />
      </div>

      {/* Website Link */}
      <div>
        <label className={labelClass}>Website Link</label>
        <input
          type="url"
          value={linkWebsite}
          onChange={(e) => setLinkWebsite(e.target.value)}
          placeholder="https://example.com/..."
          className={inputClass}
        />
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={loading || !title || !location || !venue || !descriptionEn || !descriptionId}
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
