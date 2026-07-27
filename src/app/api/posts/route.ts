import { NextResponse } from 'next/server';
import { getAllPosts } from '@/lib/blog-data';

/**
 * GET /api/posts — machine-readable blog feed for the Yes Crew CRM.
 *
 * Merges local blog-data posts with the centralized blog store
 * (yescrew-dashboard blog_posts, polled with ?include=scheduled so
 * upcoming scheduled posts appear on the CRM /content page).
 * Central posts win on slug conflicts.
 * Shape: { slug, title, category, date, publishedAt, status, url }
 */

export const dynamic = 'force-dynamic';

const SITE_DOMAIN = 'hollywoodguitarteachers.com';
const POST_URL_BASE = 'https://www.hollywoodguitarteachers.com/blogs';
const CENTRAL_API = `https://yescrew-dashboard.vercel.app/api/posts?site=${SITE_DOMAIN}&include=scheduled`;

/** Current date in America/Los_Angeles as YYYY-MM-DD. */
function getTodayLA(): string {
  return new Date().toLocaleDateString('en-CA', { timeZone: 'America/Los_Angeles' });
}

function displayDate(iso: string): string {
  return new Date(iso).toLocaleDateString('en-US', {
    month: 'short', day: 'numeric', year: 'numeric', timeZone: 'UTC',
  });
}

interface CentralPost {
  slug: string;
  title: string;
  category: string | null;
  publish_at: string | null;
  created_at: string;
}

interface FeedItem {
  slug: string;
  title: string;
  category: string | null;
  date: string | null;
  publishedAt: string | null;
  status: 'published' | 'scheduled';
  url: string;
}

export async function GET() {
  const today = getTodayLA();
  const items = new Map<string, FeedItem>();

  // Local posts first — central posts override on slug conflicts.
  for (const post of getAllPosts()) {
    items.set(post.slug, {
      slug: post.slug,
      title: post.title,
      category: post.category ?? null,
      date: post.date,
      publishedAt: post.publishedAt,
      status: post.publishedAt <= today ? 'published' : 'scheduled',
      url: `${POST_URL_BASE}/${post.slug}`,
    });
  }

  try {
    const res = await fetch(CENTRAL_API, { cache: 'no-store' });
    if (res.ok) {
      const data = await res.json();
      for (const post of (data.posts ?? []) as CentralPost[]) {
        const iso = post.publish_at || post.created_at;
        const publishedAt = iso ? iso.slice(0, 10) : null;
        items.set(post.slug, {
          slug: post.slug,
          title: post.title,
          category: post.category,
          date: iso ? displayDate(iso) : null,
          publishedAt,
          status: publishedAt && publishedAt <= today ? 'published' : 'scheduled',
          url: `${POST_URL_BASE}/${post.slug}`,
        });
      }
    }
  } catch {
    // Central API unreachable — local posts still served.
  }

  return NextResponse.json(Array.from(items.values()));
}
