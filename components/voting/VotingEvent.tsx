'use client';

import { useEffect, useState } from 'react';
import VotingOptionCard from '@/components/voting/VotingOptionCard';
import VoteModal from '@/components/voting/VoteModal';
import ResultsDisplay from '@/components/voting/ResultsDisplay';
import { formatTimeRemaining } from '@/lib/voting-utils';

interface VotingOption {
  id: string;
  name: string;
  description: string;
  image_urls: string[];
  display_order: number;
}

interface VotingEvent {
  id: string;
  name: string;
  description: string;
  start_date: string;
  end_date: string;
  is_active: boolean;
  status: string;
  voting_options?: VotingOption[];
}

export default function VotingEvent() {
  console.log('VotingEvent component rendered');
  const [event, setEvent] = useState<VotingEvent | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedOption, setSelectedOption] = useState<VotingOption | null>(null);
  const [showVoteModal, setShowVoteModal] = useState(false);
  const [hasVoted, setHasVoted] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState('');

  useEffect(() => {
    const fetchActiveEvent = async () => {
      try {
        const response = await fetch('/api/voting/active');
        const data = await response.json();
        
        if (response.ok) {
          console.log('VotingEvent: Active event data:', data);
          setEvent(data.event);
        } else {
          console.error('VotingEvent: API error:', data.error || 'Unknown error');
        }
      } catch (error) {
        console.error('VotingEvent: Fetch error:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchActiveEvent();
  }, []);

  useEffect(() => {
    if (event) {
      // Update time remaining every minute
      const updateTime = () => {
        setTimeRemaining(formatTimeRemaining(event.end_date));
      };
      updateTime();
      const interval = setInterval(updateTime, 60000); // Every minute
      return () => clearInterval(interval);
    }
  }, [event]);

  const handleVoteClick = (option: VotingOption) => {
    setSelectedOption(option);
    setShowVoteModal(true);
  };

  const handleVoteSuccess = () => {
    setShowVoteModal(false);
    setHasVoted(true);
  };

  if (isLoading) {
    return (
      <div className="w-full h-fit py-12 px-6 md:px-16 md:py-16">
        <div className="text-center">
          <p className="font-manrope text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!event) {
    // No active voting event - return empty div to maintain layout
    return <div className="w-full h-fit"></div>;
  }

  return (
    <div className="w-full h-fit py-12 px-6 md:px-16 md:py-16 bg-gradient-to-br from-primary/5 to-secondary/5">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="font-vegawanty text-4xl md:text-5xl text-foreground-darker mb-4">
            {event.name}
          </h2>
          <p className="font-manrope text-lg text-gray-700 max-w-3xl mx-auto mb-4">
            {event.description}
          </p>
          <div className="flex items-center justify-center gap-4 font-manrope text-gray-600">
            <span className="flex items-center gap-2">
              Time Remaining: {timeRemaining}
            </span>
          </div>
        </div>

        {/* Show results if user has voted or event ended */}
        {hasVoted || event.status === 'ended' ? (
          <ResultsDisplay eventId={event.id} />
        ) : (
          <>
            {/* Voting Options Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {event.voting_options
                ?.sort((a, b) => a.display_order - b.display_order)
                .map((option) => (
                  <VotingOptionCard
                    key={option.id}
                    option={option}
                    onVote={() => handleVoteClick(option)}
                  />
                ))}
            </div>

            {/* Vote Modal */}
            {showVoteModal && selectedOption && (
              <VoteModal
                eventId={event.id}
                option={selectedOption}
                onClose={() => setShowVoteModal(false)}
                onSuccess={handleVoteSuccess}
              />
            )}
          </>
        )}
      </div>
    </div>
  );
}

