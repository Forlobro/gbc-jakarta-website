/**
 * SectionDecor — reusable decorative background elements.
 * Used across multiple pages: events, partners, contact, about, etc.
 *
 * Props:
 * - variant: "default" (accent top-right + primary bottom-left) |
 *            "flip"    (accent top-left + primary bottom-right)  |
 *            "primary" (primary top-right + accent bottom-left)
 * - symbols: show floating +/×/◦ symbols (default: true)
 * - lines:   show decorative line array on left side (default: false)
 */

interface SectionDecorProps {
  variant?: "default" | "flip" | "primary"
  symbols?: boolean
  lines?: boolean
}

export default function SectionDecor({
  variant = "default",
  symbols = true,
  lines = false,
}: SectionDecorProps) {
  const isFlip = variant === "flip"
  const isPrimary = variant === "primary"

  // Blurred blob positions
  const blobTopClass = isFlip ? "-top-32 -left-32" : "-top-32 -right-32"
  const blobBottomClass = isFlip ? "-bottom-32 -right-32" : "-bottom-32 -left-32"
  const outlineTopClass = isFlip ? "-top-20 -left-20" : "-top-20 -right-20"
  const outlineBottomClass = isFlip ? "-bottom-20 -right-20" : "-bottom-20 -left-20"

  // Colors
  const topColor = isPrimary ? "bg-primary/8" : "bg-accent/8"
  const bottomColor = isPrimary ? "bg-accent/8" : "bg-primary/8"
  const outlineTopColor = isPrimary ? "border-primary/10" : "border-accent/10"
  const outlineBottomColor = isPrimary ? "border-accent/10" : "border-primary/8"

  return (
    <>
      {/* Blurred blobs */}
      <div
        className={`absolute ${blobTopClass} w-[500px] h-[500px] rounded-full ${topColor} blur-2xl pointer-events-none`}
      />
      <div
        className={`absolute ${blobBottomClass} w-[500px] h-[500px] rounded-full ${bottomColor} blur-2xl pointer-events-none`}
      />

      {/* Circle outlines */}
      <div
        className={`absolute ${outlineTopClass} w-[360px] h-[360px] rounded-full border-[50px] ${outlineTopColor} pointer-events-none`}
      />
      <div
        className={`absolute ${outlineBottomClass} w-[340px] h-[340px] rounded-full border-[45px] ${outlineBottomColor} pointer-events-none`}
      />

      {/* Floating symbols */}
      {symbols && (
        <>
          <div className="absolute top-16 right-[8%] text-accent/15 text-8xl font-bold pointer-events-none select-none leading-none">
            +
          </div>
          <div className="absolute bottom-16 left-[6%] text-primary/10 text-7xl font-bold pointer-events-none select-none leading-none">
            ×
          </div>
        </>
      )}

      {/* Decorative lines — left side */}
      {lines && (
        <div className="absolute left-[3%] top-1/2 -translate-y-1/2 flex flex-col gap-3 pointer-events-none">
          {[80, 50, 110, 40, 90, 60].map((w, i) => (
            <div
              key={i}
              className="h-[3px] bg-accent/20 rounded-full"
              style={{ width: `${w}px` }}
            />
          ))}
        </div>
      )}
    </>
  )
}
