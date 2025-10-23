"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState, useEffect } from "react";
import { Gown } from "@/app/api/gowns/model";
import { AddOn } from "@/app/api/addons/model";
import React from "react";
import { div } from "framer-motion/client";

type Props = {
  params: { id: string };
};

type LocationKey = "METRO_MANILA" | "LUZON" | "OUTSIDE_LUZON";

export default function GownPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = React.use(params);
  const [gown, setGown] = useState<Gown | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [location, setLocation] = useState<LocationKey>("METRO_MANILA");
  const [isPixie, setIsPixie] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [selectedImageType, setSelectedImageType] = useState<'longGown' | 'filipiniana' | 'pixie' | 'train'>('longGown');
  const [selectedSizeOption, setSelectedSizeOption] = useState(0);

  useEffect(() => {
    const fetchGown = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/api/gowns/${id}`);
        if (!response.ok) {
          throw new Error('Gown not found');
        }
        const gownData = await response.json();
        setGown(gownData);
        
        // Set default version based on available pictures
        if (gownData.longGownPictures.length > 0) {
          setSelectedImageType('longGown');
          setIsPixie(false);
        } else if (gownData.filipinianaPictures.length > 0) {
          setSelectedImageType('filipiniana');
          setIsPixie(false);
        } else if (gownData.pixiePictures.length > 0) {
          setSelectedImageType('pixie');
          setIsPixie(true);
        } else if (gownData.trainPictures.length > 0) {
          setSelectedImageType('train');
          setIsPixie(false);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch gown');
      } finally {
        setLoading(false);
      }
    };

    fetchGown();
  }, [id]);

  const rate = useMemo(() => {
    if (!gown) return 0;
    // For pixie version, always use pixie pricing
    if (isPixie) {
      if (location === "METRO_MANILA") return gown.pixieMetroManilaRate;
      if (location === "LUZON") return gown.pixieLuzonRate;
      return gown.pixieOutsideLuzonRate;
    }
    // For standard version (long gown and filipiniana), use standard pricing
    if (location === "METRO_MANILA") return gown.metroManilaRate;
    if (location === "LUZON") return gown.luzonRate;
    return gown.outsideLuzonRate;
  }, [gown, isPixie, location]);

  const getCurrentImages = () => {
    if (!gown) return [];
    switch (selectedImageType) {
      case 'longGown':
        return gown.longGownPictures;
      case 'filipiniana':
        return gown.filipinianaPictures;
      case 'pixie':
        return gown.pixiePictures;
      case 'train':
        return gown.trainPictures;
      default:
        return gown.longGownPictures;
    }
  };

  const getCurrentImage = () => {
    const images = getCurrentImages();
    const imageUrl = images[selectedImageIndex];
    // Check if imageUrl is valid and not null
    if (imageUrl && imageUrl !== 'null' && imageUrl.trim() !== '') {
      return imageUrl;
    }
    return '/assets/sample_gown-1.jpg';
  };

  const getAllImages = () => {
    if (!gown) return [];
    return [
      ...gown.longGownPictures.map((url, index) => ({ url, type: 'longGown' as const, index })),
      ...gown.filipinianaPictures.map((url, index) => ({ url, type: 'filipiniana' as const, index })),
      ...gown.pixiePictures.map((url, index) => ({ url, type: 'pixie' as const, index })),
      ...gown.trainPictures.map((url, index) => ({ url, type: 'train' as const, index }))
    ];
  };

  const getAvailableSizes = () => {
    if (!gown) return 1;
    const bustSizes = gown.bust.split('/').length;
    const waistSizes = gown.waist.split('/').length;
    return Math.max(bustSizes, waistSizes);
  };

  const getMeasurementForSize = (measurement: string, sizeIndex: number) => {
    const measurements = measurement.split('/').map(m => m.trim());
    return measurements[sizeIndex] || measurements[0] || '-';
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
            <div className="flex flex-wrap gap-2">
              {Array.from({ length: 3 }).map((_, idx) => (
                <div key={idx} className="h-6 w-20 bg-neutral-200 rounded-full animate-pulse"></div>
              ))}
            </div>
          </div>

          <div className="rounded p-4 space-y-4 bg-white shadow-sm">
            {/* Location skeleton */}
            <div>
              <div className="h-3 w-16 bg-neutral-200 rounded animate-pulse mb-2"></div>
              <div className="inline-flex rounded-full bg-neutral-50 p-1">
                {Array.from({ length: 3 }).map((_, idx) => (
                  <div key={idx} className="h-8 w-20 bg-neutral-200 rounded-full animate-pulse mx-1"></div>
                ))}
              </div>
            </div>

            {/* Version skeleton */}
            <div>
              <div className="h-3 w-16 bg-neutral-200 rounded animate-pulse mb-2"></div>
              <div className="inline-flex rounded-full bg-neutral-50 p-1">
                {Array.from({ length: 2 }).map((_, idx) => (
                  <div key={idx} className="h-8 w-24 bg-neutral-200 rounded-full animate-pulse mx-1"></div>
                ))}
              </div>
            </div>

            {/* Rate skeleton */}
            <div className="pt-1">
              <div className="h-3 w-12 bg-neutral-200 rounded animate-pulse"></div>
              <div className="h-8 w-32 bg-neutral-200 rounded animate-pulse mt-1"></div>
              <div className="h-3 w-8 bg-neutral-200 rounded animate-pulse mt-1"></div>
            </div>
          </div>

          {/* Gown Details skeleton */}
          <div className="rounded p-5 bg-white">
            <div className="h-4 w-28 bg-neutral-200 rounded animate-pulse mb-4"></div>
            <div className="space-y-3">
              {Array.from({ length: 4 }).map((_, idx) => (
                <div key={idx}>
                  <div className="h-3 w-16 bg-neutral-200 rounded animate-pulse mb-2"></div>
                  <div className="flex gap-2">
                    {Array.from({ length: 3 }).map((_, i) => (
                      <div key={i} className="h-6 w-16 bg-neutral-200 rounded-full animate-pulse"></div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Measurements skeleton */}
          <div className="rounded p-5 bg-white">
            <div className="flex items-center justify-between mb-4">
              <div className="h-4 w-28 bg-neutral-200 rounded animate-pulse"></div>
              <div className="h-6 w-24 bg-neutral-200 rounded animate-pulse"></div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {Array.from({ length: 2 }).map((_, idx) => (
                <div key={idx} className="space-y-1">
                  <div className="h-3 w-12 bg-neutral-200 rounded animate-pulse"></div>
                  <div className="h-5 w-20 bg-neutral-200 rounded animate-pulse"></div>
                </div>
              ))}
            </div>
          </div>

          {/* Add Ons skeleton */}
          <div className="rounded p-4 bg-white">
            <div className="h-4 w-20 bg-neutral-200 rounded animate-pulse mb-3"></div>
            <div className="space-y-2">
              {Array.from({ length: 4 }).map((_, idx) => (
                <div key={idx} className="h-4 w-full bg-neutral-200 rounded animate-pulse"></div>
              ))}
            </div>
          </div>

          {/* Related gowns skeleton */}
          <div>
            <div className="h-4 w-32 bg-neutral-200 rounded animate-pulse mb-3"></div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {Array.from({ length: 3 }).map((_, idx) => (
                <div key={idx} className="group">
                  <div className="relative w-full aspect-[3/4] overflow-hidden rounded bg-neutral-200 animate-pulse"></div>
                  <div className="h-4 w-full bg-neutral-200 rounded animate-pulse mt-2"></div>
                </div>
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
        <p className="text-sm opacity-70">{error || "Gown not found."}</p>
        <Link className="underline" href="/">Go back</Link>
      </div>
    );
  }

  return (
    <>
    <div className="mx-auto max-w-6xl p-4 md:p-8 grid grid-cols-1 md:grid-cols-2 gap-10 animate-fade-in">
      <div className="animate-slide-in-left">
        <div className="mb-4 text-xs">
          <Link href="/collections/all" className="text-neutral-500 hover:text-neutral-800 transition-colors duration-200">Collections</Link>
          <span className="mx-2 text-neutral-400">/</span>
          <span className="text-neutral-800">{gown.name}</span>
        </div>
        <div className="relative w-full aspect-[3/4] overflow-hidden rounded-sm bg-neutral-100 shadow-sm group">
          <Image
            src={getCurrentImage().startsWith('http') ? getCurrentImage() : 'https:' + getCurrentImage()}
            alt={gown.name}
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
                    alt={`${gown.name} ${idx + 1}`} 
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
          <p className="mt-1 text-sm text-neutral-600">{gown.collection.join(', ')}</p>
          <h1 className="text-6xl font-semibold tracking-tight font-serif">{gown.name}</h1>
          <div className="mt-3 flex flex-wrap gap-2 text-[11px]">
            {gown.tags.slice(0, 4).map((t, index) => (
              <span 
                key={t} 
                className="rounded-full border px-3 py-1 bg-white/60 tracking-wide uppercase text-neutral-700 hover:bg-white/80 transition-colors duration-200 animate-fade-in-up"
                style={{ animationDelay: `${0.2 + index * 0.1}s` }}
              >
                {t}
              </span>
            ))}
            {gown.tags.length > 4 && (
              <span className="rounded-full border px-3 py-1 bg-white/60 tracking-wide uppercase text-neutral-500 hover:bg-white/80 transition-colors duration-200 animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
                +{gown.tags.length - 4} more
              </span>
            )}
          </div>
        </div>

        <div className="rounded p-4 space-y-4 bg-white shadow-sm animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
        <div>
            <div className="text-[11px] tracking-wide uppercase text-neutral-500 mb-2">Version</div>
            <div className="inline-flex rounded-full bg-neutral-50 p-1">
              {/* Show Long Gown if pictures exist */}
              {gown.longGownPictures.length > 0 && (
                <button
                  onClick={() => {
                    setSelectedImageType('longGown');
                    setSelectedImageIndex(0);
                    setIsPixie(false);
                  }}
                  className={`px-3 py-1.5 text-sm rounded-full transition-all duration-200 hover:scale-105 ${
                    selectedImageType === 'longGown' && !isPixie ? "bg-white shadow-sm" : "text-neutral-600 hover:text-neutral-800"
                  }`}
                >
                  Long Gown
                </button>
              )}
              {/* Show Filipiniana if pictures exist */}
              {gown.filipinianaPictures.length > 0 && (
                <button
                  onClick={() => {
                    setSelectedImageType('filipiniana');
                    setSelectedImageIndex(0);
                    setIsPixie(false);
                  }}
                  className={`px-3 py-1.5 text-sm rounded-full transition-all duration-200 hover:scale-105 ${
                    selectedImageType === 'filipiniana' && !isPixie ? "bg-white shadow-sm" : "text-neutral-600 hover:text-neutral-800"
                  }`}
                >
                  Filipiniana
                </button>
              )}
              {/* Show Pixie if pictures exist */}
              {gown.pixiePictures.length > 0 && (
                <button
                  onClick={() => {
                    setSelectedImageType('pixie');
                    setSelectedImageIndex(0);
                    setIsPixie(true);
                  }}
                  className={`px-3 py-1.5 text-sm rounded-full transition-all duration-200 hover:scale-105 ${
                    selectedImageType === 'pixie' && isPixie ? "bg-white shadow-sm" : "text-neutral-600 hover:text-neutral-800"
                  }`}
                >
                  Pixie
                </button>
              )}
              {/* Show Train if pictures exist */}
              {gown.trainPictures.length > 0 && (
                <button
                  onClick={() => {
                    setSelectedImageType('train');
                    setSelectedImageIndex(0);
                    setIsPixie(false);
                  }}
                  className={`px-3 py-1.5 text-sm rounded-full transition-all duration-200 hover:scale-105 ${
                    selectedImageType === 'train' && !isPixie ? "bg-white shadow-sm" : "text-neutral-600 hover:text-neutral-800"
                  }`}
                >
                  Train
                </button>
              )}
            </div>
          </div>
          
          <div>
            <div className="text-[11px] tracking-wide uppercase text-neutral-500 mb-2">Location</div>
            <div className="inline-flex rounded-full bg-neutral-50 p-1">
              {([
                { k: "METRO_MANILA", l: "Metro Manila" },
                { k: "LUZON", l: "Luzon" },
                { k: "OUTSIDE_LUZON", l: "Outside Luzon" },
              ] as { k: LocationKey; l: string }[]).map(({ k, l }) => (
                <button
                  key={k}
                  onClick={() => setLocation(k)}
                  className={`px-3 py-1.5 text-sm rounded-full transition-all duration-200 hover:scale-105 ${location === k ? "bg-white shadow-sm" : "text-neutral-600 hover:text-neutral-800"}`}
                >
                  {l}
                </button>
              ))}
            </div>
          </div>

          

          <div className="pt-1 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
            <div className="text-[11px] tracking-wide uppercase text-neutral-500">Rate</div>
            <div className="mt-1 text-3xl font-semibold transition-all duration-300">₱{rate.toLocaleString()}</div>
          </div>

          {/* <button className="w-full rounded-full bg-black text-white py-3 text-sm tracking-wide hover:opacity-90">
            Book Now
          </button> */}
        </div>

        {/* Gown Details Section */}
        <div className="rounded p-5 bg-white shadow-sm hover:shadow-md transition-shadow duration-200 animate-fade-in-up" style={{ animationDelay: '0.5s' }}>
          <h3 className="text-sm font-semibold mb-4 tracking-wide uppercase text-neutral-700">Gown Details</h3>
          <div className="space-y-3">
            {/* Color */}
            {gown.color.length > 0 && (
              <div>
                <dt className="text-xs uppercase tracking-wide text-neutral-500 mb-1.5">Color</dt>
                <dd className="flex flex-wrap gap-1.5">
                  {gown.color.map((c) => (
                    <span 
                      key={c} 
                      className="px-2.5 py-1 text-xs bg-neutral-50 border border-neutral-200 rounded-full text-neutral-700 hover:bg-neutral-100 transition-colors duration-200"
                    >
                      {c}
                    </span>
                  ))}
                </dd>
              </div>
            )}
            
            {/* Skirt Style */}
            {gown.skirtStyle.length > 0 && (
              <div>
                <dt className="text-xs uppercase tracking-wide text-neutral-500 mb-1.5">Skirt Style</dt>
                <dd className="flex flex-wrap gap-1.5">
                  {gown.skirtStyle.map((style) => (
                    <span 
                      key={style} 
                      className="px-2.5 py-1 text-xs bg-neutral-50 border border-neutral-200 rounded-full text-neutral-700 hover:bg-neutral-100 transition-colors duration-200"
                    >
                      {style}
                    </span>
                  ))}
                </dd>
              </div>
            )}
            
            {/* Best For */}
            {gown.bestFor.length > 0 && (
              <div>
                <dt className="text-xs uppercase tracking-wide text-neutral-500 mb-1.5">Best For</dt>
                <dd className="flex flex-wrap gap-1.5">
                  {gown.bestFor.map((bf) => (
                    <span 
                      key={bf} 
                      className="px-2.5 py-1 text-xs bg-neutral-50 border border-neutral-200 rounded-full text-neutral-700 hover:bg-neutral-100 transition-colors duration-200"
                    >
                      {bf}
                    </span>
                  ))}
                </dd>
              </div>
            )}
            
          </div>
        </div>

        {/* Measurements Section - Table Format */}
        <div className="rounded p-5 bg-white shadow-sm hover:shadow-md transition-shadow duration-200 animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-semibold tracking-wide uppercase text-neutral-700">Measurements</h3>
            {getAvailableSizes() > 1 && (
              <div className="inline-flex rounded-full bg-neutral-50 p-1">
                {Array.from({ length: getAvailableSizes() }).map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedSizeOption(index)}
                    className={`px-3 py-1.5 text-sm rounded-full transition-all duration-200 hover:scale-105 ${
                      selectedSizeOption === index ? "bg-white shadow-sm" : "text-neutral-600 hover:text-neutral-800"
                    }`}
                  >
                    Size {index + 1}
                  </button>
                ))}
              </div>
            )}
          </div>
          
          {/* Measurements Table */}
          <div className="overflow-hidden border border-neutral-200 rounded-sm">
            <table className="w-full">
              <thead>
                <tr className="bg-neutral-50">
                  <th className="px-4 py-3 text-xs font-medium text-neutral-600 uppercase tracking-wide text-center border-r border-neutral-200">Bust</th>
                  <th className="px-4 py-3 text-xs font-medium text-neutral-600 uppercase tracking-wide text-center border-r border-neutral-200">Waist</th>
                  <th className="px-4 py-3 text-xs font-medium text-neutral-600 uppercase tracking-wide text-center">Length</th>
                </tr>
              </thead>
              <tbody>
                <tr className="bg-white">
                  <td className="px-4 py-3 text-sm font-medium text-neutral-800 text-center border-r border-neutral-200">
                    {getMeasurementForSize(gown.bust, selectedSizeOption)}
                    {getMeasurementForSize(gown.bust, selectedSizeOption) !== '-' && (
                      <span className="text-xs text-neutral-500 ml-1">in</span>
                    )}
                  </td>
                  <td className="px-4 py-3 text-sm font-medium text-neutral-800 text-center border-r border-neutral-200">
                    {getMeasurementForSize(gown.waist, selectedSizeOption)}
                    {getMeasurementForSize(gown.waist, selectedSizeOption) !== '-' && (
                      <span className="text-xs text-neutral-500 ml-1">in</span>
                    )}
                  </td>
                  <td className="px-4 py-3 text-sm font-medium text-neutral-800 text-center">
                    {gown.lenght && (() => {
                      const lengths = gown.lenght.split('/').map(l => l.trim());
                      if (lengths.length === 1) {
                        return (<div>
                          {`${lengths[0]} `}<span className="text-xs text-neutral-500 ml-1">in</span>
                        </div>);
                      } else if (lengths.length === 2) {
                        if (lengths[0] === '-') {
                          return (<div>
                            {`Pixie: ${lengths[1]} `}<span className="text-xs text-neutral-500 ml-1">in</span>
                          </div>
                          );
                        }
                        return (
                          <div className="space-y-1">
                            <div>Long Gown: {lengths[0]} <span className="text-xs text-neutral-500 ml-1">in</span></div>
                            <div>Pixie: {lengths[1]} <span className="text-xs text-neutral-500 ml-1">in</span></div>
                          </div>
                        );
                      }
                      return gown.lenght;
                    })()}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Related gowns moved to bottom */}
      </div>
    </div>
    
    {/* Related Add-Ons Section */}
    <div className="mx-auto max-w-6xl p-4 md:p-8">
      <RelatedAddOns suggestedAddOns={gown.addOns} />
    </div>

    {/* Related Gowns Section moved to bottom */}
    <div className="mx-auto max-w-6xl p-4 md:p-8">
      <RelatedGowns relatedGownIds={gown.relatedGowns} />
    </div>
    </>
  );
}

function RelatedGowns({ relatedGownIds }: { relatedGownIds: string[] }) {
  const [relatedGowns, setRelatedGowns] = useState<Gown[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRelatedGowns = async () => {
      try {
        setLoading(true);
        const promises = relatedGownIds.map(id => 
          fetch(`/api/gowns/${id}`).then(res => res.json())
        );
        const gowns = await Promise.all(promises);
        setRelatedGowns(gowns.filter(Boolean));
      } catch (err) {
        console.error('Failed to fetch related gowns:', err);
      } finally {
        setLoading(false);
      }
    };

    if (relatedGownIds.length > 0) {
      fetchRelatedGowns();
    } else {
      setLoading(false);
    }
  }, [relatedGownIds]);

  if (loading) {
    return (
      <div className="animate-fade-in-up" style={{ animationDelay: '1.0s' }}>
        <div className="h-4 w-48 bg-neutral-200 rounded animate-pulse mb-6"></div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {Array.from({ length: 4 }).map((_, idx) => (
            <div key={idx} className="group">
              <div className="relative w-full aspect-[4/5] overflow-hidden rounded bg-neutral-200 animate-pulse"></div>
              <div className="h-4 w-full bg-neutral-200 rounded animate-pulse mt-2"></div>
              <div className="h-3 w-24 bg-neutral-200 rounded animate-pulse mt-1"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (relatedGowns.length === 0) {
    return null;
  }

  return (
    <div className="animate-fade-in-up" style={{ animationDelay: '1.0s' }}>
      <div className="mb-8 text-center">
        <h2 className="font-vegawanty text-3xl text-foreground sm:text-4xl mb-2">More Like This</h2>
        <p className="font-manrope text-sm text-secondary/70">
          You may also like these gowns
        </p>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {relatedGowns.map((gown, index) => (
          <Link 
            key={gown.id} 
            href={`/gown/${gown.id}`} 
            className="group block animate-fade-in-up" 
            style={{ animationDelay: `${1.1 + index * 0.05}s` }}
          >
            <div className="relative w-full aspect-[4/5] overflow-hidden rounded-sm bg-neutral-50 group-hover:shadow-lg transition-all duration-300">
              <Image 
                src={
                  gown.longGownPictures.length > 0 && gown.longGownPictures[0] && gown.longGownPictures[0] !== 'null'
                    ? (gown.longGownPictures[0].startsWith('http') ? gown.longGownPictures[0] : 'https:' + gown.longGownPictures[0])
                    : '/assets/sample_gown-1.jpg'
                } 
                alt={gown.name} 
                fill 
                className="object-cover transition-transform duration-500 group-hover:scale-105" 
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw" 
              />
            </div>
            <div className="mt-3">
              <h4 className="font-vegawanty text-lg text-foreground group-hover:text-secondary transition-colors duration-200">
                {gown.name}
              </h4>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

function RelatedAddOns({ suggestedAddOns }: { suggestedAddOns: string[] }) {
  const [addOnsByCategory, setAddOnsByCategory] = useState<Record<string, AddOn[]>>({});
  const [loading, setLoading] = useState(true);
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const fetchSuggestedAddOns = async () => {
      try {
        setLoading(true);
        
        if (!suggestedAddOns || suggestedAddOns.length === 0) {
          setAddOnsByCategory({});
          setLoading(false);
          return;
        }

        // Fetch each suggested add-on by ID
        const addOnPromises = suggestedAddOns.map((addOnId) => 
          fetch(`/api/addons/${addOnId}`)
            .then((res) => (res.ok ? res.json() : null))
            .catch(() => null)
        );
        const fetchedAddOns = (await Promise.all(addOnPromises)).filter(Boolean) as AddOn[];

        // Group fetched add-ons by category (type)
        const grouped = fetchedAddOns.reduce((acc, addon) => {
          if (!acc[addon.type]) {
            acc[addon.type] = [];
          }
          acc[addon.type].push(addon);
          return acc;
        }, {} as Record<string, AddOn[]>);

        setAddOnsByCategory(grouped);
      } catch (err) {
        console.error('Failed to fetch suggested add-ons:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchSuggestedAddOns();
  }, [suggestedAddOns]);

  const getCategoryDisplayName = (type: string) => {
    const names: Record<string, string> = {
      crown: 'Crowns',
      hood: 'Hoods',
      petticoat: 'Petticoats',
      gloves: 'Gloves',
      fan: 'Fans',
      mask: 'Masks',
      necklace: 'Necklaces',
      umbrella: 'Umbrellas'
    };
    return names[type] || type.charAt(0).toUpperCase() + type.slice(1) + 's';
  };

  const getCategoryDescription = (type: string) => {
    const descriptions: Record<string, string> = {
      crown: 'Regal and enchanting crowns for your magical moments',
      hood: 'Dramatic hoods with elegant details and flowing fabrics',
      petticoat: 'Perfect petticoats to create the ideal silhouette',
      gloves: 'Elegant gloves to complete your sophisticated look',
      fan: 'Beautiful fans for a touch of vintage elegance',
      mask: 'Mysterious masks for your masquerade moments',
      necklace: 'Stunning necklaces to add sparkle to your ensemble',
      umbrella: 'Elegant umbrellas for a romantic and dreamy touch'
    };
    return descriptions[type] || 'Beautiful accessories to complete your look';
  };

  if (loading) {
    return (
      <div className="animate-fade-in-up" style={{ animationDelay: '1.0s' }}>
        <div className="h-4 w-48 bg-neutral-200 rounded animate-pulse mb-6"></div>
        <div className="space-y-8">
          {Array.from({ length: 3 }).map((_, categoryIndex) => (
            <div key={categoryIndex}>
              <div className="h-6 w-32 bg-neutral-200 rounded animate-pulse mb-4"></div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {Array.from({ length: 3 }).map((_, itemIndex) => (
                  <div key={itemIndex} className="group">
                    <div className="relative w-full aspect-[4/5] overflow-hidden rounded bg-neutral-200 animate-pulse"></div>
                    <div className="h-4 w-full bg-neutral-200 rounded animate-pulse mt-2"></div>
                    <div className="h-3 w-24 bg-neutral-200 rounded animate-pulse mt-1"></div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  const categories = Object.keys(addOnsByCategory);
  if (categories.length === 0) {
    return (
      <div className="animate-fade-in-up" style={{ animationDelay: '1.0s' }}>
        <div className="mb-8 text-center">
          <h2 className="font-vegawanty text-3xl text-foreground sm:text-4xl mb-2">Suggested Add-Ons</h2>
          <p className="font-manrope text-sm text-secondary/70">
            No specific add-ons are suggested for this gown, but you can explore our full collection
          </p>
          <Link 
            href="/addons"
            className="inline-block mt-4 px-6 py-2 bg-secondary text-white rounded-full hover:bg-secondary/90 transition-all duration-200 hover:scale-105"
          >
            Browse All Add-Ons
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="animate-fade-in-up" style={{ animationDelay: '1.0s' }}>
      <div className="mb-8 text-center">
        <h2 className="font-vegawanty text-3xl text-foreground sm:text-4xl mb-2">Suggested Add-Ons</h2>
        <p className="font-manrope text-sm text-secondary/70">
          Complete your magical look with these recommended accessories for this gown
        </p>
      </div>
      
      <div className="space-y-12">
        {categories.map((category, categoryIndex) => (
          <div key={category} className="animate-fade-in-up" style={{ animationDelay: `${1.1 + categoryIndex * 0.1}s` }}>
            <div className="mb-6">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-vegawanty text-2xl text-foreground capitalize">
                  {getCategoryDisplayName(category)}
                </h3>
                <button
                  onClick={() => setExpanded(prev => ({ ...prev, [category]: !prev[category] }))}
                  className="font-manrope text-sm text-secondary hover:text-secondary/80 transition-colors duration-200 hover:underline"
                >
                  {expanded[category] ? 'See less' : 'See more'}
                </button>
              </div>
              <p className="font-manrope text-sm text-secondary/70">
                {getCategoryDescription(category)}
              </p>
            </div>
            
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {(expanded[category] ? addOnsByCategory[category] : addOnsByCategory[category].slice(0, 6)).map((addon, itemIndex) => (
                <Link 
                  key={addon.id} 
                  href={`/addons/${addon.type}/${addon.id}`} 
                  className="group block animate-fade-in-up" 
                  style={{ animationDelay: `${1.2 + categoryIndex * 0.1 + itemIndex * 0.05}s` }}
                >
                  <div className="relative w-full aspect-[4/5] overflow-hidden rounded-sm bg-neutral-50 group-hover:shadow-lg transition-all duration-300">
                    {addon.pictures && addon.pictures.length > 0 ? (
                      <Image
                        src={'https:' + addon.pictures[0]}
                        alt={addon.name}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center bg-secondary/10">
                        <div className="text-center">
                          <div className="mb-2 flex h-16 w-16 items-center justify-center rounded-full bg-secondary/20 mx-auto">
                            <span className="font-vegawanty text-xl font-semibold text-secondary">
                              {getCategoryDisplayName(category).charAt(0)}
                            </span>
                          </div>
                          <p className="font-manrope text-sm text-secondary/70">Image coming soon</p>
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="mt-3">
                    <h4 className="font-vegawanty text-lg text-foreground group-hover:text-secondary transition-colors duration-200">
                      {addon.name}
                    </h4>
                    <div className="mt-1 flex items-center justify-between">
                      <span className="font-manrope text-sm font-semibold text-secondary">
                        From ₱{addon.metroManilaRate.toLocaleString()}
                      </span>
                      {addon.forSale && (
                        <span className="font-manrope text-xs text-secondary/60 line-through">
                          ₱{addon.forSale.toLocaleString()}
                        </span>
                      )}
                    </div>
                    <p className="mt-1 font-manrope text-xs text-secondary/70 line-clamp-2">
                      {addon.description}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}


