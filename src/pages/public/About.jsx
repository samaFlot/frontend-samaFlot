import AboutCtaSection from "../../components/public/A_Propos/AboutCtaSection";
import AboutHero from "../../components/public/A_Propos/AboutHero";
import LocalContextSection from "../../components/public/A_Propos/LocalContextSection";
import MissionSection from "../../components/public/A_Propos/MissionSection";
import PillarsSection from "../../components/public/A_Propos/PillarsSection";

export default function About() {
  return (
    <div className="flex w-full flex-col bg-gray-50">
      <AboutHero />
      <MissionSection />
      <PillarsSection />
      <LocalContextSection />
      <AboutCtaSection />
    </div>
  );
}
