import React from "react";
import Navbar from "../nav/nav-bar";
import Footer from "../footer";

function LegalPageWrapper({
  children,
  lastUpdated,
  title,
}: {
  children: React.ReactNode;
  title: string;
  lastUpdated: string;
}) {
  return (
    <main className="">
      <Navbar />
      <section className="2xl:pb-[12.5rem] xl:pb-[11.25rem] md:pb-[8.75rem] pb-[7.5rem] px-4 w-full min-h-screen flex flex-col max-w-[40rem] mx-auto">
        <div className="flex-1 pt-40 py-12 px-4 md:px-2 lg:px-0">
          <div className="flex flex-col gap-4">
            <h1 className="text-4xl font-serif leading-[120%]">{title}</h1>

            <p className="text-[0.875rem] font-medium text-foreground/60">
              Last updated on {lastUpdated}
            </p>
          </div>

          <div className="">
            <div className="post-content max-w-[46.875rem] mx-auto prose text-neutral-900 prose-p:text-[0.9375rem] prose-p:tracking-[-0.009375rem] sm:prose-p:text-[1.125rem] sm:prose-p:tracking-[-0.01125rem] prose-p:mb-6 prose-h2:font-medium prose-h2:text-2xl prose-h2:mb-4 prose-h2:mt-8 sm:prose-h2:mt-14 lg:prose-h2:mt-16 2xl:prose-h2:mt-20 prose-h3:font-medium prose-h3:text-lg prose-h3:mb-4 prose-h3:mt-8 sm:prose-h3:mt-14 lg:prose-h3:mt-16 2xl:prose-h3:mt-20 prose-a:text-neutral-700 prose-a:no-underline prose-a:border-b prose-a:border-neutral-300 prose-a:font-normal prose-a:leading-[130%] prose-a:transition-all prose-a:duration-200 prose-a:hover:text-neutral-900 prose-a:hover:border-neutral-900 prose-ol:text-neutral-900 prose-ol:pl-2 prose-li:mt-0 prose-li:mb-6 prose-li:text-[0.9375rem] prose-li:tracking-[-0.009375rem] prose-li:leading-[150%] sm:prose-li:text-[1.125rem] sm:prose-li:tracking-[-0.01125rem] prose-strong:font-medium prose-img:my-8 sm:prose-img:my-14 lg:prose-img:my-16 2xl:prose-img:my-20 prose-img:shadow-[0_2px_2px_0_rgba(0,0,0,0.06),0_6px_6px_0_rgba(0,0,0,0),0_0_0_5px_rgba(0,0,0,0.04)] prose-img:rounded-lg md:prose-img:rounded-2xl">
              {children}
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}

export default LegalPageWrapper;
