import type { MetadataRoute } from "next";
import { locales } from "@/i18n/settings";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://skiporbuyapp.com";

  const routes = ["", "/privacy", "/contact"];

  const entries: MetadataRoute.Sitemap = [];

  for (const route of routes) {
    for (const locale of locales) {
      entries.push({
        url: `${baseUrl}/${locale}${route}`,
        lastModified: new Date(),
        changeFrequency: route === "" ? "weekly" : "monthly",
        priority: route === "" ? 1.0 : 0.5,
      });
    }
  }

  return entries;
}
