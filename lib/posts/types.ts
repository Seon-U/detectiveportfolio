import type { RoleId } from "@/lib/roles/types";

/** https:// 로 시작하는 외부 URL */
type ExternalUrl = `https://${string}`;

/** 외부 블로그(Tistory 등) 포스트 참조 */
export type BlogPost = {
  id: string;
  title: string;
  /** 외부 블로그 링크 — https:// 필수 */
  url: ExternalUrl;
  /** OG 이미지 — hover 프리뷰용 (없으면 프리뷰 생략) */
  ogImage?: string;
  /** 표시용 기술 태그 */
  tags: string[];
  /** 이 포스트가 속하는 역할 */
  roles: RoleId[];
};
