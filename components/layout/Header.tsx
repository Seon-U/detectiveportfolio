"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Archive, Home, Menu, Moon, Search, Sun, X } from "lucide-react";
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
  const isHome = pathname === "/";

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
          "sticky top-0 z-40 backdrop-blur-md transition-all duration-500",
          "bg-background/70 dark:bg-background/60",
          "text-nav-text hover:text-nav-text-hover",
        )}
      >
        {/* TOP ROW */}
        <div className="mx-auto h-16 px-4 sm:px-6 lg:px-8">
          <div className="flex h-full items-center justify-between">
            {/* LOGO */}
            <Link
              href="/"
              className={cn(
                "flex items-center space-x-2",
                isHome && "pointer-events-none cursor-default",
              )}
            >
              <span
                className={cn(
                  "font-serif text-xl font-bold tracking-wider text-header-title",
                )}
              >
                SWK.DEV
              </span>
            </Link>

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
                        "text-sm font-semibold transition-all duration-300",
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
                            "absolute -bottom-4.5 left-0 right-0 h-1",
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
                  {mounted && theme === "dark" ? (
                    <Sun className="h-5 w-5" />
                  ) : (
                    <Moon className="h-5 w-5" />
                  )}
                </button>
              )}

              {/* MOBILE HAMBURGER */}
              <button
                type="button"
                onClick={() => setMobileMenuOpen((prev) => !prev)}
                className={cn(
                  "md:hidden rounded-full p-2 transition-all duration-300",
                  "hover:scale-110 focus:outline-none",
                  "bg-theme-toggle-background text-theme-toggle-foreground",
                  "hover:bg-theme-toggle-hover-background",
                  "hover:shadow-theme-toggle",
                )}
                aria-label="Toggle mobile menu"
                aria-expanded={mobileMenuOpen}
              >
                <AnimatePresence mode="wait" initial={false}>
                  {mobileMenuOpen ? (
                    <motion.span
                      key="close"
                      initial={{ rotate: -90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: 90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="block"
                    >
                      <X className="h-5 w-5" />
                    </motion.span>
                  ) : (
                    <motion.span
                      key="menu"
                      initial={{ rotate: 90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: -90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="block"
                    >
                      <Menu className="h-5 w-5" />
                    </motion.span>
                  )}
                </AnimatePresence>
              </button>
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
              className="overflow-hidden md:hidden"
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
                        "text-sm font-semibold transition-all duration-300",
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
