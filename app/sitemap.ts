import type { MetadataRoute } from "next";
import { locales } from "@/lib/i18n/config";
import { ALL_PROJECTS } from "@/lib/projects/data";
import {
  languageAlternates,
  localizedPath,
  siteConfig,
} from "@/lib/seo/config";

type RouteEntry = Omit<MetadataRoute.Sitemap[number], "url" | "alternates"> & {
  /** locale 접두사 없는 경로 */
  path: string;
};

const toUrl = (path: string) => `${siteConfig.url}${path}`;

/** 홈·프로젝트 목록의 실제 내용 수정일 — 해당 페이지 내용이 바뀔 때만 올린다 */
const HOME_LAST_MODIFIED = "2026-11-04";
const PROJECTS_LAST_MODIFIED = "2026-11-04";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes: RouteEntry[] = [
    {
      path: "/",
      lastModified: new Date(HOME_LAST_MODIFIED),
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      path: "/projects",
      lastModified: new Date(PROJECTS_LAST_MODIFIED),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    ...ALL_PROJECTS.map(
      (p): RouteEntry => ({
        path: `/projects/${p.id}`,
        lastModified: new Date(p.lastModified),
        changeFrequency: "monthly",
        priority: 0.6,
      }),
    ),
  ];

  // locale별 URL을 각각 등록하고, 모든 항목에 hreflang 대체 URL을 붙인다
  return routes.flatMap(({ path, ...rest }) =>
    locales.map((locale) => ({
      ...rest,
      url: toUrl(localizedPath(locale, path)),
      alternates: { languages: languageAlternates(path, toUrl) },
    })),
  );
}
