'use client';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useState } from 'react';
import Navigation from '@/components/Navigation';
import StarBackground from '@/components/StarBackground';
import { ABOUT_SKY } from '@/lib/constellations';
import Footer from '@/components/Footer';
import AboutHeroBand from '@/components/AboutHeroBand';
import { FileText, MapPin, Mail, Globe } from 'lucide-react';

const funFacts = [
  { front: '🇫🇮', back: 'Based in Vantaa, Finland — fluent in English, functional Finnish, native Swahili.' },
  { front: '🎓', back: 'Three graduate degrees: English Philology (Helsinki), Educational Sciences (Turku), B.Ed (Kenyatta).' },
  { front: '⚓', back: 'Maritime education was not the plan — it found me through a simulator-based research project.' },
  { front: '🌍', back: 'Research spans two continents: Finland and Kenya, bridging two contrasting curriculum frameworks.' },
  { front: '🤖', back: 'iMASTER taught me that AI in education works best when it stays invisible and assessment-focused.' },
  { front: '📡', back: 'Learning Python for maritime data analytics — because the data already exists; the insight does not.' },
];

const values = [
  { icon: '🔬', title: 'Evidence First', desc: 'Claims without data are opinion. Every design decision traces back to empirical grounding.' },
  { icon: '🔗', title: 'Cross-disciplinary Thinking', desc: 'The most productive tensions occur at the boundary of two fields that have not yet talked to each other.' },
  { icon: '🌐', title: 'International Collaboration', desc: 'Finnish rigor and Kenyan pragmatism produce research that neither context generates alone.' },
  { icon: '🛠', title: 'Technology as Enabler', desc: 'Technology is not the point. Learning is the point. Technology is only useful when it reduces friction between the two.' },
];

export default function AboutPage() {
  const [flipped, setFlipped] = useState<number | null>(null);

  return (
    <>
      <StarBackground constellations={ABOUT_SKY} />
      <Navigation />
      <main className="pt-24">
        {/* Animated keyword band */}
        <AboutHeroBand />

        {/* Hero split layout */}
        <section className="section-container py-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Photo */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
              className="relative"
            >
              <div className="relative w-full max-w-md mx-auto aspect-[4/5] rounded-2xl overflow-hidden">
                <Image
                  src="/franklin-nyairo.jpg"
                  alt="Franklin Nyairo"
                  fill
                  className="object-cover"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy-900/60 to-transparent" />
              </div>
              {/* Floating badge */}
              <div className="absolute -bottom-4 -right-4 glass-card px-4 py-3 max-w-xs">
                <div className="flex items-center gap-2 text-sm">
                  <MapPin className="w-4 h-4 text-electric-400 flex-shrink-0" />
                  <span className="text-slate-300">Vantaa, Finland</span>
                </div>
                <div className="flex items-center gap-2 text-sm mt-1">
                  <Globe className="w-4 h-4 text-teal-400 flex-shrink-0" />
                  <span className="text-slate-300">Novia UAS · University of Helsinki</span>
                </div>
              </div>
            </motion.div>

            {/* Story */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="h-px w-8 bg-gradient-to-r from-electric-500 to-teal-500" />
                <span className="text-xs font-medium text-electric-400 uppercase tracking-widest">My Story</span>
              </div>
              <h1 className="font-serif text-4xl font-bold text-white mb-6">
                Built on <span className="gradient-text">three continents</span>, grounded in evidence.
              </h1>
              <div className="space-y-4 text-slate-400 leading-relaxed">
                <p>
                  I started as an English teacher in Kenya, trained at Kenyatta University, convinced that language was the engine of development. That conviction carried me to Finland — first to Helsinki for an MA in English Philology, then to Turku for Educational Sciences — where I discovered that language instruction without a sound technological-pedagogical framework was mostly guesswork.
                </p>
                <p>
                  The doctoral research at the University of Helsinki followed naturally: a mixed-methods, comparative study examining how pre-service EFL teachers in Finland and Kenya develop TPACK — technological pedagogical content knowledge — to meet national curriculum digitalization goals. The two-article dissertation is due July 2026.
                </p>
                <p>
                  At Novia University of Applied Sciences, I serve as Project Manager and Instructor in the Maritime Technology RDI unit, where I lead three EU- and GIZ-funded projects: <strong className="text-slate-300">iMASTER</strong> (AI-enhanced maritime simulator training), <strong className="text-slate-300">DigiMar</strong> (digital maritime competence frameworks), and <strong className="text-slate-300">IMPACT for Kenya TVET</strong> (capacity building for maritime education in Kenya). The work has brought simulator-based training, STCW requirements, and SMCP communication into productive contact with instructional design questions I have been working on in EFL contexts.
                </p>
                <p>
                  From August 2026, I begin an MSc in Maritime Digital Solutions at TalTech, Estonia — connecting maritime operations, data analytics, IoT, and AI to the pedagogical work already underway.
                </p>
              </div>

              <div className="flex flex-wrap gap-4 mt-8">
                <a href="/resume" className="btn-primary text-sm">
                  <FileText className="w-4 h-4" />
                  See My Full Resume
                </a>
                <Link href="/contact" className="btn-secondary text-sm">
                  <Mail className="w-4 h-4" />
                  Get in Touch
                </Link>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Fun Facts — flip cards */}
        <section className="py-16 bg-navy-800/30">
          <div className="section-container">
            <h2 className="section-heading text-center mb-4">A Few Things Worth Knowing</h2>
            <p className="text-slate-400 text-center mb-12">Hover or tap each card to flip it.</p>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-5">
              {funFacts.map((fact, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  className="h-32 cursor-pointer"
                  style={{ perspective: 800 }}
                  onClick={() => setFlipped(flipped === i ? null : i)}
                  onMouseEnter={() => setFlipped(i)}
                  onMouseLeave={() => setFlipped(null)}
                >
                  <motion.div
                    className="relative w-full h-full"
                    animate={{ rotateY: flipped === i ? 180 : 0 }}
                    transition={{ duration: 0.5, type: 'spring', damping: 20 }}
                    style={{ transformStyle: 'preserve-3d' }}
                  >
                    {/* Front */}
                    <div className="absolute inset-0 glass-card flex items-center justify-center text-4xl backface-hidden rounded-2xl">
                      {fact.front}
                    </div>
                    {/* Back */}
                    <div
                      className="absolute inset-0 glass-card flex items-center justify-center p-4 text-sm text-slate-300 text-center rounded-2xl"
                      style={{ transform: 'rotateY(180deg)', backfaceVisibility: 'hidden' }}
                    >
                      {fact.back}
                    </div>
                  </motion.div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Professional Development Plans */}
        <section className="py-16">
          <div className="section-container">
            <div className="flex items-center gap-3 mb-4 justify-center">
              <div className="h-px w-8 bg-gradient-to-r from-electric-500 to-teal-500" />
              <span className="text-xs font-medium text-electric-400 uppercase tracking-widest">Next on the Horizon</span>
              <div className="h-px w-8 bg-gradient-to-l from-electric-500 to-teal-500" />
            </div>
            <h2 className="font-serif text-3xl font-bold text-white text-center mb-10">Professional Development Plans</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {/* PMI */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="glass-card p-6 border border-white/10 hover:border-electric-500/30 transition-colors"
                >
                  <div className="text-3xl mb-3">📋</div>
                  <h3 className="font-serif font-semibold text-white text-lg mb-2">
                    PMP Certification
                  </h3>
                  <p className="text-sm text-slate-400 leading-relaxed">
                    Pursuing the Project Management Professional (PMP) certification from PMI. With three active EU- and GIZ-funded maritime RDI projects running in parallel, formalising project management competence through the PMI framework is the natural next step — building on hands-on experience with Agile and Waterfall methodologies, stakeholder engagement, and cross-institutional coordination.
                  </p>
                </motion.div>

                {/* NetSuite ERP */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 }}
                  className="glass-card p-6 border border-white/10 hover:border-teal-500/30 transition-colors"
                >
                  <div className="text-3xl mb-3">⚙️</div>
                  <h3 className="font-serif font-semibold text-white text-lg mb-2">
                    ERP: Oracle NetSuite
                  </h3>
                  <p className="text-sm text-slate-400 leading-relaxed">
                    Holds a QuickBooks Online certification and bookkeeping qualifications — covering accounts payable/receivable, financial reporting, and payroll fundamentals. Now expanding into Oracle NetSuite ERP for project accounting and resource planning, bridging financial literacy with enterprise system fluency for research and consulting environments.
                  </p>
                </motion.div>

                {/* Maritime Data Analytics */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 }}
                  className="glass-card p-6 border border-white/10 hover:border-electric-500/30 transition-colors"
                >
                  <div className="text-3xl mb-3">🚢</div>
                  <h3 className="font-serif font-semibold text-white text-lg mb-2">
                    Maritime Data Analytics
                  </h3>
                  <p className="text-sm text-slate-400 leading-relaxed">
                    Learning Python to analyse maritime operational datasets — voyage data recorders, simulator performance logs, and training assessment records. The goal is to extract actionable pedagogical insights from data that already exists but has not yet been systematically mined for learning improvement purposes, directly feeding into the iMASTER and DigiMar research agenda.
                  </p>
                </motion.div>

                {/* Instructional Design */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 }}
                  className="glass-card p-6 border border-white/10 hover:border-teal-500/30 transition-colors"
                >
                  <div className="text-3xl mb-3">🎨</div>
                  <h3 className="font-serif font-semibold text-white text-lg mb-2">
                    Instructional Design
                  </h3>
                  <p className="text-sm text-slate-400 leading-relaxed">
                    Developing structured, evidence-based instructional design frameworks for higher education and professional training. Drawing on multimedia learning theory, UDL principles, and ADDIE methodology to create scalable learning solutions for both face-to-face and digital delivery — currently applied across maritime simulator training and EFL teacher education contexts.
                  </p>
                </motion.div>
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="py-16 bg-navy-800/30">
          <div className="section-container">
            <h2 className="section-heading text-center mb-12">What I Stand For</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {values.map((v, i) => (
                <motion.div
                  key={v.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  whileHover={{ y: -4 }}
                  className="glass-card p-6 text-center"
                >
                  <div className="text-3xl mb-3">{v.icon}</div>
                  <h3 className="font-serif font-semibold text-white mb-2">{v.title}</h3>
                  <p className="text-sm text-slate-400 leading-relaxed">{v.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
