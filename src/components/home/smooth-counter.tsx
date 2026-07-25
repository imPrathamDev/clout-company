import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

interface CounterProps {
  initialValue?: number;
  incrementAmount?: number;
}

export const SmoothCounter: React.FC<CounterProps> = ({
  initialValue = 159087463993,
  incrementAmount = 36,
}) => {
  // Strongly typed ref for the HTML element holding the target string
  const numberRef = useRef<HTMLSpanElement | null>(null);

  useGSAP(
    () => {
      // Proxy object for GSAP to interpolate raw numeric values
      const obj = { value: initialValue };

      const tl = gsap.timeline({ repeat: -1 });

      tl.to(obj, {
        value: `+=${incrementAmount}`,
        duration: 2,
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
    <p className="text-[12px] font-medium text-gray-500/70 text-center [font-variant-numeric:tabular-nums]">
      Over <span ref={numberRef}>{initialValue.toLocaleString("en-US")}</span>{" "}
      users acquired via Clout OS
    </p>
  );
};
