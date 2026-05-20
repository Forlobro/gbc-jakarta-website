/**
 * ContactPageDecor — page-level decorative elements for the Contact page.
 * Sections: Map (top ~60%) + FamilySite (bottom ~40%)
 * Note: ContactSection has its own dark-theme decor, not covered here.
 *
 * Element budget (consistent across all pages):
 * - 1 dot pattern
 * - 4 blobs/circles (2 per section area)
 * - 3 floating symbols
 * - 1 decorative line group
 */

import DotPattern from "@/app/components/DotPattern"

export default function ContactPageDecor() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
      {/* Dot pattern */}
      <DotPattern />

      {/* Blob + outline — top-left, frames Map title */}
      <div className="absolute -top-16 -left-16 sm:-top-24 sm:-left-24 md:-top-32 md:-left-32 w-[280px] h-[280px] sm:w-[380px] sm:h-[380px] md:w-[480px] md:h-[480px] rounded-full bg-accent/6 blur-2xl" />
      <div className="absolute -top-8 -left-8 sm:-top-12 sm:-left-12 md:-top-16 md:-left-16 w-[200px] h-[200px] sm:w-[270px] sm:h-[270px] md:w-[340px] md:h-[340px] rounded-full border-[20px] sm:border-[30px] md:border-[42px] border-accent/10" />

      {/* Blob + outline — bottom-right, beside FamilySite logos */}
      <div className="absolute bottom-[5%] -right-16 sm:-right-24 md:-right-32 w-[280px] h-[280px] sm:w-[360px] sm:h-[360px] md:w-[450px] md:h-[450px] rounded-full bg-primary/5 blur-2xl" />
      <div className="absolute bottom-[8%] -right-8 sm:-right-12 md:-right-16 w-[200px] h-[200px] sm:w-[250px] sm:h-[250px] md:w-[320px] md:h-[320px] rounded-full border-[18px] sm:border-[26px] md:border-[36px] border-primary/8" />

      {/* Symbol — top-right */}
      <div className="absolute top-[6%] right-[6%] text-accent/10 text-5xl sm:text-6xl md:text-8xl font-bold select-none leading-none">
        +
      </div>

      {/* Symbol — mid-left */}
      <div className="absolute top-[40%] left-[4%] text-primary/7 text-4xl sm:text-5xl md:text-7xl font-bold select-none leading-none hidden sm:block">
        ×
      </div>

      {/* Symbol — bottom-left */}
      <div className="absolute bottom-[18%] left-[5%] text-accent/8 text-4xl sm:text-5xl md:text-6xl font-bold select-none leading-none hidden sm:block">
        ◦
      </div>

      {/* Decorative lines — right side, near map area */}
      <div className="absolute right-[2%] sm:right-[3%] top-[30%] flex flex-col gap-2 sm:gap-3 hidden lg:flex">
        {[55, 80, 40, 68, 48].map((w, i) => (
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
