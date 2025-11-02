'use client';

import { useState } from 'react';
import { cricketPlayers, CricketPlayer, searchPlayers } from '@/data/cricketPlayers';
import { cricketTeams } from '@/data/cricketTeams';
import { getTeamAvatarProps } from '@/lib/teamLogos';

type RoleFilter = 'all' | 'Batsman' | 'Bowler' | 'All-rounder' | 'Wicket-keeper';

export default function CricketPlayersPage() {
  const [selectedPlayer, setSelectedPlayer] = useState<CricketPlayer | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [roleFilter, setRoleFilter] = useState<RoleFilter>('all');
  const [teamFilter, setTeamFilter] = useState<string>('all');

  // Filter players
  const filteredPlayers = cricketPlayers.filter(player => {
    const matchesSearch = searchQuery === '' ||
      player.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      player.team.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesRole = roleFilter === 'all' || player.role === roleFilter;
    const matchesTeam = teamFilter === 'all' || player.teamId === teamFilter;

    return matchesSearch && matchesRole && matchesTeam;
  });

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="bg-gradient-to-br from-blue-600 via-blue-500 to-green-400 p-8 rounded-3xl mx-8 mt-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold text-white mb-2">International Cricket Players</h1>
              <p className="text-white/90 text-lg">Browse top international cricket stars</p>
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
                placeholder="Search by name or team..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Role Filter */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Filter by Role</label>
              <select
                value={roleFilter}
                onChange={(e) => setRoleFilter(e.target.value as RoleFilter)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Roles</option>
                <option value="Batsman">Batsman</option>
                <option value="Bowler">Bowler</option>
                <option value="All-rounder">All-rounder</option>
                <option value="Wicket-keeper">Wicket-keeper</option>
              </select>
            </div>

            {/* Team Filter */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Filter by Team</label>
              <select
                value={teamFilter}
                onChange={(e) => setTeamFilter(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Teams</option>
                {cricketTeams.map(team => (
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
              const team = getTeamAvatarProps(player.team);

              return (
                <div
                  key={player.id}
                  onClick={() => setSelectedPlayer(player)}
                  className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 border border-gray-200 hover:border-blue-400 cursor-pointer group"
                >
                  {/* Player Avatar */}
                  <div className="flex flex-col items-center mb-4">
                    <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-green-400 rounded-full flex items-center justify-center text-white font-bold text-3xl shadow-lg mb-3">
                      {player.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 text-center">{player.name}</h3>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-2xl">{team.flag}</span>
                      <span className="text-sm text-gray-500 font-semibold">{team.code}</span>
                    </div>
                  </div>

                  {/* Role Badge */}
                  <div className="flex justify-center mb-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      player.role === 'Batsman' ? 'bg-blue-100 text-blue-700' :
                      player.role === 'Bowler' ? 'bg-red-100 text-red-700' :
                      player.role === 'All-rounder' ? 'bg-green-100 text-green-700' :
                      'bg-purple-100 text-purple-700'
                    }`}>
                      {player.role}
                    </span>
                  </div>

                  {/* Stats */}
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Age:</span>
                      <span className="font-semibold text-gray-900">{player.age}</span>
                    </div>
                    {player.stats.runs !== undefined && (
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Runs:</span>
                        <span className="font-semibold text-gray-900">{player.stats.runs.toLocaleString()}</span>
                      </div>
                    )}
                    {player.stats.wickets !== undefined && (
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Wickets:</span>
                        <span className="font-semibold text-gray-900">{player.stats.wickets}</span>
                      </div>
                    )}
                    {player.stats.average !== undefined && (
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Average:</span>
                        <span className="font-semibold text-gray-900">{player.stats.average}</span>
                      </div>
                    )}
                  </div>

                  {/* View Details */}
                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <span className="text-xs text-blue-600 font-semibold group-hover:underline">
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
                  <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-green-400 rounded-full flex items-center justify-center text-white font-bold text-4xl shadow-lg">
                    {selectedPlayer.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <h2 className="text-3xl font-bold text-gray-900">{selectedPlayer.name}</h2>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-2xl">{getTeamAvatarProps(selectedPlayer.team).flag}</span>
                      <span className="text-gray-500 font-semibold">{selectedPlayer.team}</span>
                    </div>
                    <span className={`inline-block mt-2 px-3 py-1 rounded-full text-sm font-semibold ${
                      selectedPlayer.role === 'Batsman' ? 'bg-blue-100 text-blue-700' :
                      selectedPlayer.role === 'Bowler' ? 'bg-red-100 text-red-700' :
                      selectedPlayer.role === 'All-rounder' ? 'bg-green-100 text-green-700' :
                      'bg-purple-100 text-purple-700'
                    }`}>
                      {selectedPlayer.role}
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
                {selectedPlayer.battingStyle && (
                  <div className="bg-gray-50 rounded-xl p-4">
                    <p className="text-xs text-gray-500 mb-1">Batting Style</p>
                    <p className="text-lg font-bold text-gray-900">{selectedPlayer.battingStyle}</p>
                  </div>
                )}
                {selectedPlayer.bowlingStyle && (
                  <div className="bg-gray-50 rounded-xl p-4 col-span-2">
                    <p className="text-xs text-gray-500 mb-1">Bowling Style</p>
                    <p className="text-lg font-bold text-gray-900">{selectedPlayer.bowlingStyle}</p>
                  </div>
                )}
              </div>

              {/* Match Statistics */}
              <div className="mb-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3">Match Statistics</h3>
                <div className="grid grid-cols-3 gap-4">
                  {selectedPlayer.matches.test && (
                    <div className="bg-blue-50 rounded-xl p-4 text-center">
                      <p className="text-sm text-gray-600 mb-1">Test Matches</p>
                      <p className="text-3xl font-bold text-blue-600">{selectedPlayer.matches.test}</p>
                    </div>
                  )}
                  {selectedPlayer.matches.odi && (
                    <div className="bg-green-50 rounded-xl p-4 text-center">
                      <p className="text-sm text-gray-600 mb-1">ODI Matches</p>
                      <p className="text-3xl font-bold text-green-600">{selectedPlayer.matches.odi}</p>
                    </div>
                  )}
                  {selectedPlayer.matches.t20 && (
                    <div className="bg-purple-50 rounded-xl p-4 text-center">
                      <p className="text-sm text-gray-600 mb-1">T20 Matches</p>
                      <p className="text-3xl font-bold text-purple-600">{selectedPlayer.matches.t20}</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Performance Stats */}
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Performance Statistics</h3>
                <div className="grid grid-cols-2 gap-4">
                  {selectedPlayer.stats.runs !== undefined && (
                    <div className="bg-blue-50 rounded-xl p-4">
                      <p className="text-sm text-gray-600 mb-1">Total Runs</p>
                      <p className="text-3xl font-bold text-blue-600">{selectedPlayer.stats.runs.toLocaleString()}</p>
                    </div>
                  )}
                  {selectedPlayer.stats.wickets !== undefined && (
                    <div className="bg-red-50 rounded-xl p-4">
                      <p className="text-sm text-gray-600 mb-1">Total Wickets</p>
                      <p className="text-3xl font-bold text-red-600">{selectedPlayer.stats.wickets}</p>
                    </div>
                  )}
                  {selectedPlayer.stats.average !== undefined && (
                    <div className="bg-green-50 rounded-xl p-4">
                      <p className="text-sm text-gray-600 mb-1">Average</p>
                      <p className="text-3xl font-bold text-green-600">{selectedPlayer.stats.average}</p>
                    </div>
                  )}
                  {selectedPlayer.stats.strikeRate !== undefined && (
                    <div className="bg-purple-50 rounded-xl p-4">
                      <p className="text-sm text-gray-600 mb-1">Strike Rate</p>
                      <p className="text-3xl font-bold text-purple-600">{selectedPlayer.stats.strikeRate}</p>
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
