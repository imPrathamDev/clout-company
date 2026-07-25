import { useEffect, useState, RefObject } from "react";

export type NavbarTheme = "light" | "dark";

interface UseNavbarThemeOptions {
  navRef: RefObject<HTMLElement | null>;
  defaultTheme?: NavbarTheme;
}

export function useNavbarTheme({
  navRef,
  defaultTheme = "light",
}: UseNavbarThemeOptions): NavbarTheme {
  const [theme, setTheme] = useState<NavbarTheme>(defaultTheme);

  useEffect(() => {
    const navElement = navRef.current;
    if (!navElement) return;

    // Get the vertical middle of the navbar to set a precise trigger threshold
    const navRect = navElement.getBoundingClientRect();
    const navMiddle = navRect.top + navRect.height / 2;

    // Create a horizontal intersection band at the position of the navbar
    const rootMarginTop = -navMiddle;
    const rootMarginBottom = -(window.innerHeight - navMiddle - 1);
    const rootMargin = `${rootMarginTop}px 0px ${rootMarginBottom}px 0px`;

    // Track active sections overlapping the navbar
    const activeSections = new Map<Element, NavbarTheme>();

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const targetTheme =
            (entry.target.getAttribute("data-navbar-theme") as NavbarTheme) ||
            "light";

          if (entry.isIntersecting) {
            activeSections.set(entry.target, targetTheme);
          } else {
            activeSections.delete(entry.target);
          }
        });

        // Determine theme: if any active section is dark, switch to dark, otherwise light
        if (activeSections.size > 0) {
          const currentTheme = Array.from(activeSections.values()).pop();
          if (currentTheme) setTheme(currentTheme);
        } else {
          setTheme(defaultTheme);
        }
      },
      {
        root: null, // viewport
        rootMargin,
        threshold: 0,
      },
    );

    // Observe all elements with data-navbar-theme attribute
    const themedElements = document.querySelectorAll("[data-navbar-theme]");
    themedElements.forEach((el) => observer.observe(el));

    return () => {
      observer.disconnect();
    };
  }, [navRef, defaultTheme]);

  return theme;
}
