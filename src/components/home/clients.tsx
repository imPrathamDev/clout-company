"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import Image from "next/image";
import React, { useCallback, useRef, useState } from "react";
import { SmoothCounter } from "./smooth-counter";
import { ClientLogo } from "@/sanity/queries/clinetsLogo";

gsap.registerPlugin(useGSAP);

// const logos = [
//   "logo1.png",
//   "logo2.png",
//   // "logo3.png",
//   "logo4.png",
//   "logo5.png",
//   "logo6.png",
//   "logo7.png",
//   "logo8.png",
//   "logo9.png",
//   "logo10.png",
// ];

const GRID_SIZE = 5;
const CYCLE_INTERVAL = 5000; // fires every 5s
const MIN_SWAPS = 2; // how many slots change per cycle
const MAX_SWAPS = 4;
const STAGGER_WINDOW = 2400; // ms - swaps inside a cycle are spread across this window
type Slot = { slotId: number; logo: string };

function shuffleArray<T>(arr: T[]) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function Clients({ clientLogos }: { clientLogos: ClientLogo[] }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const imgWrapRefs = useRef<(HTMLDivElement | null)[]>([]);
  const animatingSlots = useRef<Set<number>>(new Set());
  const pendingLogos = useRef<Map<number, string>>(new Map()); // slotId -> logo reserved but not yet committed
  const hasMounted = useRef(false);

  // Deterministic initial order — identical on server & client.
  const [slots, setSlots] = useState<Slot[]>(() =>
    clientLogos
      .slice(0, GRID_SIZE)
      .map((logo, i) => ({ slotId: i, logo: logo.logoUrl })),
  );

  // always-fresh snapshot for interval/timeout closures
  const slotsRef = useRef(slots);
  slotsRef.current = slots;

  const swapSlot = useCallback((slotId: number) => {
    if (animatingSlots.current.has(slotId)) return;

    const el = imgWrapRefs.current[slotId];
    if (!el) return;

    const currentLogos = slotsRef.current.map((s) => s.logo);
    const reservedLogos = Array.from(pendingLogos.current.values());
    const pool = clientLogos.filter(
      (l) =>
        !currentLogos.includes(l.logoUrl) && !reservedLogos.includes(l.logoUrl),
    );
    if (pool.length === 0) return;

    const nextLogo = pool[Math.floor(Math.random() * pool.length)];

    animatingSlots.current.add(slotId);
    pendingLogos.current.set(slotId, nextLogo.logoUrl); // reserve it right away

    const tl = gsap.timeline({
      onComplete: () => {
        animatingSlots.current.delete(slotId);
        pendingLogos.current.delete(slotId); // release the reservation
      },
    });

    tl.to(el, {
      y: -14,
      opacity: 0,
      filter: "blur(5px)",
      duration: 0.5,
      ease: "power2.in",
      onComplete: () => {
        setSlots((prev) =>
          prev.map((s) =>
            s.slotId === slotId ? { ...s, logo: nextLogo.logoUrl } : s,
          ),
        );
      },
    })
      .set(el, { y: 14 })
      .to(el, {
        y: 0,
        opacity: 1,
        filter: "blur(0px)",
        duration: 0.75,
        ease: "expo.out",
        delay: 0.04,
      });
  }, []);

  useGSAP(
    () => {
      // First real shuffle happens client-side only, after hydration
      if (!hasMounted.current) {
        hasMounted.current = true;
        setSlots(
          shuffleArray(clientLogos)
            .slice(0, GRID_SIZE)
            .map((logo, i) => ({ slotId: i, logo: logo.logoUrl })),
        );
      }

      const runCycle = () => {
        // Detect if mobile (so we don't swap slots that are hidden via CSS)
        const isMobile = window.innerWidth < 768;
        const activeSlotIds = slotsRef.current
          .filter((_, i) => (isMobile ? i < 4 : true))
          .map((s) => s.slotId);

        // Adjust max possible swaps if mobile grid only shows 4 items
        const maxPossibleSwaps = Math.min(MAX_SWAPS, activeSlotIds.length);
        const minPossibleSwaps = Math.min(MIN_SWAPS, activeSlotIds.length);

        const swapCount =
          minPossibleSwaps +
          Math.floor(Math.random() * (maxPossibleSwaps - minPossibleSwaps + 1));

        const targetSlotIds = shuffleArray(activeSlotIds).slice(0, swapCount);

        targetSlotIds.forEach((slotId) => {
          const delay = Math.random() * STAGGER_WINDOW;
          gsap.delayedCall(delay / 1000, () => swapSlot(slotId));
        });
      };

      // FIX: Use GSAP's delayedCall loop instead of setInterval to prevent mobile browser throttling.
      let cycleTimer: gsap.core.Tween;
      const startLoop = () => {
        runCycle();
        cycleTimer = gsap.delayedCall(CYCLE_INTERVAL / 1000, startLoop);
      };

      // slight offset so the first cycle doesn't collide with the mount shuffle
      const firstCycle = gsap.delayedCall(0.6, startLoop);

      return () => {
        firstCycle.kill();
        if (cycleTimer) cycleTimer.kill();
      };
    },
    // FIX: Added `dependencies: []` so this hook doesn't endlessly reboot every time a logo swaps!
    { scope: containerRef, dependencies: [] },
  );

  return (
    <section
      ref={containerRef}
      className="py-16 md:py-24 px-4 flex flex-col items-center justify-center gap-8 md:gap-4"
    >
      <div className="w-full max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-5 gap-3 md:gap-4">
        {slots.map((slot, index) => (
          <div
            key={slot.slotId}
            // Hide items beyond index 3 on mobile directly through CSS
            className={`cursor-pointer group relative items-center justify-center p-4 md:p-5 rounded-xl bg-[#f8f9f5] border border-[#e8ece0] transition-all duration-300 hover:border-[#383a35]/20 hover:shadow-sm ${
              index >= 4 ? "hidden md:flex" : "flex"
            }`}
          >
            {/* Client Logo Slot */}
            <div
              ref={(el) => {
                imgWrapRefs.current[slot.slotId] = el;
              }}
              // Scaled down width for mobile (w-16) to ensure cards look well-proportioned
              className="w-16 md:w-20 lg:w-24 aspect-3/2 flex items-center justify-center will-change-[filter,transform,opacity]"
            >
              <Image
                src={slot.logo}
                alt={slot.logo.split(".")[0] || "Client logo"}
                width={200}
                height={80}
                className="max-h-full max-w-full object-contain"
              />
            </div>
          </div>
        ))}
      </div>
      <SmoothCounter duration={10} pauseDuration={2} incrementAmount={8} />
    </section>
  );
}

export default Clients;
