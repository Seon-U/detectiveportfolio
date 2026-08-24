/* ── Card type & data ─────────────────────────────────────────── */

export type CardData = {
  backLabel: string;
  frontImage: string;
  frontTitle: string;
  frontDesc: string;
};

export const DESIGN_CARDS: CardData[] = [
  {
    backLabel: "Trace",
    frontImage: "/UserTrace.webp",
    frontTitle: "Trace",
    frontDesc: "유저 인터뷰를 통해 사용자의 행동 패턴을 파악",
  },
  {
    backLabel: "Solve",
    frontImage: "/UserSolve.svg",
    frontTitle: "Solve",
    frontDesc: "User Journey 기반 Pain Point 발굴",
  },
  {
    backLabel: "Refine",
    frontImage: "/UserRefine.svg",
    frontTitle: "Refine",
    frontDesc: "사용자에게 맞는 기술 선정",
  },
];

export const DEV_CARDS: CardData[] = [
  {
    backLabel: "Trace",
    frontImage: "/FieldTrace.svg",
    frontTitle: "Trace",
    frontDesc: "금융 도메인의 복잡한 조건 파악",
  },
  {
    backLabel: "Solve",
    frontImage: "/FieldSolve.svg",
    frontTitle: "Solve",
    frontDesc: "접근성을 고려한 플로우 설정, 데이터 무결성 고려 설계",
  },
  {
    backLabel: "Refine",
    frontImage: "/FieldRefine.svg",
    frontTitle: "Refine",
    frontDesc: "테스트 기반 안정성 확보",
  },
];
