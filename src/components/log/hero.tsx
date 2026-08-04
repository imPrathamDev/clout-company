"use client";
import { urlFor } from "@/sanity/lib/image";
import { LogListItem } from "@/sanity/queries/log";
import Image from "next/image";
import Link from "next/link";
import React, { useRef } from "react";

function Hero({ logs }: { logs: LogListItem[] }) {
  const containerRef = useRef(null);
  return (
    <section
      ref={containerRef}
      className="pb-0 2xl:pt-[13.75rem] xl:pt-[12.5rem] md:pt-[10rem] pt-[7.5rem] w-full mx-auto px-0 sm:px-4 md:px-6 border-b border-green-200/30 bg-green-100/30"
      data-navbar-theme="light"
    >
      <div className="flex flex-col items-center px-4 mx-auto w-full max-w-7xl">
        {/* Hero Icon SVG */}

        <div className="mb-4 max-w-4xl">
          <h1 className="text-pretty text-center text-[2rem] sm:text-[3rem] lg:text-[3.375rem] 3xl:text-[4rem] leading-[110%] tracking-[-0.0675rem] font-normal mb-6 md:mb-4 font-serif">
            What we're learning about distribution - one company at a time.
          </h1>

          <div className="flex max-[400px]:flex-col gap-2 justify-center items-center mb-6">
            <p className="font-medium text-[1rem] tracking-[-0.009375rem] leading-[140%] text-foreground/80 text-center">
              These logs document what worked, what didn't, and what we'll build
              next.
            </p>
          </div>
        </div>

        <div className="relative mx-auto w-full h-[21.875rem]">
          <Image
            src={logs[0].mainImage ? urlFor(logs[0].mainImage).url() : ""}
            alt={logs[0].mainImage?.alt ?? logs[0].title}
            width={3840}
            height={300}
            placeholder="blur"
            blurDataURL={logs[0].mainImage?.asset.metadata.lqip}
            className="absolute inset-0 h-full w-full object-cover object-[50%_30%] rounded-t-2xl"
          />

          <div className="absolute bottom-6 left-1/2 -translate-x-1/2">
            <Link href="#cards">
              <button
                className="inline-flex items-center justify-center gap-2 h-10 rounded-lg px-6 text-[0.9375rem] tracking-[-0.009375rem] leading-[140%] text-white border border-white/40 backdrop-blur-[9px] shadow-[0_2px_6px_0_rgba(0,0,0,0.15)] group transition-all"
                style={{
                  background:
                    "linear-gradient(270deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.19) 100%)",
                  padding: "0.625rem 0.875rem 0.625rem 1rem",
                }}
              >
                Explore our thinking
                {/* <div
                  className="flex items-center justify-center w-3 h-4 pl-[2.5px] pr-[1.5px] rounded-full"
                  style={{
                    border: "1px solid rgba(255,255,255,0.24)",
                    background:
                      "linear-gradient(0deg, rgba(255,255,255,0.16) 0%, rgba(255,255,255,0.08) 100%)",
                    boxShadow: "0 1.01px 1.01px rgba(0,0,0,.04)",
                  }}
                ></div> */}
              </button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
