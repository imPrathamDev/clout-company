import Image from "next/image";
import Link from "next/link";
import React from "react";
import DisplayTime from "./home/time";

const dividers = [
  {
    color: "#CFEBE780",
  },
  {
    color: "#A0D7D180",
  },
  {
    color: "#A0D7D1",
  },
];

const links = [
  {
    href: "/",
    label: "Home",
  },
  {
    href: "/about",
    label: "Source Code",
  },
  {
    href: "/logs",
    label: "Logs",
  },
  {
    href: "/terms-and-conditions",
    label: "Terms & Conditions",
  },
  {
    href: "/privacy-policy",
    label: "Privacy Policy",
  },
];

function Footer() {
  return (
    <div>
      <section className="grid gap-32 py-6 justify-center items-center">
        <div className="flex flex-col justify-center items-center gap-4">
          <Image
            src={"/assets/images/logo/logo.png"}
            alt="Clout OS"
            width={70}
            height={70}
            className="object-contain"
          />

          <h2 className="font-serif text-[32px] lg:text-[40px] xl:text-[48px] tracking-[-0.44px] md:tracking-[-0.8px] lg:tracking-[-0.96px] leading-[120%] md:leading-[110%] text-center mb-8 max-w-[24ch] mx-auto">
            We're programming distribution for businesses that love building
          </h2>
        </div>
        <div className="flex items-center justify-between w-7xl">
          <div className="flex items-center gap-3">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-[13px] -tracking-wide font-medium hover:text-foreground/70 transition-colors duration-200"
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="">
            <DisplayTime />
          </div>
        </div>
      </section>
      <div className="w-full">
        {dividers.map((divide) => (
          <div key={divide.color}>
            <div
              className="w-full h-[6px]"
              style={{
                backgroundColor: divide.color,
              }}
            ></div>
            <div className="w-full h-[2px] bg-background"></div>
          </div>
        ))}
      </div>
      <div
        className="relative h-[500px]"
        style={{ clipPath: "polygon(0% 0, 100% 0%, 100% 100%, 0 100%)" }}
      >
        <div className="relative h-[calc(100vh+500px)] -top-[100vh]">
          <div
            data-navbar-theme="dark"
            className="h-[500px] sticky top-[calc(100vh-500px)]"
          >
            <section className="relative h-full w-full overflow-hidden">
              <div className="absolute w-screen h-full z-10 footer-gradient"></div>
              <div className="max-w-[1280px] mx-auto px-5 pb-5 absolute z-10 bottom-0 left-0 right-0 flex flex-col-reverse sm:flex-row justify-between items-center">
                <div className="flex gap-1 text-center md:text-left">
                  <span className="font-medium text-[13px] tracking-[-0.13px] leading-[130%] text-background">
                    © The Clout Company by Crescent 2026
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  <span className="font-medium text-[13px] tracking-[-0.13px] leading-[130%] text-background">
                    All Right Reserved.
                  </span>
                </div>
              </div>

              <div className="h-full w-full relative overflow-hidden">
                <Image
                  src={"/assets/images/footer.png"}
                  alt=""
                  fill
                  className="object-cover"
                />
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
