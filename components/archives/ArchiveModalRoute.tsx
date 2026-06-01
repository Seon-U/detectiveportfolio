"use client";

import { useRouter } from "next/navigation";
import ArchiveModal from "./ArchiveModal";
import type { Archive } from "@/lib/archives/types";

export default function ArchiveModalRoute({ archive }: { archive: Archive }) {
  const router = useRouter();
  return (
    <ArchiveModal
      isOpen={true}
      onClose={() => router.back()}
      archive={archive}
    />
  );
}
