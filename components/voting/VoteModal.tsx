'use client';

import { useState } from 'react';

interface VotingOption {
  id: string;
  name: string;
  description: string;
  image_urls: string[];
}

interface VoteModalProps {
  eventId: string;
  option: VotingOption;
  onClose: () => void;
  onSuccess: () => void;
}

export default function VoteModal({ eventId, option, onClose, onSuccess }: VoteModalProps) {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/voting/vote', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          eventId,
          optionId: option.id,
          email,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || 'Failed to submit vote');
        setIsSubmitting(false);
        return;
      }

      // Success!
      onSuccess();
    } catch (err) {
      setError('An error occurred. Please try again.');
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8 relative animate-in fade-in zoom-in duration-200">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-2xl"
        >
          ×
        </button>

        {/* Header */}
        <div className="text-center mb-6">
          <div className="text-5xl mb-3">🗳️</div>
          <h3 className="font-vegawanty text-2xl text-foreground-darker mb-2">
            Cast Your Vote
          </h3>
          <p className="font-manrope text-gray-600">
            You're voting for: <strong>{option.name}</strong>
          </p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-sm text-red-600 font-manrope">{error}</p>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-manrope font-medium text-gray-700 mb-2">
              Email Address *
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent font-manrope"
              placeholder="your.email@example.com"
            />
            <p className="text-xs text-gray-500 mt-2 font-manrope">
              We'll use this to prevent duplicate votes. Your email will be kept private.
            </p>
          </div>

          {/* Privacy Notice */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <p className="text-xs font-manrope text-blue-900">
              <strong>Privacy Notice:</strong> Your email is hashed and stored securely. 
              We only use it to ensure one vote per person. We will not send you marketing emails.
            </p>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3 bg-foreground-darker text-white font-manrope font-medium rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? 'Submitting...' : 'Submit My Vote'}
          </button>

          <button
            type="button"
            onClick={onClose}
            disabled={isSubmitting}
            className="w-full py-3 bg-gray-100 text-gray-700 font-manrope rounded-lg hover:bg-gray-200 transition-colors disabled:opacity-50"
          >
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
}

