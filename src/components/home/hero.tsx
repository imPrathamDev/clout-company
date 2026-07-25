"use client";

import React, { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import DisplayTime from "./time";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(useGSAP, SplitText);

export type NavbarTheme = "light" | "dark";

export const Hero: React.FC = () => {
  const containerRef = useRef(null);
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
              src="/assets/images/new-her.png"
              alt="Background Hero Image"
              fill
              priority
              sizes="100vw"
              className="object-cover w-full object-[50%_30%]"
            />
          </div>

          {/* Main Hero Content */}
          <div className="relative flex flex-col justify-start items-start pt-20 w-full h-full">
            <div className="max-w-360 mx-auto w-full h-full flex-1">
              {/* Main Headline */}
              <h1
                ref={textRef}
                className="opacity-0 tracking-[-1.08px] home-hero-title font-serif text-background text-center relative z-10 font-normal max-w-[24ch] mx-auto pt-4 md:pt-10 text-[16px] sm:text-[24px] lg:text-[27px] 3xl:text-[32px]"
                style={{ textShadow: "0 0 4.978px rgba(255, 255, 255, 0.80)" }}
              >
                The Clout Company
                <br />
                <span className="flex items-center justify-center gap-2">
                  <span className="italic">by </span> Crescent
                </span>
              </h1>

              {/* Tagline / Sub-description (Bottom Right Desktop Layout) */}
              {/* <div className="lg:absolute lg:bottom-0 lg:right-0 mx-auto lg:mx-0 z-20 p-[18px] pr-10 pb-10 max-w-[340px]">
                <div className="flex flex-col lg:gap-3 items-end text-center lg:text-right">
                  <div className="relative transition-all duration-[250ms] ease-[cubic-bezier(0.4,0,0.2,1)] hidden lg:block w-[35px] h-[18px]">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="35"
                      height="18"
                      viewBox="0 0 35 18"
                      fill="none"
                      className="absolute inset-0 transition-opacity duration-[250ms] ease-[cubic-bezier(0.4,0,0.2,1)] opacity-100"
                    >
                      <rect
                        x="0.820312"
                        y="15.6016"
                        width="33.7188"
                        height="1.77441"
                        fill="#CFD3CF"
                      />
                      <rect
                        x="12.9531"
                        y="5.9043"
                        width="9.45312"
                        height="1.77441"
                        fill="#CFD3CF"
                      />
                      <rect
                        x="27.1172"
                        y="10.209"
                        width="3.54688"
                        height="1.77441"
                        fill="#CFD3CF"
                      />
                      <rect
                        x="4.85938"
                        y="10.209"
                        width="3.54688"
                        height="1.77441"
                        fill="#CFD3CF"
                      />
                      <rect
                        x="18.5469"
                        width="3.54688"
                        height="1.77441"
                        transform="rotate(90 18.5469 0)"
                        fill="#CFD3CF"
                      />
                      <rect
                        x="26.8438"
                        y="3.17871"
                        width="1.77"
                        height="1.77441"
                        transform="rotate(90 26.8438 3.17871)"
                        fill="#CFD3CF"
                      />
                      <rect
                        width="1.77"
                        height="1.77441"
                        transform="matrix(4.37114e-08 1 1 -4.37114e-08 8.74219 3.17871)"
                        fill="#CFD3CF"
                      />
                      <rect
                        x="28.6094"
                        y="1.41797"
                        width="1.77"
                        height="1.77441"
                        transform="rotate(90 28.6094 1.41797)"
                        fill="#CFD3CF"
                      />
                      <rect
                        width="1.77"
                        height="1.77441"
                        transform="matrix(4.37114e-08 1 1 -4.37114e-08 6.96875 1.41797)"
                        fill="#CFD3CF"
                      />
                      <rect
                        x="24.25"
                        y="7.5957"
                        width="9.60693"
                        height="1.77441"
                        transform="rotate(90 24.25 7.5957)"
                        fill="#CFD3CF"
                      />
                      <rect
                        x="13.0469"
                        y="7.63086"
                        width="9.60693"
                        height="1.77441"
                        transform="rotate(90 13.0469 7.63086)"
                        fill="#CFD3CF"
                      />
                    </svg>
                  </div>
                  <p className="font-af font-medium text-[15px] tracking-[-0.15px] leading-[140%] max-w-[26ch] text-[#F3F5F2]">
                    Agentic companies are on the horizon, and we&apos;re
                    building them
                  </p>
                </div>
              </div> */}

              {/* Glassmorphic Glass Box Floating Card */}
              <div className="sticky z-50 mb-4 ml-4 mr-4 md:mr-auto top-[calc(100vh-278px)] md:top-[calc(100vh-330px)] transition-opacity duration-300 ease-in-out">
                <div className="p-5 lg:p-8 lg:pr-6 relative rounded-2xl backdrop-blur-[15px] border border-background/20 shadow-[0_2px_6px_0_rgba(0,0,0,0.15)] bg-linear-to-r from-foreground/10 via-foreground/5 to-foreground/5 max-w-125">
                  <div className="flex relative z-10 flex-col gap-4 items-start">
                    <h2 className="font-medium font-serif text-[22px] sm:text-[28px] xl:text-[40px] leading-[120%] md:leading-[110%] tracking-[-0.44px] sm:tracking-[-0.56px] xl:tracking-[-0.8px] text-background max-w-[25ch] text-left mb-2">
                      The Distribution OS for Consumer Companies.
                    </h2>
                    <p className="font-medium text-background text-[15px] leading-[140%] max-w-[42ch] tracking-[-0.15px]">
                      The Clout Company engineers systems to enable distribution
                      at internet scale from first launch to global adoption.
                    </p>

                    {/* CTA Button */}
                    <Link href="/about" passHref>
                      <button className="inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium outline-none cursor-pointer group transition-colors duration-200 rounded-none h-9 text-[15px] tracking-[-0.15px] leading-[140%] text-white p-0 mr-auto hover:text-white">
                        <span className="flex items-center border-b transition-all duration-200 border-b-neutral-600 group-hover:border-b-neutral-400">
                          Learn our source code
                        </span>

                        {/* Custom Animated Arrow Badge */}
                        <div
                          className="flex items-center justify-center w-3 h-4 pl-[2.5px] pr-[1.5px] py-0 rounded-[50px] border leading-none ml-1"
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
