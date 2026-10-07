"use client";

import { Moon, Sun } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { useDictionary } from "@/components/i18n/DictionaryProvider";
import type { Locale } from "@/lib/i18n/config";
import { cn } from "@/lib/utils";
import LocaleSwitcher from "./LocaleSwitcher";

type HeaderProps = {
  className: string;
  lang: Locale;
};

export default function Header({ className, lang }: HeaderProps) {
  const { common } = useDictionary();
  const { theme, setTheme } = useTheme();

  const [mounted, setMounted] = useState(false);

  const pathname = usePathname();
  const isHome = pathname === `/${lang}`;
  const isProjects = pathname === `/${lang}/projects`;

  useEffect(() => {
    setMounted(true);
  }, []);

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

              {/* LANGUAGE SWITCH — Globe 드롭다운 */}
              <LocaleSwitcher lang={lang} />

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
