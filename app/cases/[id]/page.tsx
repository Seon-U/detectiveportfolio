import { notFound } from "next/navigation";
import CaseDetail from "@/components/cases/CaseDetail";
import { getCaseById } from "@/lib/cases/queries";

export default async function CaseDetailRoute({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const caseData = getCaseById(id);

  if (!caseData) notFound();

  return <CaseDetail caseData={caseData} />;
}
