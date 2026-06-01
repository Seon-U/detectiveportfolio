import { ALL_ARCHIVES } from "./data";
import type { Archive } from "./types";

export function getAllArchives(): Archive[] {
  return ALL_ARCHIVES;
}

export function getArchiveById(id: string): Archive | undefined {
  return ALL_ARCHIVES.find((a) => a.id === id);
}
