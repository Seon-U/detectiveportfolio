"use client";

import { motion } from "framer-motion";
import { ArrowRight, ArrowUp, Mail } from "lucide-react";
import { useDictionary, useLocale } from "@/components/i18n/DictionaryProvider";
import { resumePaths } from "@/lib/i18n/config";

export default function ClosingSection() {
  const { closing } = useDictionary();
  const locale = useLocale();
  return (
    <motion.section
      className="px-4 md:px-8 lg:px-12 py-20 md:py-32 text-center"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, ease: "easeOut" as const }}
      aria-label={closing.ariaLabel}
    >
      <h2 className="text-[clamp(36px,6vw,72px)] font-bold text-foreground leading-[1.1] tracking-tight mb-10 md:mb-14 break-keep">
        {closing.title}
      </h2>

      <nav
        className="flex items-center justify-center gap-4 md:gap-6"
        aria-label={closing.ctaAriaLabel}
      >
        <a
          href="mailto:seonu.kim.kr@gmail.com"
          className="inline-flex items-center gap-2 px-6 py-3 lg:px-8 lg:py-3.5 text-sm lg:text-base font-medium rounded-lg border border-border text-foreground no-underline transition-all duration-200 hover:border-accent hover:text-accent focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2"
        >
          <Mail className="w-4 h-4 lg:w-5 lg:h-5" aria-hidden="true" />
          {closing.contact}
        </a>
        <a
          href={resumePaths[locale]}
          download
          className="inline-flex items-center gap-2 px-6 py-3 lg:px-8 lg:py-3.5 text-sm lg:text-base font-medium rounded-lg text-white no-underline transition-all duration-200 hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2"
          style={{ backgroundColor: "var(--cta-bg)" }}
        >
          {closing.getCv}
          <ArrowRight className="w-4 h-4 lg:w-5 lg:h-5" aria-hidden="true" />
        </a>
      </nav>

      <button
        type="button"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className="mt-14 md:mt-20 inline-flex items-center gap-1.5 text-xs tracking-widest text-muted-foreground transition-colors duration-200 hover:text-accent focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2 cursor-pointer"
        aria-label={closing.backToTopAriaLabel}
      >
        <ArrowUp className="w-3.5 h-3.5" aria-hidden="true" />
        {closing.backToTop}
      </button>
    </motion.section>
  );
}
