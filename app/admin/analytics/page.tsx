'use client';

import { useEffect, useState } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';

interface AnalyticsStats {
  todayViews: number;
  totalViews: number;
  popularGowns: Array<{ gownId: string; clicks: number }>;
  popularPages: Array<{ path: string; views: number }>;
  pageViewsByDate: Array<{ date: string; views: number }>;
}

export default function AnalyticsPage() {
  const [stats, setStats] = useState<AnalyticsStats | null>(null);
  const [days, setDays] = useState(7);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(`/api/analytics/stats?days=${days}`);
        if (response.ok) {
          const data = await response.json();
          setStats(data);
        }
      } catch (error) {
        console.error('Error fetching analytics:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchStats();
  }, [days]);

  if (isLoading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-64">
          <div className="text-lg font-manrope text-gray-600">Loading analytics...</div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-vegawanty text-foreground-darker">
              Analytics Dashboard
            </h2>
            <p className="font-manrope text-gray-600 mt-1">
              Track website performance and user behavior
            </p>
          </div>
          <select
            value={days}
            onChange={(e) => setDays(Number(e.target.value))}
            className="px-4 py-2 border border-gray-300 rounded-lg font-manrope focus:ring-2 focus:ring-primary focus:border-transparent"
          >
            <option value={7}>Last 7 days</option>
            <option value={14}>Last 14 days</option>
            <option value={30}>Last 30 days</option>
          </select>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="font-manrope font-medium text-gray-600 mb-2">
              Total Page Views
            </h3>
            <p className="text-4xl font-bold text-foreground-darker">
              {stats?.totalViews || 0}
            </p>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="font-manrope font-medium text-gray-600 mb-2">
              Today's Views
            </h3>
            <p className="text-4xl font-bold text-foreground-darker">
              {stats?.todayViews || 0}
            </p>
          </div>
        </div>

        {/* Page Views Trend */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-xl font-vegawanty text-foreground-darker mb-4">
            Page Views Trend
          </h3>
          {stats && stats.pageViewsByDate && (
            <div className="space-y-2">
              {stats.pageViewsByDate.map((day) => (
                <div key={day.date} className="flex items-center gap-4">
                  <span className="font-manrope text-sm text-gray-600 w-24">
                    {new Date(day.date).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                    })}
                  </span>
                  <div className="flex-1 bg-gray-100 rounded-full h-8 relative">
                    <div
                      className="bg-primary h-8 rounded-full flex items-center justify-end pr-3"
                      style={{
                        width: `${Math.min(
                          (day.views / Math.max(...stats.pageViewsByDate.map((d) => d.views), 1)) * 100,
                          100
                        )}%`,
                      }}
                    >
                      <span className="font-manrope text-sm text-foreground-darker font-medium">
                        {day.views}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Top Gowns */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-xl font-vegawanty text-foreground-darker mb-4">
            Most Clicked Gowns
          </h3>
          {stats && stats.popularGowns && stats.popularGowns.length > 0 ? (
            <div className="space-y-3">
              {stats.popularGowns.map((gown, index) => (
                <div
                  key={gown.gownId}
                  className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-xl font-bold text-gray-400">
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
          ) : (
            <p className="text-gray-500 font-manrope">No gown click data yet</p>
          )}
        </div>

        {/* Top Pages */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-xl font-vegawanty text-foreground-darker mb-4">
            Most Viewed Pages
          </h3>
          {stats && stats.popularPages && stats.popularPages.length > 0 ? (
            <div className="space-y-3">
              {stats.popularPages.map((page, index) => (
                <div
                  key={page.path}
                  className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-xl font-bold text-gray-400">
                      #{index + 1}
                    </span>
                    <span className="font-manrope text-foreground-darker text-sm">
                      {page.path}
                    </span>
                  </div>
                  <span className="font-manrope font-medium text-primary">
                    {page.views} views
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 font-manrope">No page view data yet</p>
          )}
        </div>
      </div>
    </AdminLayout>
  );
}

