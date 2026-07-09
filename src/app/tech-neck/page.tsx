import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Tech Neck Relief | Alexander Technique Utah",
  description: "Relieve tech neck and screen-related tension with the Alexander Technique in Utah. Stop trying to sit up straight and learn a sustainable approach.",
  alternates: {
    canonical: "/tech-neck",
  },
};

export default function TechNeckPage() {
  return (
    <section className="py-24 md:py-32">
      <div className="mx-auto max-w-4xl px-6">
        <h1 className="font-playfair text-4xl font-medium leading-snug text-foreground md:text-5xl lg:text-6xl mb-8">
          Managing Tech Neck with the Alexander Technique
        </h1>
        <div className="prose prose-lg text-muted">
          <p>If you work at a computer, you likely know the feeling of "tech neck"—that persistent ache at the base of your skull, tightness across your shoulders, and the exhausting effort of constantly reminding yourself to "sit up straight."</p>
          
          <h2 className="font-playfair text-2xl font-medium mt-12 mb-4 text-foreground">Why "Sitting up Straight" Doesn't Work</h2>
          <p>Most advice for tech neck involves adding more effort: pulling your shoulders back, tucking your chin, or bracing your core. This just trades one form of tension for another. The Alexander Technique teaches you how to stop pulling yourself down toward the screen in the first place.</p>
          
          <div className="mt-12 p-8 bg-accent/5 rounded-site border border-accent/20">
            <h3 className="font-playfair text-xl font-medium mb-4 text-foreground">Ready to find relief?</h3>
            <p>Learn how to sit at your desk without the chronic tension. Join our classes in Bountiful, UT or start with our digital course.</p>
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
