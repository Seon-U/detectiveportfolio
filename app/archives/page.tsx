import ArchivesList from "@/components/archives/ArchivesList";
import { getArchivesByCategory, getPinnedArchive } from "@/lib/archives/queries";

export default function ArchivesPage() {
  const grouped = getArchivesByCategory();
  const pinned = getPinnedArchive();
  return <ArchivesList grouped={grouped} pinned={pinned} />;
}
