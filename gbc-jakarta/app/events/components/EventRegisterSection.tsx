"use client"

import Link from "next/link"
import ScrollReveal from "../../components/ScrollReveal"
import { useTranslation } from "../../lib/LanguageContext"

const FALLBACK_GMAIL_URL =
  "https://mail.google.com/mail/?view=cm" +
  "&to=chat.gbcjkt@gmail.com" +
  "&subject=Pendaftaran%20Minat%20Acara%20-%20GBC%20Jakarta" +
  "&body=Halo%20Tim%20GBC%20Jakarta%2C%0A%0ASaya%20tertarik%20untuk%20mengikuti%20acara%20yang%20akan%20datang.%0A%0ANama%3A%20%0APerusahaan%2FInstitusi%3A%20%0ANomor%20HP%3A%20%0A%0ATerima%20kasih."

interface EventRegisterSectionProps {
  title: string
  description: string
  ctaLabel: string
  registerLink?: string | null
}

export default function EventRegisterSection({
  title,
  description,
  ctaLabel,
  registerLink,
}: EventRegisterSectionProps) {
  const { t } = useTranslation()

  const href = registerLink || FALLBACK_GMAIL_URL
  const isExternal = !href.startsWith("mailto:")

  return (
    <section className="py-16 md:py-24 bg-gradient-to-br from-primary via-primary-light to-[#2d5a9e] relative overflow-hidden">
      {/* Radial gradient overlays */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(circle at 80% 20%, rgba(0,194,203,0.15) 0%, transparent 50%), radial-gradient(circle at 20% 80%, rgba(255,255,255,0.05) 0%, transparent 40%)",
        }}
      />
      {/* Dot pattern */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(255,255,255,0.08) 1.5px, transparent 1.5px)",
          backgroundSize: "28px 28px",
        }}
      />

      <div className="max-w-[1400px] mx-auto px-[5%] relative z-[1]">
        <ScrollReveal className="text-center max-w-[650px] mx-auto">
          <div className="w-16 h-16 bg-accent/20 rounded-2xl flex items-center justify-center text-accent text-2xl mx-auto mb-6">
            <i className="far fa-calendar-check" />
          </div>
          <h2 className="font-display text-2xl md:text-3xl lg:text-4xl font-extrabold text-white mb-4 leading-[1.2]">
            {title}
          </h2>
          <p className="text-white/70 text-base md:text-lg mb-8 md:mb-10 text-justify">
            {description}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href={href}
              target={isExternal ? "_blank" : undefined}
              rel={isExternal ? "noopener noreferrer" : undefined}
              className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-accent text-primary rounded-full font-semibold text-[1rem] shadow-[0_4px_20px_rgba(0,194,203,0.4)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_8px_30px_rgba(0,194,203,0.5)]"
            >
              <i className={isExternal ? "fas fa-external-link-alt" : "far fa-envelope"} />
              {ctaLabel}
            </a>
            <Link
              href="/events"
              className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-white/10 text-white border-2 border-white/20 rounded-full font-semibold text-[1rem] transition-all duration-300 hover:bg-white/20 hover:-translate-y-0.5"
            >
              <i className="fas fa-arrow-left text-sm" />
              {t("backToEvents")}
            </Link>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
