"use client"

import { useRef, useState } from "react"
import { SelectFileButton, DeleteButton } from "../../components/FileActionButtons"
import AlertBanner from "../../components/AlertBanner"
import { msg } from "../../../lib/messages"
import { uploadToStorage, makeStoragePath } from "../../../lib/supabase.upload"

const MAX_PDF_BYTES = 10 * 1024 * 1024 // 10 MB

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
  const [error, setError] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handlePickFile = (file: File | null) => {
    if (!file) return
    setError(null)
    if (file.type !== "application/pdf") {
      setError(msg.brochureMustBePdf)
      return
    }
    if (file.size > MAX_PDF_BYTES) {
      setError(msg.brochureTooLarge)
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
    setError(null)

    try {
      const storagePath = makeStoragePath(`pdf/${companyId}`, selectedFile.name)
      const { publicUrl } = await uploadToStorage("gbc_companies_photos", storagePath, selectedFile)

      const res = await fetch(`/api/admin/partners/${companyId}/brochure`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ brochureUrl: publicUrl, oldBrochureUrl: brochureUrl }),
      })

      if (!res.ok) {
        const err = await res.json()
        setError(err.error)
        return
      }

      clearSelected()
      onBrochureChange()
    } catch (err) {
      setError(err instanceof Error ? err.message : msg.serverError)
    } finally {
      setUploading(false)
    }
  }

  const deleteBrochure = async () => {
    if (!brochureUrl) return
    if (!confirm("Hapus brosur PDF ini?")) return

    setDeleting(true)
    setError(null)
    try {
      const res = await fetch(`/api/admin/partners/${companyId}/brochure`, {
        method: "DELETE",
      })

      if (!res.ok) {
        const err = await res.json()
        setError(err.error)
        return
      }

      clearSelected()
      onBrochureChange()
    } catch {
      setError(msg.serverError)
    } finally {
      setDeleting(false)
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
          <i className="far fa-file-pdf text-accent" /> Brochure
        </h3>
      </div>

      {/* Error */}
      {error && <AlertBanner message={error} onDismiss={() => setError(null)} />}

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
              <p className="text-slate-500 text-xs">Upload file PDF di bawah</p>
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
        <SelectFileButton
          onClick={() => fileInputRef.current?.click()}
          disabled={uploading || deleting}
          label="Select PDF"
        />

        {selectedFile && (
          <button
            onClick={uploadBrochure}
            type="button"
            className="px-4 py-2 bg-gradient-to-r from-accent to-[#00a8b0] text-white rounded-lg text-sm font-semibold hover:shadow-lg hover:shadow-accent/25 transition-all cursor-pointer disabled:opacity-50 flex items-center gap-2"
            disabled={uploading || deleting}
          >
            {uploading ? (
              <>
                <i className="fas fa-spinner fa-spin" />
                Uploading...
              </>
            ) : (
              <>
                <i className="fas fa-upload" />
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
          <DeleteButton
            onClick={deleteBrochure}
            disabled={uploading || deleting}
            loading={deleting}
            label="Delete Brochure"
          />
        )}
      </div>

      <p className="text-slate-500 text-xs">PDF only — Max 10 MB.</p>

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
