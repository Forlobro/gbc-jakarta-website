/**
 * HeroDecor — decorative background elements for dark gradient hero sections.
 * Used in partners/[id] and events/[id] hero banners.
 * Responsive: scales down on mobile, full expression on desktop.
 */

import DotPattern from "./DotPattern"

export default function HeroDecor() {
  return (
    <>
      {/* Background radial blobs */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(circle at 10% 90%, rgba(0, 194, 203, 0.15) 0%, transparent 40%), radial-gradient(circle at 90% 10%, rgba(255, 255, 255, 0.05) 0%, transparent 40%)",
        }}
      />

      {/* Dot pattern */}
      <DotPattern variant="dark" />

      {/* Blurred accent — top right */}
      <div className="absolute -top-10 -right-10 w-[250px] h-[250px] sm:-top-14 sm:-right-14 sm:w-[350px] sm:h-[350px] md:-top-20 md:-right-20 md:w-[500px] md:h-[500px] rounded-full bg-accent/10 blur-2xl pointer-events-none" />

      {/* Circle outline — top right */}
      <div className="absolute -top-4 -right-4 w-[180px] h-[180px] sm:-top-6 sm:-right-6 sm:w-[250px] sm:h-[250px] md:-top-10 md:-right-10 md:w-[350px] md:h-[350px] rounded-full border-[25px] sm:border-[35px] md:border-[50px] border-white/8 pointer-events-none" />

      {/* Blurred — bottom left */}
      <div className="absolute -bottom-10 -left-10 w-[220px] h-[220px] sm:-bottom-14 sm:-left-14 sm:w-[320px] sm:h-[320px] md:-bottom-20 md:-left-20 md:w-[450px] md:h-[450px] rounded-full bg-white/5 blur-2xl pointer-events-none" />

      {/* Circle outline — bottom left */}
      <div className="absolute -bottom-4 -left-4 w-[160px] h-[160px] sm:-bottom-6 sm:-left-6 sm:w-[220px] sm:h-[220px] md:-bottom-10 md:-left-10 md:w-[300px] md:h-[300px] rounded-full border-[20px] sm:border-[30px] md:border-[40px] border-accent/10 pointer-events-none" />

      {/* Floating symbols */}
      <div className="absolute top-10 right-[8%] sm:top-16 sm:right-[9%] md:top-20 md:right-[10%] text-white/10 text-5xl sm:text-6xl md:text-8xl font-bold pointer-events-none select-none leading-none">
        +
      </div>
      <div className="absolute bottom-10 left-[5%] sm:bottom-12 sm:left-[5%] md:bottom-16 md:left-[6%] text-accent/15 text-5xl sm:text-6xl md:text-7xl font-bold pointer-events-none select-none leading-none">
        ×
      </div>
    </>
  )
}
