import { siteConfig } from "./config";

/** siteConfig.url 기준으로 상대/절대 경로를 절대 URL로 정규화 */
function toAbsoluteUrl(pathOrUrl: string): string {
  return pathOrUrl.startsWith("http")
    ? pathOrUrl
    : `${siteConfig.url}${pathOrUrl}`;
}

/**
 * 사이트 소유자를 나타내는 Person 구조화 데이터.
 * 루트 레이아웃에 한 번만 삽입해 전 페이지에 동일 엔티티로 노출한다.
 */
export function buildPersonJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: siteConfig.name,
    url: siteConfig.url,
    image: toAbsoluteUrl(siteConfig.ogImage),
    jobTitle: "Full-Stack Developer",
    email: "seonu.kim.kr@gmail.com",
  };
}

type CreativeWorkJsonLdInput = {
  /** 작품명 (케이스/아카이브 제목) */
  name: string;
  description: string;
  /** canonical 경로 (예: "/cases/foo") */
  path: string;
  image?: string;
  /** ISO 8601 날짜 문자열 */
  datePublished?: string;
  keywords?: string[];
};

/**
 * 케이스 스터디/아카이브 게시물을 나타내는 CreativeWork 구조화 데이터.
 * author는 항상 siteConfig의 Person을 가리켜 Person과 연결된다.
 */
export function buildCreativeWorkJsonLd({
  name,
  description,
  path,
  image,
  datePublished,
  keywords,
}: CreativeWorkJsonLdInput) {
  return {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name,
    description,
    url: toAbsoluteUrl(path),
    ...(image ? { image: toAbsoluteUrl(image) } : {}),
    ...(datePublished ? { datePublished } : {}),
    ...(keywords && keywords.length > 0
      ? { keywords: keywords.join(", ") }
      : {}),
    author: {
      "@type": "Person",
      name: siteConfig.name,
      url: siteConfig.url,
    },
  };
}
