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
    frontDesc: "유저 인터뷰로 사용자 패턴 파악",
  },
  {
    backLabel: "Solve",
    frontImage: "/UserSolve.webp",
    frontTitle: "Solve",
    frontDesc: "사용자 여정 기반 Pain Point 발굴",
  },
  {
    backLabel: "Refine",
    frontImage: "/UserRefine.webp",
    frontTitle: "Refine",
    frontDesc: "사용자에게 맞는 기술 선정",
  },
];

export const DEV_CARDS: CardData[] = [
  {
    backLabel: "Trace",
    frontImage: "/FieldTrace.webp",
    frontTitle: "Trace",
    frontDesc: "금융 도메인의 복잡한 조건 파악",
  },
  {
    backLabel: "Solve",
    frontImage: "/FieldSolve.webp",
    frontTitle: "Solve",
    frontDesc: "접근성, 데이터 무결성 고려 설계",
  },
  {
    backLabel: "Refine",
    frontImage: "/FieldRefine.webp",
    frontTitle: "Refine",
    frontDesc: "테스트 기반 안정성 확보",
  },
];
