'use client';

import { useEffect, useState } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import Link from 'next/link';

interface AnalyticsStats {
  todayViews: number;
  totalViews: number;
  popularGowns: Array<{ gownId: string; clicks: number }>;
  popularPages: Array<{ path: string; views: number }>;
  pageViewsByDate: Array<{ date: string; views: number }>;
}

interface CacheStatus {
  key: string;
  exists: boolean;
  ttl: number | null;
  expiresIn: string | null;
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<AnalyticsStats | null>(null);
  const [cacheStatus, setCacheStatus] = useState<CacheStatus[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch analytics stats
        const statsResponse = await fetch('/api/analytics/stats?days=7');
        if (statsResponse.ok) {
          const statsData = await statsResponse.json();
          setStats(statsData);
        }

        // Fetch cache status
        const cacheResponse = await fetch('/api/admin/cache');
        if (cacheResponse.ok) {
          const cacheData = await cacheResponse.json();
          setCacheStatus(cacheData.cacheStatus || []);
        }
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  if (isLoading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-64">
          <div className="text-lg font-manrope text-gray-600">Loading...</div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-8">
        {/* Welcome Section */}
        <div>
          <h2 className="text-3xl font-vegawanty text-foreground-darker mb-2">
            Welcome Back!
          </h2>
          <p className="font-manrope text-gray-600">
            Here's an overview of your website's performance
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Today's Views */}
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-manrope font-medium text-gray-600">
                Today's Views
              </h3>
              <span className="text-2xl">👀</span>
            </div>
            <p className="text-3xl font-bold text-foreground-darker">
              {stats?.todayViews || 0}
            </p>
          </div>

          {/* Total Views */}
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-manrope font-medium text-gray-600">
                Total Views
              </h3>
              <span className="text-2xl">📊</span>
            </div>
            <p className="text-3xl font-bold text-foreground-darker">
              {stats?.totalViews || 0}
            </p>
          </div>

          {/* Active Voting Events */}
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-manrope font-medium text-gray-600">
                Voting Events
              </h3>
              <span className="text-2xl">🗳️</span>
            </div>
            <p className="text-3xl font-bold text-foreground-darker">
              Active
            </p>
          </div>

          {/* Cache Status */}
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-manrope font-medium text-gray-600">
                Cache Status
              </h3>
              <span className="text-2xl">🔄</span>
            </div>
            <p className="text-3xl font-bold text-foreground-darker">
              {cacheStatus.filter((c) => c.exists).length}/{cacheStatus.length}
            </p>
            <p className="text-sm text-gray-500 mt-1">Active</p>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-xl font-vegawanty text-foreground-darker mb-4">
            Quick Actions
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Link
              href="/admin/voting"
              className="flex items-center gap-3 p-4 border border-gray-200 rounded-lg hover:border-primary hover:bg-primary/5 transition-colors"
            >
              <span className="text-2xl">🗳️</span>
              <div>
                <p className="font-manrope font-medium text-foreground-darker">
                  Voting Events
                </p>
                <p className="text-sm text-gray-500">Manage collection voting</p>
              </div>
            </Link>

            <Link
              href="/admin/analytics"
              className="flex items-center gap-3 p-4 border border-gray-200 rounded-lg hover:border-primary hover:bg-primary/5 transition-colors"
            >
              <span className="text-2xl">📈</span>
              <div>
                <p className="font-manrope font-medium text-foreground-darker">
                  View Analytics
                </p>
                <p className="text-sm text-gray-500">Detailed insights</p>
              </div>
            </Link>

            <Link
              href="/admin/cache"
              className="flex items-center gap-3 p-4 border border-gray-200 rounded-lg hover:border-primary hover:bg-primary/5 transition-colors"
            >
              <span className="text-2xl">🔄</span>
              <div>
                <p className="font-manrope font-medium text-foreground-darker">
                  Cache Management
                </p>
                <p className="text-sm text-gray-500">Refresh data</p>
              </div>
            </Link>
          </div>
        </div>

        {/* Top Gowns */}
        {stats && stats.popularGowns && stats.popularGowns.length > 0 && (
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-xl font-vegawanty text-foreground-darker mb-4">
              Top Gowns (by clicks)
            </h3>
            <div className="space-y-3">
              {stats.popularGowns.slice(0, 5).map((gown, index) => (
                <div
                  key={gown.gownId}
                  className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-lg font-bold text-gray-400">
                      #{index + 1}
                    </span>
                    <span className="font-manrope text-foreground-darker">
                      {gown.gownId}
                    </span>
                  </div>
                  <span className="font-manrope font-medium text-primary">
                    {gown.clicks} clicks
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Top Pages */}
        {stats && stats.popularPages && stats.popularPages.length > 0 && (
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-xl font-vegawanty text-foreground-darker mb-4">
              Top Pages (by views)
            </h3>
            <div className="space-y-3">
              {stats.popularPages.slice(0, 5).map((page, index) => (
                <div
                  key={page.path}
                  className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-lg font-bold text-gray-400">
                      #{index + 1}
                    </span>
                    <span className="font-manrope text-foreground-darker">
                      {page.path}
                    </span>
                  </div>
                  <span className="font-manrope font-medium text-primary">
                    {page.views} views
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}

