'use client';
import { useState, useEffect, useCallback } from 'react';
import { MessageSquare, Send, Loader2, User } from 'lucide-react';

type Comment = { id: string; name: string; content: string; createdAt: string };

function fmt(iso: string) {
  return new Date(iso).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
}

export default function CommentSection({ slug }: { slug: string }) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [content, setContent] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const fetchComments = useCallback(async () => {
    try {
      const res = await fetch(`/api/blog/${slug}/comments`);
      const data = await res.json();
      setComments(Array.isArray(data) ? data : []);
    } catch {
      setComments([]);
    } finally {
      setLoading(false);
    }
  }, [slug]);

  useEffect(() => { fetchComments(); }, [fetchComments]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSubmitting(true);
    try {
      const res = await fetch(`/api/blog/${slug}/comments`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, content }),
      });
      const data = await res.json();
      if (!res.ok) { setError(data.error || 'Something went wrong.'); return; }

      setComments((prev) => [...prev, data]);
      setName(''); setEmail(''); setContent('');
      setSuccess(true);
      setTimeout(() => setSuccess(false), 4000);
    } catch {
      setError('Could not submit comment. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="mt-16 pt-12 border-t border-white/10">
      <div className="flex items-center gap-3 mb-8">
        <MessageSquare className="w-5 h-5 text-electric-400" />
        <h2 className="font-serif text-2xl font-bold text-white">
          Discussion{comments.length > 0 && <span className="text-slate-500 text-lg ml-2">({comments.length})</span>}
        </h2>
      </div>

      {/* Existing comments */}
      {loading ? (
        <div className="flex items-center gap-2 text-slate-500 text-sm mb-8">
          <Loader2 className="w-4 h-4 animate-spin" /> Loading comments…
        </div>
      ) : comments.length === 0 ? (
        <p className="text-slate-500 text-sm mb-8 italic">No comments yet — be the first to start the discussion.</p>
      ) : (
        <div className="space-y-4 mb-10">
          {comments.map((c) => (
            <div key={c.id} className="glass-card p-5 border border-white/10">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-8 rounded-full bg-electric-500/20 flex items-center justify-center">
                  <User className="w-4 h-4 text-electric-400" />
                </div>
                <div>
                  <p className="text-sm font-medium text-white">{c.name}</p>
                  <p className="text-xs text-slate-500">{fmt(c.createdAt)}</p>
                </div>
              </div>
              <p className="text-slate-300 text-sm leading-relaxed whitespace-pre-wrap pl-10">{c.content}</p>
            </div>
          ))}
        </div>
      )}

      {/* Comment form */}
      <div className="glass-card p-6 border border-white/10">
        <h3 className="font-serif text-lg font-semibold text-white mb-5">Leave a Comment</h3>

        {success && (
          <div className="mb-4 px-4 py-3 rounded-lg bg-teal-500/15 border border-teal-500/30 text-teal-400 text-sm">
            Comment posted — thanks for joining the discussion!
          </div>
        )}
        {error && (
          <div className="mb-4 px-4 py-3 rounded-lg bg-red-500/15 border border-red-500/30 text-red-400 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-slate-400 mb-1.5">Name *</label>
              <input
                type="text" required value={name} onChange={(e) => setName(e.target.value)}
                placeholder="Your name"
                className="w-full px-4 py-2.5 bg-navy-800/60 border border-white/10 rounded-lg text-slate-200
                  placeholder-slate-500 text-sm focus:outline-none focus:border-electric-500/50 transition-colors"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-400 mb-1.5">Email * <span className="text-slate-600">(not published)</span></label>
              <input
                type="email" required value={email} onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                className="w-full px-4 py-2.5 bg-navy-800/60 border border-white/10 rounded-lg text-slate-200
                  placeholder-slate-500 text-sm focus:outline-none focus:border-electric-500/50 transition-colors"
              />
            </div>
          </div>
          <div>
            <label className="block text-xs font-medium text-slate-400 mb-1.5">Comment *</label>
            <textarea
              required rows={4} value={content} onChange={(e) => setContent(e.target.value)}
              placeholder="Share your thoughts, questions, or feedback…"
              className="w-full px-4 py-2.5 bg-navy-800/60 border border-white/10 rounded-lg text-slate-200
                placeholder-slate-500 text-sm focus:outline-none focus:border-electric-500/50 transition-colors resize-none"
            />
            <p className="text-xs text-slate-600 mt-1">{content.length} / 2000</p>
          </div>
          <button
            type="submit" disabled={submitting}
            className="btn-primary text-sm disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {submitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
            {submitting ? 'Posting…' : 'Post Comment'}
          </button>
        </form>
      </div>
    </section>
  );
}
