"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { useTranslation } from "../lib/LanguageContext"

const NAV_ITEMS = [
  { href: "/#home",      key: "home"      as const, color: "#1f478f" },
  { href: "/about",      key: "about"     as const, color: "#694fb2" },
  { href: "/companies",  key: "companies" as const, color: "#4daf7e" },
  { href: "/events",     key: "events"    as const, color: "#f28c38" },
  { href: "/contact#contact",    key: "contact"   as const, color: "#2b9fd2" },
]

export default function Navbar() {
  const { language, setLanguage, t } = useTranslation()
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <>
      <nav
        id="navbar"
        className="fixed top-0 left-0 right-0 z-[1000] flex items-center justify-between px-[3%] transition-all duration-400 backdrop-blur-[20px] bg-white py-2 shadow-[0_4px_30px_rgba(0,0,0,0.1)]"
      >
        {/* Logo */}
        <div className="flex items-center gap-4 z-10">
          <Link href="/#home">
            <Image
              src="/images/Desain_tanpa_judul__1_-removebg-preview.png"
              alt="GBSA"
              width={80}
              height={40}
              priority={true}
              className="h-9 w-auto transition-transform duration-300 hover:scale-105"
            />
          </Link>
          <Link href="/#home">
            <Image
              src="/images/logo.jpg"
              alt="GBC Jakarta"
              width={40}
              height={10}
              priority={true}
              className="h-1 w-auto mix-blend-multiply transition-transform duration-300 hover:scale-105"
            />
          </Link>
        </div>

        {/* Nav Links — desktop */}
        <ul className="hidden md:flex">
          {NAV_ITEMS.map((item, idx) => (
            <li key={item.key}>
              <Link
                href={item.href}
                className={`block text-center text-white text-[0.78rem] font-semibold tracking-wide transition-all duration-300 hover:brightness-110 hover:-translate-y-0.5 ${
                  language === "id" ? "w-[105px] py-2 px-2" : "w-[105px] py-2 px-2.5"
                } ${
                  idx === 0
                    ? "rounded-l-full"
                    : idx === NAV_ITEMS.length - 1
                    ? "rounded-r-full"
                    : ""
                }`}
                style={{ backgroundColor: item.color, color: "white" }}
              >
                {t(item.key)}
              </Link>
            </li>
          ))}
        </ul>

        {/* Right Side */}
        <div className="flex items-center gap-3">
          {/* Language Toggle */}
          <div className="flex bg-gray-100 rounded-[30px] p-0.5">
            <button
              onClick={() => setLanguage("id")}
              className={`px-3 py-1 border-none rounded-[20px] cursor-pointer text-[0.75rem] font-semibold transition-all duration-300 ${
                language === "id" ? "bg-primary text-white shadow-md" : "bg-transparent text-text-light"
              }`}
            >
              ID
            </button>
            <button
              onClick={() => setLanguage("en")}
              className={`px-3 py-1 border-none rounded-[20px] cursor-pointer text-[0.75rem] font-semibold transition-all duration-300 ${
                language === "en" ? "bg-primary text-white shadow-md" : "bg-transparent text-text-light"
              }`}
            >
              EN
            </button>
          </div>

          {/* CTA Button — desktop only */}
          <Link
            href="/contact#contact"
            className="hidden md:inline-block w-[130px] text-center py-2 bg-accent text-primary rounded-[30px] font-semibold text-[0.78rem] transition-all duration-300 shadow-[0_4px_15px_rgba(0,194,203,0.3)] hover:-translate-y-0.5 hover:shadow-[0_8px_25px_rgba(0,194,203,0.3)]"
          >
            {t("cta")}
          </Link>

            <Link href="/#home">
            <Image
              src="/images/gyeonggi-logo.jpeg"
              alt="GBC Jakarta"
              width={80}
              height={20}
              priority={true}
              className="h-1 w-auto mix-blend-multiply transition-transform duration-300 hover:scale-105"
            />
          </Link>

          {/* Hamburger — mobile only */}
          <button
            className="md:hidden flex flex-col justify-center items-center w-9 h-9 gap-[5px] rounded-lg hover:bg-gray-100 transition-colors"
            onClick={() => setMenuOpen((o) => !o)}
            aria-label="Toggle menu"
          >
            <span className={`block h-[2px] w-5 bg-primary rounded-full transition-all duration-300 ${menuOpen ? "rotate-45 translate-y-[7px]" : ""}`} />
            <span className={`block h-[2px] w-5 bg-primary rounded-full transition-all duration-300 ${menuOpen ? "opacity-0" : ""}`} />
            <span className={`block h-[2px] w-5 bg-primary rounded-full transition-all duration-300 ${menuOpen ? "-rotate-45 -translate-y-[7px]" : ""}`} />
          </button>
        </div>
      </nav>

      {/* Mobile Drawer */}
      <div
        className={`fixed inset-0 z-[999] md:hidden transition-all duration-300 ${
          menuOpen ? "pointer-events-auto" : "pointer-events-none"
        }`}
      >
        {/* Backdrop */}
        <div
          className={`absolute inset-0 bg-black/40 transition-opacity duration-300 ${menuOpen ? "opacity-100" : "opacity-0"}`}
          onClick={() => setMenuOpen(false)}
        />

        {/* Drawer panel */}
        <div
          className={`absolute top-0 right-0 h-full w-72 bg-white shadow-2xl flex flex-col transition-transform duration-300 ${
            menuOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          {/* Drawer header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
            <Image
              src="/images/Desain_tanpa_judul__1_-removebg-preview.png"
              alt="GBSA"
              width={70}
              height={35}
              className="h-8 w-auto"
            />
            <button
              onClick={() => setMenuOpen(false)}
              className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors text-primary"
              aria-label="Close menu"
            >
              <i className="fas fa-times text-sm" />
            </button>
          </div>

          {/* Nav items */}
          <nav className="flex flex-col px-4 py-6 gap-2 flex-1">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.key}
                href={item.href}
                onClick={() => setMenuOpen(false)}
                className="flex items-center gap-3 px-4 py-3 rounded-xl font-semibold text-[0.9rem] transition-all duration-200 hover:opacity-90 text-white"
                style={{ backgroundColor: item.color, color: "white" }}
              >
                {t(item.key)}
              </Link>
            ))}
          </nav>

          {/* Drawer footer */}
          <div className="px-6 py-5 border-t border-gray-100 flex flex-col gap-3">
            <Link
              href="/contact"
              onClick={() => setMenuOpen(false)}
              className="w-full text-center px-5 py-2.5 bg-accent text-primary rounded-[30px] font-semibold text-[0.85rem] shadow-[0_4px_15px_rgba(0,194,203,0.3)]"
            >
              {t("cta")}
            </Link>
            <div className="flex items-center justify-center gap-2">
              <Image
                src="/images/gyeonggi-logo.jpeg"
                alt="Gyeonggi-do"
                width={70}
                height={35}
                className="h-7 w-auto mix-blend-multiply"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
