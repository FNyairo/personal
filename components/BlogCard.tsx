'use client';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Clock, ArrowRight } from 'lucide-react';
import { formatDate } from '@/lib/utils';

type Post = {
  id: string; title: string; slug: string;
  excerpt: string; coverImage: string; tags: string[];
  readingTime: number; createdAt: Date | string;
};

export default function BlogCard({ post, index = 0 }: { post: Post; index?: number }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -4 }}
      className="glass-card overflow-hidden group"
    >
      <Link href={`/blog/${post.slug}`}>
        <div className="relative h-48 overflow-hidden">
          <Image
            src={post.coverImage}
            alt={post.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-navy-900/80 to-transparent" />
          <div className="absolute bottom-3 left-3 flex flex-wrap gap-1.5">
            {post.tags.slice(0, 2).map((tag) => (
              <span key={tag} className="tag-pill text-xs">{tag}</span>
            ))}
          </div>
        </div>
        <div className="p-5">
          <div className="flex items-center gap-3 text-xs text-slate-500 mb-3">
            <Clock className="w-3.5 h-3.5" />
            <span>{post.readingTime} min read</span>
            <span>·</span>
            <span>{formatDate(post.createdAt)}</span>
          </div>
          <h3 className="font-serif text-lg font-semibold text-white mb-2 line-clamp-2 group-hover:text-electric-400 transition-colors">
            {post.title}
          </h3>
          <p className="text-sm text-slate-400 line-clamp-3 mb-4">{post.excerpt}</p>
          <div className="flex items-center gap-1.5 text-electric-400 text-sm font-medium">
            Read more <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </div>
        </div>
      </Link>
    </motion.article>
  );
}
