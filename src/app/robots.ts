import type { MetadataRoute } from "next";
import { site } from "@/config/site";

/** Do startu blokujemy roboty (adresy tymczasowe). Na produkcji: NEXT_PUBLIC_ALLOW_INDEXING=true. */
export default function robots(): MetadataRoute.Robots {
  if (process.env.NEXT_PUBLIC_ALLOW_INDEXING !== "true") {
    return { rules: { userAgent: "*", disallow: "/" } };
  }
  return {
    rules: { userAgent: "*", allow: "/", disallow: "/styleguide" },
    sitemap: `${site.url}/sitemap.xml`,
  };
}
