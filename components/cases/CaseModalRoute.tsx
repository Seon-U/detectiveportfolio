"use client";

import { useRouter } from "next/navigation";
import CaseModal from "./CaseModal";
import type { Case } from "@/lib/cases/types";

export default function CaseModalRoute({ caseData }: { caseData: Case }) {
  const router = useRouter();
  return (
    <CaseModal
      isOpen={true}
      onClose={() => router.back()}
      caseData={caseData}
    />
  );
}
