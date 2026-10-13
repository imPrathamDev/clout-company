import Image from "next/image";
import React from "react";

export interface Testimonial {
  quote: string;
  name: string;
  role: string;
  avatarUrl?: string;
  /** Small brand badge that overlaps the bottom-right of the avatar, as in the reference design */
  logoUrl?: string;
}

export const defaultTestimonials: Testimonial[] = [
  {
    quote:
      "Very thorough recommendations, we did not waste any time testing and had our high confidence creators giving us results from Day 1. Our entire campaign had 10-12 creators that we repeated throughout the season that garnered us most of our results. Loved the team's 80/20 approach",
    name: "Shivam",
    role: "Brand Lead, Mirai",
  },
  {
    quote:
      "CMG took on one of our toughest ICPs: study-abroad aspirants who had little reason to consider studying in India. From identifying the right creators across geographies to executing across time zones, which narrative to run, they turned a complex, counterintuitive campaign into a scalable one.",
    name: "Ashwin",
    role: "Marketing Manager, Polaris School of Tech",
  },
  {
    quote:
      "Oceania and South America are the most difficult markets to crack. We scaled these markets within one week of onboarding of Clout Company.",
    name: "Ayesha",
    role: "Growth Marketing, Emergent",
  },
  {
    quote:
      "We've had multiple agencies and brands reach out to us, we prefer routing our exclusive creators through Clout Company just cause their process is so seamless and creative, working with a cross border partner has never been easier.",
    name: "Daryl",
    role: "Talent Manager to Theo Baker, Next Level Talent Management",
  },
  {
    quote:
      "We’ve been working with their team from 14 months + , since we first started exploring influencer marketing. Throughout this time, they’ve helped us keep our content relevant, our messaging aligned with our audience, and our campaigns in tune with what’s working in the market.",
    name: "Sahiba",
    role: "Brand lead, Man Company (Emami Ltd.)",
  },
  {
    quote:
      "Helped us take a more integrated approach to ORM, ensuring our brand narrative stayed consistent across platforms - Reddit, Instagram, YT and more. Their understanding of how conversations evolve across different communities made them a valuable partner for us.",
    name: "Saad",
    role: "Marketing, Masai",
  },
];

const MIN_CARDS_PER_ROW = 6;

function TestimonialCard({
  quote,
  name,
  role,
  avatarUrl,
  logoUrl,
}: Testimonial) {
  const initial = name.charAt(0).toUpperCase();

  return (
    <div
      className="shrink-0 w-[19rem] sm:w-[25rem] rounded-2xl bg-background border border-black/[0.06] p-6 flex flex-col gap-10"
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

      <div className="flex items-center gap-3 mt-auto">
        <div className="flex flex-col">
          <span className="text-[1.35rem] font-medium leading-[130%] text-foreground font-serif">
            {name}
          </span>
          <span className="text-[0.8125rem] leading-[130%] text-foreground/60 mr-3">
            {role}
          </span>
        </div>
      </div>
    </div>
  );
}

// Pads a subset out to a minimum row length, then duplicates it once so the -50% translateX loops seamlessly
function buildMarqueeRow(subset: Testimonial[]) {
  if (subset.length === 0) return [];
  const repeatCount = Math.max(1, Math.ceil(MIN_CARDS_PER_ROW / subset.length));
  const set = Array.from({ length: repeatCount }, () => subset).flat();
  return [...set, ...set];
}

function Testimonials({
  testimonials = defaultTestimonials,
}: {
  testimonials?: Testimonial[];
}) {
  // Split into two unique halves so each row surfaces different testimonials
  const halfIndex = Math.ceil(testimonials.length / 2);
  const firstHalf = testimonials.slice(0, halfIndex);
  const secondHalf = testimonials.slice(halfIndex);

  const row1 = buildMarqueeRow(firstHalf);
  const row2 = buildMarqueeRow(secondHalf.length ? secondHalf : firstHalf);

  return (
    <section className="relative z-10 flex flex-col items-center gap-8 md:gap-12 py-16 md:py-24 w-full">
      <style>{`
        @keyframes testimonials-marquee-left {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes testimonials-marquee-right {
          0% { transform: translateX(-50%); }
          100% { transform: translateX(0); }
        }
        .animate-testimonials-marquee-left {
          animation: testimonials-marquee-left 40s linear infinite;
        }
        .animate-testimonials-marquee-right {
          animation: testimonials-marquee-right 40s linear infinite;
        }
        .testimonials-marquee-container:hover .animate-testimonials-marquee-left,
        .testimonials-marquee-container:hover .animate-testimonials-marquee-right {
          animation-play-state: paused;
        }
      `}</style>

      <h2 className="text-center m-0 text-[1.5rem] min-[767px]:text-[1.75rem] min-[1000px]:text-[2.25rem] font-normal leading-[115%] mx-auto">
        Hear from our partners
      </h2>

      <div className="relative w-full overflow-hidden testimonials-marquee-container flex flex-col gap-4 md:gap-6">
        {/* Left Gradient Fade */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-16 sm:w-32 md:w-48 bg-gradient-to-r from-background to-transparent z-10" />

        {/* Right Gradient Fade */}
        <div className="pointer-events-none absolute inset-y-0 right-0 w-16 sm:w-32 md:w-48 bg-gradient-to-l from-background to-transparent z-10" />

        {/* Row 1 - moving left */}
        <div className="flex w-max items-stretch gap-4 md:gap-6 py-2 animate-testimonials-marquee-left">
          {row1.map((t, i) => (
            <TestimonialCard key={`row1-${t.name}-${i}`} {...t} />
          ))}
        </div>

        {/* Row 2 - moving right */}
        <div className="flex w-max items-stretch gap-4 md:gap-6 py-2 animate-testimonials-marquee-right">
          {row2.map((t, i) => (
            <TestimonialCard key={`row2-${t.name}-${i}`} {...t} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default Testimonials;
