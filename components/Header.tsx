"use client";

import { AnimatePresence, motion } from "framer-motion";
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
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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
        {/* TOP ROW */}
        <div className="mx-auto h-16 px-4 sm:px-6 lg:px-8">
          <div className="flex h-full items-center justify-between">
            {/* LOGO */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              className="flex items-center space-x-2 md:pointer-events-none"
            >
              <Map className="h-6 w-6 text-header-icon" />

              <span
                className={cn(
                  "font-serif text-xl font-bold tracking-wider text-header-title",
                )}
              >
                SeonuKim's Log
              </span>
            </button>

            {/* RIGHT SIDE */}
            <div className="flex items-center gap-8">
              {/* DESKTOP NAV */}
              <div className="hidden md:flex items-center gap-6">
                {navItems.map((item) => {
                  const isActive = pathname === item.path;

                  return (
                    <Link
                      key={item.path}
                      href={item.path}
                      className={cn(
                        "relative flex items-center gap-1.5 rounded-md px-3 py-2",
                        "text-sm font-medium transition-all duration-300",
                        "font-serif tracking-widest",
                        isActive
                          ? "text-nav-text-active"
                          : "text-nav-text hover:text-nav-text-hover",
                      )}
                    >
                      <item.icon className="h-4 w-4" />

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

              {/* THEME TOGGLE */}
              {mounted && (
                <button
                  type="button"
                  onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                  className={cn(
                    "rounded-full p-2 transition-all duration-300",
                    "hover:scale-110 focus:outline-none",
                    "bg-theme-toggle-background text-theme-toggle-foreground",
                    "hover:bg-theme-toggle-hover-background",
                    "hover:shadow-theme-toggle",
                  )}
                  aria-label="Toggle theme"
                >
                  {theme === "dark" ? (
                    <Sun className="h-5 w-5" />
                  ) : (
                    <Moon className="h-5 w-5" />
                  )}
                </button>
              )}
            </div>
          </div>
        </div>

        {/* MOBILE NAV */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="overflow-hidden border-t md:hidden"
            >
              <div className="flex flex-wrap gap-3 px-4 py-4">
                {navItems.map((item) => {
                  const isActive = pathname === item.path;

                  return (
                    <Link
                      key={item.path}
                      href={item.path}
                      onClick={() => setMobileMenuOpen(false)}
                      className={cn(
                        "flex items-center gap-1.5 rounded-md px-3 py-2",
                        "text-sm font-medium transition-all duration-300",
                        "font-serif tracking-widest",
                        isActive
                          ? "text-nav-text-active"
                          : "text-nav-text hover:text-nav-text-hover",
                      )}
                    >
                      <item.icon className="h-4 w-4" />

                      <span>{item.name}</span>
                    </Link>
                  );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
}
