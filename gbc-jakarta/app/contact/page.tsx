"use client"

import Navbar from "@/app/components/Navbar"
import Footer from "@/app/components/Footer"
import MapSection from "./components/MapSection"
import ContactSection from "./components/ContactSection"
import FamilySiteSection from "./components/FamilySiteSection"

export default function ContactPage() {
  return (
    <>
      <Navbar />
      <div className="pt-16">
        <MapSection />
        <ContactSection />
        <FamilySiteSection />
      </div>
      <Footer />
    </>
  )
}
