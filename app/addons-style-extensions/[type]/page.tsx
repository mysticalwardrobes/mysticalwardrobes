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

type PriceRange = [number, number];
const DEFAULT_PRICE_RANGE: PriceRange = [0, 10000];
const DEFAULT_SORT_BY = "name";
const ITEMS_PER_PAGE = 15;

const priceRangeAtom = atom<PriceRange>(DEFAULT_PRICE_RANGE);
const sortByAtom = atom<string>(DEFAULT_SORT_BY);
const filterDrawerAtom = atom(false);
const currentPageAtom = atom(1);
const totalItemsAtom = atom(0);
const addonSearchAtom = atom<string>('');

const sortOptions = [
  { value: "name", label: "Name A-Z" },
  { value: "price-low-high", label: "Price: Low to High" },
  { value: "price-high-low", label: "Price: High to Low" },
];

function FiltersPanel({ type }: { type: string }) {
  const [priceRange, setPriceRange] = useAtom(priceRangeAtom);

  // Determine if this is a style extension or add-on
  const isStyleExtension = type === 'hood' || type === 'train' || type === 'wings';
  const sectionTitle = isStyleExtension ? 'Style Extensions' : 'Accessories';

  const handleMinChange = (value: number) => {
    setPriceRange(([, max]) => {
      const clampedValue = Math.max(0, Math.min(value, max));
      return [clampedValue, max];
    });
  };

  const handleMaxChange = (value: number) => {
    setPriceRange(([min]) => {
      const clampedValue = Math.min(10000, Math.max(value, min));
      return [min, clampedValue];
    });
  };

  return (
    <div className="space-y-6 text-secondary">
      <section className="space-y-4 border-b border-secondary/20 pb-6 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
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
              max={10000}
              step={50}
              value={priceRange[0]}
              onChange={(event) => handleMinChange(Number(event.target.value))}
              className="accent-secondary transition-all duration-200 hover:accent-secondary/80"
            />
            <input
              aria-label="Maximum price"
              type="range"
              min={0}
              max={10000}
              step={50}
              value={priceRange[1]}
              onChange={(event) => handleMaxChange(Number(event.target.value))}
              className="accent-secondary transition-all duration-200 hover:accent-secondary/80"
            />
          </div>
          <div className="flex items-center gap-2">
            <input
              type="number"
              inputMode="numeric"
              min={0}
              max={10000}
              value={priceRange[0]}
              onChange={(event) => handleMinChange(Number(event.target.value))}
              className="w-full rounded border border-secondary/30 bg-white px-3 py-2 text-sm focus:border-secondary focus:outline-none transition-all duration-200 hover:border-secondary/50"
            />
            <span className="text-xs font-medium text-secondary/60">to</span>
            <input
              type="number"
              inputMode="numeric"
              min={0}
              max={10000}
              value={priceRange[1]}
              onChange={(event) => handleMaxChange(Number(event.target.value))}
              className="w-full rounded border border-secondary/30 bg-white px-3 py-2 text-sm focus:border-secondary focus:outline-none transition-all duration-200 hover:border-secondary/50"
            />
          </div>
        </div>
      </section>

      <section className="space-y-3 border-b border-secondary/20 pb-6 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
        <h2 className="font-vegawanty text-sm font-semibold uppercase tracking-wider">Categories</h2>
        <div className="space-y-4">
          <Link
            href="/addons"
            className="block text-sm text-secondary hover:text-secondary/90 transition-colors duration-200 hover:translate-x-1 font-semibold"
          >
            All Categories
          </Link>

          {/* Style Extensions */}
          <div>
            <h3 className="font-manrope text-xs uppercase tracking-wider text-secondary/60 mb-2">Style Extensions</h3>
            <div className="space-y-2 ml-2">
              <Link
                href="/addons/hood"
                className={`block text-sm capitalize transition-all duration-200 hover:translate-x-1 ${'hood' === type
                  ? 'text-secondary font-semibold'
                  : 'text-secondary/70 hover:text-secondary/90'
                  }`}
              >
                Hoods
              </Link>
              <Link
                href="/addons-style-extensions/train"
                className={`block text-sm capitalize transition-all duration-200 hover:translate-x-1 ${'train' === type
                  ? 'text-secondary font-semibold'
                  : 'text-secondary/70 hover:text-secondary/90'
                  }`}
              >
                Trains
              </Link>
              <Link
                href="/addons-style-extensions/wings"
                className={`block text-sm capitalize transition-all duration-200 hover:translate-x-1 ${'wings' === type
                  ? 'text-secondary font-semibold'
                  : 'text-secondary/70 hover:text-secondary/90'
                  }`}
              >
                Wings
              </Link>
            </div>
          </div>

          {/* Accessories */}
          <div>
            <h3 className="font-manrope text-xs uppercase tracking-wider text-secondary/60 mb-2">Accessories</h3>
            <div className="space-y-2 ml-2">
              {['petticoat', 'crown', 'gloves', 'fan', 'mask', 'necklace', 'umbrella'].map((category, index) => (
                <Link
                  key={category}
                  href={`/addons/${category}`}
                  className={`block text-sm capitalize transition-all duration-200 hover:translate-x-1 ${category === type
                    ? 'text-secondary font-semibold'
                    : 'text-secondary/70 hover:text-secondary/90'
                    }`}
                  style={{ animationDelay: `${0.3 + index * 0.05}s` }}
                >
                  {category === 'necklace' ? 'Necklaces' : category === 'gloves' ? 'Gloves' : category + 's'}
                </Link>
              ))}
            </div>
          </div>
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
  const [addonSearch, setAddonSearch] = useAtom(addonSearchAtom);
  const [isSearching, setIsSearching] = useState(false);

  const toggleFilterDrawer = () => {
    setIsFilterDrawerOpen((isOpen) => !isOpen);
  };

  useEffect(() => {
    const fetchAddOns = async () => {
      try {
        // Only show full loading skeleton on initial load
        if (addOns.length === 0) {
          setLoading(true);
        } else {
          setIsSearching(true);
        }

        const searchParams = new URLSearchParams({
          type: type,
          sortBy: sortBy,
          minPrice: priceRange[0].toString(),
          maxPrice: priceRange[1].toString(),
          page: currentPage.toString(),
          limit: ITEMS_PER_PAGE.toString(),
        });

        // Add search query
        if (addonSearch.trim()) {
          searchParams.set('search', addonSearch.trim());
        }

        console.log(`Fetching addons for type: "${type}"`);
        const response = await fetch(`/api/addons?${searchParams}`);
        if (!response.ok) {
          throw new Error('Failed to fetch add-ons');
        }
        const data = await response.json();
        console.log(`API response for type "${type}":`, data);

        // Handle both response formats: { items: [], total: number } or just []
        const items = Array.isArray(data) ? data : (data.items || []);
        const total = Array.isArray(data) ? data.length : (data.total || 0);

        console.log(`Found ${items.length} items for type "${type}"`);
        setAddOns(items);
        setTotalItems(total);
      } catch (err) {
        console.error('Error fetching addons:', err);
        setError(err instanceof Error ? err.message : 'Failed to load add-ons');
      } finally {
        setLoading(false);
        setIsSearching(false);
      }
    };

    fetchAddOns();
  }, [type, sortBy, priceRange, currentPage, addonSearch]);

  // Reset to page 1 when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [type, sortBy, priceRange, addonSearch, setCurrentPage]);

  const isStyleExtension = type === 'hood' || type === 'train' || type === 'wings';
  const sectionName = isStyleExtension ? 'Style Extensions' : 'Accessories';

  const getTypeIcon = (type: string) => {
    const icons: Record<string, string> = {
      crown: 'Crown',
      hood: 'Hood',
      train: 'Train',
      petticoat: 'Petticoat',
      gloves: 'Gloves',
      fan: 'Fan',
      mask: 'Mask',
      necklace: 'Necklace',
      umbrella: 'Umbrella',
      wings: 'Wings'
    };
    return icons[type] || 'Accessory';
  };

  const getTypeDescription = (type: string) => {
    const descriptions: Record<string, string> = {
      crown: 'Regal and enchanting crowns for your magical moments',
      hood: 'Dramatic hoods with elegant details and flowing fabrics',
      train: 'Elegant trains that add drama and sophistication to your gown',
      petticoat: 'Perfect petticoats to create the ideal silhouette',
      gloves: 'Elegant gloves to complete your sophisticated look',
      fan: 'Beautiful fans for a touch of vintage elegance',
      mask: 'Mysterious masks for your masquerade moments',
      necklace: 'Stunning necklaces to add sparkle to your ensemble',
      umbrella: 'Elegant umbrellas for a romantic and dreamy touch',
      wings: 'Ethereal wings to add a magical and enchanting touch'
    };
    return descriptions[type] || 'Beautiful accessories to complete your look';
  };

  const getPluralLabel = (value: string) => {
    if (value === 'necklace') return 'Necklaces';
    if (value === 'gloves' || value === 'wings') return value.charAt(0).toUpperCase() + value.slice(1);
    return value.charAt(0).toUpperCase() + value.slice(1) + 's';
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
          <div className="bg-white p-6 animate-slide-in-left">
            <div className="mb-6">
              <h1 className="font-vegawanty text-lg font-semibold uppercase tracking-widest text-secondary">Filters</h1>
            </div>
            <FiltersPanel type={type} />
          </div>
        </aside>

        <div className="flex-1 space-y-8 animate-slide-in-right">
          <header className="space-y-3 text-center lg:text-left animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
            <p className="font-manrope text-xs uppercase tracking-[0.4em] text-secondary/70">{sectionName}</p>
            <div className="flex items-center justify-center gap-3 lg:justify-start">
              <h1 className="font-vegawanty text-4xl text-foreground sm:text-5xl capitalize">
                {getPluralLabel(type)}
              </h1>
            </div>
            <p className="font-manrope text-sm text-secondary sm:text-base">
              {getTypeDescription(type)}
            </p>
          </header>

          {/* Search Bar */}
          <div className="animate-fade-in-up" style={{ animationDelay: '0.15s' }}>
            <div className="relative">
              <input
                type="text"
                placeholder="Search by name..."
                value={addonSearch}
                onChange={(e) => setAddonSearch(e.target.value)}
                className="w-full rounded-lg border border-secondary/30 bg-white px-4 py-3 pl-12 text-sm text-secondary placeholder:text-secondary/50 focus:border-secondary focus:outline-none focus:ring-2 focus:ring-secondary/20 transition-all duration-200 hover:border-secondary/50"
              />
              <svg
                className="absolute left-4 top-3.5 h-5 w-5 text-secondary/50"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              {addonSearch && (
                <button
                  onClick={() => setAddonSearch('')}
                  className="absolute right-4 top-3.5 text-secondary/50 hover:text-secondary transition-colors"
                  aria-label="Clear search"
                >
                  <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              )}
            </div>
          </div>

          {/* Why Petticoats Matter Banner - Only show on petticoat page */}
          {type === 'petticoat' && (
            <div className="bg-gradient-to-r from-secondary/10 to-secondary/5 rounded-lg p-6 border-l-4 border-secondary animate-fade-in-up" style={{ animationDelay: '0.15s' }}>
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
          )}

          <div className="flex flex-col gap-4 bg-white/90 py-4 backdrop-blur sm:flex-row sm:items-center sm:justify-between animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            <div className="flex items-center justify-between sm:justify-start sm:gap-12">
              <p className="font-manrope text-xs text-secondary/80 sm:text-sm">
                Showing {((currentPage - 1) * ITEMS_PER_PAGE) + 1}-{Math.min(currentPage * ITEMS_PER_PAGE, totalItems)} of {totalItems} {getPluralLabel(type).toLowerCase()}
              </p>
              <button
                type="button"
                onClick={toggleFilterDrawer}
                className="inline-flex items-center gap-2 rounded-full border border-secondary/30 px-3 py-1.5 text-xs font-medium text-secondary transition-all duration-200 hover:border-secondary hover:text-secondary/90 hover:scale-105 lg:hidden"
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
                className="w-40 rounded border border-secondary/30 bg-white px-3 py-2 text-sm text-secondary focus:border-secondary focus:outline-none transition-all duration-200 hover:border-secondary/50"
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
            <div className="text-center py-20 animate-fade-in-up">
              <div className="mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-secondary/10 mx-auto">
                <span className="font-vegawanty text-2xl font-semibold text-secondary">{getTypeIcon(type).charAt(0)}</span>
              </div>
              <h3 className="font-vegawanty text-xl text-foreground mb-2">No {getPluralLabel(type).toLowerCase()} found</h3>
              <p className="font-manrope text-secondary/70">
                Try adjusting your filters to see more results.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:gap-8">
              {addOns.map((addon, index) => (
                <motion.article
                  key={addon.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="group flex h-full flex-col overflow-hidden bg-white transition-all duration-300 hover:-translate-y-2 hover:shadow-lg animate-fade-in-up"
                  style={{ animationDelay: `${0.3 + index * 0.1}s` }}
                >
                  <Link href={`/addons/${addon.type}/${addon.id}`} className="flex h-full flex-col">
                    <div className="relative aspect-[4/5] w-full overflow-hidden bg-secondary/10">
                      {addon.pictures && addon.pictures.length > 0 ? (
                        <Image
                          src={addon.pictures[0].startsWith('http') ? addon.pictures[0] : 'https:' + addon.pictures[0]}
                          alt={addon.name}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-110"
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
                      <h2 className="font-manrope text-base font-semibold text-secondary sm:text-lg group-hover:text-secondary/80 transition-colors duration-200">{addon.name}</h2>
                      <div className="space-y-1">
                        <p className="font-manrope text-sm uppercase tracking-[0.35em] text-secondary/70">
                          From ₱{addon.metroManilaRate.toLocaleString()}
                        </p>
                        {/* {addon.forSaleRate && (
                          <p className="font-manrope text-xs text-secondary/60">
                            Sale: ₱{addon.forSaleRate.toLocaleString()}
                          </p>
                        )} */}
                      </div>
                      {/* <p className="font-manrope text-xs text-secondary/60 line-clamp-2">
                        {addon.description}
                      </p> */}
                    </div>
                  </Link>
                </motion.article>
              ))}
            </div>
          )}

          {/* Pagination Controls */}
          {totalItems > ITEMS_PER_PAGE && (
            <div className="flex items-center justify-center gap-2 pt-8 animate-fade-in-up" style={{ animationDelay: '0.5s' }}>
              <button
                onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                disabled={currentPage === 1}
                className="flex items-center gap-1 rounded-full border border-secondary/30 px-3 py-2 text-sm font-medium text-secondary transition-all duration-200 hover:border-secondary hover:text-secondary/90 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
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
                          className={`rounded-full px-3 py-2 text-sm font-medium transition-all duration-200 hover:scale-105 ${page === currentPage
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
                className="flex items-center gap-1 rounded-full border border-secondary/30 px-3 py-2 text-sm font-medium text-secondary transition-all duration-200 hover:border-secondary hover:text-secondary/90 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
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
        <div className="fixed inset-0 z-50 flex lg:hidden animate-fade-in" aria-modal="true" role="dialog">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity duration-300" onClick={toggleFilterDrawer} />
          <div className="relative z-10 h-full w-5/6 max-w-sm bg-background shadow-xl animate-slide-in-right">
            <div className="flex items-center justify-between border-b border-secondary/20 px-4 py-4">
              <h2 className="font-manrope text-base font-semibold uppercase tracking-wider text-secondary">Filters</h2>
              <button
                type="button"
                onClick={toggleFilterDrawer}
                className="rounded-full border border-secondary/30 px-3 py-1 text-xs font-medium text-secondary transition-all duration-200 hover:border-secondary hover:scale-105"
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
