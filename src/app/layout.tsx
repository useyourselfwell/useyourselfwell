import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
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
    default: "Use Yourself Well | Alexander Technique · Bountiful, Utah",
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [
    "Alexander Technique",
    "Alexander Technique Utah",
    "Alexander Technique Bountiful Utah",
    "chronic back pain relief Utah",
    "tension relief Bountiful UT",
    "alternative to massage Davis County Utah",
    "posture improvement Utah",
    "Christopher Neville Alexander Technique teacher",
  ],
  icons: {
    icon: "/images/logo-bg.png",
  },
  alternates: {
    canonical: "./",
  },
  openGraph: {
    title: "Use Yourself Well | Alexander Technique · Bountiful, Utah",
    description: siteConfig.description,
    url: siteConfig.url,
    siteName: siteConfig.name,
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/images/house.png",
        alt: "Use Yourself Well — Alexander Technique, Bountiful Utah",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Use Yourself Well | Alexander Technique · Bountiful, Utah",
    description: siteConfig.description,
    images: ["/images/house.png"],
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
        "@type": ["HealthAndBeautyBusiness", "LocalBusiness"],
        "@id": `${siteConfig.url}/#local-business`,
        name: siteConfig.name,
        description: siteConfig.description,
        url: siteConfig.url,
        telephone: siteConfig.phone,
        address: {
          "@type": "PostalAddress",
          streetAddress: siteConfig.streetAddress,
          addressLocality: siteConfig.addressLocality,
          addressRegion: siteConfig.addressRegion,
          postalCode: siteConfig.postalCode,
          addressCountry: "US",
        },
        geo: {
          "@type": "GeoCoordinates",
          latitude: siteConfig.geo.latitude,
          longitude: siteConfig.geo.longitude,
        },
        image: `${siteConfig.url}/images/house.png`,
        areaServed: [
          {
            "@type": "AdministrativeArea",
            name: "Bountiful",
          },
          {
            "@type": "AdministrativeArea",
            name: "Davis County",
          },
          {
            "@type": "AdministrativeArea",
            name: "Salt Lake City",
          },
        ],
        priceRange: "$$",
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
        <SpeedInsights />
        {/* Google Analytics */}
        <script
          src={`https://www.googletagmanager.com/gtag/js?id=G-MEPYY39ZG4`}
          async
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-MEPYY39ZG4');
            `,
          }}
        />
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
