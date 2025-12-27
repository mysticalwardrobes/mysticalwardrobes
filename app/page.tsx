"use client";

import React, { useCallback, useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import type { PanInfo } from "framer-motion";
import Image from "next/image";
import heroBg from "@/public/assets/CoverPhoto.webp"
import Logo4fg from "@/public/assets/Mystical-Wardrobes-Logo-04-foreground.svg"
import Icon6 from "@/public/assets/symbols/Mystical-Wardrobes-Icons-09-06.svg"

import sampleGown1 from "@/public/assets/sample_gown-1.jpg";

import exploreAddons from "@/public/assets/explore/Addons.jpg"
import exploreCustomMadeGowns from "@/public/assets/explore/CustomMadeGowns.jpg"
import exploreRentalGowns from "@/public/assets/explore/RentalGowns.jpg"


import FadeInOnScroll from "@/components/FadeInOnScroll";
import ExpandableText from "@/components/ExpandableText";
import type { Review as ReviewResponse } from "@/app/api/reviews/model";
import type { Gown } from "@/app/api/gowns/model";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { collections, type Collection } from "@/app/config/collections";
import { featuredGownIds } from "@/app/config/featured";
import VotingEvent from "@/components/voting/VotingEvent";
import { useAnalytics } from "@/hooks/useAnalytics";

// Helper function to chunk array
const chunkArray = <T,>(arr: T[], size: number): T[][] => {
  return Array.from({ length: Math.ceil(arr.length / size) }, (_, i) =>
    arr.slice(i * size, i * size + size)
  );
};

export default function Home() {
  return (
    <div
      className="m-0 flex flex-col items-center justify-start w-full bg-background"
      style={{ msOverflowStyle: "none", scrollbarWidth: "none" }}
    >
      <style jsx>{`
      div::-webkit-scrollbar {
        display: none;
      }
      `}</style>
      <FadeInOnScroll delay={0.1} className="w-full h-fit bg-background">
        <Hero/>
      </FadeInOnScroll>
      
      <FadeInOnScroll delay={0.1} className="w-full h-fit bg-background">
        <Collections />
      </FadeInOnScroll>
      <FadeInOnScroll delay={0.2} className="w-full h-fit bg-background">
        <Featured />
      </FadeInOnScroll>
      <FadeInOnScroll delay={0.2} className="w-full h-fit bg-background">
        <ReviewsSection />
      </FadeInOnScroll>
      <FadeInOnScroll delay={0.2} className="w-full h-fit bg-background">
        <VotingEvent />
      </FadeInOnScroll>
      
    </div>
  );
}


function Hero() {
  const router = useRouter();
  
  return (
    <div 
      className="w-full h-fit bg-cover bg-top pl-5 pr-28 py-16 space-y-3 md:pl-16 md:pr-20 md:py-44 flex flex-col items-start justify-center text-left text-background font-manrope" 
      style={{ backgroundImage: `linear-gradient(to right, #B38882 -20%, transparent), url(${heroBg.src})` }}>
      <Image src={Logo4fg} alt="Logo 4" className="w-20 md:w-36"/>
      <h1 className=" font-vegawanty text-4xl md:text-6xl text-background">Where Fairytales Come to Life</h1>
      <ExpandableText
        text="Discover a world of enchanting fashion, where every piece tells a story and every outfit is a journey into the mystical. Our collection is designed to inspire your imagination and elevate your wardrobe with unique, handcrafted garments that blend fantasy with elegance."
        color="text-background"
      />
      <div className="w-full flex flex-row items-center justify-start space-x-4 mt-5">
        <button className="font-manrope text-sm md:text-lg bg-primary text-foreground hover:text-white bg-white border-2 border-white rounded px-4 py-2 hover:bg-transparent transition-colors duration-300" 
        onClick={() => router.push('/collections')}>
          Browse Our Gowns
        </button>
        {/* <button className="font-manrope text-sm md:text-lg bg-transparent border-2 border-background text-background px-4 py-2 rounded hover:bg-white hover:text-secondary transition-colors duration-300">
          Book a Fitting
        </button> */}
      </div>
    </div>
  )
}

type ReviewCardPosition = "active" | "previous" | "next";

type ReviewWithImages = ReviewResponse & {
  images: string[];
};
const CARD_TRANSITION = { duration: 0.6, ease: [0.22, 1, 0.36, 1] } as const;

function ReviewsSection() {
  const [reviews, setReviews] = useState<ReviewWithImages[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    const loadReviews = async () => {
      try {
        const isRandom = true;
        const response = await fetch('/api/reviews?random=' + isRandom);
        if (!response.ok) {
          throw new Error('Failed to load reviews');
        }

        const data: ReviewResponse[] = await response.json();
        if (cancelled) {
          return;
        }

        const normalized: ReviewWithImages[] = data
          .filter((review) => Boolean(review.comment?.trim()))
          .slice(0, 10)
          .map((review) => {
            const images = [
              review.thumbnailMediaUrl ?? undefined,
              ...(review.otherMediaUrls ?? []),
            ].filter((url): url is string => typeof url === 'string' && url.length > 0);

            return {
              ...review,
              images,
            };
          });

        setReviews(normalized);
        setActiveIndex(0);
        setError(null);
      } catch (caught) {
        if (!cancelled) {
          const message =
            caught instanceof Error ? caught.message : 'Unable to load reviews.';
          setError(message);
        }
      } finally {
        if (!cancelled) {
          setIsLoading(false);
        }
      }
    };

    loadReviews();

    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (reviews.length < 2) {
      return;
    }

    const timer = window.setInterval(() => {
      setActiveIndex((previous) => (previous + 1) % reviews.length);
    }, 8000);

    return () => window.clearInterval(timer);
  }, [reviews.length]);

  const handleMove = useCallback(
    (direction: 'next' | 'previous') => {
      if (reviews.length < 2) {
        return;
      }

      setActiveIndex((current) => {
        const nextIndex =
          direction === 'next'
            ? (current + 1) % reviews.length
            : (current - 1 + reviews.length) % reviews.length;

        return nextIndex;
      });
    },
    [reviews.length],
  );

  const handleSelect = useCallback(
    (index: number) => {
      if (!reviews.length) {
        return;
      }

      setActiveIndex((index + reviews.length) % reviews.length);
    },
    [reviews.length],
  );

  const displayedCards = useMemo(() => {
    if (!reviews.length) {
      return [] as Array<{ review: ReviewWithImages; position: ReviewCardPosition }>;
    }

    if (reviews.length === 1) {
      return [
        { review: reviews[0], position: 'active' as ReviewCardPosition },
      ];
    }

    if (reviews.length === 2) {
      const active = reviews[activeIndex % reviews.length];
      const other = reviews[(activeIndex + 1) % reviews.length];

      return [
        { review: other, position: 'previous' as ReviewCardPosition },
        { review: active, position: 'active' as ReviewCardPosition },
      ];
    }

    const previousIndex = (activeIndex - 1 + reviews.length) % reviews.length;
    const nextIndex = (activeIndex + 1) % reviews.length;

    return [
      { review: reviews[previousIndex], position: 'previous' as ReviewCardPosition },
      { review: reviews[activeIndex], position: 'active' as ReviewCardPosition },
      { review: reviews[nextIndex], position: 'next' as ReviewCardPosition },
    ];
  }, [reviews, activeIndex]);

  const showNavigation = reviews.length > 1;

  return (
    <section className="flex w-full flex-col items-center justify-center bg-background overflow-x-hidden px-6 py-12 text-foreground md:px-16">
      <div className="max-w-4xl text-center">
        <p className="font-manrope text-xs uppercase tracking-[0.4em] text-secondary">Testimonials</p>
        <h2 className="mt-3 font-vegawanty text-4xl text-foreground md:text-5xl">From Our Clients</h2>
        <p className="mt-5 font-manrope text-base text-foreground/80 md:text-lg">
          Glimpses of the magic we create together, gathered from gowns that made their fairytales real.
        </p>
      </div>

      {isLoading ? (
        <div className="mt-8 md:mt-12 flex w-full max-w-3xl items-center justify-center">
          <div className="h-72 md:h-80 w-full animate-pulse rounded-3xl bg-foreground/10" />
        </div>
      ) : error ? (
        <div className="mt-12 w-full max-w-3xl rounded-2xl border border-secondary/30 bg-secondary/5 px-6 py-12 text-center font-manrope text-foreground">
          {error}
        </div>
      ) : !reviews.length ? (
        <div className="mt-12 text-center font-manrope text-foreground/70">
          Reviews will appear here as soon as our happy fairies share their stories.
        </div>
      ) : (
        <>
          <div className="relative mt-8 md:mt-12 w-full max-w-3xl">
            <div className="relative min-h-[300px] md:min-h-[380px]">
              {displayedCards.map(({ review, position }) => (
                <ReviewCard
                  key={`${review.id}-${position}`}
                  review={review}
                  position={position}
                  isActive={position === 'active'}
                />
              ))}
            </div>
          </div>

          {showNavigation && (
            <div className="mt-6 md:mt-10 flex items-center gap-2">
              {reviews.map((review, index) => {
                const isActive = index === activeIndex;

                return (
                  <button
                    key={review.id}
                    type="button"
                    aria-label={`Show review ${index + 1}`}
                    aria-current={isActive ? 'true' : undefined}
                    onClick={() => handleSelect(index)}
                    className={`h-2 rounded-full transition-all duration-300 ${isActive ? 'w-9 bg-secondary' : 'w-2 bg-foreground/30 hover:bg-foreground/60'}`}
                  />
                );
              })}
            </div>
          )}
        </>
      )}
    </section>
  );
}

interface ReviewCardProps {
  review: ReviewWithImages;
  position: ReviewCardPosition;
  isActive: boolean;
}

function ReviewCard(props: ReviewCardProps) {
  const { review, position, isActive } = props;
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    setCurrentImageIndex(0);
  }, [review.id]);

  const images = review.images;
  const hasImages = images.length > 0;

  const goToNextImage = useCallback(() => {
    if (images.length < 2) {
      return;
    }

    setCurrentImageIndex((previous) => (previous + 1) % images.length);
  }, [images.length]);

  const goToPreviousImage = useCallback(() => {
    if (images.length < 2) {
      return;
    }

    setCurrentImageIndex((previous) => (previous - 1 + images.length) % images.length);
  }, [images.length]);

  const handleDragEnd = useCallback(
    (_: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
      if (images.length < 2) {
        return;
      }

      if (info.offset.x < -50) {
        goToNextImage();
      } else if (info.offset.x > 50) {
        goToPreviousImage();
      }
    },
    [goToNextImage, goToPreviousImage, images.length],
  );

  const offsets: Record<ReviewCardPosition, string> = {
    previous: '-150%',
    active: '-50%',
    next: '50%',
  };

  const safeName = review.clientName?.trim() ? review.clientName.trim() : 'Mystical Wardrobes Client';
  const safeComment = review.comment?.trim() ?? 'This fairy has left a sprinkle of magic for us.';

  return (
    <motion.article
      initial={false}
      animate={{
        x: offsets[position],
        scale: isActive ? 1 : 0.9,
        opacity: isActive ? 1 : 0.4,
        y: isActive ? 0 : 24,
      }}
      transition={CARD_TRANSITION}
      className={`absolute top-0 left-1/2 w-full max-w-3xl px-0 md:px-4 ${position === 'active' ? 'block' : 'hidden md:block'}`}
      style={{ pointerEvents: isActive ? 'auto' : 'none', zIndex: position === 'active' ? 30 : 10 }}
      aria-hidden={!isActive}
    >
      <div
        className={`flex h-full gap-3 rounded border border-foreground/10 bg-white/95 px-4 py-4 shadow-[0_35px_70px_-40px_rgba(99,102,83,0.55)] md:gap-8 md:px-7 md:py-7 ${hasImages ? 'flex-row items-start' : 'flex-col'}`}
      >
        {hasImages ? (
          <div className="flex w-[40%] flex-col gap-3 md:gap-4 md:w-[44%]">
            <div className="relative aspect-square w-full overflow-hidden rounded bg-foreground/5">
              <motion.div
                key={`${review.id}-${currentImageIndex}`}
                className="relative h-full w-full"
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.2}
                onDragEnd={handleDragEnd}
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.35 }}
              >
                <Image
                  src={images[currentImageIndex]}
                  alt={`${safeName} review image ${currentImageIndex + 1}`}
                  fill
                  sizes="(min-width: 1024px) 22rem, 90vw"
                  className="object-cover"
                  priority={position === 'active'}
                />
              </motion.div>

              {images.length > 1 && (
                <>
                  <button
                    type="button"
                    aria-label="Show previous photo"
                    onClick={goToPreviousImage}
                    className="absolute left-2 md:left-3 top-1/2 flex h-7 w-7 md:h-9 md:w-9 -translate-y-1/2 items-center justify-center rounded-full bg-background/90 text-sm md:text-lg text-foreground shadow-md transition hover:bg-secondary hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-secondary"
                  >
                    {'<'}
                  </button>
                  <button
                    type="button"
                    aria-label="Show next photo"
                    onClick={goToNextImage}
                    className="absolute right-2 md:right-3 top-1/2 flex h-7 w-7 md:h-9 md:w-9 -translate-y-1/2 items-center justify-center rounded-full bg-background/90 text-sm md:text-lg text-foreground shadow-md transition hover:bg-secondary hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-secondary"
                  >
                    {'>'}
                  </button>
                </>
              )}
            </div>

            {/* {images.length > 1 && (
              <div className="mt-2 flex items-center gap-3 overflow-x-auto pb-1">
                {images.map((src, index) => (
                  <button
                    key={`${review.id}-thumbnail-${index}`}
                    type="button"
                    onClick={() => setCurrentImageIndex(index)}
                    className={`relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-xl border transition-all duration-300 ${currentImageIndex === index ? 'border-secondary ring-2 ring-secondary/50' : 'border-transparent hover:border-foreground/30'}`}
                  >
                    <Image
                      src={src}
                      alt={`${safeName} gallery thumbnail ${index + 1}`}
                      fill
                      sizes="64px"
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>
            )} */}
          </div>
        ) : null}

        <div className={`flex flex-col justify-between ${hasImages ? 'w-[60%] md:w-[56%]' : 'w-full'}`}>
          <div className="flex flex-col gap-0.5 md:gap-1">
            <span className="text-2xl text-secondary md:text-3xl">&ldquo;</span>
            <p className="font-manrope text-sm leading-5 text-foreground/90 md:text-base md:leading-7">{safeComment}</p>
            <span className="self-start text-2xl text-secondary md:text-3xl">&rdquo;</span>
          </div>
          <div className="mt-3 border-t border-foreground/10 pt-3 md:mt-5 md:pt-5">
            <p className="font-vegawanty text-sm text-foreground md:text-lg">{safeName}</p>
            {review.gownId ? (
              <p className="font-manrope text-[10px] uppercase tracking-widest text-foreground/50 md:text-sm">
                Wore gown #{review.gownId}
              </p>
            ) : null}
          </div>
        </div>
      </div>
    </motion.article>
  );
}

function  Collections() {
  const scrollContainerRef = React.useRef<HTMLDivElement>(null);
  const [showLeftArrow, setShowLeftArrow] = React.useState(false);
  const [showRightArrow, setShowRightArrow] = React.useState(true);

  const handleScroll = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      setShowLeftArrow(scrollLeft > 0);
      setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -300, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 300, behavior: 'smooth' });
    }
  };

  React.useEffect(() => {
    const container = scrollContainerRef.current;
    if (container) {
      handleScroll();
      container.addEventListener('scroll', handleScroll);
      return () => container.removeEventListener('scroll', handleScroll);
    }
  }, []);

  return (
    <div className="w-full bg-background">
      {/* Explore Section */}
      <div className="w-full h-fit flex flex-col md:flex-row-reverse md:gap-10 md:px-16 md:py-20 items-center justify-start md:justify-evenly px-6 py-4 space-y-6" style={{ background: 'linear-gradient(135deg, #f4c4b0 0%, #f5e6d3 40%, #e8d4d8 70%, #d9b8c4 100%)' }}>
        <div className="flex flex-col items-center justify-center">
          <Image src={Icon6} alt="Icon 6" className="w-24 h-24 md:w-40 md:h-40 mb-[-10px]"/>
          <h2 className="font-vegawanty text-foreground-darker text-5xl md:text-7xl">Explore</h2>
          <p className="font-manrope text-md md:text-lg text-foreground-darker text-center max-w-2xl mt-2">
            Explore our curated collections that blend fantasy and fashion, each piece crafted to inspire and enchant.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 md:grid-rows-2 md:columns-4 h-full md:h-72 lg:h-[500px] gap-4 w-full max-w-3xl">
          <a
            className="row-span-1 h-72 md:h-full md:row-span-2 col-span-1 flex items-center justify-center text-background font-vegawanty text-3xl bg-cover bg-top transition-transform duration-300 hover:scale-105"
            style={{ backgroundImage: `linear-gradient(to top, #4E4E4E, transparent), url(${exploreRentalGowns.src})` }}
            href="/collections/all"
          >
            Rental Gowns
          </a>
          <a
            className="row-span-1 h-72 md:h-full col-span-1 flex items-center justify-center text-background font-vegawanty text-3xl bg-cover transition-transform duration-300 hover:scale-105"
            style={{ 
              backgroundImage: `linear-gradient(to top, #4E4E4E, transparent), url(${exploreAddons.src})`,
              backgroundPosition: 'center 15%'
            }}
            href="/addons"
          >
            Add Ons
          </a>
          <a
            className="row-span-1 h-72 md:h-full col-span-1 flex items-center justify-center text-background font-vegawanty text-3xl bg-cover transition-transform duration-300 hover:scale-105"
            style={{ 
              backgroundImage: `linear-gradient(to top, #4E4E4E, transparent), url(${exploreCustomMadeGowns.src})`,
              backgroundPosition: 'center 10%'
            }}
            href="/custom-made-gowns"
          >
            Custom Made Gowns
          </a>
        </div>
      </div>

      {/* Collections Horizontal Scroll Section */}
      <div className="w-full py-8 md:py-12">
        <div className="px-6 md:px-16">
          <h2 className="font-vegawanty text-4xl md:text-5xl font-light text-foreground mb-2">Collections</h2>
        <p className="font-manrope text-md md:text-lg text-foreground/70 max-w-2xl mb-6">
          Discover our signature collections—each one an exclusive curation of enchanting designs to inspire your perfect look.
        </p>
        </div>
        
        {/* Horizontal scrollable container */}
        <div className="relative px-6 md:px-16">
          {/* Left Arrow - Desktop Only */}
          {showLeftArrow && (
            <button
              onClick={scrollLeft}
              aria-label="Scroll left"
              className="hidden md:flex absolute left-4 top-1/2 -translate-y-1/2 z-10 h-10 w-10 items-center justify-center rounded-full bg-background/90 text-foreground shadow-lg transition-all duration-300 hover:bg-secondary hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-secondary"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
          )}

          {/* Right Arrow - Desktop Only */}
          {showRightArrow && (
            <button
              onClick={scrollRight}
              aria-label="Scroll right"
              className="hidden md:flex absolute right-4 top-1/2 -translate-y-1/2 z-10 h-10 w-10 items-center justify-center rounded-full bg-background/90 text-foreground shadow-lg transition-all duration-300 hover:bg-secondary hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-secondary"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          )}

          <div 
            ref={scrollContainerRef}
            className="flex gap-4 md:gap-6 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide"
            style={{ 
              scrollSnapType: 'x mandatory',
              scrollPaddingLeft: '1.5rem',
              scrollbarWidth: 'none', 
              msOverflowStyle: 'none' 
            }}
          >
            {collections.map((collection) => (
              <Link
                key={collection.slug}
                href={`/collections/${collection.slug}`}
                className="group flex-shrink-0 w-48 md:w-56 snap-center"
                style={{ scrollSnapAlign: 'center' }}
              >
                <div className="relative aspect-[3/4] w-full overflow-hidden bg-neutral-100 transition-transform duration-300 group-hover:scale-[1.02]">
                  <Image
                    src={collection.image}
                    alt={collection.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 192px, 224px"
                  />
                </div>
                <div className="mt-3 flex items-center justify-between">
                  <h3 className="font-manrope text-base md:text-lg text-foreground font-light">
                    {collection.name}
                  </h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
      
      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
}

function Featured() {
  const [featuredGowns, setFeaturedGowns] = useState<Gown[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const { trackGownClick } = useAnalytics();

  useEffect(() => {
    const fetchFeaturedGowns = async () => {
      try {
        setIsLoading(true);
        setError(null);
        
        // Fetch all gowns and filter by featured IDs
        const response = await fetch('/api/gowns?limit=1000');
        
        if (!response.ok) {
          throw new Error('Failed to fetch featured gowns');
        }
        
        const data = await response.json();
        const allGowns = data.items || [];
        
        // Filter to only include gowns with IDs in featuredGownIds, maintaining the order
        const featured = featuredGownIds
          .map((id: string) => allGowns.find((gown: Gown) => gown.id === id))
          .filter((gown: Gown | undefined): gown is Gown => gown !== undefined);
        
        setFeaturedGowns(featured);
      } catch (err) {
        console.error('Error fetching featured gowns:', err);
        setError(err instanceof Error ? err.message : 'Failed to load featured gowns');
      } finally {
        setIsLoading(false);
      }
    };

    fetchFeaturedGowns();
  }, []);

  const handleGownClick = (gownId: string) => {
    trackGownClick(gownId);
    router.push(`/gown/${gownId}`);
  };

  return (
    <div className="w-full h-fit py-12 px-6 md:px-16 md:py-16" style={{ background: 'linear-gradient(135deg, #f4c4b0 0%, #f5e6d3 40%, #e8d4d8 70%, #d9b8c4 100%)' }}>
      {/* Featured Gowns Title - Upper Left */}
      <div className="mb-8">
        <h2 className="font-vegawanty text-4xl md:text-5xl text-foreground-darker text-left">Featured Gowns</h2>
      </div>

      {/* Featured gowns grid container */}
      <FadeInOnScroll className="w-full h-fit max-w-6xl mx-auto" delay={0.1}>
        {isLoading ? (
          // Loading skeleton - 2 rows of 4 on desktop, 4 rows of 2 on mobile
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
            {Array.from({ length: 8 }).map((_, index) => (
              <div
                key={index}
                className="w-full aspect-[2/3] bg-background/20 animate-pulse shadow-lg rounded"
              />
            ))}
          </div>
        ) : error ? (
          // Error state
          <div className="w-full text-center py-12">
            <p className="font-manrope text-foreground-darker/80 text-lg mb-4">
              Unable to load featured gowns at the moment.
            </p>
            <button
              onClick={() => window.location.reload()}
              className="font-manrope text-sm bg-background text-tertiary px-6 py-2 rounded hover:bg-background/90 transition-colors duration-300"
            >
              Try Again
            </button>
          </div>
        ) : featuredGowns.length === 0 ? (
          // Empty state
          <div className="w-full text-center py-12">
            <p className="font-manrope text-foreground-darker/80 text-lg">
              No featured gowns available at the moment. Check back soon!
            </p>
          </div>
        ) : (
          // Featured gowns grid: 2 rows x 4 columns on desktop, 4 rows x 2 columns on mobile
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
            {featuredGowns.map((gown) => (
              <FeaturedGownsCard
                key={gown.id}
                gown={gown}
                onClick={() => handleGownClick(gown.id)}
              />
            ))}
          </div>
        )}
      </FadeInOnScroll>
    </div>
  )
}

interface FeaturedGownsCardProps {
  gown: Gown;
  onClick: () => void;
}

function FeaturedGownsCard(props: FeaturedGownsCardProps) {
  const { gown, onClick } = props;
  
  // Get the first available image from the gown
  const gownImage = gown.longGownPictures[0] || 
                   gown.filipinianaPictures[0] || 
                   gown.pixiePictures[0] || 
                   gown.trainPictures[0] || 
                   sampleGown1.src;
  
  // Format price for display
  const price = gown.metroManilaRate > 0 ? gown.metroManilaRate : gown.pixieMetroManilaRate;
  const formattedPrice = price > 0 ? `₱${price.toLocaleString()}` : '';

  return (
    <div 
      className="relative w-full aspect-[2/3] flex items-center justify-center text-background font-vegawanty bg-cover bg-center transition-all duration-300 hover:scale-[1.02] shadow-lg group cursor-pointer overflow-hidden rounded"
      style={{ 
        backgroundImage: `linear-gradient(to top, rgba(99, 102, 83, 0.8), rgba(99, 102, 83, 0.3), transparent), url(${gownImage})`,
      }}
      onClick={onClick}
    >
      <div className="h-full w-full flex flex-col items-center justify-end">
        <div className="py-3 px-2 flex flex-col items-center justify-end w-full">
          <div className="text-center">
            <h2 className="text-sm md:text-base lg:text-lg mb-1 font-vegawanty drop-shadow-lg">
              {gown.name}
            </h2>
            
            {/* Collection badge */}
            {gown.collection.length > 0 && (
              <div className="mb-1">
                <span className="inline-block bg-background/20 backdrop-blur-sm text-background text-[10px] md:text-xs px-1.5 py-0.5 rounded-full font-manrope">
                  {gown.collection[0]}
                </span>
              </div>
            )}
          </div>
          
          {/* Hover overlay with more details */}
          <div className="absolute inset-0 bg-tertiary/90 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center p-3 md:p-4">
            <h3 className="text-base md:text-lg font-vegawanty text-background mb-1 md:mb-2 text-center">
              {gown.name}
            </h3>
            
            {gown.collection.length > 0 && (
              <p className="text-xs md:text-sm font-manrope text-background/80 mb-1 md:mb-2 text-center">
                {gown.collection.join(', ')}
              </p>
            )}
            
            {gown.color.length > 0 && (
              <p className="text-xs font-manrope text-background/80 mb-1 md:mb-2 text-center line-clamp-2">
                Available in: {gown.color.join(', ')}
              </p>
            )}
            
            {formattedPrice && (
              <p className="text-sm md:text-base font-manrope font-semibold text-background mb-2">
                {formattedPrice}
              </p>
            )}
            
            <button className="bg-background text-tertiary px-2 py-1 md:px-3 md:py-1.5 rounded font-manrope text-[10px] md:text-xs hover:bg-background/90 transition-colors duration-300">
              View Details
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}














