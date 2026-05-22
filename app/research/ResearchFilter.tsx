'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ProjectCard from '@/components/ProjectCard';

type Project = {
  id: string; title: string; slug: string; description: string;
  status: string; imageUrl: string; tags: string[];
  links?: { publication?: string; demo?: string; github?: string } | null;
};

const FILTERS = ['All', 'Current', 'Upcoming', 'Past', 'Collaboration'];

export default function ResearchFilter({ projects }: { projects: Project[] }) {
  const [active, setActive] = useState('All');

  const filtered = projects.filter((p) =>
    active === 'All' ? true : p.status.toLowerCase() === active.toLowerCase()
  );

  return (
    <>
      {/* Filter buttons */}
      <div className="flex flex-wrap gap-2 mb-8">
        {FILTERS.map((f) => (
          <button
            key={f}
            onClick={() => setActive(f)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              active === f
                ? 'bg-electric-500 text-white shadow-lg shadow-electric-500/25'
                : 'glass-card text-slate-400 hover:text-white hover:border-electric-500/30'
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      {/* Grid */}
      <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <AnimatePresence>
          {filtered.map((project, i) => (
            <motion.div
              key={project.id}
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
            >
              <ProjectCard project={project} index={i} />
            </motion.div>
          ))}
        </AnimatePresence>
        {filtered.length === 0 && (
          <div className="col-span-3 text-center py-16 text-slate-500">
            No projects in this category yet.
          </div>
        )}
      </motion.div>
    </>
  );
}
