/**
 * AboutPageDecor — page-level decorative elements for the About page.
 * Sections: Hero, GlobalNetwork, GBSA, Gyeonggi, Timeline (5 sections, longer page)
 *
 * Element budget (consistent across all pages):
 * - 1 dot pattern
 * - 4 blobs/circles (distributed across the longer page)
 * - 3 floating symbols
 * - 1 decorative line group
 */

import DotPattern from "../../components/DotPattern"

export default function AboutPageDecor() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
      {/* Dot pattern */}
      <DotPattern />

      {/* Blob + outline — top-left, beside Hero text */}
      <div className="absolute -top-16 -left-16 sm:-top-24 sm:-left-24 md:-top-32 md:-left-32 w-[280px] h-[280px] sm:w-[380px] sm:h-[380px] md:w-[480px] md:h-[480px] rounded-full bg-accent/7 blur-2xl" />
      <div className="absolute -top-8 -left-8 sm:-top-12 sm:-left-12 md:-top-16 md:-left-16 w-[200px] h-[200px] sm:w-[270px] sm:h-[270px] md:w-[350px] md:h-[350px] rounded-full border-[20px] sm:border-[30px] md:border-[45px] border-accent/10" />

      {/* Blob + outline — mid-right, beside GBSA/Gyeonggi area */}
      <div className="absolute top-[45%] -right-16 sm:-right-24 md:-right-32 w-[260px] h-[260px] sm:w-[350px] sm:h-[350px] md:w-[450px] md:h-[450px] rounded-full bg-primary/5 blur-2xl" />
      <div className="absolute top-[47%] -right-8 sm:-right-12 md:-right-16 w-[180px] h-[180px] sm:w-[240px] sm:h-[240px] md:w-[320px] md:h-[320px] rounded-full border-[18px] sm:border-[26px] md:border-[38px] border-primary/7" />

      {/* Symbol — top-right, near Hero logos */}
      <div className="absolute top-[5%] right-[6%] text-accent/10 text-5xl sm:text-6xl md:text-8xl font-bold select-none leading-none">
        +
      </div>

      {/* Symbol — mid-left, near GBSA video */}
      <div className="absolute top-[38%] left-[3%] text-primary/7 text-4xl sm:text-5xl md:text-7xl font-bold select-none leading-none hidden sm:block">
        ×
      </div>

      {/* Symbol — bottom-right, near Timeline */}
      <div className="absolute bottom-[10%] right-[5%] text-accent/8 text-4xl sm:text-5xl md:text-6xl font-bold select-none leading-none hidden sm:block">
        ◦
      </div>

      {/* Decorative lines — left side, near Gyeonggi area */}
      <div className="absolute left-[2%] sm:left-[3%] top-[60%] flex flex-col gap-2 sm:gap-3 hidden lg:flex">
        {[60, 85, 42, 72, 52].map((w, i) => (
          <div
            key={i}
            className="h-[2px] md:h-[3px] bg-accent/12 rounded-full"
            style={{ width: `${w}px` }}
          />
        ))}
      </div>
    </div>
  )
}
