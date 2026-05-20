"use client"

import Navbar from "../components/Navbar"
import Footer from "../components/Footer"
import EventsHeaderSection from "./components/EventsHeaderSection"
import EventsFeaturedSection from "./components/EventsFeaturedSection"
import EventsPastSection from "./components/EventsPastSection"
import EventsDotNav from "./components/EventsDotNav"
import EventsPageDecor from "./components/EventsPageDecor"

export default function EventsPage() {
  return (
    <>
      <Navbar />
      <EventsDotNav />
      <EventsHeaderSection />
      <main className="relative bg-white overflow-hidden">
        <EventsPageDecor />
        <EventsFeaturedSection />
        <EventsPastSection />
      </main>
      <Footer />
    </>
  )
}
