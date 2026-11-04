import type { Locale, LocalizedString } from "@/lib/i18n/config";
import { type Localized, localize } from "@/lib/i18n/localize";

/* ── Card type & data ─────────────────────────────────────────── */
export type CardDataSource = {
  backLabel: string;
  frontImage: string;
  frontTitle: string;
  frontDesc: LocalizedString;
};

export type CardData = Localized<CardDataSource>;

const DESIGN_CARDS: CardDataSource[] = [
  {
    backLabel: "Trace",
    frontImage: "/UserTrace.webp",
    frontTitle: "Trace",
    frontDesc: {
      ko: "유저 인터뷰로 사용자 패턴 파악",
      en: "Identify user patterns through interviews",
    },
  },
  {
    backLabel: "Solve",
    frontImage: "/UserSolve.webp",
    frontTitle: "Solve",
    frontDesc: {
      ko: "사용자 여정 기반 Pain Point 발굴",
      en: "Find pain points in the user journey",
    },
  },
  {
    backLabel: "Refine",
    frontImage: "/UserRefine.webp",
    frontTitle: "Refine",
    frontDesc: {
      ko: "사용자에게 맞는 기술 선정",
      en: "Pick tech that fits users",
    },
  },
];

const DEV_CARDS: CardDataSource[] = [
  {
    backLabel: "Trace",
    frontImage: "/FieldTrace.webp",
    frontTitle: "Trace",
    frontDesc: {
      ko: "금융 도메인의 복잡한 조건 파악",
      en: "Learn the financial domain's complex rules",
    },
  },
  {
    backLabel: "Solve",
    frontImage: "/FieldSolve.webp",
    frontTitle: "Solve",
    frontDesc: {
      ko: "접근성, 데이터 무결성 고려 설계",
      en: "Design for accessibility and data integrity",
    },
  },
  {
    backLabel: "Refine",
    frontImage: "/FieldRefine.webp",
    frontTitle: "Refine",
    frontDesc: {
      ko: "테스트 기반 안정성 확보",
      en: "Ensure stability through testing",
    },
  },
];

export function getDesignCards(locale: Locale): CardData[] {
  return localize(DESIGN_CARDS, locale);
}

export function getDevCards(locale: Locale): CardData[] {
  return localize(DEV_CARDS, locale);
}
