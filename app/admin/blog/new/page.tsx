'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import TipTapEditor from '@/components/TipTapEditor';
import { Save, ArrowLeft } from 'lucide-react';

export default function NewPostPage() {
  const [form, setForm] = useState({
    title: '', slug: '', excerpt: '', coverImage: '', tags: '', published: false,
  });
  const [content, setContent] = useState<object>({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const inputClass = 'w-full px-4 py-3 bg-navy-800/60 border border-white/10 rounded-xl text-slate-200 placeholder-slate-500 focus:outline-none focus:border-electric-500/50 transition-colors text-sm';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const res = await fetch('/api/blog', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          tags: form.tags.split(',').map((t) => t.trim()).filter(Boolean),
          content,
        }),
      });
      if (!res.ok) { const d = await res.json(); throw new Error(d.error ?? 'Failed'); }
      router.push('/admin/blog');
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Something went wrong.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-navy-900 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-4 mb-8">
          <Link href="/admin/blog" className="flex items-center gap-1.5 text-slate-400 hover:text-electric-400 text-sm">
            <ArrowLeft className="w-4 h-4" /> Back
          </Link>
          <h1 className="font-serif text-2xl font-bold text-white">New Post</h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <input required className={inputClass} placeholder="Post title" value={form.title}
            onChange={(e) => {
              const title = e.target.value;
              const slug = title.toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-');
              setForm({ ...form, title, slug });
            }} />
          <input required className={inputClass} placeholder="Slug (auto-filled)" value={form.slug}
            onChange={(e) => setForm({ ...form, slug: e.target.value })} />
          <textarea rows={2} className={inputClass} placeholder="Excerpt (shown in list view)" value={form.excerpt}
            onChange={(e) => setForm({ ...form, excerpt: e.target.value })} />
          <input className={inputClass} placeholder="Cover image URL (Unsplash recommended)" value={form.coverImage}
            onChange={(e) => setForm({ ...form, coverImage: e.target.value })} />
          <input className={inputClass} placeholder="Tags (comma-separated): TPACK, DigiMar, Maritime Education" value={form.tags}
            onChange={(e) => setForm({ ...form, tags: e.target.value })} />

          {/* TipTap */}
          <div>
            <label className="text-sm text-slate-400 mb-2 block">Content</label>
            <TipTapEditor onChange={setContent} placeholder="Start writing your post…" />
          </div>

          <div className="flex items-center gap-3">
            <label className="flex items-center gap-2 text-sm text-slate-300 cursor-pointer">
              <input type="checkbox" checked={form.published}
                onChange={(e) => setForm({ ...form, published: e.target.checked })}
                className="w-4 h-4 accent-electric-500" />
              Publish immediately
            </label>
          </div>

          {error && <p className="text-red-400 text-sm">{error}</p>}

          <button type="submit" disabled={loading} className="btn-primary">
            <Save className="w-4 h-4" />
            {loading ? 'Saving…' : 'Save Post'}
          </button>
        </form>
      </div>
    </div>
  );
}
