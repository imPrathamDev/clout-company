"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import Image from "next/image";
import React, { useCallback, useRef, useState } from "react";
import { SmoothCounter } from "./smooth-counter";

gsap.registerPlugin(useGSAP);

const logos = [
  "logo1.png",
  "logo2.png",
  // "logo3.png",
  "logo4.png",
  "logo5.png",
  "logo6.png",
  "logo7.png",
  "logo8.png",
  "logo9.png",
  "logo10.png",
];

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

function Clients() {
  const containerRef = useRef<HTMLDivElement>(null);
  const imgWrapRefs = useRef<(HTMLDivElement | null)[]>([]);
  const animatingSlots = useRef<Set<number>>(new Set());
  const pendingLogos = useRef<Map<number, string>>(new Map()); // slotId -> logo reserved but not yet committed
  const hasMounted = useRef(false);

  // Deterministic initial order — identical on server & client.
  // NO Math.random() here, otherwise you get a hydration mismatch.
  const [slots, setSlots] = useState<Slot[]>(() =>
    logos.slice(0, GRID_SIZE).map((logo, i) => ({ slotId: i, logo: logo })),
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
    const pool = logos.filter(
      (l) => !currentLogos.includes(l) && !reservedLogos.includes(l),
    );
    if (pool.length === 0) return;

    const nextLogo = pool[Math.floor(Math.random() * pool.length)];

    animatingSlots.current.add(slotId);
    pendingLogos.current.set(slotId, nextLogo); // reserve it right away

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
          prev.map((s) => (s.slotId === slotId ? { ...s, logo: nextLogo } : s)),
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
      // First real shuffle happens client-side only, after hydration —
      // this is the safe place for randomness, not in useState().
      if (!hasMounted.current) {
        hasMounted.current = true;
        setSlots(
          shuffleArray(logos)
            .slice(0, GRID_SIZE)
            .map((logo, i) => ({ slotId: i, logo: logo })),
        );
      }

      const runCycle = () => {
        const swapCount =
          MIN_SWAPS + Math.floor(Math.random() * (MAX_SWAPS - MIN_SWAPS + 1));

        const targetSlotIds = shuffleArray(
          slotsRef.current.map((s) => s.slotId),
        ).slice(0, swapCount);

        targetSlotIds.forEach((slotId) => {
          const delay = Math.random() * STAGGER_WINDOW;
          gsap.delayedCall(delay / 1000, () => swapSlot(slotId));
        });
      };

      // slight offset so the first cycle doesn't collide with the mount shuffle
      const firstCycle = gsap.delayedCall(0.6, runCycle);
      const interval = setInterval(runCycle, CYCLE_INTERVAL);

      return () => {
        firstCycle.kill();
        clearInterval(interval);
      };
    },
    { scope: containerRef },
  );

  return (
    <section
      ref={containerRef}
      className="py-24 flex flex-col items-center justify-center gap-4"
    >
      <div className="grid grid-cols-5 gap-4">
        {slots.map((slot, index) => (
          <div
            key={slot.slotId}
            className="cursor-pointer group relative flex items-center justify-center p-4 md:p-5 rounded-xl bg-[#f8f9f5] border border-[#e8ece0] transition-all duration-300 hover:border-[#383a35]/20 hover:shadow-sm"
          >
            {/* Paw Icon Container */}
            {/* <div className="-z-1 absolute -top-5 right-0 opacity-0 translate-y-2 scale-75 transition-all duration-300 ease-out group-hover:opacity-100 group-hover:translate-y-0 group-hover:scale-100 pointer-events-none">
              <div className="animate-wave origin-bottom-center">
                <Image
                  src="/assets/images/paw.png" // Replace with your paw image path
                  alt="Paw"
                  width={32}
                  height={32}
                  className="w-7 h-7 object-contain drop-shadow-md"
                />
              </div>
            </div> */}

            {/* Client Logo Slot */}
            <div
              ref={(el) => {
                imgWrapRefs.current[slot.slotId] = el;
              }}
              className="w-14 md:w-20 lg:w-24 aspect-3/2 flex items-center justify-center will-change-[filter,transform,opacity]"
            >
              <Image
                src={"/assets/images/clients/" + slot.logo}
                alt={slot.logo.split(".")[0] || "Client logo"}
                width={200}
                height={80}
                className="max-h-full max-w-full object-contain grayscale opacity-60 contrast-125 transition-all duration-300 group-hover:grayscale-0 group-hover:opacity-100"
              />
            </div>
          </div>
        ))}
      </div>
      <SmoothCounter />
    </section>
  );
}

export default Clients;
