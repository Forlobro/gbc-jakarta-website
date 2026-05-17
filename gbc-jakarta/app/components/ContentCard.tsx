/**
 * ContentCard — reusable card component.
 * Used in events (past events grid) and partners (cards grid).
 *
 * Props:
 * - href: link destination
 * - image: background image URL (optional, for events-style cards)
 * - logoUrl: logo image URL (optional, for partners-style cards with contained logo)
 * - logoFallback: fallback text when no logo (optional)
 * - badge: badge text shown on image overlay or above title (optional)
 * - meta: array of { icon, text } for metadata row (date, location, etc.)
 * - title: card title
 * - description: card description (line-clamped)
 * - ctaLabel: call-to-action text
 */

import Link from "next/link"

interface ContentCardMeta {
  icon: string
  text: string
}

interface ContentCardProps {
  href: string
  image?: string
  logoUrl?: string | null
  logoFallback?: string
  badge?: string
  meta?: ContentCardMeta[]
  title: string
  description?: string
  ctaLabel: string
}

export default function ContentCard({
  href,
  image,
  logoUrl,
  logoFallback,
  badge,
  meta,
  title,
  description,
  ctaLabel,
}: ContentCardProps) {
  return (
    <Link href={href} className="block group h-full">
      <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:-translate-y-2 hover:shadow-lg transition-all duration-300 h-full flex flex-col">
        <div className="relative h-48 overflow-hidden">
          {image && (
            <>
              <div
                className="w-full h-full bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                style={{ backgroundImage: `url('${image}')` }}
              />
              <div className="absolute inset-0 bg-primary/30" />
            </>
          )}

          {!image && logoUrl !== undefined && (
            <div className="w-full h-full flex items-center justify-center p-6">
              {logoUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={logoUrl} alt={title} className="w-full h-full object-contain" />
              ) : (
                <span className="font-display font-bold text-base text-primary text-center leading-tight">
                  {logoFallback || title.split(" ").slice(0, 2).join(" ")}
                </span>
              )}
            </div>
          )}

          {badge && (
            <span className="absolute top-4 left-4 text-[0.72rem] font-bold px-3 py-1 rounded-full bg-gray-100 text-primary">
              {badge}
            </span>
          )}
        </div>

        {/* Content */}
        <div className="p-6 flex flex-col flex-1">
          {/* Meta row */}
          {meta && meta.length > 0 && (
            <div className="flex items-center gap-3 text-text-muted text-[0.8rem] mb-3 flex-wrap">
              {meta.map((item, idx) => (
                <div key={idx} className="flex items-center gap-1.5">
                  <i className={item.icon} />
                  <span className="truncate">{item.text}</span>
                </div>
              ))}
            </div>
          )}

          <h4 className="font-bold text-text text-[1rem] leading-[1.4] mb-3">{title}</h4>

          {description && (
            <p className="text-text-light text-[0.85rem] leading-[1.7] line-clamp-3 text-justify mb-4 flex-1">
              {description}
            </p>
          )}

          <span className="inline-flex items-center gap-2 text-primary font-semibold text-sm transition-all duration-300 group-hover:gap-3 mt-auto">
            {ctaLabel} <i className="fas fa-arrow-right text-xs" />
          </span>
        </div>
      </div>
    </Link>
  )
}
