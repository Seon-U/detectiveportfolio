"use client";

import { motion } from "framer-motion";
import type { LucideIcon } from "lucide-react";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";

type Stack = {
  index: number;
  name: string;
  icon: LucideIcon;
  color: string;
  description: string;
  techs: string[];
};

export default function StackCard({
  index,
  name,
  icon: Icon,
  color,
  description,
  techs,
}: Stack) {
  const { theme } = useTheme();

  return (
    <motion.div
      key={name}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      whileHover={{ y: -10 }}
      className={cn(
        "group relative p-8 rounded-lg overflow-hidden border transition-all duration-300 cursor-crosshair",
        theme === "dark"
          ? "bg-[#1f2833] border-[#45a29e]/30 hover:border-[#66fcf1] hover:shadow-[0_0_20px_rgba(102,252,241,0.2)]"
          : "bg-white border-[#d4c39f] shadow-lg hover:shadow-xl",
      )}
    >
      <div
        className={cn(
          "absolute -right-10 -top-10 w-32 h-32 rounded-full blur-3xl opacity-20 transition-opacity group-hover:opacity-50",
          `bg-linear-to-br ${color}`,
        )}
      ></div>

      <div className="relative z-10 flex flex-col items-center text-center space-y-4">
        <div
          className={cn(
            "p-4 rounded-full border-2 border-dashed",
            theme === "dark"
              ? "border-[#45a29e] text-[#66fcf1]"
              : "border-[#8b5a2b] text-[#8b5a2b]",
          )}
        >
          <Icon className="w-8 h-8" />
        </div>
        <h3
          className={cn(
            "text-xl font-bold font-serif",
            theme === "dark" ? "text-white" : "text-[#3e2723]",
          )}
        >
          {name}
        </h3>
        <div className="h-0 opacity-0 group-hover:h-auto group-hover:opacity-100 transition-all duration-300 overflow-hidden">
          <p
            className={cn(
              "text-sm italic mb-4",
              theme === "dark" ? "text-[#45a29e]" : "text-[#8b5a2b]",
            )}
          >
            "{description}"
          </p>
          <div className="flex flex-wrap justify-center gap-2">
            {techs.map((tech) => (
              <span
                key={tech}
                className={cn(
                  "px-2 py-1 text-xs rounded-full font-mono font-bold",
                  theme === "dark"
                    ? "bg-[#0b0c10] text-[#66fcf1]"
                    : "bg-[#f4ebd0] text-[#5d4037]",
                )}
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
