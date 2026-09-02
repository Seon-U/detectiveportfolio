"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, ChevronDown } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import type { Project, Contribution } from "@/lib/projects/types";
import { ROLES } from "@/lib/roles/data";
import type { RoleId } from "@/lib/roles/types";
import { cn } from "@/lib/utils";

type Props = { projects: Project[] };

const ROLE_BADGE: Record<string, string> = {
  frontend: "bg-role-frontend-bg text-role-frontend-text",
  backend: "bg-role-backend-bg text-role-backend-text",
  ios: "bg-role-ios-bg text-role-ios-text",
  planner: "bg-role-planner-bg text-role-planner-text",
};

export default function ProjectList({ projects }: Props) {
  const [selectedRoles, setSelectedRoles] = useState<Set<RoleId>>(new Set());
  const [selectedTags, setSelectedTags] = useState<Set<string>>(new Set());
  const [filterOpen, setFilterOpen] = useState(true);

  /* 프로젝트가 있는 역할만 필터에 표시 */
  const activeRoles = useMemo(
    () =>
      ROLES.filter((r) =>
        projects.some((c) => c.contributions.some((ct) => ct.roleId === r.id)),
      ),
    [projects],
  );

  /* 역할 필터에 연동되는 태그 풀 */
  const availableTags = useMemo(() => {
    const pool =
      selectedRoles.size === 0
        ? projects
        : projects.filter((c) =>
            c.contributions.some((ct) => selectedRoles.has(ct.roleId)),
          );
    return [...new Set(pool.flatMap((c) => c.tags))].sort();
  }, [projects, selectedRoles]);

  /* 필터 적용: 프로젝트 + 내부 contribution 동시 필터링 */
  const filteredProjects = useMemo(() => {
    return projects
      .filter((c) => {
        const matchesRole =
          selectedRoles.size === 0 ||
          c.contributions.some((ct) => selectedRoles.has(ct.roleId));
        const matchesTag =
          selectedTags.size === 0 || c.tags.some((t) => selectedTags.has(t));
        return matchesRole && matchesTag;
      })
      .map((c) => ({
        projectData: c,
        contributions:
          selectedRoles.size === 0
            ? c.contributions
            : c.contributions.filter((ct) => selectedRoles.has(ct.roleId)),
      }));
  }, [projects, selectedRoles, selectedTags]);

  const hasActiveFilters = selectedRoles.size > 0 || selectedTags.size > 0;
  const activeFilterCount = selectedRoles.size + selectedTags.size;

  const toggleRole = (id: RoleId) => {
    setSelectedRoles((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const toggleTag = (tag: string) => {
    setSelectedTags((prev) => {
      const next = new Set(prev);
      next.has(tag) ? next.delete(tag) : next.add(tag);
      return next;
    });
  };

  const clearFilters = () => {
    setSelectedRoles(new Set());
    setSelectedTags(new Set());
  };

  const getRoleLabel = (roleId: RoleId) =>
    ROLES.find((r) => r.id === roleId)?.label ?? roleId;

  /* 역할 필터 → detail 페이지에 ?role= 전달 (복수 선택 지원) */
  const buildHref = (projectId: string, contributions: Contribution[]) => {
    const base = `/projects/${projectId}`;
    if (selectedRoles.size === 0) return base;
    const matching = contributions
      .map((ct) => ct.roleId)
      .filter((r) => selectedRoles.has(r));
    return matching.length > 0
      ? `${base}?role=${matching.join(",")}`
      : base;
  };

  return (
    <div className="pb-20">
      {/* ── Title ── */}
      <div className="px-4 md:px-8 lg:px-12">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-[clamp(28px,4vw,40px)] font-serif font-bold tracking-tight text-foreground pt-2 pb-6">
            Projects
          </h1>
        </div>
      </div>

      {/* ── Sticky Filter Bar ── */}
      <div className="sticky top-16 z-20 bg-background/95 backdrop-blur-sm border-b border-border/30 px-4 md:px-8 lg:px-12">
        <div className="max-w-7xl mx-auto">
          {/* Toggle row */}
          <div className="flex items-center gap-3 py-2.5">
            <button
              type="button"
              onClick={() => setFilterOpen((v) => !v)}
              className="flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              <ChevronDown
                className={cn(
                  "w-4 h-4 transition-transform duration-200",
                  !filterOpen && "-rotate-90",
                )}
              />
              Filters
              {hasActiveFilters && (
                <span className="ml-0.5 px-1.5 py-0.5 text-[11px] font-semibold rounded-full bg-accent/15 text-accent tabular-nums">
                  {activeFilterCount}
                </span>
              )}
            </button>

            {hasActiveFilters && (
              <button
                type="button"
                onClick={clearFilters}
                className="text-xs text-muted-foreground hover:text-foreground transition-colors"
              >
                초기화
              </button>
            )}
          </div>

          {/* Collapsible chips */}
          <AnimatePresence initial={false}>
            {filterOpen && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="overflow-hidden"
              >
                <div className="pb-3 space-y-2.5">
                  {/* Role chips */}
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-xs font-medium text-muted-foreground tracking-[0.08em] uppercase mr-0.5">
                      Roles
                    </span>
                    {activeRoles.map((r) => (
                      <button
                        key={r.id}
                        type="button"
                        onClick={() => toggleRole(r.id)}
                        className={cn(
                          "px-3 py-1.5 text-sm font-medium rounded-md border transition-colors",
                          selectedRoles.has(r.id)
                            ? "bg-accent/10 border-accent text-accent"
                            : "border-border text-muted-foreground hover:border-foreground/30 hover:text-foreground",
                        )}
                      >
                        {r.label}
                      </button>
                    ))}
                  </div>

                  {/* Skill / tag chips */}
                  <div className="flex flex-wrap items-center gap-1.5">
                    <span className="text-xs font-medium text-muted-foreground tracking-[0.08em] uppercase mr-0.5">
                      Skills
                    </span>
                    {availableTags.map((tag) => (
                      <button
                        key={tag}
                        type="button"
                        onClick={() => toggleTag(tag)}
                        className={cn(
                          "px-2.5 py-1 text-xs rounded border transition-colors",
                          selectedTags.has(tag)
                            ? "bg-accent/10 border-accent text-accent"
                            : "border-border text-muted-foreground hover:border-foreground/30",
                        )}
                      >
                        {tag}
                      </button>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* ── Project List ── */}
      <div className="px-4 md:px-8 lg:px-12 mt-8">
        <div className="max-w-7xl mx-auto space-y-10">
          {filteredProjects.length > 0 ? (
            filteredProjects.map(({ projectData, contributions }, index) => (
              <motion.article
                key={projectData.id}
                className="group relative"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.08 }}
              >
                {/* Card-level overlay link */}
                <Link
                  href={buildHref(projectData.id, contributions)}
                  className="absolute inset-0 z-0 rounded-lg focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2"
                  aria-label={`${projectData.title} 상세 보기`}
                />

                <div className="py-5 lg:py-7 px-1 rounded-lg transition-colors group-hover:bg-surface/50">
                  {/* Mobile: image top */}
                  <div className="block lg:hidden mb-4">
                    <div className="relative w-full aspect-[16/9] rounded-lg overflow-hidden bg-surface">
                      <Image
                        src={projectData.image}
                        alt={projectData.title}
                        fill
                        sizes="(max-width: 1023px) 92vw, 0px"
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                        {...(index === 0 && { priority: true })}
                      />
                    </div>
                  </div>

                  <div className="flex gap-6 lg:gap-8">
                    {/* ── Content ── */}
                    <div className="flex-1 min-w-0 space-y-2.5">
                      {/* Project name */}
                      <h2 className="text-[clamp(18px,2.2vw,24px)] font-semibold text-foreground break-keep group-hover:text-accent transition-colors">
                        {projectData.title}
                      </h2>

                      {/* Meta: date | team | github */}
                      <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-[13px] text-muted-foreground tracking-[0.04em]">
                        <span className="tabular-nums">
                          {projectData.period}
                        </span>
                        <span className="text-border">|</span>
                        <span>{projectData.teamSize}인</span>
                        {projectData.links?.map((link) => (
                          <span key={link.url} className="contents">
                            <span className="text-border">|</span>
                            <a
                              href={link.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="relative z-10 inline-flex items-center gap-0.5 font-medium text-accent hover:underline"
                              onClick={(e) => e.stopPropagation()}
                            >
                              {link.label}
                              <ArrowUpRight className="w-3 h-3" />
                            </a>
                          </span>
                        ))}
                      </div>

                      {/* Description */}
                      <p className="text-[clamp(13px,1.3vw,15px)] leading-relaxed text-foreground/85 break-keep">
                        {projectData.description}
                      </p>

                      {/* Contributions: Role Badge + Summary */}
                      <div className="space-y-1.5 pt-1">
                        {contributions.map((ct) => (
                          <div
                            key={ct.roleId}
                            className="flex items-start gap-2.5"
                          >
                            <span
                              className={cn(
                                "shrink-0 px-2 py-0.5 text-[11px] font-bold rounded mt-0.5 tracking-wide",
                                ROLE_BADGE[ct.roleId] ??
                                  "bg-muted text-muted-foreground",
                              )}
                            >
                              {getRoleLabel(ct.roleId)}
                            </span>
                            <span className="text-sm text-foreground break-keep">
                              {ct.summary}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* ── Desktop: image right, spans full content height ── */}
                    <div className="hidden lg:flex shrink-0 w-52 xl:w-64 2xl:w-72">
                      <div className="relative w-full rounded-lg overflow-hidden bg-surface">
                        <Image
                          src={projectData.image}
                          alt={projectData.title}
                          fill
                          sizes="(min-width: 1536px) 288px, (min-width: 1280px) 256px, (min-width: 1024px) 208px, 0px"
                          className="object-cover transition-transform duration-300 group-hover:scale-105"
                          {...(index === 0 && { priority: true })}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </motion.article>
            ))
          ) : (
            <p className="py-16 text-center text-muted-foreground text-sm">
              선택한 조건에 해당하는 프로젝트가 없습니다.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
