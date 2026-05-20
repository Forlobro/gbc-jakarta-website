/**
 * PartnersPageDecor — page-level decorative elements for the Partners page.
 * Sections: Header/filters (top ~20%) + Cards grid (bottom ~80%)
 *
 * Element budget (consistent across all pages):
 * - 1 dot pattern
 * - 4 blobs/circles (2 per section area)
 * - 3 floating symbols
 * - 1 decorative line group
 */

import DotPattern from "../../components/DotPattern"

export default function PartnersPageDecor() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
      {/* Dot pattern */}
      <DotPattern />

      {/* Blob + outline — top-right, behind header/search */}
      <div className="absolute -top-16 -right-16 sm:-top-24 sm:-right-24 md:-top-32 md:-right-32 w-[280px] h-[280px] sm:w-[380px] sm:h-[380px] md:w-[500px] md:h-[500px] rounded-full bg-primary/6 blur-2xl" />
      <div className="absolute -top-8 -right-8 sm:-top-12 sm:-right-12 md:-top-16 md:-right-16 w-[200px] h-[200px] sm:w-[270px] sm:h-[270px] md:w-[360px] md:h-[360px] rounded-full border-[20px] sm:border-[30px] md:border-[45px] border-primary/8" />

      {/* Blob + outline — bottom-left, anchors card grid */}
      <div className="absolute bottom-[3%] -left-16 sm:-left-24 md:-left-32 w-[280px] h-[280px] sm:w-[380px] sm:h-[380px] md:w-[480px] md:h-[480px] rounded-full bg-accent/6 blur-2xl" />
      <div className="absolute bottom-[6%] -left-8 sm:-left-12 md:-left-16 w-[200px] h-[200px] sm:w-[260px] sm:h-[260px] md:w-[330px] md:h-[330px] rounded-full border-[20px] sm:border-[28px] md:border-[40px] border-accent/8" />

      {/* Symbol — top-left */}
      <div className="absolute top-[5%] left-[6%] text-accent/10 text-5xl sm:text-6xl md:text-8xl font-bold select-none leading-none">
        +
      </div>

      {/* Symbol — mid-right */}
      <div className="absolute top-[40%] right-[3%] text-accent/8 text-4xl sm:text-5xl md:text-6xl font-bold select-none leading-none hidden sm:block">
        ×
      </div>

      {/* Symbol — bottom-right */}
      <div className="absolute bottom-[12%] right-[5%] text-primary/7 text-4xl sm:text-5xl md:text-7xl font-bold select-none leading-none hidden sm:block">
        ◦
      </div>

      {/* Decorative lines — right side, mid-page */}
      <div className="absolute right-[2%] sm:right-[3%] top-[35%] flex flex-col gap-2 sm:gap-3 hidden lg:flex">
        {[70, 45, 90, 55, 75].map((w, i) => (
          <div
            key={i}
            className="h-[2px] md:h-[3px] bg-primary/10 rounded-full ml-auto"
            style={{ width: `${w}px` }}
          />
        ))}
      </div>
    </div>
  )
}
