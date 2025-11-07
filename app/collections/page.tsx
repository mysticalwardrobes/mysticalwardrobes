"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import CollectionsSkeleton from "@/components/CollectionsSkeleton";
import { collections } from "@/app/config/collections";

// Fallback images for collections that don't have specific images yet
const fallbackImages = [
  "/assets/sample_gown-1.jpg",
  "/assets/collections/Premium.png"
];


export default function CollectionsPage() {
  const [loading, setLoading] = useState(false);

  if (loading) {
    return (
      <main className="bg-background py-10 text-secondary md:py-16">
        <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
          {/* Header */}
          <header className="mb-12 text-center">
            <p className="font-manrope text-xs uppercase tracking-[0.4em] text-secondary/70">Collections</p>
            <h1 className="font-vegawanty text-4xl text-foreground sm:text-5xl md:text-6xl">Our Collections</h1>
            <p className="mx-auto mt-4 max-w-2xl font-manrope text-sm text-secondary sm:text-base">
              Discover our curated collections that blend fantasy and fashion, each piece crafted to inspire and enchant.
            </p>
          </header>

          <CollectionsSkeleton />
        </div>
      </main>
    );
  }

  return (
    <main className="bg-background py-10 text-secondary md:py-16">
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        {/* Header */}
        <header className="mb-12 text-center">
          <p className="font-manrope text-xs uppercase tracking-[0.4em] text-secondary/70">Collections</p>
          <h1 className="font-vegawanty text-4xl text-foreground sm:text-5xl md:text-6xl">Our Collections</h1>
          <p className="mx-auto mt-4 max-w-2xl font-manrope text-sm text-secondary sm:text-base">
            Discover our curated collections that blend fantasy and fashion, each piece crafted to inspire and enchant. 
            From modern glamour to fairytale fantasy, find the perfect gown for your magical moment.
          </p>
        </header>

        {/* Collections Grid */}
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {collections.map((collection, index) => {
            // Use fallback image if collection image doesn't exist
            const imageSrc = collection.image;

            return (
              <motion.div
                key={collection.slug}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Link 
                  href={`/collections/${collection.slug}`}
                  className="group flex flex-col h-full overflow-hidden rounded-sm bg-white shadow-md transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
                >
                  <div className="relative aspect-[2/3] overflow-hidden">
                    <Image
                      src={imageSrc}
                      alt={collection.name}
                      fill
                      className="object-cover transition duration-500 group-hover:scale-105"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-br from-black/20 to-black/40"></div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center">
                        <h3 className="font-vegawanty text-xl text-white drop-shadow-lg">
                          {collection.name}
                        </h3>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col flex-1 p-6">
                    <h3 className="font-vegawanty text-xl text-foreground mb-3 group-hover:text-secondary transition-colors">
                      {collection.name}
                    </h3>
                    <p className="font-manrope text-sm text-secondary/70 leading-relaxed flex-1">
                      {collection.description}
                    </p>
                    <div className="mt-4 flex items-center text-secondary group-hover:text-secondary/80 transition-colors">
                      <span className="font-manrope text-sm font-medium">Explore Collection</span>
                      <svg 
                        className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" 
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>

        {/* Call to Action */}
        <section className="mt-16 text-center">
          <div className="bg-gradient-to-r from-secondary/5 to-secondary/10 rounded-lg p-8">
            <h2 className="font-vegawanty text-3xl text-foreground mb-4">Can't Find What You're Looking For?</h2>
            <p className="font-manrope text-secondary/70 mb-6 max-w-2xl mx-auto">
              Our custom design service brings your vision to life. Let us create a one-of-a-kind gown 
              that perfectly captures your style and the magic of your special moment.
            </p>
            <Link 
              href="/contact"
              className="inline-flex items-center px-6 py-3 bg-secondary text-white font-manrope font-medium rounded-lg hover:bg-secondary/90 transition-colors"
            >
              Start Custom Design
              <svg className="ml-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}
