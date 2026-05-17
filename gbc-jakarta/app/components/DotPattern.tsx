/**
 * DotPattern — subtle dot grid background overlay.
 * Placed once per page (between Navbar and Footer) as a fixed/absolute layer.
 *
 * Props:
 * - variant: "light" (for white/light backgrounds) | "dark" (for navy/dark backgrounds)
 *
 * Usage:
 *   <DotPattern />           → light dots (accent colored, for white pages)
 *   <DotPattern variant="dark" /> → white dots (for navy/gradient pages)
 */

interface DotPatternProps {
  variant?: "light" | "dark"
}

export default function DotPattern({ variant = "light" }: DotPatternProps) {
  const dotColor = variant === "dark" ? "rgba(255,255,255,0.1)" : "rgba(0,194,203,0.12)"

  return (
    <div
      className="absolute inset-0 pointer-events-none z-0"
      style={{
        backgroundImage: `radial-gradient(circle, ${dotColor} 1.5px, transparent 1.5px)`,
        backgroundSize: "28px 28px",
      }}
    />
  )
}
