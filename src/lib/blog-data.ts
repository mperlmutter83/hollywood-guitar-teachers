export interface BlogPost { slug: string; title: string; date: string; category: string; excerpt: string; image: string; content: string; }

export const blogPosts: BlogPost[] = [
  { slug: 'how-to-practice-guitar-effectively', title: 'How to Practice Guitar Effectively', date: 'April 29, 2026', category: 'Tips', excerpt: 'Learn the most effective ways to practice guitar and see real improvement in your playing.', image: '/images/beginner.jpg', content: '<p>Effective practice is the key to becoming a great guitarist. Here are our top tips for maximizing your practice time.</p>' },
  { slug: 'best-guitars-for-beginners', title: 'Best Guitars for Beginners in 2026', date: 'April 4, 2026', category: 'Gear', excerpt: 'Choosing your first guitar? Here are our top picks for beginner-friendly guitars.', image: '/images/intermediate.jpg', content: '<p>The right guitar can make all the difference when you\'re starting out. Here are our recommendations.</p>' },
];

export function getPostBySlug(slug: string) { return blogPosts.find((p) => p.slug === slug); }
export function getAllPostSlugs() { return blogPosts.map((p) => p.slug); }
