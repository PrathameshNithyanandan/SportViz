'use client';

import { useState } from 'react';
import { footballPlayers, FootballPlayer } from '@/data/footballPlayers';
import { footballTeams } from '@/data/footballTeams';
import { getFootballTeamAvatarProps } from '@/lib/teamLogos';

type PositionFilter = 'all' | 'Goalkeeper' | 'Defender' | 'Midfielder' | 'Forward';

export default function FootballPlayersPage() {
  const [selectedPlayer, setSelectedPlayer] = useState<FootballPlayer | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [positionFilter, setPositionFilter] = useState<PositionFilter>('all');
  const [teamFilter, setTeamFilter] = useState<string>('all');

  // Filter players
  const filteredPlayers = footballPlayers.filter(player => {
    const matchesSearch = searchQuery === '' ||
      player.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      player.team.toLowerCase().includes(searchQuery.toLowerCase()) ||
      player.nationality.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesPosition = positionFilter === 'all' || player.position === positionFilter;
    const matchesTeam = teamFilter === 'all' || player.teamId === teamFilter;

    return matchesSearch && matchesPosition && matchesTeam;
  });

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="bg-gradient-to-br from-green-600 via-green-500 to-blue-400 p-8 rounded-3xl mx-8 mt-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold text-white mb-2">Football Players</h1>
              <p className="text-white/90 text-lg">World-class football stars</p>
            </div>
            <div className="text-6xl">⭐</div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="max-w-7xl mx-auto px-8 py-6">
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Search */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Search Players</label>
              <input
                type="text"
                placeholder="Search by name, team, nationality..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>

            {/* Position Filter */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Filter by Position</label>
              <select
                value={positionFilter}
                onChange={(e) => setPositionFilter(e.target.value as PositionFilter)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                <option value="all">All Positions</option>
                <option value="Goalkeeper">Goalkeeper</option>
                <option value="Defender">Defender</option>
                <option value="Midfielder">Midfielder</option>
                <option value="Forward">Forward</option>
              </select>
            </div>

            {/* Team Filter */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Filter by Team</label>
              <select
                value={teamFilter}
                onChange={(e) => setTeamFilter(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                <option value="all">All Teams</option>
                {footballTeams.map(team => (
                  <option key={team.id} value={team.id}>{team.flag} {team.name}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Results count */}
          <div className="mt-4 text-sm text-gray-600">
            Showing <span className="font-bold text-gray-900">{filteredPlayers.length}</span> player{filteredPlayers.length !== 1 ? 's' : ''}
          </div>
        </div>

        {/* Players Grid */}
        {filteredPlayers.length === 0 ? (
          <div className="bg-white rounded-2xl border border-gray-200 p-16 text-center shadow-sm">
            <div className="text-gray-400 text-6xl mb-4">🔍</div>
            <p className="text-gray-700 text-xl">No players found</p>
            <p className="text-gray-500 text-sm mt-2">Try adjusting your filters</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredPlayers.map((player) => {
              const team = getFootballTeamAvatarProps(player.team);

              return (
                <div
                  key={player.id}
                  onClick={() => setSelectedPlayer(player)}
                  className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 border border-gray-200 hover:border-green-400 cursor-pointer group"
                >
                  {/* Player Avatar */}
                  <div className="flex flex-col items-center mb-4">
                    <div className="relative">
                      <div className="w-24 h-24 bg-gradient-to-br from-green-500 to-blue-400 rounded-full flex items-center justify-center text-white font-bold text-3xl shadow-lg mb-3">
                        {player.jerseyNumber || player.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      {player.jerseyNumber && (
                        <div className="absolute -bottom-1 -right-1 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-md border-2 border-gray-100">
                          <span className="text-xs font-bold text-gray-900">#{player.jerseyNumber}</span>
                        </div>
                      )}
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 text-center">{player.name}</h3>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-2xl">{team.flag}</span>
                      <span className="text-sm text-gray-500 font-semibold">{team.code}</span>
                    </div>
                  </div>

                  {/* Position Badge */}
                  <div className="flex justify-center mb-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      player.position === 'Goalkeeper' ? 'bg-yellow-100 text-yellow-700' :
                      player.position === 'Defender' ? 'bg-blue-100 text-blue-700' :
                      player.position === 'Midfielder' ? 'bg-green-100 text-green-700' :
                      'bg-red-100 text-red-700'
                    }`}>
                      {player.position}
                    </span>
                  </div>

                  {/* Stats */}
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Age:</span>
                      <span className="font-semibold text-gray-900">{player.age}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Nationality:</span>
                      <span className="font-semibold text-gray-900 truncate ml-2">{player.nationality}</span>
                    </div>
                    {player.stats.appearances !== undefined && (
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Apps:</span>
                        <span className="font-semibold text-gray-900">{player.stats.appearances}</span>
                      </div>
                    )}
                    {player.stats.goals !== undefined && (
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Goals:</span>
                        <span className="font-semibold text-gray-900">{player.stats.goals}</span>
                      </div>
                    )}
                  </div>

                  {/* View Details */}
                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <span className="text-xs text-green-600 font-semibold group-hover:underline">
                      View Full Profile →
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Player Detail Modal */}
      {selectedPlayer && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4" onClick={() => setSelectedPlayer(null)}>
          <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="p-8">
              {/* Modal Header */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <div className="w-24 h-24 bg-gradient-to-br from-green-500 to-blue-400 rounded-full flex items-center justify-center text-white font-bold text-4xl shadow-lg">
                      {selectedPlayer.jerseyNumber || selectedPlayer.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    {selectedPlayer.jerseyNumber && (
                      <div className="absolute -bottom-1 -right-1 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-md border-2 border-gray-100">
                        <span className="text-sm font-bold text-gray-900">#{selectedPlayer.jerseyNumber}</span>
                      </div>
                    )}
                  </div>
                  <div>
                    <h2 className="text-3xl font-bold text-gray-900">{selectedPlayer.name}</h2>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-2xl">{getFootballTeamAvatarProps(selectedPlayer.team).flag}</span>
                      <span className="text-gray-500 font-semibold">{selectedPlayer.team}</span>
                    </div>
                    <span className={`inline-block mt-2 px-3 py-1 rounded-full text-sm font-semibold ${
                      selectedPlayer.position === 'Goalkeeper' ? 'bg-yellow-100 text-yellow-700' :
                      selectedPlayer.position === 'Defender' ? 'bg-blue-100 text-blue-700' :
                      selectedPlayer.position === 'Midfielder' ? 'bg-green-100 text-green-700' :
                      'bg-red-100 text-red-700'
                    }`}>
                      {selectedPlayer.position}
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedPlayer(null)}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Player Info */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-gray-50 rounded-xl p-4">
                  <p className="text-xs text-gray-500 mb-1">Age</p>
                  <p className="text-2xl font-bold text-gray-900">{selectedPlayer.age}</p>
                </div>
                <div className="bg-gray-50 rounded-xl p-4">
                  <p className="text-xs text-gray-500 mb-1">Nationality</p>
                  <p className="text-lg font-bold text-gray-900">{selectedPlayer.nationality}</p>
                </div>
                {selectedPlayer.height && (
                  <div className="bg-gray-50 rounded-xl p-4">
                    <p className="text-xs text-gray-500 mb-1">Height</p>
                    <p className="text-lg font-bold text-gray-900">{selectedPlayer.height} cm</p>
                  </div>
                )}
                {selectedPlayer.foot && (
                  <div className="bg-gray-50 rounded-xl p-4">
                    <p className="text-xs text-gray-500 mb-1">Preferred Foot</p>
                    <p className="text-lg font-bold text-gray-900">{selectedPlayer.foot}</p>
                  </div>
                )}
              </div>

              {/* Performance Stats */}
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Career Statistics</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {selectedPlayer.stats.appearances !== undefined && (
                    <div className="bg-blue-50 rounded-xl p-4 text-center">
                      <p className="text-sm text-gray-600 mb-1">Appearances</p>
                      <p className="text-3xl font-bold text-blue-600">{selectedPlayer.stats.appearances}</p>
                    </div>
                  )}
                  {selectedPlayer.stats.goals !== undefined && (
                    <div className="bg-red-50 rounded-xl p-4 text-center">
                      <p className="text-sm text-gray-600 mb-1">Goals</p>
                      <p className="text-3xl font-bold text-red-600">{selectedPlayer.stats.goals}</p>
                    </div>
                  )}
                  {selectedPlayer.stats.assists !== undefined && (
                    <div className="bg-green-50 rounded-xl p-4 text-center">
                      <p className="text-sm text-gray-600 mb-1">Assists</p>
                      <p className="text-3xl font-bold text-green-600">{selectedPlayer.stats.assists}</p>
                    </div>
                  )}
                  {selectedPlayer.stats.cleanSheets !== undefined && (
                    <div className="bg-purple-50 rounded-xl p-4 text-center">
                      <p className="text-sm text-gray-600 mb-1">Clean Sheets</p>
                      <p className="text-3xl font-bold text-purple-600">{selectedPlayer.stats.cleanSheets}</p>
                    </div>
                  )}
                  {selectedPlayer.stats.yellowCards !== undefined && (
                    <div className="bg-yellow-50 rounded-xl p-4 text-center">
                      <p className="text-sm text-gray-600 mb-1">Yellow Cards</p>
                      <p className="text-3xl font-bold text-yellow-600">{selectedPlayer.stats.yellowCards}</p>
                    </div>
                  )}
                  {selectedPlayer.stats.redCards !== undefined && selectedPlayer.stats.redCards > 0 && (
                    <div className="bg-red-50 rounded-xl p-4 text-center">
                      <p className="text-sm text-gray-600 mb-1">Red Cards</p>
                      <p className="text-3xl font-bold text-red-700">{selectedPlayer.stats.redCards}</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
