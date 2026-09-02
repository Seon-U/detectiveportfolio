/** 역할 식별자 — 새 역할 추가 시 여기에 리터럴을 추가 */
export type RoleId = "frontend" | "ios" | "backend" | "planner";

export type Role = {
  id: RoleId;
  label: string;
  description: string;
  /** 데스크톱 미리보기 기본 이미지 — 미지정 시 첫 프로젝트 이미지 사용 */
  defaultImage?: string;
};

/** 프로젝트 링크 — RoleShowcase 리스트 + 호버 이미지 프리뷰용 */
export type RoleProject = {
  projectId: string;
  title: string;
  image: string;
  href: string;
  /** contributions에서 가져온 역할별 한 줄 요약 */
  summary: string;
  period: string;
  teamSize: number;
};
