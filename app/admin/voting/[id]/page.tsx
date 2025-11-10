'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import AdminLayout from '@/components/admin/AdminLayout';

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

export default function EventDetailsPage() {
  const router = useRouter();
  const params = useParams();
  const eventId = params.id as string;

  const [event, setEvent] = useState<VotingEvent | null>(null);
  const [results, setResults] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showResults, setShowResults] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const fetchEvent = async () => {
    try {
      const response = await fetch(`/api/admin/voting/events/${eventId}`);
      if (response.ok) {
        const data = await response.json();
        setEvent(data.event);
      }
    } catch (error) {
      console.error('Error fetching event:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchResults = async () => {
    try {
      const response = await fetch(`/api/admin/voting/events/${eventId}/results`);
      if (response.ok) {
        const data = await response.json();
        setResults(data);
      }
    } catch (error) {
      console.error('Error fetching results:', error);
    }
  };

  useEffect(() => {
    fetchEvent();
  }, [eventId]);

  const handleDeleteOption = async (optionId: string) => {
    if (!confirm('Are you sure you want to delete this option?')) return;

    try {
      const response = await fetch(
        `/api/admin/voting/events/${eventId}/options/${optionId}`,
        { method: 'DELETE' }
      );

      if (response.ok) {
        setMessage({ type: 'success', text: 'Option deleted successfully' });
        fetchEvent();
      } else {
        setMessage({ type: 'error', text: 'Failed to delete option' });
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'An error occurred' });
    }
    setTimeout(() => setMessage(null), 3000);
  };

  if (isLoading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-64">
          <div className="text-lg font-manrope text-gray-600">Loading event...</div>
        </div>
      </AdminLayout>
    );
  }

  if (!event) {
    return (
      <AdminLayout>
        <div className="text-center py-12">
          <p className="font-manrope text-gray-600">Event not found</p>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <h2 className="text-3xl font-vegawanty text-foreground-darker">
                {event.name}
              </h2>
              <span
                className={`px-3 py-1 rounded-full text-sm font-manrope ${
                  event.is_active
                    ? 'bg-green-100 text-green-700'
                    : 'bg-gray-100 text-gray-700'
                }`}
              >
                {event.is_active ? '● Active' : event.status}
              </span>
            </div>
            <p className="font-manrope text-gray-600">{event.description}</p>
          </div>
          <button
            onClick={() => router.push('/admin/voting')}
            className="px-4 py-2 bg-gray-100 text-gray-700 font-manrope rounded-lg hover:bg-gray-200 transition-colors"
          >
            ← Back
          </button>
        </div>

        {/* Message */}
        {message && (
          <div
            className={`p-4 rounded-lg ${
              message.type === 'success'
                ? 'bg-green-50 text-green-700'
                : 'bg-red-50 text-red-700'
            }`}
          >
            <p className="font-manrope">{message.text}</p>
          </div>
        )}

        {/* Event Details Card */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-xl font-vegawanty text-foreground-darker mb-4">
            Event Details
          </h3>
          <div className="grid grid-cols-2 gap-4 text-sm font-manrope">
            <div>
              <span className="text-gray-600">Start Date:</span>
              <p className="font-medium text-foreground-darker mt-1">
                {new Date(event.start_date).toLocaleString()}
              </p>
            </div>
            <div>
              <span className="text-gray-600">End Date:</span>
              <p className="font-medium text-foreground-darker mt-1">
                {new Date(event.end_date).toLocaleString()}
              </p>
            </div>
          </div>
        </div>

        {/* Results Button */}
        <div className="flex gap-3">
          <button
            onClick={() => {
              setShowResults(!showResults);
              if (!showResults && !results) {
                fetchResults();
              }
            }}
            className="px-6 py-2 bg-blue-100 text-blue-700 font-manrope rounded-lg hover:bg-blue-200 transition-colors"
          >
            {showResults ? 'Hide Results' : 'View Results'}
          </button>
        </div>

        {/* Results Display */}
        {showResults && results && (
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-xl font-vegawanty text-foreground-darker mb-4">
              Voting Results
            </h3>
            <p className="font-manrope text-gray-600 mb-6">
              Total Votes: <strong>{results.totalVotes}</strong>
            </p>
            <div className="space-y-4">
              {results.results?.map((result: any, index: number) => (
                <div key={result.optionId} className="border-b border-gray-100 pb-4 last:border-0">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className="text-2xl font-bold text-gray-400">#{index + 1}</span>
                      <span className="font-manrope font-medium text-foreground-darker">
                        {result.optionName}
                      </span>
                    </div>
                    <span className="font-manrope font-bold text-primary">
                      {result.votes} votes ({result.percentage.toFixed(1)}%)
                    </span>
                  </div>
                  <div className="w-full bg-gray-100 rounded-full h-3">
                    <div
                      className="bg-primary h-3 rounded-full"
                      style={{ width: `${result.percentage}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Voting Options */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-vegawanty text-foreground-darker">
              Voting Options ({event.voting_options?.length || 0})
            </h3>
            <button
              onClick={() => router.push(`/admin/voting/${eventId}/options/new`)}
              className="px-4 py-2 bg-primary text-foreground-darker font-manrope rounded-lg hover:bg-primary/90 transition-colors flex items-center gap-2"
            >
              <span>+</span> Add Option
            </button>
          </div>

          {!event.voting_options || event.voting_options.length === 0 ? (
            <div className="text-center py-12 border-2 border-dashed border-gray-200 rounded-lg">
              <div className="text-5xl mb-3">📋</div>
              <p className="font-manrope text-gray-600 mb-4">
                No voting options yet. Add options for users to vote on.
              </p>
              <button
                onClick={() => router.push(`/admin/voting/${eventId}/options/new`)}
                className="px-6 py-2 bg-primary text-foreground-darker font-manrope rounded-lg hover:bg-primary/90 transition-colors"
              >
                Add First Option
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {event.voting_options
                .sort((a, b) => a.display_order - b.display_order)
                .map((option) => (
                  <div
                    key={option.id}
                    className="flex items-start gap-4 p-4 border border-gray-200 rounded-lg hover:border-primary transition-colors"
                  >
                    {/* Thumbnail */}
                    {option.image_urls && option.image_urls.length > 0 && (
                      <img
                        src={option.image_urls[0]}
                        alt={option.name}
                        className="w-24 h-24 object-cover rounded-lg"
                      />
                    )}

                    {/* Option Details */}
                    <div className="flex-1">
                      <h4 className="font-manrope font-medium text-foreground-darker text-lg mb-1">
                        {option.name}
                      </h4>
                      <p className="font-manrope text-gray-600 text-sm mb-2">
                        {option.description}
                      </p>
                      <p className="font-manrope text-gray-500 text-xs">
                        {option.image_urls?.length || 0} image(s) • Order: {option.display_order}
                      </p>
                    </div>

                    {/* Actions */}
                    <div className="flex flex-col gap-2">
                      <button
                        onClick={() => handleDeleteOption(option.id)}
                        className="px-4 py-2 bg-red-100 text-red-700 font-manrope text-sm rounded-lg hover:bg-red-200 transition-colors"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  );
}

