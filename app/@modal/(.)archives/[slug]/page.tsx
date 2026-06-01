import { CaseModalRoute } from "@/components/CaseModalRoute";
import { ALLCASES } from "@/lib/cases/data";

export default async function CaseModalPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const caseData = ALLCASES.find((c) => c.id === id);

  if (!caseData) return null;

  return <CaseModalRoute caseData={caseData} />;
}
