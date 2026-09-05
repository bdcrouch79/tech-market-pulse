import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return [
    { url: "https://pulse.crouchdevelopment.com", lastModified: now, changeFrequency: "daily", priority: 1 },
    { url: "https://pulse.crouchdevelopment.com/methodology", lastModified: now, changeFrequency: "monthly", priority: 0.6 },
  ];
}
