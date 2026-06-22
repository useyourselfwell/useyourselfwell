import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { siteConfig } from "@/lib/course";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} | ${siteConfig.description}`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  icons: {
    icon: "/images/logo-bg.png",
  },
  openGraph: {
    title: `One Skill | ${siteConfig.name}`,
    description: siteConfig.description,
    url: siteConfig.url,
    siteName: siteConfig.name,
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `One Skill | ${siteConfig.name}`,
    description: siteConfig.description,
  },
  other: {
    "application/ld+json": JSON.stringify([
      {
        "@context": "https://schema.org",
        "@type": "Organization",
        name: siteConfig.name,
        url: siteConfig.url,
        description: siteConfig.description,
      },
      {
        "@context": "https://schema.org",
        "@type": "Course",
        name: "One Skill",
        description:
          "Discover the unconscious tension pattern that may be driving your discomfort, fatigue, and stress.",
        provider: {
          "@type": "Organization",
          name: siteConfig.name,
          sameAs: siteConfig.url,
        },
        offers: {
          "@type": "Offer",
          price: "27",
          priceCurrency: "USD",
        },
      },
    ]),
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable}`}>
      <body>
        <Nav />
        <main>{children}</main>
        <Footer />
        <Analytics />
        {/* Metricool tracking pixel */}
        <img
          src="https://tracker.metricool.com/c3po.jpg?hash=fe8c9b6003f33b0c241c388d451c4e59"
          alt=""
          aria-hidden="true"
          style={{ position: "absolute", left: "-9999px" }}
        />
      </body>
    </html>
  );
}
