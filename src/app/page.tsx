
import HeroSection from "@/components/section/HeroSection";
import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
import AboutSection from "@/components/section/AboutSection";
import SolutionsSection from "@/components/section/SolutionSection";
import TechnologySection from "@/components/section/TechnologySection";
import BenefitsSection from "@/components/section/BenefitsSection";
import CaseUseSection from "@/components/section/CaseUseSection";
import GetStartedSection from "@/components/section/GetStartedSection";
export default function Home() {
  return (
    <>
      <Navbar />
      <HeroSection />
      <AboutSection />
      <SolutionsSection />
      <TechnologySection />
      <BenefitsSection />
      <CaseUseSection />
      <GetStartedSection />
      <Footer />
      {/* Add more sections here as you build them */}
    </>
  );
}
