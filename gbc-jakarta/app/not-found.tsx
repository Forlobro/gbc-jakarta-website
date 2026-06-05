import Link from "next/link"

export default function NotFound() {
  return (
    <div className="min-h-screen relative flex items-center justify-center overflow-hidden">
      {/* Background */}
      <div
        className="absolute inset-0"
        style={{
          background: "linear-gradient(135deg, rgba(15, 40, 71, 0.95), rgba(30, 65, 117, 0.95))",
        }}
      />

      {/* Pattern overlay */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(circle at 20% 50%, rgba(0, 194, 203, 0.1) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(255, 255, 255, 0.05) 0%, transparent 40%)",
        }}
      />

      {/* Grid */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-lg">
        {/* 404 number */}
        <h1 className="font-display text-[8rem] sm:text-[10rem] font-extrabold leading-none bg-gradient-to-br from-accent to-[#00a8b0] bg-clip-text text-transparent">
          404
        </h1>

        {/* Message */}
        <h2 className="font-display text-2xl sm:text-3xl font-bold text-white mt-2 mb-4">
          Page Not Found
        </h2>
        <p className="text-white/70 text-base sm:text-lg leading-relaxed mb-10">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-center">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-8 py-3.5 bg-gradient-to-r from-accent to-[#00a8b0] text-white font-semibold rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-[#00c2cb]/25 hover:-translate-y-0.5"
          >
            <i className="fas fa-home text-sm" />
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  )
}
