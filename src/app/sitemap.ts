import type { MetadataRoute } from "next";

const base = "https://www.hollywoodguitarteachers.com";

export const dynamic = "force-dynamic";

interface FeedPost {
  slug: string;
  publishedAt: string | null;
  status: "published" | "scheduled";
  url: string;
}

// Blog posts: fetch the site's own /api/posts feed (central blog_posts merged
// with local posts) and include every published post (publish_at <= now).
// The feed's url field carries the site's real post path (/blog/, /blogs/, or
// root) — keep its pathname verbatim on the site's canonical base URL.
async function getPublishedPosts(): Promise<MetadataRoute.Sitemap> {
  try {
    const res = await fetch(`${base}/api/posts`, { cache: "no-store" });
    if (!res.ok) return [];
    const posts = (await res.json()) as FeedPost[];
    const today = new Date().toISOString().slice(0, 10);
    return posts
      .filter(
        (p) =>
          p.status === "published" &&
          p.publishedAt !== null &&
          p.publishedAt <= today
      )
      .map((p) => ({
        url: `${base}${new URL(p.url).pathname}`,
        lastModified: p.publishedAt as string,
      }));
  } catch {
    return [];
  }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const routes = ["","/blogs","/classes","/contact","/looking-for-work","/reviews"];
  const posts = await getPublishedPosts();
  return [
    ...routes.map((route) => ({
      url: `${base}${route}`,
      lastModified: new Date(),
      changeFrequency: route === "" ? ("weekly" as const) : ("monthly" as const),
      priority: route === "" ? 1 : 0.8,
    })),
    ...posts,
  ];
}
