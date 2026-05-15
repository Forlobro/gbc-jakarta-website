import Navbar from "./components/Navbar"
import HeroSection from "./(home)/components/HeroSection"
import AboutSection from "./(home)/components/AboutSection"
import TeamSection from "./(home)/components/TeamSection"
import Footer from "./components/Footer"

export default function Home() {
  return (
    <>
      <Navbar />
      <HeroSection />
      <AboutSection />
      <TeamSection />
      <Footer />
    </>
  )
}
