"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import type { Case } from "@/lib/cases/data";
import { cn } from "@/lib/utils";

type Props = {
  cases: Case[];
};

export default function CaseCarousel({ cases }: Props) {
  const router = useRouter();

  return (
    <div className="flex overflow-x-auto gap-8 pb-10 snap-x hide-scrollbar">
      {cases.map((c) => (
        <motion.div
          layoutId={`case-${c.id}`}
          key={c.id}
          whileHover={{ scale: 1.02 }}
          onClick={() => router.push(`/cases/${c.id}`)}
          className="min-w-[300px] md:min-w-[400px] snap-center shrink-0 cursor-pointer group"
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
                      ? "text-[hsl(var(--solved))] border-[hsl(var(--solved))]"
                      : "text-[hsl(var(--verified))] border-[hsl(var(--verified))]",
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
  );
}
