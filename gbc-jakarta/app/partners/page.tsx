"use client"

import Navbar from "../components/Navbar"
import Footer from "../components/Footer"
import { PartnersProvider } from "./context/PartnersContext"
import PartnersHeaderSection from "./components/PartnersHeaderSection"
import PartnersCardsSection from "./components/PartnersCardsSection"

export default function PartnersPage() {
  return (
    <PartnersProvider>
      <Navbar />
      <PartnersHeaderSection />
      <PartnersCardsSection />
      <Footer />
    </PartnersProvider>
  )
}
