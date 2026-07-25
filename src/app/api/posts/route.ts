import { NextResponse } from 'next/server';
import { blogPosts } from '@/lib/blog-data';

/**
 * GET /api/posts — machine-readable blog feed for the Yes Crew CRM.
 *
 * The yescrew-dashboard content sync polls this endpoint on every Vercel
 * provider site and mirrors the posts into provider_content (the /content
 * page). Shape matches the rest of the network:
 *   { slug, title, category, date, publishedAt, status, url }
 */

export const dynamic = 'force-dynamic';

/** Parse the display date ('Apr 29, 2026') into YYYY-MM-DD, or null. */
function toIsoDate(dateStr: string): string | null {
  const ms = Date.parse(dateStr);
  if (Number.isNaN(ms)) return null;
  return new Date(ms).toISOString().slice(0, 10);
}

/** Current date in America/Los_Angeles as YYYY-MM-DD. */
function getTodayLA(): string {
  return new Date().toLocaleDateString('en-CA', { timeZone: 'America/Los_Angeles' });
}

export async function GET() {
  const today = getTodayLA();

  const response = blogPosts.map((post) => {
    const publishedAt = toIsoDate(post.date);
    return {
      slug: post.slug,
      title: post.title,
      category: post.category,
      date: post.date,
      publishedAt,
      // Future-dated posts report as scheduled so the CRM matches intent.
      status: publishedAt && publishedAt <= today ? 'published' : 'scheduled',
      url: `https://www.hollywoodguitarteachers.com/blogs/${post.slug}`,
    };
  });

  return NextResponse.json(response);
}
