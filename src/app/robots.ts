import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const baseUrl =
    process.env.NEXT_PUBLIC_SITE_URL || "https://www.thecloutcompany.com";

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      // If you ever need to hide specific paths (like API routes or admin dashboards),
      // you can add them to a disallow array:
      disallow: ["/api/", "/studio/"],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
