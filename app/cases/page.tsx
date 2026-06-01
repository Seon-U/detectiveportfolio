import CaseFilesList from "@/components/cases/CaseFilesList";
import { getAllCases } from "@/lib/cases/queries";

export default function CaseFilesPage() {
  const cases = getAllCases();
  return <CaseFilesList cases={cases} />;
}
