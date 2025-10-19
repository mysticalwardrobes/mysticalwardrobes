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
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2">
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

export default function PromQueensPage() {
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
    640: 1
  };

  if (loading) {
    return (
      <main className="bg-background py-10 text-secondary md:py-16">
        <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
          {/* Header */}
          <header className="mb-12 text-center">
            <p className="font-manrope text-xs uppercase tracking-[0.4em] text-secondary/70">Gallery</p>
            <h1 className="font-vegawanty text-4xl text-foreground sm:text-5xl md:text-6xl">
              Mystical Wardrobe's Prom Queens
            </h1>
            <p className="mx-auto mt-4 max-w-2xl font-manrope text-sm text-secondary sm:text-base">
              Discover the magic we've created together. Each image tells a story of transformation, 
              elegance, and the unforgettable moments when our clients became the queens of their own fairytales.
            </p>
          </header>

          <GallerySkeleton />
        </div>
      </main>
    );
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
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        {/* Header */}
        <header className="mb-12 text-center">
          <p className="font-manrope text-xs uppercase tracking-[0.4em] text-secondary/70">Gallery</p>
          <h1 className="font-vegawanty text-4xl text-foreground sm:text-5xl md:text-6xl">
            Mystical Wardrobe's Prom Queens
          </h1>
          <p className="mx-auto mt-4 max-w-2xl font-manrope text-sm text-secondary sm:text-base">
            Discover the magic we've created together. Each image tells a story of transformation, 
            elegance, and the unforgettable moments when our clients became the queens of their own fairytales.
          </p>
          {promQueens.length > 0 && (
            <p className="mt-2 font-manrope text-sm text-secondary/60">
              {promQueens.length} beautiful moments captured
            </p>
          )}
        </header>

        {/* Gallery */}
        {promQueens.length === 0 ? (
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
    </main>
  );
}
