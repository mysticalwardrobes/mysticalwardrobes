'use client';

import { ReactNode, useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import Image from 'next/image';

interface AdminLayoutProps {
  children: ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
      router.push('/admin/login');
      router.refresh();
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  const navItems = [
    { href: '/admin', label: 'Dashboard', icon: '📊'},
    { href: '/admin/voting', label: 'Voting Events', icon: '🗳️'},
    { href: '/admin/analytics', label: 'Analytics', icon: '📈' },
    { href: '/admin/cache', label: 'Cache Management', icon: '🔄'},
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <aside
        className={`${
          isSidebarOpen ? 'w-64' : 'w-20'
        } bg-white border-r border-gray-200 transition-all duration-300 flex flex-col`}
      >
        {/* Logo */}
        <div className="p-6 border-b border-gray-200">
          {isSidebarOpen ? (
            <Image
              src="/assets/Mystical-Wardrobes-Logo-02.svg"
              alt="Mystical Wardrobes"
              width={60}
              height={60}
              priority
            />
          ) : (
            <div className="text-2xl">✨</div>
          )}
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4">
          <ul className="space-y-2">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                      isActive
                        ? 'bg-primary text-foreground-darker'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    {isSidebarOpen && (
                      <span className="font-manrope font-medium">
                        {item.label}
                      </span>
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Sidebar Toggle & Logout */}
        <div className="p-4 border-t border-gray-200 space-y-2">
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors"
          >
            <span className="text-xl">{isSidebarOpen ? '◀' : '▶'}</span>
            {isSidebarOpen && (
              <span className="font-manrope font-medium">Collapse</span>
            )}
          </button>

          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-red-600 hover:bg-red-50 transition-colors"
          >
            {isSidebarOpen && (
              <span className="font-manrope font-medium">Logout</span>
            )}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        {/* Header */}
        <header className="bg-white border-b border-gray-200 px-8 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-vegawanty text-foreground-darker">
              Admin Dashboard
            </h1>
            <a
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-manrope text-primary hover:text-primary/80 flex items-center gap-2"
            >
              View Website ↗
            </a>
          </div>
        </header>

        {/* Page Content */}
        <div className="p-8">{children}</div>
      </main>
    </div>
  );
}

