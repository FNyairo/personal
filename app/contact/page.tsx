import type { Metadata } from 'next';
import Navigation from '@/components/Navigation';
import StarBackground from '@/components/StarBackground';
import { CONTACT_SKY } from '@/lib/constellations';
import Footer from '@/components/Footer';
import ContactForm from './ContactForm';
import { MapPin, Mail, Phone, ExternalLink, BookOpen, GraduationCap } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Contact Me',
  description: 'Every significant collaboration starts with a single message. Reach out to Franklin Nyairo for research, partnership, or speaking inquiries.',
};

export default function ContactPage() {
  return (
    <>
      <StarBackground constellations={CONTACT_SKY} />
      <Navigation />
      <main className="pt-24">
        <section className="section-container py-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-start">
            {/* Left */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="h-px w-8 bg-gradient-to-r from-electric-500 to-teal-500" />
                <span className="text-xs font-medium text-electric-400 uppercase tracking-widest">Get in Touch</span>
              </div>
              <h1 className="font-serif text-5xl font-bold text-white mb-4">
                Let&apos;s <span className="gradient-text">Connect</span>
              </h1>
              <p className="text-slate-400 leading-relaxed mb-8">
                Every significant collaboration starts with a single message. Research partnerships,
                conference invitations, project inquiries about iMASTER, DigiMar or TPACK — all welcome.
              </p>

              <div className="space-y-4">
                {[
                  { icon: Mail, label: 'Email (work)', value: 'franklin.nyairo@novia.fi', href: 'mailto:franklin.nyairo@novia.fi' },
                  { icon: Mail, label: 'Email (university)', value: 'franklin.nyairo@helsinki.fi', href: 'mailto:franklin.nyairo@helsinki.fi' },
                  { icon: Mail, label: 'Email (personal)', value: 'nyairo7@gmail.com', href: 'mailto:nyairo7@gmail.com' },
                  { icon: MapPin, label: 'Location', value: 'Helsinki, Finland', href: null },
                  { icon: Phone, label: 'Phone (work)', value: '+358 50 470 1260', href: 'tel:+358504701260' },
                  { icon: Phone, label: 'Phone (home)', value: '+358 44 926 6252', href: 'tel:+358449266252' },
                  { icon: ExternalLink, label: 'LinkedIn', value: 'linkedin.com/in/spaceandortime', href: 'https://www.linkedin.com/in/spaceandortime/' },
                  { icon: BookOpen, label: 'ResearchGate', value: 'researchgate.net/profile/Franklin_Nyairo', href: 'https://www.researchgate.net/profile/Franklin_Nyairo' },
                  { icon: GraduationCap, label: 'Google Scholar', value: 'scholar.google.com', href: 'https://scholar.google.com/citations?user=Franklin_Nyairo' },
                ].map(({ icon: Icon, label, value, href }) => (
                  <div key={label} className="flex items-start gap-3">
                    <div className="w-9 h-9 rounded-lg bg-electric-500/10 flex items-center justify-center flex-shrink-0">
                      <Icon className="w-4 h-4 text-electric-400" />
                    </div>
                    <div>
                      <p className="text-xs text-slate-500 mb-0.5">{label}</p>
                      {href ? (
                        <a href={href} target={href.startsWith('http') ? '_blank' : undefined} rel="noopener noreferrer"
                          className="text-sm text-slate-300 hover:text-electric-400 transition-colors">{value}</a>
                      ) : (
                        <p className="text-sm text-slate-300">{value}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right — form */}
            <div>
              <h2 className="font-serif text-2xl font-semibold text-white mb-6">Send a Message</h2>
              <ContactForm />
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
