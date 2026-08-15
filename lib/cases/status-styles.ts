import type { Case } from "./types";

export const statusStyles: Record<Case["status"], string> = {
  SOLVED: "text-[var(--solved)] border-[var(--solved)]",
  PENDING: "text-[var(--verified)] border-[var(--verified)]",
  ONGOING: "text-[var(--classified)] border-[var(--classified)]",
};
