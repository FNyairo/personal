'use client';
import { useEffect, useRef, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { motion } from 'framer-motion';

type Stat = { key: string; value: number; label: string };

function CountUp({ target, inView }: { target: number; inView: boolean }) {
  const [count, setCount] = useState(0);
  const rafRef = useRef<number>();

  useEffect(() => {
    if (!inView) return;
    const duration = 2000;
    const start = performance.now();
    const animate = (now: number) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // cubic ease-out
      setCount(Math.round(eased * target));
      if (progress < 1) rafRef.current = requestAnimationFrame(animate);
    };
    rafRef.current = requestAnimationFrame(animate);
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current); };
  }, [inView, target]);

  return <>{count}</>;
}

const icons: Record<string, string> = {
  publications: '📄',
  projects: '🚀',
  talks: '🎤',
  citations: '🔗',
};

export default function StatsCounter({ stats }: { stats: Stat[] }) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.3 });

  return (
    <section ref={ref} className="py-20 relative">
      <div className="absolute inset-0 bg-gradient-to-r from-electric-500/5 to-teal-500/5" />
      <div className="section-container relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="section-heading">Research at a Glance</h2>
          <p className="text-slate-400 max-w-xl mx-auto">
            Numbers that reflect an ongoing commitment to evidence-based scholarship and international collaboration.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.key}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              whileHover={{ scale: 1.05, translateY: -4 }}
              className="glass-card p-6 text-center group cursor-default"
            >
              <div className="text-3xl mb-2">{icons[stat.key] ?? '📊'}</div>
              <div className="font-serif text-4xl font-bold gradient-text mb-1">
                <CountUp target={stat.value} inView={inView} />
                {stat.key === 'citations' ? '+' : ''}
              </div>
              <div className="text-sm text-slate-400">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
