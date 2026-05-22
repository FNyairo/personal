'use client';
import { useRouter } from 'next/navigation';
import { LogOut } from 'lucide-react';

export default function AdminLogout() {
  const router = useRouter();
  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    router.push('/admin/login');
  };
  return (
    <button onClick={handleLogout} className="btn-secondary text-sm flex items-center gap-2">
      <LogOut className="w-4 h-4" /> Logout
    </button>
  );
}
