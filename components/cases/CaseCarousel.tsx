"use client";

import { AnimatePresence, motion } from "framer-motion";
import dynamic from "next/dynamic";
import { useState } from "react";
import type { Case } from "@/lib/cases/types";
import { cn } from "@/lib/utils";

const CaseModal = dynamic(() => import("./CaseModal"), { ssr: false });

type Props = {
  cases: Case[];
};

export default function CaseCarousel({ cases }: Props) {
  const [selectedCase, setSelectedCase] = useState<Case | null>(null);

  return (
    <>
      <div
        className={cn("flex overflow-x-auto gap-8 pb-10 snap-x hide-scrollbar")}
      >
        {cases.map((c) => (
          <motion.div
            key={c.id}
            whileHover={{ scale: 1.02 }}
            onClick={() => setSelectedCase(c)}
            className="min-w-[300px] md:min-w-[400px] max-w-[400px] md:max-w-[480px] snap-center shrink-0 cursor-pointer group p-2"
          >
            <div className="h-[300px] p-6 rounded relative overflow-hidden transition-all duration-500 bg-card border-2 border-border hover:border-primary shadow-card">
              {/* Folder Tab */}
              <div className="absolute top-0 right-10 px-4 py-1 text-xs font-mono rounded-b bg-surface text-muted-foreground">
                FILE: {c.id}
              </div>

              <div className="mt-8 flex flex-col h-full">
                <div className="flex-1">
                  <h3 className="text-2xl font-serif font-black uppercase mb-2 text-card-foreground">
                    {c.title}
                  </h3>
                  <p className="font-mono text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-muted-foreground">
                    {c.summary}
                  </p>
                </div>

                <div className="flex justify-between items-center mt-auto">
                  <span
                    className={cn(
                      "text-xs font-bold px-2 py-1 border-2 uppercase",
                      c.status === "SOLVED"
                        ? "text-[var(--solved)] border-[var(--solved)]"
                        : "text-[var(--verified)] border-[var(--verified)]",
                    )}
                  >
                    {c.status}
                  </span>
                </div>
              </div>

              {/* Cover Image inside folder */}
              <div
                className="absolute inset-0 z-0 opacity-10 group-hover:opacity-30 transition-opacity duration-500 bg-cover bg-center mix-blend-overlay"
                style={{ backgroundImage: `url(${c.image})` }}
              />
            </div>
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {selectedCase && (
          <CaseModal
            key="case-modal"
            caseData={selectedCase}
            onClose={() => setSelectedCase(null)}
          />
        )}
      </AnimatePresence>
    </>
  );
}
