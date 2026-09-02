import type { MetadataRoute } from "next";
import { getAllArchives } from "@/lib/archives/queries";
import { getAllProjects } from "@/lib/projects/queries";
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
    {
      url: `${siteConfig.url}/archives`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
  ];

  const projectRoutes: MetadataRoute.Sitemap = getAllProjects().map((p) => ({
    url: `${siteConfig.url}/projects/${p.id}`,
    lastModified: new Date(p.lastModified),
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  const archiveRoutes: MetadataRoute.Sitemap = getAllArchives().map((a) => ({
    url: `${siteConfig.url}/archives/${a.id}`,
    lastModified: new Date(a.date),
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  return [...staticRoutes, ...projectRoutes, ...archiveRoutes];
}
