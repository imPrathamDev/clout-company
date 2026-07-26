import type { PortableTextBlock } from "sanity";
import { client } from "../lib/client";
import { groq } from "next-sanity";

// ─── TYPES ───────────────────────────────────────────────────────────────────

export interface SanityImageDimensions {
  width: number;
  height: number;
  aspectRatio: number;
}

export interface SanityImagePaletteSwatch {
  background: string;
  foreground: string;
}

export interface SanityImageMetadata {
  dimensions: SanityImageDimensions;
  lqip: string; // base64 blur placeholder
  palette?: {
    dominant?: SanityImagePaletteSwatch;
  };
}

export interface SanityImageAsset {
  _id: string;
  _type: "sanity.imageAsset";
  url: string;
  mimeType?: string;
  originalFilename?: string;
  metadata: SanityImageMetadata;
}

export interface SanityImageHotspot {
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface SanityImageCrop {
  top: number;
  bottom: number;
  left: number;
  right: number;
}

export interface SanityImage {
  asset: SanityImageAsset;
  alt?: string;
  hotspot?: SanityImageHotspot;
  crop?: SanityImageCrop;
}

export interface Category {
  _id: string;
  title: string;
  slug: string;
  description?: string;
}

export interface LogListItem {
  _id: string;
  title: string;
  mainImage: SanityImage;
  slug: string;
  publishedAt: string;
  categories: Category[] | null;
}

export interface LogDetail {
  _id: string;
  title: string;
  slug: string;
  publishedAt: string;
  mainImage?: {
    asset: {
      _ref: string;
      url: string;
    };
    alt?: string;
  };
  categories: Category[] | null;
  content: PortableTextBlock[];
  seo?: {
    metaTitle?: string;
    metaDescription?: string;
    ogImage?: any; // You can strongly type this if you expand the image query
    canonicalUrl?: string;
    keywords?: string[];
    noIndex?: boolean;
    structuredData?: string;
  };
}

// ─── FUNCTIONS ───────────────────────────────────────────────────────────────

const IMAGE_FIELDS = groq`
  asset-> {
    _id,
    _type,
    url,
    mimeType,
    originalFilename,
    metadata {
      dimensions {
        width,
        height,
        aspectRatio
      },
      lqip,
      palette {
        dominant {
          background,
          foreground
        }
      }
    }
  },
  alt,
  hotspot {
    x,
    y,
    width,
    height
  },
  crop {
    top,
    bottom,
    left,
    right
  }
    `;

/**
 * 1. Get all logs (List view)
 * Retrieves a lightweight list of all logs containing only the necessary fields.
 */
export async function getAllLogs(): Promise<LogListItem[]> {
  const query = `*[_type == "log"] | order(publishedAt desc) {
    _id,
    title,
    mainImage { ${IMAGE_FIELDS} },
    "slug": slug.current,
    publishedAt,
    "categories": categories[]->{
      _id,
      title,
      "slug": slug.current
    }
  }`;

  return await client.fetch<LogListItem[]>(query);
}

/**
 * 2. Get a particular log's full details by its slug
 * Retrieves the complete document including rich text content, resolved categories, and SEO data.
 */
export async function getLogBySlug(slug: string): Promise<LogDetail | null> {
  const query = `*[_type == "log" && slug.current == $slug][0] {
    _id,
    title,
    "slug": slug.current,
    publishedAt,
    mainImage {
      ...,
      asset->{
        _id,
        url
      }
    },
    "categories": categories[]->{
      _id,
      title,
      "slug": slug.current,
      description
    },
    content,
    seo
  }`;

  return await client.fetch<LogDetail | null>(query, { slug });
}
