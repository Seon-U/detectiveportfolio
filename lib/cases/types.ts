import type { ContentSection, ImageRef } from "@/lib/content/types";

/** 기존 import 호환을 위한 re-export */
export type { ImageRef };

export type CaseSection = ContentSection & {
  /** 이 섹션이 관련된 역할 — 없으면 공통(모든 역할에 노출) */
  roles?: string[];
};

export type Contribution = {
  roleId: string;
  /** RoleShowcase 리스트에 보여줄 한 줄 요약 */
  summary: string;
  team: { total: number; myRole: string };
};

export type Case = {
  id: string;
  title: string;
  summary: string;
  tags: string[];
  status: "ONGOING" | "SOLVED" | "PENDING";
  date: string;
  image: string;
  images?: ImageRef[];
  description: string;
  projectUrl?: string;
  /** 역할별 기여 정보 — RoleShowcase에서 contributions 기반으로 매핑 */
  contributions: Contribution[];
  sections: CaseSection[];
};
