import { ALLCASES } from "@/lib/cases/data";
import { ALL_POSTS } from "@/lib/posts/data";
import type { BlogPost } from "@/lib/posts/types";
import type { Role, RoleId, RoleProject } from "./types";

export const ROLES: Role[] = [
  {
    id: "frontend",
    label: "프론트엔드 개발자",
    description:
      "Next.js 기반으로 SEO 최적화와 BFF 패턴을 활용한 효율적인 반응형 디자인이 가능합니다.",
  },
  {
    id: "backend",
    label: "백엔드 개발자",
    description:
      "Spring Boot와 JAVA 기반의 데이터 구조 설계와 데이터 무결성, 스레드를 고려한 아키텍처 설계를 합니다.",
  },
  {
    id: "ios",
    label: "iOS 개발자",
    description:
      "SwiftUI 기반 기기 사이즈에 대응하는 화면 구현과 AppStore 배포 설정이 가능합니다.",
  },
  {
    id: "planner",
    label: "기획자",
    description:
      "사용자 인터뷰를 토대로 한 PainPoint 발굴과 비즈니스 엣지 포인트 기획을 합니다.",
  },
];

/**
 * contributions 기반 명시적 매핑으로 역할에 해당하는 프로젝트 목록을 반환합니다.
 */
export function getProjectsByRole(roleId: RoleId): RoleProject[] {
  return ALLCASES.filter((c) =>
    c.contributions.some((ct) => ct.roleId === roleId),
  ).map((c) => {
    const ct = c.contributions.find((ct) => ct.roleId === roleId)!;
    return {
      caseId: c.id,
      title: c.title,
      image: c.image,
      href: `/cases/${c.id}?role=${roleId}`,
      summary: ct.summary,
      date: c.date,
      team: ct.team,
    };
  });
}

/**
 * 역할 기반 매핑으로 해당 역할의 블로그 포스트를 반환합니다.
 */
export function getPostsByRole(roleId: RoleId): BlogPost[] {
  return ALL_POSTS.filter((post) => post.roles.includes(roleId));
}
