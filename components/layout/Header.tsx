"use client";

import { Moon, Sun } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { useDictionary } from "@/components/i18n/DictionaryProvider";
import {
  LOCALE_COOKIE,
  type Locale,
  localeNames,
  locales,
} from "@/lib/i18n/config";
import { cn } from "@/lib/utils";

/** 현재 경로의 첫 세그먼트(locale)만 교체 — "/ko/projects/001" → "/en/projects/001" */
function switchLocalePath(pathname: string, target: Locale): string {
  const segments = pathname.split("/");
  segments[1] = target;
  return segments.join("/");
}

type HeaderProps = {
  className: string;
  lang: Locale;
};

export default function Header({ className, lang }: HeaderProps) {
  const { common } = useDictionary();
  const { theme, setTheme } = useTheme();

  const [mounted, setMounted] = useState(false);

  const router = useRouter();
  const pathname = usePathname();
  const isHome = pathname === `/${lang}`;
  const isProjects = pathname === `/${lang}/projects`;

  const targetLocale = locales.find((l) => l !== lang) ?? lang;
  const targetPath = switchLocalePath(pathname, targetLocale);

  useEffect(() => {
    setMounted(true);
  }, []);

  /*
   * 쿼리(?role= 등)·해시를 보존해 이동하고, 선택한 locale을 쿠키로 저장한다.
   * useSearchParams는 정적 페이지에서 CSR bailout을 일으키므로(§10-4) 클릭 시점에 window.location에서 읽는다.
   */
  const handleLocaleSwitch = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return;
    e.preventDefault();
    const secure = window.location.protocol === "https:" ? "; secure" : "";
    // biome-ignore lint/suspicious/noDocumentCookie: 단일 locale 쿠키 저장 — Cookie Store API는 Safari 미지원
    document.cookie = `${LOCALE_COOKIE}=${targetLocale}; path=/; max-age=31536000; samesite=lax${secure}`;
    router.push(
      `${targetPath}${window.location.search}${window.location.hash}`,
    );
  };

  return (
    <header className={cn(className)}>
      <nav
        className={cn(
          "sticky top-0 z-40 backdrop-blur-md transition-all duration-500",
          "bg-background/70 dark:bg-background/60",
          "text-nav-text hover:text-nav-text-hover",
        )}
      >
        <div className="mx-auto h-16 px-4 sm:px-6 lg:px-8">
          <div className="flex h-full items-center justify-between">
            {/* LOGO → Home */}
            <Link
              href={`/${lang}`}
              className={cn(
                "flex items-center space-x-2",
                isHome && "pointer-events-none cursor-default",
              )}
            >
              <span className="font-serif text-xl font-bold tracking-wider text-header-title">
                SWK.DEV
              </span>
            </Link>

            {/* RIGHT SIDE */}
            <div className="flex items-center gap-5">
              {/* Projects 텍스트 링크 */}
              <Link
                href={`/${lang}/projects`}
                className={cn(
                  "text-sm font-semibold font-serif tracking-widest transition-colors duration-300",
                  isProjects
                    ? "text-nav-text-active"
                    : "text-nav-text hover:text-nav-text-hover",
                )}
              >
                {common.projects}
              </Link>

              {/* LANGUAGE SWITCH — 대상 언어를 그 언어로 표기, 크롤러용 hreflang 링크 겸용 */}
              <Link
                href={targetPath}
                hrefLang={targetLocale}
                lang={targetLocale}
                onClick={handleLocaleSwitch}
                // 접근 가능한 이름에 보이는 텍스트("EN")를 포함 — WCAG 2.5.3 Label in Name
                aria-label={`${localeNames[targetLocale]} (${targetLocale.toUpperCase()})`}
                className="text-sm font-semibold font-serif tracking-widest uppercase transition-colors duration-300 text-nav-text hover:text-nav-text-hover"
              >
                {targetLocale}
              </Link>

              {/* THEME TOGGLE */}
              {mounted && (
                <button
                  type="button"
                  onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                  className={cn(
                    "rounded-full p-2 transition-all duration-300",
                    "hover:scale-110 focus:outline-none",
                    "bg-theme-toggle-background text-theme-toggle-foreground",
                    "hover:bg-theme-toggle-hover-background",
                    "hover:shadow-theme-toggle",
                  )}
                  aria-label={common.toggleTheme}
                >
                  {mounted && theme === "dark" ? (
                    <Sun className="h-5 w-5" />
                  ) : (
                    <Moon className="h-5 w-5" />
                  )}
                </button>
              )}
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}
