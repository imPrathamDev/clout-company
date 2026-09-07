import Image from "next/image";
import React from "react";

const data = [
  {
    src: "/assets/images/pr/logo.png",
    text: "You do not scale by adding judgment calls per hour. You scale by codifying the judgment once, then letting the system execute it a thousand times.",
    link: "https://demg.ai/blog/clout-company-zero-employees-multi-million-valuation/",
  },
  {
    src: "/assets/images/pr/cxo-logo.png",
    text: "Distribution today looks exactly like software looked in 1995: a dark art practiced by a small number of people who are expensive, inconsistent, and impossible to scale.",
    link: "",
  },
  {
    src: "/assets/images/pr/silicon_logo.png",
    text: "The next $1T company will be a software company masquerading as a services firm",
    link: "",
  },
];

function PRSection() {
  return (
    <div className="w-full pt-[80px] pb-[30px]">
      <div className="mx-auto max-w-[1200px] px-6 flex flex-col items-center gap-12">
        <h3 className="m-0 text-[28px] md:text-[48px] leading-[115%] tracking-[0.32px] text-center text-[#262323]">
          In the spotlight
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-12">
          {data.map((pr, index) => (
            <div
              key={index}
              className="flex flex-col gap-4 md:gap-8 items-center justify-start"
            >
              <div className="h-24 md:h-32 w-36 md:w-48 relative">
                <Image src={pr.src} alt="" fill className="object-contain" />
              </div>

              <p className="text-[26px] font-serif text-center">
                <span className="text-[28px]">“</span>...{pr.text}...
                <span className="text-[28px]">”</span>
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default PRSection;
