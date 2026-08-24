import HeroSection from "@/components/home/HeroSection";
import LearningJourneySection from "@/components/home/LearningJourneySection";
import RecentSection from "@/components/home/RecentSection";
import RoleShowcaseSection from "@/components/home/RoleShowcaseSection";
import ScrollHighlightSection from "@/components/home/ScrollHighlightSection";
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
      <ScrollHighlightSection />
      <LearningJourneySection />
      <RoleShowcaseSection />
      <RecentSection cases={getAllCases()} />
    </div>
  );
}
