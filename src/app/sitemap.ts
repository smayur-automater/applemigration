import type { MetadataRoute } from "next";
import { blogPosts } from "@/lib/content";
import { site } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    "",
    "/about",
    "/team",
    "/services",
    "/services/student-visas",
    "/services/skilled-migration",
    "/services/partner-family-visas",
    "/services/employer-sponsored",
    "/services/education-consulting",
    "/eligibility-check",
    "/blog",
    "/success-stories",
    "/faqs",
    "/contact",
    "/book",
    "/mara-disclosure",
    "/privacy-policy",
    "/terms",
  ].map((path) => ({
    url: `${site.url}${path}`,
    changeFrequency: "monthly" as const,
    priority: path === "" ? 1 : 0.7,
  }));

  const blogRoutes = blogPosts.map((post) => ({
    url: `${site.url}/blog/${post.slug}`,
    lastModified: post.date,
    changeFrequency: "yearly" as const,
    priority: 0.5,
  }));

  return [...staticRoutes, ...blogRoutes];
}
