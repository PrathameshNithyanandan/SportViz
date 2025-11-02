export type Sport = 'cricket' | 'football';
export type MatchStatus = 'live' | 'upcoming' | 'ft';

export interface Match {
  id: string;
  sport: Sport;
  teamA: string;
  teamB: string;
  status: MatchStatus;
  scoreA?: string;
  scoreB?: string;
  startTime: string;
  venue: string;
  matchType?: string; // Test, ODI, T20I, T20, etc.
  isInternational?: boolean;
  series?: string;
  rawData?: any; // Full API response for detailed scorecard
}
