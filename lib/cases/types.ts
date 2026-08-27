import type { ContentBlock, Feature, ImageRef } from "@/lib/content/types";
import type { RoleId } from "@/lib/roles/types";

/** 기존 import 호환을 위한 re-export */
export type { ImageRef };

/* ═══════════════════════════════════════════════════════════════
   CaseSection — 3종 레이아웃 variant
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

export type CaseSection = SimpleSection | FeatureSectionType | SplitSectionType;

/* ═══════════════════════════════════════════════════════════════
   Contribution / Case
   ═══════════════════════════════════════════════════════════════ */

export type Contribution = {
  roleId: RoleId;
  /** RoleShowcase 리스트에 보여줄 한 줄 요약 */
  summary: string;
  team: { total: number; myRole: string };
};

/** 프로젝트 외부 링크 (GitHub, 데모 영상 등) */
export type ProjectLink = {
  label: string;
  url: string;
};

export type Case = {
  id: string;
  title: string;
  summary: string;
  tags: string[];
  date: string;
  /** 표시용 기간 텍스트 (예: "2026.02 — 2026.04") */
  period?: string;
  image: string;
  images?: ImageRef[];
  description: string;
  /** @deprecated projectUrl 대신 links 사용 */
  projectUrl?: string;
  /** 프로젝트 외부 링크 목록 (GitHub, 데모 영상 등) */
  links?: ProjectLink[];
  /** 역할별 기여 정보 — RoleShowcase에서 contributions 기반으로 매핑 */
  contributions: Contribution[];
  sections: CaseSection[];
};
