'use client';

import { Match } from '@/types/match';
import { getTeamAvatarProps, getFootballTeamAvatarProps } from '@/lib/teamLogos';

interface MatchDetailModalProps {
  match: Match;
  isOpen: boolean;
  onClose: () => void;
}

export default function MatchDetailModal({ match, isOpen, onClose }: MatchDetailModalProps) {
  if (!isOpen) return null;

  const teamA = match.sport === 'football'
    ? getFootballTeamAvatarProps(match.teamA)
    : getTeamAvatarProps(match.teamA);
  const teamB = match.sport === 'football'
    ? getFootballTeamAvatarProps(match.teamB)
    : getTeamAvatarProps(match.teamB);

  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="sticky top-0 bg-gradient-to-r from-blue-600 to-blue-700 p-6 flex justify-between items-center rounded-t-2xl">
          <div>
            <h2 className="text-2xl font-bold text-white">{match.series || 'Cricket Match'}</h2>
            <p className="text-blue-100 text-sm mt-1">{match.matchType} • {match.venue}</p>
          </div>
          <button
            onClick={onClose}
            className="text-white hover:bg-white/20 rounded-lg p-2 transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Teams & Scores */}
          <div className="space-y-6">
            {/* Team A */}
            <div className="flex items-center justify-between bg-gray-50 p-6 rounded-xl">
              <div className="flex items-center gap-4">
                <div
                  className="w-16 h-16 rounded-full flex items-center justify-center text-3xl shadow-lg border-2 border-white"
                  style={{ backgroundColor: `${teamA.color}20` }}
                >
                  {teamA.flag}
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900">{teamA.name}</h3>
                  <p className="text-sm text-gray-600">{teamA.code}</p>
                </div>
              </div>
              {match.scoreA && (
                <div className="text-right">
                  <div className="text-4xl font-bold text-gray-900">{match.scoreA}</div>
                </div>
              )}
            </div>

            {/* Team B */}
            <div className="flex items-center justify-between bg-gray-50 p-6 rounded-xl">
              <div className="flex items-center gap-4">
                <div
                  className="w-16 h-16 rounded-full flex items-center justify-center text-3xl shadow-lg border-2 border-white"
                  style={{ backgroundColor: `${teamB.color}20` }}
                >
                  {teamB.flag}
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900">{teamB.name}</h3>
                  <p className="text-sm text-gray-600">{teamB.code}</p>
                </div>
              </div>
              {match.scoreB && (
                <div className="text-right">
                  <div className="text-4xl font-bold text-gray-900">{match.scoreB}</div>
                </div>
              )}
            </div>
          </div>

          {/* Match Info */}
          <div className="mt-8 grid grid-cols-2 gap-4">
            <div className="bg-blue-50 p-4 rounded-lg">
              <p className="text-xs text-gray-600 font-semibold uppercase">Status</p>
              <p className="text-lg font-bold text-gray-900 mt-1 capitalize">{match.status === 'ft' ? 'Completed' : match.status}</p>
            </div>
            <div className="bg-blue-50 p-4 rounded-lg">
              <p className="text-xs text-gray-600 font-semibold uppercase">Format</p>
              <p className="text-lg font-bold text-gray-900 mt-1">{match.matchType}</p>
            </div>
            <div className="bg-blue-50 p-4 rounded-lg col-span-2">
              <p className="text-xs text-gray-600 font-semibold uppercase">Venue</p>
              <p className="text-lg font-bold text-gray-900 mt-1">{match.venue}</p>
            </div>
            <div className="bg-blue-50 p-4 rounded-lg col-span-2">
              <p className="text-xs text-gray-600 font-semibold uppercase">Match Time</p>
              <p className="text-lg font-bold text-gray-900 mt-1">
                {new Date(match.startTime).toLocaleString('en-US', {
                  dateStyle: 'full',
                  timeStyle: 'short'
                })}
              </p>
            </div>
          </div>

          {/* Additional match data from API */}
          {match.rawData && (
            <div className="mt-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Match Details</h3>
              <div className="bg-gray-50 p-4 rounded-lg space-y-2 text-sm">
                {match.rawData.matchWinner && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">Winner:</span>
                    <span className="font-semibold text-gray-900">{match.rawData.matchWinner}</span>
                  </div>
                )}
                {match.rawData.tossWinner && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">Toss:</span>
                    <span className="font-semibold text-gray-900">
                      {match.rawData.tossWinner} {match.rawData.tossChoice}
                    </span>
                  </div>
                )}
                {match.rawData.matchEnded && match.rawData.status && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">Result:</span>
                    <span className="font-semibold text-gray-900">{match.rawData.status}</span>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Close Button */}
        <div className="p-6 border-t border-gray-200">
          <button
            onClick={onClose}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
