"use client";

import type { RoleId } from "@/lib/roles/types";
import { ROLES } from "@/lib/roles/data";
import { cn } from "@/lib/utils";

type Props = {
  sections: { id: string; heading: string }[];
  activeId: string;
  onSelect: (id: string) => void;
  /** 이 프로젝트가 가진 역할 목록 */
  availableRoles: RoleId[];
  /** 현재 선택된 역할 (undefined = 전체) */
  selectedRole?: RoleId;
  onRoleChange: (role: RoleId | undefined) => void;
};

/**
 * Role 필터 + 섹션 프로그레스 바.
 * 와이어프레임 기준 sticky로 사용.
 */
export default function SectionNav({
  sections,
  activeId,
  onSelect,
  availableRoles,
  selectedRole,
  onRoleChange,
}: Props) {
  return (
    <div className="space-y-0">
      {/* ── Role filter chips ── */}
      {availableRoles.length > 1 && (
        <div className="flex items-center gap-2 py-2 overflow-x-auto hide-scrollbar">
          <button
            type="button"
            onClick={() => onRoleChange(undefined)}
            className={cn(
              "shrink-0 px-3 py-1 text-xs font-medium font-pretendard rounded-md border transition-colors",
              selectedRole === undefined
                ? "bg-accent/10 border-accent text-accent"
                : "border-border text-muted-foreground hover:border-foreground/30 hover:text-foreground",
            )}
          >
            전체
          </button>
          {availableRoles.map((roleId) => {
            const role = ROLES.find((r) => r.id === roleId);
            if (!role) return null;
            return (
              <button
                key={roleId}
                type="button"
                onClick={() =>
                  onRoleChange(selectedRole === roleId ? undefined : roleId)
                }
                className={cn(
                  "shrink-0 px-3 py-1 text-xs font-medium font-pretendard rounded-md border transition-colors",
                  selectedRole === roleId
                    ? "bg-accent/10 border-accent text-accent"
                    : "border-border text-muted-foreground hover:border-foreground/30 hover:text-foreground",
                )}
              >
                {role.label}
              </button>
            );
          })}
        </div>
      )}

      {/* ── Section tabs (flex-1 균등 분할) ── */}
      <nav className="flex overflow-x-auto hide-scrollbar">
        {sections.map((s) => {
          const isActive = s.id === activeId;
          return (
            <button
              key={s.id}
              type="button"
              onClick={() => onSelect(s.id)}
              className={cn(
                "flex-1 min-w-0 px-3 py-2.5 font-pretendard text-xs transition-colors relative text-center truncate",
                isActive
                  ? "text-primary font-bold"
                  : "text-muted-foreground hover:text-foreground",
              )}
            >
              <span className="truncate">{s.heading}</span>
              {/* progress indicator bar */}
              <span
                className={cn(
                  "absolute bottom-0 left-0 right-0 h-0.5 rounded-full transition-colors",
                  isActive ? "bg-primary" : "bg-border",
                )}
              />
            </button>
          );
        })}
      </nav>
    </div>
  );
}
