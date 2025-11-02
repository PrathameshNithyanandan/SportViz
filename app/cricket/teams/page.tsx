'use client';

import { useState } from 'react';
import { cricketTeams, CricketTeam } from '@/data/cricketTeams';
import { getPlayersByTeam } from '@/data/cricketPlayers';

export default function CricketTeamsPage() {
  const [selectedTeam, setSelectedTeam] = useState<CricketTeam | null>(null);

  const handleTeamClick = (team: CricketTeam) => {
    setSelectedTeam(team);
  };

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="bg-gradient-to-br from-blue-600 via-blue-500 to-green-400 p-8 rounded-3xl mx-8 mt-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold text-white mb-2">International Cricket Teams</h1>
              <p className="text-white/90 text-lg">Browse top cricket playing nations</p>
            </div>
            <div className="text-6xl">🌍</div>
          </div>
        </div>
      </div>

      {/* Teams Grid */}
      <div className="max-w-7xl mx-auto px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {cricketTeams.map((team) => (
            <div
              key={team.id}
              onClick={() => handleTeamClick(team)}
              className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 border border-gray-200 hover:border-blue-400 cursor-pointer group"
            >
              {/* Flag & Name */}
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
                  <span className="text-gray-600">Captain:</span>
                  <span className="font-semibold text-gray-900">{team.captain}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Coach:</span>
                  <span className="font-semibold text-gray-900">{team.coach}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Founded:</span>
                  <span className="font-semibold text-gray-900">{team.founded}</span>
                </div>
              </div>

              {/* Rankings */}
              <div className="border-t border-gray-200 pt-3">
                <p className="text-xs text-gray-500 mb-2 font-semibold">ICC Rankings</p>
                <div className="flex gap-3">
                  {team.ranking.test && (
                    <div className="flex-1 bg-blue-50 rounded-lg p-2 text-center">
                      <p className="text-xs text-gray-600">Test</p>
                      <p className="text-lg font-bold text-blue-600">#{team.ranking.test}</p>
                    </div>
                  )}
                  {team.ranking.odi && (
                    <div className="flex-1 bg-green-50 rounded-lg p-2 text-center">
                      <p className="text-xs text-gray-600">ODI</p>
                      <p className="text-lg font-bold text-green-600">#{team.ranking.odi}</p>
                    </div>
                  )}
                  {team.ranking.t20 && (
                    <div className="flex-1 bg-purple-50 rounded-lg p-2 text-center">
                      <p className="text-xs text-gray-600">T20</p>
                      <p className="text-lg font-bold text-purple-600">#{team.ranking.t20}</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Home Ground */}
              <div className="mt-3 pt-3 border-t border-gray-200">
                <div className="flex items-center text-sm text-gray-600">
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span className="truncate text-xs">{team.homeGround}</span>
                </div>
              </div>

              {/* View Players Link */}
              <div className="mt-4">
                <span className="text-xs text-blue-600 font-semibold group-hover:underline">
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
                    <p className="text-gray-500 font-semibold">{selectedTeam.code}</p>
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
                  <p className="text-xs text-gray-500 mb-1">Captain</p>
                  <p className="text-lg font-bold text-gray-900">{selectedTeam.captain}</p>
                </div>
                <div className="bg-gray-50 rounded-xl p-4">
                  <p className="text-xs text-gray-500 mb-1">Coach</p>
                  <p className="text-lg font-bold text-gray-900">{selectedTeam.coach}</p>
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

              {/* Home Ground */}
              <div className="bg-blue-50 rounded-xl p-4 mb-6">
                <p className="text-xs text-gray-500 mb-1">Home Ground</p>
                <p className="text-lg font-bold text-gray-900">{selectedTeam.homeGround}</p>
              </div>

              {/* ICC Rankings */}
              <div className="mb-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3">ICC Rankings</h3>
                <div className="grid grid-cols-3 gap-4">
                  {selectedTeam.ranking.test && (
                    <div className="bg-blue-50 rounded-xl p-4 text-center">
                      <p className="text-sm text-gray-600 mb-1">Test</p>
                      <p className="text-3xl font-bold text-blue-600">#{selectedTeam.ranking.test}</p>
                    </div>
                  )}
                  {selectedTeam.ranking.odi && (
                    <div className="bg-green-50 rounded-xl p-4 text-center">
                      <p className="text-sm text-gray-600 mb-1">ODI</p>
                      <p className="text-3xl font-bold text-green-600">#{selectedTeam.ranking.odi}</p>
                    </div>
                  )}
                  {selectedTeam.ranking.t20 && (
                    <div className="bg-purple-50 rounded-xl p-4 text-center">
                      <p className="text-sm text-gray-600 mb-1">T20</p>
                      <p className="text-3xl font-bold text-purple-600">#{selectedTeam.ranking.t20}</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Squad Players */}
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Squad Members</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {getPlayersByTeam(selectedTeam.id).map((player) => (
                    <div key={player.id} className="bg-gray-50 rounded-lg p-3 flex items-center gap-3">
                      <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-green-400 rounded-full flex items-center justify-center text-white font-bold text-lg">
                        {player.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div className="flex-1">
                        <p className="font-bold text-gray-900">{player.name}</p>
                        <p className="text-xs text-gray-500">{player.role}</p>
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
