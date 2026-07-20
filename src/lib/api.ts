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
