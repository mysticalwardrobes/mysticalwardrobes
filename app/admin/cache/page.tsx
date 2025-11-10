'use client';

import { useEffect, useState } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';

interface CacheItem {
  key: string;
  exists: boolean;
  ttl: number | null;
  expiresIn: string | null;
}

export default function CacheManagementPage() {
  const [cacheStatus, setCacheStatus] = useState<CacheItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const fetchCacheStatus = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/admin/cache');
      if (response.ok) {
        const data = await response.json();
        setCacheStatus(data.cacheStatus || []);
      }
    } catch (error) {
      console.error('Error fetching cache status:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCacheStatus();
  }, []);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    setMessage(null);
    try {
      const response = await fetch('/api/admin/cache', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({}),
      });

      if (response.ok) {
        setMessage({ type: 'success', text: 'Cache refresh initiated successfully' });
        // Refresh the status after a delay
        setTimeout(() => {
          fetchCacheStatus();
        }, 2000);
      } else {
        setMessage({ type: 'error', text: 'Failed to refresh cache' });
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'An error occurred while refreshing cache' });
    } finally {
      setIsRefreshing(false);
      setTimeout(() => setMessage(null), 5000);
    }
  };

  const handleClearCache = async (key: string) => {
    try {
      const response = await fetch('/api/admin/cache', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ keys: [key] }),
      });

      if (response.ok) {
        setMessage({ type: 'success', text: `Cache cleared for ${key}` });
        fetchCacheStatus();
      } else {
        setMessage({ type: 'error', text: `Failed to clear cache for ${key}` });
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'An error occurred while clearing cache' });
    }
    setTimeout(() => setMessage(null), 3000);
  };

  if (isLoading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-64">
          <div className="text-lg font-manrope text-gray-600">Loading cache status...</div>
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
              Cache Management
            </h2>
            <p className="font-manrope text-gray-600 mt-1">
              Monitor and manage Redis cache
            </p>
          </div>
          <button
            onClick={handleRefresh}
            disabled={isRefreshing}
            className="px-6 py-2 bg-primary text-foreground-darker font-manrope rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50 flex items-center gap-2"
          >
            <span>{isRefreshing ? '⏳' : '🔄'}</span>
            {isRefreshing ? 'Refreshing...' : 'Refresh All'}
          </button>
        </div>

        {/* Message */}
        {message && (
          <div
            className={`p-4 rounded-lg ${
              message.type === 'success'
                ? 'bg-green-50 text-green-700'
                : 'bg-red-50 text-red-700'
            }`}
          >
            <p className="font-manrope">{message.text}</p>
          </div>
        )}

        {/* Cache Status Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {cacheStatus.map((cache) => (
            <div key={cache.key} className="bg-white rounded-lg shadow p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="font-manrope font-medium text-foreground-darker text-lg">
                    {cache.key.split(':').pop()?.toUpperCase()}
                  </h3>
                  <p className="text-sm text-gray-500 font-mono">{cache.key}</p>
                </div>
                <span
                  className={`px-3 py-1 rounded-full text-sm font-manrope ${
                    cache.exists
                      ? 'bg-green-100 text-green-700'
                      : 'bg-red-100 text-red-700'
                  }`}
                >
                  {cache.exists ? 'Active' : 'Empty'}
                </span>
              </div>

              {cache.exists && (
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600 font-manrope">TTL:</span>
                    <span className="font-manrope font-medium">
                      {cache.ttl ? `${cache.ttl}s` : 'N/A'}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600 font-manrope">Expires in:</span>
                    <span className="font-manrope font-medium">
                      {cache.expiresIn || 'N/A'}
                    </span>
                  </div>
                </div>
              )}

              <button
                onClick={() => handleClearCache(cache.key)}
                disabled={!cache.exists}
                className="w-full px-4 py-2 bg-red-50 text-red-600 font-manrope rounded-lg hover:bg-red-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Clear Cache
              </button>
            </div>
          ))}
        </div>

        {/* Info Section */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h3 className="font-manrope font-medium text-blue-900 mb-2">
            ℹ️ Cache Information
          </h3>
          <ul className="space-y-2 text-sm font-manrope text-blue-800">
            <li>• Caches automatically refresh when they expire (24 hours TTL)</li>
            <li>• First request after expiry will be slower as it fetches from Contentful</li>
            <li>• Use "Refresh All" to manually update all caches with latest data</li>
            <li>• Clearing a cache will force it to refetch on next request</li>
          </ul>
        </div>
      </div>
    </AdminLayout>
  );
}

