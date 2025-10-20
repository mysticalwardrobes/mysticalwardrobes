"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import type { PanInfo } from "framer-motion";
import Image from "next/image";
import heroBg from "@/public/assets/Hero-bg.jpg"
import Logo4fg from "@/public/assets/Mystical-Wardrobes-Logo-04-foreground.svg"
import Icon6 from "@/public/assets/symbols/Mystical-Wardrobes-Icons-09-06.svg"

import premium from "@/public/assets/collections/Premium.png";
import explore_accessories from "@/public/assets/addons/Explore.jpg";
import sampleGown1 from "@/public/assets/sample_gown-1.jpg";
import Logo from "@/public/assets/Mystical-Wardrobes-Logo-02-foreground.svg"

import FadeInOnScroll from "@/components/FadeInOnScroll";
import ExpandableText from "@/components/ExpandableText";
import type { Review as ReviewResponse } from "@/app/api/reviews/model";
import type { Gown } from "@/app/api/gowns/model";
import { useRouter } from "next/navigation";


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
      <Featured />
      <FadeInOnScroll delay={0.2} className="w-full h-fit bg-background">
        <ReviewsSection />
      </FadeInOnScroll>
    </div>
  );
}


function Hero() {
  const router = useRouter();
  
  return (
    <div 
      className="w-full h-fit bg-cover bg-top pl-5 pr-28 py-16 space-y-3 md:pl-16 md:pr-20 md:py-36 flex flex-col items-start justify-center text-left text-background font-manrope" 
      style={{ backgroundImage: `linear-gradient(to right, #636653 15%, transparent), url(${heroBg.src})` }}>
      <Image src={Logo4fg} alt="Logo 4" className="w-20 md:w-36"/>
      <h1 className=" font-vegawanty text-4xl md:text-6xl text-background">Where Fairytales Come to Life</h1>
      <ExpandableText
        text="Discover a world of enchanting fashion, where every piece tells a story and every outfit is a journey into the mystical. Our collection is designed to inspire your imagination and elevate your wardrobe with unique, handcrafted garments that blend fantasy with elegance."
        color="text-background"
      />
      <div className="w-full flex flex-row items-center justify-start space-x-4 mt-5">
        <button className="font-manrope text-sm md:text-lg bg-primary text-secondary hover:text-white bg-white border-2 border-white rounded px-4 py-2 hover:bg-secondary transition-colors duration-300" 
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
        <div className="mt-12 flex w-full max-w-5xl items-center justify-center">
          <div className="h-72 w-full max-w-3xl animate-pulse rounded-3xl bg-foreground/10" />
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
          <div className="relative mt-12 w-full max-w-5xl">
            <div className="relative min-h-[420px] md:min-h-[460px]">
              {displayedCards.map(({ review, position }) => (
                <ReviewCard
                  key={`${review.id}-${position}`}
                  review={review}
                  position={position}
                  isActive={position === 'active'}
                />
              ))}
            </div>

            {showNavigation && (
              <div className="pointer-events-none absolute inset-y-0 left-0 right-0 flex items-center justify-between px-2 md:px-4">
                <button
                  type="button"
                  aria-label="Show previous review"
                  onClick={() => handleMove('previous')}
                  className="pointer-events-auto flex h-10 w-10 items-center justify-center rounded-full border border-foreground/30 bg-background/90 text-lg text-foreground shadow-md transition hover:bg-secondary hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-secondary focus-visible:ring-offset-2 sm:h-12 sm:w-12 sm:text-2xl"
                >
                  ?
                </button>
                <button
                  type="button"
                  aria-label="Show next review"
                  onClick={() => handleMove('next')}
                  className="pointer-events-auto flex h-10 w-10 items-center justify-center rounded-full border border-foreground/30 bg-background/90 text-lg text-foreground shadow-md transition hover:bg-secondary hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-secondary focus-visible:ring-offset-2 sm:h-12 sm:w-12 sm:text-2xl"
                >
                  ?
                </button>
              </div>
            )}
          </div>

          {showNavigation && (
            <div className="mt-14 flex items-center gap-2">
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
      className={`absolute top-0 left-1/2 w-full max-w-5xl px-0 md:px-4 ${position === 'active' ? 'block' : 'hidden md:block'}`}
      style={{ pointerEvents: isActive ? 'auto' : 'none', zIndex: position === 'active' ? 30 : 10 }}
      aria-hidden={!isActive}
    >
      <div
        className={`flex h-full flex-col gap-8 rounded border border-foreground/10 bg-white/95 px-6 py-8 shadow-[0_35px_70px_-40px_rgba(99,102,83,0.55)] md:px-8 md:py-you 8 ${hasImages ? 'md:flex-row md:items-start md:gap-10' : ''}`}
      >
        {hasImages ? (
          <div className="flex w-full flex-col gap-4 md:w-[44%]">
            <div className="relative aspect-[5/5] w-full overflow-hidden rounded bg-foreground/5">
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
                  unoptimized
                />
              </motion.div>

              {images.length > 1 && (
                <>
                  <button
                    type="button"
                    aria-label="Show previous photo"
                    onClick={goToPreviousImage}
                    className="absolute left-3 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-background/90 text-lg text-foreground shadow-md transition hover:bg-secondary hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-secondary"
                  >
                    {'<'}
                  </button>
                  <button
                    type="button"
                    aria-label="Show next photo"
                    onClick={goToNextImage}
                    className="absolute right-3 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-background/90 text-lg text-foreground shadow-md transition hover:bg-secondary hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-secondary"
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
                      unoptimized
                    />
                  </button>
                ))}
              </div>
            )} */}
          </div>
        ) : null}

        <div className={`flex w-full flex-col justify-between ${hasImages ? 'md:w-[56%]' : ''}`}>
          <div className="flex flex-col gap-2">
            <span className="text-4xl text-secondary md:text-4xl">&ldquo;</span>
            <p className="font-manrope text-base leading-7 text-foreground/90 md:text-md  ">{safeComment}</p>
            <span className="self-start text-4xl text-secondary md:text-4xl">&rdquo;</span>
          </div>
          <div className="mt-6 border-t border-foreground/10 pt-6">
            <p className="font-vegawanty text-lg text-foreground">{safeName}</p>
            {review.gownId ? (
              <p className="font-manrope text-sm uppercase tracking-widest text-foreground/50">
                Wore gown #{review.gownId}
              </p>
            ) : null}
          </div>
        </div>
      </div>
    </motion.article>
  );
}

function Collections() {
  return (
    <div className="w-full h-fit flex flex-col md:flex-row md:gap-10 md:px-16 md:py-12 items-center justify-start md:justify-evenly px-6 py-4 space-y-6 bg-background">
      <div className="flex flex-col items-center justify-center">
        <Image src={Icon6} alt="Icon 6" className="w-24 h-24 md:w-40 md:h-40 mb-[-10px]"/>
        <h2 className="font-vegawanty text-5xl md:text-7xl">Explore</h2>
        <p className="font-manrope text-md md:text-lg text-foreground/80 text-center max-w-2xl mt-2">
          Explore our curated collections that blend fantasy and fashion, each piece crafted to inspire and enchant.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 md:grid-rows-2 md:columns-4 h-full md:h-72 lg:h-[500px] gap-4 w-full max-w-3xl">
        <a
          className="row-span-1 h-72 md:h-full md:row-span-2 col-span-1 flex items-center justify-center text-background font-vegawanty text-3xl bg-cover bg-top transition-transform duration-300 hover:scale-105"
          style={{ backgroundImage: `linear-gradient(to top, #636653, transparent), url(${sampleGown1.src})` }}
          href="/collections"
        >
          Rental Gowns
        </a>
        <a
          className="row-span-1 h-72 md:h-full col-span-1 flex items-center justify-center text-background font-vegawanty text-3xl bg-cover bg-top transition-transform duration-300 hover:scale-105"
          style={{ backgroundImage: `linear-gradient(to top, #636653, transparent), url(${explore_accessories.src})` }}
          href="/addons"
        >
          Accessories
        </a>
        <a
          className="row-span-1 h-72 md:h-full col-span-1 flex items-center justify-center text-background font-vegawanty text-3xl bg-cover bg-top transition-transform duration-300 hover:scale-105"
          style={{ backgroundImage: `linear-gradient(to top, #636653, transparent), url(${premium.src})` }}
          href="/collections"
        >
          Custom Made Gowns
        </a>
      </div>
    </div>
  )
}

function Featured() {
  const [featuredGowns, setFeaturedGowns] = useState<Gown[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchFeaturedGowns = async () => {
      try {
        setIsLoading(true);
        setError(null);
        
        // Fetch the first 3 gowns as featured gowns
        const response = await fetch('/api/gowns?limit=3&sortBy=name');
        
        if (!response.ok) {
          throw new Error('Failed to fetch featured gowns');
        }
        
        const data = await response.json();
        setFeaturedGowns(data.items || []);
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
    router.push(`/gown/${gownId}`);
  };

  return (
    <div className="w-full h-fit flex flex-col items-center justify-center py-12 px-6 bg-tertiary lg:flex-row-reverse lg:justify-between lg:gap-5 lg:px-16 lg:py-8 space-y-6">
      {/* featured gowns header */}
      <div className="w-full h-fit flex flex-col items-center justify-center mb-8 mx-0 lg:mr-5">
        {/* featured and logo container */}
        <div className="w-fit flex flex-col items-center justify-center lg:items-start">
          <div className="w-fit flex flex-row items-center justify-center">
            <h1 className="font-vegawanty text-6xl lg:text-7xl text-background mt-3">Featured</h1>
            <Image src={Logo} alt="Mystical Wardrobes Logo" className="w-12 h-12 ml-2" />
          </div>
          <div className="w-full flex flex-row items-start justify-end mt-[-15px] lg:mr-32">
            <h1 className="font-vegawanty text-5xl sm:text-4xl md:text-6xl text-background">gowns</h1>
          </div>
        </div>

        <p className="font-manrope text-md md:text-lg text-background/80 text-center max-w-3xl hidden lg:block">
          Discover our latest gown arrivals! Be among the first to experience the magic of these brand-new designs and step into a world of enchantment...
        </p>
      </div>

      <p className="font-manrope text-md md:text-lg text-background text-center max-w-2xl lg:hidden">
        Discover our latest gown arrivals! Be among the first to experience the magic of these brand-new designs and step into a world of enchantment...
      </p>

      {/* Featured gowns card container */}
      <FadeInOnScroll className="w-full h-fit flex flex-col gap-6 mt-6 lg:flex-row lg:gap-4 lg:h-96 justify-center items-center" delay={0.1}>
        {isLoading ? (
          // Loading skeleton
          Array.from({ length: 3 }).map((_, index) => (
            <div
              key={index}
              className="w-full h-72 lg:h-full lg:w-60 bg-background/20 animate-pulse rounded-lg shadow-lg"
            />
          ))
        ) : error ? (
          // Error state
          <div className="w-full max-w-2xl text-center py-12">
            <p className="font-manrope text-background/80 text-lg mb-4">
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
          <div className="w-full max-w-2xl text-center py-12">
            <p className="font-manrope text-background/80 text-lg">
              No featured gowns available at the moment. Check back soon for new arrivals!
            </p>
          </div>
        ) : (
          // Featured gowns
          featuredGowns.map((gown) => (
            <FeaturedGownsCard
              key={gown.id}
              gown={gown}
              onClick={() => handleGownClick(gown.id)}
            />
          ))
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
  
  // Create a description from available data
  const description = gown.collection.length > 0 
    ? `From our ${gown.collection[0]} collection. ${gown.bestFor.length > 0 ? `Perfect for ${gown.bestFor[0]}.` : ''}`
    : 'A beautiful gown from our collection.';
  
  // Format price for display
  const price = gown.metroManilaRate > 0 ? gown.metroManilaRate : gown.pixieMetroManilaRate;
  const formattedPrice = price > 0 ? `₱${price.toLocaleString()}` : '';

  return (
    <div 
      className="relative w-full h-72 lg:h-full lg:w-60 col-span-1 flex items-center justify-center text-background font-vegawanty text-3xl bg-cover bg-center transition-all duration-300 hover:scale-105 shadow-xl group cursor-pointer rounded-lg overflow-hidden"
      style={{ 
        backgroundImage: `linear-gradient(to top, rgba(99, 102, 83, 0.8), rgba(99, 102, 83, 0.3), transparent), url(${gownImage})` 
      }}
      onClick={onClick}
    >
      <div className="h-full w-full flex flex-col items-center justify-end transition-transform duration-300 group-hover:scale-105">
        <div className="h-full py-5 flex flex-col items-center justify-end px-4 w-full">
          <div className="text-center">
            <h2 className="text-2xl md:text-3xl mb-2 font-vegawanty drop-shadow-lg">
              {gown.name}
            </h2>
            
            {/* Collection badge */}
            {gown.collection.length > 0 && (
              <div className="mb-2">
                <span className="inline-block bg-background/20 backdrop-blur-sm text-background text-xs px-2 py-1 rounded-full font-manrope">
                  {gown.collection[0]}
                </span>
              </div>
            )}
            
            {/* Price */}
            {/* {formattedPrice && (
              <div className="mb-3">
                <span className="text-lg font-manrope font-semibold drop-shadow-lg">
                  {formattedPrice}
                </span>
              </div>
            )} */}
            
            {/* Description */}
            <p className="font-manrope text-sm lg:text-md text-background text-center max-h-0 opacity-0 overflow-hidden transition-all duration-300 group-hover:max-h-40 group-hover:opacity-100 drop-shadow-lg">
              {description}
            </p>
          </div>
          
          {/* Hover overlay with more details */}
          <div className="absolute inset-0 bg-tertiary/90 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center p-4">
            <h3 className="text-xl font-vegawanty text-background mb-2 text-center">
              {gown.name}
            </h3>
            
            {gown.collection.length > 0 && (
              <p className="text-sm font-manrope text-background/80 mb-2 text-center">
                {gown.collection.join(', ')}
              </p>
            )}
            
            {gown.color.length > 0 && (
              <p className="text-sm font-manrope text-background/80 mb-2 text-center">
                Available in: {gown.color.join(', ')}
              </p>
            )}
            
            {formattedPrice && (
              <p className="text-lg font-manrope font-semibold text-background mb-3">
                {formattedPrice}
              </p>
            )}
            
            <button className="bg-background text-tertiary px-4 py-2 rounded font-manrope text-sm hover:bg-background/90 transition-colors duration-300">
              View Details
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}














