/**
 * StatusBadge — small pill badge for status/category indicators.
 * Used on cards and list items to show event status, category labels, etc.
 *
 * Props:
 * - children: badge text
 * - light: use primary color scheme instead of accent (default: false)
 */

interface StatusBadgeProps {
  children: React.ReactNode
  dark?: boolean
}

export default function StatusBadge({ children, dark = false }: StatusBadgeProps) {
  return (
    <span
      className={`inline-block text-[0.75rem] font-bold tracking-widest px-3 py-1 rounded-full mb-4 w-fit ${
        dark ? "bg-accent/20 text-accent" : "bg-primary/10 text-primary"
      }`}
    >
      {children}
    </span>
  )
}
