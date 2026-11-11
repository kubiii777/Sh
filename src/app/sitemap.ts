import type { MetadataRoute } from "next";
import { site } from "@/config/site";
import { projects } from "@/data/projects";
import { services } from "@/data/services";

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = [
    "/",
    "/uslugi",
    ...services.map((s) => `/uslugi/${s.slug}`),
    "/realizacje",
    ...projects.map((p) => `/realizacje/${p.slug}`),
    "/o-nas",
    "/kontakt",
    "/polityka-prywatnosci",
  ];
  return paths.map((path) => ({ url: `${site.url}${path === "/" ? "" : path}` }));
}
