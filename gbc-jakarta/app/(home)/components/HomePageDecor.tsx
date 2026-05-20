/**
 * HomePageDecor — page-level decorative elements for the Home page.
 * Sections: About (top) + Director (bottom)
 *
 * Element budget (consistent across all pages):
 * - 1 dot pattern
 * - 4 blobs/circles (2 per section area)
 * - 3 floating symbols
 * - 1 decorative line group
 */

import DotPattern from "../../components/DotPattern"

export default function HomePageDecor() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
      {/* Dot pattern */}
      <DotPattern />

      {/* Blob + outline — top-left, beside About text */}
      <div className="absolute top-24 left-[-40px] sm:top-20 sm:left-[-50px] md:top-16 md:left-[-60px] w-[280px] h-[280px] sm:w-[380px] sm:h-[380px] md:w-[500px] md:h-[500px] rounded-full bg-accent/6 blur-2xl" />
      <div className="absolute top-32 left-[-10px] sm:top-28 sm:left-[-20px] md:top-24 md:left-[-30px] w-[200px] h-[200px] sm:w-[280px] sm:h-[280px] md:w-[380px] md:h-[380px] rounded-full border-[20px] sm:border-[30px] md:border-[45px] border-accent/10" />

      {/* Blob + outline — bottom-right, beside Director card */}
      <div className="absolute bottom-[5%] -right-16 sm:-right-24 md:-right-32 w-[280px] h-[280px] sm:w-[380px] sm:h-[380px] md:w-[500px] md:h-[500px] rounded-full bg-primary/5 blur-2xl" />
      <div className="absolute bottom-[8%] -right-8 sm:-right-12 md:-right-16 w-[200px] h-[200px] sm:w-[260px] sm:h-[260px] md:w-[340px] md:h-[340px] rounded-full border-[20px] sm:border-[30px] md:border-[42px] border-primary/8" />

      {/* Symbol — top-right */}
      <div className="absolute top-[8%] right-[6%] text-accent/10 text-5xl sm:text-6xl md:text-8xl font-bold select-none leading-none">
        +
      </div>

      {/* Symbol — mid-left */}
      <div className="absolute top-[40%] left-[3%] text-primary/7 text-4xl sm:text-5xl md:text-7xl font-bold select-none leading-none hidden sm:block">
        ×
      </div>

      {/* Symbol — bottom-left */}
      <div className="absolute bottom-[20%] left-[5%] text-accent/10 text-4xl sm:text-5xl md:text-6xl font-bold select-none leading-none hidden sm:block">
        ◦
      </div>

      {/* Decorative lines — right side, mid-page */}
      <div className="absolute right-[2%] sm:right-[3%] top-[45%] flex flex-col gap-2 sm:gap-3 hidden lg:flex">
        {[60, 90, 45, 75, 55].map((w, i) => (
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
