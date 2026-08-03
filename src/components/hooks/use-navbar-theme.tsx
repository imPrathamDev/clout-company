import { useEffect, useState, RefObject } from "react";

export type NavbarTheme = "light" | "dark";

interface UseNavbarThemeOptions {
  navRef: RefObject<HTMLElement | null>;
  defaultTheme?: NavbarTheme;
  pathname?: string; // pass usePathname() from the consumer
}

export function useNavbarTheme({
  navRef,
  defaultTheme = "light",
  pathname,
}: UseNavbarThemeOptions): NavbarTheme {
  const [theme, setTheme] = useState<NavbarTheme>(defaultTheme);

  useEffect(() => {
    const navElement = navRef.current;
    if (!navElement) return;

    // Reset to default whenever the route changes, before recomputing
    setTheme(defaultTheme);

    const navRect = navElement.getBoundingClientRect();
    const navMiddle = navRect.top + navRect.height / 2;

    const rootMarginTop = -navMiddle;
    const rootMarginBottom = -(window.innerHeight - navMiddle - 1);
    const rootMargin = `${rootMarginTop}px 0px ${rootMarginBottom}px 0px`;

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

        if (activeSections.size > 0) {
          const currentTheme = Array.from(activeSections.values()).pop();
          if (currentTheme) setTheme(currentTheme);
        } else {
          setTheme(defaultTheme);
        }
      },
      {
        root: null,
        rootMargin,
        threshold: 0,
      },
    );

    // Re-query the DOM fresh — the new page has different themed elements
    const themedElements = document.querySelectorAll("[data-navbar-theme]");
    themedElements.forEach((el) => observer.observe(el));

    return () => {
      observer.disconnect();
    };
  }, [navRef, defaultTheme, pathname]); // <-- pathname added

  return theme;
}
