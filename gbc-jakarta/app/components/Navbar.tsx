"use client"

import Link from "next/link"
import Image from "next/image"
import { useTranslation } from "../lib/LanguageContext"

const NAV_ITEMS = [
  { href: "/#home",      key: "home"      as const, color: "#1f478f" },
  { href: "/#about",     key: "about"     as const, color: "#694fb2" },
  { href: "/#companies", key: "companies" as const, color: "#4daf7e" },
  { href: "/events",     key: "events"    as const, color: "#f28c38" },
  { href: "/#contact",   key: "contact"   as const, color: "#2b9fd2" },
]

export default function Navbar() {
  const { language, setLanguage, t } = useTranslation()

  return (
    <nav
      id="navbar"
      className="fixed top-0 left-0 right-0 z-1000 flex items-center justify-between px-[3%] transition-all duration-400 backdrop-blur-[20px] bg-white py-2 shadow-[0_4px_30px_rgba(0,0,0,0.1)]"
    >
      {/* Logo kiri: Gyeonggi + GBC + GBSA */}
      <div className="flex items-center gap-3 z-10">      
        <Link href="#home">
          <Image
          src="/images/gbsa-logo.jpeg"
          alt="GBSA"
          width={80}
          height={40}
          className="h-9 w-auto transition-transform duration-300 hover:scale-105"
        />
        </Link>
        
        

        <div className="w-px h-7 bg-gray-200" />
        <Link href="#home">
          <Image
            src="/images/logo.jpg"
            alt="GBC Jakarta"
            width={60}
            height={30}
            className="h-9 w-auto transition-transform duration-300 hover:scale-105"
          />
        </Link>
      </div>

      {/* Nav Links */}
      <ul className="hidden md:flex ">
        {NAV_ITEMS.map((item, idx) => (
          <li key={item.key}>
            <Link
              href={item.href}
              className={`px-8 py-2 text-white text-[0.78rem] font-semibold tracking-wide transition-all duration-300 hover:brightness-110 hover:-translate-y-0.5 inline-block ${
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
              language === "id"
                ? "bg-primary text-white shadow-md"
                : "bg-transparent text-text-light"
            }`}
          >
            ID
          </button>
          <button
            onClick={() => setLanguage("en")}
            className={`px-3 py-1 border-none rounded-[20px] cursor-pointer text-[0.75rem] font-semibold transition-all duration-300 ${
              language === "en"
                ? "bg-primary text-white shadow-md"
                : "bg-transparent text-text-light"
            }`}
          >
            EN
          </button>
        </div>

        {/* CTA Button */}
        <Link
          href="/#contact"
          className="hidden md:inline-block px-5 py-2 bg-accent text-primary rounded-[30px] font-semibold text-[0.78rem] transition-all duration-300 shadow-[0_4px_15px_rgba(0,194,203,0.3)] hover:-translate-y-0.5 hover:shadow-[0_8px_25px_rgba(0,194,203,0.3)]"
        >
          {t("cta")}
        </Link>

        <Image
          src="/images/gyeonggi-logo.jpeg"
          alt="Gyeonggi-do"
          width={80}
          height={40}
          className="h-9 w-auto -mt-2"
        />
      </div>
    </nav>
  )
}
