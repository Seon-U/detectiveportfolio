"use client";

import { createContext, useContext, useMemo } from "react";
import type { Dictionary } from "@/app/[lang]/dictionaries";
import type { Locale } from "@/lib/i18n/config";

type DictionaryContextValue = { lang: Locale; dict: Dictionary };

const DictionaryContext = createContext<DictionaryContextValue | null>(null);

/** layout에서 locale과 사전을 받아 Client 컴포넌트 트리에 공급한다. */
export function DictionaryProvider({
  lang,
  dict,
  children,
}: {
  lang: Locale;
  dict: Dictionary;
  children: React.ReactNode;
}) {
  const value = useMemo(() => ({ lang, dict }), [lang, dict]);
  return (
    <DictionaryContext.Provider value={value}>
      {children}
    </DictionaryContext.Provider>
  );
}

function useDictionaryContext(): DictionaryContextValue {
  const value = useContext(DictionaryContext);
  if (!value) {
    throw new Error("useDictionary must be used within DictionaryProvider");
  }
  return value;
}

export function useDictionary(): Dictionary {
  return useDictionaryContext().dict;
}

/** 현재 locale — Client 컴포넌트에서 데이터 조회(localize) 시 사용 */
export function useLocale(): Locale {
  return useDictionaryContext().lang;
}
