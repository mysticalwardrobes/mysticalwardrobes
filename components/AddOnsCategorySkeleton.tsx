"use client";

import { motion } from "framer-motion";

export default function AddOnsCategorySkeleton() {
  return (
    <main className="bg-background py-10 text-secondary md:py-16">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-10 px-5 sm:px-6 lg:flex-row lg:px-8">
        {/* Sidebar Skeleton */}
        <aside className="hidden w-full max-w-xs shrink-0 lg:block">
          <div className="bg-white p-6">
            <div className="mb-6">
              <div className="h-6 w-16 animate-pulse rounded bg-secondary/20"></div>
            </div>
            <div className="space-y-6">
              {/* Price Filter Skeleton */}
              <section className="space-y-4 border-b border-secondary/20 pb-6">
                <div className="flex items-center justify-between">
                  <div className="h-4 w-12 animate-pulse rounded bg-secondary/20"></div>
                  <div className="h-3 w-6 animate-pulse rounded bg-secondary/20"></div>
                </div>
                <div className="space-y-4">
                  <div className="space-y-3">
                    <div className="h-2 w-full animate-pulse rounded bg-secondary/20"></div>
                    <div className="h-2 w-full animate-pulse rounded bg-secondary/20"></div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="h-8 w-full animate-pulse rounded bg-secondary/20"></div>
                    <div className="h-3 w-4 animate-pulse rounded bg-secondary/20"></div>
                    <div className="h-8 w-full animate-pulse rounded bg-secondary/20"></div>
                  </div>
                </div>
              </section>

              {/* Category Filter Skeleton */}
              <section className="space-y-3 border-b border-secondary/20 pb-6">
                <div className="h-4 w-16 animate-pulse rounded bg-secondary/20"></div>
                <div className="space-y-2">
                  {Array.from({ length: 9 }).map((_, index) => (
                    <div key={index} className="h-4 w-20 animate-pulse rounded bg-secondary/20"></div>
                  ))}
                </div>
              </section>
            </div>
          </div>
        </aside>

        <div className="flex-1 space-y-8">
          {/* Header Skeleton */}
          <header className="space-y-3 text-center lg:text-left">
            <div className="mx-auto h-3 w-16 animate-pulse rounded bg-secondary/20 lg:mx-0"></div>
            <div className="flex items-center justify-center gap-3 lg:justify-start">
              <div className="h-12 w-32 animate-pulse rounded bg-secondary/20 sm:h-16 sm:w-40"></div>
            </div>
            <div className="mx-auto h-4 w-full max-w-md animate-pulse rounded bg-secondary/20 lg:mx-0"></div>
          </header>

          {/* Controls Skeleton */}
          <div className="flex flex-col gap-4 bg-white/90 py-4 backdrop-blur sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center justify-between sm:justify-start sm:gap-12">
              <div className="h-4 w-32 animate-pulse rounded bg-secondary/20"></div>
              <div className="h-8 w-16 animate-pulse rounded-full bg-secondary/20 lg:hidden"></div>
            </div>
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="h-4 w-12 animate-pulse rounded bg-secondary/20"></div>
              <div className="h-8 w-40 animate-pulse rounded bg-secondary/20"></div>
            </div>
          </div>

          {/* Products Grid Skeleton */}
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:gap-8">
            {Array.from({ length: 15 }).map((_, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                className="group flex h-full flex-col overflow-hidden bg-white transition hover:-translate-y-1"
              >
                {/* Image Skeleton */}
                <div className="relative aspect-[4/5] w-full overflow-hidden bg-secondary/10">
                  <div className="absolute inset-0 animate-pulse bg-gradient-to-br from-secondary/10 to-secondary/20"></div>
                </div>
                
                {/* Content Skeleton */}
                <div className="flex flex-1 flex-col justify-between gap-0.5 px-1 py-2 md:gap-1 md:py-4">
                  <div className="h-5 w-3/4 animate-pulse rounded bg-secondary/20"></div>
                  <div className="space-y-1">
                    <div className="h-4 w-24 animate-pulse rounded bg-secondary/20"></div>
                    <div className="h-3 w-16 animate-pulse rounded bg-secondary/20"></div>
                  </div>
                  <div className="space-y-1">
                    <div className="h-3 w-full animate-pulse rounded bg-secondary/20"></div>
                    <div className="h-3 w-2/3 animate-pulse rounded bg-secondary/20"></div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Pagination Skeleton */}
          <div className="flex items-center justify-center gap-2 pt-8">
            <div className="h-8 w-20 animate-pulse rounded-full bg-secondary/20"></div>
            <div className="flex items-center gap-1">
              {Array.from({ length: 5 }).map((_, index) => (
                <div key={index} className="h-8 w-8 animate-pulse rounded-full bg-secondary/20"></div>
              ))}
            </div>
            <div className="h-8 w-16 animate-pulse rounded-full bg-secondary/20"></div>
          </div>
        </div>
      </div>
    </main>
  );
}
