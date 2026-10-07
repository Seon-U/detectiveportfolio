import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import {
  defaultLocale,
  hasLocale,
  type Locale,
  locales,
} from "@/lib/i18n/config";

/** Accept-Language를 q값 순으로 파싱해 지원 locale 중 가장 선호되는 것을 고른다. */
function getLocale(request: NextRequest): Locale {
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
