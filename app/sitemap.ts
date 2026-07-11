import type { MetadataRoute } from "next";
import { getAllArchives } from "@/lib/archives/queries";
import { getAllCases } from "@/lib/cases/queries";
import { siteConfig } from "@/lib/seo/config";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: siteConfig.url,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${siteConfig.url}/cases`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${siteConfig.url}/archives`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
  ];

  const caseRoutes: MetadataRoute.Sitemap = getAllCases().map((c) => ({
    url: `${siteConfig.url}/cases/${c.id}`,
    lastModified: new Date(c.date),
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  const archiveRoutes: MetadataRoute.Sitemap = getAllArchives().map((a) => ({
    url: `${siteConfig.url}/archives/${a.id}`,
    lastModified: new Date(a.date),
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  return [...staticRoutes, ...caseRoutes, ...archiveRoutes];
}
