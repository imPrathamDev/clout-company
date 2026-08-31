import Image from "next/image";
import React from "react";

const articles = [
  {
    src: "/assets/images/pr/1.png",
    link: "https://www.siliconindia.com/news/general/solopreneur-builds-multimillion-ai-native-agency-in-8-months-proves-sequoias-next-1t-thesis-nid-241843-cid-1.html",
  },
  {
    src: "/assets/images/pr/2.png",
    link: "https://cxotoday.com/media-coverage/solopreneur-builds-multi-million-ai-native-agency-in-8-months-proves-sequoias-next-1t-thesis/",
  },
  {
    src: "/assets/images/pr/3.png",
    link: "https://demg.ai/blog/clout-company-zero-employees-multi-million-valuation/",
  },
];

function PRSection() {
  return (
    <div className="w-full pt-[80px] pb-[0px] md:pt-[80px] md:pb-[0px]">
      <div className="mx-auto max-w-[1100px] px-6 flex flex-col items-center">
        <h3 className="m-0 text-[24px] md:text-[32px] leading-[115%] tracking-[0.32px] text-center text-[#262323]">
          Recognized By Leading Voices In The Digital Space
        </h3>
        <p className="m-0 text-[15px] font-[460] leading-[140%] tracking-[0.15px] mt-3 text-[#262323]/60 max-w-[460px] text-center">
          Trusted by industry leaders. Explore the latest coverage of our
          campaigns and success stories.
        </p>

        <div className="grid grid-cols-3 gap-2 md:gap-6 mt-[30px]">
          {articles.map((article, index) => (
            <a
              target="_blank"
              key={index}
              href={article.link}
              className="relative group"
            >
              <div
                className={`z-2 cursor-pointer group relative items-center justify-center p-2 md:p-5 rounded-md md:rounded-xl bg-[#f8f9f5] border border-[#e8ece0] transition-all duration-300 hover:border-[#383a35]/20 hover:shadow-sm`}
              >
                {/* Client Logo Slot */}
                <div
                  // Scaled down width for mobile (w-16) to ensure cards look well-proportioned
                  className="w-full md:w-44 lg:w-64 aspect-4/2 flex items-center justify-center will-change-[filter,transform,opacity]"
                >
                  <Image
                    src={article.src}
                    alt={"The Clout Company"}
                    width={200}
                    height={80}
                    className="max-h-full max-w-full object-contain"
                  />
                </div>
              </div>
              <div className="w-full flex justify-center items-center">
                <span className="font-serif opacity-0 text-[14px] -translate-y-12 group-hover:translate-y-0 group-hover:opacity-90 transition-[opacity,translate] duration-500">
                  Read The Article
                </span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}

export default PRSection;
