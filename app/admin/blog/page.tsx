import { prisma } from '@/lib/prisma';
import Link from 'next/link';
import { formatDate } from '@/lib/utils';
import { Edit, Trash2, Plus, Eye, EyeOff } from 'lucide-react';
import DeletePostButton from './DeletePostButton';

export default async function AdminBlogPage() {
  const posts = await prisma.post.findMany({ orderBy: { createdAt: 'desc' } }).catch(() => []);

  return (
    <div className="min-h-screen bg-navy-900 p-6">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <Link href="/admin" className="text-sm text-slate-400 hover:text-electric-400 mb-2 block">← Dashboard</Link>
            <h1 className="font-serif text-3xl font-bold text-white">Blog Management</h1>
          </div>
          <Link href="/admin/blog/new" className="btn-primary">
            <Plus className="w-4 h-4" /> New Post
          </Link>
        </div>

        <div className="glass-card overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/10 text-left text-slate-500">
                <th className="px-5 py-4 font-medium">Title</th>
                <th className="px-5 py-4 font-medium">Status</th>
                <th className="px-5 py-4 font-medium">Date</th>
                <th className="px-5 py-4 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {posts.map((post) => (
                <tr key={post.id} className="hover:bg-white/2 transition-colors">
                  <td className="px-5 py-4">
                    <div className="font-medium text-white line-clamp-1">{post.title}</div>
                    <div className="text-xs text-slate-500 mt-0.5">/blog/{post.slug}</div>
                  </td>
                  <td className="px-5 py-4">
                    <span className={`inline-flex items-center gap-1.5 text-xs px-2 py-1 rounded-full border ${
                      post.published
                        ? 'bg-teal-500/20 text-teal-400 border-teal-500/30'
                        : 'bg-slate-500/20 text-slate-400 border-slate-500/30'
                    }`}>
                      {post.published ? <Eye className="w-3 h-3" /> : <EyeOff className="w-3 h-3" />}
                      {post.published ? 'Published' : 'Draft'}
                    </span>
                  </td>
                  <td className="px-5 py-4 text-slate-400">{formatDate(post.createdAt)}</td>
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-2">
                      <Link href={`/admin/blog/${post.id}/edit`} className="p-1.5 rounded text-slate-400 hover:text-electric-400 hover:bg-electric-500/10 transition-all">
                        <Edit className="w-4 h-4" />
                      </Link>
                      <DeletePostButton postId={post.id} />
                    </div>
                  </td>
                </tr>
              ))}
              {posts.length === 0 && (
                <tr>
                  <td colSpan={4} className="px-5 py-10 text-center text-slate-500">No posts yet.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
