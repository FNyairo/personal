export const dynamic = 'force-dynamic';

import type { Metadata } from 'next';
import Link from 'next/link';
import { prisma } from '@/lib/prisma';
import Hero from '@/components/Hero';
import Navigation from '@/components/Navigation';
import StarBackground from '@/components/StarBackground';
import { HOME_SKY } from '@/lib/constellations';
import Footer from '@/components/Footer';
import StatsCounter from '@/components/StatsCounter';
import BlogCard from '@/components/BlogCard';
import { ArrowRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Franklin Nyairo | EdTech Researcher & Maritime Education Instructor',
  description: 'Instructional Designer, EdTech Researcher, and Maritime Education Instructor. Project Manager at Novia UAS, Finland. PhD Candidate at the University of Helsinki.',
};

// JSON-LD structured data
const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Franklin Nyairo',
  url: 'https://franklinnyairo.com',
  image: 'https://nyairo.net/franklin-nyairo.jpg',
  email: 'franklin.nyairo@novia.fi',
  jobTitle: 'Project Manager & Instructor / PhD Candidate',
  worksFor: {
    '@type': 'Organization',
    name: 'Novia University of Applied Sciences',
    url: 'https://www.novia.fi',
  },
  alumniOf: [
    { '@type': 'CollegeOrUniversity', name: 'University of Helsinki' },
    { '@type': 'CollegeOrUniversity', name: 'University of Turku' },
    { '@type': 'CollegeOrUniversity', name: 'Kenyatta University' },
  ],
  sameAs: [
    'https://www.linkedin.com/in/spaceandortime/',
    'https://www.researchgate.net/profile/Franklin_Nyairo',
    'https://researchportal.helsinki.fi/en/persons/franklin-nyairo',
    'https://www.twitter.com/SpaceAndOrTime',
  ],
  knowsAbout: ['TPACK', 'Maritime Education', 'Instructional Design', 'EdTech', 'EFL Teacher Education'],
};

export default async function HomePage() {
  // Fetch data server-side
  const [stats, recentPosts] = await Promise.all([
    prisma.stats.findMany().catch(() => [
      { key: 'publications', value: 6, label: 'Publications' },
      { key: 'projects', value: 4, label: 'Active Projects' },
      { key: 'talks', value: 8, label: 'Talks & Presentations' },
      { key: 'citations', value: 42, label: 'Citations' },
    ]),
    prisma.post.findMany({
      where: { published: true },
      orderBy: { createdAt: 'desc' },
      take: 3,
    }).catch(() => []),
  ]);

  return (
    <>
      <StarBackground constellations={HOME_SKY} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Navigation />
      <main>
        <Hero />
        <StatsCounter stats={stats} />

        {/* Recent Posts */}
        {recentPosts.length > 0 && (
          <section className="py-20">
            <div className="section-container">
              <div className="flex items-end justify-between mb-12">
                <div>
                  <h2 className="section-heading">Recent Writing</h2>
                  <p className="text-slate-400">Research notes and reflections on EdTech, maritime education, and TPACK.</p>
                </div>
                <Link href="/blog" className="flex items-center gap-1.5 text-electric-400 hover:text-electric-300 transition-colors text-sm font-medium">
                  All posts <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {recentPosts.map((post, i) => (
                  <BlogCard key={post.id} post={{ ...post, createdAt: post.createdAt.toISOString() }} index={i} />
                ))}
              </div>
            </div>
          </section>
        )}

        {/* CTA Banner */}
        <section className="py-20">
          <div className="section-container">
            <div className="glass-card p-10 text-center relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-electric-500/10 to-teal-500/10" />
              <div className="relative">
                <h2 className="font-serif text-3xl font-bold text-white mb-4">
                  Let&apos;s collaborate on something meaningful.
                </h2>
                <p className="text-slate-400 mb-8 max-w-xl mx-auto">
                  Whether you want to discuss research, explore partnership opportunities, or simply connect —
                  I am available for a focused 30-minute conversation.
                </p>
                <div className="flex flex-wrap justify-center gap-4">
                  <Link href="/book" className="btn-primary">Book a Chat</Link>
                  <Link href="/contact" className="btn-secondary">Send a Message</Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
