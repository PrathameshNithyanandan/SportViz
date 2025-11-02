export interface Match {
  id: string;
  sport: 'cricket' | 'football';
  teamA: string;
  teamB: string;
  status: 'live' | 'upcoming' | 'ft';
  scoreA: string;
  scoreB: string;
  startTime: string;
  venue: string;
}

export type Sport = 'cricket' | 'football';
export type MatchStatus = 'live' | 'upcoming' | 'ft';
