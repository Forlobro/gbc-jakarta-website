"use client";

import { useState, useRef, useCallback } from "react";
import Image from "next/image";
import { GbcCompanyPhoto } from "../../lib/supabase";

interface PhotoManagerProps {
  companyId: number;
  photos: GbcCompanyPhoto[];
  onPhotosChange: () => void;
}

interface FilePreview {
  file: File;
  previewUrl: string;
  status: "pending" | "uploading" | "done" | "error";
  errorMsg?: string;
}

export default function PhotoManager({
  companyId,
  photos,
  onPhotosChange,
}: PhotoManagerProps) {
  const [queue, setQueue] = useState<FilePreview[]>([]);
  const [deletingId, setDeletingId] = useState<number | null>(null);
  const [isDragOver, setIsDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Add files to queue (from input or drop)
  const addFiles = useCallback((files: File[]) => {
    const imageFiles = files.filter((f) => f.type.startsWith("image/"));
    const newPreviews: FilePreview[] = imageFiles.map((f) => ({
      file: f,
      previewUrl: URL.createObjectURL(f),
      status: "pending",
    }));
    setQueue((prev) => [...prev, ...newPreviews]);
  }, []);

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    addFiles(Array.from(e.target.files || []));
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    addFiles(Array.from(e.dataTransfer.files));
  };

  const removeFromQueue = (index: number) => {
    setQueue((prev) => {
      URL.revokeObjectURL(prev[index].previewUrl);
      return prev.filter((_, i) => i !== index);
    });
  };

  // Upload all pending files
  const handleUploadAll = async () => {
    const pendingIdx = queue
      .map((item, i) => (item.status === "pending" ? i : -1))
      .filter((i) => i !== -1);

    if (pendingIdx.length === 0) return;

    // Upload one-by-one for per-file status
    for (const idx of pendingIdx) {
      setQueue((prev) =>
        prev.map((item, i) =>
          i === idx ? { ...item, status: "uploading" } : item
        )
      );

      const formData = new FormData();
      formData.append("photos", queue[idx].file);

      try {
        const res = await fetch(`/api/admin/companies/${companyId}/photos`, {
          method: "POST",
          body: formData,
        });

        const data = await res.json();
        console.log("[PhotoManager] upload response:", res.status, data);

        if (!res.ok || (data.errors?.length > 0 && !data.uploaded?.length)) {
          const errMsg = data.errors?.[0] || data.error || `Upload failed (${res.status})`;
          setQueue((prev) =>
            prev.map((item, i) =>
              i === idx ? { ...item, status: "error", errorMsg: errMsg } : item
            )
          );
        } else {
          setQueue((prev) =>
            prev.map((item, i) =>
              i === idx ? { ...item, status: "done" } : item
            )
          );
          onPhotosChange();
        }
      } catch {
        setQueue((prev) =>
          prev.map((item, i) =>
            i === idx
              ? { ...item, status: "error", errorMsg: "Network error" }
              : item
          )
        );
      }
    }
  };

  // Clear queue items that are done or errored
  const clearDone = () => {
    setQueue((prev) => {
      prev
        .filter((i) => i.status === "done" || i.status === "error")
        .forEach((i) => URL.revokeObjectURL(i.previewUrl));
      return prev.filter(
        (i) => i.status === "pending" || i.status === "uploading"
      );
    });
  };

  const handleDelete = async (photoId: number) => {
    if (!confirm("Delete this photo? This cannot be undone.")) return;
    setDeletingId(photoId);

    try {
      const res = await fetch(
        `/api/admin/companies/${companyId}/photos?photoId=${photoId}`,
        { method: "DELETE" }
      );

      if (!res.ok) {
        const err = await res.json();
        alert(`Delete failed: ${err.error}`);
        return;
      }

      onPhotosChange();
    } catch {
      alert("Delete failed. Please try again.");
    } finally {
      setDeletingId(null);
    }
  };

  const pendingCount = queue.filter((i) => i.status === "pending").length;
  const uploadingCount = queue.filter((i) => i.status === "uploading").length;
  const doneCount = queue.filter((i) => i.status === "done").length;
  const errorCount = queue.filter((i) => i.status === "error").length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <h3 className="text-lg font-bold text-white flex items-center gap-2">
        <i className="fas fa-images text-[#00c2cb]" /> Photos
        <span className="text-slate-500 text-sm font-normal ml-1">
          ({photos.length} saved)
        </span>
      </h3>

      {/* Saved Photos Grid */}
      {photos.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {photos.map((photo) => (
            <div
              key={photo.id}
              className="group relative aspect-[4/3] rounded-xl overflow-hidden bg-slate-800 border border-slate-700"
            >
              {photo.photo_url && (
                <Image
                  src={photo.photo_url}
                  alt="Company photo"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 50vw, 33vw"
                />
              )}
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center gap-2">
                {photo.photo_url && (
                  <a
                    href={photo.photo_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2.5 bg-slate-700 text-white rounded-lg hover:bg-slate-600 transition-colors"
                    title="View full size"
                  >
                    <i className="fas fa-external-link-alt text-sm" />
                  </a>
                )}
                <button
                  onClick={() => handleDelete(photo.id)}
                  disabled={deletingId === photo.id}
                  className="p-2.5 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors disabled:opacity-50 cursor-pointer"
                  title="Delete photo"
                >
                  {deletingId === photo.id ? (
                    <i className="fas fa-spinner fa-spin text-sm" />
                  ) : (
                    <i className="fas fa-trash-alt text-sm" />
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-slate-500 text-sm">No photos saved yet.</p>
      )}

      {/* Drag & Drop Upload Area */}
      <div
        onDragOver={(e) => { e.preventDefault(); setIsDragOver(true); }}
        onDragLeave={() => setIsDragOver(false)}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
        className={`relative border-2 border-dashed rounded-2xl p-8 text-center cursor-pointer transition-all duration-200 ${
          isDragOver
            ? "border-[#00c2cb] bg-[#00c2cb]/5 scale-[1.01]"
            : "border-slate-700 hover:border-slate-500 bg-slate-800/20"
        }`}
      >
        <i className={`fas fa-cloud-upload-alt text-3xl mb-3 ${isDragOver ? "text-[#00c2cb]" : "text-slate-600"}`} />
        <p className="text-slate-400 text-sm font-medium">
          {isDragOver ? "Drop photos here" : "Click or drag & drop photos"}
        </p>
        <p className="text-slate-600 text-xs mt-1">
          JPG, PNG, WebP, GIF — up to 10MB each — multiple allowed
        </p>
        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept="image/*"
          onChange={handleFileInput}
          onClick={(e) => e.stopPropagation()}
          className="hidden"
        />
      </div>

      {/* Upload Queue */}
      {queue.length > 0 && (
        <div className="space-y-3">
          {/* Queue header */}
          <div className="flex items-center justify-between">
            <p className="text-slate-300 text-sm font-medium">
              Upload Queue ({queue.length} file{queue.length !== 1 ? "s" : ""})
              {doneCount > 0 && <span className="text-emerald-400 ml-2">· {doneCount} done</span>}
              {errorCount > 0 && <span className="text-red-400 ml-2">· {errorCount} failed</span>}
            </p>
            {(doneCount > 0 || errorCount > 0) && (
              <button
                onClick={clearDone}
                className="text-slate-500 hover:text-slate-300 text-xs cursor-pointer transition-colors"
              >
                Clear finished
              </button>
            )}
          </div>

          {/* File list */}
          <div className="space-y-2 max-h-64 overflow-y-auto pr-1">
            {queue.map((item, idx) => (
              <div
                key={idx}
                className="flex items-center gap-3 p-3 bg-slate-800/50 rounded-xl border border-slate-700/50"
              >
                {/* Thumbnail */}
                <div className="w-12 h-12 rounded-lg overflow-hidden shrink-0 bg-slate-700">
                  <img
                    src={item.previewUrl}
                    alt=""
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <p className="text-white text-xs font-medium truncate">
                    {item.file.name}
                  </p>
                  <p className="text-slate-500 text-xs">
                    {(item.file.size / 1024 / 1024).toFixed(1)} MB
                  </p>
                  {item.status === "error" && (
                    <p className="text-red-400 text-xs mt-0.5">{item.errorMsg}</p>
                  )}
                </div>

                {/* Status badge */}
                <div className="shrink-0">
                  {item.status === "pending" && (
                    <span className="text-slate-500 text-xs">Pending</span>
                  )}
                  {item.status === "uploading" && (
                    <span className="text-[#00c2cb] text-xs flex items-center gap-1">
                      <i className="fas fa-spinner fa-spin text-[10px]" /> Uploading...
                    </span>
                  )}
                  {item.status === "done" && (
                    <span className="text-emerald-400 text-xs flex items-center gap-1">
                      <i className="fas fa-check text-[10px]" /> Done
                    </span>
                  )}
                  {item.status === "error" && (
                    <span className="text-red-400 text-xs flex items-center gap-1">
                      <i className="fas fa-times text-[10px]" /> Failed
                    </span>
                  )}
                </div>

                {/* Remove from queue (only pending/error) */}
                {(item.status === "pending" || item.status === "error") && (
                  <button
                    onClick={() => removeFromQueue(idx)}
                    className="shrink-0 w-6 h-6 flex items-center justify-center text-slate-600 hover:text-red-400 transition-colors cursor-pointer"
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
              onClick={handleUploadAll}
              disabled={uploadingCount > 0}
              className="w-full py-3 bg-gradient-to-r from-[#00c2cb] to-[#00a8b0] text-white font-semibold rounded-xl text-sm transition-all hover:shadow-lg hover:shadow-[#00c2cb]/25 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer flex items-center justify-center gap-2"
            >
              {uploadingCount > 0 ? (
                <>
                  <i className="fas fa-spinner fa-spin" />
                  Uploading {uploadingCount} of {pendingCount + uploadingCount}...
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
      )}
    </div>
  );
}
