'use client';

import { useState } from 'react';

interface VotingOption {
  id: string;
  name: string;
  description: string;
  image_urls: string[];
}

interface VotingOptionCardProps {
  option: VotingOption;
  onVote: () => void;
}

export default function VotingOptionCard({ option, onVote }: VotingOptionCardProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showFullDescription, setShowFullDescription] = useState(false);

  const hasImages = option.image_urls && option.image_urls.length > 0;
  const hasMultipleImages = option.image_urls && option.image_urls.length > 1;

  const nextImage = () => {
    if (hasMultipleImages) {
      setCurrentImageIndex((prev) => (prev + 1) % option.image_urls.length);
    }
  };

  const prevImage = () => {
    if (hasMultipleImages) {
      setCurrentImageIndex(
        (prev) => (prev - 1 + option.image_urls.length) % option.image_urls.length
      );
    }
  };

  return (
    <div className="bg-white rounded shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 group flex flex-col items-center w-[325px] min-h-[560px] max-w-xs mx-auto">
      {/* Image Section (portrait and taller) */}
      {hasImages ? (
        <div className="relative w-full h-[400px] bg-gray-100">
          <img
            src={option.image_urls[currentImageIndex]}
            alt={option.name}
            className="w-full h-full object-cover object-center"
            style={{ aspectRatio: "3/4" }}
          />

          {/* Image Navigation */}
          {hasMultipleImages && (
            <>
              <button
                onClick={prevImage}
                className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 text-foreground-darker rounded-full w-8 h-8 flex items-center justify-center hover:bg-black/70 transition-colors opacity-0 group-hover:opacity-100"
              >
                ←
              </button>
              <button
                onClick={nextImage}
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 text-foreground-darker rounded-full w-8 h-8 flex items-center justify-center hover:bg-black/70 transition-colors opacity-0 group-hover:opacity-100"
              >
                →
              </button>

              {/* Image Indicators */}
              <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1">
                {option.image_urls.map((_, index) => (
                  <div
                    key={index}
                    className={`w-2 h-2 rounded-full ${
                      index === currentImageIndex ? 'bg-foreground-darker' : 'bg-foreground-darker/50'
                    }`}
                  />
                ))}
              </div>
            </>
          )}
        </div>
      ) : (
        <div className="w-full h-[400px] bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
          <span className="text-6xl">🎨</span>
        </div>
      )}

      {/* Content Section */}
      <div className="flex-1 flex flex-col w-full p-6 pb-4">
        <h3 className="font-vegawanty text-2xl text-foreground-darker mb-3 text-center">
          {option.name}
        </h3>

        <div className="mb-4 flex-1">
          <p className={`font-manrope text-gray-600 ${!showFullDescription ? 'line-clamp-3' : ''}`}>
            {option.description}
          </p>
          {option.description.length > 150 && (
            <button
              onClick={() => setShowFullDescription(!showFullDescription)}
              className="text-primary font-manrope text-sm hover:underline mt-1"
            >
              {showFullDescription ? 'Show less' : 'Read more'}
            </button>
          )}
        </div>

        {/* Spacer to push button to bottom */}
        <div className="flex-grow"></div>

        {/* Vote Button */}
        <button
          onClick={onVote}
          className="w-full py-3 bg-foreground-darker text-white font-manrope font-medium rounded hover:bg-primary/90 transition-colors shadow-md hover:shadow-lg mt-2"
        >
          Vote for This Collection
        </button>
      </div>
    </div>
  );
}
