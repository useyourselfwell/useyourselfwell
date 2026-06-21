import { Hero } from "@/components/hero";
import { ProblemReframe } from "@/components/problem-reframe";
import { Mechanism } from "@/components/mechanism";
import { Testimonials } from "@/components/testimonials";
import { CourseOffer } from "@/components/course-offer";
import { About } from "@/components/about";
import { FaqSection } from "@/components/faq-section";
import { Guarantee } from "@/components/guarantee";
import { FinalCta } from "@/components/final-cta";

export default function HomePage() {
  return (
    <>
      <Hero />
      <ProblemReframe />
      <Mechanism />
      <Testimonials />
      <CourseOffer />
      <About />
      <FaqSection />
      <Guarantee />
      <FinalCta />
    </>
  );
}
