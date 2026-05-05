"use client"

import Navbar from "../components/Navbar"
import Footer from "../components/Footer"
import MapSection from "../components/MapSection"
import ContactSection from "../components/ContactSection"

export default function ContactPage() {
  return (
    <>
      <Navbar />
      <div className="pt-16">
        <MapSection />
        <ContactSection />
      </div>
      <Footer />
    </>
  )
}
