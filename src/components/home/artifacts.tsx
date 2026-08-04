"use client";

import Image from "next/image";
import React from "react";
import { SegmentedProgressBar } from "@/components/segmented-progress-bar";
import Link from "next/link";
import { ArtifactCampaign } from "@/sanity/queries/artifactCampaign";

function Artifacts({
  artifactCampaigns,
}: {
  artifactCampaigns: ArtifactCampaign[];
}) {
  return (
    <section className="flex flex-col justify-center items-center mx-auto max-w-[1100px] px-6">
      <div className="w-full pt-24 pb-10">
        <div className="max-w-[1080px] mx-auto px-5 min-[476px]:px-8 min-[768px]:px-6 flex flex-col items-center text-center gap-6">
          <div className="flex flex-col gap-2">
            <h2 className="m-0 text-[1.75rem] min-[767px]:text-[2rem] min-[1000px]:text-[2.5rem] font-normal leading-[115%]">
              Artifacts
            </h2>

            <p className="m-0 text-[0.9375rem] font-[460] tracking-[0.009375rem] w-full max-w-[31.25rem] text-neutral-700">
              Case studies & Records of products finding their users.
            </p>
          </div>

          <Link href="/contact">
            <button
              className="inline-flex items-center justify-center whitespace-nowrap font-medium outline-none focus-visible:ring-[3px] focus-visible:ring-white/20 cursor-pointer group border border-[#282834] rounded-lg gap-2 text-white hover:opacity-90 transition-opacity h-9 px-4 py-2 pr-3 text-[0.9375rem] tracking-[-0.009375rem] leading-[140%] before:absolute before:inset-0 before:rounded-[inherit] before:bg-[linear-gradient(45deg,transparent_25%,theme(colors.white/.5)_50%,transparent_75%,transparent_100%)] dark:before:bg-[linear-gradient(45deg,transparent_25%,theme(colors.white)_50%,transparent_75%,transparent_100%)] before:bg-[length:250%_250%,100%_100%] before:bg-[position:200%_0,0_0] relative before:bg-no-repeat before:[transition:background-position_0s_ease] hover:before:bg-[position:-100%_0,0_0] hover:before:duration-[1500ms]"
              style={{
                background:
                  "linear-gradient(90deg, rgba(255, 255, 255, 0.00) 0%, rgba(255, 255, 255, 0.12) 100%), #1F1F29",
              }}
            >
              enter the chat
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
          </Link>
        </div>
      </div>

      <div className="w-full pt-8 pb-24">
        <div className="mt-[3.75rem] mx-auto flex w-full max-w-[51.25rem] flex-col gap-[5rem] min-[1280px]:max-w-none justify-center items-center">
          {artifactCampaigns.map((data) => (
            <div
              key={data.label}
              className="flex flex-col gap-y-8 min-[1280px]:flex-row min-[1280px]:items-center min-[1280px]:gap-y-0"
            >
              <div className="flex flex-col min-[768px]:flex-row shrink-0 gap-y-6 max-[1280px]:gap-x-[40px] min-[1280px]:w-[290px] min-[1280px]:flex-col">
                <div className="rounded-xl bg-[#f8f9f5] border border-[#e8ece0] size-24 flex items-center justify-center">
                  <Image
                    alt="Folder"
                    src={"/assets/images/folder.svg"}
                    width={66}
                    height={66}
                    className="object-contain"
                  />
                </div>

                <div className="flex flex-col gap-3">
                  <h5 className="m-0 text-[1rem] min-[767px]:text-[1.25rem] min-[1000px]:text-[1.625rem] font-medium leading-[115%] text-foreground/80">
                    {data.label}
                  </h5>

                  <h3 className="m-0 text-[1.375rem] min-[767px]:text-[1.625rem] min-[1000px]:text-[2rem] font-medium leading-[115%] text-foreground">
                    {data.title}
                  </h3>

                  <div className="pt-2 md:pt-4">
                    <Image
                      src={data.brand_logo}
                      alt={data.campaign_name}
                      width={100}
                      height={50}
                      className="object-contain"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <div className="h-0 md:h-[2vh]"></div>
                  <Link href={"/contact"}>
                    <button
              className="inline-flex items-center justify-center whitespace-nowrap font-medium outline-none focus-visible:ring-[3px] focus-visible:ring-white/20 cursor-pointer group border border-[#282834] rounded-lg gap-2 text-white hover:opacity-90 transition-opacity h-9 px-4 py-2 pr-3 text-[0.9375rem] tracking-[-0.009375rem] leading-[140%] before:absolute before:inset-0 before:rounded-[inherit] before:bg-[linear-gradient(45deg,transparent_25%,theme(colors.white/.5)_50%,transparent_75%,transparent_100%)] dark:before:bg-[linear-gradient(45deg,transparent_25%,theme(colors.white)_50%,transparent_75%,transparent_100%)] before:bg-[length:250%_250%,100%_100%] before:bg-[position:200%_0,0_0] relative before:bg-no-repeat before:[transition:background-position_0s_ease] hover:before:bg-[position:-100%_0,0_0] hover:before:duration-[1500ms]"
                      style={{
                        background:
                          "linear-gradient(90deg, rgba(255, 255, 255, 0.00) 0%, rgba(255, 255, 255, 0.12) 100%), #1F1F29",
                      }}
                    >
                      enter the chat
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
                  </Link>
                </div>
              </div>

              <div className="hidden px-24 overflow-hidden h-full w-full self-stretch md:flex items-center justify-center">
                <div className="bg-foreground/20 h-full w-[2px]"></div>
              </div>

              <div className="flex flex-1 items-center justify-center min-[768px]:justify-start min-[768px]:py-[0.625rem] min-[768px]:pl-[7.75rem] min-[1280px]:pl-0">
                {/* 
                  Mobile: taller container (h-[35rem]) so both stacked cards fit
                  without overflowing into the next artifact entry.
                  Desktop unchanged (h-[24.125rem]).
                */}
                <div className="relative w-[19.375rem] min-[768px]:w-[36.25rem] min-[768px]:max-w-[39rem] h-[35rem] min-[768px]:h-[24.125rem]">
                  {/* 
                    First Card (Left/Back)
                    Mobile: now a landscape rectangle (h-[200px] vs its old h-[386px]),
                    centered and pinned to the top.
                    Desktop: unchanged, centered vertically on the left.
                  */}
                  <div className="absolute left-1/2 -translate-x-1/2 top-0 min-[768px]:left-0 min-[768px]:top-1/2 min-[768px]:-translate-x-0 min-[768px]:-translate-y-1/2 w-[18.75rem] min-[768px]:w-auto z-0">
                    <div
                      style={{
                        boxShadow:
                          "0px 0px 2px 0px rgba(0, 0, 0, 0.18), 0px 0px 0px 4px rgba(240, 239, 230, 0.45), inset 0px 0px 0.36px 1.5px rgba(255, 255, 255, 0.5), inset 0px 2px 0px 0px white",
                      }}
                      className="relative min-[768px]:w-[26.6875rem] h-[12.5rem] min-[768px]:h-[20.625rem] rounded-[0.75rem] bg-surface overflow-hidden flex flex-col"
                    >
                      <div className="border-b border-gray-200/60 flex justify-between px-4 py-2">
                        <div className="flex items-center gap-4 text-[0.625rem]">
                          <div className="flex items-center gap-2">
                            <div className="size-2 rounded-full bg-[#FF605C]"></div>
                            <div className="size-2 rounded-full bg-[#FFBD44]"></div>
                            <div className="size-2 rounded-full bg-[#00CA4E]"></div>
                          </div>
                          <div className="flex items-center gap-2">
                            <span>Artifact</span>
                            <span>/</span>
                            <span>{data.campaign_name}</span>
                          </div>
                        </div>

                        <div className="flex items-center gap-2 text-foreground/70">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1}
                            stroke="currentColor"
                            className="size-3"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M8.242 5.992h12m-12 6.003H20.24m-12 5.999h12M4.117 7.495v-3.75H2.99m1.125 3.75H2.99m1.125 0H5.24m-1.92 2.577a1.125 1.125 0 1 1 1.591 1.59l-1.83 1.83h2.16M2.99 15.745h1.125a1.125 1.125 0 0 1 0 2.25H3.74m0-.002h.375a1.125 1.125 0 0 1 0 2.25H2.99"
                            />
                          </svg>

                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1}
                            stroke="currentColor"
                            className="size-3"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M3.375 19.5h17.25m-17.25 0a1.125 1.125 0 0 1-1.125-1.125M3.375 19.5h7.5c.621 0 1.125-.504 1.125-1.125m-9.75 0V5.625m0 12.75v-1.5c0-.621.504-1.125 1.125-1.125m18.375 2.625V5.625m0 12.75c0 .621-.504 1.125-1.125 1.125m1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125m0 3.75h-7.5A1.125 1.125 0 0 1 12 18.375m9.75-12.75c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125m19.5 0v1.5c0 .621-.504 1.125-1.125 1.125M2.25 5.625v1.5c0 .621.504 1.125 1.125 1.125m0 0h17.25m-17.25 0h7.5c.621 0 1.125.504 1.125 1.125M3.375 8.25c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125m17.25-3.75h-7.5c-.621 0-1.125.504-1.125 1.125m8.625-1.125c.621 0 1.125.504 1.125 1.125v1.5c0 .621-.504 1.125-1.125 1.125m-17.25 0h7.5m-7.5 0c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125M12 10.875v-1.5m0 1.5c0 .621-.504 1.125-1.125 1.125M12 10.875c0 .621.504 1.125 1.125 1.125m-2.25 0c.621 0 1.125.504 1.125 1.125M13.125 12h7.5m-7.5 0c-.621 0-1.125.504-1.125 1.125M20.625 12c.621 0 1.125.504 1.125 1.125v1.5c0 .621-.504 1.125-1.125 1.125m-17.25 0h7.5M12 14.625v-1.5m0 1.5c0 .621-.504 1.125-1.125 1.125M12 14.625c0 .621.504 1.125 1.125 1.125m-2.25 0c.621 0 1.125.504 1.125 1.125m0 1.5v-1.5m0 0c0-.621.504-1.125 1.125-1.125m0 0h7.5"
                            />
                          </svg>

                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1}
                            stroke="currentColor"
                            className="size-3"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M13.19 8.688a4.5 4.5 0 0 1 1.242 7.244l-4.5 4.5a4.5 4.5 0 0 1-6.364-6.364l1.757-1.757m13.35-.622 1.757-1.757a4.5 4.5 0 0 0-6.364-6.364l-4.5 4.5a4.5 4.5 0 0 0 1.242 7.244"
                            />
                          </svg>
                        </div>
                      </div>
                      <div className="p-4 py-4 flex flex-col gap-2">
                        {!data.youtubeLink && (
                          <>
                            <h6 className="font-medium text-foreground/90 text-[1rem] leading-[120%]">
                              Overview
                            </h6>

                            <p className="text-[0.75rem] text-foreground/70 pr-[1.25rem]">
                              {data.content}
                            </p>
                          </>
                        )}
                        {data.youtubeLink && (
                          <div
                            style={{
                              left: 0,
                              width: "100%",
                              height: 0,
                              position: "relative",
                              paddingBottom: "56.25%",
                            }}
                          >
                            <iframe
                              src={data.youtubeLink}
                              style={{
                                top: 0,
                                left: 0,
                                width: "100%",
                                height: "100%",
                                position: "absolute",
                                border: 0,
                              }}
                              allowFullScreen
                              scrolling="no"
                              allow="accelerometer *; clipboard-write *; encrypted-media *; gyroscope *; picture-in-picture *; web-share *;"
                              referrerPolicy="strict-origin"
                            />
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* 
                    Second Card (Right/Front) 
                    Mobile: now sits just below the shortened first card
                    (top-[170px] vs old top-[84px]) with a slight overlap.
                    Desktop: unchanged, right-aligned and vertically centered.
                  */}
                  <div className="absolute left-1/2 -translate-x-1/2 top-[10.625rem] min-[768px]:left-auto min-[768px]:right-0 min-[1280px]:right-[-5rem] min-[768px]:top-1/2 min-[768px]:-translate-x-0 min-[768px]:-translate-y-1/2 z-10">
                    <div
                      className="w-[18.75rem] min-[768px]:w-[16.875rem] h-[24.125rem] rounded-[0.75rem] overflow-hidden bg-background flex flex-col pb-2"
                      style={{
                        boxShadow:
                          "0px 0px 0px 1px rgba(0,0,0,0.08), 0px 0px 20px rgba(0,0,0,0.03), 0px 36px 28px rgba(0,0,0,0.02), 0px 25px 25px rgba(0,0,0,0.02), 0px 15px 15px rgba(0,0,0,0.02), inset 0px 0px 0px 1px white",
                      }}
                    >
                      <div className="flex items-center justify-between px-3 pr-2 py-2">
                        <div className="flex items-center justify-between w-full">
                          <span className="text-[0.625rem] text-foreground/80 font-medium">
                            Campaign Stats
                          </span>

                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1}
                            stroke="currentColor"
                            className="size-3"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M6 18 18 6M6 6l12 12"
                            />
                          </svg>
                        </div>
                      </div>
                      <div className="px-1 flex flex-1">
                        <div className="bg-gray-200/30 rounded-xl flex-1 p-6 px-6">
                          <div className="h-full w-full flex flex-col gap-3">
                            <div className="space-y-1.5">
                              <p className="text-[0.5625rem]">
                                {data.stats.primary.label}
                              </p>
                              <h5 className="text-4xl font-medium">
                                {data.stats.primary.value}
                              </h5>
                              <div className="w-full relative flex">
                                {data.stats.primary.isProgress && (
                                  <SegmentedProgressBar
                                    progress={Number(
                                      data.stats.primary.value.substring(0, 2),
                                    )}
                                    scrollStart="top 80%"
                                    activeColor="bg-[#86CEFF]"
                                    inactiveColor="bg-foreground/90"
                                  />
                                )}
                              </div>
                            </div>

                            <div className="flex-1 flex flex-col gap-2">
                              {data.stats.secondary.map((s) => (
                                <div
                                  key={s.label}
                                  className="flex items-center justify-between"
                                >
                                  <span className="text-[0.75rem]">{s.label}</span>
                                  <span className="font-medium">{s.value}</span>
                                </div>
                              ))}
                            </div>

                            <Link
                              href={"/contact"}
                              className="w-full flex items-center justify-center"
                            >
                              <button
                                className="w-full underline inline-flex items-center justify-center whitespace-nowrap font-medium outline-none focus-visible:ring-[3px] focus-visible:ring-white/20 cursor-pointer group border border-[#282834] rounded-lg gap-2 text-white hover:opacity-90 transition-opacity h-9 px-4 py-2 pr-3 text-[0.75rem] tracking-[-0.009375rem] leading-[140%] before:absolute before:inset-0 before:rounded-[inherit] before:bg-[linear-gradient(45deg,transparent_25%,theme(colors.white/.5)_50%,transparent_75%,transparent_100%)] dark:before:bg-[linear-gradient(45deg,transparent_25%,theme(colors.white)_50%,transparent_75%,transparent_100%)] before:bg-[length:250%_250%,100%_100%] before:bg-[position:200%_0,0_0] relative before:bg-no-repeat before:[transition:background-position_0s_ease] hover:before:bg-[position:-100%_0,0_0] hover:before:duration-[1500ms]"
                                style={{
                                  background:
                                    "linear-gradient(90deg, rgba(255, 255, 255, 0.00) 0%, rgba(255, 255, 255, 0.12) 100%), #1F1F29",
                                }}
                              >
                                replicate this result
                              </button>
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Artifacts;
