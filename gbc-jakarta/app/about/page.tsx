"use client"

import Navbar from "../components/Navbar"
import Footer from "../components/Footer"
import AboutDotNav from "./components/AboutDotNav"
import AboutHero from "./components/AboutHeroSection"
import GlobalNetworkSection from "./components/GlobalNetworkSection"
import GBSASection from "./components/GBSASection"
import GyeonggiSection from "./components/GyeonggiSection"
import TimelineSection from "./components/TimelineSection"
import DotPattern from "../components/DotPattern"

export default function AboutPage() {
  return (
    <main>
      <Navbar />
      <AboutDotNav />
      <main className="relative">
        <DotPattern />
        <AboutHero />
        <GlobalNetworkSection />
        <GBSASection />
        <GyeonggiSection />
        <TimelineSection />
      </main>
      <Footer />
    </main>
  )
}
