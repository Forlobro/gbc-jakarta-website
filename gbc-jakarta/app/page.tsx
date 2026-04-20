import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import VideoSection from "./components/VideoSection";
import AboutSection from "./components/AboutSection";
import CompaniesSection from "./components/CompaniesSection";
import TeamSection from "./components/TeamSection";
import MapSection from "./components/MapSection";
import ContactSection from "./components/ContactSection";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <HeroSection />
      <VideoSection />
<AboutSection />
      <CompaniesSection />
      <TeamSection />
      <MapSection />
      <ContactSection />
      <Footer />
    </>
  );
}
