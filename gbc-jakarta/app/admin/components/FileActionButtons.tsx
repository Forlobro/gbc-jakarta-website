"use client"

interface SelectFileButtonProps {
  onClick: () => void
  disabled?: boolean
  label?: string
}

interface DeleteButtonProps {
  onClick: () => void
  disabled?: boolean
  loading?: boolean
  label?: string
  loadingLabel?: string
}

export function SelectFileButton({
  onClick,
  disabled = false,
  label = "Select File",
}: SelectFileButtonProps) {
  return (
    <button
      onClick={onClick}
      type="button"
      disabled={disabled}
      className="px-4 py-2 bg-white border border-slate-200 shadow-sm text-slate-700 rounded-lg text-sm font-medium hover:bg-slate-50 transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
    >
      <i className="far fa-folder-open" />
      {label}
    </button>
  )
}

export function DeleteButton({
  onClick,
  disabled = false,
  loading = false,
  label = "Delete",
  loadingLabel = "Deleting...",
}: DeleteButtonProps) {
  return (
    <button
      onClick={onClick}
      type="button"
      disabled={disabled || loading}
      className="px-4 py-2 bg-red-50 text-red-600 border border-red-100 rounded-lg text-sm font-medium hover:bg-red-100 transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
    >
      {loading ? (
        <>
          <i className="fas fa-spinner fa-spin" />
          {loadingLabel}
        </>
      ) : (
        <>
          <i className="fas fa-trash-alt" />
          {label}
        </>
      )}
    </button>
  )
}
