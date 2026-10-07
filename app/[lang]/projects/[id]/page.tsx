import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getDictionary } from "@/app/[lang]/dictionaries";
import ProjectHero from "@/components/projects/layout/ProjectHero";
import ProjectDetail from "@/components/projects/ProjectDetail";
import JsonLd from "@/components/seo/JsonLd";
import { hasLocale } from "@/lib/i18n/config";
import { getProjectById, getProjectIds } from "@/lib/projects/queries";
import { buildCreativeWorkJsonLd } from "@/lib/seo/jsonld";
import { buildMetadata } from "@/lib/seo/metadata";

// 빌드 시 모든 프로젝트 경로를 정적 생성하고, 그 외 id는 404 처리
export const dynamicParams = false;

export function generateStaticParams() {
  return getProjectIds().map((id) => ({ id }));
}

export async function generateMetadata({
  params,
}: PageProps<"/[lang]/projects/[id]">): Promise<Metadata> {
  const { lang, id } = await params;
  if (!hasLocale(lang)) notFound();
  const projectData = getProjectById(id, lang);

  if (!projectData) notFound();

  return buildMetadata({
    title: projectData.title,
    description: projectData.description,
    path: `/${lang}/projects/${projectData.id}`,
    image: projectData.image,
    type: "article",
    keywords: projectData.tags,
  });
}

export default async function ProjectDetailRoute({
  params,
}: PageProps<"/[lang]/projects/[id]">) {
  const { lang, id } = await params;
  if (!hasLocale(lang)) notFound();

  const projectData = getProjectById(id, lang);
  if (!projectData) notFound();

  const dict = await getDictionary(lang);

  return (
    <>
      <JsonLd
        data={buildCreativeWorkJsonLd({
          name: projectData.title,
          description: projectData.description,
          path: `/${lang}/projects/${projectData.id}`,
          image: projectData.image,
          datePublished: projectData.lastModified,
          keywords: projectData.tags,
        })}
      />
      <div className="max-w-6xl mx-auto px-4">
        <ProjectHero
          projectData={projectData}
          lang={lang}
          dict={{
            viewAllProjects: dict.common.viewAllProjects,
            teamSize: dict.projectDetail.teamSize,
          }}
        />
        <ProjectDetail projectData={projectData} lang={lang} />
      </div>
    </>
  );
}
