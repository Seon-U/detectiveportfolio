/**
 * 사이트 전역 SEO 상수.
 * URL은 환경변수에서 읽으며(.env는 직접 관리), 빌드 환경에 따라 분기된다.
 */
export const siteConfig = {
  /** metadataBase 기준 URL. NEXT_PUBLIC_SITE_URL 미설정 시 운영 도메인/로컬로 폴백. */
  url:
    process.env.NEXT_PUBLIC_SITE_URL ||
    (process.env.VERCEL_PROJECT_PRODUCTION_URL
      ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
      : "http://localhost:3000"),
  /** OG siteName 및 title 템플릿 접미사 */
  name: "Seonu kim",
  /** 루트/홈 기본 타이틀 */
  defaultTitle: "Seonu kim | FullStack",
  /** 기본 description (페이지별 미지정 시 폴백) */
  description: "FullStack Portfolio",
  /** OG locale (html lang="ko"와 일치) */
  locale: "ko_KR",
  /** 기본 OG 이미지 폴백 — 전용 1200x630 이미지로 교체 권장 */
  ogImage: "/profile.png",
} as const;

/** meta description 최대 길이(검색결과 잘림 방지) */
export const DESCRIPTION_MAX_LENGTH = 155;
