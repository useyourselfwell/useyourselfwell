import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/lib/course";

export const metadata: Metadata = {
  title: "Alexander Technique Community | Bountiful, UT",
  description: "Join our local Alexander Technique community in Bountiful, Utah. A place to practice using yourself well.",
  alternates: {
    canonical: "/bountiful-group",
  },
};

export default function BountifulGroupPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "Alexander Technique Bountiful Study Group",
    description: metadata.description,
    url: `${siteConfig.url}/bountiful-group`,
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
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <section className="py-24 md:py-32">
        <div className="mx-auto max-w-3xl px-6">
          <div className="text-center mb-16">
            <h1 className="font-playfair text-4xl font-medium leading-snug text-foreground md:text-5xl lg:text-6xl mb-6">
              Alexander Technique Community <br className="hidden md:block" />
              <span className="text-accent/80">— Bountiful, Utah</span>
            </h1>
            <p className="mt-8 text-sm text-accent font-medium uppercase tracking-[0.2em]">
              A place to practice using yourself well.
            </p>
          </div>

          <div className="prose prose-lg text-muted mx-auto">
            <p className="text-xl text-foreground font-medium leading-relaxed">
              You don&rsquo;t master the Alexander Technique in a weekend. Like a language, an instrument, or a dance, it deepens with regular practice and good company.
            </p>
            
            <p>
              Our weekly community is a place to slow down, ask questions, and discover easier ways of moving through everyday life. Whether you&rsquo;re brand new to the work or have been studying it for years, you&rsquo;ll find a welcoming group of people curious about living with less effort and more ease.
            </p>

            <h2 className="font-playfair text-3xl font-medium mt-16 mb-6 text-foreground">What happens each week?</h2>
            <p>
              Each gathering includes guided explorations, hands-on learning, discussion, and practical tools you can use right away.
            </p>
            <p>
              Together we explore everyday activities—sitting, standing, walking, breathing, speaking, working—not to perform them perfectly, but to notice where unnecessary effort creeps in, and let it go.
            </p>
            <p className="italic font-medium text-foreground">
              No experience necessary.
            </p>

            <h2 className="font-playfair text-3xl font-medium mt-16 mb-6 text-foreground">Who comes?</h2>
            <p>
              People show up for all kinds of reasons.
            </p>
            <p>
              Some are living with ongoing pain or stiffness. Some spend long hours at a desk and feel like their bodies are working against them. Some are musicians, dancers, performers, teachers, or healthcare professionals looking for greater freedom and coordination. Others simply enjoy learning alongside thoughtful people paying closer attention to how they move through life.
            </p>

            <h2 className="font-playfair text-3xl font-medium mt-16 mb-6 text-foreground">Why practice together?</h2>
            <p>
              Private lessons are powerful. Community practice is different.
            </p>
            <p>
              Learning alongside others gives you room to observe, ask questions, share what you&rsquo;re discovering, and return week after week as your awareness grows. Many people find that this rhythm is what turns the work into a habit of daily life, rather than something that only shows up during a lesson.
            </p>

            <div className="mt-20 p-10 bg-accent/5 rounded-3xl border border-accent/20 text-center relative overflow-hidden shadow-sm">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-accent to-transparent opacity-40"></div>
              
              <h2 className="font-playfair text-3xl font-medium mb-4 text-foreground">Join us</h2>
              <p className="mb-6 font-medium text-foreground text-lg">We meet weekly in Bountiful, Utah.</p>
              
              <p className="mb-6 max-w-lg mx-auto">
                If you&rsquo;ve been looking for a different approach—one that doesn&rsquo;t rely on pushing harder, stretching more, or constantly fixing yourself—we&rsquo;d love to welcome you.
              </p>
              
              <p className="mb-10 italic text-foreground/80">
                Come find out what it feels like to use yourself well.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/contact" className="inline-flex justify-center rounded-site bg-accent px-8 py-3.5 text-base font-medium text-white shadow-md transition-all duration-300 hover:bg-accent/90 hover:shadow-lg hover:-translate-y-0.5">
                  Get in Touch
                </Link>
                <Link href="/one-skill" className="inline-flex justify-center rounded-site border border-accent/20 bg-background px-8 py-3.5 text-base font-medium text-foreground transition-all duration-300 hover:bg-accent/5 hover:border-accent/40">
                  Try the Digital Course
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
