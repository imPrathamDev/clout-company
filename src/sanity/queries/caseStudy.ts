import type { PortableTextBlock } from "sanity";
import { groq } from "next-sanity";
import { client } from "../lib/client";

// Body blocks need the file asset dereferenced for native video blocks
// (image blocks resolve their URL client-side via `urlFor`, so they're left as-is).
const BODY_FIELDS = groq`
  body[] {
    ...,
    _type == "video" => {
      ...,
      asset-> {
        _id,
        url,
        mimeType,
        originalFilename
      }
    }
  }
`;

// Fetch all case studies, ordered by the "order" field (falling back to _createdAt)
export const ALL_CASE_STUDIES_QUERY = groq`
  *[_type == "caseStudy"] | order(coalesce(order, 9999) asc, _createdAt asc) {
    _id,
    label,
    title,
    "slug": slug.current,
    campaign_name,
    "brand_logo": brand_logo.asset->url,
    content,
    stats {
      primary {
        label,
        value,
        isProgress
      },
      secondary[] {
        label,
        value
      }
    },
    ${BODY_FIELDS}
  }
`;

// Fetch a single case study by its slug
export const CASE_STUDY_BY_SLUG_QUERY = groq`
  *[_type == "caseStudy" && slug.current == $slug][0] {
    _id,
    label,
    title,
    "slug": slug.current,
    campaign_name,
    "brand_logo": brand_logo.asset->url,
    content,
    stats {
      primary {
        label,
        value,
        isProgress
      },
      secondary[] {
        label,
        value
      }
    },
    ${BODY_FIELDS}
  }
`;

export interface StatItem {
  label: string;
  value: string;
}

export interface PrimaryStat extends StatItem {
  isProgress: boolean;
}

export interface CaseStudyStats {
  primary: PrimaryStat;
  secondary: StatItem[];
}

export interface CaseStudyVideoAsset {
  _id: string;
  url: string;
  mimeType?: string;
  originalFilename?: string;
}

export interface CaseStudyVideoBlock {
  _type: "video";
  _key: string;
  asset: CaseStudyVideoAsset;
  caption?: string;
}

export interface CaseStudyStatsBlock {
  _type: "statsBlock";
  _key: string;
  primary: StatItem;
  secondary: StatItem[];
}

export interface CaseStudyVideoEmbedBlock {
  _type: "videoEmbed";
  _key: string;
  url: string;
  caption?: string;
}

export type CaseStudyBodyBlock =
  | PortableTextBlock
  | CaseStudyVideoBlock
  | CaseStudyStatsBlock
  | CaseStudyVideoEmbedBlock;

export interface CaseStudy {
  _id: string;
  label: string;
  title: string;
  slug: string;
  campaign_name: string;
  brand_logo: string; // resolved asset URL
  content: string;
  stats: CaseStudyStats;
  body: CaseStudyBodyBlock[];
}

/**
 * Fetch all case studies, ordered by their `order` field.
 */
export async function getCaseStudies(): Promise<CaseStudy[]> {
  return client.fetch<CaseStudy[]>(
    ALL_CASE_STUDIES_QUERY,
    {},
    { next: { revalidate: 60, tags: ["caseStudy"] } },
  );
}

/**
 * Fetch a single case study by its slug.
 */
export async function getCaseStudyBySlug(
  slug: string,
): Promise<CaseStudy | null> {
  return client.fetch<CaseStudy | null>(
    CASE_STUDY_BY_SLUG_QUERY,
    { slug },
    { next: { revalidate: 60, tags: ["caseStudy"] } },
  );
}
