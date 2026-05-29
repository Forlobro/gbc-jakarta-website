"use client"

import { useRef, useState } from "react"

interface DropZoneProps {
  /** Called with valid files after selection or drop */
  onFiles: (files: File[]) => void
  /** Accepted MIME types (e.g. "image/*") */
  accept?: string
  /** Allow multiple file selection */
  multiple?: boolean
  /** Disable interaction */
  disabled?: boolean
  /** Hint text shown below the main label */
  hint?: string
  /** Main label when idle */
  label?: string
  /** Label shown during drag-over */
  dragLabel?: string
}

export default function DropZone({
  onFiles,
  accept = "image/*",
  multiple = true,
  disabled = false,
  hint = "JPG, PNG, WebP — max 5 MB each — up to 8 photos at a time",
  label = "Click or drag & drop photos",
  dragLabel = "Drop photos here",
}: DropZoneProps) {
  const [isDragOver, setIsDragOver] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(false)
    if (disabled) return
    const files = Array.from(e.dataTransfer.files)
    if (files.length > 0) onFiles(files)
  }

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    if (files.length > 0) onFiles(files)
    if (fileInputRef.current) fileInputRef.current.value = ""
  }

  return (
    <div
      onDragOver={(e) => {
        e.preventDefault()
        if (!disabled) setIsDragOver(true)
      }}
      onDragLeave={() => setIsDragOver(false)}
      onDrop={handleDrop}
      onClick={() => !disabled && fileInputRef.current?.click()}
      className={`relative border-2 border-dashed rounded-2xl p-8 text-center transition-all duration-200 ${
        disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
      } ${
        isDragOver
          ? "border-accent bg-accent/5 scale-[1.01]"
          : "border-slate-300 hover:border-slate-400 bg-slate-50"
      }`}
    >
      <i
        className={`fas fa-cloud-upload-alt text-3xl mb-3 ${
          isDragOver ? "text-accent" : "text-slate-400"
        }`}
      />
      <p className="text-slate-600 text-sm font-medium">{isDragOver ? dragLabel : label}</p>
      {hint && <p className="text-slate-500 text-xs mt-1">{hint}</p>}
      <input
        ref={fileInputRef}
        type="file"
        multiple={multiple}
        accept={accept}
        onChange={handleFileInput}
        onClick={(e) => e.stopPropagation()}
        className="hidden"
        disabled={disabled}
      />
    </div>
  )
}
