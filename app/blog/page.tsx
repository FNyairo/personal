export const dynamic = 'force-dynamic';

import type { Metadata } from 'next';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { prisma } from '@/lib/prisma';
import BlogList from './BlogList';
import AskQuestion from './AskQuestion';

export const metadata: Metadata = {
  title: 'Blog Space',
  description: 'Thinking out loud about EdTech, TPACK, and maritime education. Pull up a chair — read a post, leave a comment, or start a conversation.',
};

export default async function BlogPage() {
  const posts = await prisma.post.findMany({
    where: { published: true },
    orderBy: { createdAt: 'desc' },
  }).catch(() => []);

  const serialized = posts.map((p) => ({
    ...p,
    createdAt: p.createdAt.toISOString(),
    updatedAt: p.updatedAt.toISOString(),
  }));

  return (
    <>
      <Navigation />
      <main className="pt-24">
        {/* Blog header banner */}
        <div className="relative h-56 overflow-hidden">
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: "url('/images/blog-bg.jpg')" }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-navy-900/60 via-navy-900/50 to-navy-900" />
        </div>

        <section className="section-container py-12">
          <div className="max-w-2xl mb-14">
            <div className="flex items-center gap-3 mb-4">
              <div className="h-px w-8 bg-gradient-to-r from-electric-500 to-teal-500" />
              <span className="text-xs font-medium text-electric-400 uppercase tracking-widest">Writing & Discussion</span>
            </div>
            <h1 className="font-serif text-5xl font-bold text-white mb-4">
              Blog <span className="gradient-text">Space</span>
            </h1>
            <p className="text-slate-400 text-lg leading-relaxed">
              Thinking out loud about EdTech, TPACK, and maritime education. Pull up a chair —
              read a post, leave a comment, or start a conversation below.
            </p>
          </div>
          <BlogList posts={serialized} />
        </section>

        {/* Ask a question / start a conversation */}
        <section className="py-16 bg-navy-800/30">
          <div className="section-container max-w-2xl">
            <AskQuestion />
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
