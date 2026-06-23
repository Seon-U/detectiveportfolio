import type { Case } from "./types";

export const statusStyles: Record<Case["status"], string> = {
  SOLVED: "text-[hsl(var(--solved))] border-[hsl(var(--solved))]",
  PENDING: "text-[hsl(var(--verified))] border-[hsl(var(--verified))]",
  ONGOING: "text-[hsl(var(--classified))] border-[hsl(var(--classified))]",
};
