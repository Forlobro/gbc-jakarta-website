"use client"

import Navbar from "../components/Navbar"
import Footer from "../components/Footer"
import EventsHeaderSection from "./components/EventsHeaderSection"
import EventsFeaturedSection from "./components/EventsFeaturedSection"
import EventsPastSection from "./components/EventsPastSection"
import EventsDotNav from "./components/EventsDotNav"

export default function EventsPage() {
  return (
    <>
      <Navbar />
      <EventsDotNav />
      <EventsHeaderSection />
      <EventsFeaturedSection />
      <EventsPastSection />
      <Footer />
    </>
  )
}
