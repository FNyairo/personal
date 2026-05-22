'use client';
import { useState } from 'react';
import { Send, Loader2, MessageCircleQuestion } from 'lucide-react';

export default function AskQuestion() {
  const [name, setName]       = useState('');
  const [email, setEmail]     = useState('');
  const [message, setMessage] = useState('');
  const [sending, setSending] = useState(false);
  const [sent, setSent]       = useState(false);
  const [error, setError]     = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSending(true);
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, message }),
      });
      const data = await res.json();
      if (!res.ok) { setError(data.error || 'Something went wrong.'); return; }
      setSent(true);
      setName(''); setEmail(''); setMessage('');
    } catch {
      setError('Could not send your message. Please try again.');
    } finally {
      setSending(false);
    }
  };

  return (
    <div>
      <div className="flex items-center gap-3 mb-4">
        <MessageCircleQuestion className="w-5 h-5 text-teal-400" />
        <h2 className="font-serif text-2xl font-bold text-white">Start a Conversation</h2>
      </div>
      <p className="text-slate-400 mb-8 leading-relaxed">
        Have a question about something you read? Want to discuss a topic, push back on an argument,
        or explore a collaboration idea? Drop a message — I read and respond to everything.
      </p>

      {sent ? (
        <div className="glass-card p-6 border border-teal-500/30 bg-teal-500/10 text-center">
          <p className="text-teal-400 font-medium text-lg mb-1">Message sent!</p>
          <p className="text-slate-400 text-sm">Thanks for reaching out. I'll get back to you soon.</p>
          <button onClick={() => setSent(false)} className="mt-4 text-sm text-slate-500 hover:text-slate-300 transition-colors underline">
            Send another message
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="glass-card p-6 border border-white/10 space-y-4">
          {error && (
            <div className="px-4 py-3 rounded-lg bg-red-500/15 border border-red-500/30 text-red-400 text-sm">{error}</div>
          )}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-slate-400 mb-1.5">Your Name *</label>
              <input
                type="text" required value={name} onChange={(e) => setName(e.target.value)}
                placeholder="First name is fine"
                className="w-full px-4 py-2.5 bg-navy-800/60 border border-white/10 rounded-lg text-slate-200
                  placeholder-slate-500 text-sm focus:outline-none focus:border-electric-500/50 transition-colors"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-400 mb-1.5">Email *</label>
              <input
                type="email" required value={email} onChange={(e) => setEmail(e.target.value)}
                placeholder="So I can reply"
                className="w-full px-4 py-2.5 bg-navy-800/60 border border-white/10 rounded-lg text-slate-200
                  placeholder-slate-500 text-sm focus:outline-none focus:border-electric-500/50 transition-colors"
              />
            </div>
          </div>
          <div>
            <label className="block text-xs font-medium text-slate-400 mb-1.5">Your Question or Message *</label>
            <textarea
              required rows={5} value={message} onChange={(e) => setMessage(e.target.value)}
              placeholder="Ask a question, share a thought, suggest a topic — anything goes."
              className="w-full px-4 py-2.5 bg-navy-800/60 border border-white/10 rounded-lg text-slate-200
                placeholder-slate-500 text-sm focus:outline-none focus:border-electric-500/50 transition-colors resize-none"
            />
          </div>
          <button
            type="submit" disabled={sending}
            className="btn-primary text-sm disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {sending ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
            {sending ? 'Sending…' : 'Send Message'}
          </button>
        </form>
      )}
    </div>
  );
}
