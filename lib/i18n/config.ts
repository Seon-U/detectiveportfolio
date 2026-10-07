export const locales = ["ko", "en"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "ko";

/** 언어 전환 UI 표기 — 각 언어를 해당 언어 자체로 표기(사전 불필요) */
export const localeNames: Record<Locale, string> = {
  ko: "한국어",
  en: "English",
};

/** 사용자가 명시적으로 고른 locale — proxy가 Accept-Language보다 우선 적용 */
export const LOCALE_COOKIE = "NEXT_LOCALE";

/**
 * 데이터 레이어의 다국어 문자열. 모든 locale 필수 — 번역 누락은 컴파일 에러로 드러난다.
 * (번역 전환기에는 en을 선택값으로 두었다가 ⑧ 번역 완료 시 강화)
 */
export type LocalizedString = Record<Locale, string>;

export function hasLocale(lang: string): lang is Locale {
  return locales.includes(lang as Locale);
}

/** 데이터에서 현재 locale 텍스트를 꺼내는 헬퍼. 비어 있으면 기본 locale로 폴백. */
export function t(value: LocalizedString, locale: Locale): string {
  return value[locale] || value[defaultLocale];
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
