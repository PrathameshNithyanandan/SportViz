'use client';

import { useState, useEffect } from 'react';
import { Match, Sport, MatchStatus } from '@/types/match';
import { fetchMatches } from '@/lib/api';
import MatchCard from './MatchCard';

interface MatchesTabProps {
  sport: Sport;
}

type TabType = 'live' | 'upcoming' | 'results';

export default function MatchesTab({ sport }: MatchesTabProps) {
  const [activeTab, setActiveTab] = useState<TabType>('live');
  const [matches, setMatches] = useState<Match[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadMatches = async () => {
      setLoading(true);
      const status: MatchStatus = activeTab === 'results' ? 'ft' : activeTab;
      const data = await fetchMatches(sport, status);
      setMatches(data);
      setLoading(false);
    };

    loadMatches();
  }, [sport, activeTab]);

  const tabs: { id: TabType; label: string; count?: number }[] = [
    { id: 'live', label: 'Live' },
    { id: 'upcoming', label: 'Upcoming' },
    { id: 'results', label: 'Results' },
  ];

  return (
    <div>
      {/* Tabs */}
      <div className="border-b border-gray-200 mb-8">
        <nav className="-mb-px flex gap-6">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`py-4 px-6 border-b-3 font-semibold text-base transition-all duration-200 ${
                activeTab === tab.id
                  ? 'border-blue-500 text-blue-600 bg-blue-50'
                  : 'border-transparent text-gray-600 hover:text-gray-900 hover:bg-gray-50'
              } rounded-t-lg`}
            >
              {tab.label}
              {activeTab === tab.id && matches.length > 0 && (
                <span className="ml-2 bg-blue-500 text-white py-1 px-2.5 rounded-full text-xs font-bold">
                  {matches.length}
                </span>
              )}
            </button>
          ))}
        </nav>
      </div>

      {/* Content */}
      <div>
        {loading ? (
          <div className="flex justify-center items-center py-16">
            <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : matches.length === 0 ? (
          <div className="bg-white rounded-2xl border border-gray-200 p-16 text-center shadow-sm">
            <div className="text-gray-400 text-6xl mb-4">🏏</div>
            <p className="text-gray-700 text-xl">No {activeTab} matches available</p>
            <p className="text-gray-500 text-sm mt-2">Check back later for updates</p>
          </div>
        ) : (
          <div className="space-y-8">
            {/* International Matches */}
            {(() => {
              const internationalMatches = matches.filter(m => m.isInternational);
              const domesticMatches = matches.filter(m => !m.isInternational);

              return (
                <>
                  {internationalMatches.length > 0 && (
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                        <span>🌍</span>
                        International Matches
                        <span className="text-sm font-normal text-gray-500">({internationalMatches.length})</span>
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                        {internationalMatches.map((match) => (
                          <MatchCard key={match.id} match={match} />
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Domestic/Local Matches */}
                  {domesticMatches.length > 0 && (
                    <div>
                      <details className="group">
                        <summary className="cursor-pointer list-none">
                          <h3 className="text-xl font-bold text-gray-700 mb-4 flex items-center gap-2 hover:text-gray-900 transition-colors">
                            <span className="transform group-open:rotate-90 transition-transform">▶</span>
                            <span>🏏</span>
                            Local & Domestic Matches
                            <span className="text-sm font-normal text-gray-500">({domesticMatches.length})</span>
                          </h3>
                        </summary>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6 mt-4">
                          {domesticMatches.map((match) => (
                            <MatchCard key={match.id} match={match} />
                          ))}
                        </div>
                      </details>
                    </div>
                  )}
                </>
              );
            })()}
          </div>
        )}
      </div>
    </div>
  );
}
