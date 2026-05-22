'use client';
import { useState } from 'react';
import { Send, CheckCircle } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function CommentForm({ threadId }: { threadId: string }) {
  const [form, setForm] = useState({ name: '', email: '', content: '' });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const res = await fetch(`/api/discuss/${threadId}/comments`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (!res.ok) { const d = await res.json(); throw new Error(d.error ?? 'Failed'); }
      setSuccess(true);
      router.refresh();
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Something went wrong.');
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="glass-card p-6 text-center">
        <CheckCircle className="w-8 h-8 text-teal-400 mx-auto mb-2" />
        <p className="text-slate-300 text-sm">Reply added. Refresh to see it.</p>
      </div>
    );
  }

  const inputClass = 'w-full px-4 py-3 bg-navy-800/60 border border-white/10 rounded-xl text-slate-200 placeholder-slate-500 focus:outline-none focus:border-electric-500/50 transition-colors text-sm';

  return (
    <form onSubmit={handleSubmit} className="glass-card p-6 space-y-4">
      <div className="grid grid-cols-2 gap-3">
        <input required className={inputClass} placeholder="Your name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
        <input required type="email" className={inputClass} placeholder="Email address" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
      </div>
      <textarea required rows={4} className={inputClass} placeholder="Your reply…" value={form.content} onChange={(e) => setForm({ ...form, content: e.target.value })} />
      {error && <p className="text-red-400 text-sm">{error}</p>}
      <button type="submit" disabled={loading} className="btn-primary w-full justify-center">
        {loading ? 'Sending…' : <><Send className="w-4 h-4" /> Post Reply</>}
      </button>
    </form>
  );
}
