"use client"

import Navbar from "../components/Navbar"
import Footer from "../components/Footer"
import { PartnersProvider } from "./context/PartnersContext"
import PartnersHeaderSection from "./components/PartnersHeaderSection"
import PartnersCardsSection from "./components/PartnersCardsSection"
import PartnersPageDecor from "./components/PartnersPageDecor"

export default function PartnersPage() {
  return (
    <PartnersProvider>
      <Navbar />
      <main className="relative bg-white overflow-hidden">
        <PartnersPageDecor />
        <PartnersHeaderSection />
        <PartnersCardsSection />
      </main>
      <Footer />
    </PartnersProvider>
  )
}
