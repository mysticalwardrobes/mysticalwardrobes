import { createHash } from 'crypto';
import { supabase, supabaseAdmin } from './supabase';

/**
 * Hash an email for privacy (SHA-256)
 * @param email - Email to hash
 * @returns Hashed email
 */
export function hashEmail(email: string): string {
  return createHash('sha256').update(email.toLowerCase().trim()).digest('hex');
}

/**
 * Validate email format
 * @param email - Email to validate
 * @returns true if valid
 */
export function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Check if event is currently active
 * @param event - Voting event
 * @returns true if active
 */
export function isEventActive(event: {
  is_active: boolean;
  start_date: string;
  end_date: string;
  status: string;
}): boolean {
  if (!event.is_active || event.status !== 'active') {
    return false;
  }

  const now = new Date();
  const start = new Date(event.start_date);
  const end = new Date(event.end_date);

  return now >= start && now <= end;
}

/**
 * Check if user can vote (hasn't voted yet)
 * @param eventId - Event ID
 * @param email - User email
 * @returns true if can vote
 */
export async function canUserVote(
  eventId: string,
  email: string
): Promise<boolean> {
  try {
    const emailHash = hashEmail(email);

    const { data, error } = await supabaseAdmin
      .from('votes')
      .select('id')
      .eq('event_id', eventId)
      .eq('voter_email_hash', emailHash)
      .limit(1);

    if (error) {
      console.error('Error checking if user can vote:', error);
      return false;
    }

    return !data || data.length === 0;
  } catch (error) {
    console.error('Error checking if user can vote:', error);
    return false;
  }
}

/**
 * Calculate voting results for an event
 * @param eventId - Event ID
 * @returns Vote counts per option
 */
export async function calculateResults(eventId: string): Promise<{
  totalVotes: number;
  results: Array<{ optionId: string; votes: number; percentage: number }>;
}> {
  try {
    // Get all votes for this event
    const { data: votes, error } = await supabaseAdmin
      .from('votes')
      .select('option_id')
      .eq('event_id', eventId);

    if (error) {
      console.error('Error fetching votes:', error);
      return { totalVotes: 0, results: [] };
    }

    const totalVotes = votes?.length || 0;

    if (totalVotes === 0) {
      return { totalVotes: 0, results: [] };
    }

    // Count votes per option
    const voteCounts = votes.reduce((acc, vote) => {
      acc[vote.option_id] = (acc[vote.option_id] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    // Calculate percentages
    const results = Object.entries(voteCounts).map(([optionId, count]) => ({
      optionId,
      votes: count,
      percentage: (count / totalVotes) * 100,
    }));

    // Sort by votes (descending)
    results.sort((a, b) => b.votes - a.votes);

    return { totalVotes, results };
  } catch (error) {
    console.error('Error calculating results:', error);
    return { totalVotes: 0, results: [] };
  }
}

/**
 * Get time remaining for event
 * @param endDate - Event end date
 * @returns Object with days, hours, minutes remaining
 */
export function getTimeRemaining(endDate: string): {
  days: number;
  hours: number;
  minutes: number;
  total: number;
  expired: boolean;
} {
  const end = new Date(endDate).getTime();
  const now = new Date().getTime();
  const total = end - now;

  if (total <= 0) {
    return { days: 0, hours: 0, minutes: 0, total: 0, expired: true };
  }

  const days = Math.floor(total / (1000 * 60 * 60 * 24));
  const hours = Math.floor((total % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((total % (1000 * 60 * 60)) / (1000 * 60));

  return { days, hours, minutes, total, expired: false };
}

/**
 * Format time remaining as string
 * @param endDate - Event end date
 * @returns Formatted string (e.g., "3 days, 5 hours")
 */
export function formatTimeRemaining(endDate: string): string {
  const { days, hours, minutes, expired } = getTimeRemaining(endDate);

  if (expired) {
    return 'Voting ended';
  }

  if (days > 0) {
    return `${days} day${days > 1 ? 's' : ''}, ${hours} hour${hours > 1 ? 's' : ''}`;
  }

  if (hours > 0) {
    return `${hours} hour${hours > 1 ? 's' : ''}, ${minutes} minute${minutes > 1 ? 's' : ''}`;
  }

  return `${minutes} minute${minutes > 1 ? 's' : ''}`;
}

