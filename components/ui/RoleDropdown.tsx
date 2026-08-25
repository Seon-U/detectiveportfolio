"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import type { Role } from "@/lib/roles/types";
import { cn } from "@/lib/utils";
import styles from "./role-dropdown.module.css";

export default function RoleDropdown({
  roles,
  selectedRoleId,
  onSelect,
}: {
  roles: Role[];
  selectedRoleId: string;
  onSelect: (roleId: string) => void;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLSpanElement>(null);

  const selectedRole = roles.find((r) => r.id === selectedRoleId) ?? roles[0];

  /* 드롭다운 외부 클릭 시 닫기 */
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === "Escape") setIsOpen(false);
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      setIsOpen((prev) => !prev);
    }
  }, []);

  const handleSelect = useCallback(
    (roleId: string) => {
      onSelect(roleId);
      setIsOpen(false);
    },
    [onSelect],
  );

  return (
    <span ref={dropdownRef} className="relative inline-block align-middle">
      <button
        type="button"
        className={styles.dropdownTrigger}
        onClick={() => setIsOpen((prev) => !prev)}
        onKeyDown={handleKeyDown}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
      >
        {selectedRole.label}
        <ChevronDown
          className={cn(styles.chevron, isOpen && styles.chevronOpen)}
        />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.ul
            className={styles.dropdownMenu}
            role="listbox"
            aria-label="직무 선택"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.15 }}
          >
            {roles.map((role) => (
              <li
                key={role.id}
                role="option"
                aria-selected={role.id === selectedRoleId}
                className={cn(
                  styles.dropdownItem,
                  role.id === selectedRoleId && styles.dropdownItemActive,
                )}
                onClick={() => handleSelect(role.id)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    handleSelect(role.id);
                  }
                }}
                tabIndex={0}
              >
                {role.label}
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </span>
  );
}
