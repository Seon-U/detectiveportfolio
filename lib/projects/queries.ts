import { ALL_PROJECTS } from "./data";
import type { Project } from "./types";

export function getAllProjects(): Project[] {
  return ALL_PROJECTS;
}

export function getProjectById(id: string): Project | undefined {
  return ALL_PROJECTS.find((p) => p.id === id);
}
