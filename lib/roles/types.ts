export type Role = {
  id: string;
  label: string;
  description: string;
  /** 블로그 포스트 매칭용 태그 목록 */
  matchTags: string[];
  /** 데스크톱 미리보기 기본 이미지 — 미지정 시 첫 프로젝트 이미지 사용 */
  defaultImage?: string;
};

/** 프로젝트 링크 — RoleShowcase 리스트 + 호버 이미지 프리뷰용 */
export type RoleProject = {
  caseId: string;
  title: string;
  image: string;
  href: string;
  /** contributions에서 가져온 역할별 한 줄 요약 */
  summary: string;
  date: string;
  team: { total: number; myRole: string };
};
