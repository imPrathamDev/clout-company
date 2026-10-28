"use client";

import { urlFor } from "@/sanity/lib/image";
import {
  CaseStudy,
  CaseStudyBodyBlock,
  CaseStudyVideoBlock,
  CaseStudyVideoEmbedBlock,
  StatItem,
} from "@/sanity/queries/caseStudy";
import { PortableText, type PortableTextComponents } from "next-sanity";
import Image from "next/image";
import Link from "next/link";
import { Fragment, useCallback, useMemo, useState } from "react";
import VideoEmbed from "./video-embed";

function isVideoBlock(
  block: CaseStudyBodyBlock,
): block is CaseStudyVideoBlock | CaseStudyVideoEmbedBlock {
  return block._type === "video" || block._type === "videoEmbed";
}

type ShareAction = "twitter" | "linkedin" | "copy";

function StatsRow({
  primary,
  secondary,
  className = "",
}: {
  primary: StatItem;
  secondary: StatItem[];
  className?: string;
}) {
  return (
    <div
      className={`not-prose p-6 sm:p-8 w-full border-y border-gray-100 ${className}`}
    >
      <div className="flex flex-row md:flex-row gap-8 md:gap-16 items-start justify-center">
        <div className="flex flex-col gap-1.5 shrink-0">
          <p className="text-[0.75rem] text-foreground/60">{primary.label}</p>
          <h2 className="text-[2.5rem] sm:text-6xl font-serif font-medium leading-none">
            {primary.value}
          </h2>
        </div>

        {secondary.length > 0 && (
          <div className="hidden md:block w-px bg-foreground/10 self-stretch" />
        )}

        {secondary.map((stat, index) => (
          <Fragment key={stat.label}>
            <div className="flex flex-col gap-1.5 shrink-0">
              <p className="text-[0.75rem] text-foreground/60">{stat.label}</p>
              <h2 className="text-[2.5rem] sm:text-6xl font-serif font-medium leading-none">
                {stat.value}
              </h2>
            </div>

            {index !== secondary.length - 1 && (
              <div className="hidden md:block w-px bg-foreground/10 self-stretch" />
            )}
          </Fragment>
        ))}
      </div>
    </div>
  );
}

const portableTextComponents: PortableTextComponents = {
  types: {
    image: ({ value }) => {
      if (!value?.asset) return null;
      return (
        <span className="block my-8 sm:my-14">
          <Image
            src={urlFor(value).width(1400).url()}
            alt={value.alt || ""}
            width={1400}
            height={900}
            className="w-[50%] h-auto rounded-lg md:rounded-2xl shadow-[0_2px_2px_0_rgba(0,0,0,0.06),0_6px_6px_0_rgba(0,0,0,0),0_0_0_5px_rgba(0,0,0,0.04)]"
          />
          {value.caption && (
            <span className="block text-center text-[0.8125rem] text-foreground/60 mt-3">
              {value.caption}
            </span>
          )}
        </span>
      );
    },
    video: ({ value }) => {
      if (!value?.asset?.url) return null;
      return (
        <span className="block my-8 sm:my-14">
          {/* Natively hosted Sanity video asset — no network cost until played */}
          <video
            controls
            playsInline
            preload="none"
            className="w-full rounded-lg md:rounded-2xl"
            src={value.asset.url}
          />
          {value.caption && (
            <span className="block text-center text-[0.8125rem] text-foreground/60 mt-3">
              {value.caption}
            </span>
          )}
        </span>
      );
    },
    statsBlock: ({ value }) => (
      <StatsRow
        primary={value.primary}
        secondary={value.secondary ?? []}
        className="my-8 sm:my-14"
      />
    ),
    videoEmbed: ({ value }) => {
      if (!value?.url) return null;
      return (
        <VideoEmbed
          url={value.url}
          caption={value.caption}
          thumbnail={value.thumbnail}
          thumbnailLqip={value.thumbnailLqip}
        />
      );
    },
  },
};

function Content({ caseStudy }: { caseStudy: CaseStudy }) {
  const [copied, setCopied] = useState(false);

  // Videos are pulled out of the body flow so they can be shown together in
  // the sticky rail instead of inline between paragraphs.
  const { textBody, videoBlocks } = useMemo(() => {
    const textBody: CaseStudyBodyBlock[] = [];
    const videoBlocks: (CaseStudyVideoBlock | CaseStudyVideoEmbedBlock)[] = [];

    for (const block of caseStudy.body) {
      if (isVideoBlock(block)) {
        videoBlocks.push(block);
      } else {
        textBody.push(block);
      }
    }

    return { textBody, videoBlocks };
  }, [caseStudy.body]);

  const handleLinkAction = useCallback(
    async (link: string, action: ShareAction): Promise<void> => {
      const encodedLink = encodeURIComponent(link);

      switch (action) {
        case "twitter": {
          const twitterUrl = `https://twitter.com/intent/tweet?url=${encodedLink}`;
          window.open(twitterUrl, "_blank", "noopener,noreferrer");
          break;
        }

        case "linkedin": {
          const linkedinUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodedLink}`;
          window.open(linkedinUrl, "_blank", "noopener,noreferrer");
          break;
        }

        case "copy": {
          try {
            if (!navigator?.clipboard) {
              throw new Error(
                "Clipboard API is not supported in this environment.",
              );
            }

            await navigator.clipboard.writeText(link);
            setCopied(true);
            setTimeout(() => {
              setCopied(false);
            }, 2000);
          } catch (error) {
            console.error("Failed to copy link:", error);
          }
          break;
        }

        default: {
          const _exhaustiveCheck: never = action;
          console.warn(`Unsupported share action: ${_exhaustiveCheck}`);
        }
      }
    },
    [],
  );

  return (
    <div className="w-full">
      <section className="2xl:pb-[13.75rem] xl:pb-[12.5rem] md:pb-[10rem] pb-[7.5rem] 2xl:pt-[13.75rem] xl:pt-[12.5rem] md:pt-[10rem] pt-[7.5rem] w-full mx-auto px-5 sm:px-25">
        <div className="w-full mx-auto max-w-[80rem]">
          <div className="px-4 pb-8 sm:pb-12 mx-auto w-full max-w-4xl flex flex-col items-center gap-6 sm:gap-10">
            <Link
              href={"/case-studies"}
              className="font-medium text-[0.875rem] text-foreground/60 underline flex items-center gap-2"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3"
                />
              </svg>
              Go Back
            </Link>

            <div className="flex flex-col md:flex-row items-center gap-6">
              <div className="flex flex-col gap-4">
                <h1 className="text-left text-[2rem] sm:text-[3rem] lg:text-[3.375rem] 3xl:text-[4rem] leading-[110%] tracking-[-0.0675rem] font-normal font-serif">
                  {caseStudy.title}
                </h1>

                <p className="text-left text-[1rem] tracking-[-0.009375rem] leading-[140%] text-foreground/80 max-w-xl">
                  {caseStudy.content}
                </p>
              </div>

              <div className="rounded-xl bg-[#f8f9f5] border border-[#e8ece0] w-full h-32 md:size-52 flex items-center justify-center p-4 shrink-0">
                {caseStudy.brand_logo ? (
                  <Image
                    src={caseStudy.brand_logo}
                    alt={caseStudy.campaign_name}
                    width={80}
                    height={80}
                    className="object-contain w-full h-full"
                  />
                ) : (
                  <span className="text-2xl font-medium text-foreground/50">
                    {caseStudy.campaign_name.charAt(0)}
                  </span>
                )}
              </div>
            </div>
          </div>

          <div className="px-0 md:px-25">
            {/* Stats */}
            <StatsRow
              primary={caseStudy.stats.primary}
              secondary={caseStudy.stats.secondary}
              className="mb-10 sm:mb-15 md:mb-15 lg:mb-20 xl:mb-25"
            />
          </div>
        </div>

        <div className="w-full mx-auto max-w-[90rem]">
          <div className="flex flex-col lg:flex-row lg:items-start gap-10 lg:gap-16">
            <div className="post-content min-w-0 flex-1 max-w-[46.875rem] mx-auto lg:mx-0 prose text-neutral-900 prose-p:text-[0.9375rem] prose-p:tracking-[-0.009375rem] sm:prose-p:text-[1.125rem] sm:prose-p:tracking-[-0.01125rem] prose-p:mb-6 prose-h2:font-medium prose-h2:text-2xl prose-h2:mb-4 prose-h2:mt-8 sm:prose-h2:mt-14 lg:prose-h2:mt-16 2xl:prose-h2:mt-20 prose-h3:font-medium prose-h3:text-lg prose-h3:mb-4 prose-h3:mt-8 sm:prose-h3:mt-14 lg:prose-h3:mt-16 2xl:prose-h3:mt-20 prose-h4:font-medium prose-h4:text-base prose-h4:mb-3 prose-h4:mt-6 prose-blockquote:font-normal prose-blockquote:not-italic prose-a:text-neutral-700 prose-a:no-underline prose-a:border-b prose-a:border-neutral-300 prose-a:font-normal prose-a:leading-[130%] prose-a:transition-all prose-a:duration-200 prose-a:hover:text-neutral-900 prose-a:hover:border-neutral-900 prose-ol:text-neutral-900 prose-ol:pl-2 prose-li:mt-0 prose-li:mb-6 prose-li:text-[0.9375rem] prose-li:tracking-[-0.009375rem] prose-li:leading-[150%] sm:prose-li:text-[1.125rem] sm:prose-li:tracking-[-0.01125rem] prose-strong:font-medium prose-img:my-8 sm:prose-img:my-14 lg:prose-img:my-16 2xl:prose-img:my-20 prose-img:shadow-[0_2px_2px_0_rgba(0,0,0,0.06),0_6px_6px_0_rgba(0,0,0,0),0_0_0_5px_rgba(0,0,0,0.04)] prose-img:rounded-lg md:prose-img:rounded-2xl">
              <PortableText
                value={textBody}
                components={portableTextComponents}
              />
            </div>

            {videoBlocks.length > 0 && (
              <div className="w-full lg:w-[23rem] shrink-0 flex flex-col gap-8 sm:gap-10 lg:sticky lg:top-28 lg:self-start">
                {videoBlocks.map((block, index) =>
                  block._type === "video" ? (
                    block.asset?.url ? (
                      <span key={block._key ?? index} className="block">
                        <video
                          controls
                          playsInline
                          preload="none"
                          className="w-full rounded-lg md:rounded-2xl"
                          src={block.asset.url}
                        />
                        {block.caption && (
                          <span className="block text-center text-[0.8125rem] text-foreground/60 mt-3">
                            {block.caption}
                          </span>
                        )}
                      </span>
                    ) : null
                  ) : block._type === "videoEmbed" && block.url ? (
                    <VideoEmbed
                      key={block._key ?? index}
                      url={block.url}
                      caption={block.caption}
                      thumbnail={block.thumbnail}
                      thumbnailLqip={block.thumbnailLqip}
                    />
                  ) : null,
                )}
              </div>
            )}
          </div>

          <div className="mt-20 flex flex-col gap-4">
            <div className="w-full h-px bg-foreground/10"></div>

            <div className="flex flex-col gap-3">
              <p className="text-[1.125rem] font-medium">
                Share this case study
              </p>

              <div className="flex items-center gap-2.5">
                <button
                  onClick={() =>
                    handleLinkAction(
                      `https://thecloutcompany.com/case-study/${caseStudy.slug}`,
                      "twitter",
                    )
                  }
                  className="p-1.5 md:p-1.5 rounded-lg bg-[#f8f9f5] border border-[#e8ece0] cursor-pointer"
                >
                  <svg
                    viewBox="0 0 48 48"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="size-6 fill-foreground"
                  >
                    <path d="M36.6526 3.8078H43.3995L28.6594 20.6548L46 43.5797H32.4225L21.7881 29.6759L9.61989 43.5797H2.86886L18.6349 25.56L2 3.8078H15.9222L25.5348 16.5165L36.6526 3.8078ZM34.2846 39.5414H38.0232L13.8908 7.63406H9.87892L34.2846 39.5414Z" />
                  </svg>
                </button>

                <button
                  onClick={() =>
                    handleLinkAction(
                      `https://thecloutcompany.com/case-study/${caseStudy.slug}`,
                      "linkedin",
                    )
                  }
                  className="p-1.5 md:p-1.5 rounded-lg bg-[#f8f9f5] border border-[#e8ece0] cursor-pointer"
                >
                  <svg
                    className="size-6 fill-foreground"
                    viewBox="0 0 48 48"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g clipPath="url(#clip0_cs_68)">
                      <path d="M44.4469 0H3.54375C1.58437 0 0 1.54688 0 3.45938V44.5312C0 46.4437 1.58437 48 3.54375 48H44.4469C46.4062 48 48 46.4438 48 44.5406V3.45938C48 1.54688 46.4062 0 44.4469 0ZM14.2406 40.9031H7.11563V17.9906H14.2406V40.9031ZM10.6781 14.8688C8.39062 14.8688 6.54375 13.0219 6.54375 10.7437C6.54375 8.46562 8.39062 6.61875 10.6781 6.61875C12.9563 6.61875 14.8031 8.46562 14.8031 10.7437C14.8031 13.0125 12.9563 14.8688 10.6781 14.8688ZM40.9031 40.9031H33.7875V29.7656C33.7875 27.1125 33.7406 23.6906 30.0844 23.6906C26.3812 23.6906 25.8187 26.5875 25.8187 29.5781V40.9031H18.7125V17.9906H25.5375V21.1219H25.6312C26.5781 19.3219 28.9031 17.4188 32.3625 17.4188C39.5719 17.4188 40.9031 22.1625 40.9031 28.3313V40.9031Z" />
                    </g>
                    <defs>
                      <clipPath id="clip0_cs_68">
                        <rect width="48" height="48" />
                      </clipPath>
                    </defs>
                  </svg>
                </button>

                <button
                  onClick={() =>
                    handleLinkAction(
                      `https://thecloutcompany.com/case-study/${caseStudy.slug}`,
                      "copy",
                    )
                  }
                  className="cursor-pointer py-1.5 px-2 text-[0.875rem] font-medium rounded-lg bg-[#f8f9f5] border border-[#e8ece0] flex items-center gap-1"
                >
                  <span>{copied ? "Copied!" : "Copy link"}</span>{" "}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="size-4"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15.666 3.888A2.25 2.25 0 0 0 13.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 0 1-.75.75H9a.75.75 0 0 1-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 0 1-2.25 2.25H6.75A2.25 2.25 0 0 1 4.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 0 1 1.927-.184"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Content;
