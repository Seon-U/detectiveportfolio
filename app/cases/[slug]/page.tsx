import { ALLCASES } from "@/lib/cases/data";
import { CaseDetailPage } from "@/components/CaseDetailPage";
import { notFound } from "next/navigation";

export default async function CaseDetailRoute({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const caseData = ALLCASES.find((c) => c.id === slug);

  if (!caseData) notFound();

  return <CaseDetailPage caseData={caseData} />;
}
