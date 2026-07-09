import type { Metadata } from "next";
import { VideosClientPage } from "./videos-client";

export const metadata: Metadata = {
  title: "Free Alexander Technique Videos & Guides | Use Yourself Well",
  description:
    "Watch free Alexander Technique videos and guided audio explorations. Learn to notice tension habits, find ease, and practice awareness in daily life.",
  alternates: {
    canonical: "/videos",
  },
};

export default function VideosPage() {
  return <VideosClientPage />;
}
