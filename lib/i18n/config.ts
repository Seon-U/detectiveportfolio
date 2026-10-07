export const locales = ["ko", "en"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "ko";

export type LocalizedString = Record<Locale, string>;

export function hasLocale(lang: string): lang is Locale {
  return locales.includes(lang as Locale);
}

/** 데이터에서 현재 locale 텍스트를 꺼내는 헬퍼. 없으면 ko 폴백. */
export function t(value: LocalizedString, locale: Locale): string {
  return value[locale] ?? value[defaultLocale];
}
