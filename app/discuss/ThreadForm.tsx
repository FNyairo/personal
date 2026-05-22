'use client';
import { useState, useRef } from 'react';
import { Upload, Send, CheckCircle } from 'lucide-react';

export default function ThreadForm() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const fileRef = useRef<HTMLInputElement>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const fd = new FormData();
      Object.entries(form).forEach(([k, v]) => fd.append(k, v));
      if (file) fd.append('document', file);
      const res = await fetch('/api/discuss', { method: 'POST', body: fd });
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
      <div className="glass-card p-8 text-center">
        <CheckCircle className="w-12 h-12 text-teal-400 mx-auto mb-4" />
        <h3 className="font-serif text-xl font-semibold text-white mb-2">Thread created!</h3>
        <p className="text-slate-400 text-sm">You will receive a response within a few days.</p>
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
      <input required className={inputClass} placeholder="Subject" value={form.subject} onChange={(e) => setForm({ ...form, subject: e.target.value })} />
      <textarea rows={4} className={inputClass} placeholder="Initial message (optional)" value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} />

      {/* File upload */}
      <div>
        <input ref={fileRef} type="file" accept=".pdf,.docx" className="hidden" onChange={(e) => setFile(e.target.files?.[0] ?? null)} />
        <button type="button" onClick={() => fileRef.current?.click()}
          className="flex items-center gap-2 w-full px-4 py-3 border border-dashed border-white/20 rounded-xl text-slate-400 text-sm hover:border-electric-500/50 hover:text-electric-400 transition-all">
          <Upload className="w-4 h-4" />
          {file ? file.name : 'Attach a PDF or DOCX (max 10MB)'}
        </button>
      </div>

      {error && <p className="text-red-400 text-sm">{error}</p>}

      <button type="submit" disabled={loading} className="btn-primary w-full justify-center">
        {loading ? 'Submitting…' : <><Send className="w-4 h-4" /> Submit Thread</>}
      </button>

      <p className="text-xs text-slate-500 text-center">
        Your IP and approximate location are logged for spam prevention only.
      </p>
    </form>
  );
}
