import { ALLCASES } from "./data";
import type { Case } from "./types";

export function getAllCases(): Case[] {
  return ALLCASES;
}

export function getCaseById(id: string): Case | undefined {
  return ALLCASES.find((c) => c.id === id);
}
