"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import DisplayTime from "./time";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
import { useLocaleTime } from "../hooks/use-locale-time";

gsap.registerPlugin(useGSAP, SplitText);

// export type NavbarTheme = "light" | "dark";

const imageMap = {
  morning: require("../../../public/assets/images/hero/morning-final.jpg"),
  afternoon: require("../../../public/assets/images/hero/morning-final.jpg"),
  evening: require("../../../public/assets/images/hero/final-evening.jpg"),
  night: require("../../../public/assets/images/hero/final-evening.jpg"),
} as const;

export const Hero: React.FC = () => {
  const containerRef = useRef(null);
  const { timeOfDayKey } = useLocaleTime();
  const textRef = useRef(null);
  useGSAP(
    () => {
      const split = SplitText.create(textRef.current, {
        type: "words",
      });

      gsap.set(split.words, {
        opacity: 0,
        filter: "blur(10px)",
        y: "50%",
        willChange: "opacity,filter,transform",
      });

      gsap.set(textRef.current, {
        opacity: 1,
      });

      gsap.to(split.words, {
        opacity: 1,
        filter: "blur(0px)",
        y: "0%",
        ease: "power3.inOut",
        duration: 1,
        stagger: 0.2,
      });
    },
    {
      scope: containerRef,
    },
  );

  return (
    <div ref={containerRef} id="hero" data-navbar-theme="dark" className="">
      {/* Full-width container breakout */}
      <section
        className="relative w-full"
        style={{
          marginLeft: "calc(-50vw + 50%)",
          marginRight: "calc(-50vw + 50%)",
          width: "100vw",
        }}
      >
        <div className="relative min-h-200 lg:min-h-auto w-full aspect-1553/1450">
          {/* Background Image */}
          <div className="absolute inset-0">
            <Image
              src={imageMap[timeOfDayKey]}
              alt="Background Hero Image"
              fill
              priority
              sizes="100vw"
              placeholder="blur"
              className="object-cover w-full object-[50%_30%]"
            />
          </div>

          {/* Main Hero Content */}
          <div className="relative flex flex-col justify-start items-start w-full h-full pt-28">
            <div className="max-w-360 mx-auto w-full h-full flex-1">
              {/* Main Headline */}
              <h1
                ref={textRef}
                className="opacity-0 tracking-[-0.0675rem] home-hero-title font-serif text-background text-center relative z-10 font-normal max-w-[24ch] mx-auto pt-4 md:pt-10 text-[2.5625rem] sm:text-[3.0625rem] lg:text-[3.25rem] 3xl:text-[3.5625rem] leading-[95%]"
                style={{ textShadow: "0 0 4.978px rgba(255, 255, 255, 0.80)" }}
              >
                The Clout Company
                <br />
                <span className="text-[1.625rem] sm:text-[1.75rem] lg:text-[2.25rem] 3xl:text-[2.375rem] flex items-center justify-center gap-4">
                  <span className="italic">by </span>
                  <span>Crescent Media Group</span>
                </span>
              </h1>

              {/* Glassmorphic Glass Box Floating Card */}
              <div className="sticky z-50 mb-4 ml-4 mr-4 md:mr-auto top-[calc(100vh-278px)] md:top-[calc(100vh-330px)] transition-opacity duration-300 ease-in-out">
                <div className="p-5 lg:p-8 lg:pr-6 relative rounded-2xl backdrop-blur-[15px] border border-background/20 shadow-[0_2px_6px_0_rgba(0,0,0,0.15)] bg-linear-to-r from-foreground/10 via-foreground/5 to-foreground/5 max-w-125">
                  <div className="flex relative z-10 flex-col gap-4 items-start">
                    <h2 className="font-medium font-serif text-[1.375rem] sm:text-[1.75rem] xl:text-[2.5rem] leading-[120%] md:leading-[110%] tracking-[-0.0275rem] sm:tracking-[-0.035rem] xl:tracking-[-0.05rem] text-background max-w-[25ch] text-left mb-2">
                      The Distribution OS for Consumer Companies.
                    </h2>
                    <p className="font-medium text-background text-[0.9375rem] leading-[140%] max-w-[42ch] tracking-[-0.009375rem]">
                      The Clout Company engineers AI powered systems to enable
                      distribution at internet scale from first launch to global
                      adoption.
                    </p>

                    {/* CTA Button */}
                    <Link href="/about" passHref>
                      <button className="inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium outline-none cursor-pointer group transition-colors duration-200 rounded-none h-9 text-[0.9375rem] tracking-[-0.009375rem] leading-[140%] text-white p-0 mr-auto hover:text-white">
                        <span className="flex items-center border-b transition-all duration-200 border-b-neutral-600 group-hover:border-b-neutral-400">
                          Learn our source code
                        </span>

                        {/* Custom Animated Arrow Badge */}
                        <div
                          className="flex items-center justify-center w-3 h-4 pl-[0.15625rem] pr-[0.09375rem] py-0 rounded-[3.125rem] border leading-none ml-1"
                          style={{
                            borderColor: "rgba(255,255,255,0.24)",
                            background:
                              "linear-gradient(0deg, rgba(255, 255, 255, 0.16) 0%, rgba(255, 255, 255, 0.08) 100%)",
                            boxShadow: "0 1.01px 1.01px 0 rgba(0, 0, 0, 0.04)",
                          }}
                        >
                          <div className="relative w-full h-full overflow-hidden flex items-center justify-center">
                            <div className="relative overflow-hidden flex items-center justify-center w-1.75 h-2.5">
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
                </div>
              </div>

              {/* Location / Clock Widget Header (Top Right) */}
              {/* <DisplayTime /> */}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Hero;
