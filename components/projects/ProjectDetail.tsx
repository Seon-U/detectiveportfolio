"use client";

import { useSearchParams } from "next/navigation";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { getAllProjects } from "@/lib/projects/queries";
import type { Project, ProjectSection } from "@/lib/projects/types";
import type { RoleId } from "@/lib/roles/types";
import RelatedProjects from "./layout/RelatedProjects";
import SectionNav from "./layout/SectionNav";
import SectionRenderer from "./layout/SectionRenderer";

export default function ProjectDetail({
  projectData,
}: {
  projectData: Project;
}) {
  const searchParams = useSearchParams();

  /* ?role= query param → 초기 role 상태 */
  const initialRole = (searchParams.get("role") ?? undefined) as
    | RoleId
    | undefined;
  const [selectedRole, setSelectedRole] = useState<RoleId | undefined>(
    initialRole,
  );
  const [activeSection, setActiveSection] = useState<string>("");
  const sectionRefs = useRef<Record<string, HTMLElement | null>>({});

  /* 이 프로젝트가 가진 고유 역할 목록 */
  const availableRoles = useMemo(() => {
    const set = new Set<RoleId>();
    for (const section of projectData.sections) {
      if (section.roles) {
        for (const r of section.roles) set.add(r);
      }
    }
    return [...set];
  }, [projectData.sections]);

  /* 역할 필터링: roles 없는 섹션(공통) + 해당 역할 섹션만 */
  const filteredSections: ProjectSection[] = useMemo(
    () =>
      selectedRole
        ? projectData.sections.filter(
            (s) => !s.roles || s.roles.includes(selectedRole),
          )
        : projectData.sections,
    [projectData.sections, selectedRole],
  );

  /* 같은 역할의 다른 프로젝트 (현재 프로젝트 제외) */
  const relatedProjects = useMemo(() => {
    const allProjects = getAllProjects();

    if (!selectedRole) {
      return allProjects.filter((p) => p.id !== projectData.id);
    }

    return allProjects.filter(
      (p) =>
        p.id !== projectData.id &&
        p.contributions.some((ct) => ct.roleId === selectedRole),
    );
  }, [projectData.id, selectedRole]);

  /* IntersectionObserver로 현재 보이는 섹션 추적 */
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

    for (const ref of Object.values(sectionRefs.current)) {
      if (ref) observer.observe(ref);
    }

    return () => observer.disconnect();
  }, [filteredSections]);

  const handleSectionSelect = useCallback((id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  }, []);

  const handleRoleChange = useCallback((role: RoleId | undefined) => {
    setSelectedRole(role);
  }, []);

  return (
    <div>
      {/* ── Section Navigation (sticky) ───────────────── */}
      <div className="sticky top-14 z-10 bg-background/80 backdrop-blur-md border-b border-border mb-12 -mx-4 px-4">
        <SectionNav
          sections={filteredSections.map((s) => ({
            id: s.id,
            heading: s.heading,
          }))}
          activeId={activeSection}
          onSelect={handleSectionSelect}
          availableRoles={availableRoles}
          selectedRole={selectedRole}
          onRoleChange={handleRoleChange}
        />
      </div>

      {/* ── Sections ──────────────────────────────────── */}
      <article className="space-y-20">
        {filteredSections.map((section) => (
          <section
            key={section.id}
            id={section.id}
            ref={(el) => {
              sectionRefs.current[section.id] = el;
            }}
          >
            <SectionRenderer section={section} />
          </section>
        ))}
      </article>

      {/* ── Related Projects ──────────────────────────── */}
      <RelatedProjects projects={relatedProjects} currentRole={selectedRole} />
    </div>
  );
}
