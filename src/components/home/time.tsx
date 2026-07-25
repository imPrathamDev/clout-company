"use client";
import React from "react";
import { useLocaleTime } from "../hooks/use-locale-time";

function DisplayTime() {
  const { hours, minutes, seconds, period } = useLocaleTime(
    "en-GB",
    "Europe/London",
  );
  return (
    <div className="md:flex items-center hidden">
      {/* <svg
        xmlns="http://www.w3.org/2000/svg"
        width="12"
        height="12"
        viewBox="0 0 12 12"
        fill="none"
        className="shrink-0 transition-transform duration-1000 ease-out mb-0.5 rotate-[122.481deg] origin-center"
      >
        <circle
          cx="5.87891"
          cy="5.87451"
          r="5.275"
          stroke="#FEFFFC"
          strokeWidth="1.2"
        />
        <path
          d="M5.87891 4.84131L5.87891 0.659882"
          stroke="#FEFFFC"
          strokeWidth="1.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg> */}
      <span className="ml-2.5 text-[13px] font-medium leading-[140%] tracking-[-0.15px] tabular-nums text-foreground">
        {hours}:{minutes}:{seconds} {period}
      </span>
      <span className="ml-3 font-af text-[13px] font-medium leading-[140%] tracking-[-0.15px] text-foreground/60">
        London, UK
      </span>
    </div>
  );
}

export default DisplayTime;
