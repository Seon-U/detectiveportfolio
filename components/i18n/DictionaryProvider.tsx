"use client";

import { createContext, useContext } from "react";
import type { Dictionary } from "@/app/[lang]/dictionaries";

const DictionaryContext = createContext<Dictionary | null>(null);

/** layout에서 locale 사전을 받아 Client 컴포넌트 트리에 공급한다. */
export function DictionaryProvider({
  dict,
  children,
}: {
  dict: Dictionary;
  children: React.ReactNode;
}) {
  return (
    <DictionaryContext.Provider value={dict}>
      {children}
    </DictionaryContext.Provider>
  );
}

export function useDictionary(): Dictionary {
  const dict = useContext(DictionaryContext);
  if (!dict) {
    throw new Error("useDictionary must be used within DictionaryProvider");
  }
  return dict;
}
