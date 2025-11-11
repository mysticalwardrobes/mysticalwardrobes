"use client";

import { useAtom } from "jotai";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
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
import { getCollectionDisplayName, getCollectionDescription } from "@/app/config/collections";
import { useAnalytics } from "@/hooks/useAnalytics";


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
  // Global state from atoms
  const [priceRange, setPriceRange] = useAtom(priceRangeAtom);
  const [selectedTags, setSelectedTags] = useAtom(selectedTagsAtom);
  const [selectedColors, setSelectedColors] = useAtom(selectedColorsAtom);
  const [selectedBestFor, setSelectedBestFor] = useAtom(selectedBestForAtom);
  const [selectedSkirtStyles, setSelectedSkirtStyles] = useAtom(selectedSkirtStylesAtom);
  const [tagsSearch, setTagsSearch] = useAtom(tagsSearchAtom);
  const [colorsSearch, setColorsSearch] = useAtom(colorsSearchAtom);

  // Local state for temporary filter values
  const [localPriceRange, setLocalPriceRange] = useState(priceRange);
  const [localSelectedTags, setLocalSelectedTags] = useState(selectedTags);
  const [localSelectedColors, setLocalSelectedColors] = useState(selectedColors);
  const [localSelectedBestFor, setLocalSelectedBestFor] = useState(selectedBestFor);
  const [localSelectedSkirtStyles, setLocalSelectedSkirtStyles] = useState(selectedSkirtStyles);

  // Sync local state when global state changes (e.g., when cleared)
  useEffect(() => {
    setLocalPriceRange(priceRange);
    setLocalSelectedTags(selectedTags);
    setLocalSelectedColors(selectedColors);
    setLocalSelectedBestFor(selectedBestFor);
    setLocalSelectedSkirtStyles(selectedSkirtStyles);
  }, [priceRange, selectedTags, selectedColors, selectedBestFor, selectedSkirtStyles]);

  const handleMinChange = (value: number) => {
    setLocalPriceRange(([, max]) => {
      const clampedValue = Math.max(0, Math.min(value, max));
      return [clampedValue, max];
    });
  };

  const handleMaxChange = (value: number) => {
    setLocalPriceRange(([min]) => {
      const clampedValue = Math.min(15000, Math.max(value, min));
      return [min, clampedValue];
    });
  };

  const handleApplyFilters = () => {
    setPriceRange(localPriceRange);
    setSelectedTags(localSelectedTags);
    setSelectedColors(localSelectedColors);
    setSelectedBestFor(localSelectedBestFor);
    setSelectedSkirtStyles(localSelectedSkirtStyles);
  };

  const handleClearFilters = () => {
    const defaultPriceRange: [number, number] = [0, 15000];
    setLocalPriceRange(defaultPriceRange);
    setLocalSelectedTags([]);
    setLocalSelectedColors([]);
    setLocalSelectedBestFor([]);
    setLocalSelectedSkirtStyles([]);
    setTagsSearch('');
    setColorsSearch('');
    
    // Also update global state immediately for clear
    setPriceRange(defaultPriceRange);
    setSelectedTags([]);
    setSelectedColors([]);
    setSelectedBestFor([]);
    setSelectedSkirtStyles([]);
  };

  // Check if there are any active filters
  const hasActiveFilters = 
    localPriceRange[0] > 0 || 
    localPriceRange[1] < 15000 || 
    localSelectedTags.length > 0 || 
    localSelectedColors.length > 0 || 
    localSelectedBestFor.length > 0 || 
    localSelectedSkirtStyles.length > 0;

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
              max={15000}
              step={100}
              value={localPriceRange[0]}
              onChange={(event) => handleMinChange(Number(event.target.value))}
              className="accent-secondary transition-all duration-200 hover:accent-secondary/80"
            />
            <input
              aria-label="Maximum price"
              type="range"
              min={0}
              max={15000}
              step={100}
              value={localPriceRange[1]}
              onChange={(event) => handleMaxChange(Number(event.target.value))}
              className="accent-secondary transition-all duration-200 hover:accent-secondary/80"
            />
          </div>
          <div className="flex items-center gap-2">
            <input
              type="number"
              inputMode="numeric"
              min={0}
              max={15000}
              value={localPriceRange[0]}
              onChange={(event) => handleMinChange(Number(event.target.value))}
              className="w-full rounded border border-secondary/30 bg-white px-3 py-2 text-sm focus:border-secondary focus:outline-none transition-all duration-200 hover:border-secondary/50"
            />
            <span className="text-xs font-medium text-secondary/60">to</span>
            <input
              type="number"
              inputMode="numeric"
              min={0}
              max={15000}
              value={localPriceRange[1]}
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
          selectedValues={localSelectedBestFor}
          onSelectionChange={setLocalSelectedBestFor}
        />
      </div>
      
      <div className="animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
        <FilterCheckboxGroup 
          title="Skirt Style" 
          options={SKIRT_STYLE_OPTIONS}
          selectedValues={localSelectedSkirtStyles}
          onSelectionChange={setLocalSelectedSkirtStyles}
        />
      </div>

      <div className="animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
        <SearchableFilterGroup 
          title="Color" 
          options={COLOR_OPTIONS}
          selectedValues={localSelectedColors}
          onSelectionChange={setLocalSelectedColors}
          searchValue={colorsSearch}
          onSearchChange={setColorsSearch}
        />
      </div>

      <div className="animate-fade-in-up" style={{ animationDelay: '0.5s' }}>
        <SearchableFilterGroup 
          title="Tags" 
          options={TAG_OPTIONS}
          selectedValues={localSelectedTags}
          onSelectionChange={setLocalSelectedTags}
          searchValue={tagsSearch}
          onSearchChange={setTagsSearch}
        />
      </div>

      {/* Apply and Clear Buttons */}
      <div className="flex flex-col gap-2 pt-4 animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
        <button
          onClick={handleApplyFilters}
          className="w-full rounded-lg bg-secondary px-4 py-3 font-manrope text-sm font-semibold uppercase tracking-wider text-white transition-all duration-200 hover:bg-secondary/90 hover:scale-105 hover:shadow-md active:scale-100"
        >
          Apply Filters
        </button>
        {hasActiveFilters && (
          <button
            onClick={handleClearFilters}
            className="w-full rounded-lg border border-secondary/30 px-4 py-2 font-manrope text-xs font-medium uppercase tracking-wider text-secondary transition-all duration-200 hover:border-secondary hover:bg-secondary/5 hover:scale-105 active:scale-100"
          >
            Clear All
          </button>
        )}
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
  const [selectedTags, setSelectedTags] = useAtom(selectedTagsAtom);
  const [selectedColors, setSelectedColors] = useAtom(selectedColorsAtom);
  const [selectedBestFor, setSelectedBestFor] = useAtom(selectedBestForAtom);
  const [selectedSkirtStyles, setSelectedSkirtStyles] = useAtom(selectedSkirtStylesAtom);
  const searchParams = useSearchParams();
  const serializedParams = searchParams.toString();
  
  const [gowns, setGowns] = useState<Gown[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [totalItems, setTotalItems] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const { trackGownClick } = useAnalytics();

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
      if (priceRange[1] < 15000) {
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

  // Helper function to normalize and optimize image URLs from Contentful
  // Uses Contentful's image API to optimize images, avoiding Vercel's optimization limits
  const normalizeImageUrl = (url: string, width?: number, height?: number, quality: number = 80): string => {
    if (!url || url === 'null' || url.trim() === '') {
      return '/assets/sample_gown-1.jpg';
    }
    
    let normalizedUrl = url;
    
    // Normalize the URL format
    if (url.startsWith('//')) {
      normalizedUrl = `https:${url}`;
    } else if (!url.startsWith('http://') && !url.startsWith('https://') && !url.startsWith('/')) {
      normalizedUrl = `https://${url}`;
    } else if (url.startsWith('http://') || url.startsWith('https://')) {
      normalizedUrl = url;
    } else {
      // Local path
      return url;
    }
    
    // If it's a Contentful CDN URL, add optimization parameters
    if (normalizedUrl.includes('images.ctfassets.net') || normalizedUrl.includes('ctfassets.net')) {
      try {
        const urlObj = new URL(normalizedUrl);
        // Only add parameters if they don't already exist (preserve existing params)
        if (width && !urlObj.searchParams.has('w')) urlObj.searchParams.set('w', width.toString());
        if (height && !urlObj.searchParams.has('h')) urlObj.searchParams.set('h', height.toString());
        if (!urlObj.searchParams.has('q')) urlObj.searchParams.set('q', quality.toString());
        if (!urlObj.searchParams.has('fm')) urlObj.searchParams.set('fm', 'webp'); // Use WebP format for better compression
        return urlObj.toString();
      } catch (e) {
        // If URL parsing fails, return normalized URL as-is
        return normalizedUrl;
      }
    }
    
    return normalizedUrl;
  };

  const getGownImage = (gown: Gown) => {
    // Check if only "Pixie" is selected in skirt styles
    const isOnlyPixieSelected = selectedSkirtStyles.length === 1 && selectedSkirtStyles.includes('Pixie');
    
    if (isOnlyPixieSelected) {
      // If only Pixie is selected, prioritize pixie pictures
      if (gown.pixiePictures.length > 0 && gown.pixiePictures[0] && gown.pixiePictures[0] !== 'null') {
        return gown.pixiePictures[0];
      }
      // Fallback to other images if pixie not available
      if (gown.longGownPictures.length > 0 && gown.longGownPictures[0] && gown.longGownPictures[0] !== 'null') {
        return gown.longGownPictures[0];
      }
      if (gown.filipinianaPictures.length > 0 && gown.filipinianaPictures[0] && gown.filipinianaPictures[0] !== 'null') {
        return gown.filipinianaPictures[0];
      }
      if (gown.trainPictures.length > 0 && gown.trainPictures[0] && gown.trainPictures[0] !== 'null') {
        return gown.trainPictures[0];
      }
    } else {
      // If other skirt styles are selected (or none selected), prioritize long gown pictures
      if (gown.longGownPictures.length > 0 && gown.longGownPictures[0] && gown.longGownPictures[0] !== 'null') {
        return gown.longGownPictures[0];
      }
      // Fallback to other images if long gown not available
      if (gown.filipinianaPictures.length > 0 && gown.filipinianaPictures[0] && gown.filipinianaPictures[0] !== 'null') {
        return gown.filipinianaPictures[0];
      }
      if (gown.pixiePictures.length > 0 && gown.pixiePictures[0] && gown.pixiePictures[0] !== 'null') {
        return gown.pixiePictures[0];
      }
      if (gown.trainPictures.length > 0 && gown.trainPictures[0] && gown.trainPictures[0] !== 'null') {
        return gown.trainPictures[0];
      }
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

  useEffect(() => {
    const tagParams = searchParams.getAll('tags');
    const colorParams = searchParams.getAll('colors');
    const bestForParams = searchParams.getAll('bestFor');
    const skirtStyleParams = searchParams.getAll('skirtStyles');

    setSelectedTags(tagParams);
    setSelectedColors(colorParams);
    setSelectedBestFor(bestForParams);
    setSelectedSkirtStyles(skirtStyleParams);
  }, [serializedParams, setSelectedTags, setSelectedColors, setSelectedBestFor, setSelectedSkirtStyles]);

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
                  <Link 
                    href={`/gown/${gown.id}`} 
                    onClick={() => trackGownClick(gown.id)}
                    className="flex h-full flex-col"
                  >
                    <div className="relative aspect-[4/5] w-full overflow-hidden bg-secondary/10 group">
                      <Image
                        src={normalizeImageUrl(getGownImage(gown), 600, 750, 85)}
                        alt={gown.name}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                        sizes="(max-width: 640px) 80vw, (max-width: 1024px) 45vw, 30vw"
                        unoptimized={true}
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

