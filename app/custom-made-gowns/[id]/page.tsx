"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import type { CustomMadeGown } from "@/app/api/custom-made-gowns/model";

type Props = {
  params: Promise<{ id: string }>;
};

export default function CustomGownPage({ params }: Props) {
  const { id } = React.use(params);
  const [gown, setGown] = useState<CustomMadeGown | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [selectedImageType, setSelectedImageType] = useState<'longGown' | 'pixie' | 'hood'>('longGown');

  useEffect(() => {
    const fetchGown = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/api/custom-made-gowns/${id}`);
        if (!response.ok) {
          throw new Error('Custom gown not found');
        }
        const gownData = await response.json();
        setGown(gownData);
        
        // Set default version based on available pictures
        if (gownData.longGownPicture.length > 0) {
          setSelectedImageType('longGown');
        } else if (gownData.pixiePicture.length > 0) {
          setSelectedImageType('pixie');
        } else if (gownData.hoodPicture.length > 0) {
          setSelectedImageType('hood');
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch custom gown');
      } finally {
        setLoading(false);
      }
    };

    fetchGown();
  }, [id]);

  const getCurrentImages = () => {
    if (!gown) return [];
    switch (selectedImageType) {
      case 'longGown':
        return gown.longGownPicture;
      case 'pixie':
        return gown.pixiePicture;
      case 'hood':
        return gown.hoodPicture;
      default:
        return gown.longGownPicture;
    }
  };

  const getCurrentImage = () => {
    const images = getCurrentImages();
    const imageUrl = images[selectedImageIndex];
    if (imageUrl && imageUrl !== 'null' && imageUrl.trim() !== '') {
      return imageUrl;
    }
    return '/assets/sample_gown-1.jpg';
  };

  if (loading) {
    return (
      <div className="mx-auto max-w-6xl p-4 md:p-8 grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Left side - Image skeleton */}
        <div>
          <div className="mb-4 text-xs">
            <div className="h-4 w-32 bg-neutral-200 rounded animate-pulse"></div>
          </div>
          <div className="relative w-full aspect-[3/4] overflow-hidden rounded-sm bg-neutral-200 animate-pulse">
            <div className="absolute inset-0 bg-gradient-to-r from-neutral-200 via-neutral-100 to-neutral-200 animate-pulse"></div>
          </div>
          
          {/* Thumbnail skeleton */}
          <div className="mt-3 grid grid-cols-4 gap-2">
            {Array.from({ length: 4 }).map((_, idx) => (
              <div key={idx} className="aspect-square bg-neutral-200 rounded-sm animate-pulse"></div>
            ))}
          </div>
        </div>

        {/* Right side - Content skeleton */}
        <div className="space-y-5 md:sticky md:top-24 md:pt-10 self-start">
          <div>
            <div className="h-4 w-24 bg-neutral-200 rounded animate-pulse mb-2"></div>
            <div className="h-16 w-full bg-neutral-200 rounded animate-pulse mb-3"></div>
          </div>

          <div className="rounded p-4 space-y-4 bg-white shadow-sm">
            <div>
              <div className="h-3 w-16 bg-neutral-200 rounded animate-pulse mb-2"></div>
              <div className="inline-flex rounded-full bg-neutral-50 p-1">
                {Array.from({ length: 3 }).map((_, idx) => (
                  <div key={idx} className="h-8 w-20 bg-neutral-200 rounded-full animate-pulse mx-1"></div>
                ))}
              </div>
            </div>

            <div className="pt-1">
              <div className="h-3 w-12 bg-neutral-200 rounded animate-pulse"></div>
              <div className="h-8 w-32 bg-neutral-200 rounded animate-pulse mt-1"></div>
            </div>
          </div>

          <div className="rounded p-5 bg-white">
            <div className="h-4 w-28 bg-neutral-200 rounded animate-pulse mb-4"></div>
            <div className="space-y-3">
              {Array.from({ length: 3 }).map((_, idx) => (
                <div key={idx} className="h-4 w-full bg-neutral-200 rounded animate-pulse"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !gown) {
    return (
      <div className="p-6">
        <p className="text-sm opacity-70">{error || "Custom gown not found."}</p>
        <Link className="underline" href="/custom-made-gowns">Go back</Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl p-4 md:p-8 grid grid-cols-1 md:grid-cols-2 gap-10 animate-fade-in">
      <div className="animate-slide-in-left">
        <div className="mb-4 text-xs">
          <Link href="/custom-made-gowns" className="text-neutral-500 hover:text-neutral-800 transition-colors duration-200">Custom Made Gowns</Link>
          <span className="mx-2 text-neutral-400">/</span>
          <span className="text-neutral-800">{gown.title}</span>
        </div>
        <div className="relative w-full aspect-[3/4] overflow-hidden rounded-sm bg-neutral-100 shadow-sm group">
          <Image
            src={getCurrentImage().startsWith('http') ? getCurrentImage() : 'https:' + getCurrentImage()}
            alt={gown.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, 50vw"
            priority
          />
          {/* Navigation arrows if multiple images */}
          {getCurrentImages().length > 1 && (
            <>
              <button
                onClick={() => setSelectedImageIndex(prev => prev > 0 ? prev - 1 : getCurrentImages().length - 1)}
                className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-black/50 p-2 text-white hover:bg-black/70 transition-all duration-200 hover:scale-110 opacity-0 group-hover:opacity-100"
                aria-label="Previous image"
              >
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button
                onClick={() => setSelectedImageIndex(prev => prev < getCurrentImages().length - 1 ? prev + 1 : 0)}
                className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-black/50 p-2 text-white hover:bg-black/70 transition-all duration-200 hover:scale-110 opacity-0 group-hover:opacity-100"
                aria-label="Next image"
              >
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </>
          )}
        </div>
        

        {/* Thumbnail grid for current image type */}
        {getCurrentImages().length > 1 && (
          <div className="mt-3 grid grid-cols-4 gap-2">
            {getCurrentImages().map((src, idx) => {
              // Filter out null or invalid URLs
              if (!src || src === 'null' || src.trim() === '') {
                return null;
              }
              return (
                <button
                  key={idx}
                  onClick={() => setSelectedImageIndex(idx)}
                  className={`relative aspect-square overflow-hidden rounded-sm bg-white hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-neutral-300 transition-all duration-200 hover:scale-105 ${
                    selectedImageIndex === idx ? 'ring-2 ring-black scale-105' : ''
                  }`}
                  aria-label={`Select image ${idx + 1}`}
                >
                  <Image 
                    src={src.startsWith('http') ? src : 'https:' + src} 
                    alt={`${gown.title} ${idx + 1}`} 
                    fill 
                    className="object-cover transition-transform duration-200" 
                    sizes="120px" 
                  />
                </button>
              );
            }).filter(Boolean)}
          </div>
        )}
      </div>

      <div className="space-y-5 md:sticky md:top-24 md:pt-10 self-start animate-slide-in-right">
        <div className="animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
          <p className="mt-1 text-sm text-neutral-600">{gown.gownFor}</p>
          <h1 className="text-6xl font-semibold tracking-tight font-serif">{gown.title}</h1>
          {gown.location && (
            <div className="mt-3 flex flex-wrap gap-2 text-[11px]">
              <span className="rounded-full border px-3 py-1 bg-white/60 tracking-wide uppercase text-neutral-700 hover:bg-white/80 transition-colors duration-200">
                {gown.location}
              </span>
            </div>
          )}
        </div>

        <div className="rounded p-4 space-y-4 bg-white shadow-sm animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
          <div>
            <div className="text-[11px] tracking-wide uppercase text-neutral-500 mb-2">Version</div>
            <div className="inline-flex rounded-full bg-neutral-50 p-1">
              {/* Show Long Gown if pictures exist */}
              {gown.longGownPicture.length > 0 && (
                <button
                  onClick={() => {
                    setSelectedImageType('longGown');
                    setSelectedImageIndex(0);
                  }}
                  className={`px-3 py-1.5 text-sm rounded-full transition-all duration-200 hover:scale-105 ${
                    selectedImageType === 'longGown' ? "bg-white shadow-sm" : "text-neutral-600 hover:text-neutral-800"
                  }`}
                >
                  Long Gown
                </button>
              )}
              {/* Show Pixie if pictures exist */}
              {gown.pixiePicture.length > 0 && (
                <button
                  onClick={() => {
                    setSelectedImageType('pixie');
                    setSelectedImageIndex(0);
                  }}
                  className={`px-3 py-1.5 text-sm rounded-full transition-all duration-200 hover:scale-105 ${
                    selectedImageType === 'pixie' ? "bg-white shadow-sm" : "text-neutral-600 hover:text-neutral-800"
                  }`}
                >
                  Pixie
                </button>
              )}
              {/* Show Hood if pictures exist */}
              {gown.hoodPicture.length > 0 && (
                <button
                  onClick={() => {
                    setSelectedImageType('hood');
                    setSelectedImageIndex(0);
                  }}
                  className={`px-3 py-1.5 text-sm rounded-full transition-all duration-200 hover:scale-105 ${
                    selectedImageType === 'hood' ? "bg-white shadow-sm" : "text-neutral-600 hover:text-neutral-800"
                  }`}
                >
                  Hood
                </button>
              )}
            </div>
          </div>

          {gown.preOrderPrice > 0 && (
            <div className="pt-1 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
              <div className="text-[11px] tracking-wide uppercase text-neutral-500">Pre-Order Price</div>
              <div className="mt-1 text-3xl font-semibold transition-all duration-300">₱{gown.preOrderPrice.toLocaleString()}</div>
            </div>
          )}
        </div>

        {/* Description Section */}
        {gown.description && (
          <div className="rounded p-5 bg-white shadow-sm hover:shadow-md transition-shadow duration-200 animate-fade-in-up" style={{ animationDelay: '0.5s' }}>
            <h3 className="text-sm font-semibold mb-4 tracking-wide uppercase text-neutral-700">About This Creation</h3>
            <p className="text-sm leading-relaxed text-neutral-700 whitespace-pre-line">
              {gown.description}
            </p>
          </div>
        )}

        {/* Custom Request CTA */}
        <div className="rounded p-5 bg-gradient-to-br from-neutral-50 to-neutral-100 border border-neutral-200 animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
          <h3 className="text-sm font-semibold mb-3 tracking-wide uppercase text-neutral-700">
            Love This Style?
          </h3>
          <p className="text-sm text-neutral-600 mb-4 leading-relaxed">
            We can create a similar custom gown just for you! Each piece is uniquely crafted 
            to your specifications and measurements.
          </p>
          <div className="space-y-3">
            <Link
              href="/contact"
              className="block w-full text-center rounded-full bg-black text-white py-3 text-sm tracking-wide hover:opacity-90 transition-opacity duration-200"
            >
              Request Custom Design
            </Link>
            <Link 
              href="/custom-made-terms" 
              className="block text-center text-xs text-neutral-500 hover:text-neutral-700 transition-colors duration-200"
            >
              Review our Custom Made Terms →
            </Link>
          </div>
        </div>

        {/* Back to Portfolio */}
        <div className="pt-4 animate-fade-in-up" style={{ animationDelay: '0.7s' }}>
          <Link
            href="/custom-made-gowns"
            className="inline-flex items-center text-sm text-neutral-600 hover:text-neutral-800 transition-colors duration-200"
          >
            ← Back to Custom Creations
          </Link>
        </div>
      </div>
    </div>
  );
}