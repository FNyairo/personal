'use client';
import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowDown, ExternalLink, FileText } from 'lucide-react';

const TITLES = [
  'Project Manager, Novia University of Applied Sciences',
  'Doctoral Researcher, University of Helsinki',
  'Maritime English Instructor',
  'Instructional Designer',
  'Teacher Education Researcher (EdTech)',
];

type TickerPhase = 'typing' | 'glowing' | 'fading';

const GLOW_DIM  = '0 0 6px rgba(147,197,253,0.4)';
const GLOW_FULL = '0 0 8px rgba(147,197,253,1), 0 0 24px rgba(147,197,253,0.8), 0 0 48px rgba(96,165,250,0.5)';

function FadingTicker() {
  const [display, setDisplay]     = useState('');
  const [opacity, setOpacity]     = useState(1);
  const [glow, setGlow]           = useState(GLOW_DIM);
  const [phraseIdx, setPhraseIdx] = useState(0);
  const [charIdx, setCharIdx]     = useState(0);
  const [phase, setPhase]         = useState<TickerPhase>('typing');

  useEffect(() => {
    const phrase = TITLES[phraseIdx];

    if (phase === 'typing') {
      if (charIdx < phrase.length) {
        const t = setTimeout(() => {
          setDisplay(phrase.slice(0, charIdx + 1));
          setCharIdx((c) => c + 1);
        }, 45);
        return () => clearTimeout(t);
      } else {
        // Finished typing — pause briefly then start glowing
        const t = setTimeout(() => {
          setGlow(GLOW_FULL);
          setPhase('glowing');
        }, 1800);
        return () => clearTimeout(t);
      }
    }

    if (phase === 'glowing') {
      // Let the glow build for 600ms, then dissolve
      const t = setTimeout(() => {
        setOpacity(0);
        setPhase('fading');
      }, 600);
      return () => clearTimeout(t);
    }

    if (phase === 'fading') {
      // Wait for fade-out transition (700ms) then reset
      const t = setTimeout(() => {
        setDisplay('');
        setOpacity(1);
        setGlow(GLOW_DIM);
        setCharIdx(0);
        setPhraseIdx((i) => (i + 1) % TITLES.length);
        setPhase('typing');
      }, 700);
      return () => clearTimeout(t);
    }
  }, [phase, charIdx, phraseIdx]);

  const transition =
    phase === 'glowing' ? 'text-shadow 0.6s ease-in' :
    phase === 'fading'  ? 'opacity 0.7s ease-out, text-shadow 0.7s ease-out' :
    'none';

  return (
    <span
      className="text-electric-300"
      style={{ opacity, textShadow: glow, transition }}
    >
      {display}
      {phase === 'typing' && (
        <span className="ml-0.5 inline-block w-0.5 h-5 bg-electric-400 align-middle animate-pulse" />
      )}
    </span>
  );
}

export default function Hero() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Particle canvas animation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animFrame: number;
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const PARTICLE_COUNT = 60;
    const particles = Array.from({ length: PARTICLE_COUNT }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      r: Math.random() * 2 + 0.5,
      opacity: Math.random() * 0.5 + 0.1,
    }));

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(59, 130, 246, ${p.opacity})`;
        ctx.fill();
      });

      // Draw connections
      particles.forEach((a, i) => {
        particles.slice(i + 1).forEach((b) => {
          const d = Math.hypot(a.x - b.x, a.y - b.y);
          if (d < 120) {
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.strokeStyle = `rgba(59, 130, 246, ${0.15 * (1 - d / 120)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        });
      });

      animFrame = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(animFrame);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Particle canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none will-change-transform" />

      {/* Hero background photo */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/images/hero-bg.jpg')" }}
      />
      {/* Gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-br from-navy-900/95 via-navy-800/85 to-navy-900/95" />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-electric-500/10 rounded-full blur-3xl animate-pulse-slow" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-teal-500/10 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '2s' }} />

      <div className="relative section-container pt-24 pb-16 z-10">
        <div className="max-w-4xl">
          {/* Eyebrow */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="flex items-center gap-3 mb-6"
          >
            <div className="h-px w-12 bg-gradient-to-r from-electric-500 to-teal-500" />
            <span className="text-sm font-medium text-electric-400 uppercase tracking-widest">
              Researcher · Educator · Innovator
            </span>
          </motion.div>

          {/* Name */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="font-serif text-5xl sm:text-7xl font-bold text-white mb-4 leading-tight"
          >
            Franklin{' '}
            <span className="gradient-text">Nyairo</span>
          </motion.h1>

          {/* Rotating tagline */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="font-serif text-xl sm:text-2xl text-slate-300 mb-6 h-8"
          >
            <FadingTicker />
          </motion.div>

          {/* Bio */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.55 }}
            className="text-slate-400 text-lg leading-relaxed max-w-2xl mb-10"
          >
            Project Manager &amp; Instructor at Novia University of Applied Sciences,
            leading maritime RDI projects that bridge simulator-based training with
            evidence-based instructional design. PhD Candidate at the University of Helsinki
            researching TPACK development in Finnish and Kenyan EFL teacher education.
            Based in Helsinki, Finland.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="flex flex-wrap gap-4"
          >
            <Link href="/resume" className="btn-primary">
              <FileText className="w-4 h-4" />
              See My Resume
            </Link>
            <Link href="/research" className="btn-secondary">
              Explore My Research
            </Link>
            <Link href="/book" className="btn-secondary">
              <ExternalLink className="w-4 h-4" />
              Book a Chat
            </Link>
          </motion.div>

          {/* Affiliation badges */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="flex flex-wrap gap-3 mt-10"
          >
            {[
              'Novia University of Applied Sciences',
              'University of Helsinki',
              'EATEL Member',
              'IMLA Member',
              'PMI Member',
            ].map((aff) => (
              <span key={aff} className="text-xs px-3 py-1.5 rounded-full border border-white/10 text-slate-400 bg-white/5 backdrop-blur-sm">
                {aff}
              </span>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-xs text-slate-500 uppercase tracking-widest">Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <ArrowDown className="w-4 h-4 text-slate-500" />
        </motion.div>
      </motion.div>
    </section>
  );
}
