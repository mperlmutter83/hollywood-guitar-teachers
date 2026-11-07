/**
 * Fetch blog posts from the central Yes Crew API
 * Uses ISR (Incremental Static Regeneration) with 60 second revalidation
 */

const API_BASE = "https://yescrew-dashboard.vercel.app/api/posts";

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string | null;
  content: string;
  image_url: string | null;
  category: string | null;
  author: string;
  publish_at: string | null;
  created_at: string;
}

export async function getPosts(siteDomain: string): Promise<BlogPost[]> {
  try {
    const res = await fetch(`${API_BASE}?site=${encodeURIComponent(siteDomain)}`, {
      next: { revalidate: 60 }, // ISR: revalidate every 60 seconds
    });
    
    if (!res.ok) {
      console.error(`Failed to fetch posts: ${res.status}`);
      return [];
    }
    
    const data = await res.json();
    return data.posts || [];
  } catch (error) {
    console.error("Error fetching posts:", error);
    return [];
  }
}

export async function getPost(siteDomain: string, slug: string): Promise<BlogPost | null> {
  try {
    const res = await fetch(
      `${API_BASE}?site=${encodeURIComponent(siteDomain)}&slug=${encodeURIComponent(slug)}`,
      { next: { revalidate: 60 } }
    );
    
    if (!res.ok) {
      return null;
    }
    
    const data = await res.json();
    return data.post || null;
  } catch (error) {
    console.error("Error fetching post:", error);
    return null;
  }
}

export function formatDate(dateString: string): string {
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(new Date(dateString));
}

/** Normalized shape for rendering (matches local blog-data fields). */
export interface RenderPost {
  slug: string;
  title: string;
  date: string;
  publishedAt: string;
  category: string;
  excerpt: string;
  image?: string;
  content: string;
  isCentral: boolean;
}

export function toRenderPost(p: BlogPost): RenderPost {
  const dateIso = p.publish_at || p.created_at;
  return {
    slug: p.slug,
    title: p.title,
    date: formatDate(dateIso),
    publishedAt: dateIso,
    category: p.category || "Guitar",
    excerpt: p.excerpt || "",
    image: p.image_url || undefined,
    content: p.content,
    isCentral: true,
  };
}

/** Markdown-light (##, ###, -, **bold**) -> HTML for central posts. */
export function contentToHtml(content: string): string {
  const inline = (s: string) =>
    s.replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>");
  const blocks = content.split(/\n\n+/);
  const out: string[] = [];
  let list: string[] = [];
  const flush = () => {
    if (list.length) {
      out.push("<ul>" + list.map((i) => `<li>${inline(i)}</li>`).join("") + "</ul>");
      list = [];
    }
  };
  for (const raw of blocks) {
    const b = raw.trim();
    if (!b) continue;
    if (b.startsWith("<")) {
      flush();
      out.push(b);
      continue;
    }
    if (b.startsWith("- ")) {
      const items = b.split("\n").filter((l) => l.trim().startsWith("- "));
      list.push(...items.map((l) => l.trim().slice(2)));
      continue;
    }
    flush();
    if (b.startsWith("### ")) out.push(`<h3>${inline(b.slice(4))}</h3>`);
    else if (b.startsWith("## ")) out.push(`<h2>${inline(b.slice(3))}</h2>`);
    else out.push(`<p>${inline(b).replace(/\n/g, "<br>")}</p>`);
  }
  flush();
  return out.join("\n");
}
