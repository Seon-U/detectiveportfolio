import HeroSection from "./HeroSection";
import IntroductionSection from "./IntroductionSection";
import LearningJourneySection from "./LearningJourneySection";
import TechStackSection from "./TechStackSection";

export default function Home() {
  return (
    <div className="space-y-32 pb-20">
      <HeroSection />
      <IntroductionSection />
      <LearningJourneySection />
      <TechStackSection />
      <section>Recent Project</section>
    </div>
  );
}
