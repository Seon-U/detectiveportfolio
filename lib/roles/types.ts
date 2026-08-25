export type Role = {
  id: string;
  label: string;
  description: string;
  /** 이 직무와 매칭되는 Case.tags 키워드 목록 (자동 매핑용) */
  matchTags: string[];
  /** 데스크톱 미리보기 기본 이미지 — 미지정 시 첫 프로젝트 이미지 사용 */
  defaultImage?: string;
};

/** 프로젝트 링크 — 호버 시 이미지 미리보기에 사용 */
export type RoleProject = {
  caseId: string;
  title: string;
  image: string;
  href: string;
};
