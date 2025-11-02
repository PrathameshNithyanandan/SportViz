// Team logos using emoji shields + country codes for cricket teams
export const cricketTeamLogos: Record<string, { flag: string; color: string; code: string }> = {
  'India': { flag: '🇮🇳', color: '#138808', code: 'IND' },
  'Australia': { flag: '🇦🇺', color: '#FFC72C', code: 'AUS' },
  'England': { flag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿', color: '#002D62', code: 'ENG' },
  'Pakistan': { flag: '🇵🇰', color: '#01411C', code: 'PAK' },
  'New Zealand': { flag: '🇳🇿', color: '#000000', code: 'NZ' },
  'South Africa': { flag: '🇿🇦', color: '#007749', code: 'SA' },
  'West Indies': { flag: '🏴󠁧󠁢󠁷󠁬󠁳󠁿', color: '#7B0041', code: 'WI' },
  'Bangladesh': { flag: '🇧🇩', color: '#006A4E', code: 'BAN' },
  'Sri Lanka': { flag: '🇱🇰', color: '#FFC726', code: 'SL' },
  'Afghanistan': { flag: '🇦🇫', color: '#002A5C', code: 'AFG' },
  'Ireland': { flag: '🇮🇪', color: '#169B62', code: 'IRE' },
  'Zimbabwe': { flag: '🇿🇼', color: '#DA2032', code: 'ZIM' },
  'Netherlands': { flag: '🇳🇱', color: '#FF6C00', code: 'NED' },
  'Scotland': { flag: '🏴󠁧󠁢󠁳󠁣󠁴󠁿', color: '#0065BD', code: 'SCO' },
  'UAE': { flag: '🇦🇪', color: '#00732F', code: 'UAE' },
  'Oman': { flag: '🇴🇲', color: '#ED1B24', code: 'OMA' },
  'Nepal': { flag: '🇳🇵', color: '#DC143C', code: 'NEP' },
  'PNG': { flag: '🇵🇬', color: '#CE1126', code: 'PNG' },
  'Namibia': { flag: '🇳🇦', color: '#003580', code: 'NAM' },
  'USA': { flag: '🇺🇸', color: '#002868', code: 'USA' },
  'Canada': { flag: '🇨🇦', color: '#FF0000', code: 'CAN' },
};

export function getTeamLogo(teamName: string) {
  return cricketTeamLogos[teamName] || {
    flag: '🏏',
    color: '#0066CC',
    code: teamName.substring(0, 3).toUpperCase()
  };
}

// Generate team avatar component props
export function getTeamAvatarProps(teamName: string) {
  const team = getTeamLogo(teamName);
  return {
    flag: team.flag,
    code: team.code,
    color: team.color,
    name: teamName
  };
}

// Football team logos
export const footballTeamLogos: Record<string, { flag: string; color: string; code: string }> = {
  // National Teams
  'Brazil': { flag: '🇧🇷', color: '#009739', code: 'BRA' },
  'Argentina': { flag: '🇦🇷', color: '#74ACDF', code: 'ARG' },
  'France': { flag: '🇫🇷', color: '#002395', code: 'FRA' },
  'Germany': { flag: '🇩🇪', color: '#000000', code: 'GER' },
  'Spain': { flag: '🇪🇸', color: '#AA151B', code: 'ESP' },
  'Italy': { flag: '🇮🇹', color: '#009246', code: 'ITA' },
  'England': { flag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿', color: '#FFFFFF', code: 'ENG' },
  'Portugal': { flag: '🇵🇹', color: '#FF0000', code: 'POR' },
  'Netherlands': { flag: '🇳🇱', color: '#FF6C00', code: 'NED' },
  'Belgium': { flag: '🇧🇪', color: '#ED2939', code: 'BEL' },
  'Uruguay': { flag: '🇺🇾', color: '#0038A8', code: 'URU' },
  'Croatia': { flag: '🇭🇷', color: '#FF0000', code: 'CRO' },
  'Denmark': { flag: '🇩🇰', color: '#C60C30', code: 'DEN' },
  'Switzerland': { flag: '🇨🇭', color: '#FF0000', code: 'SUI' },
  'Mexico': { flag: '🇲🇽', color: '#006847', code: 'MEX' },
  'Colombia': { flag: '🇨🇴', color: '#FCD116', code: 'COL' },
  'Sweden': { flag: '🇸🇪', color: '#006AA7', code: 'SWE' },
  'Poland': { flag: '🇵🇱', color: '#DC143C', code: 'POL' },
  'Ukraine': { flag: '🇺🇦', color: '#0057B7', code: 'UKR' },
  'Austria': { flag: '🇦🇹', color: '#ED2939', code: 'AUT' },
  'Turkey': { flag: '🇹🇷', color: '#E30A17', code: 'TUR' },
  'Serbia': { flag: '🇷🇸', color: '#C6363C', code: 'SRB' },
  'Greece': { flag: '🇬🇷', color: '#0D5EAF', code: 'GRE' },
  'Czech Republic': { flag: '🇨🇿', color: '#D7141A', code: 'CZE' },
  'Norway': { flag: '🇳🇴', color: '#BA0C2F', code: 'NOR' },
  'Scotland': { flag: '🏴󠁧󠁢󠁳󠁣󠁴󠁿', color: '#0065BD', code: 'SCO' },
  'Wales': { flag: '🏴󠁧󠁢󠁷󠁬󠁳󠁿', color: '#C8102E', code: 'WAL' },
  'Republic of Ireland': { flag: '🇮🇪', color: '#169B62', code: 'IRL' },

  // Premier League Clubs
  'Manchester United': { flag: '🔴', color: '#DA291C', code: 'MUN' },
  'Manchester City': { flag: '🔵', color: '#6CABDD', code: 'MCI' },
  'Liverpool': { flag: '🔴', color: '#C8102E', code: 'LIV' },
  'Chelsea': { flag: '🔵', color: '#034694', code: 'CHE' },
  'Arsenal': { flag: '🔴', color: '#EF0107', code: 'ARS' },
  'Tottenham Hotspur': { flag: '⚪', color: '#132257', code: 'TOT' },
  'Newcastle United': { flag: '⚫', color: '#241F20', code: 'NEW' },
  'Aston Villa': { flag: '🟣', color: '#95BFE5', code: 'AVL' },
  'West Ham United': { flag: '⚒️', color: '#7A263A', code: 'WHU' },
  'Brighton & Hove Albion': { flag: '🔵', color: '#0057B8', code: 'BHA' },
  'Fulham': { flag: '⚪', color: '#000000', code: 'FUL' },
  'Wolverhampton Wanderers': { flag: '🟠', color: '#FDB913', code: 'WOL' },
  'Everton': { flag: '🔵', color: '#003399', code: 'EVE' },
  'Leicester City': { flag: '🦊', color: '#003090', code: 'LEI' },
  'Brentford': { flag: '🐝', color: '#E30613', code: 'BRE' },
  'Crystal Palace': { flag: '🦅', color: '#1B458F', code: 'CRY' },
  'Nottingham Forest': { flag: '🌳', color: '#DD0000', code: 'NFO' },
  'Bournemouth': { flag: '🍒', color: '#DA291C', code: 'BOU' },
  'Southampton': { flag: '🔴', color: '#D71920', code: 'SOU' },
  'Leeds United': { flag: '⚪', color: '#1D428A', code: 'LEE' },

  // La Liga Clubs
  'Real Madrid': { flag: '⚪', color: '#00529F', code: 'RMA' },
  'Barcelona': { flag: '🔵', color: '#004D98', code: 'BAR' },
  'Atlético Madrid': { flag: '🔴', color: '#CE3524', code: 'ATM' },
  'Sevilla': { flag: '⚪', color: '#D0103A', code: 'SEV' },
  'Valencia': { flag: '🦇', color: '#EE3524', code: 'VAL' },
  'Real Betis': { flag: '🟢', color: '#00954C', code: 'BET' },
  'Athletic Bilbao': { flag: '🔴', color: '#EE2523', code: 'ATH' },
  'Real Sociedad': { flag: '🔵', color: '#0A3A82', code: 'RSO' },
  'Villarreal': { flag: '🟡', color: '#FFE667', code: 'VIL' },

  // Bundesliga Clubs
  'Bayern Munich': { flag: '🔴', color: '#DC052D', code: 'BAY' },
  'Borussia Dortmund': { flag: '🟡', color: '#FDE100', code: 'BVB' },
  'RB Leipzig': { flag: '🔴', color: '#DD0741', code: 'RBL' },
  'Bayer Leverkusen': { flag: '🔴', color: '#E32221', code: 'B04' },
  'Union Berlin': { flag: '🔴', color: '#EB1923', code: 'FCU' },
  'Eintracht Frankfurt': { flag: '🦅', color: '#E1000F', code: 'SGE' },
  'Borussia Mönchengladbach': { flag: '⚪', color: '#000000', code: 'BMG' },

  // Serie A Clubs
  'Juventus': { flag: '⚫', color: '#000000', code: 'JUV' },
  'AC Milan': { flag: '🔴', color: '#FB090B', code: 'MIL' },
  'Inter Milan': { flag: '🔵', color: '#0068A8', code: 'INT' },
  'Napoli': { flag: '🔵', color: '#034694', code: 'NAP' },
  'AS Roma': { flag: '🟡', color: '#FFB500', code: 'ROM' },
  'Lazio': { flag: '🔵', color: '#87D8F7', code: 'LAZ' },
  'Atalanta': { flag: '⚫', color: '#1A1A1A', code: 'ATA' },
  'Fiorentina': { flag: '🟣', color: '#6F2B8C', code: 'FIO' },

  // Ligue 1 Clubs
  'Paris Saint-Germain': { flag: '🔴', color: '#004170', code: 'PSG' },
  'Marseille': { flag: '⚪', color: '#2FAEE0', code: 'OLM' },
  'Lyon': { flag: '🔵', color: '#D30B3D', code: 'OLY' },
  'Monaco': { flag: '🔴', color: '#C8102E', code: 'MON' },
  'Lille': { flag: '🔴', color: '#D32030', code: 'LIL' },
  'Nice': { flag: '🔴', color: '#ED1C24', code: 'NIC' },
  'Rennes': { flag: '🔴', color: '#E41F22', code: 'REN' },
};

export function getFootballTeamLogo(teamName: string) {
  return footballTeamLogos[teamName] || {
    flag: '⚽',
    color: '#0066CC',
    code: teamName.substring(0, 3).toUpperCase()
  };
}

export function getFootballTeamAvatarProps(teamName: string) {
  const team = getFootballTeamLogo(teamName);
  return {
    flag: team.flag,
    code: team.code,
    color: team.color,
    name: teamName
  };
}
