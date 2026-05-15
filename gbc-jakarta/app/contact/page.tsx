"use client"

import { useEffect } from "react"
import Navbar from "@/app/components/Navbar"
import Footer from "@/app/components/Footer"
import MapSection from "./components/MapSection"
import ContactSection from "./components/ContactSection"
import FamilySiteSection from "./components/FamilySiteSection"
import ContactDotNav from "./components/ContactDotNav"

export default function ContactPage() {
  useEffect(() => {
    const hash = window.location.hash.replace("#", "")
    if (!hash) return

    const scrollToHash = () => {
      const el = document.getElementById(hash)
      if (!el) return
      const top = el.getBoundingClientRect().top + window.scrollY
      window.scrollTo({ top, behavior: "smooth" })
    }

    // Try after fonts/images loaded (most reliable)
    if (document.readyState === "complete") {
      setTimeout(scrollToHash, 50)
    } else {
      window.addEventListener("load", () => setTimeout(scrollToHash, 50), { once: true })
    }
  }, [])

  return (
    <>
      <Navbar />
      <ContactDotNav />
      <MapSection />
      <ContactSection />
      <div className="min-h-screen flex flex-col">
        <FamilySiteSection />
        <Footer />
      </div>
    </>
  )
}
