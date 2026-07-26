"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useRef } from "react";

function Hero() {
  const containerRef = useRef(null);
  return (
    <section
      ref={containerRef}
      className="pb-0 2xl:pt-[220px] xl:pt-[200px] md:pt-[160px] pt-[120px] w-full mx-auto px-0 sm:px-4 md:px-6 border-b border-green-200/30 bg-green-100/30"
      data-navbar-theme="light"
    >
      <div className="flex flex-col items-center px-4 mx-auto w-full max-w-7xl">
        {/* Hero Icon SVG */}

        <div className="mb-4 max-w-4xl">
          <h1 className="text-pretty text-center text-[32px] sm:text-[48px] lg:text-[54px] 3xl:text-[64px] leading-[110%] tracking-[-1.08px] font-normal mb-6 md:mb-4 font-serif">
            What we're learning about distribution - one company at a time.
          </h1>

          <div className="flex max-[400px]:flex-col gap-2 justify-center items-center mb-6">
            <p className="font-medium text-[16px] tracking-[-0.15px] leading-[140%] text-foreground/80">
              These logs document what worked, what didn't, and what we'll build
              next.
            </p>
          </div>
        </div>

        <div className="relative mx-auto w-full h-[350px]">
          <Image
            src={"/assets/images/footer.png"}
            alt=""
            width={3840}
            height={300}
            className="absolute inset-0 h-full w-full object-cover object-[50%_30%] rounded-t-2xl"
          />

          <div className="absolute bottom-6 left-1/2 -translate-x-1/2">
            <Link href="/writing/agent-native-engineering">
              <button
                className="inline-flex items-center justify-center gap-2 h-10 rounded-lg px-6 text-[15px] tracking-[-0.15px] leading-[140%] text-white border border-white/40 backdrop-blur-[9px] shadow-[0_2px_6px_0_rgba(0,0,0,0.15)] group transition-all"
                style={{
                  background:
                    "linear-gradient(270deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.19) 100%)",
                  padding: "10px 14px 10px 16px",
                }}
              >
                Read article
                <div
                  className="flex items-center justify-center w-3 h-4 pl-[2.5px] pr-[1.5px] rounded-full"
                  style={{
                    border: "1px solid rgba(255,255,255,0.24)",
                    background:
                      "linear-gradient(0deg, rgba(255,255,255,0.16) 0%, rgba(255,255,255,0.08) 100%)",
                    boxShadow: "0 1.01px 1.01px rgba(0,0,0,.04)",
                  }}
                ></div>
              </button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
