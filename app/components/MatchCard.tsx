'use client';

import { useState } from 'react';
import { Match } from '@/types/match';
import { getTeamAvatarProps, getFootballTeamAvatarProps } from '@/lib/teamLogos';
import MatchDetailModal from './MatchDetailModal';

interface MatchCardProps {
  match: Match;
}

// Team Avatar Component
function TeamAvatar({ teamName, sport }: { teamName: string; sport: 'cricket' | 'football' }) {
  const team = sport === 'football'
    ? getFootballTeamAvatarProps(teamName)
    : getTeamAvatarProps(teamName);

  return (
    <div className="flex items-center gap-3">
      <div
        className="w-14 h-14 rounded-full flex items-center justify-center text-2xl shadow-md border-2 border-white"
        style={{ backgroundColor: `${team.color}20` }}
      >
        {team.flag}
      </div>
      <div className="flex flex-col">
        <span className="font-bold text-gray-900 text-base">{team.code}</span>
        <span className="text-xs text-gray-600 truncate max-w-[120px]">{team.name}</span>
      </div>
    </div>
  );
}

export default function MatchCard({ match }: MatchCardProps) {
  const [showDetail, setShowDetail] = useState(false);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'live':
        return (
          <div className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-red-500 text-white">
            <span className="w-2 h-2 bg-white rounded-full mr-2 animate-pulse"></span>
            LIVE
          </div>
        );
      case 'upcoming':
        return (
          <div className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-500/20 text-blue-600 border border-blue-500/30">
            Upcoming
          </div>
        );
      case 'ft':
      case 'completed':
        return (
          <div className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gray-500/20 text-gray-600 border border-gray-500/30">
            Completed
          </div>
        );
      default:
        return null;
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <>
      <div
        onClick={() => setShowDetail(true)}
        className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 border border-gray-200 hover:border-blue-400 group cursor-pointer"
      >
        {/* Header */}
        <div className="flex justify-between items-center mb-5">
          <div className="flex items-center gap-2">
            {getStatusBadge(match.status)}
            {match.isInternational && (
              <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded font-semibold">
                International
              </span>
            )}
          </div>
          <span className="text-xs text-gray-600">{formatDate(match.startTime)}</span>
        </div>

        {/* Match Type & Series */}
        <div className="mb-3 flex gap-2">
          {match.matchType && (
            <span className="text-xs font-semibold text-gray-500 bg-gray-100 px-2 py-1 rounded">
              {match.matchType}
            </span>
          )}
          {match.series && (
            <span className="text-xs text-gray-600 bg-blue-50 px-2 py-1 rounded truncate">
              {match.series}
            </span>
          )}
        </div>

        {/* Teams */}
        <div className="space-y-4">
          {/* Team A */}
          <div className="flex items-center justify-between">
            <TeamAvatar teamName={match.teamA} sport={match.sport} />
            {match.status !== 'upcoming' && match.scoreA && (
              <span className="text-3xl font-bold text-gray-900">{match.scoreA}</span>
            )}
          </div>

          {/* VS Divider */}
          <div className="flex items-center py-1">
            <div className="flex-1 border-t border-gray-300"></div>
            <span className="px-4 text-sm text-gray-500 font-semibold">VS</span>
            <div className="flex-1 border-t border-gray-300"></div>
          </div>

          {/* Team B */}
          <div className="flex items-center justify-between">
            <TeamAvatar teamName={match.teamB} sport={match.sport} />
            {match.status !== 'upcoming' && match.scoreB && (
              <span className="text-3xl font-bold text-gray-900">{match.scoreB}</span>
            )}
          </div>
        </div>

        {/* Venue */}
        <div className="mt-5 pt-4 border-t border-gray-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center text-sm text-gray-600">
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span className="truncate">{match.venue}</span>
            </div>
            <span className="text-xs text-blue-600 font-semibold group-hover:underline">
              View Details →
            </span>
          </div>
        </div>
      </div>

      {/* Detail Modal */}
      <MatchDetailModal match={match} isOpen={showDetail} onClose={() => setShowDetail(false)} />
    </>
  );
}
