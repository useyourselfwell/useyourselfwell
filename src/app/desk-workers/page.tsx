import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Ergonomics & Posture for Desk Workers | Utah",
  description: "Sitting at a desk all day doesn't have to hurt. Learn how the Alexander Technique offers a better approach than traditional ergonomics.",
  alternates: {
    canonical: "/desk-workers",
  },
};

export default function DeskWorkersPage() {
  return (
    <section className="py-24 md:py-32">
      <div className="mx-auto max-w-4xl px-6">
        <h1 className="font-playfair text-4xl font-medium leading-snug text-foreground md:text-5xl lg:text-6xl mb-8">
          Better Posture for Desk Workers
        </h1>
        <div className="prose prose-lg text-muted">
          <p>You can buy the most expensive ergonomic chair, but if your habit is to tense your shoulders and crane your neck toward the monitor, you will still experience pain.</p>
          
          <h2 className="font-playfair text-2xl font-medium mt-12 mb-4 text-foreground">Beyond Ergonomics</h2>
          <p>The Alexander Technique teaches you that posture isn't a position you hold—it's a dynamic equilibrium. By learning to release the unnecessary effort you bring to sitting, you can end the workday without exhaustion.</p>
          
          <div className="mt-12 p-8 bg-accent/5 rounded-site border border-accent/20">
            <h3 className="font-playfair text-xl font-medium mb-4 text-foreground">Start sitting comfortably</h3>
            <p>Learn how to sit without chronic tension. Join our classes in Bountiful, UT or start with our digital course.</p>
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
