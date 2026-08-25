"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useCallback, useMemo, useState } from "react";
import { getProjectsByRole, ROLES } from "@/lib/roles/data";
import type { RoleProject } from "@/lib/roles/types";
import RoleDropdown from "../ui/RoleDropdown";

export default function RoleShowcaseSection() {
  const [selectedRoleId, setSelectedRoleId] = useState(ROLES[0].id);
  const [hoveredProject, setHoveredProject] = useState<RoleProject | null>(
    null,
  );

  const selectedRole = ROLES.find((r) => r.id === selectedRoleId) ?? ROLES[0];
  const projects = useMemo(
    () => getProjectsByRole(selectedRoleId),
    [selectedRoleId],
  );

  const handleSelect = useCallback((roleId: string) => {
    setSelectedRoleId(roleId);
    setHoveredProject(null);
  }, []);

  /* 이미지: hover된 프로젝트 → Role.defaultImage → 첫 프로젝트 이미지 */
  const displayProject = hoveredProject;
  const fallbackImage = selectedRole.defaultImage ?? projects[0]?.image;
  const previewSrc = displayProject?.image ?? fallbackImage;
  const previewAlt = displayProject?.title ?? selectedRole.label;

  return (
    <section
      className="px-6 md:px-8 lg:px-12"
      aria-label="직무별 프로젝트 소개"
    >
      <div className="max-w-7xl mx-auto">
        {/* ── Headline + CTA ── */}
        <div className="flex items-end justify-between mb-8">
          <div className="text-[clamp(24px,3vw,36px)] font-semibold leading-[1.4] tracking-[0.05em] text-foreground">
            <span className="whitespace-nowrap">
              <RoleDropdown
                roles={ROLES}
                selectedRoleId={selectedRoleId}
                onSelect={handleSelect}
              />
              로서
            </span>
            <br />
            <span>내가 필요한 순간</span>
          </div>
          <Link
            href="/cases"
            className="hidden md:inline-flex items-center gap-1.5 text-sm font-medium text-accent no-underline transition-all duration-200 hover:gap-2.5 focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2 focus-visible:rounded-sm"
          >
            모든 프로젝트 보기
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* 모바일: 타이틀 아래, 이미지 위 */}
        <Link
          href="/cases"
          className="md:hidden inline-flex items-center gap-1.5 mb-4 text-sm font-medium text-accent no-underline transition-all duration-200 hover:gap-2.5 focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2 focus-visible:rounded-sm"
        >
          모든 프로젝트 보기
          <ArrowRight className="w-4 h-4" />
        </Link>

        {/* ── Mobile: 대표 이미지 (lg 미만) ── */}
        {projects.length > 0 && (
          <div className="block lg:hidden mb-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedRoleId}
                className="relative w-full aspect-[16/9] rounded-xl overflow-hidden border border-border bg-surface"
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.97 }}
                transition={{ duration: 0.25 }}
              >
                <Image
                  src={selectedRole.defaultImage ?? projects[0].image}
                  alt={selectedRole.label}
                  fill
                  sizes="(max-width: 767px) 92vw, (max-width: 1023px) 80vw, 0px"
                  className="object-cover"
                />
              </motion.div>
            </AnimatePresence>
          </div>
        )}

        {/* ── Content Grid ── */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12 items-start">
          {/* Left: Description + Projects */}
          <div className="lg:col-span-3 space-y-6">
            <AnimatePresence mode="wait">
              <motion.p
                key={selectedRoleId}
                className="text-[clamp(15px,1.6vw,18px)] leading-[1.75] text-muted-foreground max-w-[44ch]"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.2 }}
              >
                {selectedRole.description}
              </motion.p>
            </AnimatePresence>

            <AnimatePresence mode="wait">
              <motion.div
                key={selectedRoleId}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2, delay: 0.05 }}
              >
                {projects.length > 0 ? (
                  <ul className="flex flex-col">
                    {projects.map((project, index) => (
                      <motion.li
                        key={project.caseId}
                        initial={{ opacity: 0, x: -12 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.06 }}
                      >
                        <Link
                          href={project.href}
                          className="group flex items-center gap-3 py-3 border-b border-border first:border-t text-[clamp(15px,1.5vw,17px)] font-medium text-foreground no-underline transition-all duration-200 hover:text-accent hover:pl-2 focus-visible:text-accent focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2 focus-visible:rounded-sm dark:hover:text-(--mint-500)"
                          onMouseEnter={() => setHoveredProject(project)}
                          onFocus={() => setHoveredProject(project)}
                          onMouseLeave={() => setHoveredProject(null)}
                          onBlur={() => setHoveredProject(null)}
                        >
                          <ArrowRight className="w-4 h-4 shrink-0 opacity-0 -translate-x-1 transition-all duration-200 group-hover:opacity-100 group-hover:translate-x-0 group-focus-visible:opacity-100 group-focus-visible:translate-x-0" />
                          <span>{project.title}</span>
                        </Link>
                      </motion.li>
                    ))}
                  </ul>
                ) : (
                  <p className="py-8 text-center text-subtle-foreground text-sm italic">
                    관련 프로젝트가 준비 중입니다.
                  </p>
                )}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Right: Image Preview (desktop) */}
          <div className="hidden lg:block lg:col-span-2">
            <div className="relative w-full aspect-[16/10] rounded-xl overflow-hidden border border-border bg-surface dark:border-(--gray-400)">
              <AnimatePresence mode="wait">
                {previewSrc ? (
                  <motion.div
                    key={displayProject?.caseId ?? `default-${selectedRoleId}`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="absolute inset-0"
                  >
                    <Image
                      src={previewSrc}
                      alt={previewAlt}
                      fill
                      sizes="(min-width: 1024px) 35vw, 0px"
                      className="object-cover"
                    />
                  </motion.div>
                ) : (
                  <motion.div
                    key="placeholder"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex items-center justify-center w-full h-full text-subtle-foreground text-sm tracking-[0.05em]"
                  >
                    프로젝트에 마우스를 올려보세요
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
