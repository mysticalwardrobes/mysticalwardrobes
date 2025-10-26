"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import FadeInOnScroll from "@/components/FadeInOnScroll";
import type { CustomMadeGown } from "@/app/api/custom-made-gowns/model";

export default function CustomMadeGownsPage() {
  const [customGowns, setCustomGowns] = useState<CustomMadeGown[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCustomGowns = async () => {
      try {
        setIsLoading(true);
        setError(null);
        
        const response = await fetch('/api/custom-made-gowns');
        
        if (!response.ok) {
          throw new Error('Failed to fetch custom made gowns');
        }
        
        const data = await response.json();
        setCustomGowns(data.items || []);
      } catch (err) {
        console.error('Error fetching custom made gowns:', err);
        setError(err instanceof Error ? err.message : 'Failed to load custom made gowns');
      } finally {
        setIsLoading(false);
      }
    };

    fetchCustomGowns();
  }, []);

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <FadeInOnScroll delay={0.1} className="w-full">
        <div className="w-full h-fit bg-cover bg-center py-16 md:py-24 px-6 md:px-16 text-center">
          <div className="max-w-4xl mx-auto">
            <h1 className="font-vegawanty text-5xl md:text-7xl text-foreground mb-6">
              Custom Creations
            </h1>
            <p className="font-vegawanty text-2xl md:text-3xl text-secondary mb-8">
              A Portfolio of Dreams Brought to Life
            </p>
            <p className="font-manrope text-lg md:text-xl text-foreground/80 max-w-3xl mx-auto leading-relaxed">
              Each gown in our custom collection tells a unique story. From cosplay masterpieces to 
              one-of-a-kind formal wear, these creations showcase the magic that happens when 
              imagination meets expert craftsmanship.
            </p>
          </div>
        </div>
      </FadeInOnScroll>

      {/* Portfolio Grid Section */}
      <FadeInOnScroll delay={0.2} className="w-full">
        <div className="px-6 md:px-16 py-12">
          <div className="max-w-7xl mx-auto">
            <h2 className="font-vegawanty text-3xl md:text-4xl text-foreground text-center mb-12">
              Our Custom Creations
            </h2>

            {isLoading ? (
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                {Array.from({ length: 6 }).map((_, index) => (
                  <div
                    key={index}
                    className="bg-white/95 rounded shadow-md p-6 animate-pulse"
                  >
                    <div className="aspect-[3/4] bg-foreground/10 rounded-lg mb-4"></div>
                    <div className="h-6 bg-foreground/10 rounded mb-2"></div>
                    <div className="h-4 bg-foreground/10 rounded mb-2"></div>
                    <div className="h-4 bg-foreground/10 rounded w-2/3"></div>
                  </div>
                ))}
              </div>
            ) : error ? (
              <div className="text-center py-12">
                <p className="font-manrope text-lg text-foreground/80 mb-4">
                  {error}
                </p>
                <button
                  onClick={() => window.location.reload()}
                  className="font-manrope text-sm bg-secondary text-background px-6 py-2 rounded hover:bg-secondary/90 transition-colors duration-300"
                >
                  Try Again
                </button>
              </div>
            ) : customGowns.length === 0 ? (
              <div className="text-center py-12">
                <p className="font-manrope text-lg text-foreground/80">
                  No custom creations available at the moment. Check back soon for new additions!
                </p>
              </div>
              ) : (
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                {customGowns.map((gown) => (
                  <CustomGownCard key={gown.id} gown={gown} />
                ))}
              </div>
            )}
          </div>
        </div>
      </FadeInOnScroll>

      {/* Custom Request CTA Section */}
      <FadeInOnScroll delay={0.3} className="w-full">
        <div className="px-6 md:px-16 py-16 bg-gradient-to-br from-secondary/5 to-tertiary/5">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="font-vegawanty text-3xl md:text-4xl text-foreground mb-6">
              Don't See What You're Looking For?
            </h2>
            <p className="font-manrope text-lg text-foreground/80 mb-8 max-w-2xl mx-auto">
              We love bringing unique visions to life! If you have a custom design in mind that's 
              not in our collection, we'd be delighted to create something special just for you.
            </p>
            
            <div className="bg-white/95 rounded-lg shadow-md p-8 mb-8">
              <h3 className="font-vegawanty text-xl text-foreground mb-4">
                Our Custom Design Process
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
                <div className="text-center">
                  <div className="w-12 h-12 bg-secondary text-background rounded-full flex items-center justify-center mx-auto mb-3 font-manrope font-bold">
                    1
                  </div>
                  <h4 className="font-manrope font-semibold text-foreground mb-2">Consultation</h4>
                  <p className="font-manrope text-sm text-foreground/70">
                    Share your vision, inspiration, and requirements with our design team
                  </p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-secondary text-background rounded-full flex items-center justify-center mx-auto mb-3 font-manrope font-bold">
                    2
                  </div>
                  <h4 className="font-manrope font-semibold text-foreground mb-2">Design & Quote</h4>
                  <p className="font-manrope text-sm text-foreground/70">
                    We create a custom design and provide a detailed quote for your approval
                  </p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-secondary text-background rounded-full flex items-center justify-center mx-auto mb-3 font-manrope font-bold">
                    3
                  </div>
                  <h4 className="font-manrope font-semibold text-foreground mb-2">Creation</h4>
                  <p className="font-manrope text-sm text-foreground/70">
                    Our skilled artisans bring your dream gown to life with meticulous attention to detail
                  </p>
                </div>
              </div>
            </div>

            <Link
              href="/contact"
              className="inline-block font-manrope text-lg bg-secondary text-background hover:bg-secondary/90 border-2 border-secondary hover:border-secondary/90 rounded px-8 py-3 transition-colors duration-300"
            >
              Request a Custom Design
            </Link>
          </div>
        </div>
      </FadeInOnScroll>

      {/* Terms Section */}
      <FadeInOnScroll delay={0.4} className="w-full">
        <div className="px-6 md:px-16 py-12">
          <div className="max-w-4xl mx-auto text-center">
            <div className="bg-white/95 rounded-lg shadow-md p-8 border border-foreground/10">
              <h3 className="font-vegawanty text-2xl text-foreground mb-4">
                Important Information
              </h3>
              <p className="font-manrope text-foreground/80 mb-6">
                Before placing a custom order, please review our terms and conditions to understand 
                our process, pricing, and policies.
              </p>
              <Link
                href="/custom-made-terms"
                className="inline-block font-manrope text-sm bg-transparent border-2 border-secondary text-secondary hover:bg-secondary hover:text-background rounded px-6 py-2 transition-colors duration-300"
              >
                Review Custom Made Terms
              </Link>
            </div>
          </div>
        </div>
      </FadeInOnScroll>
    </div>
  );
}

interface CustomGownCardProps {
  gown: CustomMadeGown;
}

function CustomGownCard({ gown }: CustomGownCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  // Combine all images into one array
  const allImages = [
    ...gown.longGownPicture,
    ...gown.pixiePicture,
    ...gown.hoodPicture
  ];

  const primaryImage = allImages[0] || '/assets/sample_gown-1.jpg';

  return (
    <Link href={`/custom-made-gowns/${gown.id}`}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white/95 rounded shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 cursor-pointer"
      >
      {/* Image Section */}
      <div className="relative aspect-[3/4] overflow-hidden">
        <Image
          src={primaryImage.startsWith('http') ? primaryImage : 'https:' + primaryImage}
          alt={gown.title}
          fill
          className="object-cover transition-transform duration-300 hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
      </div>

      {/* Content Section */}
      <div className="p-6">
        <h3 className="font-vegawanty text-xl text-foreground mb-2">
          {gown.title}
        </h3>
        
        <div className="flex items-center gap-2 mb-3">
          <span className="inline-block bg-secondary/10 text-secondary text-xs px-2 py-1 rounded-full font-manrope">
            {gown.gownFor}
          </span>
          {gown.location && (
            <span className="text-foreground/60 text-sm font-manrope">
              • {gown.location}
            </span>
          )}
        </div>

        {gown.preOrderPrice > 0 && (
          <p className="font-manrope font-semibold text-lg text-foreground mb-3">
            ₱{gown.preOrderPrice.toLocaleString()}
          </p>
        )}
{/* 
        {gown.description && (
          <div className="mb-4">
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="text-left w-full"
            >
              <p className={`font-manrope text-sm text-foreground/80 leading-relaxed transition-all duration-300 ${
                isExpanded ? 'line-clamp-none' : 'line-clamp-3'
              }`}>
                {gown.description}
              </p>
              <span className="text-secondary text-xs font-manrope mt-1 inline-block">
                {isExpanded ? 'Show less' : 'Read more'}
              </span>
            </button>
          </div>
        )} */}
      </div>
      </motion.div>
    </Link>
  );
}
