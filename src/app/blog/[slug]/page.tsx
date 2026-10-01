import Link from "next/link";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getPublishedContentPost } from "@/lib/content-posts";

type Props = { params: Promise<{ slug: string }> };
export async function generateMetadata({ params }: Props): Promise<Metadata> { const post = await getPublishedContentPost((await params).slug); return post ? { title: post.meta_title, description: post.meta_description } : {}; }
export default async function PostPage({ params }: Props) { const post = await getPublishedContentPost((await params).slug); if (!post) notFound(); return <article className="mx-auto max-w-3xl px-6 py-16 sm:py-24"><Link href="/blog" className="text-sm text-accent hover:underline">← Journal</Link><p className="mt-10 text-xs font-semibold uppercase tracking-widest text-accent">{post.tags[0] || "Practice"}</p><h1 className="mt-3 font-playfair text-5xl leading-tight text-foreground">{post.title}</h1><p className="mt-5 text-sm text-muted-foreground">{new Intl.DateTimeFormat("en-US", { month: "long", day: "numeric", year: "numeric" }).format(new Date(post.published_at))}</p>{post.hero_image && <img src={post.hero_image} alt="" className="mt-10 w-full rounded-site" />}<div className="blog-article mt-10 text-lg leading-8 text-foreground" dangerouslySetInnerHTML={{ __html: post.content_html }} />{post.cta_url && <p className="mt-12"><Link href={post.cta_url} className="inline-block rounded-site bg-accent px-6 py-3 font-medium text-white">{post.cta_label || "Explore your next step"}</Link></p>}</article>; }
