"use client";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
import React, { useRef } from "react";
import OrgWheel from "./org-wheel";

// gsap.registerPlugin(useGSAP, SplitText)

function Wheel() {
  const containerRef = useRef(null);
  // const headingRef = useRef(null)

  // useGSAP(() => {

  // }, {
  //     scope:
  // })

  return (
    <section
      ref={containerRef}
      className="flex flex-col items-center justify-center gap-8 pt-12 pb-12"
    >
      <h2 className="text-center m-0 text-[28px] min-[767px]:text-[32px] min-[1000px]:text-[40px] font-normal leading-[115%] mx-auto">
        Clout orchestrates every layer of internet-native distribution,
        <br />
        <span className="text-foreground/70">
          helping products reach the right users at the right time.
        </span>
      </h2>

      <OrgWheel />
    </section>
  );
}

export default Wheel;
