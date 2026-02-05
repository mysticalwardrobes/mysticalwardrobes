"use client";

import { useState, useEffect, use, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { AddOnDetail } from "@/app/api/addons/model";
import AddOnDetailSkeleton from "@/components/AddOnDetailSkeleton";

interface PageProps {
  params: { type: string; id: string };
}

type LocationKey = "METRO_MANILA" | "LUZON" | "OUTSIDE_LUZON";

export default function AddOnDetailPage({ params }: { params: Promise<{ type: string; id: string }> }) {
  const { type, id } = use(params);
  const [addOn, setAddOn] = useState<AddOnDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [location, setLocation] = useState<LocationKey>("METRO_MANILA");

  useEffect(() => {
    const fetchAddOn = async () => {
      try {
        const response = await fetch(`/api/addons/${id}`);
        if (!response.ok) {
          if (response.status === 404) {
            throw new Error('Add-on not found');
          }
          throw new Error('Failed to fetch add-on');
        }
        const addOnData = await response.json();
        setAddOn(addOnData);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load add-on');
      } finally {
        setLoading(false);
      }
    };

    fetchAddOn();
  }, [id]);

  const rate = useMemo(() => {
    if (!addOn) return 0;
    if (location === "METRO_MANILA") return addOn.metroManilaRate;
    if (location === "LUZON") return addOn.luzonRate;
    return addOn.outsideLuzonRate;
  }, [addOn, location]);


  const getTypeDescription = (type: string) => {
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
    return <AddOnDetailSkeleton />;
  }

  if (error || !addOn) {
    return (
      <main className="bg-background py-10 text-secondary md:py-16">
        <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
          <div className="text-center py-20">
            <h1 className="font-vegawanty text-2xl text-foreground mb-2">Add-on not found</h1>
            <p className="font-manrope text-secondary/70 mb-6">
              The {type} you're looking for doesn't exist or has been removed.
            </p>
            <Link
              href={`/addons/${type}`}
              className="inline-flex items-center gap-2 rounded-full bg-secondary px-6 py-3 text-sm font-medium text-white transition hover:bg-secondary/90"
            >
              ← Back to {type === 'necklace' ? 'necklaces' : type === 'gloves' ? 'gloves' : type + 's'}
            </Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="bg-background py-10 text-secondary md:py-16">
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="mb-8 flex items-center gap-2 text-sm">
          <Link href="/addons" className="text-secondary/70 hover:text-secondary transition-colors">
            Add-Ons
          </Link>
          <span className="text-secondary/50">/</span>
          <Link href={`/addons/${type}`} className="text-secondary/70 hover:text-secondary transition-colors capitalize">
            {type === 'necklace' ? 'necklaces' : type === 'gloves' ? 'gloves' : type + 's'}
          </Link>
          <span className="text-secondary/50">/</span>
          <span className="text-secondary">{addOn.name}</span>
        </nav>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          {/* Image Gallery */}
          <div className="space-y-4">
            <div className="relative aspect-[4/5] overflow-hidden rounded-sm bg-secondary/10">
              {addOn.pictures && addOn.pictures.length > 0 ? (
                <Image
                  src={addOn.pictures[selectedImageIndex].startsWith('http') ? addOn.pictures[selectedImageIndex] : 'https:' + addOn.pictures[selectedImageIndex]}
                  alt={addOn.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              ) : (
                <div className="flex h-full items-center justify-center">
                  <div className="text-center">
                    <p className="font-manrope text-secondary/70">Image coming soon</p>
                  </div>
                </div>
              )}
            </div>
            
            {/* Thumbnail Gallery */}
            {addOn.pictures && addOn.pictures.length > 1 && (
              <div className="flex gap-2 overflow-x-auto">
                {addOn.pictures.map((picture, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImageIndex(index)}
                    className={`relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-sm border-2 transition ${
                      selectedImageIndex === index
                        ? 'border-secondary'
                        : 'border-secondary/30 hover:border-secondary/60'
                    }`}
                  >
                    <Image
                      src={picture.startsWith('http') ? picture : 'https:' + picture}
                      alt={`${addOn.name} ${index + 1}`}
                      fill
                      className="object-cover"
                      sizes="80px"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Details */}
          <div className="space-y-6">
            <div>
              <div className="mb-2 flex items-center gap-2">
                <span className="rounded-full bg-secondary/10 px-3 py-1 text-xs font-medium capitalize text-secondary">
                  {addOn.type}
                </span>
              </div>
              <h1 className="font-vegawanty text-3xl text-foreground sm:text-4xl">{addOn.name}</h1>
              {addOn.description && addOn.description.length > 0 && (
                <p className="mt-4 font-manrope text-lg text-secondary/80">
                  {/* Extract plain text from Portable Text blocks */}
                  {addOn.description
                    .filter((block): block is typeof block & { children?: Array<{ text?: string }> } => 
                      block._type === 'block' && 'children' in block
                    )
                    .flatMap(block => block.children?.map((child: { text?: string }) => child.text) || [])
                    .join(' ')}
                </p>
              )}
            </div>

            {/* Pricing */}
            <div className="space-y-4 bg-white p-6 rounded-sm border border-secondary/20">
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
                      className={`px-3 py-1.5 text-sm rounded-full transition ${location === k ? "bg-white shadow-sm" : "text-neutral-600"}`}
                    >
                      {l}
                    </button>
                  ))}
                </div>
              </div>

              {/* Rental Rate */}
              <div className="pt-1">
                <div className="text-[11px] tracking-wide uppercase text-neutral-500">Rental Rate</div>
                <div className="mt-1 text-3xl font-semibold text-foreground">₱{rate.toLocaleString()}</div> 
              </div>

              {/* For Sale Rate */}
              {addOn.forSaleRate && (
                <div className="pt-4 border-t border-secondary/10">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="text-[11px] tracking-wide uppercase text-neutral-500">For Sale</div>
                  </div>
                  <div className="mt-1 text-3xl font-semibold text-foreground">₱{addOn.forSaleRate.toLocaleString()}</div>
                  <div className="text-xs text-neutral-500 mt-1">One-time purchase price</div>
                </div>
              )}
            </div>

            {/* Action Buttons */}
            {/* <div className="space-y-4">
              <button className="w-full rounded-full bg-secondary px-6 py-4 text-lg font-medium text-white transition hover:bg-secondary/90">
                Book This {addOn.type.charAt(0).toUpperCase() + addOn.type.slice(1)}
              </button>
              <button className="w-full rounded-full border-2 border-secondary px-6 py-4 text-lg font-medium text-secondary transition hover:bg-secondary hover:text-white">
                Contact Us for Details
              </button>
            </div> */}

            {/* Additional Info */}
            <div className="rounded-sm border border-secondary/20 bg-white/50 p-6">
              <h3 className="font-vegawanty text-lg text-foreground mb-3">About This {addOn.type.charAt(0).toUpperCase() + addOn.type.slice(1)}</h3>
              <p className="font-manrope text-secondary/80">
                {getTypeDescription(addOn.type)} This piece is perfect for completing your magical ensemble 
                and adding that special touch to your fairytale moment.
              </p>
            </div>
          </div>
        </div>

        {/* Related Items */}
        <section className="mt-16">
          <div className="mb-8 text-center">
            <h2 className="font-vegawanty text-3xl text-foreground sm:text-4xl">More {addOn.type === 'necklace' ? 'Necklaces' : addOn.type === 'gloves' ? 'Gloves' : addOn.type.charAt(0).toUpperCase() + addOn.type.slice(1) + 's'}</h2>
            <p className="mt-2 font-manrope text-sm text-secondary/70">
              Explore other {addOn.type === 'necklace' ? 'necklaces' : addOn.type === 'gloves' ? 'gloves' : addOn.type + 's'} in our collection
            </p>
          </div>
          
          <div className="text-center">
            <Link
              href={`/addons/${type}`}
              className="inline-flex items-center gap-2 rounded-full border-2 border-secondary px-6 py-3 text-sm font-medium text-secondary transition hover:bg-secondary hover:text-white"
            >
              View All {addOn.type === 'necklace' ? 'Necklaces' : addOn.type === 'gloves' ? 'Gloves' : addOn.type.charAt(0).toUpperCase() + addOn.type.slice(1) + 's'}
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}
