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
        className="pb-[60px] md:pb-[280px] pt-0 px-0 w-full mx-auto"
        data-navbar-theme="light"
      >
        <div className="flex justify-center w-full">
          <div className="max-w-[580px] lg:max-w-[740px] xl:max-w-[880px] px-5 md:px-8 pt-[200px] mlg:pt-[300px]">
            <p className="font-medium text-[15px] tracking-[-0.15px] leading-[140%] text-center mb-[30px] max-w-[530px] mx-auto text-foreground/80">
              The joy of entrepreneurship has always been building.Yet, too many
              founders spend more time chasing distribution than building
              products people love.
            </p>

            <h2 className="text-pretty font-normal font-serif text-[32px] lg:text-[40px] xl:text-[48px] tracking-[-0.44px] md:tracking-[-0.8px] lg:tracking-[-0.96px] leading-[120%] md:leading-[110%] text-center mb-[100px]">
              By making distribution programmable, we can return founders to
              what they do best: solving meaningful problems and building
              products people love.
            </h2>

            <div className="relative max-w-[540px] mx-auto">
              <div className="relative overflow-hidden rounded-2xl pb-30 p-5 md:p-10 rounded-2xl border border-foreground/10 bg-foreground/5 shadow-lg w-full h-full">
                <div className="absolute inset-0 -z-1 opacity-50">
                  <Image
                    src={"/assets/images/paper-background/paper.jpg"}
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
                      className="font-medium text-[17px] tracking-[-0.27px] leading-[130%] text-foreground/80"
                    >
                      {para}
                    </p>
                  ))}

                  <div className="mt-20">
                    <p className="font-medium text-[17px] tracking-[-0.27px] leading-[130%] text-foreground/80">
                      with love,
                    </p>

                    <p className="font-medium text-[17px] tracking-[-0.27px] leading-[130%]">
                      Crescent &amp; Shubha
                    </p>
                  </div>
                </div>
              </div>

              <div className="h-[240px] w-[170px] md:h-[280px] md:w-[200px] px-3 pt-3 pb-8 bg-background absolute -bottom-[40px] md:-bottom-[160px] right-4 md:-right-[50px] rotate-12 shadow">
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
