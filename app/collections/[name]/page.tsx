"use client";

import { useAtom } from "jotai";
import Image, { type StaticImageData } from "next/image";
import Link from "next/link";
import { filterDrawerAtom, priceRangeAtom, sortByAtom } from "./filters.store";

import sampleGown from "@/public/assets/sample_gown-1.jpg";
import { useEffect } from "react";
import React from "react";

interface PageProps {
  params: { name: string };
}

interface GownCard {
  id: number;
  name: string;
  price: string;
  image: StaticImageData;
}

const dummyGowns: GownCard[] = Array.from({ length: 12 }, (_, index) => ({
  id: index + 1,
  name: "GownName",
  price: "FROM Php 2,998",
  image: sampleGown,
}));

const sortOptions = [
  { value: "best-selling", label: "Best Selling" },
  { value: "newest", label: "Newest" },
  { value: "price-low-high", label: "Price: Low to High" },
  { value: "price-high-low", label: "Price: High to Low" },
];

const tagOptions = ["Great Gatsby", "Gala", "Vintage", "Heavenly"];

interface FilterCheckboxGroupProps {
  title: string;
  options: string[];
}

function FilterCheckboxGroup({ title, options }: FilterCheckboxGroupProps) {
  return (
    <section className="space-y-3 border-b border-secondary/20 pb-6">
      <h2 className="font-vegawanty text-sm font-semibold uppercase tracking-wider">{title}</h2>
      <div className="space-y-2">
        {options.map((option) => (
          <label key={option} className="flex items-center gap-3 text-sm text-secondary">
            <input type="checkbox" className="h-4 w-4 rounded border-secondary/40 text-secondary focus:ring-secondary" />
            <span>{option}</span>
          </label>
        ))}
      </div>
    </section>
  );
}

function FiltersPanel() {
  const [priceRange, setPriceRange] = useAtom(priceRangeAtom);

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
              max={4000}
              step={100}
              value={priceRange[0]}
              onChange={(event) => handleMinChange(Number(event.target.value))}
              className="accent-secondary"
            />
            <input
              aria-label="Maximum price"
              type="range"
              min={0}
              max={4000}
              step={100}
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
              max={4000}
              value={priceRange[0]}
              onChange={(event) => handleMinChange(Number(event.target.value))}
              className="w-full rounded border border-secondary/30 bg-white px-3 py-2 text-sm focus:border-secondary focus:outline-none"
            />
            <span className="text-xs font-medium text-secondary/60">to</span>
            <input
              type="number"
              inputMode="numeric"
              min={0}
              max={4000}
              value={priceRange[1]}
              onChange={(event) => handleMaxChange(Number(event.target.value))}
              className="w-full rounded border border-secondary/30 bg-white px-3 py-2 text-sm focus:border-secondary focus:outline-none"
            />
          </div>
        </div>
      </section>

      <FilterCheckboxGroup title="Sleeves" options={["Standard", "Filipiniana"]} />
      <FilterCheckboxGroup title="Skirt" options={["Flowy/Fairytale Gown", "Mid to Ball Gown", "Trails", "Pixie Versions"]} />
      <FilterCheckboxGroup title="Waistline" options={["Natural Waist", "Empire", "Drop Waist", "Corseted"]} />

      <section className="space-y-3 border-b border-secondary/20 pb-6">
        <h2 className="font-vegawanty text-sm font-semibold uppercase tracking-wider">Color</h2>
        <select className="w-full rounded border border-secondary/30 bg-white px-3 py-2 text-sm focus:border-secondary focus:outline-none">
          <option value="all">All</option>
          <option value="blush">Blush</option>
          <option value="champagne">Champagne</option>
          <option value="ivory">Ivory</option>
          <option value="pastel">Pastels</option>
        </select>
      </section>

      <section className="space-y-3">
        <h2 className="font-vegawanty text-sm font-semibold uppercase tracking-wider">Tags</h2>
        <input
          type="search"
          placeholder="Search tags..."
          className="w-full rounded border border-secondary/30 bg-white px-3 py-2 text-sm focus:border-secondary focus:outline-none"
        />
        <div className="flex flex-wrap gap-2">
          {tagOptions.map((tag) => (
            <button
              key={tag}
              type="button"
              className="rounded-full border border-secondary/30 bg-white px-3 py-1 text-xs font-medium text-secondary transition hover:border-secondary"
            >
              {tag}
            </button>
          ))}
        </div>
      </section>
    </div>
  );
}

export default function CollectionsAllPage({ params }: { params: Promise<{ name: string }> }) {
  const { name } = React.use(params);


  const [isFilterDrawerOpen, setIsFilterDrawerOpen] = useAtom(filterDrawerAtom);
  const [sortBy, setSortBy] = useAtom(sortByAtom);

  const toggleFilterDrawer = () => {
    setIsFilterDrawerOpen((isOpen) => !isOpen);
  };

  useEffect(
    () => {
      
    }, []
  )

  return (
    <main className="bg-background py-10 text-secondary md:py-16">
      <section className="mx-auto flex w-full max-w-7xl flex-col gap-10 px-5 sm:px-6 lg:flex-row lg:px-8">
        <aside className="hidden w-full max-w-xs shrink-0 lg:block">
          <div className="bg-white p-6">
            <div className="mb-6">
              <h1 className="font-vegawanty text-lg font-semibold uppercase tracking-widest text-secondary">Filters</h1>
            </div>
            <FiltersPanel />
          </div>
        </aside>

        <div className="flex-1 space-y-8">
          <header className="space-y-3 text-center lg:text-left">
            <p className="font-manrope text-xs uppercase tracking-[0.4em] text-secondary/70">Collections</p>
            <h1 className="font-vegawanty text-4xl text-foreground sm:text-5xl">{name === 'all'? 'All Gowns' : name}</h1>
            <p className="font-manrope text-sm text-secondary sm:text-base">
              Prom, Junior-Senior Balls, Graduation ball, Masquerade ball and Public Balls
            </p>
          </header>

          <div className="flex flex-col gap-4 bg-white/90 py-4 backdrop-blur sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center justify-between sm:justify-start sm:gap-12">
              <p className="font-manrope text-xs text-secondary/80 sm:text-sm">Showing 1-20 of 54 gowns</p>
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

          <div className="grid grid-cols-2 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:gap-8">
            {dummyGowns.map((gown) => (
              <article
                key={gown.id}
                className="group flex h-full flex-col overflow-hidden rounded bg-white transition hover:-translate-y-1"
              >
                <Link href={`/gowns/${gown.id}`} className="flex h-full flex-col">
                  <div className="relative aspect-[4/5] w-full overflow-hidden bg-secondary/10">
                    <Image
                      src={gown.image}
                      alt={gown.name}
                      fill
                      className="object-cover transition duration-500 group-hover:scale-105"
                      sizes="(max-width: 640px) 80vw, (max-width: 1024px) 45vw, 30vw"
                    />
                  </div>
                  <div className="flex flex-1 flex-col justify-between gap-0.5 px-1 py-2 md:gap-1 md:px-4 md:py-4">
                    <h2 className="font-manrope text-base font-semibold text-secondary sm:text-lg">{gown.name}</h2>
                    <p className="font-manrope text-sm uppercase tracking-[0.35em] text-secondary/70">{gown.price}</p>
                  </div>
                </Link>
              </article>
            ))}
          </div>

          <nav aria-label="Pagination" className="flex items-center justify-center gap-1 py-4">
            <button
              type="button"
              className="hidden h-9 w-9 items-center justify-center rounded-full border border-secondary/30 text-xs font-medium text-secondary transition hover:border-secondary hover:text-secondary/90 sm:flex sm:items-center sm:justify-center"
            >
              &lsaquo;
            </button>
            {[1, 2, 3].map((pageNumber) => (
              <button
                key={pageNumber}
                type="button"
                className={`h-9 w-9 rounded-full text-xs font-semibold transition ${
                  pageNumber === 1
                    ? "bg-secondary text-white shadow-sm"
                    : "border border-secondary/30 text-secondary hover:border-secondary hover:text-secondary/90"
                }`}
              >
                {pageNumber}
              </button>
            ))}
            <span className="mx-2 text-sm font-medium text-secondary/60">...</span>
            <button
              type="button"
              className="hidden h-9 w-9 items-center justify-center rounded-full border border-secondary/30 text-xs font-medium text-secondary transition hover:border-secondary hover:text-secondary/90 sm:flex sm:items-center sm:justify-center"
            >
              11
            </button>
            <button
              type="button"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-secondary/30 text-xs font-medium text-secondary transition hover:border-secondary hover:text-secondary/90"
            >
              &rsaquo;
            </button>
          </nav>
        </div>
      </section>

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
              <FiltersPanel />
            </div>
          </div>
        </div>
      )}
    </main>
  );
}

