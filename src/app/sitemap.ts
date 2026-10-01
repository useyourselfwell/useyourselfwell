import { MetadataRoute } from "next";
import { siteConfig } from "@/lib/course";
import { getPublishedContentPosts } from "@/lib/content-posts";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const routes = [
    "",
    "/about",
    "/one-skill",
    "/workshops",
    "/videos",
    "/contact",
    "/bountiful-group",
    "/tech-neck",
    "/musicians",
    "/desk-workers"
  ];

  const staticRoutes: MetadataRoute.Sitemap = routes.map((route) => ({
    url: `${siteConfig.url}${route}`,
    lastModified: new Date(),
    changeFrequency: (route === "" ? "daily" : route === "/contact" || route === "/about" ? "monthly" : "weekly") as MetadataRoute.Sitemap[0]["changeFrequency"],
    priority: route === "" ? 1.0 : route === "/one-skill" || route === "/bountiful-group" ? 0.9 : route === "/contact" ? 0.6 : 0.8,
  }));
  const posts = await getPublishedContentPosts();
  return [...staticRoutes, ...posts.map((post) => ({ url: `${siteConfig.url}/blog/${post.slug}`, lastModified: new Date(post.published_at), changeFrequency: "monthly" as const, priority: 0.7 }))];
}
