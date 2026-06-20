"use client"

import { useState } from "react"
import { useTranslation } from "@/app/lib/LanguageContext"
import ScrollReveal from "@/app/components/ScrollReveal"
import PageBadge from "@/app/components/PageBadge"
import DotPattern from "@/app/components/DotPattern"

export default function ContactSection() {
  const { t } = useTranslation()
  const [submitted, setSubmitted] = useState(false)
  const [sending, setSending] = useState(false)
  const [error, setError] = useState("")
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setSending(true)
    setError("")

    const form = e.target as HTMLFormElement
    const formData = new FormData(form)

    const data = {
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      company: formData.get("company") as string,
      message: formData.get("message") as string,
    }

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })

      if (res.ok) {
        setSubmitted(true)
        form.reset()
        setTimeout(() => setSubmitted(false), 5000)
      } else {
        const result = await res.json()
        setError(result.error || "Failed to send message.")
      }
    } catch {
      setError("Network error. Please try again.")
    } finally {
      setSending(false)
    }
  }

  return (
    <section
      className="py-16 md:py-24 lg:py-32 bg-gradient-to-br from-primary via-primary-light to-[#2d5a9e] relative"
      id="contact"
    >
      {/* Dot pattern */}
      <DotPattern variant="dark" />

      {/* Wave divider bottom */}
      <div className="absolute bottom-[-2px] left-0 right-0 pointer-events-none">
        <svg
          viewBox="0 0 1440 70"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full block translate-y-[1px]"
          preserveAspectRatio="none"
        >
          <path d="M0,30 C360,70 1080,0 1440,50 L1440,70 L0,70 Z" fill="#ffffff" />
        </svg>
      </div>

      {/* Background radial blobs */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(circle at 10% 90%, rgba(0, 194, 203, 0.15) 0%, transparent 40%), radial-gradient(circle at 90% 10%, rgba(255, 255, 255, 0.05) 0%, transparent 40%)",
        }}
      />

      {/* Circle outline — bottom right */}
      <div className="absolute -bottom-0 -right-4 w-[160px] h-[160px] sm:-right-6 sm:w-[220px] sm:h-[220px] md:-right-10 md:w-[300px] md:h-[300px] rounded-full border-[18px] sm:border-[25px] md:border-[35px] border-accent/12 pointer-events-none" />

      {/* Large blurred — top left */}
      <div className="absolute -top-16 -left-16 w-[280px] h-[280px] sm:-top-24 sm:-left-24 sm:w-[400px] sm:h-[400px] md:-top-32 md:-left-32 md:w-[550px] md:h-[550px] rounded-full bg-white/5 blur-2xl pointer-events-none" />

      {/* Circle outline — top left */}
      <div className="absolute -top-10 -left-10 w-[200px] h-[200px] sm:-top-14 sm:-left-14 sm:w-[280px] sm:h-[280px] md:-top-20 md:-left-20 md:w-[380px] md:h-[380px] rounded-full border-[25px] sm:border-[35px] md:border-[50px] border-accent/12 pointer-events-none" />

      {/* Floating symbols */}
      <div className="absolute top-10 right-[8%] sm:top-14 sm:right-[10%] md:top-16 md:right-[12%] text-white/10 text-6xl sm:text-7xl md:text-9xl font-bold pointer-events-none select-none leading-none">
        +
      </div>
      <div className="absolute bottom-14 left-[6%] sm:bottom-16 sm:left-[7%] md:left-[8%] text-accent/15 text-5xl sm:text-6xl md:text-8xl font-bold pointer-events-none select-none leading-none">
        ×
      </div>
      <div className="absolute top-1/2 left-[2%] text-white/8 text-4xl sm:text-5xl md:text-6xl pointer-events-none select-none leading-none hidden sm:block">
        ◦
      </div>

      {/* Decorative lines — left */}
      <div className="absolute left-[3%] top-1/3 flex flex-col gap-2 sm:gap-3 pointer-events-none hidden lg:flex">
        {[70, 100, 50, 85, 45, 75].map((w, i) => (
          <div
            key={i}
            className="h-[2px] md:h-[3px] bg-white/12 rounded-full"
            style={{ width: `${w}px` }}
          />
        ))}
      </div>

      {/* Decorative lines — right */}
      <div className="absolute right-[3%] top-1/3 flex flex-col gap-2 sm:gap-3 pointer-events-none hidden lg:flex">
        {[60, 90, 45, 75, 40, 65].map((w, i) => (
          <div
            key={i}
            className="h-[2px] md:h-[3px] bg-accent/18 rounded-full ml-auto"
            style={{ width: `${w}px` }}
          />
        ))}
      </div>

      <div className="max-w-[1400px] mx-auto px-[5%]">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 relative z-[1]">
          {/* Contact Content */}
          <ScrollReveal className="text-white">
            <PageBadge>{t("contactLabel")}</PageBadge>

            <h2 className="font-display text-3xl md:text-[3rem] font-extrabold text-white mb-6 leading-[1.2]">
              {t("contactTitle")}
            </h2>

            <p className="text-white/70 text-lg mb-12 text-justify">{t("contactDescription")}</p>

            {/* Contact Items */}
            <div className="flex flex-col gap-6">
              {/* Address */}
              <div className="flex gap-5 items-start">
                <div className="w-[55px] h-[55px] bg-white/10 rounded-[14px] flex items-center justify-center text-xl text-accent shrink-0">
                  <i className="fas fa-map-marker-alt" />
                </div>
                <div>
                  <h4 className="text-[0.9rem] font-semibold text-white/60 uppercase tracking-[0.05em] mb-1">
                    {t("officeAddress")}
                  </h4>
                  <p className="text-[1.05rem] text-white">
                    DBS Tower Suite #905, Jl. Prof. Dr. Satrio Kav.3 Kuningan, South Jakarta 12940
                  </p>
                </div>
              </div>

              {/* Email */}
              <div className="flex gap-5 items-start">
                <div className="w-[55px] h-[55px] bg-white/10 rounded-[14px] flex items-center justify-center text-xl text-accent shrink-0">
                  <i className="far fa-envelope" />
                </div>
                <div>
                  <h4 className="text-[0.9rem] font-semibold text-white/60 uppercase tracking-[0.05em] mb-1">
                    {t("contactEmail")}
                  </h4>
                  <a
                    href="https://mail.google.com/mail/?view=cm&to=chat.gbcjkt@gmail.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[1.05rem] text-white hover:text-accent transition-colors"
                  >
                    chat.gbcjkt@gmail.com
                  </a>
                </div>
              </div>

              {/* Telephone */}
              <div className="flex gap-5 items-start">
                <div className="w-[55px] h-[55px] bg-white/10 rounded-[14px] flex items-center justify-center text-xl text-accent shrink-0">
                  <i className="fas fa-phone" />
                </div>
                <div>
                  <h4 className="text-[0.9rem] font-semibold text-white/60 uppercase tracking-[0.05em] mb-1">
                    {t("contactPhone")}
                  </h4>
                  <a
                    href="tel:+622139712135"
                    className="text-[1.05rem] text-white hover:text-accent transition-colors"
                  >
                    +62 21 3971 2135
                  </a>
                </div>
              </div>

              {/* WhatsApp */}
              <div className="flex gap-5 items-start">
                <div className="w-[55px] h-[55px] bg-white/10 rounded-[14px] flex items-center justify-center text-2xl text-accent shrink-0">
                  <i className="fab fa-whatsapp" />
                </div>
                <div>
                  <h4 className="text-[0.9rem] font-semibold text-white/60 uppercase tracking-[0.05em] mb-1">
                    WhatsApp
                  </h4>
                  <a
                    href="https://wa.me/628111300313?text=Hello%20GBC%20Jakarta%20Team%2C%0A%0AI%20would%20like%20to%20get%20in%20touch%20and%20learn%20more%20about%20your%20services.%0A%0AName%3A%20%0ACompany%2FInstitution%3A%20"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[1.05rem] text-white hover:text-accent transition-colors"
                  >
                    +62 8111 300 313
                  </a>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex gap-4 mt-8">
              <a
                href="https://www.instagram.com/gbc.jakarta"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="w-[50px] h-[50px] bg-white/10 rounded-full flex items-center justify-center text-white text-xl transition-all duration-300 hover:bg-accent hover:text-primary hover:-translate-y-[5px]"
              >
                <i className="fab fa-instagram" />
              </a>
              <a
                href="https://id.linkedin.com/company/gbcjakarta"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="w-[50px] h-[50px] bg-white/10 rounded-full flex items-center justify-center text-white text-xl transition-all duration-300 hover:bg-accent hover:text-primary hover:-translate-y-[5px]"
              >
                <i className="fab fa-linkedin-in" />
              </a>
              <a
                href="https://www.youtube.com/@gbcjakarta"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="YouTube"
                className="w-[50px] h-[50px] bg-white/10 rounded-full flex items-center justify-center text-white text-xl transition-all duration-300 hover:bg-accent hover:text-primary hover:-translate-y-[5px]"
              >
                <i className="fab fa-youtube" />
              </a>
            </div>
          </ScrollReveal>

          {/* Contact Form */}
          <ScrollReveal>
            <div className="bg-white rounded-2xl px-6 pt-5 pb-5 shadow-2xl h-[700px] flex flex-col box-border">
              <h3 className="font-display text-[25px] font-bold text-text mb-[14px]">
                {t("sendMessage")}
              </h3>

              <form onSubmit={handleSubmit} className="flex flex-col flex-1 gap-[10px]">
                {/* Name */}
                <div className="flex flex-col gap-[3px]">
                  <label className="text-[15px] font-semibold text-text">{t("formName")}</label>
                  <input
                    type="text"
                    name="name"
                    placeholder={t("namePlaceholder")}
                    required
                    className="w-full px-3 py-5 border-2 border-gray-200 rounded-lg text-[12.5px] font-[inherit] transition-all duration-300 focus:outline-none focus:border-accent focus:shadow-[0_0_0_3px_rgba(0,194,203,0.2)]"
                  />
                </div>

                {/* Email */}
                <div className="flex flex-col gap-[3px]">
                  <label className="text-[15px] font-semibold text-text">{t("formEmail")}</label>
                  <input
                    type="email"
                    name="email"
                    placeholder={t("emailPlaceholder")}
                    required
                    className="w-full px-3 py-5 border-2 border-gray-200 rounded-lg text-[15px] font-[inherit] transition-all duration-300 focus:outline-none focus:border-accent focus:shadow-[0_0_0_3px_rgba(0,194,203,0.2)]"
                  />
                </div>

                {/* Company */}
                <div className="flex flex-col gap-[3px]">
                  <label className="text-[15px] font-semibold text-text">{t("formPartner")}</label>
                  <input
                    type="text"
                    name="company"
                    placeholder={t("partnerPlaceholder")}
                    className="w-full px-3 py-5 border-2 border-gray-200 rounded-lg text-[15px] font-[inherit] transition-all duration-300 focus:outline-none focus:border-accent focus:shadow-[0_0_0_3px_rgba(0,194,203,0.2)]"
                  />
                </div>

                {/* Message — flex-1 supaya mengisi sisa ruang */}
                <div className="flex flex-col gap-[3px] flex-1">
                  <label className="text-[15px] font-semibold text-text">{t("formMessage")}</label>
                  <textarea
                    name="message"
                    placeholder={t("messagePlaceholder")}
                    required
                    className="flex-1 w-full px-3 py-5 border-2 border-gray-200 rounded-lg text-[15px] font-[inherit] transition-all duration-300 resize-none focus:outline-none focus:border-accent focus:shadow-[0_0_0_3px_rgba(0,194,203,0.2)]"
                  />
                </div>

                <button
                  type="submit"
                  disabled={sending}
                  className="w-full py-2.5 bg-gradient-to-br from-primary to-primary-light text-white border-none rounded-lg text-[12.5px] font-semibold cursor-pointer transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(15,40,71,0.25)] disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:translate-y-0"
                >
                  {sending ? "Sending..." : t("sendBtn")}{" "}
                  {!sending && <i className="far fa-paper-plane ml-2" />}
                </button>

                {submitted && (
                  <p className="text-center text-accent font-semibold text-[12px]">
                    {t("contactSuccess")}
                  </p>
                )}

                {error && (
                  <p className="text-center text-red-500 font-semibold text-[12px]">{error}</p>
                )}
              </form>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  )
}
