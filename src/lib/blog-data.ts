export interface BlogPost { slug: string; title: string; date: string; publishedAt: string; category: string; excerpt: string; image: string; content: string; }

export const blogPosts: BlogPost[] = [
  { slug: 'how-to-practice-guitar-effectively', title: 'How to Practice Guitar Effectively', date: 'April 29, 2026', publishedAt: '2026-04-29', category: 'Tips', excerpt: 'Learn the most effective ways to practice guitar and see real improvement in your playing.', image: '/images/beginner.jpg', content: '<p>Effective practice is the key to becoming a great guitarist. Here are our top tips for maximizing your practice time.</p>' },
  { slug: 'best-guitars-for-beginners', title: 'Best Guitars for Beginners in 2026', date: 'April 4, 2026', publishedAt: '2026-04-04', category: 'Gear', excerpt: 'Choosing your first guitar? Here are our top picks for beginner-friendly guitars.', image: '/images/intermediate.jpg', content: '<p>The right guitar can make all the difference when you\'re starting out. Here are our recommendations.</p>' },
];


/** Current date in America/Los_Angeles as YYYY-MM-DD. */
function getTodayLA(): string {
  return new Date().toLocaleDateString('en-CA', { timeZone: 'America/Los_Angeles' });
}

/**
 * Only posts whose publishedAt is <= today (America/Los_Angeles).
 * Use for all public-facing listings and lookups so scheduled posts
 * stay invisible until their date.
 */
export function getPublishedPosts(): BlogPost[] {
  const today = getTodayLA();
  return blogPosts.filter(post => post.publishedAt <= today);
}

/** Published post by slug — undefined if not found or not yet published. */
export function getPostBySlug(slug: string): BlogPost | undefined {
  return getPublishedPosts().find(post => post.slug === slug);
}

/** Slugs of published posts (generateStaticParams). */
export function getAllPostSlugs(): string[] {
  return getPublishedPosts().map(post => post.slug);
}

/** ALL posts (published + scheduled) — /api/posts feed & admin only. */
export function getAllPosts(): BlogPost[] {
  return blogPosts;
}
