import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Alexander Technique for Musicians | Utah",
  description: "Play with more freedom and less pain. The Alexander Technique helps musicians in Utah overcome repetitive strain and performance anxiety.",
  alternates: {
    canonical: "/musicians",
  },
};

export default function MusiciansPage() {
  return (
    <section className="py-24 md:py-32">
      <div className="mx-auto max-w-4xl px-6">
        <h1 className="font-playfair text-4xl font-medium leading-snug text-foreground md:text-5xl lg:text-6xl mb-8">
          Alexander Technique for Musicians
        </h1>
        <div className="prose prose-lg text-muted">
          <p>Musicians face unique physical demands, often maintaining asymmetric postures for hours at a time. This can lead to repetitive strain injuries, tension, and a ceiling on technical proficiency.</p>
          
          <h2 className="font-playfair text-2xl font-medium mt-12 mb-4 text-foreground">Play with Freedom</h2>
          <p>The Alexander Technique is taught in major conservatories worldwide because it addresses the root cause of these issues: how you use your body as a whole while playing your instrument.</p>
          
          <div className="mt-12 p-8 bg-accent/5 rounded-site border border-accent/20">
            <h3 className="font-playfair text-xl font-medium mb-4 text-foreground">Ready to change how you play?</h3>
            <p>Join our classes in Bountiful, UT or explore the digital course to start learning.</p>
            <div className="mt-6 flex flex-col sm:flex-row gap-4">
              <Link href="/bountiful-group" className="inline-flex justify-center rounded-site bg-accent px-6 py-3 text-base font-medium text-white shadow-md transition-all hover:bg-accent/90">
                Join the Bountiful Group
              </Link>
              <Link href="/one-skill" className="inline-flex justify-center rounded-site border border-accent/20 bg-transparent px-6 py-3 text-base font-medium text-foreground transition-all hover:bg-accent/5">
                Take the Online Course
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
