import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import {
  defaultLocale,
  hasLocale,
  LOCALE_COOKIE,
  type Locale,
  locales,
} from "@/lib/i18n/config";

/**
 * 리다이렉트 대상 locale 결정.
 * 1) 언어 전환 UI에서 저장한 쿠키 2) Accept-Language(q값 순) 3) 기본 locale
 */
function getLocale(request: NextRequest): Locale {
  const cookie = request.cookies.get(LOCALE_COOKIE)?.value;
  if (cookie && hasLocale(cookie)) return cookie;

  const header = request.headers.get("accept-language");
  if (!header) return defaultLocale;

  const preferred = header
    .split(",")
    .map((part) => {
      const [tag, ...params] = part.trim().split(";");
      const q = params.find((p) => p.trim().startsWith("q="));
      return {
        lang: tag.toLowerCase().split("-")[0],
        q: q ? Number(q.trim().slice(2)) : 1,
      };
    })
    .filter(({ q }) => !Number.isNaN(q) && q > 0)
    .sort((a, b) => b.q - a.q);

  return preferred.map(({ lang }) => lang).find(hasLocale) ?? defaultLocale;
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`,
  );
  if (pathnameHasLocale) return;

  request.nextUrl.pathname = `/${getLocale(request)}${pathname}`;
  return NextResponse.redirect(request.nextUrl);
}

export const config = {
  // _next 내부 경로와 확장자가 있는 정적 파일(public/*, robots.txt, sitemap.xml, favicon.ico 등)은 제외
  matcher: ["/((?!_next|.*\\..*).*)"],
};
