'use client';

import MatchesTab from '@/components/MatchesTab';

export default function MatchesPage() {
  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="bg-gradient-to-br from-blue-600 via-blue-500 to-green-400 p-8 rounded-3xl mx-8 mt-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold text-white mb-2">Cricket Matches</h1>
              <p className="text-white/90 text-lg">Browse all international cricket matches</p>
            </div>
            <div className="text-6xl">🏏</div>
          </div>
        </div>
      </div>

      {/* Matches Content */}
      <div className="max-w-7xl mx-auto px-8 py-8">
        <MatchesTab sport="cricket" />
      </div>
    </div>
  );
}
