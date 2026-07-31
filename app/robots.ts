import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: "https://kylie.dev/sitemap.xml", // TODO: update once the real domain is set
  };
}
