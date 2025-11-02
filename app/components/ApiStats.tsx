'use client';

import { useEffect, useState } from 'react';
import { getApiStats } from '@/lib/api';

export default function ApiStats() {
  const [stats, setStats] = useState<any>(null);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const loadStats = async () => {
      const data = await getApiStats();
      setStats(data);
    };

    loadStats();
    // Refresh stats every minute
    const interval = setInterval(loadStats, 60000);
    return () => clearInterval(interval);
  }, []);

  if (!stats) return null;

  return (
    <div className="fixed bottom-6 right-6 z-40">
      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow-lg hover:bg-blue-700 transition-colors text-sm font-medium"
      >
        📊 API Stats
      </button>

      {/* Stats Panel */}
      {isOpen && (
        <div className="absolute bottom-14 right-0 bg-white rounded-lg shadow-xl border border-gray-200 p-4 w-64">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-bold text-gray-900">Cricket API Usage</h3>
            <button
              onClick={() => setIsOpen(false)}
              className="text-gray-400 hover:text-gray-600"
            >
              ✕
            </button>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Calls Today:</span>
              <span className="font-semibold text-gray-900">
                {stats.callsToday}/{stats.limit}
              </span>
            </div>

            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Remaining:</span>
              <span className={`font-semibold ${stats.remaining < 20 ? 'text-red-600' : 'text-green-600'}`}>
                {stats.remaining}
              </span>
            </div>

            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className={`h-2 rounded-full transition-all ${
                  stats.remaining < 20 ? 'bg-red-500' : 'bg-green-500'
                }`}
                style={{ width: `${(stats.remaining / stats.limit) * 100}%` }}
              />
            </div>

            <div className="pt-2 border-t border-gray-200 space-y-1">
              <div className="flex justify-between text-xs text-gray-500">
                <span>Last Updated:</span>
                <span>{stats.lastUpdated}</span>
              </div>
              <div className="flex justify-between text-xs text-gray-500">
                <span>Cached Matches:</span>
                <span>{stats.cachedMatches}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
