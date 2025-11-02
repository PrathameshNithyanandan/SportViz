'use client';

import { useEffect, useState } from 'react';
import { Match } from '@/types/match';
import { fetchMatches } from '@/lib/api';
import MatchCard from '@/components/MatchCard';
import Link from 'next/link';

export default function HomePage() {
  const [upcomingMatches, setUpcomingMatches] = useState<Match[]>([]);
  const [liveMatches, setLiveMatches] = useState<Match[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadMatches = async () => {
      setLoading(true);
      const [cricketUpcoming, cricketLive, footballUpcoming, footballLive] = await Promise.all([
        fetchMatches('cricket', 'upcoming'),
        fetchMatches('cricket', 'live'),
        fetchMatches('football', 'upcoming'),
        fetchMatches('football', 'live')
      ]);
      // Combine both sports
      setUpcomingMatches([...cricketUpcoming, ...footballUpcoming]);
      setLiveMatches([...cricketLive, ...footballLive]);
      setLoading(false);
    };

    loadMatches();
  }, []);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 py-12 px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <h1 className="text-4xl font-bold mb-2 text-white">
                International Sports Dashboard
              </h1>
              <p className="text-blue-100 text-lg">
                Live scores, upcoming fixtures, and match results for Cricket & Football
              </p>
            </div>
            <div className="text-6xl flex gap-4">
              <span>🏏</span>
              <span>⚽</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-8 py-8">
        {/* Live Matches Section */}
        {liveMatches.length > 0 && (
          <div className="mb-12">
            <div className="flex items-center justify-between mb-6">
              <div>
                <div className="flex items-center gap-3">
                  <span className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></span>
                  <h2 className="text-3xl font-bold text-gray-900">Live Matches</h2>
                </div>
                <p className="text-gray-600 mt-2 ml-6">Currently in progress</p>
              </div>
              <Link
                href="/matches"
                className="text-blue-600 hover:text-blue-800 font-medium flex items-center gap-2"
              >
                View all
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
              {liveMatches.map((match) => (
                <MatchCard key={match.id} match={match} />
              ))}
            </div>
          </div>
        )}

        {/* Upcoming Matches Section */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-3xl font-bold text-gray-900">Upcoming International Matches</h2>
              <p className="text-gray-600 mt-2">Don't miss these exciting fixtures</p>
            </div>
            <Link
              href="/matches"
              className="text-blue-400 hover:text-blue-300 font-medium flex items-center gap-2"
            >
              View all
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>

          {loading ? (
            <div className="flex justify-center items-center py-12">
              <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
          ) : upcomingMatches.length === 0 ? (
            <div className="bg-white rounded-2xl border border-gray-200 p-12 text-center shadow-sm">
              <div className="text-gray-400 text-6xl mb-4">🏏</div>
              <p className="text-gray-700 text-lg">No upcoming matches at the moment</p>
              <p className="text-gray-500 text-sm mt-2">Check back later for updates</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {upcomingMatches.slice(0, 6).map((match) => (
                <MatchCard key={match.id} match={match} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
