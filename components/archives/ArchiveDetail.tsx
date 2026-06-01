"use client";

import { motion } from "framer-motion";
import { ArrowLeft, Bookmark, Calendar, FileText } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import type { Archive } from "@/lib/archives/types";
import { cn } from "@/lib/utils";

function slugify(text: string) {
  return text.toLowerCase().replace(/\s+/g, "-");
}

export default function ArchiveDetail({ archive }: { archive: Archive }) {
  const router = useRouter();
  const [activeSection, setActiveSection] = useState<string>("");
  const sectionRefs = useRef<Record<string, HTMLElement | null>>({});

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        }
      },
      { rootMargin: "-20% 0px -60% 0px" },
    );

    for (const id of Object.keys(sectionRefs.current)) {
      const el = sectionRefs.current[id];
      if (el) observer.observe(el);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-6xl mx-auto"
    >
      {/* Back button */}
      <button
        type="button"
        onClick={() => router.back()}
        className="flex items-center gap-2 mb-10 font-mono text-sm text-muted-foreground hover:text-primary transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        Back
      </button>

      {/* Hero header */}
      <header className="mb-12 pb-10 border-b border-border">
        <div className="flex items-center gap-3 mb-5 font-mono text-xs uppercase tracking-widest text-muted-foreground">
          <Bookmark className="w-3.5 h-3.5" />
          <span>Archive Entry</span>
          <span>·</span>
          <Calendar className="w-3.5 h-3.5" />
          <span>{archive.date}</span>
          <span>·</span>
          <span className="px-2 py-0.5 border border-primary text-primary font-bold">
            {archive.category}
          </span>
        </div>

        <h1 className="text-4xl md:text-6xl font-serif font-black uppercase text-foreground mb-6 leading-tight">
          {archive.title}
        </h1>

        <p className="text-lg font-mono text-muted-foreground max-w-2xl leading-relaxed">
          {archive.description}
        </p>
      </header>

      {/* Hero image */}
      {archive.image && (
        <div
          className="mb-14 relative overflow-hidden rounded-sm bg-card border border-border mx-auto max-h-[60vh]"
          style={{
            aspectRatio: `${archive.image.width} / ${archive.image.height}`,
          }}
        >
          <Image
            src={archive.image.src}
            alt={archive.title}
            fill
            sizes="(min-width: 1024px) 1024px, 100vw"
            className="object-contain grayscale-[30%]"
          />
          <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent" />
        </div>
      )}

      {/* Two-column layout */}
      <div className="flex gap-12 items-start">
        {/* TOC — sticky sidebar */}
        <aside className="hidden lg:block w-52 shrink-0 sticky top-24 self-start">
          <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground mb-4">
            Contents
          </p>
          <nav className="space-y-1 border-l border-border pl-4">
            {archive.sections.map((section) => {
              const id = slugify(section.heading);
              return (
                <button
                  key={id}
                  type="button"
                  onClick={() =>
                    document
                      .getElementById(id)
                      ?.scrollIntoView({ behavior: "smooth" })
                  }
                  className={cn(
                    "block w-full text-left font-mono text-xs py-1.5 transition-colors",
                    activeSection === id
                      ? "text-primary font-bold"
                      : "text-muted-foreground hover:text-foreground",
                  )}
                >
                  {section.heading}
                </button>
              );
            })}
          </nav>
        </aside>

        {/* Article content */}
        <article className="flex-1 min-w-0 space-y-16 pb-24">
          {archive.sections.map((section) => {
            const id = slugify(section.heading);
            return (
              <section
                key={id}
                id={id}
                ref={(el) => {
                  sectionRefs.current[id] = el;
                }}
              >
                <h2 className="text-2xl font-serif font-bold text-foreground mb-6 pb-2 border-b border-border/50">
                  {section.heading}
                </h2>

                <p className="font-serif text-lg leading-relaxed text-foreground/85">
                  {section.body}
                </p>

                {section.image && (
                  <figure className="mt-10">
                    <div
                      className="relative overflow-hidden rounded-sm bg-card border border-border mx-auto max-h-[80vh]"
                      style={{
                        aspectRatio: `${section.image.width} / ${section.image.height}`,
                      }}
                    >
                      <Image
                        src={section.image.src}
                        alt={section.image.caption}
                        fill
                        sizes="(min-width: 1024px) 768px, 100vw"
                        className="object-contain grayscale-[20%] opacity-90"
                      />
                    </div>
                    <figcaption className="mt-3 text-center font-mono text-xs text-muted-foreground">
                      {section.image.caption}
                    </figcaption>
                  </figure>
                )}
              </section>
            );
          })}

          {/* Footer */}
          <footer className="pt-8 border-t border-border flex items-center justify-between font-mono text-xs text-muted-foreground">
            <div className="flex items-center gap-2">
              <FileText className="w-4 h-4" />
              DOCUMENT ID: ARCHIVE-{archive.id.padStart(4, "0")}
            </div>
            <div>END OF FILE</div>
          </footer>
        </article>
      </div>
    </motion.div>
  );
}
