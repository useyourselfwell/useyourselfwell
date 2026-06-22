import type { Metadata } from "next";
import { WorkshopsClientPage } from "./workshops-client";

export const metadata: Metadata = {
  title: "Free Alexander Technique Workshops | Use Yourself Well",
  description:
    "Join free group workshops in Bountiful, Utah exploring the Alexander Technique. Learn to release tension, improve posture, and move with ease in everyday activities.",
  alternates: {
    canonical: "/workshops",
  },
};

export default function WorkshopsPage() {
  return <WorkshopsClientPage />;
}
