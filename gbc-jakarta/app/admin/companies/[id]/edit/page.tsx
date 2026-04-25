"use client"

import { useEffect, useState, use, useCallback } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import CompanyForm, { CompanyFormData } from "../../../components/CompanyForm"
import LogoManager from "../../../components/LogoManager"
import PhotoManager from "../../../components/PhotoManager"
import { GbcCompanyWithPhotos } from "../../../../lib/supabase"

export default function AdminEditCompanyPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = use(params)
  const [company, setCompany] = useState<GbcCompanyWithPhotos | null>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const router = useRouter()

  const fetchCompany = useCallback(() => {
    fetch(`/api/admin/companies/${id}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          alert("Company not found")
          router.push("/admin/companies")
          return
        }
        setCompany(data)
      })
      .finally(() => setLoading(false))
  }, [id, router])

  useEffect(() => {
    fetchCompany()
  }, [fetchCompany])

  const handleSubmit = async (data: CompanyFormData) => {
    setSaving(true)
    setSaved(false)

    try {
      const res = await fetch(`/api/admin/companies/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })

      if (!res.ok) {
        const err = await res.json()
        alert(`Error: ${err.error}`)
        return
      }

      const updated = await res.json()
      setCompany((prev) => (prev ? { ...prev, ...updated } : prev))
      setSaved(true)
      setTimeout(() => setSaved(false), 3000)
    } catch {
      alert("Failed to update. Please try again.")
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-24">
        <i className="fas fa-spinner fa-spin text-2xl text-accent" />
      </div>
    )
  }

  if (!company) return null

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <Link
          href="/admin/companies"
          className="inline-flex items-center gap-2 text-slate-400 hover:text-white text-sm mb-4 transition-colors"
        >
          <i className="fas fa-arrow-left" /> Back to Companies
        </Link>
        <div className="flex items-center gap-4">
          <h1 className="text-2xl font-bold text-white">
            Edit: {company.name}
          </h1>
          {saved && (
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-emerald-500/10 text-emerald-400 rounded-lg text-sm font-medium">
              <i className="fas fa-check" /> Saved!
            </span>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        {/* Company Form */}
        <div className="bg-slate-800/50 border border-slate-700/50 rounded-2xl p-8 backdrop-blur-sm">
          <h2 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
            <i className="fas fa-edit text-accent" /> Company Details
          </h2>
          <CompanyForm
            initialData={{
              name: company.name || "",
              category: company.category || "",
              description_id: company.description_id || "",
              description_en: company.description_en || "",
              start_date: company.start_date || "",
              end_date: company.end_date || "",
              link_video: company.link_video || "",
              link_brochure: company.link_brochure || "",
            }}
            onSubmit={handleSubmit}
            submitLabel="Update Company"
            loading={saving}
          />
        </div>

        {/* Photo Manager */}
        <div className="space-y-8">
          <div className="bg-slate-800/50 border border-slate-700/50 rounded-2xl p-8 backdrop-blur-sm">
            <LogoManager
              companyId={company.id}
              companyName={company.name || ""}
              logoUrl={company.logo_url || null}
              onLogoChange={fetchCompany}
            />
          </div>

          <div className="bg-slate-800/50 border border-slate-700/50 rounded-2xl p-8 backdrop-blur-sm">
            <PhotoManager
              companyId={company.id}
              photos={company.gbc_companies_photos || []}
              onPhotosChange={fetchCompany}
              title="Gallery"
              description="Upload foto pendukung untuk gallery company."
            />
          </div>
        </div>
      </div>
    </div>
  )
}
