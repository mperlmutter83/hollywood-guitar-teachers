import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { getPostBySlug, getAllPostSlugs } from '@/lib/blog-data';
import { getPost, toRenderPost, contentToHtml, RenderPost } from '@/lib/api';

interface Props { params: Promise<{ slug: string }> }

const SITE_DOMAIN = 'hollywoodguitarteachers.com';

export const revalidate = 60;
export const dynamicParams = true;

// Local slugs are prerendered; central slugs are generated on demand (dynamicParams).
export async function generateStaticParams() { return getAllPostSlugs().map((slug) => ({ slug })); }

type PagePost = RenderPost;

async function resolvePost(slug: string): Promise<PagePost | null> {
  const local = getPostBySlug(slug);
  if (local) return { ...local, isCentral: false };
  const central = await getPost(SITE_DOMAIN, slug);
  if (!central) return null;
  return toRenderPost(central);
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await resolvePost(slug);
  if (!post) return { title: 'Not Found' };
  return { title: post.title, description: post.excerpt || undefined };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = await resolvePost(slug);
  if (!post) notFound();

  const contentHtml = post.isCentral ? contentToHtml(post.content) : post.content;

  return (
    <div>
      <section className="bg-indigo-900 text-white py-16"><div className="max-w-4xl mx-auto px-4"><span className="text-amber-400">{post.category}</span><h1 className="text-3xl font-bold mt-2">{post.title}</h1><p className="text-gray-300 mt-2">{post.date}</p></div></section>
      <article className="py-12 bg-white"><div className="max-w-4xl mx-auto px-4">
        {post.image && (post.isCentral ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={post.image} alt={post.title} className="rounded-lg mb-8 w-full" />
        ) : (
          <Image src={post.image} alt={post.title} width={800} height={500} className="rounded-lg mb-8 w-full" />
        ))}
        <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: contentHtml }} />
        <Link href="/blogs" className="inline-block mt-8 text-indigo-600 font-medium">← Back to Blogs</Link>
      </div></article>
    </div>
  );
}
