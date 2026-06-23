import type { Metadata } from "next";
import { notFound } from "next/navigation";
import CaseDetail from "@/components/cases/CaseDetail";
import { getAllCases, getCaseById } from "@/lib/cases/queries";
import { buildMetadata } from "@/lib/seo/metadata";

// 빌드 시 모든 케이스 경로를 정적 생성하고, 그 외 id는 404 처리
export const dynamicParams = false;

export function generateStaticParams() {
  return getAllCases().map((c) => ({ id: c.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const caseData = getCaseById(id);

  if (!caseData) notFound();

  return buildMetadata({
    title: caseData.title,
    description: caseData.description ?? caseData.summary,
    path: `/cases/${caseData.id}`,
    image: caseData.image,
    type: "article",
    keywords: caseData.tags,
  });
}

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
