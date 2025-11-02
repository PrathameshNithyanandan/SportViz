'use client';

import { useState } from 'react';
import TopBar from '@/components/TopBar';
import MatchesTab from '@/components/MatchesTab';
import { Sport } from '@/types/match';

export default function Home() {
  const [selectedSport, setSelectedSport] = useState<Sport>('cricket');

  return (
    <div className="min-h-screen">
      <TopBar selectedSport={selectedSport} onSportChange={setSelectedSport} />
      
      <div className="p-8">
        <div className="max-w-7xl mx-auto">
          {/* Page Header */}
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              {selectedSport === 'cricket' ? '🏏 Cricket' : '⚽ Football'} Matches
            </h2>
            <p className="text-gray-600">
              Live scores, upcoming fixtures, and match results
            </p>
          </div>

          {/* Matches Tab Component */}
          <MatchesTab sport={selectedSport} />
        </div>
      </div>
    </div>
  );
}
