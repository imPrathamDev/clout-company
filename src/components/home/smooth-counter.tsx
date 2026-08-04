import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

interface CounterProps {
  initialValue?: number;
  incrementAmount?: number;
  duration?: number; // How long the counting transition takes (in seconds)
  pauseDuration?: number; // How long to wait before the next increment (in seconds)
}

export const SmoothCounter: React.FC<CounterProps> = ({
  initialValue = 15_908_746,
  incrementAmount = 36,
  duration = 8, // Increased from 3s to 8s for a much slower, smoother roll
  pauseDuration = 1, // Adds a 1-second pause between updates
}) => {
  const numberRef = useRef<HTMLSpanElement | null>(null);

  useGSAP(
    () => {
      const obj = { value: initialValue };

      // repeatDelay adds a pause between repeats
      const tl = gsap.timeline({ repeat: -1, repeatDelay: pauseDuration });

      tl.to(obj, {
        value: `+=${incrementAmount}`,
        duration: duration,
        // "power1.inOut" or "none" (linear) feels smoother for slow counts than power3
        ease: "power1.inOut",
        onUpdate: () => {
          if (numberRef.current) {
            numberRef.current.textContent = Math.floor(
              obj.value,
            ).toLocaleString("en-US");
          }
        },
      });
    },
    { scope: numberRef },
  );

  return (
    <p className="text-[0.75rem] font-medium text-gray-500/70 text-center [font-variant-numeric:tabular-nums]">
      Over <span ref={numberRef}>{initialValue.toLocaleString("en-US")}</span>{" "}
      users acquired via Clout OS
    </p>
  );
};
