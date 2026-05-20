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
      className="min-h-screen py-36 bg-gradient-to-br from-primary via-primary-light to-[#2d5a9e] relative"
      id="contact"
    >
      {/* Wave divider bottom */}
      <div className="absolute bottom-0 left-0 right-0 pointer-events-none">
        <svg
          viewBox="0 0 1440 70"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full block"
          preserveAspectRatio="none"
        >
          <path d="M0,30 C360,70 1080,0 1440,50 L1440,70 L0,70 Z" fill="#f0f7ff" />
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

      {/* Dot pattern */}
      <DotPattern variant="dark" />

      {/* Second circle outline — bottom right */}
      <div className="absolute -bottom-0 -right-10 w-[300px] h-[300px] rounded-full border-[35px] border-accent/12 pointer-events-none" />

      {/* Large blurred — top left */}
      <div className="absolute -top-32 -left-32 w-[550px] h-[550px] rounded-full bg-white/5 blur-2xl pointer-events-none" />

      {/* Bold circle outline — top left */}
      <div className="absolute -top-20 -left-20 w-[380px] h-[380px] rounded-full border-[50px] border-accent/12 pointer-events-none" />

      {/* Floating symbols */}
      <div className="absolute top-16 right-[12%] text-white/10 text-9xl font-bold pointer-events-none select-none leading-none">
        +
      </div>
      <div className="absolute bottom-16 left-[8%] text-accent/15 text-8xl font-bold pointer-events-none select-none leading-none">
        ×
      </div>
      <div className="absolute top-1/2 left-[2%] text-white/8 text-6xl pointer-events-none select-none leading-none">
        ◦
      </div>
      <div className="absolute top-[25%] right-[4%] text-accent/12 text-5xl font-bold pointer-events-none select-none leading-none">
        +
      </div>

      {/* Decorative lines — left */}
      <div className="absolute left-[3%] top-1/3 flex flex-col gap-3 pointer-events-none">
        {[80, 120, 60, 100, 50, 90, 70].map((w, i) => (
          <div key={i} className="h-[3px] bg-white/12 rounded-full" style={{ width: `${w}px` }} />
        ))}
      </div>

      {/* Decorative lines — right */}
      <div className="absolute right-[3%] top-1/3 flex flex-col gap-3 pointer-events-none">
        {[70, 100, 50, 85, 45, 75].map((w, i) => (
          <div
            key={i}
            className="h-[3px] bg-accent/20 rounded-full ml-auto"
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
                    href="mailto:chat.gbcjkt@gmail.com"
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
            <div className="bg-white rounded-2xl px-8 pt-10 pb-8 shadow-2xl">
              <h3 className="font-display text-xl font-bold text-text mb-5">{t("sendMessage")}</h3>

              <form onSubmit={handleSubmit}>
                {/* Name */}
                <div className="mb-[25px]">
                  <label className="block text-[0.8rem] font-semibold text-text mb-1.5">
                    {t("formName")}
                  </label>
                  <input
                    type="text"
                    name="name"
                    placeholder={t("namePlaceholder")}
                    required
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg text-sm font-[inherit] transition-all duration-300 focus:outline-none focus:border-accent focus:shadow-[0_0_0_4px_rgba(0,194,203,0.3)]"
                  />
                </div>

                {/* Email */}
                <div className="mb-[25px]">
                  <label className="block text-[0.8rem] font-semibold text-text mb-1.5">
                    {t("formEmail")}
                  </label>
                  <input
                    type="email"
                    name="email"
                    placeholder={t("emailPlaceholder")}
                    required
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg text-sm font-[inherit] transition-all duration-300 focus:outline-none focus:border-accent focus:shadow-[0_0_0_4px_rgba(0,194,203,0.3)]"
                  />
                </div>

                {/* Company */}
                <div className="mb-[30px]">
                  <label className="block text-[0.8rem] font-semibold text-text mb-1.5">
                    {t("formCompany")}
                  </label>
                  <input
                    type="text"
                    name="company"
                    placeholder={t("companyPlaceholder")}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg text-sm font-[inherit] transition-all duration-300 focus:outline-none focus:border-accent focus:shadow-[0_0_0_4px_rgba(0,194,203,0.3)]"
                  />
                </div>

                {/* Message */}
                <div className="mb-[30px]">
                  <label className="block text-[0.8rem] font-semibold text-text mb-1.5">
                    {t("formMessage")}
                  </label>
                  <textarea
                    name="message"
                    placeholder={t("messagePlaceholder")}
                    required
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg text-sm font-[inherit] transition-all duration-300 resize-y min-h-[90px] focus:outline-none focus:border-accent focus:shadow-[0_0_0_4px_rgba(0,194,203,0.3)]"
                  />
                </div>

                <button
                  type="submit"
                  disabled={sending}
                  className="w-full py-3 bg-gradient-to-br from-primary to-primary-light text-white border-none rounded-lg text-sm font-semibold cursor-pointer transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_10px_30px_rgba(15,40,71,0.3)] disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:translate-y-0"
                >
                  {sending ? "Sending..." : t("sendBtn")}{" "}
                  {!sending && <i className="far fa-paper-plane ml-2" />}
                </button>

                {submitted && (
                  <p className="mt-3 text-center text-accent font-semibold text-sm mb-20">
                    {t("contactSuccess")}
                  </p>
                )}

                {error && (
                  <p className="mt-3 text-center text-red-500 font-semibold text-sm">{error}</p>
                )}
              </form>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  )
}
