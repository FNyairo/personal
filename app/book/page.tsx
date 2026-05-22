import type { Metadata } from 'next';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Book a Chat',
  description: 'Schedule a 30-minute conversation with Franklin Nyairo about research collaboration, instructional design, or maritime education.',
};

export default function BookPage() {
  const calendlyUrl = process.env.NEXT_PUBLIC_CALENDLY_URL ?? 'https://calendly.com/franklin-nyairo';

  return (
    <>
      <Navigation />
      <main className="pt-24">
        <section className="section-container py-12">
          <div className="max-w-2xl mx-auto text-center mb-10">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="h-px w-8 bg-gradient-to-r from-electric-500 to-teal-500" />
              <span className="text-xs font-medium text-electric-400 uppercase tracking-widest">Schedule</span>
              <div className="h-px w-8 bg-gradient-to-l from-electric-500 to-teal-500" />
            </div>
            <h1 className="font-serif text-5xl font-bold text-white mb-4">
              Book a <span className="gradient-text">Chat</span>
            </h1>
            <p className="text-slate-400 text-lg leading-relaxed">
              A focused 30-minute conversation. Useful for discussing research collaboration, instructional design
              questions, maritime education partnerships, or TPACK-related work.
            </p>
          </div>

          {/* Calendly embed */}
          <div className="glass-card overflow-hidden max-w-4xl mx-auto" style={{ minHeight: 700 }}>
            <iframe
              src={`${calendlyUrl}?embed_domain=franklinnyairo.com&embed_type=Inline&hide_landing_page_details=1&hide_gdpr_banner=1`}
              width="100%"
              height="700"
              frameBorder="0"
              title="Schedule a meeting with Franklin Nyairo"
              className="w-full"
            />
          </div>

          <p className="text-center text-slate-500 text-sm mt-6">
            Prefer email? Reach me at{' '}
            <a href="mailto:franklin.nyairo@novia.fi" className="text-electric-400 hover:underline">
              franklin.nyairo@novia.fi
            </a>
          </p>
        </section>
      </main>
      <Footer />
    </>
  );
}
