import { MetadataRoute } from "next";
import { siteConfig } from "@/lib/course";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ["", "/about", "/one-skill", "/workshops", "/videos", "/contact"];

  return routes.map((route) => ({
    url: `${siteConfig.url}${route}`,
    lastModified: new Date(),
    changeFrequency: route === "" ? "daily" : route === "/contact" || route === "/about" ? "monthly" : "weekly",
    priority: route === "" ? 1.0 : route === "/one-skill" ? 0.9 : route === "/contact" ? 0.6 : 0.8,
  }));
}
