"use client";

import { motion } from "framer-motion";
import { useTheme } from "next-themes";
import { useState } from "react";
import type { Case } from "@/lib/cases/data";
import { cn } from "@/lib/utils";

type Props = {
  cases: Case[];
};

export default function CaseCarousel({ cases }: Props) {
  const { theme } = useTheme();
  const [selectedCase, setSelectedCase] = useState<Case | null>(null);

  return (
    <div className="flex overflow-x-auto gap-8 pb-10 snap-x hide-scrollbar">
      {cases.map((c) => (
        <motion.div
          layoutId={`case-${c.id}`}
          key={c.id}
          whileHover={{ scale: 1.02 }}
          onClick={() => setSelectedCase(c)}
          className="min-w-[300px] md:min-w-[400px] snap-center shrink-0 cursor-pointer group"
        >
          <div
            className={cn(
              "h-[300px] p-6 rounded relative overflow-hidden transition-all duration-500",
              theme === "dark"
                ? "bg-[#111] border-2 border-[#1f2833] hover:border-[#45a29e]"
                : "bg-[#e5d9b7] border-2 border-[#c2b28c] shadow-lg",
            )}
          >
            {/* Folder Tab */}
            <div
              className={cn(
                "absolute top-0 right-10 px-4 py-1 text-xs font-mono rounded-b",
                theme === "dark"
                  ? "bg-[#1f2833] text-[#c5c6c7]"
                  : "bg-[#c2b28c] text-[#3e2723]",
              )}
            >
              FILE: {c.id}
            </div>

            <div className="mt-8 flex flex-col h-full">
              <div className="flex-1">
                <h3
                  className={cn(
                    "text-2xl font-serif font-black uppercase mb-2",
                    theme === "dark" ? "text-white" : "text-[#3e2723]",
                  )}
                >
                  {c.title}
                </h3>
                <p
                  className={cn(
                    "font-mono text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300",
                    theme === "dark" ? "text-[#c5c6c7]" : "text-[#5d4037]",
                  )}
                >
                  {c.summary}
                </p>
              </div>

              <div className="flex justify-between items-center mt-auto">
                <span
                  className={cn(
                    "text-xs font-bold px-2 py-1 border-2 uppercase",
                    c.status === "SOLVED"
                      ? theme === "dark"
                        ? "text-green-400 border-green-400"
                        : "text-green-700 border-green-700 bg-green-100"
                      : theme === "dark"
                        ? "text-red-400 border-red-400"
                        : "text-red-700 border-red-700 bg-red-100",
                  )}
                >
                  {c.status}
                </span>
              </div>
            </div>

            {/* Cover Image inside folder */}
            <div
              className={cn(
                "absolute inset-0 z-0 opacity-10 group-hover:opacity-30 transition-opacity duration-500 bg-cover bg-center mix-blend-overlay",
              )}
              style={{ backgroundImage: `url(${c.image})` }}
            />
          </div>
        </motion.div>
      ))}
    </div>
  );
}
