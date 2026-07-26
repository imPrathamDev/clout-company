import React from "react";

function Machine() {
  return (
    <main className="w-full h-full bg-foreground text-background">
      <section className="2xl:pb-[200px] xl:pb-[180px] md:pb-[140px] pb-[120px] px-4 w-full min-h-screen flex flex-col max-w-[640px] mx-auto">
        <div className="flex-1 pt-40 py-12 px-4 md:px-2 lg:px-0 flex flex-col gap-4">
          <div className="">
            <h1 className="text-[18px]"># The Clout Company by Crescent</h1>
            <p className="font-mono">## URL: https//www.thecloutcompany.com</p>
          </div>

          <p className="text-sm text-background/90">::::</p>

          <div className="">
            <h2>## Title here....</h2>

            <p>your content here...</p>
          </div>
        </div>
      </section>
    </main>
  );
}

export default Machine;
