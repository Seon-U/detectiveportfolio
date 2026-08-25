"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, FolderOpen, Search } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { statusStyles } from "@/lib/cases/status-styles";
import type { Case } from "@/lib/cases/types";
import { ROLES } from "@/lib/roles/data";
import { cn } from "@/lib/utils";

const MotionLink = motion.create(Link);

type Props = {
  cases: Case[];
};

const STATUS_FILTERS = ["ALL", "SOLVED", "ONGOING", "HOLDED"] as const;
type StatusFilter = (typeof STATUS_FILTERS)[number];

const ROLE_OPTIONS = [
  { id: "all", label: "전체" },
  ...ROLES.map((r) => ({ id: r.id, label: r.label })),
];

export default function CaseFilesList({ cases }: Props) {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeFilter, setActiveFilter] = useState<StatusFilter>("ALL");
  const [activeRole, setActiveRole] = useState("all");

  const filteredCases = cases.filter((c) => {
    const matchesSearch =
      c.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      activeFilter === "ALL" || c.status === activeFilter;
    const matchesRole =
      activeRole === "all" ||
      c.contributions.some((ct) => ct.roleId === activeRole);
    return matchesSearch && matchesStatus && matchesRole;
  });

  return (
    <div className="space-y-12 pb-20">
      {/* Page header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div>
          <h1 className="text-5xl font-serif font-black uppercase tracking-tight flex items-center gap-4 text-foreground">
            <FolderOpen className="text-primary" size={40} />
            Case Files
          </h1>
          <p className="mt-4 font-mono text-muted-foreground">
            Master Archive / Internal Access Only
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
          {/* Search input */}
          <div className="flex items-center px-4 py-2 border rounded-md bg-surface border-border">
            <Search className="w-4 h-4 mr-2 opacity-50 text-muted-foreground shrink-0" />
            <input
              type="text"
              placeholder="Search ID or Title..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="bg-transparent border-none outline-none text-sm w-full font-mono placeholder:opacity-50 text-foreground"
            />
          </div>

          {/* Status + Role filters */}
          <div className="flex flex-col gap-2">
            <div className="flex gap-2 flex-wrap">
              {STATUS_FILTERS.map((f) => (
                <button
                  key={f}
                  type="button"
                  onClick={() => setActiveFilter(f)}
                  className={cn(
                    "px-3 py-2 text-xs font-bold rounded-md border transition-colors font-mono",
                    activeFilter === f
                      ? "bg-primary/10 border-primary text-primary"
                      : "border-border text-muted-foreground hover:border-primary",
                  )}
                >
                  {f}
                </button>
              ))}
            </div>
            <div className="flex gap-2 flex-wrap">
              {ROLE_OPTIONS.map((r) => (
                <button
                  key={r.id}
                  type="button"
                  onClick={() => setActiveRole(r.id)}
                  className={cn(
                    "px-3 py-2 text-xs font-medium rounded-md border transition-colors",
                    activeRole === r.id
                      ? "bg-accent/10 border-accent text-accent"
                      : "border-border text-muted-foreground hover:border-accent",
                  )}
                >
                  {r.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Case grid */}
      <motion.div layout className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <AnimatePresence>
          {filteredCases.map((c, i) => (
            <MotionLink
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3, delay: i * 0.05 }}
              key={c.id}
              href={`/cases/${c.id}`}
              className="group relative p-6 md:p-8 flex flex-col sm:flex-row gap-6 items-start overflow-hidden cursor-pointer bg-card border border-border hover:border-primary transition-colors shadow-card"
            >
              {/* Polaroid image */}
              <div className="w-full sm:w-1/3 shrink-0">
                <div className="aspect-[3/4] rounded overflow-hidden border-4 p-1 transform -rotate-2 group-hover:rotate-0 transition-transform duration-500 border-surface shadow-paper">
                  <Image
                    src={c.image}
                    alt={c.title}
                    width={400}
                    height={534}
                    className="w-full h-full object-cover grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500"
                  />
                </div>
              </div>

              {/* Content */}
              <div className="flex-1 flex flex-col h-full z-10">
                <div className="flex justify-between items-start mb-2">
                  <span className="font-mono text-sm font-bold px-2 py-0.5 border-b-2 text-primary border-primary">
                    CF-{c.id}
                  </span>
                  <span
                    className={cn(
                      "text-xs font-bold px-2 py-1 uppercase border",
                      statusStyles[c.status],
                    )}
                  >
                    {c.status}
                  </span>
                </div>

                <h3 className="text-2xl font-serif font-bold mt-2 mb-3 leading-tight text-foreground group-hover:text-primary transition-colors">
                  {c.title}
                </h3>

                <p className="text-sm mb-4 font-mono leading-relaxed text-muted-foreground">
                  {c.description}
                </p>

                <div className="mt-auto pt-4 flex flex-wrap gap-2">
                  {c.tags.map((t) => (
                    <span
                      key={t}
                      className="text-xs px-2 py-1 rounded font-mono bg-surface text-muted-foreground border border-border"
                    >
                      {t}
                    </span>
                  ))}
                </div>

                <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-all transform translate-x-4 group-hover:translate-x-0 duration-300 text-primary">
                  <ArrowRight />
                </div>
              </div>
            </MotionLink>
          ))}
        </AnimatePresence>
      </motion.div>

      {filteredCases.length === 0 && (
        <div className="text-center py-20 font-mono text-lg text-muted-foreground opacity-60">
          No records found matching your criteria.
        </div>
      )}
    </div>
  );
}
