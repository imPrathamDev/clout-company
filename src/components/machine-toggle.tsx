"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useRef, useEffect } from "react";
import { useNavbarTheme } from "./hooks/use-navbar-theme";

function MachineToggle() {
  const pathname = usePathname();
  const navRef = useRef<HTMLDivElement>(null);
  const theme = useNavbarTheme({ navRef, defaultTheme: "light" });

  // This will run every time the URL changes
  useEffect(() => {
    // If useNavbarTheme exposes a recalculate or reset function, call it here.
    // Example: theme.recalculate()

    // Or just use this block to reset any local state you might add.
    console.log("Page changed to:", pathname);
  }, [pathname]); // <-- pathname as a dependency

  return (
    <div
      ref={navRef}
      className="fixed right-8 bottom-12 w-fit flex items-center gap-2 text-[16px] font-medium"
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
