"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useRef } from "react";
import { useNavbarTheme } from "./hooks/use-navbar-theme";

function MachineToggle() {
  const pathname = usePathname();
  const navRef = useRef<HTMLDivElement>(null);
  const theme = useNavbarTheme({ navRef, defaultTheme: "light", pathname });

  if (pathname?.startsWith("/studio")) return null;

  return (
    <div
      ref={navRef}
      className="fixed left-8 md:left-10 bottom-9 md:bottom-12 w-fit flex items-center gap-2 text-[14px] lg:text-[16px] font-medium z-1000"
    >
      <Link
        href={"/"}
        className={`hover:underline ${pathname === "/machine" ? "" : "underline"} ${theme === "dark" || pathname === "/machine" ? "text-background hover:text-background/70" : "text-foreground hover:text-foreground/70"} transition-colors duration-300`}
      >
        HUMAN
      </Link>
      <span
        className={`${theme === "dark" || pathname === "/machine" ? "text-background" : "text-foreground"}`}
      >
        /
      </span>
      <Link
        href={"/machine"}
        className={`hover:underline ${pathname === "/machine" ? "underline" : ""} ${theme === "dark" || pathname === "/machine" ? "text-background hover:text-background/70" : "text-foreground hover:text-foreground/70"} transition-colors duration-300`}
      >
        MACHINE
      </Link>
    </div>
  );
}

export default MachineToggle;
