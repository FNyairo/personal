'use client';
import { useState } from 'react';
import { Send, CheckCircle } from 'lucide-react';

export default function ContactForm() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (!res.ok) { const d = await res.json(); throw new Error(d.error ?? 'Failed'); }
      setSuccess(true);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Something went wrong.');
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="glass-card p-10 text-center">
        <CheckCircle className="w-12 h-12 text-teal-400 mx-auto mb-4" />
        <h3 className="font-serif text-xl font-semibold text-white mb-2">Message received!</h3>
        <p className="text-slate-400 text-sm">I will respond within a few business days.</p>
      </div>
    );
  }

  const inputClass = 'w-full px-4 py-3 bg-navy-800/60 border border-white/10 rounded-xl text-slate-200 placeholder-slate-500 focus:outline-none focus:border-electric-500/50 transition-colors text-sm';

  return (
    <form onSubmit={handleSubmit} className="glass-card p-6 space-y-4">
      <input required className={inputClass} placeholder="Your name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
      <input required type="email" className={inputClass} placeholder="Email address" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
      <textarea required rows={6} className={inputClass} placeholder="Your message…" value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} />
      {error && <p className="text-red-400 text-sm">{error}</p>}
      <button type="submit" disabled={loading} className="btn-primary w-full justify-center">
        {loading ? 'Sending…' : <><Send className="w-4 h-4" /> Send Message</>}
      </button>
      <p className="text-xs text-slate-500 text-center">
        Your IP and approximate location are logged for spam prevention.
      </p>
    </form>
  );
}
