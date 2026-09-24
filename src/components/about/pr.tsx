import Image from "next/image";
import React from "react";

const data = [
  {
    text: "The Clout Company is bringing method to madness, bringing back science to marketing and gifting businesses the joy of building without worrying how to sell it",
    link: "https://cxotoday.com/media-coverage/solopreneur-builds-multi-million-ai-native-agency-in-8-months-proves-sequoias-next-1t-thesis/",
    siteName: "CXO today",
  },
  {
    text: "A company like this improves as AI does as opposed to worrying if AI will eat their business, proving sequoia's 'next $1T company will be a software company masquerading as a services firm' thesis",
    link: "https://www.siliconindia.com/news/general/solopreneur-builds-multimillion-ai-native-agency-in-8-months-proves-sequoias-next-1t-thesis-nid-241843-cid-1.html",
    siteName: "Silicon India",
  },
  {
    text: "The Clout Company just proved that at agency scale, and it validates a thesis every operator in this industry needs to read twice.",
    link: "https://demg.ai/blog/clout-company-zero-employees-multi-million-valuation/",
    siteName: "Jeff Barnes, Founder (AIN)",
  },
];

function PRSection() {
  return (
    <div className="w-full py-32 relative">
      <div className="absolute top-0 left-0 w-full h-full -z-1">
        <div className="relative w-full h-full">
          <Image
            src={"/assets/images/platforms/bg.png"}
            alt="Clout Company"
            fill
            sizes="100vw"
            className="object-cover"
          />
        </div>
      </div>
      <div className="mx-auto max-w-[1200px] px-6 flex flex-col items-center gap-16">
        <h3
          style={{
            textShadow:
              "0 0 3px rgba(0, 0, 0, 0.08), 0 0.5px 0.5px rgba(0, 0, 0, 0.12)",
          }}
          className="m-0 text-[32px] md:text-[48px] leading-[115%] tracking-[0.32px] text-center text-background"
        >
          In the spotlight
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-14">
          {data.map((pr, index) => (
            <div
              key={index}
              style={{
                textShadow:
                  "0 0 3px rgba(0, 0, 0, 0.08), 0 0.5px 0.5px rgba(0, 0, 0, 0.12)",
              }}
              className="rounded-2xl p-6 bg-background flex flex-col gap-6 md:gap-8 justify-between"
            >
              <div className="space-y-3">
                <p className="text-[20px] font-serif text-left">
                  <span className="text-[23px]">“</span>
                  {pr.text}
                  <span className="text-[23px]">”</span>
                </p>
              </div>

              <div className="flex justify-between items-center">
                <p className="text-sm md:text-base">- {pr.siteName}</p>

                <a target="_blank" href={pr.link}>
                  <button
                    className="inline-flex items-center justify-center whitespace-nowrap font-medium outline-none focus-visible:ring-[3px] focus-visible:ring-white/20 cursor-pointer group border border-[#282834] rounded-lg gap-2 text-white hover:opacity-90 transition-opacity h-9 px-4 py-2 pr-3 text-[0.9375rem] tracking-[-0.009375rem] leading-[140%] before:absolute before:inset-0 before:rounded-[inherit] before:bg-[linear-gradient(45deg,transparent_25%,theme(colors.white/.5)_50%,transparent_75%,transparent_100%)] dark:before:bg-[linear-gradient(45deg,transparent_25%,theme(colors.white)_50%,transparent_75%,transparent_100%)] before:bg-[length:250%_250%,100%_100%] before:bg-[position:200%_0,0_0] relative before:bg-no-repeat before:[transition:background-position_0s_ease] hover:before:bg-[position:-100%_0,0_0] hover:before:duration-[1500ms]"
                    style={{
                      background:
                        "linear-gradient(90deg, rgba(255, 255, 255, 0.00) 0%, rgba(255, 255, 255, 0.12) 100%), #1F1F29",
                    }}
                  >
                    read more
                    {/* Micro Arrow Badge */}
                    <div
                      className="flex items-center justify-center w-3 h-4 pl-[0.15625rem] pr-[0.09375rem] py-0 rounded-[3.125rem] border leading-none"
                      style={{
                        borderColor: "rgba(255,255,255,0.24)",
                        background:
                          "linear-gradient(0deg, rgba(255, 255, 255, 0.16) 0%, rgba(255, 255, 255, 0.08) 100%)",
                        boxShadow: "0 1.01px 1.01px 0 rgba(0, 0, 0, 0.04)",
                      }}
                    >
                      <div className="relative w-full h-full overflow-hidden flex items-center justify-center">
                        <div className="relative overflow-hidden flex items-center justify-center w-[0.4375rem] h-[0.625rem]">
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
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default PRSection;
