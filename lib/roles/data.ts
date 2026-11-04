import type { Locale } from "@/lib/i18n/config";
import { localize } from "@/lib/i18n/localize";
import { ALL_POSTS } from "@/lib/posts/data";
import type { BlogPost } from "@/lib/posts/types";
import type { Role, RoleId, RoleSource } from "./types";

const ROLES: RoleSource[] = [
  {
    id: "frontend",
    label: { ko: "프론트엔드 개발자", en: "Frontend Developer" },
    description: {
      ko: "Next.js 기반으로 SEO 최적화와 BFF 패턴을 활용한 효율적인 반응형 디자인이 가능합니다.",
      en: "Builds efficient responsive designs on Next.js, with SEO optimization and the BFF pattern.",
    },
  },
  {
    id: "backend",
    label: { ko: "백엔드 개발자", en: "Backend Developer" },
    description: {
      ko: "Spring Boot와 JAVA 기반의 데이터 구조 설계와 데이터 무결성, 스레드를 고려한 아키텍처 설계를 합니다.",
      en: "Designs data structures with Spring Boot and Java, and architectures that account for data integrity and threading.",
    },
  },
  {
    id: "ios",
    label: { ko: "iOS 개발자", en: "iOS Developer" },
    description: {
      ko: "SwiftUI 기반 기기 사이즈에 대응하는 화면 구현과 AppStore 배포 설정이 가능합니다.",
      en: "Builds SwiftUI screens that adapt to different device sizes and handles App Store release setup.",
    },
  },
  {
    id: "planner",
    label: { ko: "기획자", en: "Product Planner" },
    description: {
      ko: "사용자 인터뷰를 토대로 한 PainPoint 발굴과 비즈니스 엣지 포인트 기획을 합니다.",
      en: "Identifies pain points from user interviews and defines the product's competitive edge.",
    },
  },
];

export function getRoles(locale: Locale): Role[] {
  return localize(ROLES, locale);
}

/** URL 등 외부 입력 문자열이 정의된 역할 id인지 검사 */
export function isRoleId(value: string): value is RoleId {
  return ROLES.some((r) => r.id === value);
}

/**
 * 역할 기반 매핑으로 해당 역할의 블로그 포스트를 반환합니다.
 */
export function getPostsByRole(roleId: RoleId): BlogPost[] {
  return ALL_POSTS.filter((post) => post.roles.includes(roleId));
}
