import type { Metadata } from "next";
import { OneSkillClientPage } from "./one-skill-client";

export const metadata: Metadata = {
  title: "One Skill Program — Private Alexander Technique Lessons · Bountiful, Utah",
  description:
    "Two private Alexander Technique lessons with Christopher Neville in Bountiful, Utah — plus a self-guided digital course. $197 intro offer. Discover ease you didn't know you were missing.",
  alternates: {
    canonical: "/one-skill",
  },
};

export default function OneSkillPage() {
  return <OneSkillClientPage />;
}
