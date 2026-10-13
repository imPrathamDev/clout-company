import React from "react";
import { Testimonial, defaultTestimonials } from "./testimonials";

function MasonryTestimonialCard({ quote, name, role }: Testimonial) {
  return (
    <div
      className="break-inside-avoid mb-4 md:mb-6 w-full rounded-2xl bg-background border border-black/[0.06] p-6 flex flex-col gap-10"
      style={{
        boxShadow:
          "0 0 0 1px rgba(255,255,255,0.6) inset, 0 2px 0 0 #fff inset, 0 0 20px 0 rgba(0,0,0,0.03), 0 36px 28px 0 rgba(0,0,0,0.02), 0 4px 4px 0 rgba(0,0,0,0.02)",
      }}
    >
      <p className="m-0 text-[0.9375rem] leading-[145%] text-foreground/90 font-[460] tracking-[-0.00938rem]">
        <span className="font-serif text-[1rem]">&ldquo;</span>
        {quote}
        <span className="font-serif text-[1rem]">&rdquo;</span>
      </p>

      <div className="flex flex-col mt-auto">
        <span className="text-[1.35rem] font-medium leading-[130%] text-foreground font-serif">
          {name}
        </span>
        <span className="text-[0.8125rem] leading-[130%] text-foreground/60">
          {role}
        </span>
      </div>
    </div>
  );
}

function TestimonialsMasonry({
  testimonials = defaultTestimonials,
}: {
  testimonials?: Testimonial[];
}) {
  return (
    <section className="relative z-10 flex flex-col items-center gap-8 md:gap-12 py-16 md:py-24 w-full px-6">
      <h2 className="text-center m-0 text-[1.5rem] min-[767px]:text-[1.75rem] min-[1000px]:text-[2.25rem] font-normal leading-[115%] mx-auto">
        Hear from our partners
      </h2>

      <div className="w-full max-w-[70rem] mx-auto columns-1 sm:columns-2 lg:columns-3 gap-4 md:gap-6">
        {testimonials.map((t, i) => (
          <MasonryTestimonialCard key={`${t.name}-${i}`} {...t} />
        ))}
      </div>
    </section>
  );
}

export default TestimonialsMasonry;
