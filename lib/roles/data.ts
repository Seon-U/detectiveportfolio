import { ALLCASES } from "@/lib/cases/data";
import type { Role, RoleProject } from "./types";

export const ROLES: Role[] = [
  {
    id: "frontend",
    label: "프론트엔드 개발자",
    description:
      "Next.js 기반으로 SEO 최적화와 BFF 패턴을 활용한 효율적인 반응형 디자인이 가능합니다.",
    matchTags: [
      "Next.js",
      "React",
      "Tailwind",
      "Storybook",
      "Design System",
      "Framer Motion",
      "Chart.js",
    ],
  },
  {
    id: "ios",
    label: "iOS 개발자",
    description:
      "SwiftUI 기반 기기 사이즈에 대응하는 화면 구현과 AppStore 배포 설정이 가능합니다.",
    matchTags: [
      "SwiftUI",
      "Swift",
      "iOS",
      "AVFAudio",
      "App Store",
      "SwiftData",
      "JSON Storage",
    ],
  },
  {
    id: "backend",
    label: "백엔드 개발자",
    description:
      "Spring Boot와 JAVA 기반의 데이터 구조 설계와 데이터 무결성, 스레드를 고려한 아키텍처 설계를 합니다.",
    matchTags: [
      "Spring Security",
      "Spring Boot",
      "MySQL",
      "MariaDB",
      "PrismaORM",
      "AWS",
      "Docker",
      "Nginx",
      "Reverse Proxy",
      "JWT",
      "FullText Search",
    ],
  },
  {
    id: "planner",
    label: "기획자",
    description:
      "사용자 인터뷰를 토대로 한 PainPoint 발굴과 비즈니스 엣지 포인트 기획을 합니다.",
    matchTags: ["UX", "기획", "사용자 인터뷰", "Wireframe"],
  },
];

/**
 * 태그 기반 자동 매핑으로 역할에 해당하는 프로젝트 목록을 반환합니다.
 * 추후 수동 매핑으로 교체할 수 있도록 이 함수만 변경하면 됩니다.
 */
export function getProjectsByRole(roleId: string): RoleProject[] {
  const role = ROLES.find((r) => r.id === roleId);
  if (!role) return [];

  const tagSet = new Set(role.matchTags.map((t) => t.toLowerCase()));

  return ALLCASES.filter((c) =>
    c.tags.some((tag) => tagSet.has(tag.toLowerCase())),
  ).map((c) => ({
    caseId: c.id,
    title: c.title,
    image: c.image,
    href: `/cases/${c.id}`,
  }));
}
