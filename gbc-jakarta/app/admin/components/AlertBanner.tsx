"use client"

interface AlertBannerProps {
  message: string
  onDismiss?: () => void
  variant?: "error" | "warning" | "info" | "success"
}

const VARIANTS = {
  error: {
    container: "bg-red-50 border-red-100 text-red-600",
    icon: "fas fa-exclamation-circle",
  },
  warning: {
    container: "bg-amber-50 border-amber-100 text-amber-700",
    icon: "fas fa-exclamation-triangle",
  },
  info: {
    container: "bg-blue-50 border-blue-100 text-blue-600",
    icon: "fas fa-info-circle",
  },
  success: {
    container: "bg-emerald-50 border-emerald-100 text-emerald-600",
    icon: "fas fa-check-circle",
  },
}

/** Raw technical error patterns that should show a friendly message instead */
const TECHNICAL_PATTERNS = [
  /^TypeError:/i,
  /^fetch failed/i,
  /^NetworkError/i,
  /^AbortError/i,
  /^SyntaxError.*JSON/i,
  /ECONNREFUSED/i,
  /ETIMEDOUT/i,
]

function sanitizeMessage(message: string): string {
  if (TECHNICAL_PATTERNS.some((pattern) => pattern.test(message))) {
    return "An error occurred."
  }
  return message
}

export default function AlertBanner({ message, onDismiss, variant = "error" }: AlertBannerProps) {
  const styles = VARIANTS[variant]
  const displayMessage = sanitizeMessage(message)

  return (
    <div className={`flex items-center gap-2 p-3 border rounded-xl text-sm ${styles.container}`}>
      <i className={`${styles.icon} shrink-0`} />
      <span className="flex-1">{displayMessage}</span>
      {onDismiss && (
        <button onClick={onDismiss} className="ml-auto shrink-0 cursor-pointer">
          <i className="fas fa-times" />
        </button>
      )}
    </div>
  )
}
