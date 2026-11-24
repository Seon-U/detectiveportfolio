import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getDictionary } from "@/app/[lang]/dictionaries";
import HomeSectionTracker from "@/components/analytics/HomeSectionTracker";
import ClosingSection from "@/components/home/ClosingSection";
import HeroSection from "@/components/home/HeroSection";
import IntroductionSection from "@/components/home/IntroductionSection";
import LearningJourneySection from "@/components/home/LearningJourneySection";
import RoleShowcaseSection from "@/components/home/RoleShowcaseSection";
import { hasLocale } from "@/lib/i18n/config";
import { getProjectsByRole } from "@/lib/projects/queries";
import { getRoles } from "@/lib/roles/data";
import type { RoleId, RoleProject } from "@/lib/roles/types";
import { buildMetadata } from "@/lib/seo/metadata";

// title 생략 → 루트 레이아웃 기본 타이틀 상속(템플릿 접미사 중복 방지)
export async function generateMetadata({
  params,
}: PageProps<"/[lang]">): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = await getDictionary(lang);
  return buildMetadata({
    locale: lang,
    path: "/",
    keywords: dict.metadata.home.keywords,
  });
}

export default async function Home({ params }: PageProps<"/[lang]">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();

  const projectsByRole = Object.fromEntries(
    getRoles(lang).map((r) => [r.id, getProjectsByRole(r.id, lang)]),
  ) as Record<RoleId, RoleProject[]>;

  return (
    // data-home-section: 섹션 도달·체류 측정용 표시 (HomeSectionTracker, lib/analytics/events.ts의 HOME_SECTIONS)
    <div className="space-y-32 pb-20">
      <div data-home-section="hero">
        <HeroSection />
      </div>
      <div data-home-section="introduction">
        <IntroductionSection />
      </div>
      <div data-home-section="roles">
        <RoleShowcaseSection lang={lang} projectsByRole={projectsByRole} />
      </div>
      <div data-home-section="journey">
        <LearningJourneySection lang={lang} />
      </div>
      <div data-home-section="closing">
        <ClosingSection />
      </div>
      <HomeSectionTracker />
    </div>
  );
}
