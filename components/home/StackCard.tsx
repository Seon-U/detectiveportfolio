"use client";

import { motion } from "framer-motion";
import type { LucideIcon } from "lucide-react";
import { useMountedTheme } from "@/lib/hooks/useMountedTheme";
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
  const { isDark } = useMountedTheme();

  return (
    <motion.div
      key={name}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      whileHover={{ y: -10 }}
      className={cn(
        "group relative p-8 rounded-lg overflow-hidden border transition-all duration-300 cursor-crosshair bg-card border-border",
        isDark
          ? "hover:border-primary hover:shadow-[0_0_20px_rgba(102,252,241,0.2)]"
          : "shadow-card hover:shadow-xl",
      )}
    >
      <div
        className={cn(
          "absolute -right-10 -top-10 w-32 h-32 rounded-full blur-3xl opacity-20 transition-opacity group-hover:opacity-50",
          `bg-linear-to-br ${color}`,
        )}
      />

      <div className="relative z-10 flex flex-col items-center text-center space-y-4">
        <div className="p-4 rounded-full border-2 border-dashed border-primary text-primary">
          <Icon className="w-8 h-8" />
        </div>
        <h3 className="text-xl font-bold font-serif text-card-foreground">
          {name}
        </h3>
        <div>
          <p className="text-sm italic mb-4 text-muted-foreground">
            "{description}"
          </p>
          <div className="flex flex-wrap justify-center gap-2">
            {techs.map((tech) => (
              <span
                key={tech}
                className="px-2 py-1 text-xs rounded-full font-mono font-bold bg-surface text-foreground"
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
