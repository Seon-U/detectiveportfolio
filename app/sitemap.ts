import type { MetadataRoute } from "next";
import { ALL_PROJECTS } from "@/lib/projects/data";
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
      url: `${siteConfig.url}/projects`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
  ];

  const projectRoutes: MetadataRoute.Sitemap = ALL_PROJECTS.map((p) => ({
    url: `${siteConfig.url}/projects/${p.id}`,
    lastModified: new Date(p.lastModified),
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  return [...staticRoutes, ...projectRoutes];
}
