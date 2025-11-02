// Team to country code mapping for flag emojis
export const teamFlags: Record<string, string> = {
  // Cricket Teams
  'India': '🇮🇳',
  'Australia': '🇦🇺',
  'England': '🏴󠁧󠁢󠁥󠁮󠁧󠁿',
  'Pakistan': '🇵🇰',
  'New Zealand': '🇳🇿',
  'South Africa': '🇿🇦',
  'West Indies': '🇼🇸',
  'Bangladesh': '🇧🇩',
  'Sri Lanka': '🇱🇰',
  'Afghanistan': '🇦🇫',
  'Ireland': '🇮🇪',
  'Zimbabwe': '🇿🇼',
  'Netherlands': '🇳🇱',
  'Scotland': '🏴󠁧󠁢󠁳󠁣󠁴󠁿',
  'UAE': '🇦🇪',
  'Oman': '🇴🇲',
  'Nepal': '🇳🇵',
  'PNG': '🇵🇬',
  'Namibia': '🇳🇦',
  'USA': '🇺🇸',
  'Canada': '🇨🇦',

  // Football Teams
  'Argentina': '🇦🇷',
  'Brazil': '🇧🇷',
  'France': '🇫🇷',
  'Germany': '🇩🇪',
  'Spain': '🇪🇸',
  'Italy': '🇮🇹',
  'Portugal': '🇵🇹',
  'Belgium': '🇧🇪',
  'Croatia': '🇭🇷',
  'Uruguay': '🇺🇾',
  'Mexico': '🇲🇽',
  'Colombia': '🇨🇴',
  'Denmark': '🇩🇰',
  'Switzerland': '🇨🇭',
  'Morocco': '🇲🇦',
  'Senegal': '🇸🇳',
  'Japan': '🇯🇵',
  'South Korea': '🇰🇷',
  'Poland': '🇵🇱',
  'Serbia': '🇷🇸',
  'Wales': '🏴󠁧󠁢󠁷󠁬󠁳󠁿',
  'Ecuador': '🇪🇨',
  'Tunisia': '🇹🇳',
  'Costa Rica': '🇨🇷',
  'Qatar': '🇶🇦',
  'Saudi Arabia': '🇸🇦',
  'Cameroon': '🇨🇲',
  'Ghana': '🇬🇭',
  'Iran': '🇮🇷',
};

export function getTeamFlag(teamName: string): string {
  return teamFlags[teamName] || '🏳️';
}

// Get flag emoji from country code (for future use)
export function getFlagEmoji(countryCode: string): string {
  const codePoints = countryCode
    .toUpperCase()
    .split('')
    .map(char => 127397 + char.charCodeAt(0));
  return String.fromCodePoint(...codePoints);
}
