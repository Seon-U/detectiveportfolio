import { ArrowLeft, ArrowUpRight, Calendar, Users } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import type { Project } from "@/lib/projects/types";

type Props = {
  projectData: Project;
};

export default function ProjectHero({ projectData }: Props) {
  const links = projectData.links ?? [];

  return (
    <>
      {/* Back button — 항상 /projects로 이동 */}
      <Link
        href="/projects"
        className="flex items-center gap-2 mb-8 font-pretendard text-sm text-muted-foreground hover:text-primary transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        모든 프로젝트 보기
      </Link>

      {/* ── Header ─────────────────────────────────────── */}
      <header className="mb-10">
        {/* Meta line: period, team */}
        <div className="flex flex-wrap items-center gap-3 mb-4 font-pretendard text-xs text-muted-foreground tracking-wide">
          <span className="flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5" />
            {projectData.period}
          </span>
          <span className="flex items-center gap-1.5">
            <Users className="w-3.5 h-3.5" />
            {projectData.teamSize}인 팀
          </span>
        </div>

        {/* Title + Summary (가로 배치) */}
        <div className="flex flex-col lg:flex-row lg:items-start lg:gap-12 mb-6">
          <h1 className="text-3xl md:text-5xl font-pretendard font-black text-foreground leading-tight max-w-xl lg:shrink-0 line-clamp-2 break-keep">
            {projectData.title}
          </h1>
          <p className="mt-3 lg:mt-2 text-base font-pretendard text-muted-foreground leading-relaxed max-w-lg break-keep">
            {projectData.description}
          </p>
        </div>

        {/* Links */}
        {links.length > 0 && (
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
            {links.map((link) => (
              <a
                key={link.url}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-xs font-medium font-pretendard text-accent no-underline transition-all duration-200 hover:gap-1.5"
              >
                {link.label}
                <ArrowUpRight className="w-3 h-3" />
              </a>
            ))}
          </div>
        )}
      </header>

      {/* ── Showcase Image ─────────────────────────────── */}
      <div className="mb-14 relative overflow-hidden rounded-lg aspect-[16/9] border border-border/30">
        <Image
          src={projectData.image}
          alt={projectData.title}
          fill
          priority
          sizes="(min-width: 1024px) 1024px, 100vw"
          className="object-cover"
        />
      </div>
    </>
  );
}
