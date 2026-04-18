"use client";

import { useState, FormEvent } from "react";
import { useTranslation } from "../lib/LanguageContext";
import ScrollReveal from "./ScrollReveal";

export default function ContactSection() {
  const { t } = useTranslation();
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
    (e.target as HTMLFormElement).reset();
  };

  return (
    <section
      className="py-36 bg-gradient-to-br from-primary via-primary-light to-[#2d5a9e] relative"
      id="contact"
    >
      {/* Wave divider top */}
      <div className="absolute top-0 left-0 right-0 pointer-events-none">
        <svg viewBox="0 0 1440 70" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
          <path d="M0,40 C360,0 1080,70 1440,20 L1440,0 L0,0 Z" fill="#f8fafc"/>
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

      {/* Grid dot pattern */}
      <div className="absolute inset-0 pointer-events-none" style={{
        backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.1) 1.5px, transparent 1.5px)",
        backgroundSize: "28px 28px",
      }} />

      {/* Large blurred accent — bottom right */}
      <div className="absolute -bottom-40 -right-40 w-[700px] h-[700px] rounded-full bg-accent/15 blur-2xl pointer-events-none" />

      {/* Bold circle outline — bottom right */}
      <div className="absolute -bottom-28 -right-28 w-[550px] h-[550px] rounded-full border-[60px] border-white/8 pointer-events-none" />

      {/* Second circle outline — bottom right */}
      <div className="absolute -bottom-10 -right-10 w-[300px] h-[300px] rounded-full border-[35px] border-accent/12 pointer-events-none" />

      {/* Large blurred — top left */}
      <div className="absolute -top-32 -left-32 w-[550px] h-[550px] rounded-full bg-white/5 blur-2xl pointer-events-none" />

      {/* Bold circle outline — top left */}
      <div className="absolute -top-20 -left-20 w-[380px] h-[380px] rounded-full border-[50px] border-accent/12 pointer-events-none" />

      {/* Floating symbols */}
      <div className="absolute top-16 right-[12%] text-white/10 text-9xl font-bold pointer-events-none select-none leading-none">+</div>
      <div className="absolute bottom-16 left-[8%] text-accent/15 text-8xl font-bold pointer-events-none select-none leading-none">×</div>
      <div className="absolute top-1/2 left-[2%] text-white/8 text-6xl pointer-events-none select-none leading-none">◦</div>
      <div className="absolute top-[25%] right-[4%] text-accent/12 text-5xl font-bold pointer-events-none select-none leading-none">+</div>

      {/* Decorative lines — left */}
      <div className="absolute left-[3%] top-1/3 flex flex-col gap-3 pointer-events-none">
        {[80, 120, 60, 100, 50, 90, 70].map((w, i) => (
          <div key={i} className="h-[3px] bg-white/12 rounded-full" style={{ width: `${w}px` }} />
        ))}
      </div>

      {/* Decorative lines — right */}
      <div className="absolute right-[3%] top-1/3 flex flex-col gap-3 pointer-events-none">
        {[70, 100, 50, 85, 45, 75].map((w, i) => (
          <div key={i} className="h-[3px] bg-accent/20 rounded-full ml-auto" style={{ width: `${w}px` }} />
        ))}
      </div>

      <div className="max-w-[1400px] mx-auto px-[5%]">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 relative z-[1]">
          {/* Contact Content */}
          <ScrollReveal className="text-white">
            <div className="inline-flex items-center gap-3 text-accent font-semibold text-[0.9rem] tracking-[0.1em] uppercase mb-4 before:content-[''] before:w-10 before:h-0.5 before:bg-accent before:block">
              {t("contactLabel")}
            </div>

            <h2 className="font-display text-3xl md:text-[3rem] font-extrabold text-white mb-6 leading-[1.2]">
              {t("contactTitle")}
            </h2>

            <p className="text-white/70 text-lg mb-12">
              {t("contactDescription")}
            </p>

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
                    DBS Tower Suite #905, Jl. Prof. Dr. Satrio Kav.3
                    <br />
                    Kuningan, South Jakarta 12940
                  </p>
                </div>
              </div>

              {/* Email */}
              <div className="flex gap-5 items-start">
                <div className="w-[55px] h-[55px] bg-white/10 rounded-[14px] flex items-center justify-center text-xl text-accent shrink-0">
                  <i className="fas fa-envelope" />
                </div>
                <div>
                  <h4 className="text-[0.9rem] font-semibold text-white/60 uppercase tracking-[0.05em] mb-1">
                    Email
                  </h4>
                  <a
                    href="mailto:gbcjkt@gbcprime.com"
                    className="text-[1.05rem] text-white hover:text-accent transition-colors"
                  >
                    gbcjkt@gbcprime.com
                  </a>
                </div>
              </div>

              {/* WhatsApp */}
              <div className="flex gap-5 items-start">
                <div className="w-[55px] h-[55px] bg-white/10 rounded-[14px] flex items-center justify-center text-xl text-accent shrink-0">
                  <i className="fab fa-whatsapp" />
                </div>
                <div>
                  <h4 className="text-[0.9rem] font-semibold text-white/60 uppercase tracking-[0.05em] mb-1">
                    WhatsApp
                  </h4>
                  <a
                    href="https://wa.me/628118160627"
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
            </div>
          </ScrollReveal>

          {/* Contact Form */}
          <ScrollReveal>
            <div className="bg-white rounded-3xl p-12 shadow-2xl">
              <h3 className="font-display text-2xl font-bold text-text mb-8">
                {t("sendMessage")}
              </h3>

              <form onSubmit={handleSubmit}>
                {/* Name */}
                <div className="mb-6">
                  <label className="block text-[0.9rem] font-semibold text-text mb-2">
                    {t("formName")}
                  </label>
                  <input
                    type="text"
                    name="name"
                    placeholder="John Doe"
                    required
                    className="w-full px-5 py-4 border-2 border-gray-200 rounded-xl text-base font-[inherit] transition-all duration-300 focus:outline-none focus:border-accent focus:shadow-[0_0_0_4px_rgba(0,194,203,0.3)]"
                  />
                </div>

                {/* Email */}
                <div className="mb-6">
                  <label className="block text-[0.9rem] font-semibold text-text mb-2">
                    {t("formEmail")}
                  </label>
                  <input
                    type="email"
                    name="email"
                    placeholder="john@company.com"
                    required
                    className="w-full px-5 py-4 border-2 border-gray-200 rounded-xl text-base font-[inherit] transition-all duration-300 focus:outline-none focus:border-accent focus:shadow-[0_0_0_4px_rgba(0,194,203,0.3)]"
                  />
                </div>

                {/* Company */}
                <div className="mb-6">
                  <label className="block text-[0.9rem] font-semibold text-text mb-2">
                    {t("formCompany")}
                  </label>
                  <input
                    type="text"
                    name="company"
                    placeholder="Your Company Name"
                    className="w-full px-5 py-4 border-2 border-gray-200 rounded-xl text-base font-[inherit] transition-all duration-300 focus:outline-none focus:border-accent focus:shadow-[0_0_0_4px_rgba(0,194,203,0.3)]"
                  />
                </div>

                {/* Message */}
                <div className="mb-6">
                  <label className="block text-[0.9rem] font-semibold text-text mb-2">
                    {t("formMessage")}
                  </label>
                  <textarea
                    name="message"
                    placeholder="Tell us about your business needs..."
                    required
                    className="w-full px-5 py-4 border-2 border-gray-200 rounded-xl text-base font-[inherit] transition-all duration-300 resize-y min-h-[120px] focus:outline-none focus:border-accent focus:shadow-[0_0_0_4px_rgba(0,194,203,0.3)]"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-4 bg-gradient-to-br from-primary to-primary-light text-white border-none rounded-xl text-base font-semibold cursor-pointer transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_10px_30px_rgba(15,40,71,0.3)]"
                >
                  {t("sendBtn")}{" "}
                  <i className="fas fa-paper-plane ml-2" />
                </button>

                {submitted && (
                  <p className="mt-4 text-center text-accent font-semibold">
                    Thank you for your message! We will get back to you soon.
                  </p>
                )}
              </form>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
