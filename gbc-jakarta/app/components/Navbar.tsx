"use client"

import Link from "next/link"
import Image from "next/image"
import { useTranslation } from "../lib/LanguageContext"

export default function Navbar() {
  const { language, setLanguage, t } = useTranslation()

  return (
    <nav
      id="navbar"
      className={`fixed top-0 left-0 right-0 z-1000 flex items-center justify-between px-[5%] transition-all duration-400 ease-cubic-bezier(0.4,0,0.2,1) backdrop-blur-[20px] bg-white py-3 shadow-[0_4px_30px_rgba(0,0,0,0.1)]`}
    >
      {/* Logo */}
      <Link href="/" className="flex items-center gap-3 z-10">
        <Image
          src="/images/logo.jpg"
          alt="GBC Jakarta"
          width={61}
          height={18}
          className="h-4.5 w-auto transition-transform duration-300 hover:scale-105"
        />
      </Link>

      {/* Nav Links */}
      <ul className="hidden md:flex gap-12">
        {[
          { href: "/#home", key: "home" as const },
          { href: "/#about", key: "about" as const },
          { href: "/#companies", key: "companies" as const },
          { href: "/#team", key: "team" as const },
          { href: "/events", key: "events" as const },
          { href: "/#contact", key: "contact" as const },
        ].map((item) => (
          <li key={item.key}>
            <Link
              href={item.href}
              className="relative text-black font-medium text-[0.95rem] tracking-[0.02em] py-2 transition-colors duration-300 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-accent after:transition-all after:duration-300 hover:after:w-full"
            >
              {t(item.key)}
            </Link>
          </li>
        ))}
      </ul>

      {/* Right Side */}
      <div className="flex items-center gap-6">
        {/* Language Toggle */}
        <div className="flex bg-gray-100 rounded-[30px] p-1 backdrop-blur-[10px]">
          <button
            onClick={() => setLanguage("en")}
            className={`px-4 py-1.5 border-none rounded-[20px] cursor-pointer text-[0.85rem] font-semibold transition-all duration-300 ${
              language === "en"
                ? "bg-primary text-white shadow-md"
                : "bg-transparent text-text-light"
            }`}
          >
            EN
          </button>
          <button
            onClick={() => setLanguage("id")}
            className={`px-4 py-1.5 border-none rounded-[20px] cursor-pointer text-[0.85rem] font-semibold transition-all duration-300 ${
              language === "id"
                ? "bg-primary text-white shadow-md"
                : "bg-transparent text-text-light"
            }`}
          >
            ID
          </button>
        </div>

        {/* CTA Button */}
        <Link
          href="/#contact"
          className="hidden md:inline-block px-7 py-3 bg-accent text-primary rounded-[30px] font-semibold text-[0.9rem] transition-all duration-300 shadow-[0_4px_15px_rgba(0,194,203,0.3)] hover:-translate-y-0.5 hover:shadow-[0_8px_25px_rgba(0,194,203,0.3)]"
        >
          {t("cta")}
        </Link>
      </div>
    </nav>
  )
}
