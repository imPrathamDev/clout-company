"use client";
import OrgWheel from "./org-wheel";

function Wheel() {
  return (
    <div className="relative z-10 mx-auto max-w-[68.75rem] px-6 flex flex-col items-center">
      <section className="flex flex-col items-center justify-center gap-8 pt-12 pb-12">
        <h2 className="text-center m-0 text-[1.5rem] min-[767px]:text-[1.75rem] min-[1000px]:text-[2.25rem] font-normal leading-[115%] mx-auto">
          AI enabled Clout OS orchestrates every layer of internet-native
          distribution,
          <br />
          <span className="text-foreground/70">
            helping products reach the right users at the right time.
          </span>
        </h2>

        <OrgWheel />
      </section>
    </div>
  );
}

export default Wheel;
