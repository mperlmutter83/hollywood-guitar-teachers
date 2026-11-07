import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { getPublishedPosts } from '@/lib/blog-data';
import { getPosts, toRenderPost, RenderPost } from '@/lib/api';

export const metadata: Metadata = { title: 'Blogs' };

export const revalidate = 60;

const SITE_DOMAIN = 'hollywoodguitarteachers.com';

export default async function BlogsPage() {
  const localPosts: RenderPost[] = getPublishedPosts().map((p) => ({ ...p, isCentral: false }));
  const centralPosts: RenderPost[] = (await getPosts(SITE_DOMAIN)).map(toRenderPost);

  // Merge, dedupe by slug (local wins), sort by date desc.
  const bySlug = new Map<string, RenderPost>();
  for (const p of centralPosts) bySlug.set(p.slug, p);
  for (const p of localPosts) bySlug.set(p.slug, p);
  const blogPosts = Array.from(bySlug.values()).sort(
    (a, b) => Date.parse(b.publishedAt) - Date.parse(a.publishedAt)
  );

  return (
    <div>
      <section className="bg-indigo-900 text-white py-16"><div className="max-w-7xl mx-auto px-4"><h1 className="text-4xl font-bold">Blogs</h1></div></section>
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-2 gap-8">
          {blogPosts.map((post) => (
            <Link key={post.slug} href={`/blogs/${post.slug}`} className="group">
              {post.image && (post.isCentral ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={post.image} alt={post.title} className="rounded-lg mb-4 w-full" />
              ) : (
                <Image src={post.image} alt={post.title} width={600} height={400} className="rounded-lg mb-4" />
              ))}
              <span className="text-indigo-600 text-sm">{post.category}</span>
              <h3 className="font-bold text-gray-900 group-hover:text-indigo-600 mt-1">{post.title}</h3>
              <p className="text-gray-600 text-sm mt-2">{post.excerpt}</p>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
