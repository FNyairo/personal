import Link from 'next/link';
import { ExternalLink, BookOpen, GraduationCap, Globe } from 'lucide-react';

const socialLinks = [
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/spaceandortime/',
    icon: ExternalLink,
  },
  {
    label: 'ResearchGate',
    href: 'https://www.researchgate.net/profile/Franklin_Nyairo',
    icon: BookOpen,
  },
  {
    label: 'Google Scholar',
    href: 'https://scholar.google.com/citations?user=Franklin_Nyairo',
    icon: GraduationCap,
  },
  {
    label: 'X / Twitter',
    href: 'https://www.twitter.com/SpaceAndOrTime',
    icon: Globe,
  },
];

const quickLinks = [
  { href: '/about', label: 'Meet Franklin' },
  { href: '/resume', label: 'My Resume' },
  { href: '/research', label: 'Projects & Research' },
  { href: '/blog', label: 'Blog Space' },
  { href: '/contact', label: 'Contact Me' },
];

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-navy-900/80 backdrop-blur-sm mt-20">
      <div className="section-container py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-electric-500 to-teal-500 flex items-center justify-center text-white font-bold text-sm">
                FN
              </div>
              <span className="font-serif font-bold text-white">Franklin Nyairo</span>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed mb-4">
              Instructional Designer · EdTech Researcher · Maritime Education Instructor ·
              Project Manager. Based in Vantaa, Finland.
            </p>
            <div className="flex gap-3">
              {socialLinks.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="p-2 rounded-lg bg-white/5 hover:bg-electric-500/20 text-slate-400
                    hover:text-electric-400 transition-all border border-white/10 hover:border-electric-500/30"
                >
                  <s.icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h3 className="text-sm font-semibold text-white mb-4 uppercase tracking-wider">Quick Links</h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-slate-400 hover:text-electric-400 transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-sm font-semibold text-white mb-4 uppercase tracking-wider">Contact</h3>
            <div className="space-y-2 text-sm text-slate-400">
              <p>Novia University of Applied Sciences</p>
              <p>Vantaa, Finland</p>
              <a
                href="mailto:franklin.nyairo@novia.fi"
                className="text-electric-400 hover:text-electric-300 transition-colors"
              >
                franklin.nyairo@novia.fi
              </a>
              <div className="pt-2">
                <Link
                  href="/book"
                  className="inline-flex items-center gap-1.5 text-teal-400 hover:text-teal-300 transition-colors"
                >
                  → Book a consultation chat
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} SpaceTime Technologies Oy. All rights reserved.</p>
          <p>Built with Next.js 14 · Tailwind CSS · Supabase</p>
        </div>
      </div>
    </footer>
  );
}
