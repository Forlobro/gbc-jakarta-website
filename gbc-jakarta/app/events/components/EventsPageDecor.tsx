/**
 * EventsPageDecor — page-level decorative elements for the Events page.
 * Sections: Featured (top) + Past grid (bottom)
 *
 * Element budget (consistent across all pages):
 * - 1 dot pattern
 * - 4 blobs/circles (2 per section area)
 * - 3 floating symbols
 * - 1 decorative line group
 */

import DotPattern from "../../components/DotPattern"

export default function EventsPageDecor() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
      {/* Dot pattern */}
      <DotPattern />

      {/* Blob + outline — top-right, beside Featured card */}
      <div className="absolute top-24 right-[-40px] sm:top-20 sm:right-[-50px] md:top-16 md:right-[-60px] w-[280px] h-[280px] sm:w-[380px] sm:h-[380px] md:w-[480px] md:h-[480px] rounded-full bg-accent/6 blur-2xl" />
      <div className="absolute top-32 right-[-10px] sm:top-28 sm:right-[-20px] md:top-24 md:right-[-30px] w-[200px] h-[200px] sm:w-[270px] sm:h-[270px] md:w-[350px] md:h-[350px] rounded-full border-[20px] sm:border-[30px] md:border-[42px] border-accent/8" />

      {/* Blob + outline — bottom-left, beside Past grid */}
      <div className="absolute bottom-[5%] -left-16 sm:-left-24 md:-left-32 w-[280px] h-[280px] sm:w-[380px] sm:h-[380px] md:w-[480px] md:h-[480px] rounded-full bg-primary/5 blur-2xl" />
      <div className="absolute bottom-[8%] -left-8 sm:-left-12 md:-left-16 w-[200px] h-[200px] sm:w-[260px] sm:h-[260px] md:w-[330px] md:h-[330px] rounded-full border-[20px] sm:border-[28px] md:border-[38px] border-primary/8" />

      {/* Symbol — top-left */}
      <div className="absolute top-[6%] left-[5%] text-primary/7 text-5xl sm:text-6xl md:text-8xl font-bold select-none leading-none">
        +
      </div>

      {/* Symbol — mid-right */}
      <div className="absolute top-[45%] right-[4%] text-accent/8 text-4xl sm:text-5xl md:text-7xl font-bold select-none leading-none hidden sm:block">
        ×
      </div>

      {/* Symbol — bottom-right */}
      <div className="absolute bottom-[15%] right-[6%] text-primary/7 text-4xl sm:text-5xl md:text-6xl font-bold select-none leading-none hidden sm:block">
        ◦
      </div>

      {/* Decorative lines — left side, mid-page */}
      <div className="absolute left-[2%] sm:left-[3%] top-[50%] flex flex-col gap-2 sm:gap-3 hidden lg:flex">
        {[55, 85, 40, 70, 50].map((w, i) => (
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
