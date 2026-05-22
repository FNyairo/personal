import { notFound } from 'next/navigation';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { prisma } from '@/lib/prisma';
import { formatDate } from '@/lib/utils';
import Link from 'next/link';
import CommentForm from './CommentForm';
import { ArrowLeft, Download, ShieldCheck } from 'lucide-react';

export default async function ThreadPage({ params }: { params: { id: string } }) {
  const thread = await prisma.discussionThread.findUnique({
    where: { id: params.id },
    include: { comments: { orderBy: { createdAt: 'asc' } } },
  }).catch(() => null);

  if (!thread) notFound();

  return (
    <>
      <Navigation />
      <main className="pt-24">
        <div className="section-container max-w-3xl py-12">
          <Link href="/discuss" className="flex items-center gap-2 text-sm text-slate-400 hover:text-electric-400 transition-colors mb-8">
            <ArrowLeft className="w-4 h-4" /> Back to threads
          </Link>

          {/* Thread header */}
          <div className="glass-card p-6 mb-6">
            <h1 className="font-serif text-2xl font-bold text-white mb-2">{thread.subject}</h1>
            <p className="text-sm text-slate-400">
              Started by <span className="text-slate-300">{thread.userName}</span> · {formatDate(thread.createdAt)}
              {thread.country && ` · ${thread.city ?? ''} ${thread.country}`}
            </p>
            {thread.message && <p className="mt-4 text-slate-300 leading-relaxed">{thread.message}</p>}
            {thread.documentUrl && (
              <a href={thread.documentUrl} download target="_blank" rel="noopener noreferrer"
                className="mt-4 inline-flex items-center gap-2 text-sm text-teal-400 hover:text-teal-300 transition-colors">
                <Download className="w-4 h-4" /> Download attached document
              </a>
            )}
          </div>

          {/* Comments */}
          <div className="space-y-4 mb-8">
            {thread.comments.map((c) => (
              <div key={c.id} className={`glass-card p-5 ${c.isAdmin ? 'border border-electric-500/30' : ''}`}>
                <div className="flex items-center gap-2 mb-2">
                  <span className="font-medium text-white text-sm">{c.isAdmin ? 'Franklin Nyairo' : c.userName}</span>
                  {c.isAdmin && (
                    <span className="flex items-center gap-1 text-xs px-2 py-0.5 rounded-full bg-electric-500/20 text-electric-400 border border-electric-500/30">
                      <ShieldCheck className="w-3 h-3" /> Admin
                    </span>
                  )}
                  <span className="text-xs text-slate-500 ml-auto">{formatDate(c.createdAt)}</span>
                </div>
                <p className="text-slate-300 text-sm leading-relaxed">{c.content}</p>
              </div>
            ))}
          </div>

          {/* Reply form */}
          <h2 className="font-serif text-xl font-semibold text-white mb-4">Add a Reply</h2>
          <CommentForm threadId={thread.id} />
        </div>
      </main>
      <Footer />
    </>
  );
}
