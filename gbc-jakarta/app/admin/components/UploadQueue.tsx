"use client"

import Image from "next/image"

export type UploadStatus = "pending" | "uploading" | "done" | "error"

export interface UploadQueueItem {
  file: File
  previewUrl: string
  status: UploadStatus
  errorMsg?: string
}

interface UploadQueueProps {
  queue: UploadQueueItem[]
  /** Called when user clicks remove on a pending/error item */
  onRemove: (index: number) => void
  /** Called when user clicks the upload button */
  onUploadAll: () => void
  /** Called when user clicks "Clear finished" */
  onClearDone: () => void
  /** Whether any upload is in progress */
  uploading?: boolean
}

export default function UploadQueue({
  queue,
  onRemove,
  onUploadAll,
  onClearDone,
  uploading = false,
}: UploadQueueProps) {
  if (queue.length === 0) return null

  const pendingCount = queue.filter((i) => i.status === "pending").length
  const uploadingCount = queue.filter((i) => i.status === "uploading").length
  const doneCount = queue.filter((i) => i.status === "done").length
  const errorCount = queue.filter((i) => i.status === "error").length

  return (
    <div className="space-y-3">
      {/* Queue header */}
      <div className="flex items-center justify-between">
        <p className="text-slate-700 text-sm font-medium">
          Upload Queue ({queue.length} file{queue.length !== 1 ? "s" : ""})
          {doneCount > 0 && <span className="text-emerald-600 ml-2">· {doneCount} done</span>}
          {errorCount > 0 && <span className="text-red-600 ml-2">· {errorCount} failed</span>}
        </p>
        {(doneCount > 0 || errorCount > 0) && (
          <button
            onClick={onClearDone}
            className="text-slate-500 hover:text-slate-900 text-xs cursor-pointer transition-colors"
          >
            Clear finished
          </button>
        )}
      </div>

      {/* File list */}
      <div className="space-y-2 max-h-[40vh] overflow-y-auto pr-1">
        {queue.map((item, idx) => (
          <div
            key={idx}
            className="flex items-center gap-3 p-3 bg-white rounded-xl border border-slate-200 shadow-sm"
          >
            {/* Thumbnail */}
            <div className="w-12 h-12 rounded-lg overflow-hidden shrink-0 bg-slate-100">
              <Image
                src={item.previewUrl}
                alt="Upload preview"
                width={48}
                height={48}
                unoptimized
                className="w-full h-full object-cover"
              />
            </div>

            {/* Info */}
            <div className="flex-1 min-w-0">
              <p className="text-slate-900 text-xs font-medium truncate">{item.file.name}</p>
              <p className="text-slate-500 text-xs">
                {(item.file.size / 1024 / 1024).toFixed(1)} MB
              </p>
              {item.status === "error" && (
                <p className="text-red-600 text-xs mt-0.5">{item.errorMsg}</p>
              )}
            </div>

            {/* Status badge */}
            <div className="shrink-0">
              {item.status === "pending" && <span className="text-slate-500 text-xs">Pending</span>}
              {item.status === "uploading" && (
                <span className="text-accent text-xs flex items-center gap-1">
                  <i className="fas fa-spinner fa-spin text-[10px]" /> Uploading...
                </span>
              )}
              {item.status === "done" && (
                <span className="text-emerald-600 text-xs flex items-center gap-1">
                  <i className="fas fa-check text-[10px]" /> Done
                </span>
              )}
              {item.status === "error" && (
                <span className="text-red-600 text-xs flex items-center gap-1">
                  <i className="fas fa-times text-[10px]" /> Failed
                </span>
              )}
            </div>

            {/* Remove (only pending/error) */}
            {(item.status === "pending" || item.status === "error") && (
              <button
                onClick={() => onRemove(idx)}
                className="shrink-0 w-6 h-6 flex items-center justify-center text-slate-400 hover:text-red-600 transition-colors cursor-pointer"
              >
                <i className="fas fa-times text-xs" />
              </button>
            )}
          </div>
        ))}
      </div>

      {/* Upload button */}
      {pendingCount > 0 && (
        <button
          onClick={onUploadAll}
          disabled={uploading || uploadingCount > 0}
          className="w-full py-3 bg-linear-to-r from-accent to-[#00a8b0] text-white font-semibold rounded-xl text-sm transition-all hover:shadow-lg hover:shadow-accent/25 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer flex items-center justify-center gap-2"
        >
          {uploading || uploadingCount > 0 ? (
            <>
              <i className="fas fa-spinner fa-spin" />
              Uploading{" "}
              {uploadingCount > 0 ? `${uploadingCount} of ${pendingCount + uploadingCount}` : ""}...
            </>
          ) : (
            <>
              <i className="fas fa-cloud-upload-alt" />
              Upload {pendingCount} photo{pendingCount !== 1 ? "s" : ""}
            </>
          )}
        </button>
      )}
    </div>
  )
}
