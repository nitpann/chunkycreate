import { MetadataRoute } from "next";
import { getAllProducts } from "@/data/products";

const siteUrl = "https://chunkycreate.in";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    "",
    "/products",
    "/apps",
    "/prompts",
    "/guides",
    "/art",
    "/about",
    "/pricing",
    "/contact",
    "/privacy",
    "/terms",
    "/refund",
    "/license",
  ].map((path) => ({
    url: `${siteUrl}${path}`,
    lastModified: new Date(),
  }));

  const productRoutes = getAllProducts().map((p) => ({
    url: `${siteUrl}/products/${p.slug}`,
    lastModified: new Date(),
  }));

  return [...staticRoutes, ...productRoutes];
}
