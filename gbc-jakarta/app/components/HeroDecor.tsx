/**
 * HeroDecor — decorative background elements for dark gradient hero sections.
 * Used in partners/[id] and events/[id] hero banners.
 * Includes: radial blobs, dot pattern, blurred circles, circle outlines, floating symbols.
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
      <div className="absolute -top-20 -right-20 w-[500px] h-[500px] rounded-full bg-accent/10 blur-2xl pointer-events-none" />

      {/* Circle outline — top right */}
      <div className="absolute -top-10 -right-10 w-[350px] h-[350px] rounded-full border-[50px] border-white/8 pointer-events-none" />

      {/* Blurred — bottom left */}
      <div className="absolute -bottom-20 -left-20 w-[450px] h-[450px] rounded-full bg-white/5 blur-2xl pointer-events-none" />

      {/* Circle outline — bottom left */}
      <div className="absolute -bottom-10 -left-10 w-[300px] h-[300px] rounded-full border-[40px] border-accent/10 pointer-events-none" />

      {/* Floating symbols */}
      <div className="absolute top-20 right-[10%] text-white/10 text-8xl font-bold pointer-events-none select-none leading-none">
        +
      </div>
      <div className="absolute bottom-16 left-[6%] text-accent/15 text-7xl font-bold pointer-events-none select-none leading-none">
        ×
      </div>
    </>
  )
}
