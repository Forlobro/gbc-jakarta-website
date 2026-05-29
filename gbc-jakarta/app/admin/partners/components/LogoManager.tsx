"use client"

import { useRef, useState } from "react"
import Image from "next/image"
import { SelectFileButton, DeleteButton } from "../../components/FileActionButtons"
import { msg } from "../../../lib/messages"
import { uploadToStorage, makeStoragePath } from "../../../lib/supabase.upload"

const MAX_IMAGE_BYTES = 5 * 1024 * 1024 // 5 MB
const ALLOWED_TYPES = ["image/png"]
const ALLOWED_LABELS = "PNG"

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
      setFileError(msg.logoMustBePng)
      if (fileInputRef.current) fileInputRef.current.value = ""
      return
    }

    if (file.size > MAX_IMAGE_BYTES) {
      setFileError(msg.logoTooLarge)
      if (fileInputRef.current) fileInputRef.current.value = ""
      return
    }

    if (previewUrl) URL.revokeObjectURL(previewUrl)
    setSelectedFile(file)
    setPreviewUrl(URL.createObjectURL(file))
  }

  const clearSelected = () => {
    if (previewUrl) URL.revokeObjectURL(previewUrl)
    setSelectedFile(null)
    setPreviewUrl(null)
    setFileError(null)
    if (fileInputRef.current) fileInputRef.current.value = ""
  }

  const uploadLogo = async () => {
    if (!selectedFile) return
    setUploading(true)

    try {
      const storagePath = makeStoragePath(`${companyId}/logo`, selectedFile.name)
      const { publicUrl } = await uploadToStorage("gbc_companies_photos", storagePath, selectedFile)

      const res = await fetch(`/api/admin/partners/${companyId}/logo`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ logoUrl: publicUrl, oldLogoUrl: logoUrl }),
      })

      if (!res.ok) {
        const err = await res.json()
        setFileError(err.error)
        return
      }

      clearSelected()
      onLogoChange()
    } catch (err) {
      setFileError(err instanceof Error ? err.message : msg.serverError)
    } finally {
      setUploading(false)
    }
  }

  const deleteLogo = async () => {
    if (!logoUrl) return
    if (!confirm("Hapus logo ini?")) return

    setDeleting(true)
    try {
      const res = await fetch(`/api/admin/partners/${companyId}/logo`, { method: "DELETE" })

      if (!res.ok) {
        const err = await res.json()
        setFileError(err.error)
        return
      }

      clearSelected()
      onLogoChange()
    } catch {
      setFileError(msg.serverError)
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

      <div className="flex flex-col gap-4">
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

        <div className="space-y-3">
          <div className="flex items-center gap-2 flex-wrap">
            <SelectFileButton
              onClick={() => fileInputRef.current?.click()}
              disabled={uploading || deleting}
              label="Select Logo"
            />

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

            {previewUrl && (
              <button
                onClick={clearSelected}
                type="button"
                className="px-4 py-2 bg-white border border-slate-200 shadow-sm text-slate-500 rounded-lg text-sm font-medium hover:bg-slate-50 transition-colors cursor-pointer"
                disabled={uploading}
              >
                Batal
              </button>
            )}

            {logoUrl && !previewUrl && (
              <DeleteButton
                onClick={deleteLogo}
                disabled={uploading || deleting}
                loading={deleting}
                label="Delete Logo"
              />
            )}
          </div>

          {fileError ? (
            <p className="text-red-500 text-xs flex items-start gap-1.5">
              <i className="fas fa-exclamation-circle mt-0.5 shrink-0" />
              {fileError}
            </p>
          ) : (
            <p className="text-slate-500 text-xs">{ALLOWED_LABELS} — Max 5 MB.</p>
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
