import type { Metadata } from "next";
import { site } from "@/config/site";

/** Metadane podstrony: tytuł, opis, canonical i Open Graph po polsku. */
export function pageMetadata({ title, description, path }: { title: string; description: string; path: string }): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      locale: "pl_PL",
      siteName: site.name,
      url: path,
      title: `${title} — ${site.name}`,
      description,
    },
  };
}
