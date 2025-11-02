'use client';

import { useState } from 'react';
import { footballTeams, FootballTeam } from '@/data/footballTeams';
import { getFootballPlayersByTeam } from '@/data/footballPlayers';

export default function FootballTeamsPage() {
  const [selectedTeam, setSelectedTeam] = useState<FootballTeam | null>(null);
  const [filter, setFilter] = useState<'all' | 'club' | 'national'>('all');

  const filteredTeams = footballTeams.filter(team => {
    if (filter === 'all') return true;
    return team.type === filter;
  });

  const clubTeams = filteredTeams.filter(t => t.type === 'club');
  const nationalTeams = filteredTeams.filter(t => t.type === 'national');

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="bg-gradient-to-br from-green-600 via-green-500 to-blue-400 p-8 rounded-3xl mx-8 mt-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold text-white mb-2">Football Teams</h1>
              <p className="text-white/90 text-lg">Top clubs and national teams</p>
            </div>
            <div className="text-6xl">⚽</div>
          </div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="max-w-7xl mx-auto px-8 py-6">
        <div className="flex gap-4 mb-6">
          <button
            onClick={() => setFilter('all')}
            className={`px-6 py-3 rounded-xl font-semibold transition-all ${
              filter === 'all'
                ? 'bg-green-600 text-white shadow-lg'
                : 'bg-white text-gray-600 hover:bg-gray-50'
            }`}
          >
            All Teams ({footballTeams.length})
          </button>
          <button
            onClick={() => setFilter('club')}
            className={`px-6 py-3 rounded-xl font-semibold transition-all ${
              filter === 'club'
                ? 'bg-green-600 text-white shadow-lg'
                : 'bg-white text-gray-600 hover:bg-gray-50'
            }`}
          >
            Club Teams ({clubTeams.length})
          </button>
          <button
            onClick={() => setFilter('national')}
            className={`px-6 py-3 rounded-xl font-semibold transition-all ${
              filter === 'national'
                ? 'bg-green-600 text-white shadow-lg'
                : 'bg-white text-gray-600 hover:bg-gray-50'
            }`}
          >
            National Teams ({nationalTeams.length})
          </button>
        </div>

        {/* Teams Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredTeams.map((team) => (
            <div
              key={team.id}
              onClick={() => setSelectedTeam(team)}
              className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 border border-gray-200 hover:border-green-400 cursor-pointer group"
            >
              {/* Badge & Name */}
              <div className="flex items-center gap-3 mb-4">
                <div
                  className="w-16 h-16 rounded-full flex items-center justify-center text-4xl shadow-md border-2 border-white"
                  style={{ backgroundColor: `${team.color}20` }}
                >
                  {team.flag}
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900">{team.name}</h3>
                  <span className="text-sm text-gray-500 font-semibold">{team.code}</span>
                </div>
              </div>

              {/* Team Info */}
              <div className="space-y-2 mb-4">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Manager:</span>
                  <span className="font-semibold text-gray-900 text-right truncate ml-2">{team.manager}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">{team.type === 'club' ? 'League:' : 'Region:'}</span>
                  <span className="font-semibold text-gray-900">{team.league}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Founded:</span>
                  <span className="font-semibold text-gray-900">{team.founded}</span>
                </div>
              </div>

              {/* Stadium */}
              <div className="border-t border-gray-200 pt-3">
                <div className="flex items-center text-sm text-gray-600 mb-2">
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span className="truncate text-xs font-semibold">{team.stadium}</span>
                </div>
                <div className="text-xs text-gray-500">
                  Capacity: {team.capacity.toLocaleString()}
                </div>
              </div>

              {/* View Squad Link */}
              <div className="mt-4 pt-3 border-t border-gray-200">
                <span className="text-xs text-green-600 font-semibold group-hover:underline">
                  View Squad ({team.totalPlayers}) →
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Team Detail Modal */}
      {selectedTeam && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4" onClick={() => setSelectedTeam(null)}>
          <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="p-8">
              {/* Modal Header */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-4">
                  <div
                    className="w-20 h-20 rounded-full flex items-center justify-center text-5xl shadow-lg border-2 border-white"
                    style={{ backgroundColor: `${selectedTeam.color}20` }}
                  >
                    {selectedTeam.flag}
                  </div>
                  <div>
                    <h2 className="text-3xl font-bold text-gray-900">{selectedTeam.name}</h2>
                    <p className="text-gray-500 font-semibold">{selectedTeam.code} • {selectedTeam.country}</p>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedTeam(null)}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Team Info Grid */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-gray-50 rounded-xl p-4">
                  <p className="text-xs text-gray-500 mb-1">Manager</p>
                  <p className="text-lg font-bold text-gray-900">{selectedTeam.manager}</p>
                </div>
                <div className="bg-gray-50 rounded-xl p-4">
                  <p className="text-xs text-gray-500 mb-1">{selectedTeam.type === 'club' ? 'League' : 'Region'}</p>
                  <p className="text-lg font-bold text-gray-900">{selectedTeam.league}</p>
                </div>
                <div className="bg-gray-50 rounded-xl p-4">
                  <p className="text-xs text-gray-500 mb-1">Founded</p>
                  <p className="text-lg font-bold text-gray-900">{selectedTeam.founded}</p>
                </div>
                <div className="bg-gray-50 rounded-xl p-4">
                  <p className="text-xs text-gray-500 mb-1">Squad Size</p>
                  <p className="text-lg font-bold text-gray-900">{selectedTeam.totalPlayers} players</p>
                </div>
              </div>

              {/* Stadium Info */}
              <div className="bg-green-50 rounded-xl p-4 mb-6">
                <p className="text-xs text-gray-500 mb-1">Home Stadium</p>
                <p className="text-lg font-bold text-gray-900">{selectedTeam.stadium}</p>
                <p className="text-sm text-gray-600 mt-1">Capacity: {selectedTeam.capacity.toLocaleString()}</p>
              </div>

              {/* Squad Players */}
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Squad Members</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {getFootballPlayersByTeam(selectedTeam.id).map((player) => (
                    <div key={player.id} className="bg-gray-50 rounded-lg p-3 flex items-center gap-3">
                      <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-blue-400 rounded-full flex items-center justify-center text-white font-bold text-lg">
                        {player.jerseyNumber || player.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div className="flex-1">
                        <p className="font-bold text-gray-900">{player.name}</p>
                        <p className="text-xs text-gray-500">{player.position}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-xs text-gray-500">Age</p>
                        <p className="font-bold text-gray-900">{player.age}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
