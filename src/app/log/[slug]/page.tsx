import SingleLogPage from "@/components/pages/single-log";
import { getLogBySlug } from "@/sanity/queries/log";
import { Metadata, ResolvingMetadata } from "next";
import { notFound } from "next/navigation";
import React from "react";

type Props = {
  params: Promise<{
    slug: string;
  }>;
};

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const { slug } = await params;
  // Fetch the log data using your existing query
  const log = await getLogBySlug(slug);

  const siteName = "The Clout Company";
  const baseUrl =
    process.env.NEXT_PUBLIC_SITE_URL || "https://www.thecloutcompany.com";
  const pageUrl = `${baseUrl}/logs/${slug}`;

  // If the log doesn't exist, return a generic 404 metadata state
  if (!log) {
    return {
      title: `Log Not Found | ${siteName}`,
      description: "The requested log could not be found.",
    };
  }

  // 1. Resolve Title and Description (Prefer SEO fields, fallback to standard fields)
  const title = log.seo?.metaTitle || log.title;
  const description =
    log.seo?.metaDescription ||
    `Read "${log.title}" on The Clout Company Logs.`; // Fallback description

  // 2. Resolve OpenGraph / Social Images
  // Assuming if you expand `ogImage` it has the same asset structure as `mainImage`
  const imageUrl = log.seo?.ogImage?.asset?.url || log.mainImage?.asset?.url;

  // Optionally fetch parent images to append them
  const previousImages = (await parent).openGraph?.images || [];
  const ogImages = imageUrl ? [{ url: imageUrl }] : previousImages;

  // 3. Construct and return the Next.js Metadata object
  return {
    title: `${title} | ${siteName}`,
    description,
    keywords: log.seo?.keywords,
    alternates: {
      canonical: log.seo?.canonicalUrl || pageUrl,
    },
    robots: {
      index: !log.seo?.noIndex, // Will map to "noindex" if true
      follow: !log.seo?.noIndex,
    },
    openGraph: {
      title: `${title} | ${siteName}`,
      description,
      url: pageUrl,
      siteName,
      type: "article",
      publishedTime: log.publishedAt,
      // You can map your categories here if desired
      tags: log.categories?.map((cat) => cat.title) || [],
      images: ogImages,
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | ${siteName}`,
      description,
      images: ogImages,
    },
  };
}

async function SingleLog({ params }: Props) {
  const { slug } = await params;

  const log = await getLogBySlug(slug);

  if (log === null) {
    notFound();
  }

  return <SingleLogPage log={log} />;
}

export default SingleLog;
