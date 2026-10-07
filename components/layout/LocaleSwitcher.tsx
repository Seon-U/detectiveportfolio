"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Check, Globe } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useCallback, useEffect, useId, useRef, useState } from "react";
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

/**
 * Globe 아이콘 → 언어 목록 드롭다운.
 * 항목은 실제 링크(href·hrefLang)라 새 탭 열기 등 기본 동작을 유지하고,
 * 일반 클릭 시에만 쿼리·해시 보존 + locale 쿠키 저장 후 이동한다.
 */
export default function LocaleSwitcher({ lang }: { lang: Locale }) {
  const { common } = useDictionary();
  const router = useRouter();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const menuId = useId();

  /* 드롭다운 외부 클릭·탭 시 닫기 (pointerdown: 마우스·터치 공통) */
  useEffect(() => {
    if (!isOpen) return;
    function handleClickOutside(e: PointerEvent) {
      if (!containerRef.current?.contains(e.target as Node)) setIsOpen(false);
    }
    document.addEventListener("pointerdown", handleClickOutside);
    return () =>
      document.removeEventListener("pointerdown", handleClickOutside);
  }, [isOpen]);

  /* Tab으로 컨테이너 밖으로 포커스가 나가면 닫기 */
  const handleBlur = useCallback((e: React.FocusEvent<HTMLDivElement>) => {
    if (!e.currentTarget.contains(e.relatedTarget as Node | null)) {
      setIsOpen(false);
    }
  }, []);

  /* Escape로 닫고 트리거로 포커스 복귀 */
  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      setIsOpen(false);
      buttonRef.current?.focus();
    }
  }, []);

  /*
   * useSearchParams는 정적 페이지에서 CSR bailout을 일으키므로(§10-4) 클릭 시점에 window.location에서 읽는다.
   */
  const handleSelect = (
    e: React.MouseEvent<HTMLAnchorElement>,
    target: Locale,
    targetPath: string,
  ) => {
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return;
    e.preventDefault();
    setIsOpen(false);
    if (target === lang) {
      // 메뉴가 닫히며 포커스가 사라지지 않도록 트리거로 복귀
      buttonRef.current?.focus();
      return;
    }
    const secure = window.location.protocol === "https:" ? "; secure" : "";
    // biome-ignore lint/suspicious/noDocumentCookie: 단일 locale 쿠키 저장 — Cookie Store API는 Safari 미지원
    document.cookie = `${LOCALE_COOKIE}=${target}; path=/; max-age=31536000; samesite=lax${secure}`;
    router.push(
      `${targetPath}${window.location.search}${window.location.hash}`,
    );
  };

  return (
    // biome-ignore lint/a11y/noStaticElementInteractions: Escape·포커스 이탈 처리를 위한 컨테이너 이벤트 위임
    <div
      ref={containerRef}
      className="relative"
      onKeyDown={handleKeyDown}
      onBlur={handleBlur}
    >
      <button
        ref={buttonRef}
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-label={common.changeLanguage}
        aria-expanded={isOpen}
        aria-controls={menuId}
        className={cn(
          "flex items-center rounded-full p-2 transition-colors duration-300",
          isOpen
            ? "text-nav-text-active"
            : "text-nav-text hover:text-nav-text-hover",
        )}
      >
        <Globe className="h-5 w-5" />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.ul
            id={menuId}
            className="absolute right-0 top-full mt-2 min-w-36 overflow-hidden rounded-lg border border-border bg-background py-1 shadow-lg"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.15 }}
          >
            {locales.map((locale) => {
              const isCurrent = locale === lang;
              const targetPath = switchLocalePath(pathname, locale);
              return (
                <li key={locale}>
                  <Link
                    href={targetPath}
                    hrefLang={locale}
                    lang={locale}
                    aria-current={isCurrent ? "true" : undefined}
                    onClick={(e) => handleSelect(e, locale, targetPath)}
                    className={cn(
                      "flex items-center justify-between gap-3 px-4 py-2 text-sm transition-colors hover:bg-surface-hover",
                      isCurrent
                        ? "font-semibold text-foreground"
                        : "text-muted-foreground hover:text-foreground",
                    )}
                  >
                    {localeNames[locale]}
                    {isCurrent && <Check className="h-4 w-4" aria-hidden />}
                  </Link>
                </li>
              );
            })}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}
