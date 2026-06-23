import ArchivesList from "@/components/archives/ArchivesList";
import { getArchivesByCategory, getPinnedArchive } from "@/lib/archives/queries";
import { buildMetadata } from "@/lib/seo/metadata";

export const metadata = buildMetadata({
  title: "Archives",
  description: "학습 노트와 실험 기록 아카이브.",
  path: "/archives",
});

export default function ArchivesPage() {
  const grouped = getArchivesByCategory();
  const pinned = getPinnedArchive();
  return <ArchivesList grouped={grouped} pinned={pinned} />;
}
