import type { Metadata } from "next";
import { AboutClientPage } from "./about-client";

export const metadata: Metadata = {
  title: "About Christopher Neville | Alexander Technique Teacher · Bountiful, Utah",
  description:
    "Meet Christopher Neville, AMSAT-certified Alexander Technique instructor in Bountiful, Utah. Over 15 years helping people release chronic tension, back pain, and unnecessary strain.",
  alternates: {
    canonical: "/about",
  },
};

export default function AboutPage() {
  return <AboutClientPage />;
}
