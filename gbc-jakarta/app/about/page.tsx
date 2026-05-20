"use client"

import Navbar from "../components/Navbar"
import Footer from "../components/Footer"
import AboutDotNav from "./components/AboutDotNav"
import AboutHero from "./components/AboutHeroSection"
import GlobalNetworkSection from "./components/GlobalNetworkSection"
import GBSASection from "./components/GBSASection"
import GyeonggiSection from "./components/GyeonggiSection"
import TimelineSection from "./components/TimelineSection"
import AboutPageDecor from "./components/AboutPageDecor"

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <AboutDotNav />
      <main className="relative bg-white overflow-hidden">
        <AboutPageDecor />
        <AboutHero />
        <GlobalNetworkSection />
        <GBSASection />
        <GyeonggiSection />
        <TimelineSection />
      </main>
      <Footer />
    </>
  )
}
