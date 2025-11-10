'use client';

import { useEffect, useState } from 'react';

interface VoteResult {
  optionId: string;
  optionName: string;
  optionDescription: string;
  imageUrls: string[];
  votes: number;
  percentage: number;
}

interface ResultsDisplayProps {
  eventId: string;
}

function ResultsSkeleton() {
  return (
    <div className="space-y-6 animate-pulse">
      <div className="bg-white rounded-lg shadow p-8 text-center space-y-4">
        <div className="h-10 w-24 mx-auto bg-gray-200 rounded-full" />
        <div className="h-4 max-w-sm mx-auto bg-gray-200 rounded-full" />
        <div className="h-4 max-w-xs mx-auto bg-gray-200 rounded-full" />
      </div>

      <div className="bg-white rounded-lg shadow p-6 space-y-6">
        <div className="h-8 w-40 bg-gray-200 rounded-full" />
        <div className="h-4 w-32 bg-gray-200 rounded-full" />

        <div className="space-y-5">
          {Array.from({ length: 3 }).map((_, index) => (
            <div key={index} className="space-y-3">
              <div className="flex items-start gap-4">
                <div className="w-20 h-20 bg-gray-200 rounded-lg" />
                <div className="flex-1 space-y-2">
                  <div className="h-4 w-1/3 bg-gray-200 rounded-full" />
                  <div className="h-4 w-2/3 bg-gray-200 rounded-full" />
                  <div className="h-4 w-1/2 bg-gray-200 rounded-full" />
                </div>
              </div>
              <div className="w-full h-4 bg-gray-100 rounded-full">
                <div className="h-4 bg-gray-200 rounded-full w-3/4" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function ResultsDisplay({ eventId }: ResultsDisplayProps) {
  const [results, setResults] = useState<{
    event: any;
    totalVotes: number;
    results: VoteResult[];
  } | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const response = await fetch(`/api/voting/results/${eventId}`);
        if (response.ok) {
          const data = await response.json();
          setResults(data);
        }
      } catch (error) {
        console.error('Error fetching results:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchResults();
  }, [eventId]);

  if (isLoading) {
    return <ResultsSkeleton />;
  }

  if (!results || results.results.length === 0) {
    return (
      <div className="text-center py-12 bg-white rounded-lg shadow">
        <div className="text-5xl mb-4">📊</div>
        <p className="font-manrope text-gray-600">No votes yet</p>
      </div>
    );
  }

  const winner = results.results[0]; // Highest votes

  return (
    <div className="space-y-8">
      {/* Thank You Message */}
      <div className="bg-white rounded-lg shadow-xl p-8 text-center">
        <div className="text-6xl mb-4">✅</div>
        <h3 className="font-vegawanty text-3xl text-foreground-darker mb-2">
          Thank You for Voting!
        </h3>
        <p className="font-manrope text-gray-600">
          Your voice matters. Here are the current results.
        </p>
      </div>

      {/* Winner Highlight */}
      {results.totalVotes > 0 && (
        <div className="bg-gradient-to-br from-yellow-50 to-amber-50 border-2 border-yellow-300 rounded-xl shadow-lg p-8">
          <div className="flex items-center gap-2 mb-4">
            <span className="text-3xl">🏆</span>
            <h3 className="font-vegawanty text-2xl text-foreground-darker">
              Leading Choice
            </h3>
          </div>
          <div className="flex items-start gap-6">
            {winner.imageUrls && winner.imageUrls.length > 0 && (
              <img
                src={winner.imageUrls[0]}
                alt={winner.optionName}
                className="w-32 h-32 object-cover rounded-lg shadow-md"
              />
            )}
            <div className="flex-1">
              <h4 className="font-manrope text-xl font-bold text-foreground-darker mb-2">
                {winner.optionName}
              </h4>
              <p className="font-manrope text-gray-700 mb-3">
                {winner.optionDescription}
              </p>
              <p className="font-manrope text-lg font-bold text-primary">
                {winner.votes} votes ({winner.percentage.toFixed(1)}%)
              </p>
            </div>
          </div>
        </div>
      )}

      {/* All Results */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="font-vegawanty text-2xl text-foreground-darker mb-6">
          All Results
        </h3>
        <p className="font-manrope text-gray-600 mb-6">
          Total Votes: <strong>{results.totalVotes}</strong>
        </p>

        <div className="space-y-6">
          {results.results.map((result, index) => (
            <div key={result.optionId} className="pb-6 border-b border-gray-100 last:border-0">
              <div className="flex items-start gap-4 mb-3">
                {result.imageUrls && result.imageUrls.length > 0 && (
                  <img
                    src={result.imageUrls[0]}
                    alt={result.optionName}
                    className="w-20 h-20 object-cover rounded-lg"
                  />
                )}
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xl font-bold text-gray-400">#{index + 1}</span>
                    <h4 className="font-manrope font-semibold text-foreground-darker text-lg">
                      {result.optionName}
                    </h4>
                  </div>
                  <p className="font-manrope text-gray-600 text-sm mb-2">
                    {result.optionDescription}
                  </p>
                  <p className="font-manrope font-medium text-primary">
                    {result.votes} votes • {result.percentage.toFixed(1)}%
                  </p>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="w-full bg-gray-100 rounded-full h-4">
                <div
                  className="bg-gradient-to-r from-primary to-secondary h-4 rounded-full transition-all duration-500"
                  style={{ width: `${result.percentage}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

