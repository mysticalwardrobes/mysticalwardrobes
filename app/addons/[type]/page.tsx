"use client";

import { useAtom } from "jotai";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, use } from "react";
import { motion } from "framer-motion";
import { AddOn } from "@/app/api/addons/model";
import AddOnsCategorySkeleton from "@/components/AddOnsCategorySkeleton";

interface PageProps {
  params: { type: string };
}

// Filter atoms
import { atom } from "jotai";

export type PriceRange = [number, number];
export const DEFAULT_PRICE_RANGE: PriceRange = [0, 2000];
export const DEFAULT_SORT_BY = "name";
export const ITEMS_PER_PAGE = 15;

export const priceRangeAtom = atom<PriceRange>(DEFAULT_PRICE_RANGE);
export const sortByAtom = atom<string>(DEFAULT_SORT_BY);
export const filterDrawerAtom = atom(false);
export const currentPageAtom = atom(1);
export const totalItemsAtom = atom(0);

const sortOptions = [
  { value: "name", label: "Name A-Z" },
  { value: "price-low-high", label: "Price: Low to High" },
  { value: "price-high-low", label: "Price: High to Low" },
];

function FiltersPanel({ type }: { type: string }) {
  const [priceRange, setPriceRange] = useAtom(priceRangeAtom);

  const handleMinChange = (value: number) => {
    setPriceRange(([, max]) => {
      const clampedValue = Math.max(0, Math.min(value, max));
      return [clampedValue, max];
    });
  };

  const handleMaxChange = (value: number) => {
    setPriceRange(([min]) => {
      const clampedValue = Math.min(2000, Math.max(value, min));
      return [min, clampedValue];
    });
  };

  return (
    <div className="space-y-6 text-secondary">
      <section className="space-y-4 border-b border-secondary/20 pb-6">
        <div className="flex items-center justify-between">
          <h2 className="font-vegawanty text-sm font-semibold uppercase tracking-wider">Price</h2>
          <span className="font-manrope text-xs text-secondary/70">Php</span>
        </div>
        <div className="space-y-4">
          <div className="flex flex-col gap-3">
            <input
              aria-label="Minimum price"
              type="range"
              min={0}
              max={2000}
              step={50}
              value={priceRange[0]}
              onChange={(event) => handleMinChange(Number(event.target.value))}
              className="accent-secondary"
            />
            <input
              aria-label="Maximum price"
              type="range"
              min={0}
              max={2000}
              step={50}
              value={priceRange[1]}
              onChange={(event) => handleMaxChange(Number(event.target.value))}
              className="accent-secondary"
            />
          </div>
          <div className="flex items-center gap-2">
            <input
              type="number"
              inputMode="numeric"
              min={0}
              max={2000}
              value={priceRange[0]}
              onChange={(event) => handleMinChange(Number(event.target.value))}
              className="w-full rounded border border-secondary/30 bg-white px-3 py-2 text-sm focus:border-secondary focus:outline-none"
            />
            <span className="text-xs font-medium text-secondary/60">to</span>
            <input
              type="number"
              inputMode="numeric"
              min={0}
              max={2000}
              value={priceRange[1]}
              onChange={(event) => handleMaxChange(Number(event.target.value))}
              className="w-full rounded border border-secondary/30 bg-white px-3 py-2 text-sm focus:border-secondary focus:outline-none"
            />
          </div>
        </div>
      </section>

      <section className="space-y-3 border-b border-secondary/20 pb-6">
        <h2 className="font-vegawanty text-sm font-semibold uppercase tracking-wider">Category</h2>
        <div className="space-y-2">
          <Link
            href="/addons"
            className="block text-sm text-secondary hover:text-secondary/90 transition-colors"
          >
            All Add-Ons
          </Link>
          {['crown', 'hood', 'petticoat', 'gloves', 'fan', 'mask', 'necklace', 'umbrella'].map((category) => (
            <Link
              key={category}
              href={`/addons/${category}`}
              className={`block text-sm capitalize transition-colors ${
                category === type 
                  ? 'text-secondary font-semibold' 
                  : 'text-secondary/70 hover:text-secondary/90'
              }`}
            >
              {category}{type === 'gloves' ? '' : 's'}
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}

export default function AddOnsCategoryPage({ params }: { params: Promise<{ type: string }> }) {
  const { type } = use(params);
  const [addOns, setAddOns] = useState<AddOn[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isFilterDrawerOpen, setIsFilterDrawerOpen] = useAtom(filterDrawerAtom);
  const [sortBy, setSortBy] = useAtom(sortByAtom);
  const [priceRange] = useAtom(priceRangeAtom);
  const [currentPage, setCurrentPage] = useAtom(currentPageAtom);
  const [totalItems, setTotalItems] = useAtom(totalItemsAtom);

  const toggleFilterDrawer = () => {
    setIsFilterDrawerOpen((isOpen) => !isOpen);
  };

  useEffect(() => {
    const fetchAddOns = async () => {
      try {
        const searchParams = new URLSearchParams({
          type: type,
          sortBy: sortBy,
          minPrice: priceRange[0].toString(),
          maxPrice: priceRange[1].toString(),
          page: currentPage.toString(),
          limit: ITEMS_PER_PAGE.toString(),
        });

        const response = await fetch(`/api/addons?${searchParams}`);
        if (!response.ok) {
          throw new Error('Failed to fetch add-ons');
        }
        const data = await response.json();
        setAddOns(data.items || data);
        setTotalItems(data.total || data.length);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load add-ons');
      } finally {
        setLoading(false);
      }
    };

    fetchAddOns();
  }, [type, sortBy, priceRange, currentPage]);

  // Reset to page 1 when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [type, sortBy, priceRange, setCurrentPage]);

  const getTypeIcon = (type: string) => {
    const icons: Record<string, string> = {
      crown: 'Crown',
      hood: 'Hood',
      petticoat: 'Petticoat',
      gloves: 'Gloves',
      fan: 'Fan',
      mask: 'Mask',
      necklace: 'Necklace',
      umbrella: 'Umbrella'
    };
    return icons[type] || 'Accessory';
  };

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
    return <AddOnsCategorySkeleton />;
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
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-10 px-5 sm:px-6 lg:flex-row lg:px-8">
        <aside className="hidden w-full max-w-xs shrink-0 lg:block">
          <div className="bg-white p-6">
            <div className="mb-6">
              <h1 className="font-vegawanty text-lg font-semibold uppercase tracking-widest text-secondary">Filters</h1>
            </div>
            <FiltersPanel type={type} />
          </div>
        </aside>

        <div className="flex-1 space-y-8">
          <header className="space-y-3 text-center lg:text-left">
            <p className="font-manrope text-xs uppercase tracking-[0.4em] text-secondary/70">Add-Ons</p>
            <div className="flex items-center justify-center gap-3 lg:justify-start">
              <h1 className="font-vegawanty text-4xl text-foreground sm:text-5xl capitalize">
                {type}{type === 'gloves' ? '' : 's'}
              </h1>
            </div>
            <p className="font-manrope text-sm text-secondary sm:text-base">
              {getTypeDescription(type)}
            </p>
          </header>

          <div className="flex flex-col gap-4 bg-white/90 py-4 backdrop-blur sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center justify-between sm:justify-start sm:gap-12">
              <p className="font-manrope text-xs text-secondary/80 sm:text-sm">
                Showing {((currentPage - 1) * ITEMS_PER_PAGE) + 1}-{Math.min(currentPage * ITEMS_PER_PAGE, totalItems)} of {totalItems} {type}s
              </p>
              <button
                type="button"
                onClick={toggleFilterDrawer}
                className="inline-flex items-center gap-2 rounded-full border border-secondary/30 px-3 py-1.5 text-xs font-medium text-secondary transition hover:border-secondary hover:text-secondary/90 lg:hidden"
              >
                <span className="h-2 w-2 rounded-full bg-secondary" />
                Filters
              </button>
            </div>
            <div className="flex items-center gap-2 sm:gap-3">
              <label htmlFor="sort-by" className="font-manrope text-xs uppercase tracking-wider text-secondary/60 sm:text-sm">
                Sort by
              </label>
              <select
                id="sort-by"
                value={sortBy}
                onChange={(event) => setSortBy(event.target.value)}
                className="w-40 rounded border border-secondary/30 bg-white px-3 py-2 text-sm text-secondary focus:border-secondary focus:outline-none"
              >
                {sortOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {addOns.length === 0 ? (
            <div className="text-center py-20">
              <div className="mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-secondary/10 mx-auto">
                <span className="font-vegawanty text-2xl font-semibold text-secondary">{getTypeIcon(type).charAt(0)}</span>
              </div>
              <h3 className="font-vegawanty text-xl text-foreground mb-2">No {type}s found</h3>
              <p className="font-manrope text-secondary/70">
                Try adjusting your filters to see more results.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:gap-8">
              {addOns.map((addon, index) => (
                <motion.article
                  key={addon.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="group flex h-full flex-col overflow-hidden bg-white transition hover:-translate-y-1"
                >
                  <Link href={`/addons/${addon.type}/${addon.id}`} className="flex h-full flex-col">
                    <div className="relative aspect-[4/5] w-full overflow-hidden bg-secondary/10">
                      {addon.pictures && addon.pictures.length > 0 ? (
                        <Image
                          src={'https:' + addon.pictures[0]}
                          alt={addon.name}
                          fill
                          className="object-cover transition duration-500 group-hover:scale-105"
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        />
                      ) : (
                        <div className="flex h-full items-center justify-center">
                          <div className="text-center">
                            <div className="mb-2 flex h-16 w-16 items-center justify-center rounded-full bg-secondary/20 mx-auto">
                              <span className="font-vegawanty text-xl font-semibold text-secondary">{getTypeIcon(addon.type).charAt(0)}</span>
                            </div>
                            <p className="font-manrope text-sm text-secondary/70">Image coming soon</p>
                          </div>
                        </div>
                      )}
                    </div>
                    <div className="flex flex-1 flex-col justify-between gap-0.5 px-1 py-2 md:gap-1 md:py-4">
                      <h2 className="font-manrope text-base font-semibold text-secondary sm:text-lg">{addon.name}</h2>
                      <div className="space-y-1">
                        <p className="font-manrope text-sm uppercase tracking-[0.35em] text-secondary/70">
                          From ₱{addon.metroManilaRate.toLocaleString()}
                        </p>
                        {addon.forSale && (
                          <p className="font-manrope text-xs text-secondary/60">
                            Sale: ₱{addon.forSale.toLocaleString()}
                          </p>
                        )}
                      </div>
                      <p className="font-manrope text-xs text-secondary/60 line-clamp-2">
                        {addon.description}
                      </p>
                    </div>
                  </Link>
                </motion.article>
              ))}
            </div>
          )}

          {/* Pagination Controls */}
          {totalItems > ITEMS_PER_PAGE && (
            <div className="flex items-center justify-center gap-2 pt-8">
              <button
                onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                disabled={currentPage === 1}
                className="flex items-center gap-1 rounded-full border border-secondary/30 px-3 py-2 text-sm font-medium text-secondary transition hover:border-secondary hover:text-secondary/90 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Previous
              </button>
              
              <div className="flex items-center gap-1">
                {Array.from({ length: Math.ceil(totalItems / ITEMS_PER_PAGE) }, (_, i) => i + 1)
                  .filter(page => {
                    const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);
                    return page === 1 || page === totalPages || Math.abs(page - currentPage) <= 1;
                  })
                  .map((page, index, array) => {
                    const showEllipsis = index > 0 && page - array[index - 1] > 1;
                    return (
                      <div key={page} className="flex items-center gap-1">
                        {showEllipsis && (
                          <span className="px-2 text-sm text-secondary/60">...</span>
                        )}
                        <button
                          onClick={() => setCurrentPage(page)}
                          className={`rounded-full px-3 py-2 text-sm font-medium transition ${
                            page === currentPage
                              ? 'bg-secondary text-white'
                              : 'text-secondary hover:bg-secondary/10'
                          }`}
                        >
                          {page}
                        </button>
                      </div>
                    );
                  })}
              </div>
              
              <button
                onClick={() => setCurrentPage(prev => Math.min(Math.ceil(totalItems / ITEMS_PER_PAGE), prev + 1))}
                disabled={currentPage >= Math.ceil(totalItems / ITEMS_PER_PAGE)}
                className="flex items-center gap-1 rounded-full border border-secondary/30 px-3 py-2 text-sm font-medium text-secondary transition hover:border-secondary hover:text-secondary/90 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          )}
        </div>
      </div>

      {isFilterDrawerOpen && (
        <div className="fixed inset-0 z-50 flex lg:hidden" aria-modal="true" role="dialog">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={toggleFilterDrawer} />
          <div className="relative z-10 h-full w-5/6 max-w-sm bg-background shadow-xl">
            <div className="flex items-center justify-between border-b border-secondary/20 px-4 py-4">
              <h2 className="font-manrope text-base font-semibold uppercase tracking-wider text-secondary">Filters</h2>
              <button
                type="button"
                onClick={toggleFilterDrawer}
                className="rounded-full border border-secondary/30 px-3 py-1 text-xs font-medium text-secondary transition hover:border-secondary"
              >
                Close
              </button>
            </div>
            <div className="h-full overflow-y-auto px-4 py-6">
              <FiltersPanel type={type} />
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
