import "server-only";
import { requireSupabase } from "@/lib/supabase";

export type ContentPost = { slug: string; title: string; excerpt: string; meta_title: string; meta_description: string; hero_image: string | null; cta_label: string | null; cta_url: string | null; tags: string[]; content_html: string; published_at: string };
const FIELDS = "slug,title,excerpt,meta_title,meta_description,hero_image,cta_label,cta_url,tags,content_html,published_at";

export async function getPublishedContentPosts(): Promise<ContentPost[]> {
  const { data, error } = await requireSupabase().from("content_posts").select(FIELDS).eq("status", "published").order("published_at", { ascending: false });
  if (error) { console.error("Unable to load UYW blog posts", error); return []; }
  return (data ?? []) as ContentPost[];
}
export async function getPublishedContentPost(slug: string): Promise<ContentPost | null> {
  const { data, error } = await requireSupabase().from("content_posts").select(FIELDS).eq("status", "published").eq("slug", slug).maybeSingle();
  if (error) console.error("Unable to load UYW blog post", error);
  return (data as ContentPost | null) ?? null;
}
