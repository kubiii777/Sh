import type { Metadata, Viewport } from "next";
import { MotionConfig } from "motion/react";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { JsonLd } from "@/components/seo/JsonLd";
import { site } from "@/config/site";
import { fontVariables } from "./fonts";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — oprogramowanie, które myśli i się broni`,
    template: `%s — ${site.name}`,
  },
  description: site.description,
  openGraph: { type: "website", locale: "pl_PL", siteName: site.name },
  // Do startu strona nie jest indeksowana (adresy tymczasowe, np. *.vercel.app).
  // Włączenie: zmienna NEXT_PUBLIC_ALLOW_INDEXING=true na produkcji.
  robots: process.env.NEXT_PUBLIC_ALLOW_INDEXING === "true" ? undefined : { index: false, follow: false },
};

export const viewport: Viewport = {
  themeColor: "#0b0b0b",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="pl" className={fontVariables}>
      <body className="theme-dark min-h-screen">
        <noscript>
          <style>{`[data-fade]{opacity:1!important;transform:none!important}.pixel-cover{display:none}`}</style>
        </noscript>
        <a
          href="#tresc"
          className="label sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:bg-paper focus:px-4 focus:py-3 focus:text-ink"
        >
          Przejdź do treści
        </a>
        <JsonLd
          data={{
            "@context": "https://schema.org",
            "@type": "Organization",
            name: site.name,
            url: site.url,
            email: site.email,
            telephone: site.phone,
            address: site.address,
            sameAs: [site.social.linkedin, site.social.github].filter((url) => url.startsWith("http")),
          }}
        />
        <MotionConfig reducedMotion="user">
          <Header />
          <main id="tresc">{children}</main>
          <Footer />
        </MotionConfig>
      </body>
    </html>
  );
}
