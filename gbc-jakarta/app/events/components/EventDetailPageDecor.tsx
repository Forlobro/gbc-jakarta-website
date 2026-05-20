/**
 * EventDetailPageDecor — page-level decorative elements for the Event Detail page.
 * Sections: Description, Video(s), Gallery, (optional) Details + Register
 * Hero section has its own HeroDecor — not covered here.
 *
 * Element budget (consistent across all pages):
 * - 1 dot pattern
 * - 4 blobs/circles (2 pairs, diagonal)
 * - 3 floating symbols
 * - 1 decorative line group
 */

import DotPattern from "../../components/DotPattern"

export default function EventDetailPageDecor() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
      {/* Dot pattern */}
      <DotPattern />

      {/* Blob + outline — top-right, beside description */}
      <div className="absolute -top-16 -right-16 sm:-top-24 sm:-right-24 md:-top-32 md:-right-32 w-[280px] h-[280px] sm:w-[380px] sm:h-[380px] md:w-[480px] md:h-[480px] rounded-full bg-accent/6 blur-2xl" />
      <div className="absolute -top-8 -right-8 sm:-top-12 sm:-right-12 md:-top-16 md:-right-16 w-[200px] h-[200px] sm:w-[260px] sm:h-[260px] md:w-[340px] md:h-[340px] rounded-full border-[20px] sm:border-[28px] md:border-[40px] border-accent/8" />

      {/* Blob + outline — bottom-left, beside gallery/details */}
      <div className="absolute bottom-[5%] -left-16 sm:-left-24 md:-left-32 w-[280px] h-[280px] sm:w-[380px] sm:h-[380px] md:w-[480px] md:h-[480px] rounded-full bg-primary/5 blur-2xl" />
      <div className="absolute bottom-[8%] -left-8 sm:-left-12 md:-left-16 w-[200px] h-[200px] sm:w-[260px] sm:h-[260px] md:w-[330px] md:h-[330px] rounded-full border-[20px] sm:border-[28px] md:border-[38px] border-primary/8" />

      {/* Symbol — top-left */}
      <div className="absolute top-[5%] left-[5%] text-accent/10 text-5xl sm:text-6xl md:text-8xl font-bold select-none leading-none">
        +
      </div>

      {/* Symbol — mid-right */}
      <div className="absolute top-[40%] right-[4%] text-primary/7 text-4xl sm:text-5xl md:text-7xl font-bold select-none leading-none hidden sm:block">
        ×
      </div>

      {/* Symbol — bottom-right */}
      <div className="absolute bottom-[15%] right-[6%] text-accent/8 text-4xl sm:text-5xl md:text-6xl font-bold select-none leading-none hidden sm:block">
        ◦
      </div>

      {/* Decorative lines — left side, mid-page */}
      <div className="absolute left-[2%] sm:left-[3%] top-[45%] flex flex-col gap-2 sm:gap-3 hidden lg:flex">
        {[60, 90, 42, 72, 55].map((w, i) => (
          <div
            key={i}
            className="h-[2px] md:h-[3px] bg-accent/15 rounded-full"
            style={{ width: `${w}px` }}
          />
        ))}
      </div>
    </div>
  )
}
