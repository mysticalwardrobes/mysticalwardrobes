"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
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
  section: 'style-extensions' | 'add-ons';
}

const styleExtensionCategories: AddOnCategory[] = [
  {
    type: "hood",
    count: 0,
    image: hoodThumbnail.src,
    description: "Dramatic hoods with elegant details and flowing fabrics",
    section: 'style-extensions'
  }
];

const addOnCategories: AddOnCategory[] = [
  {
    type: "petticoat",
    count: 0,
    image: "/assets/addons/petticoats.jpg",
    description: "Perfect petticoats to create the ideal silhouette",
    section: 'add-ons'
  },
  {
    type: "crown",
    count: 0,
    image: crownThumbnail.src,
    description: "Regal and enchanting crowns for your magical moments",
    section: 'add-ons'
  },
  {
    type: "gloves",
    count: 0,
    image: glovesThumbnail.src,
    description: "Elegant gloves to complete your sophisticated look",
    section: 'add-ons'
  },
  {
    type: "fan",
    count: 0,
    image: fanThumbnail.src,
    description: "Beautiful fans for a touch of vintage elegance",
    section: 'add-ons'
  },
  {
    type: "mask",
    count: 0,
    image: maskThumbnail.src,
    description: "Mysterious masks for your masquerade moments",
    section: 'add-ons'
  },
  {
    type: "necklace",
    count: 0,
    image: necklaceThumbnail.src,
    description: "Stunning necklaces to add sparkle to your ensemble",
    section: 'add-ons'
  },
  {
    type: "umbrella",
    count: 0,
    image: umbrellaThumbnail.src,
    description: "Elegant umbrellas for a romantic and dreamy touch",
    section: 'add-ons'
  }
];

const allCategories = [...styleExtensionCategories, ...addOnCategories];

export default function AddOnsPage() {
  const [addOns, setAddOns] = useState<AddOn[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [styleExtensions, setStyleExtensions] = useState<AddOnCategory[]>(styleExtensionCategories);
  const [accessories, setAccessories] = useState<AddOnCategory[]>(addOnCategories);

  useEffect(() => {
    const fetchAddOns = async () => {
      try {
        const response = await fetch('/api/addons');
        if (!response.ok) {
          throw new Error('Failed to fetch add-ons');
        }
        const data = await response.json();
        setAddOns(data.items || []);
        
        // Update category counts for style extensions
        setStyleExtensions(
          styleExtensionCategories.map(category => ({
            ...category,
            count: (data.items || []).filter((addon: AddOn) => addon.type === category.type).length
          }))
        );

        // Update category counts for add-ons
        setAccessories(
          addOnCategories.map(category => ({
            ...category,
            count: (data.items || []).filter((addon: AddOn) => addon.type === category.type).length
          }))
        );
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
          <div className="text-center py-20 animate-fade-in-up">
            <p className="font-manrope text-lg text-secondary/70">{error}</p>
            <button 
              onClick={() => window.location.reload()}
              className="mt-4 px-6 py-2 bg-secondary text-white rounded-full hover:bg-secondary/90 transition-all duration-200 hover:scale-105"
            >
              Try Again
            </button>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="bg-background py-10 text-secondary md:py-16">
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        {/* Header */}
        <header className="mb-12 text-center animate-fade-in-up">
          <p className="font-manrope text-xs uppercase tracking-[0.4em] text-secondary/70">Enhance Your Look</p>
          <h1 className="font-vegawanty text-4xl text-foreground sm:text-5xl md:text-6xl">Style Extensions & Add Ons</h1>
          <p className="mx-auto mt-4 max-w-2xl font-manrope text-sm text-secondary sm:text-base">
            Complete your magical look with our enchanting style extensions and accessories. From dramatic hoods to elegant gloves, 
            find the perfect pieces to elevate your fairytale moment.
          </p>
        </header>

        {/* Style Extensions Section */}
        <section className="mb-16">
          <div className="mb-8 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
            <h2 className="font-vegawanty text-3xl text-foreground sm:text-4xl mb-2">Style Extensions</h2>
            <p className="font-manrope text-sm text-secondary/70">
              Transform your gown with dramatic enhancements
            </p>
          </div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {styleExtensions.map((category, index) => (
              <div
                key={category.type}
                className="animate-fade-in-up"
                style={{ animationDelay: `${0.2 + index * 0.1}s` }}
              >
                <Link 
                  href={`/addons/${category.type}`}
                  className="group block overflow-hidden rounded-sm bg-white shadow-md transition-all duration-300 hover:shadow-xl hover:-translate-y-2 hover:scale-105"
                >
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <Image
                      src={category.image}
                      alt={`${category.type}s`}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-br from-black/20 to-black/40 transition-opacity duration-300 group-hover:from-black/30 group-hover:to-black/50"></div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center">
                        <h3 className="font-vegawanty text-xl capitalize text-white drop-shadow-lg transition-transform duration-300 group-hover:scale-105">
                          {category.type}s
                        </h3>
                      </div>
                    </div>
                  </div>
                  <div className="p-4">
                    <div className="mb-2 flex items-center justify-between">
                      <h3 className="font-vegawanty text-lg capitalize text-foreground group-hover:text-secondary transition-colors duration-200">
                        {category.type}s
                      </h3>
                      {category.count > 0 && (
                        <span className="text-sm font-manrope text-secondary/70">
                          {category.count} {category.count === 1 ? 'item' : 'items'}
                        </span>
                      )}
                    </div>
                    <p className="font-manrope text-sm text-secondary/70 group-hover:text-secondary/80 transition-colors duration-200">
                      {category.description}
                    </p>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </section>

        {/* Petticoats Info Banner */}
        <section className="mb-12 animate-fade-in-up" style={{ animationDelay: '0.25s' }}>
          <div className="bg-gradient-to-r from-secondary/10 to-secondary/5 rounded-lg p-6 border-l-4 border-secondary">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div className="flex-1">
                <h3 className="font-vegawanty text-xl text-foreground mb-2">Why Petticoats Matter</h3>
                <p className="font-manrope text-sm text-secondary/80">
                  Learn how petticoats create the perfect silhouette and make your gown more comfortable to wear and dance in.
                </p>
              </div>
              <Link
                href="/addons/petticoat/why-petticoats-matter"
                className="inline-flex items-center px-6 py-2.5 bg-secondary text-white font-manrope font-medium rounded-lg hover:bg-secondary/90 transition-all duration-200 hover:scale-105 whitespace-nowrap"
              >
                Learn More
                <svg className="ml-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </div>
        </section>

        {/* Accessories Section */}
        <section className="mb-16">
          <div className="mb-8 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
            <h2 className="font-vegawanty text-3xl text-foreground sm:text-4xl mb-2">Accessories</h2>
            <p className="font-manrope text-sm text-secondary/70">
              Perfect finishing touches for your enchanted ensemble
            </p>
          </div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {accessories.map((category, index) => (
              <div
                key={category.type}
                className="animate-fade-in-up"
                style={{ animationDelay: `${0.4 + index * 0.1}s` }}
              >
                <Link 
                  href={`/addons/${category.type}`}
                  className="group block overflow-hidden rounded-sm bg-white shadow-md transition-all duration-300 hover:shadow-xl hover:-translate-y-2 hover:scale-105"
                >
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <Image
                      src={category.image}
                      alt={`${category.type}s`}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-br from-black/20 to-black/40 transition-opacity duration-300 group-hover:from-black/30 group-hover:to-black/50"></div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center">
                        <h3 className="font-vegawanty text-xl capitalize text-white drop-shadow-lg transition-transform duration-300 group-hover:scale-105">
                          {category.type === 'necklace' ? 'Necklaces' : category.type + 's'}
                        </h3>
                      </div>
                    </div>
                  </div>
                  <div className="p-4">
                    <div className="mb-2 flex items-center justify-between">
                      <h3 className="font-vegawanty text-lg capitalize text-foreground group-hover:text-secondary transition-colors duration-200">
                        {category.type === 'necklace' ? 'Necklaces' : category.type === 'gloves' ? 'Gloves' : category.type + 's'}
                      </h3>
                      {category.count > 0 && (
                        <span className="text-sm font-manrope text-secondary/70">
                          {category.count} {category.count === 1 ? 'item' : 'items'}
                        </span>
                      )}
                    </div>
                    <p className="font-manrope text-sm text-secondary/70 group-hover:text-secondary/80 transition-colors duration-200">
                      {category.description}
                    </p>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </section>

        {/* Featured Add-Ons */}
        <section className="mt-16">
          <div className="mb-8 text-center animate-fade-in-up" style={{ animationDelay: '0.9s' }}>
            <h2 className="font-vegawanty text-3xl text-foreground sm:text-4xl">Featured Add-Ons</h2>
            <p className="mt-2 font-manrope text-sm text-secondary/70">
              Discover our most popular accessories
            </p>
          </div>
          
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {addOns.slice(0, 8).map((addon, index) => (
              <div
                key={addon.id}
                className="animate-fade-in-up"
                style={{ animationDelay: `${1.0 + index * 0.1}s` }}
              >
                <Link 
                  href={`/addons/${addon.type}/${addon.id}`}
                  className="group block overflow-hidden rounded-sm bg-white shadow-md transition-all duration-300 hover:shadow-xl hover:-translate-y-2 hover:scale-105"
                >
                  <div className="relative aspect-[4/5] overflow-hidden bg-secondary/10">
                    {addon.pictures && addon.pictures.length > 0 ? (
                      <Image
                        src={'https:' + addon.pictures[0]}
                        alt={addon.name}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
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
                      <span className="rounded-full bg-secondary/10 px-2 py-1 text-xs font-medium capitalize text-secondary transition-all duration-200 group-hover:bg-secondary/20 group-hover:scale-105">
                        {addon.type}
                      </span>
                      <span className="font-manrope text-sm font-semibold text-foreground group-hover:text-secondary transition-colors duration-200">
                        From ₱{addon.metroManilaRate.toLocaleString()}
                      </span>
                    </div>
                    <h3 className="font-vegawanty text-lg text-foreground group-hover:text-secondary transition-colors duration-200">
                      {addon.name}
                    </h3>
                    <p className="mt-1 font-manrope text-sm text-secondary/70 line-clamp-2 group-hover:text-secondary/80 transition-colors duration-200">
                      {addon.description}
                    </p>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
