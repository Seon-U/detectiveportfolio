import HeroSection from "./HeroSection";
import IntroductionSection from "./IntroductionSection";

export default function Home() {
  return (
    <div className="space-y-32 pb-20">
      <HeroSection />
      <IntroductionSection />
      <section>Learning Journey</section>
      <section>Tech Stack</section>
      <section>Recent Project</section>
    </div>
  );
}
