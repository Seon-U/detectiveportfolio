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

export default function sitemap(): MetadataRoute.Sitemap {
  const routes: RouteEntry[] = [
    {
      path: "/",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      path: "/projects",
      lastModified: new Date(),
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
