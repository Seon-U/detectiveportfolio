"use client";

import { useRouter } from "next/navigation";
import CaseModal from "@/components/CaseModal";
import type { Case } from "@/lib/cases/types";

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
