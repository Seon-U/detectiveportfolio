import { notFound } from "next/navigation";
import ArchiveDetail from "@/components/archives/ArchiveDetail";
import { getArchiveById } from "@/lib/archives/queries";

export default async function ArchiveDetailRoute({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const archive = getArchiveById(id);

  if (!archive) notFound();

  return <ArchiveDetail archive={archive} />;
}
