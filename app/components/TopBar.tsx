'use client';

import { Sport } from '@/types/match';

interface TopBarProps {
  selectedSport: Sport;
  onSportChange: (sport: Sport) => void;
}

export default function TopBar({ selectedSport, onSportChange }: TopBarProps) {
  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center">
          <h1 className="text-2xl font-bold text-blue-600">SportViz</h1>
          <span className="ml-2 text-sm text-gray-500">Live Sports Dashboard</span>
        </div>

        {/* Sport Selector */}
        <div className="flex items-center gap-3">
          <span className="text-sm text-gray-600 font-medium">Sport:</span>
          <div className="flex bg-gray-100 rounded-lg p-1">
            <button
              onClick={() => onSportChange('cricket')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                selectedSport === 'cricket'
                  ? 'bg-white text-blue-600 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              🏏 Cricket
            </button>
            <button
              onClick={() => onSportChange('football')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                selectedSport === 'football'
                  ? 'bg-white text-blue-600 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              ⚽ Football
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
