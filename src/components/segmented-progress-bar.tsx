import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register ScrollTrigger if you plan to use the scroll start feature
gsap.registerPlugin(ScrollTrigger);

export interface SegmentedProgressBarProps {
  /** A number from 0 to 100 */
  progress: number;
  /** Total number of individual bar segments. Default: 33 */
  totalSegments?: number;
  /** Tailwind class for the filled state. Default: 'bg-white' */
  activeColor?: string;
  /** Tailwind class for the empty state. Default: 'bg-neutral-700' */
  inactiveColor?: string;
  /** Manual boolean trigger to start the animation */
  trigger?: boolean;
  /** GSAP ScrollTrigger start value (e.g., 'top 80%') */
  scrollStart?: string;
  /** Height of the progress bar. Default: 'h-8' */
  barHeight?: string;
  /** Gap between segments (Tailwind class). Default: 'gap-[2px]' */
  gap?: string;
  /** Tailwind class for the overall container width. Default: 'w-full' */
  containerWidth?: string;
}

export const SegmentedProgressBar: React.FC<SegmentedProgressBarProps> = ({
  progress,
  totalSegments = 33,
  activeColor = "bg-white",
  inactiveColor = "bg-neutral-700",
  trigger = true,
  scrollStart,
  barHeight = "h-8",
  gap = "gap-[0.125rem]",
  containerWidth = "w-full",
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const activeBarsRef = useRef<(HTMLDivElement | null)[]>([]);

  // Calculate the integer number of bars that should be colored in
  const clampedProgress = Math.max(0, Math.min(100, progress));
  const activeCount = Math.round((clampedProgress / 100) * totalSegments);

  useGSAP(
    () => {
      if (!trigger && !scrollStart) return;

      const activeElements = activeBarsRef.current
        .slice(0, activeCount)
        .filter((el) => el !== null);

      if (activeElements.length === 0) return;

      gsap.set(activeElements, { opacity: 0 });

      const animationVars: gsap.TweenVars = {
        opacity: 1,
        duration: 0.05,
        stagger: 0.03,
        ease: "power1.inOut",
      };

      if (scrollStart) {
        animationVars.scrollTrigger = {
          trigger: containerRef.current,
          start: scrollStart,
          toggleActions: "play none none reverse",
        };
      }

      gsap.to(activeElements, animationVars);
    },
    {
      dependencies: [
        progress,
        trigger,
        scrollStart,
        activeCount,
        totalSegments,
      ],
      scope: containerRef,
    },
  );

  return (
    <div
      ref={containerRef}
      // Changed to 'grid' and combined the tailwind width and gap classes
      className={`${containerWidth} grid items-center ${gap}`}
      style={{
        // This mathematically forces exactly 'totalSegments' columns of equal width
        gridTemplateColumns: `repeat(${totalSegments}, minmax(0, 1fr))`,
      }}
    >
      {Array.from({ length: totalSegments }).map((_, index) => {
        const isActiveSegment = index < activeCount;

        return (
          <div
            key={index}
            // The segment now automatically takes up exactly 1 grid column
            className={`relative overflow-hidden rounded-[0.0625rem] w-full ${barHeight} ${inactiveColor}`}
          >
            {isActiveSegment && (
              <div
                ref={(el) => {
                  activeBarsRef.current[index] = el;
                }}
                className={`absolute inset-0 opacity-0 ${activeColor}`}
              />
            )}
          </div>
        );
      })}
    </div>
  );
};
