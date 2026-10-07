import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ClosingSection from "@/components/home/ClosingSection";
import HeroSection from "@/components/home/HeroSection";
import IntroductionSection from "@/components/home/IntroductionSection";
import LearningJourneySection from "@/components/home/LearningJourneySection";
import RoleShowcaseSection from "@/components/home/RoleShowcaseSection";
import { hasLocale } from "@/lib/i18n/config";
import { buildMetadata } from "@/lib/seo/metadata";

// title 생략 → 루트 레이아웃 기본 타이틀 상속(템플릿 접미사 중복 방지)
export async function generateMetadata({
  params,
}: PageProps<"/[lang]">): Promise<Metadata> {
  const { lang } = await params;
  return buildMetadata({
    path: `/${lang}`,
    keywords: [
      "프론트엔드 개발자",
      "포트폴리오",
      "김선우",
      "Next.js",
      "React",
      "Spring Boot",
      "SwiftUI",
      "웹 개발자",
    ],
  });
}

export default async function Home({ params }: PageProps<"/[lang]">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();

  return (
    <div className="space-y-32 pb-20">
      <HeroSection />
      <IntroductionSection />
      <RoleShowcaseSection lang={lang} />
      <LearningJourneySection />
      <ClosingSection />
    </div>
  );
}
