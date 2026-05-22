'use client';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ExternalLink, ArrowUpRight } from 'lucide-react';

type Project = {
  id: string; title: string; slug: string; description: string;
  status: string; imageUrl: string; tags: string[];
  links?: { publication?: string; demo?: string; github?: string } | null;
};

const statusColor: Record<string, string> = {
  current: 'bg-teal-500/20 text-teal-400 border-teal-500/30',
  upcoming: 'bg-amber-500/20 text-amber-400 border-amber-500/30',
  past: 'bg-slate-500/20 text-slate-400 border-slate-500/30',
  collaboration: 'bg-electric-500/20 text-electric-400 border-electric-500/30',
};

export default function ProjectCard({ project, index = 0 }: { project: Project; index?: number }) {
  const links = project.links as Record<string, string> | null | undefined;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -6 }}
      className="glass-card overflow-hidden group will-change-transform"
    >
      {/* Image / Gradient placeholder */}
      <div className="relative h-52 overflow-hidden">
        {project.imageUrl ? (
          <Image src={project.imageUrl} alt={project.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-navy-800 via-navy-700 to-navy-900 group-hover:scale-105 transition-transform duration-500" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-navy-900/90 via-navy-900/30 to-transparent" />
        <div className="absolute top-3 right-3">
          <span className={`text-xs px-2.5 py-1 rounded-full border font-medium capitalize ${statusColor[project.status.toLowerCase()] ?? statusColor.past}`}>
            {project.status}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className="font-serif text-lg font-semibold text-white mb-2 group-hover:text-electric-400 transition-colors line-clamp-2">
          {project.title}
        </h3>
        <p className="text-sm text-slate-400 mb-4 line-clamp-3">{project.description}</p>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {project.tags.slice(0, 4).map((tag) => (
            <span key={tag} className="tag-pill">{tag}</span>
          ))}
        </div>

        {/* Links */}
        {links && Object.keys(links).length > 0 && (
          <div className="flex gap-3 pt-3 border-t border-white/10">
            {links.publication && (
              <a href={links.publication} target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-1 text-xs text-electric-400 hover:text-electric-300 transition-colors">
                <ExternalLink className="w-3.5 h-3.5" /> Publication
              </a>
            )}
            {links.demo && (
              <a href={links.demo} target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-1 text-xs text-teal-400 hover:text-teal-300 transition-colors">
                <ArrowUpRight className="w-3.5 h-3.5" /> Demo
              </a>
            )}
          </div>
        )}
      </div>
    </motion.div>
  );
}
