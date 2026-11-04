import type { ContentBlockSource, FeatureSource } from "@/lib/content/types";
import type { LocalizedString } from "@/lib/i18n/config";
import type { Localized } from "@/lib/i18n/localize";
import type { RoleId } from "@/lib/roles/types";

/* ═══════════════════════════════════════════════════════════════
   ProjectSection — 3종 레이아웃 variant
   ═══════════════════════════════════════════════════════════════ */

/** 공통 필드 */
type SectionBase = {
  id: string;
  heading: LocalizedString;
  /** 이 섹션이 관련된 역할 — 없으면 공통(모든 역할에 노출) */
  roles?: RoleId[];
  description?: LocalizedString;
};

/** 기본 레이아웃: 제목 + 설명 + 블록 나열 */
type SimpleSection = SectionBase & {
  layout: "simple";
  blocks: ContentBlockSource[];
};

/** Feature 레이아웃: 왼쪽 sticky 제목 + 오른쪽 스크롤 피처 리스트 */
type FeatureSectionType = SectionBase & {
  layout: "feature";
  features: FeatureSource[];
};

/** Split 레이아웃: 제목 + 설명 후 2열 그리드 */
type SplitSectionType = SectionBase & {
  layout: "split";
  blocks: ContentBlockSource[];
};

export type ProjectSectionSource =
  | SimpleSection
  | FeatureSectionType
  | SplitSectionType;

/* ═══════════════════════════════════════════════════════════════
   Contribution / Project
   ═══════════════════════════════════════════════════════════════ */

export type ContributionSource = {
  roleId: RoleId;
  /** RoleShowcase 리스트에 보여줄 한 줄 요약 */
  summary: LocalizedString;
};

/** 프로젝트 외부 링크 (GitHub, 데모 영상 등) */
export type ProjectLinkSource = {
  label: LocalizedString;
  url: string;
};

export type ProjectSource = {
  id: string;
  title: LocalizedString;
  tags: string[];
  /** 프로젝트 기간 (예: "2026.03 — 2026.04") 또는 단일 시점 (예: "2026.02") */
  period: string;
  /** 페이지 수정일 — sitemap·SEO 전용 (ISO 8601) */
  lastModified: string;
  image: string;
  description: LocalizedString;
  /** 프로젝트 외부 링크 목록 (GitHub, 데모 영상 등) */
  links?: ProjectLinkSource[];
  /** 팀 규모 */
  teamSize: number;
  /** 역할별 기여 정보 — RoleShowcase에서 contributions 기반으로 매핑 */
  contributions: ContributionSource[];
  sections: ProjectSectionSource[];
};

/* ═══════════════════════════════════════════════════════════════
   렌더링용 타입 — Source에서 LocalizedString을 string으로 해석한 형태
   ═══════════════════════════════════════════════════════════════ */

export type ProjectSection = Localized<ProjectSectionSource>;
export type Contribution = Localized<ContributionSource>;
export type ProjectLink = Localized<ProjectLinkSource>;
export type Project = Localized<ProjectSource>;

/** 상세 페이지 "다른 프로젝트" 캐러셀용 경량 타입 — Client로 직렬화되는 필드만 */
export type RelatedProject = Pick<Project, "id" | "title" | "image"> & {
  roleIds: RoleId[];
};
