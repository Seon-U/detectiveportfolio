import ArchiveModalRoute from "@/components/archives/ArchiveModalRoute";
import { getArchiveById } from "@/lib/archives/queries";

export default async function ArchiveModalPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const archive = getArchiveById(id);

  if (!archive) return null;

  return <ArchiveModalRoute archive={archive} />;
}
