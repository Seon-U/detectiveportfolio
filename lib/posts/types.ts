/** 외부 블로그(Tistory) 포스트 참조 */
export type BlogPost = {
  id: string;
  title: string;
  /** Tistory 외부 링크 */
  url: string;
  /** OG 이미지 — hover 프리뷰용 */
  ogImage?: string;
  date: string;
  /** 역할 매칭용 태그 */
  tags: string[];
  summary: string;
};
