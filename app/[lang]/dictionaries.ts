import "server-only";
import type { Locale } from "@/lib/i18n/config";

const dictionaries = {
  ko: () => import("@/dictionaries/ko.json").then((m) => m.default),
  en: () => import("@/dictionaries/en.json").then((m) => m.default),
} satisfies Record<Locale, () => Promise<unknown>>;

export type Dictionary = Awaited<ReturnType<(typeof dictionaries)["ko"]>>;

export const getDictionary = async (locale: Locale): Promise<Dictionary> =>
  dictionaries[locale]();
