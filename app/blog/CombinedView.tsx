'use client';
import { useState, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { Search, MessageSquare, FileText, ChevronRight, BookOpen, MessagesSquare } from 'lucide-react';
import Link from 'next/link';
import BlogCard from '@/components/BlogCard';
import ThreadForm from '../discuss/ThreadForm';

type Post = {
  id: string; title: string; slug: string; excerpt: string;
  coverImage: string; tags: string[]; readingTime: number; createdAt: string;
};

type Thread = {
  id: string; subject: string; userName: string;
  createdAt: string; documentUrl: string | null;
  _count: { comments: number };
};

const PER_PAGE = 6;

function fmt(iso: string) {
  return new Date(iso).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
}

function Inner({ posts, threads }: { posts: Post[]; threads: Thread[] }) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'posts' | 'discuss'>(
    searchParams.get('tab') === 'discuss' ? 'discuss' : 'posts'
  );
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);

  // Keep tab in sync if URL changes externally
  useEffect(() => {
    const t = searchParams.get('tab');
    setActiveTab(t === 'discuss' ? 'discuss' : 'posts');
  }, [searchParams]);

  const switchTab = (tab: 'posts' | 'discuss') => {
    setActiveTab(tab);
    setQuery('');
    setPage(1);
    router.replace(`/blog${tab === 'discuss' ? '?tab=discuss' : ''}`, { scroll: false });
  };

  // --- Posts filtering ---
  const filteredPosts = posts.filter((p) =>
    p.title.toLowerCase().includes(query.toLowerCase()) ||
    p.tags.some((t) => t.toLowerCase().includes(query.toLowerCase())) ||
    p.excerpt.toLowerCase().includes(query.toLowerCase())
  );
  const totalPages = Math.ceil(filteredPosts.length / PER_PAGE);
  const paginatedPosts = filteredPosts.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  // --- Threads filtering ---
  const filteredThreads = threads.filter((t) =>
    t.subject.toLowerCase().includes(query.toLowerCase()) ||
    t.userName.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <>
      {/* Tabs + Search row */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-10">
        {/* Tab switcher */}
        <div className="flex gap-1 p-1 rounded-xl bg-navy-800/60 border border-white/10 flex-shrink-0">
          <button
            onClick={() => switchTab('posts')}
            className={`flex items-center gap-2 px-5 py-2 rounded-lg text-sm font-medium transition-all ${
              activeTab === 'posts'
                ? 'bg-electric-500 text-white shadow-lg shadow-electric-500/20'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            Blog Posts
          </button>
          <button
            onClick={() => switchTab('discuss')}
            className={`flex items-center gap-2 px-5 py-2 rounded-lg text-sm font-medium transition-all ${
              activeTab === 'discuss'
                ? 'bg-electric-500 text-white shadow-lg shadow-electric-500/20'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <MessagesSquare className="w-3.5 h-3.5" />
            Discussions
          </button>
        </div>

        {/* Search */}
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
          <input
            type="text"
            placeholder={activeTab === 'posts' ? 'Search posts or tags…' : 'Search discussions…'}
            value={query}
            onChange={(e) => { setQuery(e.target.value); setPage(1); }}
            className="w-full pl-10 pr-4 py-2.5 bg-navy-800/60 border border-white/10 rounded-xl
              text-slate-200 placeholder-slate-500 text-sm
              focus:outline-none focus:border-electric-500/50 transition-colors"
          />
        </div>
      </div>

      {/* ── Blog Posts ── */}
      {activeTab === 'posts' && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
            {paginatedPosts.map((post, i) => (
              <BlogCard key={post.id} post={post} index={i} />
            ))}
            {paginatedPosts.length === 0 && (
              <div className="col-span-3 text-center py-16 text-slate-500">
                No posts match your search.
              </div>
            )}
          </div>

          {totalPages > 1 && (
            <div className="flex justify-center gap-2">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
                <button
                  key={n}
                  onClick={() => setPage(n)}
                  className={`w-9 h-9 rounded-lg text-sm font-medium transition-all ${
                    n === page ? 'bg-electric-500 text-white' : 'glass-card text-slate-400 hover:text-white'
                  }`}
                >
                  {n}
                </button>
              ))}
            </div>
          )}
        </>
      )}

      {/* ── Discussions ── */}
      {activeTab === 'discuss' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Thread list */}
          <div>
            <h2 className="font-serif text-2xl font-semibold text-white mb-6">Active Threads</h2>
            {filteredThreads.length === 0 ? (
              <div className="glass-card p-8 text-center text-slate-500">
                {query ? 'No threads match your search.' : 'No threads yet — start the first one →'}
              </div>
            ) : (
              <div className="space-y-3">
                {filteredThreads.map((thread) => (
                  <Link key={thread.id} href={`/discuss/${thread.id}`}>
                    <div className="glass-card p-4 hover:border-electric-500/30 transition-all group border border-white/10">
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex-1 min-w-0">
                          <h3 className="font-medium text-white group-hover:text-electric-400 transition-colors truncate">
                            {thread.subject}
                          </h3>
                          <p className="text-xs text-slate-500 mt-1">
                            {thread.userName} · {fmt(thread.createdAt)}
                          </p>
                        </div>
                        <div className="flex items-center gap-3 flex-shrink-0">
                          {thread.documentUrl && (
                            <FileText className="w-4 h-4 text-teal-400" aria-label="Has document" />
                          )}
                          <div className="flex items-center gap-1 text-slate-400 text-xs">
                            <MessageSquare className="w-3.5 h-3.5" />
                            {thread._count.comments}
                          </div>
                          <ChevronRight className="w-4 h-4 text-slate-600 group-hover:text-electric-400 transition-colors" />
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* New thread form */}
          <div>
            <h2 className="font-serif text-2xl font-semibold text-white mb-6">Start a Thread</h2>
            <ThreadForm />
          </div>
        </div>
      )}
    </>
  );
}

// Wrap in Suspense because useSearchParams() requires it
export default function CombinedView(props: { posts: Post[]; threads: Thread[] }) {
  return (
    <Suspense>
      <Inner {...props} />
    </Suspense>
  );
}
