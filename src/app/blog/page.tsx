import Link from "next/link";
import { getPublishedContentPosts } from "@/lib/content-posts";

export const metadata = { title: "Journal", description: "Practical notes on ease, habits, and using yourself well in everyday life." };

export default async function BlogPage() {
  const posts = await getPublishedContentPosts();
  return <section className="mx-auto max-w-4xl px-6 py-16 sm:py-24"><p className="text-sm font-semibold uppercase tracking-widest text-accent">Use Yourself Well</p><h1 className="mt-3 font-playfair text-5xl text-foreground">Journal</h1><p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted-foreground">Simple, useful ways to notice less effort and find more ease in daily life.</p><div className="mt-14 grid gap-7 md:grid-cols-2">{posts.length ? posts.map(post => <Link key={post.slug} href={`/blog/${post.slug}`} className="group rounded-site border border-border bg-card overflow-hidden transition hover:-translate-y-1 hover:shadow-lg">{post.hero_image && <img src={post.hero_image} alt="" className="h-48 w-full object-cover" />}<div className="p-7"><p className="text-xs font-semibold uppercase tracking-widest text-accent">{post.tags[0] || "Practice"}</p><h2 className="mt-3 font-playfair text-3xl text-foreground group-hover:text-accent">{post.title}</h2><p className="mt-3 text-muted-foreground leading-relaxed">{post.excerpt}</p><p className="mt-6 text-sm text-muted-foreground">{new Intl.DateTimeFormat("en-US", { month: "long", day: "numeric", year: "numeric" }).format(new Date(post.published_at))}</p></div></Link>) : <p className="text-muted-foreground">The first journal note is on its way.</p>}</div></section>;
}
