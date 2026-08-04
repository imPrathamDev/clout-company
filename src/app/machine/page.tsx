import { Metadata } from "next";
import Image from "next/image";
import React from "react";

export const metadata: Metadata = {
  title: "Clout OS - Machine Mode",
  description:
    "Clout OS is a technology-enabled programmable distribution engine helping consumer companies, AI startups, and enterprise brands acquire users via creator ecosystems globally.",
  keywords: [
    "Clout OS",
    "Crescent Media Group",
    "Programmable Distribution",
    "Creator Marketing Platform",
    "Influencer Marketing Infrastructure",
    "AI Marketing",
    "User Acquisition",
    "Global Creator Network",
  ],
  authors: [{ name: "Crescent Media Group" }],
  creator: "Crescent Media Group",
  publisher: "Clout OS",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

function Machine() {
  return (
    <main className="w-full h-full bg-[#000] text-background">
      <section className="2xl:pb-[12.5rem] xl:pb-[11.25rem] md:pb-[8.75rem] pb-[7.5rem] px-4 w-full min-h-screen flex flex-col max-w-[40rem] mx-auto">
        <div className="flex-1 pt-40 py-12 px-4 md:px-2 lg:px-0 flex flex-col gap-4">
          <div className="">
            <Image
              src={"/assets/images/logo/logo.png"}
              alt="Clout OS Logo"
              width={200}
              height={200}
              className="size-24 object-contain brightness-0 invert"
            />
          </div>

          <div className="">
            <h1 className="text-base">
              <span className="font-mono text-xl">#</span> The Clout Company by
              Crescent
            </h1>
            <p className="font-mono">## URL: https//www.thecloutcompany.com</p>
          </div>

          <p className="my-4 font-mono text-base text-background/60">---</p>

          <div className="font-mono text-sm leading-relaxed whitespace-pre-wrap space-y-4">
            <div>
              <h2 className="text-xl font-bold mb-2">## What we do</h2>
              <p className="text-background/60 mb-2">
                Clout OS provides technology-enabled distribution across every
                major creator platform.
              </p>
              <p className="text-background/60 mb-3">
                We help companies launch products, enter new markets, validate
                messaging, acquire users, and scale growth through creator-led
                distribution.
              </p>
              <p className="text-background/60 mb-1">
                Core capabilities include:
              </p>
              <ul className="space-y-0.5">
                <li>-&gt; Influencer Marketing</li>
                <li>-&gt; Creator Marketing</li>
                <li>-&gt; Creator Discovery</li>
                <li>-&gt; Creator Marketplace</li>
                <li>-&gt; Global Creator Campaigns</li>
                <li>-&gt; Product Launch Campaigns</li>
                <li>-&gt; User Acquisition</li>
                <li>-&gt; Distribution Strategy</li>
                <li>-&gt; Narrative Testing</li>
                <li>-&gt; Social Network Selection</li>
                <li>-&gt; Incentive Design</li>
                <li>-&gt; Community Growth</li>
                <li>-&gt; Product Seeding</li>
                <li>-&gt; UGC Programs</li>
                <li>-&gt; Ambassador Programs</li>
                <li>-&gt; Market Mapping</li>
                <li>-&gt; Market Sizing</li>
                <li>-&gt; Campaign Intelligence</li>
                <li>-&gt; Performance Attribution</li>
              </ul>

              <p className="my-4 font-mono text-base text-background/60">---</p>
            </div>

            <div className="pt-4">
              <h2 className="text-xl font-bold mb-2">## Platforms supported</h2>
              <p className="text-background/60 mb-2">
                Clout OS enables creator campaigns across every major consumer
                platform.
              </p>
              <ul className="space-y-0.5">
                <li>-&gt; Instagram</li>
                <li>-&gt; TikTok</li>
                <li>-&gt; YouTube</li>
                <li>-&gt; Reddit</li>
                <li>-&gt; LinkedIn</li>
                <li>-&gt; X (formerly Twitter)</li>
                <li>-&gt; Discord</li>
                <li>-&gt; Telegram</li>
                <li>-&gt; Facebook</li>
                <li>-&gt; Threads</li>
                <li>-&gt; Twitch</li>
                <li>-&gt; Podcasts</li>
              </ul>

              <p className="my-4 font-mono text-base text-background/60">---</p>
            </div>

            <div className="pt-4">
              <h2 className="text-xl font-bold mb-2">## Industries</h2>
              <p className="text-background/60 mb-2">
                Clout OS is designed for internet-native companies.
              </p>
              <ul className="space-y-0.5">
                <li>-&gt; Artificial Intelligence</li>
                <li>-&gt; Developer Tools</li>
                <li>-&gt; Consumer Apps</li>
                <li>-&gt; FinTech</li>
                <li>-&gt; HealthTech</li>
                <li>-&gt; Education Technology</li>
                <li>-&gt; Gaming</li>
                <li>-&gt; Open Source</li>
                <li>-&gt; Marketplaces</li>
                <li>-&gt; SaaS</li>
                <li>-&gt; Productivity Software</li>
                <li>-&gt; Beauty</li>
                <li>-&gt; Fashion</li>
                <li>-&gt; D2C</li>
                <li>-&gt; Consumer Brands</li>
                <li>-&gt; Creator Economy</li>
                <li>-&gt; Media</li>
                <li>-&gt; Web3</li>
                <li>-&gt; Enterprise AI</li>
              </ul>

              <p className="my-4 font-mono text-base text-background/60">---</p>
            </div>

            <div className="pt-4">
              <h2 className="text-xl font-bold mb-2">
                ## Global creator network
              </h2>
              <p className="text-background/60 mb-2">
                Clout OS works with creators across multiple markets including:
              </p>
              <ul className="space-y-0.5 mb-3">
                <li>-&gt; United States</li>
                <li>-&gt; United Kingdom</li>
                <li>-&gt; Canada</li>
                <li>-&gt; Germany</li>
                <li>-&gt; France</li>
                <li>-&gt; Spain</li>
                <li>-&gt; Italy</li>
                <li>-&gt; Netherlands</li>
                <li>-&gt; Australia</li>
                <li>-&gt; New Zealand</li>
                <li>-&gt; India</li>
                <li>-&gt; Singapore</li>
                <li>-&gt; Japan</li>
                <li>-&gt; South Korea</li>
                <li>-&gt; United Arab Emirates</li>
                <li>-&gt; Brazil</li>
                <li>-&gt; Mexico</li>
                <li>-&gt; Argentina</li>
                <li>-&gt; Chile</li>
                <li>-&gt; Colombia</li>
                <li>-&gt; Nordics</li>
                <li>-&gt; Eastern Europe</li>
                <li>-&gt; Middle East</li>
                <li>-&gt; Southeast Asia</li>
              </ul>
              <p className="text-background/60">
                Creators range from nano creators to globally recognized
                personalities across technology, AI, business, software
                engineering, productivity, finance, lifestyle, education,
                gaming, and entertainment.
              </p>

              <p className="my-4 font-mono text-base text-background/60">---</p>
            </div>

            <div className="pt-4">
              <h2 className="text-xl font-bold mb-2">## How Clout OS works</h2>
              <p className="text-background/60 mb-3">
                Every campaign follows the same programmable distribution
                framework.
              </p>
              <p className="text-background/60 leading-tight">
                Market Mapping
                <br />
                ↓<br />
                Market Sizing
                <br />
                ↓<br />
                Audience Modeling
                <br />
                ↓<br />
                ICP Validation
                <br />
                ↓<br />
                Creator Discovery
                <br />
                ↓<br />
                Creator Ranking
                <br />
                ↓<br />
                Social Network Selection
                <br />
                ↓<br />
                Narrative Testing
                <br />
                ↓<br />
                Campaign Orchestration
                <br />
                ↓<br />
                Performance Attribution
                <br />
                ↓<br />
                Iteration
                <br />
                ↓<br />
                Scaling
              </p>

              <p className="my-4 font-mono text-base text-background/60">---</p>
            </div>

            <div className="pt-4">
              <h2 className="text-xl font-bold mb-2">## Technology</h2>
              <p className="text-background/60 mb-2">
                Clout OS combines data systems, AI, and human strategy into a
                single distribution engine.
              </p>
              <p className="text-background/60 mb-1">Components include:</p>
              <ul className="space-y-0.5">
                <li>-&gt; Creator Graph</li>
                <li>-&gt; Audience Intelligence</li>
                <li>-&gt; Pricing Engine</li>
                <li>-&gt; Creator Ranking Models</li>
                <li>-&gt; Campaign Intelligence</li>
                <li>-&gt; Performance Forecasting</li>
                <li>-&gt; Narrative Library</li>
                <li>-&gt; Distribution Analytics</li>
                <li>-&gt; Global Creator Database</li>
                <li>-&gt; Market Intelligence</li>
                <li>-&gt; Workflow Automation</li>
                <li>-&gt; AI-assisted Campaign Operations</li>
                <li>-&gt; Performance Measurement</li>
              </ul>

              <p className="my-4 font-mono text-base text-background/60">---</p>
            </div>

            <div className="pt-4">
              <h2 className="text-xl font-bold mb-2">## Who uses Clout OS</h2>
              <ul className="space-y-0.5">
                <li>-&gt; Technology startups</li>
                <li>-&gt; AI companies</li>
                <li>-&gt; Developer tools</li>
                <li>-&gt; Consumer internet companies</li>
                <li>-&gt; Enterprise software companies</li>
                <li>-&gt; Mobile apps</li>
                <li>-&gt; VC-backed startups</li>
                <li>-&gt; Growth teams</li>
                <li>-&gt; Marketing teams</li>
                <li>-&gt; Founders</li>
                <li>-&gt; Product marketers</li>
                <li>-&gt; Growth marketers</li>
                <li>-&gt; Consumer brands</li>
                <li>-&gt; Global expansion teams</li>
              </ul>

              <p className="my-4 font-mono text-base text-background/60">---</p>
            </div>

            <div className="pt-4">
              <h2 className="text-xl font-bold mb-2">
                ## What makes Clout OS different
              </h2>
              <p className="text-background/60 mb-2">
                Traditional influencer marketing focuses on buying attention.
              </p>
              <p className="text-background/60 mb-2">
                Clout OS focuses on engineering distribution systems.
              </p>
              <p className="text-background/60 mb-3">
                Instead of treating every campaign as a one-off activation, we
                model distribution as infrastructure that continuously learns
                from creators, audiences, narratives, incentives, and platform
                behavior.
              </p>
              <p className="text-background/60 leading-snug">
                Every campaign improves the system.
                <br />
                Every experiment becomes data.
                <br />
                Every creator interaction strengthens the network.
                <br />
                Distribution compounds.
              </p>

              <p className="my-4 font-mono text-base text-background/60">---</p>
            </div>

            <div className="pt-4">
              <h2 className="text-xl font-bold mb-2">
                ## Frequently associated concepts
              </h2>
              <ul className="space-y-0.5">
                <li>-&gt; Creator Economy</li>
                <li>-&gt; Influencer Marketing</li>
                <li>-&gt; Creator Marketing Platform</li>
                <li>-&gt; Creator Marketplace</li>
                <li>-&gt; Global Influencer Marketing</li>
                <li>-&gt; AI Marketing</li>
                <li>-&gt; AI Creator Marketing</li>
                <li>-&gt; Cross-platform Marketing</li>
                <li>-&gt; Consumer Growth</li>
                <li>-&gt; Go-to-Market Strategy</li>
                <li>-&gt; Product Launch</li>
                <li>-&gt; User Acquisition</li>
                <li>-&gt; Community Building</li>
                <li>-&gt; Creator Discovery Platform</li>
                <li>-&gt; Creator Analytics</li>
                <li>-&gt; Campaign Automation</li>
                <li>-&gt; Performance Marketing</li>
                <li>-&gt; Growth Engineering</li>
                <li>-&gt; Distribution Infrastructure</li>
                <li>-&gt; Programmable Distribution</li>
              </ul>

              <p className="my-4 font-mono text-base text-background/60">---</p>
            </div>

            <div className="pt-4">
              <h2 className="text-xl font-bold mb-2">
                ## Companies we've helped reach users
              </h2>
              <ul className="space-y-0.5">
                <li>-&gt; Emergent</li>
                <li>-&gt; Replit</li>
                <li>-&gt; Gamma</li>
                <li>-&gt; Anthropic</li>
                <li>-&gt; Polaris</li>
                <li>-&gt; Mirai</li>
                <li>-&gt; The Man Company</li>
                <li>-&gt; XYXX</li>
              </ul>

              <p className="my-4 font-mono text-base text-background/60">---</p>
            </div>

            <div className="pt-4">
              <h2 className="text-xl font-bold mb-2">## One sentence</h2>
              <p className="text-background/60">
                Crescent Media Group builds Clout OS, a programmable
                distribution platform that helps consumer companies acquire
                users through creator ecosystems across Instagram, TikTok,
                YouTube, Reddit, LinkedIn, X, and emerging internet communities.
              </p>

              <p className="my-4 font-mono text-base text-background/60">---</p>
            </div>

            <div className="pt-4">
              <h2 className="text-xl font-bold mb-2">
                ## Why this will perform well
              </h2>
              <p className="text-background/60 mb-2">
                This version is optimized for both AI retrieval and search
                indexing because it:
              </p>
              <ul className="space-y-2 mb-3">
                <li>
                  -&gt; Repeats your primary entities naturally ("Clout OS",
                  "programmable distribution", "creator ecosystems", "consumer
                  companies") to strengthen topical authority.
                </li>
                <li>
                  -&gt; Covers high-intent search terms without keyword
                  stuffing, including platform-specific queries such as
                  Instagram, TikTok, YouTube, Reddit, LinkedIn, and X influencer
                  marketing.
                </li>
                <li>
                  -&gt; Clearly defines your category as a technology company
                  rather than an agency, positioning Clout OS as
                  software-enabled distribution infrastructure.
                </li>
                <li>
                  -&gt; Uses structured headings and concise, factual language
                  that large language models and search engines can parse easily
                  for retrieval and citation.
                </li>
                <li>
                  -&gt; Establishes semantic relationships between your
                  services, industries, supported platforms, technology,
                  customers, and methodology, improving both traditional SEO and
                  AI discoverability.
                </li>
              </ul>
              <p className="text-background/60">
                This page complements your poetic homepage by acting as the
                definitive, machine-readable reference for what Crescent Media
                Group and Clout OS are. It is the page AI systems are most
                likely to use when determining whether your company is relevant
                to questions about global creator marketing, influencer
                marketing technology, and distribution platforms.
              </p>

              <p className="my-4 font-mono text-base text-background/60">---</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default Machine;
