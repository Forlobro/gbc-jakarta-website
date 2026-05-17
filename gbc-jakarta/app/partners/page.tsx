"use client"

import Navbar from "../components/Navbar"
import Footer from "../components/Footer"
import { PartnersProvider } from "./context/PartnersContext"
import PartnersHeaderSection from "./components/PartnersHeaderSection"
import PartnersCardsSection from "./components/PartnersCardsSection"
import DotPattern from "../components/DotPattern"

export default function PartnersPage() {
  return (
    <PartnersProvider>
      <Navbar />
      <main className="relative">
        <DotPattern />
        <PartnersHeaderSection />
        <PartnersCardsSection />
      </main>
      <Footer />
    </PartnersProvider>
  )
}
