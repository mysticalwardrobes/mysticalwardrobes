"use client";

import { useAtom } from "jotai";
import Image from "next/image";
import Link from "next/link";
import { 
  filterDrawerAtom, 
  priceRangeAtom, 
  sortByAtom,
  selectedTagsAtom,
  selectedColorsAtom,
  selectedBestForAtom,
  selectedSkirtStylesAtom,
  tagsSearchAtom,
  colorsSearchAtom,
  TAG_OPTIONS,
  COLOR_OPTIONS,
  BEST_FOR_OPTIONS,
  SKIRT_STYLE_OPTIONS
} from "./filters.store";
import { Gown } from "@/app/api/gowns/model";
import { useEffect, useState } from "react";
import React from "react";


interface GownsResponse {
  items: Gown[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

const sortOptions = [
  { value: "name", label: "Name A-Z" },
  { value: "name-desc", label: "Name Z-A" },
  { value: "price-low-high", label: "Price: Low to High" },
  { value: "price-high-low", label: "Price: High to Low" },
];

// Collection mapping from URL parameter to display name
const collectionMapping: Record<string, string> = {
  'modern-glamour': 'Modern Glamour',
  'royal-historical-eras': 'Royal Historical Eras',
  'fairytale-fantasy': 'Fairytale Fantasy',
  'nature-seasonal-realms': 'Nature Seasonal Realms',
  'celestial-dreamlike': 'Celestial Dreamlike',
  'ocean-realm': 'Ocean Realm',
  'cultural-and-mythic-icons': 'Cultural and Mythic Icons',
  'all': 'All Gowns'
};

// Collection descriptions mapping
const collectionDescriptions: Record<string, string> = {
  'Modern Glamour': 'Where elegance meets bold sophistication. Inspired by red-carpet icons and luxurious soirées, these gowns capture modern beauty, confidence, and shine. Ideal for fashion-forward events and evening galas.',
  'Royal Historical Eras': 'A tribute to timeless grandeur and aristocratic charm. Inspired by the grand eras that shaped timeless couture—from the opulence of Rococo and Baroque courts to the refined grace of Victorian and Regency society. Each gown reimagines the artistry of the past through corseted silhouettes, intricate details, and lavish fabrics—capturing the romance and nobility of queens, empresses, and heroines from history.',
  'Fairytale Fantasy': 'Where imagination and magic come alive. Romantic, whimsical, and full of wonder, these gowns bring stories to life—woven from dreams, enchantment, and pure fairytale. Designed for dreamers and believers, every piece captures the feeling of stepping into your own fantasy moment.',
  'Nature Seasonal Realms': 'A reflection of nature\'s elegance and ever-changing beauty. From the frost of winter to the bloom of spring, this collection is inspired by the seasons\' colors, moods, and harmony. Each gown embodies the softness and vitality of the natural world, creating an organic grace that feels timeless and serene.',
  'Celestial Dreamlike': 'For those who shine among the stars. Radiant and ethereal, these gowns are inspired by the cosmos—by moonlight, galaxies, and the divine heavens. Flowing fabrics and shimmering tones mirror the night sky, turning every wearer into a celestial vision of grace and light.',
  'Ocean Realm': 'Born from the depths of legend and the beauty of the sea. This collection embodies the mystery of sirens and the grace of ocean goddesses—where every gown mirrors the rhythm of the waves and the glow of moonlit waters. Designed for those who find strength in serenity, it captures the calm, allure, and eternal magic of the sea.',
  'Cultural and Mythic Icons': 'These gowns pay homage to mythological figures, beloved characters, and cultural masterpieces. Each creation reimagines legends through fashion—blending tradition and fantasy into couture that transcends eras and cultures alike.'
};

// Function to get display name from URL parameter
const getCollectionDisplayName = (urlParam: string): string => {
  return collectionMapping[urlParam] || urlParam;
};

// Function to get collection description
const getCollectionDescription = (displayName: string): string => {
  return collectionDescriptions[displayName] || 'Prom, Junior-Senior Balls, Graduation ball, Masquerade ball and Public Balls';
};

interface FilterCheckboxGroupProps {
  title: string;
  options: string[];
  selectedValues: string[];
  onSelectionChange: (values: string[]) => void;
}

function FilterCheckboxGroup({ title, options, selectedValues, onSelectionChange }: FilterCheckboxGroupProps) {
  const handleCheckboxChange = (option: string, checked: boolean) => {
    if (checked) {
      onSelectionChange([...selectedValues, option]);
    } else {
      onSelectionChange(selectedValues.filter(value => value !== option));
    }
  };

  return (
    <section className="space-y-3 border-b border-secondary/20 pb-6">
      <h2 className="font-vegawanty text-sm font-semibold uppercase tracking-wider">{title}</h2>
      <div className="space-y-2 max-h-48 overflow-y-auto">
        {options.map((option) => (
          <label key={option} className="flex items-center gap-3 text-sm text-secondary cursor-pointer hover:text-secondary/80 transition-colors duration-200">
            <input 
              type="checkbox" 
              checked={selectedValues.includes(option)}
              onChange={(e) => handleCheckboxChange(option, e.target.checked)}
              className="h-4 w-4 rounded border-secondary/40 text-secondary focus:ring-secondary focus:ring-2" 
            />
            <span className="select-none">{option}</span>
          </label>
        ))}
      </div>
    </section>
  );
}

interface SearchableFilterGroupProps {
  title: string;
  options: string[];
  selectedValues: string[];
  onSelectionChange: (values: string[]) => void;
  searchValue: string;
  onSearchChange: (value: string) => void;
}

function SearchableFilterGroup({ 
  title, 
  options, 
  selectedValues, 
  onSelectionChange, 
  searchValue, 
  onSearchChange 
}: SearchableFilterGroupProps) {
  const handleCheckboxChange = (option: string, checked: boolean) => {
    if (checked) {
      onSelectionChange([...selectedValues, option]);
    } else {
      onSelectionChange(selectedValues.filter(value => value !== option));
    }
  };

  // Filter options based on search
  const filteredOptions = options.filter(option =>
    option.toLowerCase().includes(searchValue.toLowerCase())
  );

  return (
    <section className="space-y-3 border-b border-secondary/20 pb-6">
      <h2 className="font-vegawanty text-sm font-semibold uppercase tracking-wider">{title}</h2>
      
      {/* Search input */}
      <div className="relative">
        <input
          type="text"
          placeholder={`Search ${title.toLowerCase()}...`}
          value={searchValue}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full rounded border border-secondary/30 bg-white px-3 py-2 pl-8 text-sm focus:border-secondary focus:outline-none transition-all duration-200 hover:border-secondary/50"
        />
        <svg 
          className="absolute left-2.5 top-2.5 h-4 w-4 text-secondary/50" 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </div>

      {/* Selected count indicator */}
      {selectedValues.length > 0 && (
        <div className="text-xs text-secondary/70">
          {selectedValues.length} selected
        </div>
      )}

      {/* Options list */}
      <div className="space-y-2 max-h-48 overflow-y-auto">
        {filteredOptions.length === 0 ? (
          <p className="text-sm text-secondary/60 italic">No {title.toLowerCase()} found</p>
        ) : (
          filteredOptions.map((option) => (
            <label key={option} className="flex items-center gap-3 text-sm text-secondary cursor-pointer hover:text-secondary/80 transition-colors duration-200">
              <input 
                type="checkbox" 
                checked={selectedValues.includes(option)}
                onChange={(e) => handleCheckboxChange(option, e.target.checked)}
                className="h-4 w-4 rounded border-secondary/40 text-secondary focus:ring-secondary focus:ring-2" 
              />
              <span className="select-none">{option}</span>
            </label>
          ))
        )}
      </div>
    </section>
  );
}

function FiltersPanel() {
  const [priceRange, setPriceRange] = useAtom(priceRangeAtom);
  const [selectedTags, setSelectedTags] = useAtom(selectedTagsAtom);
  const [selectedColors, setSelectedColors] = useAtom(selectedColorsAtom);
  const [selectedBestFor, setSelectedBestFor] = useAtom(selectedBestForAtom);
  const [selectedSkirtStyles, setSelectedSkirtStyles] = useAtom(selectedSkirtStylesAtom);
  const [tagsSearch, setTagsSearch] = useAtom(tagsSearchAtom);
  const [colorsSearch, setColorsSearch] = useAtom(colorsSearchAtom);

  const handleMinChange = (value: number) => {
    setPriceRange(([, max]) => {
      const clampedValue = Math.max(0, Math.min(value, max));
      return [clampedValue, max];
    });
  };

  const handleMaxChange = (value: number) => {
    setPriceRange(([min]) => {
      const clampedValue = Math.min(4000, Math.max(value, min));
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
              max={4000}
              step={100}
              value={priceRange[0]}
              onChange={(event) => handleMinChange(Number(event.target.value))}
              className="accent-secondary transition-all duration-200 hover:accent-secondary/80"
            />
            <input
              aria-label="Maximum price"
              type="range"
              min={0}
              max={4000}
              step={100}
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
              max={4000}
              value={priceRange[0]}
              onChange={(event) => handleMinChange(Number(event.target.value))}
              className="w-full rounded border border-secondary/30 bg-white px-3 py-2 text-sm focus:border-secondary focus:outline-none transition-all duration-200 hover:border-secondary/50"
            />
            <span className="text-xs font-medium text-secondary/60">to</span>
            <input
              type="number"
              inputMode="numeric"
              min={0}
              max={4000}
              value={priceRange[1]}
              onChange={(event) => handleMaxChange(Number(event.target.value))}
              className="w-full rounded border border-secondary/30 bg-white px-3 py-2 text-sm focus:border-secondary focus:outline-none transition-all duration-200 hover:border-secondary/50"
            />
          </div>
        </div>
      </section>

      <div className="animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
        <FilterCheckboxGroup 
          title="Best For" 
          options={BEST_FOR_OPTIONS}
          selectedValues={selectedBestFor}
          onSelectionChange={setSelectedBestFor}
        />
      </div>
      
      <div className="animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
        <FilterCheckboxGroup 
          title="Skirt Style" 
          options={SKIRT_STYLE_OPTIONS}
          selectedValues={selectedSkirtStyles}
          onSelectionChange={setSelectedSkirtStyles}
        />
      </div>

      <div className="animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
        <SearchableFilterGroup 
          title="Color" 
          options={COLOR_OPTIONS}
          selectedValues={selectedColors}
          onSelectionChange={setSelectedColors}
          searchValue={colorsSearch}
          onSearchChange={setColorsSearch}
        />
      </div>

      <div className="animate-fade-in-up" style={{ animationDelay: '0.5s' }}>
        <SearchableFilterGroup 
          title="Tags" 
          options={TAG_OPTIONS}
          selectedValues={selectedTags}
          onSelectionChange={setSelectedTags}
          searchValue={tagsSearch}
          onSearchChange={setTagsSearch}
        />
      </div>
    </div>
  );
}

export default function CollectionsAllPage({ params }: { params: Promise<{ name: string }> }) {
  const { name } = React.use(params);
  const displayName = getCollectionDisplayName(name);
  const description = getCollectionDescription(displayName);

  const [isFilterDrawerOpen, setIsFilterDrawerOpen] = useAtom(filterDrawerAtom);
  const [sortBy, setSortBy] = useAtom(sortByAtom);
  const [priceRange] = useAtom(priceRangeAtom);
  const [selectedTags] = useAtom(selectedTagsAtom);
  const [selectedColors] = useAtom(selectedColorsAtom);
  const [selectedBestFor] = useAtom(selectedBestForAtom);
  const [selectedSkirtStyles] = useAtom(selectedSkirtStylesAtom);
  
  const [gowns, setGowns] = useState<Gown[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [totalItems, setTotalItems] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  const toggleFilterDrawer = () => {
    setIsFilterDrawerOpen((isOpen) => !isOpen);
  };

  const fetchGowns = async () => {
    try {
      setLoading(true);
      const searchParams = new URLSearchParams();
      
      // Add collection filter
      if (name !== 'all') {
        searchParams.set('collection', displayName);
      }
      
      // Add price range filter
      if (priceRange[0] > 0) {
        searchParams.set('minPrice', priceRange[0].toString());
      }
      if (priceRange[1] < 4000) {
        searchParams.set('maxPrice', priceRange[1].toString());
      }
      
      // Add new filter parameters
      if (selectedTags.length > 0) {
        selectedTags.forEach(tag => searchParams.append('tags', tag));
      }
      if (selectedColors.length > 0) {
        selectedColors.forEach(color => searchParams.append('colors', color));
      }
      if (selectedBestFor.length > 0) {
        selectedBestFor.forEach(bestFor => searchParams.append('bestFor', bestFor));
      }
      if (selectedSkirtStyles.length > 0) {
        selectedSkirtStyles.forEach(style => searchParams.append('skirtStyles', style));
      }
      
      // Add sorting
      searchParams.set('sortBy', sortBy);
      searchParams.set('page', currentPage.toString());
      searchParams.set('limit', '12');

      const response = await fetch(`/api/gowns?${searchParams.toString()}`);
      if (!response.ok) {
        throw new Error('Failed to fetch gowns');
      }
      
      const data: GownsResponse = await response.json();
      setGowns(data.items);
      setTotalItems(data.total);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch gowns');
    } finally {
      setLoading(false);
    }
  };

  const getGownImage = (gown: Gown) => {
    // Check long gown pictures first
    if (gown.longGownPictures.length > 0 && gown.longGownPictures[0] && gown.longGownPictures[0] !== 'null') {
      return gown.longGownPictures[0];
    }
    // Check filipiniana pictures
    if (gown.filipinianaPictures.length > 0 && gown.filipinianaPictures[0] && gown.filipinianaPictures[0] !== 'null') {
      return gown.filipinianaPictures[0];
    }
    // Check pixie pictures
    if (gown.pixiePictures.length > 0 && gown.pixiePictures[0] && gown.pixiePictures[0] !== 'null') {
      return gown.pixiePictures[0];
    }
    // Check train pictures
    if (gown.trainPictures.length > 0 && gown.trainPictures[0] && gown.trainPictures[0] !== 'null') {
      return gown.trainPictures[0];
    }
    
    // Log gowns without images for debugging
    console.log(`Gown without images: ${gown.name} (ID: ${gown.id})`, {
      longGownPictures: gown.longGownPictures,
      filipinianaPictures: gown.filipinianaPictures,
      pixiePictures: gown.pixiePictures,
      trainPictures: gown.trainPictures
    });
    
    // Return fallback image
    return '/assets/sample_gown-1.jpg';
  };

  const hasValidImages = (gown: Gown) => {
    return (
      (gown.longGownPictures.length > 0 && gown.longGownPictures[0] && gown.longGownPictures[0] !== 'null') ||
      (gown.filipinianaPictures.length > 0 && gown.filipinianaPictures[0] && gown.filipinianaPictures[0] !== 'null') ||
      (gown.pixiePictures.length > 0 && gown.pixiePictures[0] && gown.pixiePictures[0] !== 'null') ||
      (gown.trainPictures.length > 0 && gown.trainPictures[0] && gown.trainPictures[0] !== 'null')
    );
  };

  useEffect(() => {
    fetchGowns();
  }, [name, displayName, sortBy, priceRange, selectedTags, selectedColors, selectedBestFor, selectedSkirtStyles, currentPage]);

  // Reset to page 1 when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [name, displayName, sortBy, priceRange, selectedTags, selectedColors, selectedBestFor, selectedSkirtStyles]);

  return (
    <main className="bg-background py-10 text-secondary md:py-16">
      <section className="mx-auto flex w-full max-w-7xl flex-col gap-10 px-5 sm:px-6 lg:flex-row lg:px-8">
        <aside className="hidden w-full max-w-xs shrink-0 lg:block">
          <div className="bg-white p-6 animate-slide-in-left">
            <div className="mb-6">
              <h1 className="font-vegawanty text-lg font-semibold uppercase tracking-widest text-secondary">Filters</h1>
            </div>
            <FiltersPanel />
          </div>
        </aside>

        <div className="flex-1 space-y-8 animate-slide-in-right">
          <header className="space-y-3 text-center lg:text-left animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
            <p className="font-manrope text-xs uppercase tracking-[0.4em] text-secondary/70">Collections</p>
            <h1 className="font-vegawanty text-4xl text-foreground sm:text-5xl">{displayName}</h1>
            <p className="font-manrope text-sm text-secondary sm:text-base">
              {description}
            </p>
          </header>

          <div className="flex flex-col gap-4 bg-white/90 py-4 backdrop-blur sm:flex-row sm:items-center sm:justify-between animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            <div className="flex items-center justify-between sm:justify-start sm:gap-12">
              <div className="flex flex-col gap-1">
                <p className="font-manrope text-xs text-secondary/80 sm:text-sm">
                  {loading ? 'Loading...' : `Showing ${((currentPage - 1) * 12) + 1}-${Math.min(currentPage * 12, totalItems)} of ${totalItems} gowns`}
                </p>
              </div>
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

          {loading ? (
            <div className="grid grid-cols-2 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:gap-8">
              {Array.from({ length: 6 }).map((_, index) => (
                <div key={index} className="group flex h-full flex-col overflow-hidden bg-white animate-pulse">
                  <div className="relative aspect-[4/5] w-full overflow-hidden bg-secondary/10"></div>
                  <div className="flex flex-1 flex-col justify-between gap-0.5 px-1 py-2 md:gap-1 md:px-4 md:py-4">
                    <div className="h-4 bg-secondary/20 rounded w-3/4"></div>
                    <div className="h-3 bg-secondary/20 rounded w-1/2"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : error ? (
            <div className="text-center py-8 animate-fade-in-up">
              <p className="text-secondary/70">{error}</p>
              <button 
                onClick={fetchGowns}
                className="mt-4 px-4 py-2 bg-secondary text-white rounded hover:bg-secondary/90 transition-all duration-200 hover:scale-105"
              >
                Try Again
              </button>
            </div>
          ) : gowns.length === 0 ? (
            <div className="text-center py-8 animate-fade-in-up">
              <p className="text-secondary/70">No gowns found matching your criteria.</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:gap-8">
              {gowns.map((gown, index) => (
                <article
                  key={gown.id}
                  className="group flex h-full flex-col overflow-hidden bg-white transition-all duration-300 hover:-translate-y-2 hover:shadow-lg animate-fade-in-up"
                  style={{ animationDelay: `${0.3 + index * 0.1}s` }}
                >
                  <Link href={`/gown/${gown.id}`} className="flex h-full flex-col">
                    <div className="relative aspect-[4/5] w-full overflow-hidden bg-secondary/10 group">
                      <Image
                        src={getGownImage(gown).startsWith('http') ? getGownImage(gown) : 'https:' + getGownImage(gown)}
                        alt={gown.name}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                        sizes="(max-width: 640px) 80vw, (max-width: 1024px) 45vw, 30vw"
                      />
                      {/* Show indicator if gown has no valid images */}
                      {!hasValidImages(gown) && (
                        <div className="absolute top-2 right-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full font-medium animate-pulse">
                          No Image
                        </div>
                      )}
                    </div>
                    <div className="flex flex-1 flex-col justify-between gap-0.5 px-1 py-2 md:gap-1 md:px-4 md:py-4">
                      <h2 className="font-manrope text-base font-semibold text-secondary sm:text-lg group-hover:text-secondary/80 transition-colors duration-200">{gown.name}</h2>
                      <p className="font-manrope text-sm uppercase tracking-[0.35em] text-secondary/70">
                        FROM Php {(gown.metroManilaRate > 0 ? gown.metroManilaRate : gown.pixieMetroManilaRate).toLocaleString()}
                      </p>
                    </div>
                  </Link>
                </article>
              ))}
            </div>
          )}

          {/* Pagination Controls */}
          {totalItems > 12 && (
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
                {Array.from({ length: Math.ceil(totalItems / 12) }, (_, i) => i + 1)
                  .filter(page => {
                    const totalPages = Math.ceil(totalItems / 12);
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
                          className={`rounded-full px-3 py-2 text-sm font-medium transition-all duration-200 hover:scale-105 ${
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
                onClick={() => setCurrentPage(prev => Math.min(Math.ceil(totalItems / 12), prev + 1))}
                disabled={currentPage >= Math.ceil(totalItems / 12)}
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
      </section>

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
              <FiltersPanel />
            </div>
          </div>
        </div>
      )}
    </main>
  );
}

