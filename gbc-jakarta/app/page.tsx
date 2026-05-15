import Navbar from "./components/Navbar"
import HeroSection from "./(home)/components/HeroSection"
import AboutSection from "./(home)/components/AboutSection"
import DirectorSection from "./(home)/components/DirectorSection"
import SectionDotNav from "./(home)/components/SectionDotNav"
import Footer from "./components/Footer"

export default function Home() {
  return (
    <>
      <Navbar />
      <SectionDotNav />
      <HeroSection />
      <AboutSection />
      <DirectorSection />
      <Footer />
    </>
  )
}
