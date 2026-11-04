import { type Locale, type LocalizedString, locales, t } from "./config";

/** 소스 타입의 LocalizedString 필드를 string으로 바꾼 렌더링용 타입 (중첩·유니온·배열 포함) */
export type Localized<T> = T extends LocalizedString
  ? string
  : T extends readonly (infer U)[]
    ? Localized<U>[]
    : T extends object
      ? { [K in keyof T]: Localized<T[K]> }
      : T;

function isLocalizedString(value: unknown): value is LocalizedString {
  if (typeof value !== "object" || value === null || Array.isArray(value)) {
    return false;
  }
  const keys = Object.keys(value);
  return (
    typeof (value as { ko?: unknown }).ko === "string" &&
    keys.every((k) => (locales as readonly string[]).includes(k))
  );
}

/** 데이터 트리를 순회하며 LocalizedString을 현재 locale 문자열로 해석한다. */
export function localize<T>(value: T, locale: Locale): Localized<T> {
  if (isLocalizedString(value)) return t(value, locale) as Localized<T>;
  if (Array.isArray(value)) {
    return value.map((v) => localize(v, locale)) as Localized<T>;
  }
  if (typeof value === "object" && value !== null) {
    return Object.fromEntries(
      Object.entries(value).map(([k, v]) => [k, localize(v, locale)]),
    ) as Localized<T>;
  }
  return value as Localized<T>;
}
