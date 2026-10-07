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

/** 사전 템플릿의 `{name}` 자리표시자를 치환한다. 없는 키는 그대로 둔다. */
export function format(
  template: string,
  vars: Record<string, string | number>,
): string {
  return template.replace(/\{(\w+)\}/g, (match, key: string) =>
    key in vars ? String(vars[key]) : match,
  );
}
