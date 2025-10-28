"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import Masonry from "react-masonry-css";
import { PromQueen, PromQueensResponse } from "@/app/api/promqueens/model";

// Modal component for full-size image viewing
interface ImageModalProps {
  isOpen: boolean;
  onClose: () => void;
  promQueen: PromQueen | null;
}

function ImageModal({ isOpen, onClose, promQueen }: ImageModalProps) {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!promQueen) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="relative max-w-4xl max-h-[90vh] mx-4"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={onClose}
              className="absolute -top-12 right-0 text-white text-2xl hover:text-secondary transition-colors z-10"
              aria-label="Close modal"
            >
              ✕
            </button>
            
            <div className="relative">
              <Image
                src={promQueen.pictureUrl!}
                alt={promQueen.clientName || 'Prom Queen'}
                width={800}
                height={1200}
                className="max-w-full max-h-[80vh] object-contain rounded-lg shadow-2xl"
                priority
              />
              
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6 rounded-b-lg">
                <h3 className="font-vegawanty text-2xl text-white mb-2">
                  {promQueen.clientName || 'Mystical Wardrobes Client'}
                </h3>
                {promQueen.gownName && (
                  <p className="font-manrope text-sm text-white/80">
                    Wore: {promQueen.gownName}
                  </p>
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// Gallery item component
interface GalleryItemProps {
  promQueen: PromQueen;
  index: number;
  onImageClick: (promQueen: PromQueen) => void;
}

function GalleryItem({ promQueen, index, onImageClick }: GalleryItemProps) {
  // Create varied heights for more dynamic masonry layout
  const heightVariations = [
    'h-64', 'h-72', 'h-80', 'h-96', 'h-[20rem]', 'h-[24rem]', 'h-[28rem]', 'h-[32rem]'
  ];
  const randomHeight = heightVariations[index % heightVariations.length];
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="break-inside-avoid mb-4"
    >
      <div
        className="group cursor-pointer overflow-hidden rounded-sm bg-white shadow-md transition-all duration-300 hover:shadow-xl"
        onClick={() => onImageClick(promQueen)}
      >
        <div className={`relative overflow-hidden ${randomHeight}`}> 
          <Image
            src={promQueen.pictureUrl!}
            alt={promQueen.clientName || 'Prom Queen'}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>
      </div>
    </motion.div>
  );
}

// Loading skeleton component
function GallerySkeleton() {
  const heightVariations = [
    'h-64', 'h-72', 'h-80', 'h-96', 'h-[20rem]', 'h-[24rem]', 'h-[28rem]', 'h-[32rem]'
  ];
  
  return (
    <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2">
      {Array.from({ length: 12 }).map((_, index) => {
        const randomHeight = heightVariations[index % heightVariations.length];
        return (
          <div key={index} className="break-inside-avoid mb-4">
            <div className="animate-pulse">
              <div className={`bg-secondary/20 rounded-sm ${randomHeight}`}></div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default function PortfolioPage() {
  const [promQueens, setPromQueens] = useState<PromQueen[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedPromQueen, setSelectedPromQueen] = useState<PromQueen | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchPromQueens = async () => {
      try {
        const response = await fetch('/api/promqueens');
        if (!response.ok) {
          throw new Error('Failed to fetch prom queens');
        }
        const data: PromQueensResponse = await response.json();
        setPromQueens(data.items || []);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load prom queens');
      } finally {
        setLoading(false);
      }
    };

    fetchPromQueens();
  }, []);

  const handleImageClick = (promQueen: PromQueen) => {
    setSelectedPromQueen(promQueen);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedPromQueen(null);
  };

  // Masonry breakpoints - more columns for better variety
  const breakpointColumnsObj = {
    default: 4,
    1200: 3,
    768: 2,
    640: 2
  };

  return (
    <main className="bg-background">
      {/* About Us Section */}
      <section className="py-16 md:py-24 px-5 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          {/* Header with Tagline */}
          <header className="mb-16 text-center">
            <p className="font-manrope text-xs uppercase tracking-[0.4em] text-secondary/70">Our Story</p>
            <h1 className="font-vegawanty text-4xl text-foreground sm:text-5xl md:text-6xl mt-3">
              Portfolio
            </h1>
            <p className="font-vegawanty text-2xl md:text-3xl text-secondary mt-2 italic">
              Where Fairytales Come to Life
            </p>
          </header>

          {/* About Us Content */}
          <div className="space-y-12 md:space-y-16">
            {/* About Us */}
            <div className="max-w-4xl mx-auto">
              <h2 className="font-vegawanty text-3xl md:text-4xl text-foreground mb-6">
                About Us
              </h2>
              <p className="font-manrope text-base md:text-lg text-secondary leading-relaxed">
                Mystical Wardrobes creates a curated collection of rare, mystical and enchanting gowns—transformative looks that make every woman's dream attire accessible for unforgettable events.
              </p>
            </div>

            {/* What We Solve */}
            <div className="max-w-4xl mx-auto">
              <h2 className="font-vegawanty text-3xl md:text-4xl text-foreground mb-6">
                What We Solve
              </h2>
              <p className="font-manrope text-base md:text-lg text-secondary leading-relaxed">
                Finding a unique, themed gown that feels fairytale and truly enchanting is hard. Custom is pricey (and uncertain), and special designs are rare—so many end up compromising their vision.
              </p>
            </div>

            {/* What We Offer */}
            <div className="max-w-4xl mx-auto">
              <h2 className="font-vegawanty text-3xl md:text-4xl text-foreground mb-6">
                What We Offer
              </h2>
              <p className="font-manrope text-base md:text-lg text-secondary leading-relaxed">
                We offer a rental collection of magical, fairytale-inspired gowns—unique, enchanting, and ready to wear. Browse our catalogue or visit us in person, try them on, and choose the one you love—all at a fraction of the cost of a custom gown. We prioritize ready-to-wear rentals, and we also accept custom work case-by-case, based on design and timeline.
              </p>
            </div>

            {/* What We Envision */}
            <div className="max-w-4xl mx-auto">
              <h2 className="font-vegawanty text-3xl md:text-4xl text-foreground mb-6">
                What We Envision
              </h2>
              <p className="font-manrope text-base md:text-lg text-secondary leading-relaxed">
                A welcoming haven for enchanting fairytale fashion. Every client, whatever the theme, can step into their story with confidence. We continually refine our work—focusing on unique design, inclusive sizing, and genuine care.
              </p>
            </div>

            {/* Why Choose Us */}
            <div className="max-w-4xl mx-auto">
              <h2 className="font-vegawanty text-3xl md:text-4xl text-foreground mb-6">
                Why Choose Us
              </h2>
              <ul className="space-y-4 font-manrope text-base md:text-lg text-secondary">
                <li className="flex items-start">
                  <span className="text-secondary mr-3 mt-1">✦</span>
                  <span className="leading-relaxed">
                    Curated in-house originals in ready-to-wear fairytale themes (Enchanted, Ethereal, Bridgerton, and more)
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="text-secondary mr-3 mt-1">✦</span>
                  <span className="leading-relaxed">
                    See the magic first: View our catalogue or try-on sessions with transparent pricing and simple policies
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="text-secondary mr-3 mt-1">✦</span>
                  <span className="leading-relaxed">
                    Inclusive sizing, with new releases up to a 40-inch waistline
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="text-secondary mr-3 mt-1">✦</span>
                  <span className="leading-relaxed">
                    Spellbinding finishing touches: accessories and add-ons to complete your look
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Prom Queens Gallery Section */}
      <section className="bg-background py-16 md:py-24 text-secondary border-t border-secondary/10">
        <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
          {/* Gallery Header */}
          <header className="mb-12 text-center">
            <p className="font-manrope text-xs uppercase tracking-[0.4em] text-secondary/70">Gallery</p>
            <h2 className="font-vegawanty text-4xl text-foreground sm:text-5xl md:text-6xl mt-3">
              Prom Queens
            </h2>
            <p className="mx-auto mt-4 max-w-2xl font-manrope text-sm text-secondary sm:text-base">
              Discover the magic we've created together. Each image tells a story of transformation, 
              elegance, and the unforgettable moments when our clients became the queens of their own fairytales.
            </p>
            {!loading && promQueens.length > 0 && (
              <p className="mt-2 font-manrope text-sm text-secondary/60">
                {promQueens.length} beautiful moments captured
              </p>
            )}
          </header>

          {/* Gallery Content */}
          {loading ? (
            <GallerySkeleton />
          ) : error ? (
            <div className="text-center py-20">
              <p className="font-manrope text-lg text-secondary/70">{error}</p>
            </div>
          ) : promQueens.length === 0 ? (
            <div className="text-center py-20">
              <p className="font-manrope text-lg text-secondary/70">
                No prom queens to display at the moment. Check back soon for magical moments!
              </p>
            </div>
          ) : (
            <Masonry
              breakpointCols={breakpointColumnsObj}
              className="flex -ml-4 w-auto"
              columnClassName="pl-4 bg-clip-padding"
            >
              {promQueens.map((promQueen, index) => (
                <GalleryItem
                  key={promQueen.id}
                  promQueen={promQueen}
                  index={index}
                  onImageClick={handleImageClick}
                />
              ))}
            </Masonry>
          )}

          {/* Modal */}
          <ImageModal
            isOpen={isModalOpen}
            onClose={handleCloseModal}
            promQueen={selectedPromQueen}
          />
        </div>
      </section>
    </main>
  );
}

