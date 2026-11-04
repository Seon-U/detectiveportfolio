import { type Locale, t } from "@/lib/i18n/config";
import { localize } from "@/lib/i18n/localize";
import type { RoleId, RoleProject } from "@/lib/roles/types";
import { ALL_PROJECTS } from "./data";
import type { Project, RelatedProject } from "./types";

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

/**
 * 현재 프로젝트를 제외한 다른 프로젝트의 경량 목록.
 * 역할 필터링은 Client에서 roleIds로 수행한다(?role= 은 빌드 시점에 알 수 없음).
 */
export function getRelatedProjects(
  currentId: string,
  locale: Locale,
): RelatedProject[] {
  return ALL_PROJECTS.filter((p) => p.id !== currentId).map((p) => ({
    id: p.id,
    title: t(p.title, locale),
    image: p.image,
    roleIds: p.contributions.map((ct) => ct.roleId),
  }));
}

/**
 * contributions 기반 명시적 매핑으로 역할에 해당하는 프로젝트 목록을 반환합니다.
 * Server에서 호출해 props로 전달 — Client 번들에 전체 프로젝트 데이터가 실리지 않도록.
 */
export function getProjectsByRole(
  roleId: RoleId,
  locale: Locale,
): RoleProject[] {
  // 필요한 필드만 해석 — 섹션·블록 트리 전체를 순회하지 않도록
  return ALL_PROJECTS.flatMap((p) => {
    const ct = p.contributions.find((ct) => ct.roleId === roleId);
    if (!ct) return [];
    return {
      projectId: p.id,
      title: t(p.title, locale),
      image: p.image,
      href: `/projects/${p.id}?role=${roleId}`,
      summary: t(ct.summary, locale),
      period: p.period,
      teamSize: p.teamSize,
    };
  });
}

/** locale과 무관한 프로젝트 id 목록 — generateStaticParams, sitemap용 */
export function getProjectIds(): string[] {
  return ALL_PROJECTS.map((p) => p.id);
}
