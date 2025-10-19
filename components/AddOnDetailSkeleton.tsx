"use client";

import { motion } from "framer-motion";

export default function AddOnDetailSkeleton() {
  return (
    <main className="bg-background py-10 text-secondary md:py-16">
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        {/* Breadcrumb Skeleton */}
        <nav className="mb-8">
          <div className="flex items-center space-x-2">
            <div className="h-4 w-16 animate-pulse rounded bg-secondary/20"></div>
            <div className="h-4 w-1 animate-pulse rounded bg-secondary/20"></div>
            <div className="h-4 w-20 animate-pulse rounded bg-secondary/20"></div>
            <div className="h-4 w-1 animate-pulse rounded bg-secondary/20"></div>
            <div className="h-4 w-24 animate-pulse rounded bg-secondary/20"></div>
          </div>
        </nav>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          {/* Image Gallery Skeleton */}
          <div className="space-y-4">
            {/* Main Image Skeleton */}
            <div className="relative aspect-[4/5] w-full overflow-hidden rounded-lg bg-secondary/10">
              <div className="absolute inset-0 animate-pulse bg-gradient-to-br from-secondary/10 to-secondary/20"></div>
            </div>
            
            {/* Thumbnail Images Skeleton */}
            <div className="grid grid-cols-4 gap-2">
              {Array.from({ length: 4 }).map((_, index) => (
                <div key={index} className="relative aspect-square overflow-hidden rounded bg-secondary/10">
                  <div className="absolute inset-0 animate-pulse bg-gradient-to-br from-secondary/10 to-secondary/20"></div>
                </div>
              ))}
            </div>
          </div>

          {/* Product Info Skeleton */}
          <div className="space-y-6">
            {/* Title and Category */}
            <div className="space-y-3">
              <div className="h-4 w-16 animate-pulse rounded-full bg-secondary/20"></div>
              <div className="h-8 w-3/4 animate-pulse rounded bg-secondary/20 sm:h-10"></div>
            </div>

            {/* Price */}
            <div className="space-y-2">
              <div className="h-6 w-32 animate-pulse rounded bg-secondary/20"></div>
              <div className="h-4 w-24 animate-pulse rounded bg-secondary/20"></div>
              <div className="h-6 w-28 animate-pulse rounded bg-secondary/20"></div>
            </div>

            {/* Description */}
            <div className="space-y-3">
              <div className="h-4 w-20 animate-pulse rounded bg-secondary/20"></div>
              <div className="space-y-2">
                <div className="h-4 w-full animate-pulse rounded bg-secondary/20"></div>
                <div className="h-4 w-full animate-pulse rounded bg-secondary/20"></div>
                <div className="h-4 w-3/4 animate-pulse rounded bg-secondary/20"></div>
              </div>
            </div>

            {/* Location Selector */}
            <div className="space-y-3">
              <div className="h-4 w-24 animate-pulse rounded bg-secondary/20"></div>
              <div className="grid grid-cols-3 gap-2">
                {Array.from({ length: 3 }).map((_, index) => (
                  <div key={index} className="h-10 w-full animate-pulse rounded border bg-secondary/10"></div>
                ))}
              </div>
            </div>

            {/* Features */}
            <div className="space-y-3">
              <div className="h-4 w-16 animate-pulse rounded bg-secondary/20"></div>
              <div className="space-y-2">
                {Array.from({ length: 4 }).map((_, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <div className="h-4 w-4 animate-pulse rounded bg-secondary/20"></div>
                    <div className="h-4 w-32 animate-pulse rounded bg-secondary/20"></div>
                  </div>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
              <div className="h-12 w-full animate-pulse rounded bg-secondary/20"></div>
              <div className="h-10 w-full animate-pulse rounded border bg-secondary/10"></div>
            </div>
          </div>
        </div>

        {/* Related Items Skeleton */}
        <section className="mt-16">
          <div className="mb-8 text-center">
            <div className="mx-auto mb-2 h-8 w-48 animate-pulse rounded bg-secondary/20"></div>
            <div className="mx-auto h-4 w-40 animate-pulse rounded bg-secondary/20"></div>
          </div>
          
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {Array.from({ length: 4 }).map((_, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="overflow-hidden rounded-sm bg-white shadow-md"
              >
                <div className="relative aspect-[4/5] overflow-hidden bg-secondary/10">
                  <div className="absolute inset-0 animate-pulse bg-gradient-to-br from-secondary/10 to-secondary/20"></div>
                </div>
                <div className="p-4">
                  <div className="mb-2 flex items-center justify-between">
                    <div className="h-4 w-16 animate-pulse rounded-full bg-secondary/20"></div>
                    <div className="h-4 w-20 animate-pulse rounded bg-secondary/20"></div>
                  </div>
                  <div className="mb-2 h-5 w-3/4 animate-pulse rounded bg-secondary/20"></div>
                  <div className="space-y-1">
                    <div className="h-3 w-full animate-pulse rounded bg-secondary/20"></div>
                    <div className="h-3 w-2/3 animate-pulse rounded bg-secondary/20"></div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
