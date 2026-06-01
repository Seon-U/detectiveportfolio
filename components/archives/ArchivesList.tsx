"use client";

import { motion } from "framer-motion";
import { BookOpen, ChevronRight, Library, Quote } from "lucide-react";
import Link from "next/link";
import type { Archive, ArchiveCategory } from "@/lib/archives/types";
import { useMountedTheme } from "@/lib/hooks/useMountedTheme";
import { cn } from "@/lib/utils";

const MotionLink = motion.create(Link);

type Props = {
  grouped: Record<ArchiveCategory, Archive[]>;
  pinned?: Archive;
};

const CATEGORY_ORDER: ArchiveCategory[] = ["Notes", "Experiments"];

export default function ArchivesList({ grouped, pinned }: Props) {
  const { isDark } = useMountedTheme();

  return (
    <div className="space-y-16 pb-20">
      {/* Page header */}
      <div className="text-center space-y-4">
        <h1 className="text-5xl font-serif font-black uppercase tracking-tight flex items-center justify-center gap-4 text-foreground">
          <Library className="text-primary" size={40} />
          The Archives
        </h1>
        <p className="font-mono text-lg text-muted-foreground">
          Research, findings, and discarded theories.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Category sections */}
        <div className="lg:col-span-8 space-y-12">
          {CATEGORY_ORDER.map((category) => {
            const items = grouped[category];
            if (!items || items.length === 0) return null;

            return (
              <div key={category} className="space-y-6">
                <h2 className="text-2xl font-serif font-bold border-b-2 pb-2 flex items-center gap-2 text-foreground border-border/40">
                  <BookOpen className="w-5 h-5 text-primary" />
                  {category}
                </h2>

                <div className="grid gap-4">
                  {items.map((item, iIdx) => (
                    <MotionLink
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: iIdx * 0.1 }}
                      key={item.id}
                      href={`/archives/${item.id}`}
                      className={cn(
                        "group p-4 flex items-center justify-between cursor-pointer rounded transition-all",
                        "bg-card border border-border hover:border-primary hover:bg-surface-hover",
                      )}
                    >
                      <div className="flex items-center gap-4">
                        <div className="font-mono text-xs w-28 text-accent opacity-80 shrink-0">
                          {item.date}
                        </div>
                        <div className="font-serif text-lg font-medium text-muted-foreground group-hover:text-foreground transition-colors">
                          {item.title}
                        </div>
                      </div>
                      <ChevronRight className="w-5 h-5 opacity-0 group-hover:opacity-100 transition-all transform -translate-x-2 group-hover:translate-x-0 text-primary shrink-0" />
                    </MotionLink>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Sticky sidebar — pinned documents */}
        <div className="lg:col-span-4 relative">
          <div className="sticky top-24 space-y-6">
            <h3 className="font-serif text-xl font-bold uppercase text-primary">
              Pinned Documents
            </h3>

            {pinned?.pinnedQuote && (
              <motion.div
                whileHover={{ rotate: 1, scale: 1.02 }}
                className="p-6 transform -rotate-2 shadow-paper relative bg-card border border-border"
              >
                {/* Red pin dot — light mode only */}
                {!isDark && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-6 h-6 rounded-full bg-red-800 shadow-md flex items-center justify-center">
                    <div className="w-2 h-2 rounded-full bg-red-900/50" />
                  </div>
                )}

                <Quote className="w-8 h-8 mb-4 opacity-20 text-primary" />

                <p className="font-serif text-xl leading-relaxed text-foreground">
                  &ldquo;{pinned.pinnedQuote.body}&rdquo;
                </p>

                <div className="mt-6 text-sm font-bold font-mono text-right text-primary">
                  — {pinned.pinnedQuote.attribution}
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
