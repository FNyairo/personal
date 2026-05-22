export const dynamic = 'force-dynamic';

import { prisma } from '@/lib/prisma';
import Link from 'next/link';
import AdminLogout from './AdminLogout';
import VisitorMap from './VisitorMap';
import { FileText, MessageSquare, Mail, Users, Edit, Trash2 } from 'lucide-react';

export default async function AdminDashboard() {
  const [postCount, threadCount, msgCount, visitorCount, recentLogs, recentMessages, stats] = await Promise.all([
    prisma.post.count().catch(() => 0),
    prisma.discussionThread.count().catch(() => 0),
    prisma.contactMessage.count({ where: { read: false } }).catch(() => 0),
    prisma.visitorLog.count().catch(() => 0),
    prisma.visitorLog.findMany({ orderBy: { timestamp: 'desc' }, take: 10 }).catch(() => []),
    prisma.contactMessage.findMany({ orderBy: { createdAt: 'desc' }, take: 5 }).catch(() => []),
    prisma.stats.findMany().catch(() => []),
  ]);

  // Aggregate visitor countries for map
  const countryAgg = await prisma.visitorLog.groupBy({
    by: ['countryCode', 'country'],
    _count: true,
  }).catch(() => []);

  return (
    <div className="min-h-screen bg-navy-900 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="font-serif text-3xl font-bold text-white">Admin Dashboard</h1>
            <p className="text-slate-400 text-sm mt-1">Franklin Nyairo — Website Management</p>
          </div>
          <div className="flex gap-3">
            <Link href="/" className="btn-secondary text-sm">View Site</Link>
            <AdminLogout />
          </div>
        </div>

        {/* Stats cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { label: 'Blog Posts', value: postCount, icon: FileText, color: 'electric' },
            { label: 'Discussion Threads', value: threadCount, icon: MessageSquare, color: 'teal' },
            { label: 'Unread Messages', value: msgCount, icon: Mail, color: 'electric' },
            { label: 'Total Visitors', value: visitorCount, icon: Users, color: 'teal' },
          ].map(({ label, value, icon: Icon }) => (
            <div key={label} className="glass-card p-5">
              <div className="flex items-center gap-3 mb-2">
                <Icon className="w-5 h-5 text-electric-400" />
                <span className="text-sm text-slate-400">{label}</span>
              </div>
              <div className="font-serif text-3xl font-bold gradient-text">{value}</div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* Stats editor */}
          <div className="glass-card p-6">
            <h2 className="font-serif text-xl font-semibold text-white mb-4">Site Statistics</h2>
            <div className="space-y-3">
              {stats.map((s) => (
                <div key={s.id} className="flex items-center justify-between">
                  <span className="text-slate-300 text-sm">{s.label}</span>
                  <form action={`/api/stats`} method="POST" className="flex items-center gap-2">
                    <input type="hidden" name="id" value={s.id} />
                    <input type="number" name="value" defaultValue={s.value}
                      className="w-20 px-2 py-1 bg-navy-800 border border-white/10 rounded text-slate-200 text-sm" />
                    <button type="submit" className="text-xs text-electric-400 hover:text-electric-300 px-2 py-1 rounded bg-electric-500/10">
                      Save
                    </button>
                  </form>
                </div>
              ))}
            </div>
          </div>

          {/* Recent messages */}
          <div className="glass-card p-6">
            <h2 className="font-serif text-xl font-semibold text-white mb-4">Recent Messages</h2>
            {recentMessages.length === 0 ? (
              <p className="text-slate-500 text-sm">No messages yet.</p>
            ) : (
              <div className="space-y-3">
                {recentMessages.map((m) => (
                  <div key={m.id} className="border-b border-white/10 pb-3 last:border-0">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium text-white">{m.name}</span>
                      <span className="text-xs text-slate-500">{m.email}</span>
                    </div>
                    <p className="text-xs text-slate-400 line-clamp-2">{m.message}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Visitor map */}
        <div className="glass-card p-6 mb-6">
          <h2 className="font-serif text-xl font-semibold text-white mb-4">Visitor Map</h2>
          <VisitorMap data={countryAgg.map((c) => ({ countryCode: c.countryCode ?? '', country: c.country ?? '', count: c._count }))} />
        </div>

        {/* Recent visitor log */}
        <div className="glass-card p-6 mb-6">
          <h2 className="font-serif text-xl font-semibold text-white mb-4">Recent Visitors</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-slate-500 border-b border-white/10">
                  {['IP', 'Country', 'City', 'Page', 'Time'].map((h) => (
                    <th key={h} className="pb-3 pr-6 font-medium">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {recentLogs.map((log) => (
                  <tr key={log.id} className="text-slate-400">
                    <td className="py-2 pr-6 font-mono text-xs">{log.ipAddress}</td>
                    <td className="py-2 pr-6">{log.country ?? '–'}</td>
                    <td className="py-2 pr-6">{log.city ?? '–'}</td>
                    <td className="py-2 pr-6 text-electric-400 truncate max-w-[160px]">{log.pageVisited}</td>
                    <td className="py-2 text-xs">{new Date(log.timestamp).toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Blog management */}
        <div className="glass-card p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-serif text-xl font-semibold text-white">Blog Posts</h2>
            <Link href="/admin/blog/new" className="btn-primary text-sm py-2">New Post</Link>
          </div>
          <Link href="/admin/blog" className="text-sm text-electric-400 hover:text-electric-300">
            Manage all posts →
          </Link>
        </div>
      </div>
    </div>
  );
}
