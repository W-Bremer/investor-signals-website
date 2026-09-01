import type { MetadataRoute } from "next";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://investorsignals.co";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    "",
    "/for-startups",
    "/for-fund-managers",
    "/about",
    "/faq",
    "/request-an-introduction",
    "/disclosures",
    "/privacy",
    "/terms",
  ];
  const now = new Date();
  return routes.map((route) => ({
    url: `${SITE_URL}${route}`,
    lastModified: now,
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority: route === "" ? 1 : route.startsWith("/for-") ? 0.9 : 0.6,
  }));
}
