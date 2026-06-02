import { SITE, SERVICES } from "@/lib/site";
import { getPostSlugs } from "@/lib/posts";

// Next.js generates /sitemap.xml from this at build time.
export default function sitemap() {
  const base = SITE.url.replace(/\/$/, "");
  const now = new Date().toISOString();

  const staticRoutes = ["", "/services", "/method", "/insights", "/about", "/contact"].map((p) => ({
    url: `${base}${p}/`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: p === "" ? 1 : 0.8,
  }));

  const serviceRoutes = SERVICES.map((s) => ({
    url: `${base}/services/${s.slug}/`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  const postRoutes = getPostSlugs().map((slug) => ({
    url: `${base}/insights/${slug}/`,
    lastModified: now,
    changeFrequency: "yearly",
    priority: 0.6,
  }));

  return [...staticRoutes, ...serviceRoutes, ...postRoutes];
}
