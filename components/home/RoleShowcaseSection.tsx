"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { FALLBACK_IMAGES } from "@/lib/roles/constants";
import { getPostsByRole, getProjectsByRole, ROLES } from "@/lib/roles/data";
import type { RoleId } from "@/lib/roles/types";
import RoleDropdown from "../ui/RoleDropdown";

type PreviewImage = { src: string; alt: string; key: string };

export default function RoleShowcaseSection() {
  const [selectedRoleId, setSelectedRoleId] = useState(ROLES[0].id);
  const [hoveredPreview, setHoveredPreview] = useState<PreviewImage | null>(
    null,
  );

  const blogSectionRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const [isBlogEnd, setIsBlogEnd] = useState(false);

  useEffect(() => {
    const check = () => {
      if (!blogSectionRef.current || !imageRef.current) return;
      const blogBottom = blogSectionRef.current.getBoundingClientRect().bottom;
      const imageBottom = imageRef.current.getBoundingClientRect().bottom;
      setIsBlogEnd(blogBottom <= imageBottom);
    };
    window.addEventListener("scroll", check, { passive: true });
    check();
    return () => window.removeEventListener("scroll", check);
  }, []);

  const selectedRole = ROLES.find((r) => r.id === selectedRoleId) ?? ROLES[0];
  const projects = useMemo(
    () => getProjectsByRole(selectedRoleId),
    [selectedRoleId],
  );
  const posts = useMemo(() => getPostsByRole(selectedRoleId), [selectedRoleId]);

  const handleSelect = useCallback((roleId: RoleId) => {
    setSelectedRoleId(roleId);
    setHoveredPreview(null);
  }, []);

  /* 이미지 우선순위: hover → 블로그 끝에 닿으면 OG, 아니면 프로젝트 */
  const blogFallback =
    posts.find((p) => p.ogImage)?.ogImage ??
    (posts.length > 0 ? FALLBACK_IMAGES.blog : undefined);
  const projectFallback =
    selectedRole.defaultImage ??
    projects[0]?.image ??
    (projects.length > 0 ? FALLBACK_IMAGES.project : undefined);
  const contextImage =
    isBlogEnd && blogFallback ? blogFallback : projectFallback;

  const previewSrc = hoveredPreview?.src ?? contextImage;
  const previewAlt = hoveredPreview?.alt ?? selectedRole.label;
  const previewKey =
    hoveredPreview?.key ??
    (isBlogEnd && blogFallback
      ? `blog-default-${selectedRoleId}`
      : `default-${selectedRoleId}`);

  return (
    <section
      className="px-4 md:px-8 lg:px-12"
      aria-label="직무별 프로젝트 및 블로그 소개"
    >
      <div className="max-w-7xl mx-auto">
        {/* ── Headline ── */}
        <div className="mb-8">
          <div className="text-[clamp(24px,3vw,36px)] font-semibold leading-[1.4] tracking-wider text-foreground">
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
        </div>

        {/* ── Content Grid ── */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12 items-start">
          {/* Left: Description + Projects + Blog */}
          <div className="lg:col-span-3 space-y-6">
            <AnimatePresence mode="wait">
              <motion.p
                key={selectedRoleId}
                className="text-[clamp(15px,1.6vw,18px)] leading-[1.75] text-foreground/80 max-w-[44ch] break-keep"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.2 }}
              >
                {selectedRole.description}
              </motion.p>
            </AnimatePresence>

            {/* ── 프로젝트 영역 ── */}
            <AnimatePresence mode="wait">
              <motion.div
                key={`projects-${selectedRoleId}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2, delay: 0.05 }}
              >
                {/* 모바일: 대표 이미지 */}
                {projects.length > 0 && (
                  <div className="block lg:hidden mb-6">
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={`mobile-project-${selectedRoleId}`}
                        className="relative w-full aspect-video rounded-xl overflow-hidden border border-border/60 bg-surface"
                        initial={{ opacity: 0, scale: 0.97 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.97 }}
                        transition={{ duration: 0.25 }}
                      >
                        <Image
                          src={projectFallback ?? projects[0].image}
                          alt={selectedRole.label}
                          fill
                          sizes="(max-width: 1023px) 92vw, 0px"
                          className="object-cover"
                        />
                      </motion.div>
                    </AnimatePresence>
                  </div>
                )}

                {/* Project 헤더 */}
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-medium tracking-[0.08em] uppercase text-muted-foreground">
                    Project
                  </span>
                  <Link
                    href="/projects"
                    className="inline-flex items-center gap-1 text-xs font-medium text-accent no-underline transition-all duration-200 hover:gap-1.5 focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2 focus-visible:rounded-sm"
                  >
                    모든 프로젝트 보기
                    <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>

                {projects.length > 0 ? (
                  <ul className="flex flex-col divide-y divide-border border-y border-border">
                    {projects.map((project, index) => (
                      <motion.li
                        key={project.projectId}
                        initial={{ opacity: 0, x: -12 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.06 }}
                      >
                        <Link
                          href={project.href}
                          className="group block py-3.5 no-underline transition-all duration-200 hover:pl-2 focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2 focus-visible:rounded-sm"
                          onMouseEnter={() =>
                            setHoveredPreview({
                              src: project.image,
                              alt: project.title,
                              key: project.projectId,
                            })
                          }
                          onFocus={() =>
                            setHoveredPreview({
                              src: project.image,
                              alt: project.title,
                              key: project.projectId,
                            })
                          }
                          onMouseLeave={() => setHoveredPreview(null)}
                          onBlur={() => setHoveredPreview(null)}
                        >
                          {/* 1순위: 기여 내용 */}
                          <div className="flex items-start gap-3">
                            <ArrowRight className="w-4 h-4 mt-0.5 shrink-0 text-accent opacity-0 -translate-x-1 transition-all duration-200 group-hover:opacity-100 group-hover:translate-x-0 group-focus-visible:opacity-100 group-focus-visible:translate-x-0" />
                            <span className="text-[clamp(14px,1.4vw,16px)] font-medium text-foreground group-hover:text-accent transition-colors break-keep">
                              {project.summary}
                            </span>
                          </div>
                          {/* 2순위: 프로젝트명 + 메타 */}
                          <p className="mt-1 pl-7 text-[13px] text-muted-foreground font-pretendard tracking-[0.08em] break-keep">
                            {project.title}
                            <span className="mx-1.5 text-border">·</span>
                            <span className="tabular-nums">
                              {project.period}
                            </span>
                            <span className="mx-1.5 text-border">·</span>
                            {project.teamSize}인
                          </p>
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

            {/* ── 블로그 영역 ── */}
            {posts.length > 0 && (
              <AnimatePresence mode="wait">
                <motion.div
                  key={`posts-${selectedRoleId}`}
                  ref={blogSectionRef}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2, delay: 0.1 }}
                  className="pt-4"
                >
                  {/* 모바일: 블로그 OG 이미지 */}
                  {blogFallback && (
                    <div className="block lg:hidden mb-6">
                      <AnimatePresence mode="wait">
                        <motion.div
                          key={`mobile-blog-${selectedRoleId}`}
                          className="relative w-full aspect-video rounded-xl overflow-hidden border border-border/60 bg-surface"
                          initial={{ opacity: 0, scale: 0.97 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.97 }}
                          transition={{ duration: 0.25 }}
                        >
                          <Image
                            src={blogFallback}
                            alt="블로그 대표 이미지"
                            fill
                            sizes="(max-width: 1023px) 92vw, 0px"
                            className="object-cover"
                          />
                        </motion.div>
                      </AnimatePresence>
                    </div>
                  )}

                  {/* Blog 헤더 */}
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-medium tracking-[0.08em] uppercase text-muted-foreground">
                      Blog
                    </span>
                    <a
                      href="https://brandofme.tistory.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-xs font-medium text-accent no-underline transition-all duration-200 hover:gap-1.5 focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2 focus-visible:rounded-sm"
                    >
                      블로그 바로가기
                      <ArrowUpRight className="w-3 h-3" />
                    </a>
                  </div>

                  <ul className="flex flex-col divide-y divide-border border-y border-border">
                    {posts.map((post, index) => (
                      <motion.li
                        key={post.id}
                        initial={{ opacity: 0, x: -12 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.06 }}
                      >
                        <a
                          href={post.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group flex items-center gap-3 py-3 text-[clamp(14px,1.4vw,16px)] font-medium text-foreground no-underline transition-all duration-200 hover:text-accent hover:pl-2 focus-visible:text-accent focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2 focus-visible:rounded-sm"
                          onMouseEnter={() =>
                            setHoveredPreview({
                              src: post.ogImage ?? FALLBACK_IMAGES.blog,
                              alt: post.title,
                              key: post.id,
                            })
                          }
                          onFocus={() =>
                            setHoveredPreview({
                              src: post.ogImage ?? FALLBACK_IMAGES.blog,
                              alt: post.title,
                              key: post.id,
                            })
                          }
                          onMouseLeave={() => setHoveredPreview(null)}
                          onBlur={() => setHoveredPreview(null)}
                        >
                          <ArrowUpRight className="w-3.5 h-3.5 shrink-0 text-muted-foreground/60 group-hover:text-accent group-focus-visible:text-accent transition-colors" />
                          <span className="break-keep">{post.title}</span>
                        </a>
                      </motion.li>
                    ))}
                  </ul>
                </motion.div>
              </AnimatePresence>
            )}
          </div>

          {/* Right: Image Preview — sticky, 스크롤 따라 컨텍스트 전환 */}
          <div className="hidden lg:block lg:col-span-2 self-stretch">
            <div className="sticky top-24">
              <div
                ref={imageRef}
                className="relative w-full aspect-16/10 rounded-xl overflow-hidden border border-border/60 bg-surface"
              >
                <AnimatePresence mode="wait">
                  {previewSrc ? (
                    <motion.div
                      key={previewKey}
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
                      className="flex items-center justify-center w-full h-full text-subtle-foreground text-sm tracking-wider"
                    >
                      프로젝트에 마우스를 올려보세요
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
