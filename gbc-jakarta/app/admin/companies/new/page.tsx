"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import CompanyForm, { CompanyFormData } from "../../components/CompanyForm"

export const dynamic = "force-dynamic"

export default function AdminNewCompanyPage() {
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = async (data: CompanyFormData) => {
    setLoading(true)

    try {
      const res = await fetch("/api/admin/companies", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })

      if (!res.ok) {
        const err = await res.json()
        alert(`Error: ${err.error}`)
        return
      }

      const company = await res.json()
      router.push(`/admin/companies/${company.id}/edit`)
    } catch {
      alert("Failed to create company. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <Link
          href="/admin/companies"
          className="inline-flex items-center gap-2 text-slate-500 hover:text-slate-900 text-sm mb-4 transition-colors"
        >
          <i className="fas fa-arrow-left" /> Back to Companies
        </Link>
        <h1 className="text-2xl font-bold text-slate-900">Add New Company</h1>
        <p className="text-slate-500 text-sm mt-1">
          Create a new company entry. You can add photos after saving.
        </p>
      </div>

      {/* Form */}
      <div className="max-w-2xl bg-white border border-slate-200 rounded-2xl p-4 sm:p-8 shadow-sm">
        <CompanyForm
          onSubmit={handleSubmit}
          submitLabel="Create Company"
          loading={loading}
        />
      </div>
    </div>
  )
}
