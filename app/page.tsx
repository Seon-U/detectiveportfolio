import HeroSection from "@/components/home/HeroSection";
import IntroductionSection from "@/components/home/IntroductionSection";
import LearningJourneySection from "@/components/home/LearningJourneySection";
import RecentSection from "@/components/home/RecentSection";
import TechStackSection from "@/components/home/TechStackSection";
import { getAllCases } from "@/lib/cases/queries";
import { buildMetadata } from "@/lib/seo/metadata";

// title 생략 → 루트 레이아웃 기본 타이틀 상속(템플릿 접미사 중복 방지)
export const metadata = buildMetadata({
  path: "/",
});

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
