import { getAllLogs } from "@/sanity/queries/log";
import { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl =
    process.env.NEXT_PUBLIC_SITE_URL || "https://www.thecloutcompany.com";

  // 1. Define your static routes
  const staticPaths = [
    "",
    "/source-code",
    "/terms-and-conditions",
    "/privacy-policy",
    "/log",
    "/contact",
  ];

  const staticRoutes: MetadataRoute.Sitemap = staticPaths.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString(),
    // Base route gets highest priority, others get standard priority
    priority: route === "" ? 1 : 0.8,
    changeFrequency: route === "/log" ? "daily" : "weekly",
  }));

  // 2. Fetch and define your dynamic routes
  const logs = await getAllLogs();

  const dynamicRoutes: MetadataRoute.Sitemap = logs.map((log) => ({
    url: `${baseUrl}/log/${log.slug}`,
    // Use the publishedAt date from Sanity if available, otherwise fallback to now
    lastModified: log.publishedAt
      ? new Date(log.publishedAt).toISOString()
      : new Date().toISOString(),
    priority: 0.6,
    changeFrequency: "monthly",
  }));

  // 3. Return the combined routes
  return [...staticRoutes, ...dynamicRoutes];
}
