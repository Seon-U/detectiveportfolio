import HeroSection from "./HeroSection";
import IntroductionSection from "./IntroductionSection";
import LearningJourney from "./LearningJourney";

export default function Home() {
  return (
    <div className="space-y-32 pb-20">
      <HeroSection />
      <IntroductionSection />
      <LearningJourney />
      <section>Tech Stack</section>
      <section>Recent Project</section>
    </div>
  );
}
