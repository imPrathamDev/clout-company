import SingleCaseStudyPage from "@/components/pages/single-case-study";
import { getCaseStudyBySlug } from "@/sanity/queries/caseStudy";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import React from "react";

type Props = {
  params: Promise<{
    slug: string;
  }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const caseStudy = await getCaseStudyBySlug(slug);

  const siteName = "The Clout Company";
  const baseUrl =
    process.env.NEXT_PUBLIC_SITE_URL || "https://www.thecloutcompany.com";
  const pageUrl = `${baseUrl}/case-study/${slug}`;

  if (!caseStudy) {
    return {
      title: `Case Study Not Found | ${siteName}`,
      description: "The requested case study could not be found.",
    };
  }

  const title = caseStudy.title;
  const description = caseStudy.content;

  return {
    title: `${title} | ${siteName}`,
    description,
    alternates: {
      canonical: pageUrl,
    },
    openGraph: {
      title: `${title} | ${siteName}`,
      description,
      url: pageUrl,
      siteName,
      type: "article",
      images: caseStudy.brand_logo ? [{ url: caseStudy.brand_logo }] : [],
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | ${siteName}`,
      description,
      images: caseStudy.brand_logo ? [caseStudy.brand_logo] : [],
    },
  };
}

async function SingleCaseStudy({ params }: Props) {
  const { slug } = await params;

  const caseStudy = await getCaseStudyBySlug(slug);

  if (caseStudy === null) {
    notFound();
  }

  return <SingleCaseStudyPage caseStudy={caseStudy} />;
}

export default SingleCaseStudy;
