'use client';
import { Trash2 } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function DeletePostButton({ postId }: { postId: string }) {
  const router = useRouter();
  const handleDelete = async () => {
    if (!confirm('Delete this post? This cannot be undone.')) return;
    await fetch(`/api/blog/${postId}`, { method: 'DELETE' });
    router.refresh();
  };
  return (
    <button onClick={handleDelete} className="p-1.5 rounded text-slate-400 hover:text-red-400 hover:bg-red-500/10 transition-all">
      <Trash2 className="w-4 h-4" />
    </button>
  );
}
