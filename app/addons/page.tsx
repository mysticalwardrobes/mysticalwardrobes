"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { AddOn } from "@/app/api/addons/model";
import AddOnsSkeleton from "@/components/AddOnsSkeleton";
import hoodThumbnail from "@/public/assets/addons/hoods.jpg";
import glovesThumbnail from "@/public/assets/addons/gloves.png";
import fanThumbnail from "@/public/assets/addons/fans.jpg";
import maskThumbnail from "@/public/assets/addons/masks.jpg";
import necklaceThumbnail from "@/public/assets/addons/necklaces.jpg";
import umbrellaThumbnail from "@/public/assets/addons/umbrellas.jpg";
import crownThumbnail from "@/public/assets/addons/crowns.jpg";

interface AddOnCategory {
  type: string;
  count: number;
  image: string;
  description: string;
}

const addOnCategories: AddOnCategory[] = [
  {
    type: "crown",
    count: 0,
    image: crownThumbnail.src,
    description: "Regal and enchanting crowns for your magical moments"
  },
  {
    type: "hood",
    count: 0,
    image: hoodThumbnail.src, 
    description: "Dramatic hoods with elegant details and flowing fabrics"
  },
  {
    type: "petticoat",
    count: 0,
    image: "/assets/addons/petticoats.jpg",
    description: "Perfect petticoats to create the ideal silhouette"
  },
  {
    type: "gloves",
    count: 0,
    image: glovesThumbnail.src,
    description: "Elegant gloves to complete your sophisticated look"
  },
  {
    type: "fan",
    count: 0,
    image: fanThumbnail.src,
    description: "Beautiful fans for a touch of vintage elegance"
  },
  {
    type: "mask",
    count: 0,
    image: maskThumbnail.src,
    description: "Mysterious masks for your masquerade moments"
  },
  {
    type: "necklace",
    count: 0,
    image: necklaceThumbnail.src,
    description: "Stunning necklaces to add sparkle to your ensemble"
  },
  {
    type: "umbrella",
    count: 0,
    image: umbrellaThumbnail.src,
    description: "Elegant umbrellas for a romantic and dreamy touch"
  }
];

export default function AddOnsPage() {
  const [addOns, setAddOns] = useState<AddOn[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAddOns = async () => {
      try {
        const response = await fetch('/api/addons');
        if (!response.ok) {
          throw new Error('Failed to fetch add-ons');
        }
        const data = await response.json();
        setAddOns(data.items || []);
        
        // Update category counts
        addOnCategories.forEach(category => {
          category.count = (data.items || []).filter((addon: AddOn) => addon.type === category.type).length;
        });
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load add-ons');
      } finally {
        setLoading(false);
      }
    };

    fetchAddOns();
  }, []);

  if (loading) {
    return <AddOnsSkeleton />;
  }

  if (error) {
    return (
      <main className="bg-background py-10 text-secondary md:py-16">
        <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
          <div className="text-center py-20">
            <p className="font-manrope text-lg text-secondary/70">{error}</p>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="bg-background py-10 text-secondary md:py-16">
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        {/* Header */}
        <header className="mb-12 text-center">
          <p className="font-manrope text-xs uppercase tracking-[0.4em] text-secondary/70">Accessories</p>
          <h1 className="font-vegawanty text-4xl text-foreground sm:text-5xl md:text-6xl">Add Ons</h1>
          <p className="mx-auto mt-4 max-w-2xl font-manrope text-sm text-secondary sm:text-base">
            Complete your magical look with our enchanting accessories. From regal crowns to elegant gloves, 
            find the perfect pieces to elevate your fairytale moment.
          </p>
        </header>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {addOnCategories.map((category, index) => (
            <motion.div
              key={category.type}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Link 
                href={`/addons/${category.type}`}
                className="group block overflow-hidden rounded-sm bg-white shadow-md transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={category.image}
                    alt={`${category.type}s`}
                    fill
                    className="object-cover transition duration-500 group-hover:scale-105"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-br from-black/20 to-black/40"></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <h3 className="font-vegawanty text-xl capitalize text-white drop-shadow-lg">
                        {category.type}s
                      </h3>
                    </div>
                  </div>
                </div>
                <div className="p-4">
                  <div className="mb-2 flex items-center justify-between">
                    <h3 className="font-vegawanty text-lg capitalize text-foreground">
                      {category.type}s
                    </h3>
                    <span className="rounded-full bg-secondary/10 px-2 py-1 text-xs font-medium text-secondary">
                      {category.count} items
                    </span>
                  </div>
                  <p className="font-manrope text-sm text-secondary/70">
                    {category.description}
                  </p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Featured Add-Ons */}
        <section className="mt-16">
          <div className="mb-8 text-center">
            <h2 className="font-vegawanty text-3xl text-foreground sm:text-4xl">Featured Add-Ons</h2>
            <p className="mt-2 font-manrope text-sm text-secondary/70">
              Discover our most popular accessories
            </p>
          </div>
          
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {addOns.slice(0, 8).map((addon, index) => (
              <motion.div
                key={addon.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Link 
                  href={`/addons/${addon.type}/${addon.id}`}
                  className="group block overflow-hidden rounded-sm bg-white shadow-md transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
                >
                  <div className="relative aspect-[4/5] overflow-hidden bg-secondary/10">
                    {addon.pictures && addon.pictures.length > 0 ? (
                      <Image
                        src={'https:' + addon.pictures[0]}
                        alt={addon.name}
                        fill
                        className="object-cover transition duration-500 group-hover:scale-105"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center bg-secondary/10">
                        <div className="text-center">
                          <div className="mb-2 text-2xl font-manrope text-secondary/50">
                            No Image Available
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="p-4">
                    <div className="mb-2 flex items-center justify-between">
                      <span className="rounded-full bg-secondary/10 px-2 py-1 text-xs font-medium capitalize text-secondary">
                        {addon.type}
                      </span>
                      <span className="font-manrope text-sm font-semibold text-foreground">
                        From ₱{addon.metroManilaRate.toLocaleString()}
                      </span>
                    </div>
                    <h3 className="font-vegawanty text-lg text-foreground group-hover:text-secondary transition-colors">
                      {addon.name}
                    </h3>
                    <p className="mt-1 font-manrope text-sm text-secondary/70 line-clamp-2">
                      {addon.description}
                    </p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
