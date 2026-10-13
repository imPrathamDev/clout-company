"use client";
import Image from "next/image";
import React, { Fragment } from "react";
import { CaseStudy } from "@/sanity/queries/caseStudy";
import FolderFloat from "./folder";
import Link from "next/link";

const FileCard = ({ item }: { item: CaseStudy }) => {
  return (
    <div className="flex flex-col items-center gap-4">
      <div
        className="relative w-28 h-32 sm:w-32 sm:h-36 bg-[#f8f9f5] border border-[#e8ece0] transition-all duration-300 group-hover:-translate-y-1 group-hover:shadow-[0_8px_20px_rgba(0,0,0,0.06)]"
        style={{
          clipPath: "polygon(0 0, 68% 0, 100% 32%, 100% 100%, 0 100%)",
        }}
      >
        {/* Folded corner accent */}
        <div
          className="absolute top-0 right-0 w-[32%] h-[32%] bg-[#e8ece0]"
          style={{ clipPath: "polygon(100% 0, 100% 100%, 0 0)" }}
        />

        <div className="absolute inset-0 flex items-center justify-center p-6">
          {item.brand_logo ? (
            <Image
              src={item.brand_logo}
              alt={item.campaign_name}
              width={80}
              height={80}
              className="object-contain w-full h-full"
            />
          ) : (
            <span className="text-2xl font-medium text-foreground/50">
              {item.campaign_name.charAt(0)}
            </span>
          )}
        </div>
      </div>

      <h3 className="text-center text-[0.9375rem] sm:text-[1rem] font-medium leading-[130%] max-w-[10rem] text-foreground">
        {item.title}
      </h3>
    </div>
  );
};

function CaseStudyGrid({ caseStudies }: { caseStudies: CaseStudy[] }) {
  return (
    <Fragment>
      <section
        className="pb-0 2xl:pt-[13.75rem] xl:pt-[12.5rem] md:pt-[10rem] pt-[7.5rem] w-full mx-auto px-0 sm:px-4 md:px-6 border-b border-green-200/30 bg-green-100/30"
        data-navbar-theme="light"
      >
        <div className="flex flex-col items-center px-4 mx-auto w-full max-w-7xl">
          {/* Hero Icon SVG */}

          <div className="mb-4 max-w-4xl">
            <h1 className="text-pretty text-center text-[2rem] sm:text-[3rem] lg:text-[3.375rem] 3xl:text-[4rem] leading-[110%] tracking-[-0.0675rem] font-normal mb-6 md:mb-4 font-serif">
              Case Studies
            </h1>

            <div className="flex max-[400px]:flex-col gap-2 justify-center items-center mb-6">
              <p className="font-medium text-[1rem] tracking-[-0.009375rem] leading-[140%] text-foreground/80 text-center">
                Real-world examples of how we turned global distribution into
                measurable growth for ambitious tech companies.
              </p>
            </div>
          </div>

          <div className="relative mx-auto w-full h-[21.875rem]">
            <Image
              src={"/assets/images/case-studies/bg2.png"}
              alt={""}
              width={3840}
              height={300}
              // placeholder="blur"
              // blurDataURL={logs[0].mainImage?.asset.metadata.lqip}
              className="absolute inset-0 h-full w-full object-cover object-[50%_30%] rounded-t-2xl"
            />
          </div>
        </div>
      </section>
      <section className="flex flex-col justify-center items-center mx-auto max-w-[1100px] px-6 w-full pt-12">
        <div className="w-full pt-8 pb-24 sm:pb-28">
          {caseStudies.length === 0 ? (
            <p className="text-center text-[0.9375rem] text-foreground/60">
              No case studies published yet.
            </p>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 gap-x-8 sm:gap-x-12 gap-y-14 sm:gap-y-16 justify-center place-items-center mx-auto max-w-[850px] w-full">
              {caseStudies.map((item) => (
                <div
                  key={item._id}
                  className="group w-full hover:scale-105 transition-transform duration-500"
                >
                  <Link href={"/case-study/" + item.slug}>
                    {/* <FolderFloat
                      items={[
                        {
                          label: item.stats.primary.label,
                          value: item.stats.primary.value,
                        },
                        ...item.stats.secondary.map((k) => ({
                          label: k.label,
                          value: k.value,
                        })),
                      ].map((h) => `${h.value} ${h.label}`)}
                      label={item.campaign_name}
                      sublabel="Click to open"
                      trigger="hover"
                      closeOnSelect
                      physics
                      drift={0.5}
                      folderColor="#3f3f46"
                      frontColor="#52525b"
                      paperColor="#f5f5f5"
                      itemColor="#f5f5f5"
                      itemTextColor="#18181b"
                      labelColor="#f5f5f5"
                      width={180}
                      height={138}
                      radius={14}
                      spread={180}
                      lift={26}
                      tilt={8}
                      flapAngle={34}
                      restAngle={16}
                      openDuration={520}
                      stagger={45}
                      bounce={0.3}
                      brandLogo={item.brand_logo}
                    /> */}
                    <div className="w-full h-48 rounded-2xl p-1 bg-gray-100">
                      <div className="w-full h-full rounded-xl bg-gray-200 p-4">
                        <div className="w-full h-full relative">
                          <Image
                            src={item.brand_logo}
                            fill
                            className="object-contain"
                            alt={item.campaign_name}
                          />
                        </div>
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </Fragment>
  );
}

export default CaseStudyGrid;
