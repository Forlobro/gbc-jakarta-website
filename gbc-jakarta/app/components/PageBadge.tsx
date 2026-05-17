/**
 * PageBadge — pill-shaped badge used on hero/header sections.
 * Accent background with border, typically used for page labels or category tags.
 */

interface PageBadgeProps {
  children: React.ReactNode
}

export default function PageBadge({ children }: PageBadgeProps) {
  return (
    <div className="inline-flex items-center bg-accent/20 border border-accent/30 px-4 py-2 rounded-full text-accent text-[0.9rem] font-semibold mb-4">
      {children}
    </div>
  )
}
