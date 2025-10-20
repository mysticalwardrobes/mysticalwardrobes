"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import CollectionsSkeleton from "@/components/CollectionsSkeleton";

interface Collection {
  name: string;
  description: string;
  slug: string;
  image: string;
}

// Collection data from your CSV
const collections: Collection[] = [
  {
    name: "All Collections",
    slug: "all",
    description: "Explore our complete range of gowns across all collections. From modern glamour to fairytale fantasy, discover the perfect gown for your magical moment from our entire catalog.",
    image: "/assets/collections/all-collections.jpg"
  },
  {
    name: "Modern Glamour",
    slug: "modern-glamour",
    description: "Where elegance meets bold sophistication. Inspired by red-carpet icons and luxurious soirées, these gowns capture modern beauty, confidence, and shine. Ideal for fashion-forward events and evening galas.",
    image: "/assets/collections/modern-glamour.jpg"
  },
  {
    name: "Royal Historical Eras",
    slug: "royal-historical-eras",
    description: "A tribute to timeless grandeur and aristocratic charm. Inspired by the grand eras that shaped timeless couture—from the opulence of Rococo and Baroque courts to the refined grace of Victorian and Regency society.",
    image: "/assets/collections/royal-historical.jpg"
  },
  {
    name: "Fairytale Fantasy",
    slug: "fairytale-fantasy",
    description: "Where imagination and magic come alive. Romantic, whimsical, and full of wonder, these gowns bring stories to life—woven from dreams, enchantment, and pure fairytale.",
    image: "/assets/collections/fairytale-fantasy.jpg"
  },
  {
    name: "Nature Seasonal Realms",
    slug: "nature-seasonal-realms",
    description: "A reflection of nature's elegance and ever-changing beauty. From the frost of winter to the bloom of spring, this collection is inspired by the seasons' colors, moods, and harmony.",
    image: "/assets/collections/nature-seasonal.jpg"
  },
  {
    name: "Celestial Dreamlike",
    slug: "celestial-dreamlike",
    description: "For those who shine among the stars. Radiant and ethereal, these gowns are inspired by the cosmos—by moonlight, galaxies, and the divine heavens.",
    image: "/assets/collections/celestial-dreamlike.jpg"
  },
  {
    name: "Ocean Realm",
    slug: "ocean-realm",
    description: "Born from the depths of legend and the beauty of the sea. This collection embodies the mystery of sirens and the grace of ocean goddesses—where every gown mirrors the rhythm of the waves.",
    image: "/assets/collections/ocean-realm.jpg"
  },
  {
    name: "Cultural and Mythic Icons",
    slug: "cultural-and-mythic-icons",
    description: "These gowns pay homage to mythological figures, beloved characters, and cultural masterpieces. Each creation reimagines legends through fashion—blending tradition and fantasy into couture.",
    image: "/assets/collections/cultural-mythic.jpg"
  }
];

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
            const imageSrc = collection.image.startsWith('/assets/collections/') && 
              !collection.image.includes('Premium.png') 
              ? fallbackImages[index % fallbackImages.length]
              : collection.image;

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
                  <div className="relative aspect-[4/3] overflow-hidden">
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
