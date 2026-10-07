import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getDictionary } from "@/app/[lang]/dictionaries";
import ProjectList from "@/components/projects/ProjectList";
import { hasLocale } from "@/lib/i18n/config";
import { getAllProjects } from "@/lib/projects/queries";
import { buildMetadata } from "@/lib/seo/metadata";

export async function generateMetadata({
  params,
}: PageProps<"/[lang]/projects">): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = await getDictionary(lang);
  return buildMetadata({
    title: dict.metadata.projects.title,
    description: dict.metadata.projects.description,
    path: `/${lang}/projects`,
  });
}

export default async function ProjectsPage({
  params,
}: PageProps<"/[lang]/projects">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();

  const projects = getAllProjects();
  return <ProjectList projects={projects} lang={lang} />;
}
