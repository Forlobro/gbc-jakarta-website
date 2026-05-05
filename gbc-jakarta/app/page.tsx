import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import AboutSection from "./components/AboutSection";
import TeamSection from "./components/TeamSection";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <HeroSection />
      <AboutSection />
      <TeamSection />
      <Footer />
    </>
  );
}
