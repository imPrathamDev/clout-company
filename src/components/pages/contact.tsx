"use client";

import React, { useState } from "react";
import Navbar from "../nav/nav-bar";
import Footer from "../footer";
import Script from "next/script";

const arr = [
  {
    icon: (
      <svg
        className="size-6"
        viewBox="0 -31.5 256 256"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        preserveAspectRatio="xMidYMid"
      >
        <g>
          <path
            d="M58.1818182,192.049515 L58.1818182,93.1404244 L27.5066233,65.0770089 L0,49.5040608 L0,174.59497 C0,184.253152 7.82545455,192.049515 17.4545455,192.049515 L58.1818182,192.049515 Z"
            fill="#4285F4"
          ></path>
          <path
            d="M197.818182,192.049515 L238.545455,192.049515 C248.203636,192.049515 256,184.224061 256,174.59497 L256,49.5040608 L224.844415,67.3422767 L197.818182,93.1404244 L197.818182,192.049515 Z"
            fill="#34A853"
          ></path>
          <polygon
            fill="#EA4335"
            points="58.1818182 93.1404244 54.0077618 54.4932827 58.1818182 17.5040608 128 69.8676972 197.818182 17.5040608 202.487488 52.4960089 197.818182 93.1404244 128 145.504061"
          ></polygon>
          <path
            d="M197.818182,17.5040608 L197.818182,93.1404244 L256,49.5040608 L256,26.2313335 C256,4.64587897 231.36,-7.65957557 214.109091,5.28587897 L197.818182,17.5040608 Z"
            fill="#FBBC04"
          ></path>
          <path
            d="M0,49.5040608 L26.7588051,69.5731646 L58.1818182,93.1404244 L58.1818182,17.5040608 L41.8909091,5.28587897 C24.6109091,-7.65957557 0,4.64587897 0,26.2313335 L0,49.5040608 Z"
            fill="#C5221F"
          ></path>
        </g>
      </svg>
    ),
    heading: " Send an Owl 🦉",
    subHeading: "15-28 hours response time",
    label: "shubha@thecrescentmediagroup.com",
    href: "mailto:shubha@thecrescentmediagroup.com",
  },
  {
    icon: <span>📞</span>,
    heading: "Call the Pack 🐕",
    subHeading: "6-10 hours response time",
    label: "+91 84489 97487",
    href: "tel:91 84489 97487",
  },
  {
    icon: (
      <svg
        className="size-6"
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M24 0C37.2547 0 48 10.7453 48 24C48 37.2547 37.2547 48 24 48C19.82 48 15.8904 46.9314 12.4678 45.0527L0 48L3.19629 35.9736C1.16368 32.4497 0 28.3606 0 24C6.76533e-07 10.7453 10.7453 6.76489e-07 24 0ZM24 4.29785C13.1194 4.29785 4.299 13.1185 4.29883 23.999C4.29883 28.1943 5.6104 32.083 7.8457 35.2783L5.7793 42.3193L13.1455 40.4434C16.2581 42.5026 19.9887 43.7012 24 43.7012V43.7002C34.8807 43.7002 43.7012 34.8797 43.7012 23.999C43.701 13.1185 34.8806 4.29785 24 4.29785ZM17.4043 12.1562C17.6982 12.1324 17.9685 12.3028 18.0938 12.5693L20.8311 18.376C20.9604 18.6506 20.9041 18.9777 20.6895 19.1924L18.6484 21.2324C18.2072 21.6737 18.0781 22.361 18.3818 22.9062C19.1265 24.2415 20.1281 25.5276 21.2881 26.7109C22.4714 27.8709 23.7574 28.8732 25.0928 29.6172C25.6381 29.9212 26.3246 29.7919 26.7666 29.3506L28.8076 27.3096C29.0222 27.0953 29.3486 27.0382 29.623 27.168L35.4297 29.9053C35.6964 30.0306 35.8677 30.3014 35.8438 30.5947C35.7811 31.3587 35.4741 32.8901 34.1016 34.2627C30.227 38.1372 23.2692 33.7536 22.9854 33.584C21.2741 32.6647 19.6483 31.4347 18.1064 29.8936C16.5651 28.3522 15.3344 26.725 14.415 25.0137C14.2445 24.7301 9.86133 17.7735 13.7363 13.8984C15.109 12.5258 16.6403 12.2189 17.4043 12.1562Z"
          fill="#25D366"
        />
      </svg>
    ),
    heading: "Quick Woof  🐾",
    subHeading: "Sometimes instantly",
    label: "+91 95991 62551",
    href: "https://wa.me/919599162551",
  },
];

function CalendlyWidget() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div className="relative mx-auto w-full max-w-3xl lg:max-w-5xl">
      {isLoading && (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 rounded-2xl bg-background shadow-[0_0_0_1px_#fff_inset,0_0_0_1px_rgba(0,0,0,0.08),0_0_20px_0_rgba(0,0,0,0.03)]">
          <div className="size-8 animate-spin rounded-full border-2 border-foreground/20 border-t-foreground" />
          <p className="text-sm font-medium text-foreground/60">
            Loading calendar...
          </p>
        </div>
      )}

      <div
        className={`calendly-inline-widget min-w-[17.5rem] w-full h-[37.5rem] sm:h-[40.625rem] lg:h-[43.75rem] transition-opacity duration-300 ${
          isLoading ? "opacity-0" : "opacity-100"
        }`}
        data-url="https://calendly.com/shubhaaa/30min"
      />

      <Script
        src="https://assets.calendly.com/assets/external/widget.js"
        strategy="lazyOnload"
        onReady={() => setIsLoading(false)}
      />
    </div>
  );
}

function ContactPage() {
  return (
    <main>
      <Navbar />
      <section className="relative flex flex-col justify-center min-h-screen py-20 lg:py-32 overflow-hidden">
        {/* Header Container */}
        <div className="mx-auto w-full max-w-3xl px-4 sm:px-6 text-center">
          <h2
            style={{
              textShadow:
                "0 0 3px rgba(0, 0, 0, 0.08), 0 0.5px 0.5px rgba(0, 0, 0, 0.12)",
            }}
            className="mx-auto max-w-[22ch] text-3xl font-semibold leading-tight text-foreground md:text-4xl lg:text-[2.5rem]"
          >
            Enter the chat
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-base font-medium leading-relaxed text-foreground/80 md:text-lg">
            Brand or creator? Deploy your next growth cycle with us
          </p>
        </div>

        <div className="mx-auto mt-12 w-full px-4 sm:px-6">
          <CalendlyWidget />
        </div>
        {/* Grid Container */}
        <div className="mx-auto mt-16 mb-12 grid w-full max-w-7xl grid-cols-1 gap-6 px-4 sm:px-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-10 xl:px-8">
          {arr.map((i) => (
            <a
              key={i.href}
              href={i.href}
              className="group relative flex h-full flex-col outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 rounded-2xl"
            >
              <div className="flex h-full flex-col justify-between gap-12 rounded-2xl bg-background p-6 shadow-[0_0_0_1px_#fff_inset,0_0_0_1px_rgba(0,0,0,0.08),0_0_20px_0_rgba(0,0,0,0.03),0_36px_28px_0_rgba(0,0,0,0.02),0_4px_4px_0_rgba(0,0,0,0.02)] transition-transform duration-300 ease-out group-hover:-translate-y-1 group-hover:shadow-[0_0_0_1px_#fff_inset,0_0_0_1px_rgba(0,0,0,0.08),0_0_24px_0_rgba(0,0,0,0.05),0_42px_32px_0_rgba(0,0,0,0.04),0_8px_8px_0_rgba(0,0,0,0.03)]">
                {/* Icon Box */}
                <div className="flex size-12 items-center justify-center rounded-xl bg-background shadow-[0_0_0_1px_#fff_inset,0_0_0_1px_rgba(0,0,0,0.08),0_0_20px_0_rgba(0,0,0,0.03),0_36px_28px_0_rgba(0,0,0,0.02),0_4px_4px_0_rgba(0,0,0,0.02)]">
                  {i.icon}
                </div>

                {/* Text Content */}
                <div className="flex flex-col gap-5 mt-auto">
                  <div className="space-y-1.5">
                    <h5 className="text-xl font-semibold tracking-tight text-foreground md:text-2xl">
                      {i.heading}
                    </h5>
                    <p className="text-sm text-foreground/70 md:text-base">
                      {i.subHeading}
                    </p>
                  </div>

                  <span className="text-sm font-semibold underline decoration-foreground/30 underline-offset-4 transition-colors group-hover:decoration-foreground">
                    {i.label}
                  </span>
                </div>
              </div>
            </a>
          ))}
        </div>
      </section>
      <Footer />
    </main>
  );
}

export default ContactPage;
