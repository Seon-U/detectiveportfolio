import { defaultLocale, type Locale, locales } from "@/lib/i18n/config";

/**
 * 사이트 전역 SEO 상수 (locale 무관).
 * URL은 환경변수에서 읽으며(.env는 직접 관리), 빌드 환경에 따라 분기된다.
 */
export const siteConfig = {
  /** metadataBase 기준 URL. NEXT_PUBLIC_SITE_URL 미설정 시 운영 도메인/로컬로 폴백. */
  url:
    process.env.NEXT_PUBLIC_SITE_URL ||
    (process.env.VERCEL_PROJECT_PRODUCTION_URL
      ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
      : "http://localhost:3000"),
  /** 기본 OG 이미지 — 1200×630 전용 */
  ogImage: "/ogImg.webp",
} as const;

type LocaleSiteConfig = {
  /** OG siteName 및 title 템플릿 접미사 */
  name: string;
  /** 루트/홈 기본 타이틀 */
  defaultTitle: string;
  /** 기본 description (페이지별 미지정 시 폴백) */
  description: string;
  /** OG locale (html lang과 일치) */
  ogLocale: string;
  /** Person JSON-LD jobTitle */
  jobTitle: string;
};

const localeSiteConfig: Record<Locale, LocaleSiteConfig> = {
  ko: {
    name: "김선우(Seonu Kim)",
    defaultTitle: "김선우 | 프론트엔드 개발자 포트폴리오",
    description:
      "Next.js 기반 프론트엔드 개발자 김선우의 포트폴리오. 백엔드 설계부터 iOS 개발, 기획까지 맡은 역할을 꼼꼼하게 수행한 프로젝트 기록을 담았습니다.",
    ogLocale: "ko_KR",
    jobTitle: "Frontend Developer",
  },
  en: {
    name: "Seonu Kim",
    defaultTitle: "Seonu Kim | Frontend Developer Portfolio",
    description:
      "Portfolio of Seonu Kim, a Next.js frontend developer. Projects spanning backend design, iOS development, and product planning, each done with care.",
    ogLocale: "en_US",
    jobTitle: "Frontend Developer",
  },
};

/** locale별 SEO 설정 (전역 상수 포함) */
export function getSiteConfig(locale: Locale) {
  return { ...siteConfig, ...localeSiteConfig[locale] };
}

/** locale 무관 경로("/", "/projects/001")를 locale 접두사 경로로 변환 */
export function localizedPath(locale: Locale, path: string): string {
  return path === "/" ? `/${locale}` : `/${locale}${path}`;
}

/**
 * hreflang 대체 URL 맵. x-default는 기본 locale(ko)을 가리킨다.
 * metadata alternates.languages와 sitemap alternates.languages에서 공용.
 */
export function languageAlternates(
  path: string,
  toUrl: (localized: string) => string = (p) => p,
): Record<string, string> {
  const entries = locales.map(
    (l) => [l, toUrl(localizedPath(l, path))] as const,
  );
  return {
    ...Object.fromEntries(entries),
    "x-default": toUrl(localizedPath(defaultLocale, path)),
  };
}

/** meta description 최대 길이(검색결과 잘림 방지) */
export const DESCRIPTION_MAX_LENGTH = 155;
