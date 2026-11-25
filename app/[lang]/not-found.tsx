"use client";

import Link from "next/link";
import { useEffect } from "react";
import { useDictionary, useLocale } from "@/components/i18n/DictionaryProvider";
import { track } from "@/lib/analytics/track";

export default function NotFound() {
  const { notFound } = useDictionary();
  const lang = useLocale();

  useEffect(() => {
    track("not_found", { path: location.pathname });
  }, []);

  return (
    // data-not-found: PageEngagementTracker가 이 화면을 404로 분류하는 표시
    <div
      data-not-found
      className="max-w-2xl mx-auto px-4 py-24 text-center space-y-6"
    >
      <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
        {notFound.eyebrow}
      </p>
      <h1 className="text-3xl md:text-4xl font-bold text-foreground">
        {notFound.title}
      </h1>
      <p className="text-muted-foreground">{notFound.description}</p>
      <Link
        href={`/${lang}`}
        className="inline-block px-5 py-2 border border-primary text-primary text-sm hover:bg-primary hover:text-primary-foreground transition-colors"
      >
        {notFound.back}
      </Link>
    </div>
  );
}
