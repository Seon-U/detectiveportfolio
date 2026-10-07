"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useDictionary } from "@/components/i18n/DictionaryProvider";
import { hasLocale } from "@/lib/i18n/config";

export default function ProjectNotFound() {
  const { notFound } = useDictionary();
  const params = useParams<{ lang?: string }>();
  const lang = params.lang && hasLocale(params.lang) ? params.lang : "ko";

  return (
    <div className="max-w-2xl mx-auto py-24 text-center space-y-6">
      <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
        {notFound.project.eyebrow}
      </p>
      <h1 className="font-serif text-4xl font-black uppercase">
        {notFound.project.title}
      </h1>
      <p className="text-muted-foreground">{notFound.project.description}</p>
      <Link
        href={`/${lang}/projects`}
        className="inline-block px-5 py-2 border border-primary text-primary font-mono text-sm uppercase tracking-wider hover:bg-primary hover:text-primary-foreground transition-colors"
      >
        {notFound.project.back}
      </Link>
    </div>
  );
}
