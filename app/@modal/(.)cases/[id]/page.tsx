import CaseModalRoute from "@/components/cases/CaseModalRoute";
import { getCaseById } from "@/lib/cases/queries";

export default async function CaseModalPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const caseData = getCaseById(id);

  if (!caseData) return null;

  return <CaseModalRoute caseData={caseData} />;
}
