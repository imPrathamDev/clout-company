"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
import Link from "next/link";
import React, { useMemo, useRef } from "react";

gsap.registerPlugin(useGSAP, SplitText);

function MobileMenu({
  isMobileMenuOpen,
  setIsMobileMenuOpen,
}: {
  isMobileMenuOpen: boolean;
  setIsMobileMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const containerRef = useRef(null);
  const menu = useMemo(() => {
    return [
      {
        href: "/",
        label: "Home",
      },
      {
        href: "/about",
        label: "Source Code",
      },
      {
        href: "/log",
        label: "Logs",
      },
    ];
  }, []);

  useGSAP(
    () => {
      SplitText.create(".mobile-nav-item", {
        type: "chars",
        charsClass: "char",
      });
      gsap.set(".char", {
        opacity: 0,
      });
    },
    {
      scope: containerRef,
    },
  );

  useGSAP(
    () => {
      const ms = document.querySelectorAll(".mobile-nav-item");
      if (isMobileMenuOpen) {
        gsap.to(containerRef.current, {
          clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
          duration: 1,
          ease: "power2.inOut",
        });

        ms.forEach((m, i) => {
          const chars = m.querySelectorAll(".char");
          gsap.to(chars, {
            opacity: 1,
            duration: 0.4,
            stagger: 0.1,
            ease: "power1.inOut",
            delay: i === 0 ? 0.2 : 0.3 * i,
          });
        });
      } else {
        gsap.to(containerRef.current, {
          clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)",
          duration: 0.4,
          ease: "power2.inOut",
          delay: 0.6,
        });

        ms.forEach((m, i) => {
          const chars = m.querySelectorAll(".char");
          gsap.to(chars, {
            opacity: 0,
            duration: 0.4,
            stagger: 0.1,
            ease: "power1.inOut",
            delay: 0.1 * i,
          });
        });
      }
    },
    {
      scope: containerRef,
      dependencies: [isMobileMenuOpen],
    },
  );

  return (
    <div
      ref={containerRef}
      className="fixed top-0 left-0 w-full h-full bg-background flex flex-col gap-4 z-100 overflow-hidden"
      style={{
        clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)",
      }}
    >
      <div className="flex-1 flex flex-col items-center justify-center gap-4">
        {menu.map((m) => (
          <Link
            key={m.href}
            href={m.href}
            className={`text-[56px] font-serif leading-[100%]`}
          >
            <span className="mobile-nav-item">{m.label}</span>
          </Link>
        ))}
      </div>

      <div className="pb-12 w-full flex items-center justify-center">
        <span className="text-sm font-medium text-center text-foreground/60">
          © The Clout Company by Crescent 2026
        </span>
      </div>
    </div>
  );
}

export default MobileMenu;
