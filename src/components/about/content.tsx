import Image from "next/image";
import React from "react";

const paras = [
  "We believe every meaningful company begins the same way: with someone trying to solve a problem they deeply care about.",
  "Throughout history, the hardest part of entrepreneurship has changed. Manufacturing, capital, software, and infrastructure each became dramatically easier over time. AI is now doing the same for product creation.",
  "The bottleneck has moved. It's now distribution.",
  "Too many founders spend their best years learning growth tactics, optimizing algorithms, and competing for attention instead of building products that improve people's lives.",
  "Our ambition is to make distribution programmable- an infrastructure layer as reliable as cloud computing or payments. A world where reaching the right users is no longer a craft reserved for a few, but a capability available to every builder.",
  "We hope to gift the world the joy of building where people build from curiosity, pursue mastery, and create simply because they can't help but solve meaningful problems.",
];

function Content() {
  return (
    <div className="w-full">
      <section
        className="pb-[3.75rem] md:pb-[17.5rem] pt-0 px-0 w-full mx-auto"
        data-navbar-theme="light"
      >
        <div className="flex justify-center w-full">
          <div className="max-w-[36.25rem] lg:max-w-[46.25rem] xl:max-w-[55rem] px-5 md:px-8 pt-[12.5rem] mlg:pt-[18.75rem]">
            <p className="font-medium text-[0.9375rem] tracking-[-0.009375rem] leading-[140%] text-center mb-[1.875rem] max-w-[33.125rem] mx-auto text-foreground/80">
              The joy of entrepreneurship has always been building.Yet, too many
              founders spend more time chasing distribution than building
              products people love.
            </p>

            <h2 className="text-pretty font-normal font-serif text-[2rem] lg:text-[2.5rem] xl:text-[3rem] tracking-[-0.0275rem] md:tracking-[-0.05rem] lg:tracking-[-0.06rem] leading-[120%] md:leading-[110%] text-center mb-[6.25rem]">
              By making distribution programmable, we can return founders to
              what they do best: solving meaningful problems and building
              products people love.
            </h2>

            <div className="relative max-w-[39.375rem] mx-auto">
              <div className="relative overflow-hidden rounded-2xl pb-30 p-5 md:p-10 rounded-2xl border border-foreground/10 bg-foreground/5 shadow-lg w-full h-full">
                <div className="absolute inset-0 -z-1 opacity-100">
                  <Image
                    src={"/assets/images/about/paper.png"}
                    alt="Paper Texture"
                    fill
                    priority
                    sizes="100vw"
                    className="object-cover w-full"
                  />
                </div>
                <div className="space-y-6">
                  {paras.map((para, index) => (
                    <p
                      key={index}
                      className="font-medium text-[1.0625rem] tracking-[-0.016875rem] leading-[130%] text-foreground/80"
                    >
                      {para}
                    </p>
                  ))}

                  <div className="mt-20">
                    <p className="font-medium text-[1.0625rem] tracking-[-0.016875rem] leading-[130%] text-foreground/80">
                      with love,
                    </p>

                    <p className="font-medium text-[1.0625rem] tracking-[-0.016875rem] leading-[130%]">
                      Crescent &amp; Shubha
                    </p>
                  </div>
                </div>
              </div>

              <div className="h-[15rem] w-[10.625rem] md:h-[17.5rem] md:w-[12.5rem] px-3 pt-3 pb-8 bg-background absolute -bottom-[2.5rem] md:-bottom-[6.875rem] right-4 md:-right-[1.25rem] rotate-12 shadow">
                <div className="w-full h-full overflow-hidden relative">
                  <Image
                    src={"/assets/images/about/about-frame.jpeg"}
                    alt=""
                    fill
                    sizes="100vw"
                    className="object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Content;
