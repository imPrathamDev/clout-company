"use client";
import OrgWheel from "./org-wheel";

function Wheel() {
  return (
    <div className="relative z-10 mx-auto max-w-[1100px] px-6 flex flex-col items-center">
      <section className="flex flex-col items-center justify-center gap-8 pt-12 pb-12">
        <h2 className="text-center m-0 text-[24px] min-[767px]:text-[28px] min-[1000px]:text-[36px] font-normal leading-[115%] mx-auto">
          Clout OS orchestrates every layer of internet-native distribution,
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
