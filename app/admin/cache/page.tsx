'use client';

import AdminLayout from '@/components/admin/AdminLayout';

export default function CacheManagementPage() {
  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h2 className="text-3xl font-vegawanty text-foreground-darker">
            Cache Management
          </h2>
          <p className="font-manrope text-gray-600 mt-1">
            System cache configuration
          </p>
        </div>

        {/* Info Card */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0">
              <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-blue-900 font-manrope mb-2">
                Redis Cache Removed
              </h3>
              <p className="text-blue-800 font-manrope mb-3">
                Cache management is no longer needed. The application now serves data directly from:
              </p>
              <ul className="list-disc list-inside space-y-1 text-blue-800 font-manrope">
                <li><strong>Contentful</strong> - for gowns, add-ons, reviews, and prom queens</li>
                <li><strong>Supabase</strong> - for analytics, voting, and configuration</li>
              </ul>
              <p className="text-blue-800 font-manrope mt-3">
                These services handle caching internally, providing better performance and real-time updates without the need for manual cache management.
              </p>
            </div>
          </div>
        </div>

        {/* Benefits Card */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-xl font-vegawanty text-foreground-darker mb-4">
            Benefits of Direct Data Access
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div>
                <h4 className="font-manrope font-semibold text-gray-900">Real-time Updates</h4>
                <p className="font-manrope text-sm text-gray-600">Changes in Contentful appear immediately</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div>
                <h4 className="font-manrope font-semibold text-gray-900">Simplified Architecture</h4>
                <p className="font-manrope text-sm text-gray-600">No Redis configuration or maintenance needed</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div>
                <h4 className="font-manrope font-semibold text-gray-900">Lower Costs</h4>
                <p className="font-manrope text-sm text-gray-600">No separate Redis/Upstash subscription required</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div>
                <h4 className="font-manrope font-semibold text-gray-900">Better Analytics</h4>
                <p className="font-manrope text-sm text-gray-600">All analytics data persisted in Supabase with full history</p>
              </div>
            </div>
          </div>
        </div>

        {/* Technical Details Card */}
        <div className="bg-gray-50 rounded-lg border border-gray-200 p-6">
          <h3 className="text-xl font-vegawanty text-foreground-darker mb-4">
            Technical Details
          </h3>
          <div className="space-y-3 font-manrope text-gray-700">
            <p>
              <strong>Previous:</strong> Redis was used to cache Contentful data and store analytics counters.
            </p>
            <p>
              <strong>Current:</strong> All analytics events are now stored in Supabase tables with full event history, allowing for detailed reporting and historical analysis.
            </p>
            <p className="text-sm text-gray-600 mt-4">
              If you need to add caching in the future, consider using Next.js built-in caching mechanisms or Vercel's edge caching.
            </p>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
