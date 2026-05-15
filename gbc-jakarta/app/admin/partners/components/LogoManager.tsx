"use client"

import { useRef, useState } from "react"
import Image from "next/image"

interface LogoManagerProps {
  companyId: number
  companyName: string
  logoUrl: string | null
  onLogoChange: () => void
}

function getPartnerLogoText(name: string) {
  const safeName = name.trim()
  if (!safeName) return "?"
  return safeName.split(" ").slice(0, 2).join(" ")
}

const ALLOWED_TYPES = ["image/png"]
const ALLOWED_LABELS = "PNG"

export default function LogoManager({
  companyId,
  companyName,
  logoUrl,
  onLogoChange,
}: LogoManagerProps) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const [uploading, setUploading] = useState(false)
  const [deleting, setDeleting] = useState(false)
  const [fileError, setFileError] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const currentPreview = previewUrl || logoUrl

  const handlePickFile = (file: File | null) => {
    if (!file) return
    setFileError(null)

    if (!ALLOWED_TYPES.includes(file.type)) {
      setFileError(
        `Format tidak didukung. Logo hanya bisa diupload dalam format ${ALLOWED_LABELS}.`,
      )
      if (fileInputRef.current) fileInputRef.current.value = ""
      return
    }

    if (file.size > 10 * 1024 * 1024) {
      setFileError("Ukuran logo maksimal 10MB.")
      if (fileInputRef.current) fileInputRef.current.value = ""
      return
    }

    if (previewUrl) {
      URL.revokeObjectURL(previewUrl)
    }

    setSelectedFile(file)
    setPreviewUrl(URL.createObjectURL(file))
  }

  const clearSelected = () => {
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl)
    }
    setSelectedFile(null)
    setPreviewUrl(null)
    setFileError(null)
    if (fileInputRef.current) fileInputRef.current.value = ""
  }

  const uploadLogo = async () => {
    if (!selectedFile) return
    setUploading(true)

    try {
      const formData = new FormData()
      formData.append("logo", selectedFile)

      const res = await fetch(`/api/admin/partners/${companyId}/logo`, {
        method: "POST",
        body: formData,
      })

      if (!res.ok) {
        const err = await res.json()
        setFileError(`Upload logo gagal: ${err.error}`)
        return
      }

      clearSelected()
      onLogoChange()
    } catch {
      setFileError("Upload logo gagal. Silakan coba lagi.")
    } finally {
      setUploading(false)
    }
  }

  const deleteLogo = async () => {
    if (!logoUrl) return
    if (!confirm("Hapus logo ini?")) return

    setDeleting(true)
    try {
      const res = await fetch(`/api/admin/partners/${companyId}/logo`, {
        method: "DELETE",
      })

      if (!res.ok) {
        const err = await res.json()
        setFileError(`Hapus logo gagal: ${err.error}`)
        return
      }

      clearSelected()
      onLogoChange()
    } catch {
      setFileError("Hapus logo gagal. Silakan coba lagi.")
    } finally {
      setDeleting(false)
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
          <i className="far fa-image text-accent" /> Partner Logo
        </h3>
      </div>

      <div className="flex items-center gap-4">
        <div className="w-20 h-20 rounded-2xl overflow-hidden bg-slate-100 border border-slate-200 flex items-center justify-center shrink-0">
          {currentPreview ? (
            <Image
              src={currentPreview}
              alt={companyName}
              width={80}
              height={80}
              unoptimized={Boolean(previewUrl)}
              className="w-full h-full object-cover"
            />
          ) : (
            <span className="font-display font-bold text-[0.75rem] text-slate-600 text-center p-2 leading-tight">
              {getPartnerLogoText(companyName)}
            </span>
          )}
        </div>

        <div className="flex-1 space-y-3">
          <div className="flex items-center gap-2 flex-wrap">
            <button
              onClick={() => fileInputRef.current?.click()}
              type="button"
              className="px-4 py-2 bg-white border border-slate-200 text-slate-700 rounded-lg text-sm font-medium hover:bg-slate-50 transition-colors cursor-pointer shadow-sm"
              disabled={uploading || deleting}
            >
              Pilih Logo
            </button>

            {selectedFile && (
              <button
                onClick={uploadLogo}
                type="button"
                className="px-4 py-2 bg-linear-to-r from-accent to-[#00a8b0] text-white rounded-lg text-sm font-semibold hover:shadow-lg hover:shadow-accent/25 transition-all cursor-pointer disabled:opacity-50"
                disabled={uploading || deleting}
              >
                {uploading ? "Uploading..." : "Upload Logo"}
              </button>
            )}

            {(logoUrl || previewUrl) && (
              <button
                onClick={previewUrl ? clearSelected : deleteLogo}
                type="button"
                className="px-4 py-2 bg-red-500 text-white rounded-lg text-sm font-medium hover:bg-red-600 transition-colors cursor-pointer disabled:opacity-50"
                disabled={uploading || deleting}
              >
                {previewUrl ? "Batal" : deleting ? "Deleting..." : "Hapus Logo"}
              </button>
            )}
          </div>

          {fileError ? (
            <p className="text-red-500 text-xs flex items-start gap-1.5">
              <i className="fas fa-exclamation-circle mt-0.5 shrink-0" />
              {fileError}
            </p>
          ) : (
            <p className="text-slate-500 text-xs">{ALLOWED_LABELS} — maksimal 10MB.</p>
          )}
        </div>
      </div>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/png"
        className="hidden"
        onChange={(e) => handlePickFile(e.target.files?.[0] || null)}
      />
    </div>
  )
}
