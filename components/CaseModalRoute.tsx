"use client";

import { useRouter } from "next/navigation";
import type { Case } from "@/lib/cases/data";
import CaseModal from "@/components/CaseModal";

export function CaseModalRoute({ caseData }: { caseData: Case }) {
  const router = useRouter();
  return (
    <CaseModal
      isOpen={true}
      onClose={() => router.back()}
      caseData={caseData}
    />
  );
}
