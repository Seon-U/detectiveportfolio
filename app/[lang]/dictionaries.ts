import "server-only";
import type ko from "@/dictionaries/ko.json";
import type { Locale } from "@/lib/i18n/config";

// ko.json이 키 구조의 기준. en.json이 다른 구조면 아래 import에서 타입 오류가 난다.
export type Dictionary = typeof ko;

const dictionaries: Record<Locale, () => Promise<Dictionary>> = {
  ko: () => import("@/dictionaries/ko.json").then((m) => m.default),
  en: () => import("@/dictionaries/en.json").then((m) => m.default),
};

export const getDictionary = async (locale: Locale): Promise<Dictionary> =>
  dictionaries[locale]();
