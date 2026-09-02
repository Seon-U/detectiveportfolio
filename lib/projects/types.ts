import type { ContentBlock, Feature } from "@/lib/content/types";
import type { RoleId } from "@/lib/roles/types";

/* ═══════════════════════════════════════════════════════════════
   ProjectSection — 3종 레이아웃 variant
   ═══════════════════════════════════════════════════════════════ */

/** 공통 필드 */
type SectionBase = {
  id: string;
  heading: string;
  /** 이 섹션이 관련된 역할 — 없으면 공통(모든 역할에 노출) */
  roles?: RoleId[];
  description?: string;
};

/** 기본 레이아웃: 제목 + 설명 + 블록 나열 */
type SimpleSection = SectionBase & {
  layout: "simple";
  blocks: ContentBlock[];
};

/** Feature 레이아웃: 왼쪽 sticky 제목 + 오른쪽 스크롤 피처 리스트 */
type FeatureSectionType = SectionBase & {
  layout: "feature";
  features: Feature[];
};

/** Split 레이아웃: 제목 + 설명 후 2열 그리드 */
type SplitSectionType = SectionBase & {
  layout: "split";
  blocks: ContentBlock[];
};

export type ProjectSection =
  | SimpleSection
  | FeatureSectionType
  | SplitSectionType;

/* ═══════════════════════════════════════════════════════════════
   Contribution / Project
   ═══════════════════════════════════════════════════════════════ */

export type Contribution = {
  roleId: RoleId;
  /** RoleShowcase 리스트에 보여줄 한 줄 요약 */
  summary: string;
};

/** 프로젝트 외부 링크 (GitHub, 데모 영상 등) */
export type ProjectLink = {
  label: string;
  url: string;
};

export type Project = {
  id: string;
  title: string;
  tags: string[];
  /** 프로젝트 기간 (예: "2026.03 — 2026.04") 또는 단일 시점 (예: "2026.02") */
  period: string;
  /** 페이지 수정일 — sitemap·SEO 전용 (ISO 8601) */
  lastModified: string;
  image: string;
  description: string;
  /** 프로젝트 외부 링크 목록 (GitHub, 데모 영상 등) */
  links?: ProjectLink[];
  /** 팀 규모 */
  teamSize: number;
  /** 역할별 기여 정보 — RoleShowcase에서 contributions 기반으로 매핑 */
  contributions: Contribution[];
  sections: ProjectSection[];
};
