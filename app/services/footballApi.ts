import { Match, MatchStatus } from '@/types/match';

const FOOTBALL_DATA_API_KEY = 'c773e33beb7b424fa8c13cf5dba0a040';
const BASE_URL = 'https://api.football-data.org/v4';

// Cache management
interface CacheEntry {
  data: any;
  timestamp: number;
}

const cache: Record<string, CacheEntry> = {};
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes
const MAX_DAILY_CALLS = 90; // Buffer of 10 from 100 limit
let dailyCallCount = 0;
let lastResetDate = new Date().toDateString();

function resetDailyCountIfNeeded() {
  const today = new Date().toDateString();
  if (today !== lastResetDate) {
    dailyCallCount = 0;
    lastResetDate = today;
  }
}

function getCached(key: string): any | null {
  const entry = cache[key];
  if (!entry) return null;

  const age = Date.now() - entry.timestamp;
  if (age > CACHE_DURATION) {
    delete cache[key];
    return null;
  }

  return entry.data;
}

function setCache(key: string, data: any) {
  cache[key] = {
    data,
    timestamp: Date.now(),
  };
}

async function fetchFromFootballData(endpoint: string): Promise<any> {
  resetDailyCountIfNeeded();

  // Check cache first
  const cached = getCached(endpoint);
  if (cached) {
    console.log(`[Football API] Using cached data for ${endpoint}`);
    return cached;
  }

  // Check daily limit
  if (dailyCallCount >= MAX_DAILY_CALLS) {
    console.warn('[Football API] Daily call limit reached, using cache');
    return cached || { matches: [] };
  }

  try {
    dailyCallCount++;
    const fullUrl = `${BASE_URL}${endpoint}`;
    console.log(`[Football API] Fetching ${fullUrl} (Call ${dailyCallCount}/${MAX_DAILY_CALLS})`);

    const response = await fetch(fullUrl, {
      headers: {
        'X-Auth-Token': FOOTBALL_DATA_API_KEY,
      },
    });

    console.log(`[Football API] Response status: ${response.status}`);

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`[Football API] Error response:`, errorText);
      throw new Error(`Football API error: ${response.status} - ${errorText}`);
    }

    const data = await response.json();
    console.log(`[Football API] Response data keys:`, Object.keys(data));
    console.log(`[Football API] Matches count:`, data.matches?.length || 0);
    setCache(endpoint, data);
    return data;
  } catch (error) {
    console.error('[Football API] Error:', error);
    // Return cached data even if expired, or empty result
    return cached || { matches: [] };
  }
}

function getMatchStatus(apiMatch: any): MatchStatus {
  const status = apiMatch.status;

  switch (status) {
    case 'SCHEDULED':
    case 'TIMED':
      return 'upcoming';
    case 'IN_PLAY':
    case 'PAUSED':
      return 'live';
    case 'FINISHED':
      return 'ft';
    case 'POSTPONED':
    case 'CANCELLED':
    case 'SUSPENDED':
      return 'ft';
    default:
      return 'upcoming';
  }
}

function isInternationalMatch(apiMatch: any): boolean {
  const competition = apiMatch.competition?.name?.toLowerCase() || '';

  // International competitions
  const internationalCompetitions = [
    'fifa world cup',
    'uefa european championship',
    'uefa nations league',
    'copa america',
    'african cup of nations',
    'uefa champions league',
    'uefa europa league',
    'uefa conference league',
    'fifa club world cup',
  ];

  return internationalCompetitions.some(comp => competition.includes(comp));
}

function convertFootballApiMatch(apiMatch: any): Match {
  const homeTeam = apiMatch.homeTeam?.name || 'TBD';
  const awayTeam = apiMatch.awayTeam?.name || 'TBD';
  const status = getMatchStatus(apiMatch);

  let scoreA = undefined;
  let scoreB = undefined;

  if (apiMatch.score?.fullTime?.home !== null && apiMatch.score?.fullTime?.away !== null) {
    scoreA = `${apiMatch.score.fullTime.home}`;
    scoreB = `${apiMatch.score.fullTime.away}`;
  } else if (apiMatch.score?.halftime?.home !== null && apiMatch.score?.halftime?.away !== null) {
    scoreA = `${apiMatch.score.halftime.home}`;
    scoreB = `${apiMatch.score.halftime.away}`;
  }

  return {
    id: apiMatch.id.toString(),
    sport: 'football',
    teamA: homeTeam,
    teamB: awayTeam,
    status,
    scoreA,
    scoreB,
    startTime: apiMatch.utcDate,
    venue: apiMatch.venue || apiMatch.competition?.name || 'Venue TBD',
    matchType: apiMatch.competition?.name || 'Football',
    isInternational: isInternationalMatch(apiMatch),
    series: apiMatch.competition?.name,
    rawData: apiMatch,
  };
}

export async function getFootballMatches(status?: string): Promise<Match[]> {
  try {
    let endpoint = '/matches';

    // Football-Data.org uses date ranges and status filters
    if (status === 'live') {
      endpoint = '/matches?status=IN_PLAY';
    } else if (status === 'upcoming') {
      // Get matches from today to next 7 days
      const today = new Date().toISOString().split('T')[0];
      const nextWeek = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
      endpoint = `/matches?dateFrom=${today}&dateTo=${nextWeek}`;
    } else if (status === 'ft') {
      // Get matches from last 7 days
      const lastWeek = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
      const today = new Date().toISOString().split('T')[0];
      endpoint = `/matches?dateFrom=${lastWeek}&dateTo=${today}&status=FINISHED`;
    } else {
      // Default: all matches (today)
      endpoint = '/matches';
    }

    console.log('[Football API] Fetching endpoint:', endpoint);
    const data = await fetchFromFootballData(endpoint);
    console.log('[Football API] Raw data:', JSON.stringify(data).substring(0, 500));
    const matches = data.matches || [];
    console.log('[Football API] Found', matches.length, 'matches');

    const converted = matches.map(convertFootballApiMatch);
    console.log('[Football API] Converted', converted.length, 'matches');

    return converted;
  } catch (error) {
    console.error('[Football Service] Error:', error);
    return [];
  }
}

export async function getCompetitions(): Promise<any[]> {
  try {
    const data = await fetchFromFootballData('/competitions');
    return data.competitions || [];
  } catch (error) {
    console.error('[Football Service] Error fetching competitions:', error);
    return [];
  }
}
