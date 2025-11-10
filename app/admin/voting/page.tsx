'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import AdminLayout from '@/components/admin/AdminLayout';

interface VotingEvent {
  id: string;
  name: string;
  description: string;
  start_date: string;
  end_date: string;
  is_active: boolean;
  status: 'draft' | 'active' | 'ended';
  created_at: string;
}

export default function VotingEventsPage() {
  const router = useRouter();
  const [events, setEvents] = useState<VotingEvent[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const fetchEvents = async () => {
    try {
      const response = await fetch('/api/admin/voting/events');
      if (response.ok) {
        const data = await response.json();
        setEvents(data.events || []);
      }
    } catch (error) {
      console.error('Error fetching events:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const handleActivate = async (eventId: string) => {
    try {
      const response = await fetch(`/api/admin/voting/events/${eventId}/activate`, {
        method: 'POST',
      });

      if (response.ok) {
        setMessage({ type: 'success', text: 'Event activated successfully' });
        fetchEvents();
      } else {
        setMessage({ type: 'error', text: 'Failed to activate event' });
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'An error occurred' });
    }
    setTimeout(() => setMessage(null), 3000);
  };

  const handleDeactivate = async (eventId: string) => {
    try {
      const response = await fetch(`/api/admin/voting/events/${eventId}/activate`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setMessage({ type: 'success', text: 'Event deactivated successfully' });
        fetchEvents();
      } else {
        setMessage({ type: 'error', text: 'Failed to deactivate event' });
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'An error occurred' });
    }
    setTimeout(() => setMessage(null), 3000);
  };

  const handleDelete = async (eventId: string) => {
    if (!confirm('Are you sure you want to delete this event? This will also delete all options and votes.')) {
      return;
    }

    try {
      const response = await fetch(`/api/admin/voting/events/${eventId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setMessage({ type: 'success', text: 'Event deleted successfully' });
        fetchEvents();
      } else {
        setMessage({ type: 'error', text: 'Failed to delete event' });
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
          <div className="text-lg font-manrope text-gray-600">Loading events...</div>
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
            <h2 className="text-3xl font-vegawanty text-foreground-darker">
              Voting Events
            </h2>
            <p className="font-manrope text-gray-600 mt-1">
              Manage collection voting events
            </p>
          </div>
          <button
            onClick={() => router.push('/admin/voting/new')}
            className="px-6 py-2 bg-primary text-foreground-darker font-manrope rounded-lg hover:bg-primary/90 transition-colors flex items-center gap-2"
          >
            <span>+</span> Create New Event
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

        {/* Events List */}
        {events.length === 0 ? (
          <div className="bg-white rounded-lg shadow p-12 text-center">
            <div className="text-6xl mb-4">🗳️</div>
            <h3 className="text-xl font-vegawanty text-foreground-darker mb-2">
              No Voting Events Yet
            </h3>
            <p className="font-manrope text-gray-600 mb-6">
              Create your first voting event to let users choose the next collection
            </p>
            <button
              onClick={() => router.push('/admin/voting/new')}
              className="px-6 py-2 bg-primary text-white font-manrope rounded-lg hover:bg-primary/90 transition-colors"
            >
              Create Event
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {events.map((event) => (
              <div
                key={event.id}
                className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-xl font-vegawanty text-foreground-darker">
                        {event.name}
                      </h3>
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-manrope ${
                          event.is_active
                            ? 'bg-green-100 text-green-700'
                            : event.status === 'ended'
                            ? 'bg-gray-100 text-gray-700'
                            : 'bg-yellow-100 text-yellow-700'
                        }`}
                      >
                        {event.is_active ? '● Active' : event.status}
                      </span>
                    </div>
                    <p className="font-manrope text-gray-600 mb-4">
                      {event.description}
                    </p>
                    <div className="flex items-center gap-6 text-sm font-manrope text-gray-500">
                      <span>
                        Start: {new Date(event.start_date).toLocaleDateString()}
                      </span>
                      <span>
                        End: {new Date(event.end_date).toLocaleDateString()}
                      </span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => router.push(`/admin/voting/${event.id}`)}
                      className="px-4 py-2 bg-gray-100 text-gray-700 font-manrope rounded-lg hover:bg-gray-200 transition-colors"
                    >
                      Manage
                    </button>
                    
                    {event.is_active ? (
                      <button
                        onClick={() => handleDeactivate(event.id)}
                        className="px-4 py-2 bg-yellow-100 text-yellow-700 font-manrope rounded-lg hover:bg-yellow-200 transition-colors"
                      >
                        Deactivate
                      </button>
                    ) : event.status !== 'ended' && (
                      <button
                        onClick={() => handleActivate(event.id)}
                        className="px-4 py-2 bg-green-100 text-green-700 font-manrope rounded-lg hover:bg-green-200 transition-colors"
                      >
                        Activate
                      </button>
                    )}

                    <button
                      onClick={() => handleDelete(event.id)}
                      className="px-4 py-2 bg-red-100 text-red-700 font-manrope rounded-lg hover:bg-red-200 transition-colors"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </AdminLayout>
  );
}

