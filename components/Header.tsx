"use client";

import { motion } from "framer-motion";
import { Archive, Home, Map, Moon, Search, Sun } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

type HeaderProps = {
  className: string;
};

export default function Header({ className }: HeaderProps) {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setMounted(true);
  }, []);

  const navItems = [
    { name: "Lobby", path: "/", icon: Home },
    { name: "Case Files", path: "/cases", icon: Search },
    { name: "Archives", path: "/archives", icon: Archive },
  ];

  return (
    <header className={cn(className)}>
      <nav
        className={cn(
          "sticky top-0 z-40 border-b backdrop-blur-md transition-all duration-500",
          "text-nav-text hover:text-nav-text-hover",
        )}
      >
        <div className="mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Map className={cn("w-6 h-6 text-header-icon")} />
            <span
              className={cn(
                "font-serif font-bold text-xl tracking-wider text-header-title",
              )}
            >
              SeonuKim's Log
              {mounted && theme === "dark" && "of Wonder"}
            </span>
          </div>

          <div className="flex items-center space-x-8">
            <div className="hidden md:flex space-x-6">
              {navItems.map((item) => {
                const isActive = pathname === item.path;
                return (
                  <Link
                    key={item.path}
                    className={cn(
                      "flex items-center space-x-1.5 px-3 py-2 rounded-md text-sm font-medium transition-all duration-300 relative font-serif tracking-widest",
                      isActive
                        ? "text-nav-text-active"
                        : "text-nav-text hover:text-nav-text-hover",
                    )}
                    href={item.path}
                  >
                    <item.icon className="w-4 h-4" />
                    <span>{item.name}</span>
                    {isActive && (
                      <motion.div
                        layoutId="nav-indicator"
                        className={cn(
                          "absolute -bottom-[18px] left-0 right-0 h-1",
                          "bg-nav-indicator shadow-nav-indicator",
                        )}
                        transition={{
                          type: "spring",
                          stiffness: 300,
                          damping: 30,
                        }}
                      />
                    )}
                  </Link>
                );
              })}
            </div>
            {mounted && (
              <button
                type="button"
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className={cn(
                  "p-2 rounded-full transition-all duration-300 transform hover:scale-110 focus:outline-none",
                  "bg-theme-toggle-background text-theme-toggle-foreground",
                  "hover:bg-theme-toggle-hover-background hover:shadow-theme-toggle",
                )}
                aria-label="Toggle theme"
              >
                {mounted && theme === "dark" ? (
                  <Sun className="w-5 h-5" />
                ) : (
                  <Moon className="w-5 h-5" />
                )}
              </button>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
}
