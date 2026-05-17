/**
 * SectionBadge — reusable section label with accent line(s).
 *
 * Props:
 * - children: label text
 * - centered: adds line on both sides (default: false, line only on left)
 */

interface SectionBadgeProps {
  children: React.ReactNode
  centered?: boolean
}

export default function SectionBadge({ children, centered = false }: SectionBadgeProps) {
  return (
    <div
      className={`inline-flex items-center gap-3 text-accent font-semibold text-[0.9rem] tracking-[0.1em] uppercase mb-4 before:content-[''] before:w-10 before:h-0.5 before:bg-accent before:block ${
        centered ? "after:content-[''] after:w-10 after:h-0.5 after:bg-accent after:block" : ""
      }`}
    >
      {children}
    </div>
  )
}
