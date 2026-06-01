import HeroSection from "@/components/home/HeroSection";
import IntroductionSection from "@/components/home/IntroductionSection";
import LearningJourneySection from "@/components/home/LearningJourneySection";
import RecentSection from "@/components/home/RecentSection";
import TechStackSection from "@/components/home/TechStackSection";
import { getAllCases } from "@/lib/cases/queries";

export default function Home() {
  return (
    <div className="space-y-32 pb-20">
      <HeroSection />
      <IntroductionSection />
      <LearningJourneySection />
      <TechStackSection />
      <RecentSection cases={getAllCases()} />
    </div>
  );
}
