import ProjectList from "@/components/projects/ProjectList";
import { getAllProjects } from "@/lib/projects/queries";
import { buildMetadata } from "@/lib/seo/metadata";

export const metadata = buildMetadata({
  title: "Projects",
  description: "진행하거나 해결한 프로젝트 모음.",
  path: "/projects",
});

export default function ProjectsPage() {
  const projects = getAllProjects();
  return <ProjectList projects={projects} />;
}
