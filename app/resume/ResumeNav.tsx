'use client';
import { useEffect, useState } from 'react';

const sections = [
  { id: 'profile',      label: 'Profile' },
  { id: 'education',    label: 'Education' },
  { id: 'experience',   label: 'Employment' },
  { id: 'skills',       label: 'Skills' },
  { id: 'publications', label: 'Publications' },
  { id: 'memberships',  label: 'Memberships' },
];

export default function ResumeNav() {
  const [active, setActive] = useState('profile');

  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    sections.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (!el) return;

      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActive(id); },
        { rootMargin: '-40% 0px -55% 0px' }
      );
      obs.observe(el);
      observers.push(obs);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    const offset = 120; // account for sticky nav + tab bar
    const top = el.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top, behavior: 'smooth' });
  };

  return (
    <div className="sticky top-16 z-30 -mx-4 px-4 py-2 bg-navy-900/90 backdrop-blur-lg border-b border-white/10 mb-10">
      <div className="flex gap-1 overflow-x-auto scrollbar-hide">
        {sections.map(({ id, label }) => (
          <button
            key={id}
            onClick={() => scrollTo(id)}
            className={`flex-shrink-0 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              active === id
                ? 'bg-electric-500/20 text-electric-400 border border-electric-500/30'
                : 'text-slate-400 hover:text-white hover:bg-white/5'
            }`}
          >
            {label}
          </button>
        ))}
      </div>
    </div>
  );
}
