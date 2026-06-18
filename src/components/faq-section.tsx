"use client";

import { cn } from "@/lib/utils";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { faqItems } from "@/lib/course";

export function FaqSection() {
  return (
    <section className="py-24 md:py-32">
      <div className="mx-auto max-w-4xl px-6">
        <h2 className="font-playfair text-3xl font-medium leading-snug text-foreground md:text-4xl lg:text-5xl">
          Frequently asked questions
        </h2>

        <div className="mt-10">
          <Accordion type="single" collapsible className="w-full">
            {faqItems.map((item, i) => (
              <AccordionItem key={i} value={`faq-${i}`}>
                <AccordionTrigger>{item.question}</AccordionTrigger>
                <AccordionContent>{item.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}
