import type { Locale } from "@/lib/i18n/config";
import { localize } from "@/lib/i18n/localize";
import { ALL_PROJECTS } from "./data";
import type { Project } from "./types";

export function getAllProjects(locale: Locale): Project[] {
  return localize(ALL_PROJECTS, locale);
}

export function getProjectById(
  id: string,
  locale: Locale,
): Project | undefined {
  const source = ALL_PROJECTS.find((p) => p.id === id);
  return source && localize(source, locale);
}

/** locale과 무관한 프로젝트 id 목록 — generateStaticParams, sitemap용 */
export function getProjectIds(): string[] {
  return ALL_PROJECTS.map((p) => p.id);
}
