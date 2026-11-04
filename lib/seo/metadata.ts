import type { Metadata } from "next";
import { type Locale, locales } from "@/lib/i18n/config";
import {
  DESCRIPTION_MAX_LENGTH,
  getSiteConfig,
  languageAlternates,
  localizedPath,
} from "./config";

/** 길면 말줄임표로 자른다. 단어 경계는 고려하지 않는 단순 절단. */
export function truncate(text: string, max = DESCRIPTION_MAX_LENGTH): string {
  if (text.length <= max) return text;
  return `${text.slice(0, max - 1).trimEnd()}…`;
}

/** title(string | template object)에서 OG/twitter용 평문 타이틀을 추출 */
function resolveOgTitle(
  title: Metadata["title"] | undefined,
  fallback: string,
): string {
  if (typeof title === "string") return title;
  if (title && typeof title === "object") {
    if ("absolute" in title && title.absolute) return title.absolute;
    if ("default" in title && title.default) return title.default;
  }
  return fallback;
}

type BuildMetadataInput = {
  /** 현재 페이지 locale — canonical/hreflang/OG locale 결정 */
  locale: Locale;
  /** 문서 타이틀. 생략 시 루트 레이아웃 기본값 상속 */
  title?: Metadata["title"];
  /** 설명. 생략 시 사이트 기본 description. 항상 truncate 적용 */
  description?: string;
  /** locale 접두사 없는 경로. canonical·hreflang 생성에 사용 (예: "/", "/projects/001") */
  path: string;
  /** OG 이미지. 절대 URL이면 그대로, 없으면 기본 이미지로 폴백 */
  image?: string;
  /** OG type */
  type?: "website" | "article";
  /** 메타 keywords (예: case tags) */
  keywords?: string[];
};

/**
 * 페이지 metadata를 일관된 형태(canonical + hreflang + OG + twitter)로 생성한다.
 * metadata 병합은 shallow이므로 alternates/openGraph/twitter는 각 페이지가 통째로 갖는다.
 */
export function buildMetadata({
  locale,
  title,
  description,
  path,
  image,
  type = "website",
  keywords,
}: BuildMetadataInput): Metadata {
  const site = getSiteConfig(locale);
  const desc = truncate(description ?? site.description);
  const ogTitle = resolveOgTitle(title, site.defaultTitle);
  const ogImage = image ?? site.ogImage;
  const canonical = localizedPath(locale, path);

  return {
    ...(title ? { title } : {}),
    description: desc,
    ...(keywords && keywords.length > 0 ? { keywords } : {}),
    alternates: { canonical, languages: languageAlternates(path) },
    openGraph: {
      title: ogTitle,
      description: desc,
      url: canonical,
      siteName: site.name,
      locale: site.ogLocale,
      alternateLocale: locales
        .filter((l) => l !== locale)
        .map((l) => getSiteConfig(l).ogLocale),
      type,
      images: [{ url: ogImage }],
    },
    twitter: {
      card: "summary_large_image",
      title: ogTitle,
      description: desc,
      images: [ogImage],
    },
  };
}
