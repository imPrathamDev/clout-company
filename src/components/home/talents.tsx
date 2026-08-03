"use client";

import { urlFor } from "@/sanity/lib/image";
import { Creator } from "@/sanity/queries/creators";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import Image from "next/image";
import React, { useRef } from "react";

gsap.registerPlugin(useGSAP);

const Card = ({ creator }: { creator: Creator }) => {
  const hrefRef = useRef<HTMLAnchorElement>(null);

  const { contextSafe } = useGSAP(
    () => {
      // Set initial state so GSAP takes full control of the transforms immediately
      gsap.set(".to-show", { yPercent: 50, opacity: 0 });
      gsap.set(".to-hide", { yPercent: 0, opacity: 1 });
    },
    {
      scope: hrefRef,
    },
  );

  const handleMouseEnter = contextSafe(() => {
    // overwrite: "auto" stops any currently running animations on these elements instantly
    gsap.to(".to-hide", {
      yPercent: -50,
      opacity: 0,
      duration: 0.3,
      ease: "power2.out",
      overwrite: "auto",
    });
    gsap.to(".to-show", {
      yPercent: 0,
      opacity: 1,
      duration: 0.3,
      ease: "power2.out",
      overwrite: "auto",
    });
  });

  const handleMouseLeave = contextSafe(() => {
    gsap.to(".to-hide", {
      yPercent: 0,
      opacity: 1,
      duration: 0.3,
      ease: "power2.out",
      overwrite: "auto",
    });
    gsap.to(".to-show", {
      yPercent: 50,
      opacity: 0,
      duration: 0.3,
      ease: "power2.out",
      overwrite: "auto",
    });
  });

  return (
    <a
      ref={hrefRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onTouchStart={handleMouseEnter}
      onTouchEnd={handleMouseLeave}
      onTouchCancel={handleMouseLeave}
      target="_blank"
      href={creator.reelLink}
      className="relative overflow-hidden flex items-center gap-2 pl-1 pr-6 py-1 rounded-full bg-background shadow-[0_0_0_1px_#fff_inset,0_0_0_1px_rgba(0,0,0,0.08),0_0_20px_0_rgba(0,0,0,0.03),0_36px_28px_0_rgba(0,0,0,0.02),0_4px_4px_0_rgba(0,0,0,0.02)] transition-transform duration-300 hover:scale-105 cursor-pointer"
    >
      {/* Wrapped the hideable content in a single div for uniform sliding */}
      <div className="to-hide flex items-center gap-2">
        <Image
          src={urlFor(creator.profilePicture).width(80).height(80).url()}
          alt={creator.name}
          width={80}
          height={80}
          className="size-10 object-cover rounded-full"
        />
        <p className="text-[16px] font-medium whitespace-nowrap">
          {creator.name}
        </p>
      </div>

      {/* inset-0 + flex perfectly centers the content every time */}
      <div className="to-show absolute inset-0 flex items-center justify-center pointer-events-none">
        <p className="text-[12px] font-medium uppercase flex items-center gap-1 whitespace-nowrap">
          View Reel{" "}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="size-3 shrink-0"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m4.5 19.5 15-15m0 0H8.25m11.25 0v11.25"
            />
          </svg>
        </p>
      </div>
    </a>
  );
};

function Talents({ creators }: { creators: Creator[] }) {
  // Duplicate creators to ensure the marquee has enough length to loop seamlessly
  const marqueeCreators = [...creators, ...creators];

  return (
    <div className="relative z-10 mx-auto max-w-[1100px] px-6 flex flex-col items-center">
      {/* Inject custom keyframes and hover state for the marquee */}
      <style>{`
        @keyframes marquee-left {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes marquee-right {
          0% { transform: translateX(-50%); }
          100% { transform: translateX(0); }
        }
        .animate-marquee-left {
          animation: marquee-left 30s linear infinite;
        }
        .animate-marquee-right {
          animation: marquee-right 30s linear infinite;
        }
        /* Pauses BOTH marquees when ANY card (a tag) inside the container is hovered */
        .marquee-container:has(a:hover) .animate-marquee-left,
        .marquee-container:has(a:hover) .animate-marquee-right {
          animation-play-state: paused;
        }
      `}</style>

      <section className="flex flex-col items-center justify-center gap-8 pt-12 pb-12 w-full">
        <h2 className="text-center m-0 text-[24px] min-[767px]:text-[28px] min-[1000px]:text-[36px] font-normal leading-[115%] mx-auto">
          600+ live creators in
          <br />
          <span className="text-foreground/70">EMEA, APAC, LATAM and MENA</span>
        </h2>

        {/* Added 'marquee-container' class here for the hover logic */}
        <div className="mt-8 md:mt-16 relative flex flex-col gap-4 overflow-hidden w-full max-w-[1080px] mx-auto py-4 marquee-container">
          {/* Left Gradient Fade */}
          <div className="pointer-events-none absolute inset-y-0 left-0 w-24 sm:w-32 bg-gradient-to-r from-background to-transparent z-10" />

          {/* Right Gradient Fade */}
          <div className="pointer-events-none absolute inset-y-0 right-0 w-24 sm:w-32 bg-gradient-to-l from-background to-transparent z-10" />

          {/* First Row - Moving Right */}
          <div className="flex w-max items-center gap-4 animate-marquee-right">
            {marqueeCreators.map((creator, index) => (
              <Card creator={creator} key={`row1-${creator._id}-${index}`} />
            ))}
          </div>

          {/* Second Row - Moving Left */}
          <div className="flex w-max items-center gap-4 animate-marquee-left">
            {marqueeCreators.map((creator, index) => (
              <Card creator={creator} key={`row2-${creator._id}-${index}`} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default Talents;
