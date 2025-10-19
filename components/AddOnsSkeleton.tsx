"use client";

import { motion } from "framer-motion";

export default function AddOnsSkeleton() {
  return (
    <main className="bg-background py-10 text-secondary md:py-16">
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        {/* Header Skeleton */}
        <header className="mb-12 text-center">
          <div className="mx-auto mb-2 h-3 w-24 animate-pulse rounded bg-secondary/20"></div>
          <div className="mx-auto mb-4 h-12 w-64 animate-pulse rounded bg-secondary/20 sm:h-16 sm:w-80 md:h-20 md:w-96"></div>
          <div className="mx-auto h-4 w-full max-w-2xl animate-pulse rounded bg-secondary/20 sm:h-5"></div>
          <div className="mx-auto mt-2 h-4 w-3/4 max-w-xl animate-pulse rounded bg-secondary/20 sm:h-5"></div>
        </header>

        {/* Categories Grid Skeleton */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {Array.from({ length: 8 }).map((_, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="overflow-hidden rounded-sm bg-white shadow-md"
            >
              {/* Image Skeleton */}
              <div className="relative aspect-[4/3] overflow-hidden bg-secondary/10">
                <div className="absolute inset-0 animate-pulse bg-gradient-to-br from-secondary/10 to-secondary/20"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="h-6 w-20 animate-pulse rounded bg-secondary/30"></div>
                </div>
              </div>
              
              {/* Content Skeleton */}
              <div className="p-4">
                <div className="mb-2 flex items-center justify-between">
                  <div className="h-5 w-16 animate-pulse rounded bg-secondary/20"></div>
                  <div className="h-5 w-12 animate-pulse rounded-full bg-secondary/20"></div>
                </div>
                <div className="space-y-1">
                  <div className="h-3 w-full animate-pulse rounded bg-secondary/20"></div>
                  <div className="h-3 w-3/4 animate-pulse rounded bg-secondary/20"></div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Featured Add-Ons Section Skeleton */}
        <section className="mt-16">
          <div className="mb-8 text-center">
            <div className="mx-auto mb-2 h-8 w-48 animate-pulse rounded bg-secondary/20 sm:h-10 sm:w-56"></div>
            <div className="mx-auto h-4 w-40 animate-pulse rounded bg-secondary/20"></div>
          </div>
          
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {Array.from({ length: 8 }).map((_, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="overflow-hidden rounded-sm bg-white shadow-md"
              >
                {/* Image Skeleton */}
                <div className="relative aspect-[4/5] overflow-hidden bg-secondary/10">
                  <div className="absolute inset-0 animate-pulse bg-gradient-to-br from-secondary/10 to-secondary/20"></div>
                </div>
                
                {/* Content Skeleton */}
                <div className="p-4">
                  <div className="mb-2 flex items-center justify-between">
                    <div className="h-5 w-16 animate-pulse rounded-full bg-secondary/20"></div>
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
