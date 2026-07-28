import Image from "next/image";
import React from "react";
import AgencyFlowChart from "./social-media-flow-chart";
import MobileSocialPlatforms from "./mobile-social-platforms";

function SocialPlatforms() {
  return (
    <section className="relative flex min-h-0 flex-1 flex-col justify-center h-[70vh] md:h-svh pt-[100px] min-[1000px]:pb-[220px] pb-[160px] min-[767px]:pb-[100px] overflow-hidden">
      <Image
        src={"/assets/images/platforms/bg.png"}
        alt="Clout OS"
        loading="eager"
        fill
        sizes="100vw"
        className="object-cover"
      />
      <div className="w-full h-full absolute top-0 left-0">
        <div className="mx-auto max-w-[800px] max-[1000px]:w-full shrink-0 px-6 mt-[100px]">
          <h2
            style={{
              textShadow:
                "0 0 3px rgba(0, 0, 0, 0.08), 0 0.5px 0.5px rgba(0, 0, 0, 0.12)",
            }}
            className="text-background leading-[120%] m-0 mx-auto text-center text-[26px] min-[768px]:text-[32px] min-[1000px]:text-[40px] max-w-[22ch]"
          >
            Multiple platforms. Every user.
            <br />
            <span
              style={{
                background:
                  "linear-gradient(180deg, rgba(255, 255, 255, 0.80) -0.93%, rgba(255, 255, 255, 0.64) 104.17%)",
                backgroundClip: "text",
                color: "transparent",
                textShadow: "none",
              }}
            >
              One OS
            </span>
          </h2>
          <p className="m-0 mx-auto mt-5 max-w-[580px] text-center text-[16px] font-[460] leading-[150%] text-background/80">
            Build compounding reach across channels.
          </p>
        </div>

        <div className="mt-14 mb-12 flex items-center justify-center">
          <div className="w-[95vw] md:w-[40vw] lg:w-[60vw] xl:w-[40vw] aspect-video rounded-2xl p-2 bg-gray-100/80">
            <div className="hidden lg:flex w-full h-full rounded-xl bg-background items-center justify-center">
              <AgencyFlowChart />
            </div>

            <MobileSocialPlatforms />
          </div>
        </div>
      </div>
    </section>
  );
}

export default SocialPlatforms;
