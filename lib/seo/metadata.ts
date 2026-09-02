import type { Metadata } from "next";
import { DESCRIPTION_MAX_LENGTH, siteConfig } from "./config";

/** 길면 말줄임표로 자른다. 단어 경계는 고려하지 않는 단순 절단. */
export function truncate(text: string, max = DESCRIPTION_MAX_LENGTH): string {
  if (text.length <= max) return text;
  return `${text.slice(0, max - 1).trimEnd()}…`;
}

/** title(string | template object)에서 OG/twitter용 평문 타이틀을 추출 */
function resolveOgTitle(title?: Metadata["title"]): string {
  if (typeof title === "string") return title;
  if (title && typeof title === "object") {
    if ("absolute" in title && title.absolute) return title.absolute;
    if ("default" in title && title.default) return title.default;
  }
  return siteConfig.defaultTitle;
}

type BuildMetadataInput = {
  /** 문서 타이틀. 생략 시 루트 레이아웃 기본값 상속 */
  title?: Metadata["title"];
  /** 설명. 생략 시 사이트 기본 description. 항상 truncate 적용 */
  description?: string;
  /** canonical/OG용 경로. metadataBase로 절대화됨 (예: "/projects/001") */
  path: string;
  /** OG 이미지. 절대 URL이면 그대로, 없으면 기본 이미지로 폴백 */
  image?: string;
  /** OG type */
  type?: "website" | "article";
  /** 메타 keywords (예: case tags) */
  keywords?: string[];
};

/**
 * 페이지 metadata를 일관된 형태(canonical + OG + twitter)로 생성한다.
 * metadata 병합은 shallow이므로 openGraph/twitter는 각 페이지가 통째로 갖는다.
 */
export function buildMetadata({
  title,
  description,
  path,
  image,
  type = "website",
  keywords,
}: BuildMetadataInput): Metadata {
  const desc = truncate(description ?? siteConfig.description);
  const ogTitle = resolveOgTitle(title);
  const ogImage = image ?? siteConfig.ogImage;

  return {
    ...(title ? { title } : {}),
    description: desc,
    ...(keywords && keywords.length > 0 ? { keywords } : {}),
    alternates: { canonical: path },
    openGraph: {
      title: ogTitle,
      description: desc,
      url: path,
      siteName: siteConfig.name,
      locale: siteConfig.locale,
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
