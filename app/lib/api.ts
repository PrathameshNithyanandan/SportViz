import { Match, Sport, MatchStatus } from '@/types/match';

export async function fetchMatches(sport: Sport, status?: MatchStatus): Promise<Match[]> {
  try {
    // Use Next.js API routes
    const url = status
      ? `/api/${sport}?status=${status}`
      : `/api/${sport}`;

    const response = await fetch(url, {
      cache: 'no-store', // Disable caching for real-time data
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch ${sport} matches`);
    }

    const result = await response.json();
    return result.data || [];
  } catch (error) {
    console.error(`Error fetching ${sport} matches:`, error);
    return [];
  }
}

export async function fetchMatchById(sport: Sport, id: string): Promise<Match | null> {
  try {
    const response = await fetch(`/api/${sport}/${id}`, {
      cache: 'no-store',
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch match ${id}`);
    }

    const result = await response.json();
    return result.data || null;
  } catch (error) {
    console.error(`Error fetching match ${id}:`, error);
    return null;
  }
}

// Get API usage statistics
export async function getApiStats() {
  try {
    const response = await fetch('/api/cricket/stats');
    if (!response.ok) {
      throw new Error('Failed to fetch API stats');
    }
    const result = await response.json();
    return result.data;
  } catch (error) {
    console.error('Error fetching API stats:', error);
    return null;
  }
}
