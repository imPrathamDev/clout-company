import CaseStudiesPage from "@/components/pages/case-studies";
import { getSiteMetadata } from "@/lib/metadata";
import { getCaseStudies } from "@/sanity/queries/caseStudy";
import React from "react";

export const metadata = getSiteMetadata("/case-studies");

async function CaseStudies() {
  const caseStudies = await getCaseStudies();
  return <CaseStudiesPage caseStudies={caseStudies} />;
}

export default CaseStudies;
