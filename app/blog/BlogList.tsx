'use client';
import { useState } from 'react';
import BlogCard from '@/components/BlogCard';
import { Search } from 'lucide-react';

const PER_PAGE = 5;

type Post = {
  id: string; title: string; slug: string; excerpt: string;
  coverImage: string; tags: string[]; readingTime: number; createdAt: string;
};

export default function BlogList({ posts }: { posts: Post[] }) {
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);

  const filtered = posts.filter(
    (p) =>
      p.title.toLowerCase().includes(query.toLowerCase()) ||
      p.tags.some((t) => t.toLowerCase().includes(query.toLowerCase())) ||
      p.excerpt.toLowerCase().includes(query.toLowerCase())
  );

  const totalPages = Math.ceil(filtered.length / PER_PAGE);
  const paginated = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  return (
    <>
      {/* Search */}
      <div className="relative mb-10 max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
        <input
          type="text"
          placeholder="Search posts, tags…"
          value={query}
          onChange={(e) => { setQuery(e.target.value); setPage(1); }}
          className="w-full pl-10 pr-4 py-3 bg-navy-800/60 border border-white/10 rounded-xl text-slate-200
            placeholder-slate-500 focus:outline-none focus:border-electric-500/50 transition-colors"
        />
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
        {paginated.map((post, i) => (
          <BlogCard key={post.id} post={post} index={i} />
        ))}
        {paginated.length === 0 && (
          <div className="col-span-3 text-center py-16 text-slate-500">No posts match your search.</div>
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center gap-2">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
            <button
              key={n}
              onClick={() => setPage(n)}
              className={`w-9 h-9 rounded-lg text-sm font-medium transition-all ${
                n === page
                  ? 'bg-electric-500 text-white'
                  : 'glass-card text-slate-400 hover:text-white'
              }`}
            >
              {n}
            </button>
          ))}
        </div>
      )}
    </>
  );
}
