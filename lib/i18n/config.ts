export const locales = ["ko", "en"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "ko";

/**
 * 데이터 레이어의 다국어 문자열.
 * 번역 전환기 동안 en은 선택값(없으면 ko 폴백). ⑧ 번역 완료 시 Record<Locale, string>으로 강화해
 * 누락된 번역을 컴파일 에러로 찾는다.
 */
export type LocalizedString = { ko: string; en?: string };

export function hasLocale(lang: string): lang is Locale {
  return locales.includes(lang as Locale);
}

/** 데이터에서 현재 locale 텍스트를 꺼내는 헬퍼. 없으면 ko 폴백. */
export function t(value: LocalizedString, locale: Locale): string {
  return value[locale] ?? value.ko;
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
