import { Match } from '@/types/match';

const CRICAPI_KEY = '568f1434-a625-496e-994c-7b7137e18635';
const CRICAPI_BASE_URL = 'https://api.cricapi.com/v1';

// Cache storage (in memory for now, will persist to file/DB later)
interface CacheData {
  matches: Match[];
  lastUpdated: number;
  apiCallsToday: number;
  lastResetDate: string;
}

let cache: CacheData = {
  matches: [],
  lastUpdated: 0,
  apiCallsToday: 0,
  lastResetDate: new Date().toDateString()
};

// Check if we should refresh (max 100 calls per day)
function shouldRefreshCache(): boolean {
  const now = Date.now();
  const today = new Date().toDateString();

  // Reset counter if it's a new day
  if (cache.lastResetDate !== today) {
    cache.apiCallsToday = 0;
    cache.lastResetDate = today;
  }

  // Don't refresh if we've hit the daily limit
  if (cache.apiCallsToday >= 90) { // Keep 10 calls as buffer
    console.log('API call limit reached for today, using cache');
    return false;
  }

  // Refresh every 5 minutes for live matches, 1 hour for others
  const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes
  return (now - cache.lastUpdated) > CACHE_DURATION;
}

// Detect match format properly
function detectMatchFormat(apiMatch: any): string {
  const matchType = apiMatch.matchType?.toLowerCase() || '';
  const seriesType = apiMatch.seriesType?.toLowerCase() || '';
  const name = apiMatch.name?.toLowerCase() || '';

  // Check for Test matches
  if (matchType.includes('test') || name.includes('test')) {
    return 'Test';
  }

  // Check for ODI
  if (matchType.includes('odi')) {
    return 'ODI';
  }

  // Check for T20 International
  if (matchType.includes('t20i') ||
      (matchType.includes('t20') && seriesType.includes('international'))) {
    return 'T20I';
  }

  // Check for domestic T20
  if (matchType.includes('t20')) {
    return 'T20';
  }

  // Default fallback
  return matchType || 'Match';
}

// Check if match is international
function isInternationalMatch(apiMatch: any): boolean {
  const matchType = apiMatch.matchType?.toLowerCase() || '';
  const seriesType = apiMatch.seriesType?.toLowerCase() || '';
  const name = apiMatch.name?.toLowerCase() || '';

  // International indicators
  const isInternational = (
    matchType.includes('odi') ||
    matchType.includes('t20i') ||
    matchType.includes('test') ||
    seriesType.includes('international') ||
    name.includes(' vs ') // International matches usually have "Country vs Country"
  );

  // Domestic/League indicators (exclude these)
  const isDomestic = (
    seriesType.includes('league') ||
    seriesType.includes('premier') ||
    seriesType.includes('trophy') ||
    seriesType.includes('ipl') ||
    seriesType.includes('bbl') ||
    seriesType.includes('psl') ||
    name.includes(' vs ') === false // Domestic teams don't use "vs" format
  );

  return isInternational && !isDomestic;
}

// Convert CricAPI match to our Match format
function convertCricApiMatch(apiMatch: any): Match {
  const status = apiMatch.matchStarted
    ? (apiMatch.matchEnded ? 'ft' : 'live')
    : 'upcoming';

  const matchFormat = detectMatchFormat(apiMatch);

  return {
    id: apiMatch.id || apiMatch.name,
    sport: 'cricket',
    teamA: apiMatch.teams?.[0] || apiMatch.teamInfo?.[0]?.shortname || 'Team A',
    teamB: apiMatch.teams?.[1] || apiMatch.teamInfo?.[1]?.shortname || 'Team B',
    status: status,
    scoreA: apiMatch.score?.[0]?.r !== undefined && apiMatch.score?.[0]?.w !== undefined
      ? `${apiMatch.score[0].r}/${apiMatch.score[0].w}${apiMatch.score[0].o ? ` (${apiMatch.score[0].o})` : ''}`
      : undefined,
    scoreB: apiMatch.score?.[1]?.r !== undefined && apiMatch.score?.[1]?.w !== undefined
      ? `${apiMatch.score[1].r}/${apiMatch.score[1].w}${apiMatch.score[1].o ? ` (${apiMatch.score[1].o})` : ''}`
      : undefined,
    startTime: apiMatch.dateTimeGMT || apiMatch.date || new Date().toISOString(),
    venue: apiMatch.venue || 'TBD',
    matchType: matchFormat,
    isInternational: isInternationalMatch(apiMatch),
    series: apiMatch.seriesName || apiMatch.series || undefined,
    rawData: apiMatch // Store full API response for detailed view
  };
}

// Fetch cricket matches from API
async function fetchFromApi(): Promise<Match[]> {
  try {
    console.log(`Making API call to CricAPI (${cache.apiCallsToday + 1}/100 today)`);

    // Fetch current matches
    const response = await fetch(
      `${CRICAPI_BASE_URL}/currentMatches?apikey=${CRICAPI_KEY}&offset=0`
    );

    if (!response.ok) {
      throw new Error(`CricAPI error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    cache.apiCallsToday++;

    if (!data.data || !Array.isArray(data.data)) {
      console.warn('No match data from CricAPI');
      return cache.matches; // Return cached data
    }

    const tenDaysAgo = Date.now() - (10 * 24 * 60 * 60 * 1000);

    // Convert all matches and let frontend decide how to display
    const matches = data.data
      .filter((match: any) => {
        // Include matches from last 10 days onwards
        const matchDate = new Date(match.dateTimeGMT || match.date).getTime();
        return matchDate >= tenDaysAgo;
      })
      .map(convertCricApiMatch)
      .sort((a: Match, b: Match) => {
        // Sort: live first, then upcoming, then recent finished
        if (a.status === 'live' && b.status !== 'live') return -1;
        if (a.status !== 'live' && b.status === 'live') return 1;
        if (a.status === 'upcoming' && b.status === 'ft') return -1;
        if (a.status === 'ft' && b.status === 'upcoming') return 1;
        return new Date(b.startTime).getTime() - new Date(a.startTime).getTime();
      });

    // Update cache
    cache.matches = matches;
    cache.lastUpdated = Date.now();

    console.log(`✅ Fetched ${matches.length} international cricket matches from API`);
    return matches;

  } catch (error) {
    console.error('Error fetching from CricAPI:', error);
    // Return cached data on error
    return cache.matches;
  }
}

// Main function to get cricket matches
export async function getCricketMatches(status?: 'live' | 'upcoming' | 'ft'): Promise<Match[]> {
  // Check if we should refresh from API
  if (shouldRefreshCache()) {
    await fetchFromApi();
  } else {
    console.log('Using cached cricket data');
  }

  // Filter by status if requested
  if (status) {
    return cache.matches.filter(match => match.status === status);
  }

  return cache.matches;
}

// Get API usage stats
export function getApiUsageStats() {
  return {
    callsToday: cache.apiCallsToday,
    limit: 100,
    remaining: 100 - cache.apiCallsToday,
    lastUpdated: new Date(cache.lastUpdated).toLocaleString(),
    cachedMatches: cache.matches.length
  };
}
