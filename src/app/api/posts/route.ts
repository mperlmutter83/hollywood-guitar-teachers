import { NextResponse } from 'next/server';
import { getAllPosts } from '@/lib/blog-data';

/**
 * GET /api/posts — machine-readable blog feed for the Yes Crew CRM.
 * Mirrored into provider_content by yescrew-dashboard content sync.
 * Future-dated posts report status: 'scheduled' so the CRM shows intent.
 */

export const dynamic = 'force-dynamic';

/** Current date in America/Los_Angeles as YYYY-MM-DD. */
function getTodayLA(): string {
  return new Date().toLocaleDateString('en-CA', { timeZone: 'America/Los_Angeles' });
}

export async function GET() {
  const today = getTodayLA();

  const response = getAllPosts().map((post) => ({
    slug: post.slug,
    title: post.title,
    category: post.category,
    date: post.date,
    publishedAt: post.publishedAt,
    status: post.publishedAt <= today ? 'published' : 'scheduled',
    url: `https://www.hollywoodguitarteachers.com/blogs/${post.slug}`,
  }));

  return NextResponse.json(response);
}
