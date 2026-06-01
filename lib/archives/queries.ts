import { ALL_ARCHIVES } from "./data";
import type { Archive, ArchiveCategory } from "./types";

export function getAllArchives(): Archive[] {
  return ALL_ARCHIVES;
}

export function getArchiveById(id: string): Archive | undefined {
  return ALL_ARCHIVES.find((a) => a.id === id);
}

export function getArchivesByCategory(): Record<ArchiveCategory, Archive[]> {
  const all = getAllArchives();
  return {
    Notes: all.filter((a) => a.category === "Notes"),
    Experiments: all.filter((a) => a.category === "Experiments"),
  };
}

export function getPinnedArchive(): Archive | undefined {
  return getAllArchives().find((a) => a.pinnedQuote !== undefined);
}
