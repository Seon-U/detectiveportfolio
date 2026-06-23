import CaseFilesList from "@/components/cases/CaseFilesList";
import { getAllCases } from "@/lib/cases/queries";
import { buildMetadata } from "@/lib/seo/metadata";

export const metadata = buildMetadata({
  title: "Case Files",
  description: "진행하거나 해결한 프로젝트 케이스 파일 모음.",
  path: "/cases",
});

export default function CaseFilesPage() {
  const cases = getAllCases();
  return <CaseFilesList cases={cases} />;
}
