"use client"

import { useRef, useState } from "react"

interface BrochureManagerProps {
  companyId: number
  companyName: string
  brochureUrl: string | null
  onBrochureChange: () => void
}

export default function BrochureManager({
  companyId,
  companyName,
  brochureUrl,
  onBrochureChange,
}: BrochureManagerProps) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [uploading, setUploading] = useState(false)
  const [deleting, setDeleting] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handlePickFile = (file: File | null) => {
    if (!file) return
    if (file.type !== "application/pdf") {
      alert("File harus berupa PDF")
      return
    }
    if (file.size > 20 * 1024 * 1024) {
      alert("Ukuran PDF maksimal 20MB")
      return
    }
    setSelectedFile(file)
  }

  const clearSelected = () => {
    setSelectedFile(null)
    if (fileInputRef.current) fileInputRef.current.value = ""
  }

  const uploadBrochure = async () => {
    if (!selectedFile) return
    setUploading(true)

    try {
      const formData = new FormData()
      formData.append("brochure", selectedFile)

      const res = await fetch(`/api/admin/companies/${companyId}/brochure`, {
        method: "POST",
        body: formData,
      })

      if (!res.ok) {
        const err = await res.json()
        alert(`Upload brosur gagal: ${err.error}`)
        return
      }

      clearSelected()
      onBrochureChange()
    } catch {
      alert("Upload brosur gagal. Silakan coba lagi.")
    } finally {
      setUploading(false)
    }
  }

  const deleteBrochure = async () => {
    if (!brochureUrl) return
    if (!confirm("Hapus brosur PDF ini?")) return

    setDeleting(true)
    try {
      const res = await fetch(`/api/admin/companies/${companyId}/brochure`, {
        method: "DELETE",
      })

      if (!res.ok) {
        const err = await res.json()
        alert(`Hapus brosur gagal: ${err.error}`)
        return
      }

      clearSelected()
      onBrochureChange()
    } catch {
      alert("Hapus brosur gagal. Silakan coba lagi.")
    } finally {
      setDeleting(false)
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
          <i className="far fa-file-pdf text-accent" /> Company Brochure (PDF)
        </h3>
        <p className="text-slate-500 text-xs mt-1">
          Upload file PDF brosur perusahaan. File disimpan di storage folder{" "}
          <code className="text-accent">pdf/{companyId}/</code>.
        </p>
      </div>

      {/* Current Brochure Status */}
      <div className="flex items-center gap-4 p-4 bg-slate-50 border border-slate-200 rounded-xl shadow-sm">
        <div className="w-12 h-12 bg-red-50 border border-red-100 rounded-xl flex items-center justify-center shrink-0">
          <i className="far fa-file-pdf text-red-600 text-xl" />
        </div>
        <div className="flex-1 min-w-0">
          {brochureUrl ? (
            <>
              <p className="text-slate-900 text-sm font-medium truncate">
                {companyName} — Brochure
              </p>
              <a
                href={brochureUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent text-xs hover:underline truncate block"
              >
                Lihat PDF <i className="fas fa-external-link-alt ml-1" />
              </a>
            </>
          ) : (
            <>
              <p className="text-slate-500 text-sm">Belum ada brosur</p>
              <p className="text-slate-500 text-xs">
                Upload file PDF di bawah
              </p>
            </>
          )}
        </div>

        {selectedFile && (
          <span className="text-accent text-xs font-medium shrink-0">
            <i className="far fa-check-circle mr-1" />
            {selectedFile.name}
          </span>
        )}
      </div>

      {/* Actions */}
      <div className="flex items-center gap-2 flex-wrap">
        <button
          onClick={() => fileInputRef.current?.click()}
          type="button"
          className="px-4 py-2 bg-white border border-slate-200 shadow-sm text-slate-700 rounded-lg text-sm font-medium hover:bg-slate-50 transition-colors cursor-pointer disabled:opacity-50"
          disabled={uploading || deleting}
        >
          <i className="far fa-folder-open mr-2" />
          Pilih PDF
        </button>

        {selectedFile && (
          <button
            onClick={uploadBrochure}
            type="button"
            className="px-4 py-2 bg-gradient-to-r from-accent to-[#00a8b0] text-white rounded-lg text-sm font-semibold hover:shadow-lg hover:shadow-accent/25 transition-all cursor-pointer disabled:opacity-50"
            disabled={uploading || deleting}
          >
            {uploading ? (
              <>
                <i className="fas fa-spinner fa-spin mr-2" />
                Uploading...
              </>
            ) : (
              <>
                <i className="fas fa-upload mr-2" />
                Upload Brosur
              </>
            )}
          </button>
        )}

        {selectedFile && (
          <button
            onClick={clearSelected}
            type="button"
            className="px-4 py-2 bg-white border border-slate-200 shadow-sm text-slate-500 rounded-lg text-sm font-medium hover:bg-slate-50 transition-colors cursor-pointer"
            disabled={uploading}
          >
            Batal
          </button>
        )}

        {brochureUrl && !selectedFile && (
          <button
            onClick={deleteBrochure}
            type="button"
            className="px-4 py-2 bg-red-50 text-red-600 border border-red-100 rounded-lg text-sm font-medium hover:bg-red-100 transition-colors cursor-pointer disabled:opacity-50"
            disabled={uploading || deleting}
          >
            {deleting ? (
              <>
                <i className="fas fa-spinner fa-spin mr-2" />
                Deleting...
              </>
            ) : (
              <>
                <i className="far fa-trash mr-2" />
                Hapus Brosur
              </>
            )}
          </button>
        )}
      </div>

      <p className="text-slate-500 text-xs">PDF only — maksimal 20MB.</p>

      <input
        ref={fileInputRef}
        type="file"
        accept="application/pdf"
        className="hidden"
        onChange={(e) => handlePickFile(e.target.files?.[0] || null)}
      />
    </div>
  )
}
