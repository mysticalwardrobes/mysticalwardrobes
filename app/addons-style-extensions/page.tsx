"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { AddOn } from "@/app/api/addons/model";
import AddOnsSkeleton from "@/components/AddOnsSkeleton";
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

const accessoryCategories: AddOnCategory[] = [
  {
    type: "crown",
    count: 0,
    image: crownThumbnail.src,
    description: "Regal and enchanting crowns for your magical moments"
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

export default function AccessoriesPage() {
  const [categories, setCategories] = useState<AddOnCategory[]>(accessoryCategories);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAddOns = async () => {
      try {
        setLoading(true);
        const response = await fetch("/api/addons");
        if (response.ok) {
          const data = await response.json();
          const addOns: AddOn[] = data;

          // Count items per category (only accessories)
          const counts = new Map<string, number>();
          addOns.forEach((addOn) => {
            if (["crown", "gloves", "fan", "mask", "necklace", "umbrella"].includes(addOn.type)) {
              counts.set(addOn.type, (counts.get(addOn.type) || 0) + 1);
            }
          });

          setCategories(
            accessoryCategories.map((cat) => ({
              ...cat,
              count: counts.get(cat.type) || 0,
            }))
          );
        }
      } catch (error) {
        console.error("Error fetching accessories:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAddOns();
  }, []);

  if (loading) {
    return (
      <main className="bg-background py-10 text-secondary md:py-16">
        <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
          <header className="mb-12 text-center">
            <p className="font-manrope text-xs uppercase tracking-[0.4em] text-secondary/70">Enhance Your Look</p>
            <h1 className="font-vegawanty text-4xl text-foreground sm:text-5xl md:text-6xl">Add Ons</h1>
            <p className="mx-auto mt-4 max-w-2xl font-manrope text-sm text-secondary sm:text-base">
              Complete your magical look with our curated collection of elegant accessories.
            </p>
          </header>
          <AddOnsSkeleton />
        </div>
      </main>
    );
  }

  return (
    <main className="bg-background py-10 text-secondary md:py-16">
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        <header className="mb-12 text-center">
          <p className="font-manrope text-xs uppercase tracking-[0.4em] text-secondary/70">Enhance Your Look</p>
          <h1 className="font-vegawanty text-4xl text-foreground sm:text-5xl md:text-6xl">Add Ons</h1>
          <p className="mx-auto mt-4 max-w-2xl font-manrope text-sm text-secondary sm:text-base">
            Complete your magical look with our curated collection of elegant accessories. From regal crowns to vintage fans, find the perfect finishing touches for your enchanted ensemble.
          </p>
        </header>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((category, index) => (
            <Link
              key={category.type}
              href={`/addons/${category.type}`}
              className="group relative overflow-hidden rounded bg-white shadow-md transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
              style={{
                animationDelay: `${index * 0.1}s`,
              }}
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src={category.image}
                  alt={category.type}
                  fill
                  className="object-cover transition duration-500 group-hover:scale-105"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-br from-black/20 to-black/40"></div>
              </div>
              <div className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-vegawanty text-2xl text-foreground capitalize group-hover:text-secondary transition-colors">
                    {category.type === "necklace" ? "Necklaces" : category.type + "s"}
                  </h3>
                  {category.count > 0 && (
                    <span className="text-sm font-manrope text-secondary/70">
                      {category.count} {category.count === 1 ? 'item' : 'items'}
                    </span>
                  )}
                </div>
                <p className="font-manrope text-sm text-secondary/70 mb-4">
                  {category.description}
                </p>
                <div className="flex items-center text-secondary group-hover:text-secondary/80 transition-colors">
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
          ))}
        </div>
      </div>
    </main>
  );
}

