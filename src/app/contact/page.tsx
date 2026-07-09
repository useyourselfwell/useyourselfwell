import type { Metadata } from "next";
import { ContactClientPage } from "./contact-client";

export const metadata: Metadata = {
  title: "Contact Christopher Neville | Alexander Technique Lessons · Bountiful, Utah",
  description:
    "Get in touch with Christopher Neville to ask about Alexander Technique lessons in Bountiful, Utah. Call (801) 332-9504 or send a message.",
  alternates: {
    canonical: "/contact",
  },
};

export default function ContactPage() {
  return <ContactClientPage />;
}
