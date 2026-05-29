/**
 * Pagination — reusable pagination with count label.
 *
 * Props:
 * - currentPage: current active page (1-indexed)
 * - totalPages: total number of pages
 * - onPageChange: callback when page changes
 * - countLabel: text shown on the left (e.g. "Showing 9 of 45 partners")
 */

interface PaginationProps {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
  countLabel?: React.ReactNode
}

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  countLabel,
}: PaginationProps) {
  if (totalPages <= 1 && !countLabel) return null

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
      {countLabel && <p className="text-text-muted text-sm">{countLabel}</p>}

      {totalPages > 1 && (
        <div className="flex items-center gap-1.5">
          {/* Prev */}
          <button
            onClick={() => onPageChange(Math.max(1, currentPage - 1))}
            disabled={currentPage === 1}
            className="w-9 h-9 flex items-center justify-center rounded-full border-2 border-gray-200 text-text-light text-sm transition-all duration-200 hover:border-primary hover:text-primary disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
            aria-label="Previous page"
          >
            <i className="fas fa-chevron-left text-xs" />
          </button>

          {/* Page numbers */}
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => {
            const isActive = page === currentPage
            const show = page === 1 || page === totalPages || Math.abs(page - currentPage) <= 1

            if (!show) {
              if (page === 2 || page === totalPages - 1)
                return (
                  <span
                    key={page}
                    className="w-9 h-9 flex items-center justify-center text-text-muted text-sm select-none"
                  >
                    …
                  </span>
                )
              return null
            }

            return (
              <button
                key={page}
                onClick={() => onPageChange(page)}
                className={`w-9 h-9 flex items-center justify-center rounded-full border-2 text-sm font-semibold transition-all duration-200 cursor-pointer ${
                  isActive
                    ? "bg-primary border-primary text-white shadow-md"
                    : "border-gray-200 text-text-light hover:border-primary hover:text-primary"
                }`}
                aria-label={`Page ${page}`}
                aria-current={isActive ? "page" : undefined}
              >
                {page}
              </button>
            )
          })}

          {/* Next */}
          <button
            onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
            disabled={currentPage === totalPages}
            className="w-9 h-9 flex items-center justify-center rounded-full border-2 border-gray-200 text-text-light text-sm transition-all duration-200 hover:border-primary hover:text-primary disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
            aria-label="Next page"
          >
            <i className="fas fa-chevron-right text-xs" />
          </button>
        </div>
      )}
    </div>
  )
}
