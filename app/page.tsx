import RecentSection from "@/components/HomeSections/RecentSection";
import { ALLCASES } from "@/lib/cases/data";
import HeroSection from "../components/HomeSections/HeroSection";
import IntroductionSection from "../components/HomeSections/IntroductionSection";
import LearningJourneySection from "../components/HomeSections/LearningJourneySection";
import TechStackSection from "../components/HomeSections/TechStackSection";

export default function Home() {
  return (
    <div className="space-y-32 pb-20">
      <HeroSection />
      <IntroductionSection />
      <LearningJourneySection />
      <TechStackSection />
      <RecentSection cases={ALLCASES} />
    </div>
  );
}
