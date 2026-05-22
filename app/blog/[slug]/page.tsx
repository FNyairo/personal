export const dynamic = 'force-dynamic';

import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { prisma } from '@/lib/prisma';
import { formatDate } from '@/lib/utils';
import BlogContent from './BlogContent';
import CommentSection from './CommentSection';
import { Clock, ArrowLeft, ExternalLink, Globe } from 'lucide-react';

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const post = await prisma.post.findUnique({ where: { slug: params.slug } }).catch(() => null);
  if (!post) return { title: 'Post Not Found' };
  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: [{ url: post.coverImage }],
    },
  };
}

export async function generateStaticParams() {
  const posts = await prisma.post.findMany({ where: { published: true }, select: { slug: true } }).catch(() => []);
  return posts.map((p) => ({ slug: p.slug }));
}

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = await prisma.post.findUnique({ where: { slug: params.slug, published: true } }).catch(() => null);
  if (!post) notFound();

  return (
    <>
      <Navigation />
      <main className="pt-24">
        {/* Cover image */}
        <div className="relative h-72 md:h-96 w-full overflow-hidden">
          <Image src={post.coverImage} alt={post.title} fill className="object-cover" priority />
          <div className="absolute inset-0 bg-gradient-to-t from-navy-900 via-navy-900/50 to-transparent" />
        </div>

        <div className="section-container max-w-3xl -mt-20 relative z-10 pb-20">
          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-4">
            {post.tags.map((tag) => (
              <span key={tag} className="tag-pill">{tag}</span>
            ))}
          </div>

          {/* Title */}
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-white mb-4 leading-tight">
            {post.title}
          </h1>

          {/* Meta */}
          <div className="flex flex-wrap items-center gap-4 text-sm text-slate-400 mb-10 pb-6 border-b border-white/10">
            <div className="flex items-center gap-2">
              <Image
                src="https://ea-tel.eu/wp-content/uploads/FranklinNyairoPic.jpg"
                alt="Franklin Nyairo"
                width={32}
                height={32}
                className="rounded-full object-cover"
              />
              <Link href="/about" className="text-white hover:text-electric-400 transition-colors font-medium">
                Franklin Nyairo
              </Link>
            </div>
            <span className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5" />
              {post.readingTime} min read
            </span>
            <span>{formatDate(post.createdAt)}</span>
          </div>

          {/* Content */}
          <BlogContent content={post.content} />

          {/* Share */}
          <div className="mt-12 pt-8 border-t border-white/10">
            <p className="text-slate-400 text-sm mb-4">Share this post:</p>
            <div className="flex gap-3">
              <a
                href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(`https://franklinnyairo.com/blog/${post.slug}`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm px-4 py-2 rounded-lg bg-blue-600/20 text-blue-400 border border-blue-600/30 hover:bg-blue-600/30 transition-colors"
              >
                <ExternalLink className="w-4 h-4" /> LinkedIn
              </a>
              <a
                href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(`https://franklinnyairo.com/blog/${post.slug}`)}&text=${encodeURIComponent(post.title)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm px-4 py-2 rounded-lg bg-slate-700/40 text-slate-300 border border-white/10 hover:bg-slate-700/60 transition-colors"
              >
                <Globe className="w-4 h-4" /> X / Twitter
              </a>
            </div>
          </div>

          {/* Comments */}
          <CommentSection slug={post.slug} />

          {/* Back */}
          <Link href="/blog" className="flex items-center gap-2 mt-10 text-sm text-slate-400 hover:text-electric-400 transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Back to all posts
          </Link>
        </div>
      </main>
      <Footer />
    </>
  );
}
