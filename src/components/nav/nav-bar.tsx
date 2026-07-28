"use client";

import React, { Fragment, useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useNavbarTheme } from "../hooks/use-navbar-theme";
import MobileMenu from "./mobile-menu";

const Button = () => {
  return (
    <button className="flex gap-4">
      <div>
        <a
          className="inline-flex justify-center whitespace-nowrap rounded-lg px-3.5 py-2.5 text-sm font-medium text-slate-200 dark:text-slate-800 bg-gradient-to-r from-slate-800 to-slate-700 dark:from-slate-200 dark:to-slate-100 dark:hover:bg-slate-100 shadow focus:outline-none focus:ring focus:ring-slate-500/50 focus-visible:outline-none focus-visible:ring focus-visible:ring-slate-500/50 relative before:absolute before:inset-0 before:rounded-[inherit] before:bg-[linear-gradient(45deg,transparent_25%,theme(colors.white/.5)_50%,transparent_75%,transparent_100%)] dark:before:bg-[linear-gradient(45deg,transparent_25%,theme(colors.white)_50%,transparent_75%,transparent_100%)] before:bg-[length:250%_250%,100%_100%] before:bg-[position:200%_0,0_0] before:bg-no-repeat before:[transition:background-position_0s_ease] hover:before:bg-[position:-100%_0,0_0] hover:before:duration-[1500ms]"
          href="#0"
        >
          Available For Work
        </a>
      </div>
      <div className="dark">
        <a
          className="inline-flex justify-center whitespace-nowrap rounded-lg px-3.5 py-2.5 text-sm font-medium text-slate-200 dark:text-slate-800 bg-gradient-to-r from-slate-800 to-slate-700 dark:from-slate-200 dark:to-slate-100 dark:hover:bg-slate-100 shadow focus:outline-none focus:ring focus:ring-slate-500/50 focus-visible:outline-none focus-visible:ring focus-visible:ring-slate-500/50 relative before:absolute before:inset-0 before:rounded-[inherit] before:bg-[linear-gradient(45deg,transparent_25%,theme(colors.white/.2)_50%,transparent_75%,transparent_100%)] dark:before:bg-[linear-gradient(45deg,transparent_25%,theme(colors.white)_50%,transparent_75%,transparent_100%)] before:bg-[length:250%_250%,100%_100%] before:bg-[position:200%_0,0_0] before:bg-no-repeat before:[transition:background-position_0s_ease] hover:before:bg-[position:-100%_0,0_0] hover:before:duration-[1500ms]"
          href="#0"
        >
          Available For Work
        </a>
      </div>
    </button>
  );
};

export const Navbar: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);
  const theme = useNavbarTheme({ navRef, defaultTheme: "light" });

  return (
    <Fragment>
      <nav
        ref={navRef}
        className="fixed top-0 lg:top-4 left-0 lg:left-1/2 lg:-translate-x-1/2 z-[112] w-full lg:max-w-fit mx-auto lg:rounded-[12px] transition-all duration-[250ms] ease-[cubic-bezier(0.4,0,0.2,1)] will-change-[background-color,border-color,box-shadow,backdrop-filter] lg:border border-white/20 bg-gradient-to-r from-[rgba(249,250,247,0.12)] to-[rgba(249,250,247,0.18)] lg:shadow-[0_2px_6px_0_rgba(0,0,0,0.15)] backdrop-blur-[9px]"
      >
        <div className="flex gap-6 items-center px-5 py-3 lg:px-3 lg:py-2 w-full justify-between">
          {/* Brand Logo */}
          <Link href="/" className="group">
            <div
              className={`relative w-[34px] h-[34px] transition-all duration-[250ms] ease-[cubic-bezier(0.4,0,0.2,1)] flex-shrink-0 overflow-hidden rounded-lg border ${theme === "dark" ? "border-background/20" : "border-[#9c7238]/20"}`}
            >
              <Image
                src={"/assets/images/logo/logo.png"}
                alt="Logo"
                width={34}
                height={34}
                // Add w-auto and h-auto here 👇
                className="object-contain w-auto h-auto"
              />
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden gap-6 items-center lg:flex">
            {[
              { label: "Source code", href: "/about" },
              { label: "Logs", href: "/log" },
            ].map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className={`font-medium text-[15px] leading-[140%] tracking-[-0.15px] hover:opacity-80 transition-all duration-[250ms] ease-[cubic-bezier(0.4,0,0.2,1)] ${theme === "dark" ? "text-background" : "text-foreground"}`}
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* Right CTA Actions */}
          <div className="flex gap-4 items-center lg:gap-6">
            <div className="flex gap-2 items-center">
              <Link href="/contact">
                <button
                  className="inline-flex items-center justify-center whitespace-nowrap font-medium outline-none focus-visible:ring-[3px] focus-visible:ring-white/20 cursor-pointer group border border-[#282834] rounded-lg gap-2 text-white hover:opacity-90 transition-opacity h-9 px-4 py-2 pr-3 text-[15px] tracking-[-0.15px] leading-[140%] before:absolute before:inset-0 before:rounded-[inherit] before:bg-[linear-gradient(45deg,transparent_25%,theme(colors.white/.5)_50%,transparent_75%,transparent_100%)] dark:before:bg-[linear-gradient(45deg,transparent_25%,theme(colors.white)_50%,transparent_75%,transparent_100%)] before:bg-[length:250%_250%,100%_100%] before:bg-[position:200%_0,0_0] relative before:bg-no-repeat before:[transition:background-position_0s_ease] hover:before:bg-[position:-100%_0,0_0] hover:before:duration-[1500ms]"
                  style={{
                    background:
                      "linear-gradient(90deg, rgba(255, 255, 255, 0.00) 0%, rgba(255, 255, 255, 0.12) 100%), #1F1F29",
                  }}
                >
                  enter the chat
                  {/* Micro Arrow Badge */}
                  <div
                    className="flex items-center justify-center w-3 h-4 pl-[2.5px] pr-[1.5px] py-0 rounded-[50px] border leading-none"
                    style={{
                      borderColor: "rgba(255,255,255,0.24)",
                      background:
                        "linear-gradient(0deg, rgba(255, 255, 255, 0.16) 0%, rgba(255, 255, 255, 0.08) 100%)",
                      boxShadow: "0 1.01px 1.01px 0 rgba(0, 0, 0, 0.04)",
                    }}
                  >
                    <div className="relative w-full h-full overflow-hidden flex items-center justify-center">
                      <div className="relative overflow-hidden flex items-center justify-center w-[7px] h-[10px]">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="7"
                          height="10"
                          viewBox="0 0 7 10"
                          fill="none"
                          className="transition-transform duration-500 group-hover:animate-[slideOut_0.8s_linear_infinite]"
                        >
                          <rect
                            x="3.94922"
                            y="4.29102"
                            width="1.41526"
                            height="1.41526"
                            fill="currentColor"
                          />
                          <rect
                            x="1.13281"
                            y="1.47021"
                            width="1.41526"
                            height="1.41526"
                            fill="currentColor"
                          />
                          <rect
                            x="1.13281"
                            y="7.11426"
                            width="1.41526"
                            height="1.41526"
                            fill="currentColor"
                          />
                          <rect
                            x="2.53125"
                            y="2.87549"
                            width="1.41526"
                            height="4.24579"
                            fill="currentColor"
                          />
                        </svg>
                      </div>
                    </div>
                  </div>
                </button>
              </Link>
            </div>

            {/* Mobile Hamburger Toggle Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`flex relative flex-col justify-center items-center w-9 h-9 rounded-lg backdrop-blur-sm focus:outline-none focus:ring-1 focus:ring-neutral-100 focus:ring-offset-2 group cursor-pointer lg:hidden border ${theme === "dark" ? "border-background/20" : "border-foreground/20"}`}
              aria-label="Toggle menu"
              aria-expanded={isMobileMenuOpen}
            >
              <span
                className={`block w-3.5 h-[1px] rounded-full transition-all duration-200 ease-in-out origin-center ${theme === "dark" ? "bg-background" : "bg-foreground"} ${
                  isMobileMenuOpen
                    ? "rotate-45 translate-y-[5px]"
                    : "rotate-0 translate-y-0"
                }`}
              />
              <span
                className={`block w-3.5 h-[1px] rounded-full transition-all duration-150 ease-in-out mt-1 ${theme === "dark" ? "bg-background" : "bg-foreground"} ${
                  isMobileMenuOpen
                    ? "opacity-0 scale-0"
                    : "opacity-100 scale-100"
                }`}
              />
              <span
                className={`block w-3.5 h-[1px] rounded-full transition-all duration-200 ease-in-out origin-center mt-1 ${theme === "dark" ? "bg-background" : "bg-foreground"} ${
                  isMobileMenuOpen
                    ? "-rotate-45 -translate-y-[5px]"
                    : "rotate-0 translate-y-0"
                }`}
              />
            </button>
          </div>
        </div>

        {/* Mobile Drawer Navigation Links */}
        {/* {isMobileMenuOpen && (
        <div className="lg:hidden flex flex-col gap-4 px-5 pb-4 pt-2 border-t border-white/10">
          <Link
            href="/about"
            onClick={() => setIsMobileMenuOpen(false)}
            className="font-medium text-[15px] font-af text-white hover:opacity-80 transition-opacity"
          >
            About
          </Link>
          <Link
            href="/writing"
            onClick={() => setIsMobileMenuOpen(false)}
            className="font-medium text-[15px] font-af text-white hover:opacity-80 transition-opacity"
          >
            Writing
          </Link>
          <Link
            href="/careers"
            onClick={() => setIsMobileMenuOpen(false)}
            className="font-medium text-[15px] font-af text-white hover:opacity-80 transition-opacity"
          >
            Careers
          </Link>
        </div>
      )} */}
      </nav>

      <MobileMenu
        isMobileMenuOpen={isMobileMenuOpen}
        setIsMobileMenuOpen={setIsMobileMenuOpen}
      />
    </Fragment>
  );
};

export default Navbar;
