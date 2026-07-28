import { groq } from "next-sanity";
import { client } from "../lib/client";

// Fetch all artifact campaigns, ordered by the "order" field (falling back to _createdAt)
export const ALL_ARTIFACT_CAMPAIGNS_QUERY = groq`
  *[_type == "artifactCampaign"] | order(coalesce(order, 9999) asc, _createdAt asc) {
    _id,
    label,
    title,
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
    }
  }
`;

// Fetch a single artifact campaign by its _id
export const ARTIFACT_CAMPAIGN_BY_ID_QUERY = groq`
  *[_type == "artifactCampaign" && _id == $id][0] {
    _id,
    label,
    title,
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
    }
  }
`;

export interface StatItem {
  label: string;
  value: string;
}

export interface PrimaryStat extends StatItem {
  isProgress: boolean;
}

export interface ArtifactStats {
  primary: PrimaryStat;
  secondary: StatItem[];
}

export interface ArtifactCampaign {
  _id: string;
  label: string;
  title: string;
  campaign_name: string;
  brand_logo: string; // resolved asset URL
  content: string;
  stats: ArtifactStats;
}

/**
 * Fetch all artifact campaigns, ordered by their `order` field.
 */
export async function getArtifactCampaigns(): Promise<ArtifactCampaign[]> {
  return client.fetch<ArtifactCampaign[]>(
    ALL_ARTIFACT_CAMPAIGNS_QUERY,
    {},
    { next: { revalidate: 60, tags: ["artifactCampaign"] } },
  );
}

/**
 * Fetch a single artifact campaign by its Sanity document _id.
 */
export async function getArtifactCampaignById(
  id: string,
): Promise<ArtifactCampaign | null> {
  return client.fetch<ArtifactCampaign | null>(
    ARTIFACT_CAMPAIGN_BY_ID_QUERY,
    { id },
    { next: { revalidate: 60, tags: ["artifactCampaign"] } },
  );
}
