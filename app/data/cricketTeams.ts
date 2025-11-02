export interface CricketTeam {
  id: string;
  name: string;
  code: string;
  flag: string;
  color: string;
  captain: string;
  coach: string;
  ranking: {
    test?: number;
    odi?: number;
    t20?: number;
  };
  founded: number;
  homeGround: string;
  totalPlayers: number;
}

export const cricketTeams: CricketTeam[] = [
  {
    id: 'india',
    name: 'India',
    code: 'IND',
    flag: '🇮🇳',
    color: '#138808',
    captain: 'Rohit Sharma',
    coach: 'Rahul Dravid',
    ranking: { test: 1, odi: 1, t20: 3 },
    founded: 1928,
    homeGround: 'Wankhede Stadium, Mumbai',
    totalPlayers: 15
  },
  {
    id: 'australia',
    name: 'Australia',
    code: 'AUS',
    flag: '🇦🇺',
    color: '#FFC72C',
    captain: 'Pat Cummins',
    coach: 'Andrew McDonald',
    ranking: { test: 2, odi: 3, t20: 4 },
    founded: 1877,
    homeGround: 'Melbourne Cricket Ground',
    totalPlayers: 15
  },
  {
    id: 'england',
    name: 'England',
    code: 'ENG',
    flag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿',
    color: '#002D62',
    captain: 'Ben Stokes',
    coach: 'Brendon McCullum',
    ranking: { test: 4, odi: 2, t20: 2 },
    founded: 1877,
    homeGround: 'Lords Cricket Ground, London',
    totalPlayers: 15
  },
  {
    id: 'pakistan',
    name: 'Pakistan',
    code: 'PAK',
    flag: '🇵🇰',
    color: '#01411C',
    captain: 'Babar Azam',
    coach: 'Grant Bradburn',
    ranking: { test: 5, odi: 5, t20: 1 },
    founded: 1952,
    homeGround: 'National Stadium, Karachi',
    totalPlayers: 15
  },
  {
    id: 'new-zealand',
    name: 'New Zealand',
    code: 'NZ',
    flag: '🇳🇿',
    color: '#000000',
    captain: 'Kane Williamson',
    coach: 'Gary Stead',
    ranking: { test: 3, odi: 4, t20: 5 },
    founded: 1930,
    homeGround: 'Eden Park, Auckland',
    totalPlayers: 15
  },
  {
    id: 'south-africa',
    name: 'South Africa',
    code: 'SA',
    flag: '🇿🇦',
    color: '#007749',
    captain: 'Temba Bavuma',
    coach: 'Rob Walter',
    ranking: { test: 6, odi: 6, t20: 6 },
    founded: 1889,
    homeGround: 'Newlands, Cape Town',
    totalPlayers: 15
  },
  {
    id: 'west-indies',
    name: 'West Indies',
    code: 'WI',
    flag: '🏴󠁧󠁢󠁷󠁬󠁳󠁿',
    color: '#7B0041',
    captain: 'Kraigg Brathwaite',
    coach: 'Daren Sammy',
    ranking: { test: 8, odi: 9, t20: 8 },
    founded: 1928,
    homeGround: 'Kensington Oval, Barbados',
    totalPlayers: 15
  },
  {
    id: 'bangladesh',
    name: 'Bangladesh',
    code: 'BAN',
    flag: '🇧🇩',
    color: '#006A4E',
    captain: 'Shakib Al Hasan',
    coach: 'Chandika Hathurusingha',
    ranking: { test: 9, odi: 7, t20: 9 },
    founded: 1977,
    homeGround: 'Shere Bangla Stadium, Dhaka',
    totalPlayers: 15
  },
  {
    id: 'sri-lanka',
    name: 'Sri Lanka',
    code: 'SL',
    flag: '🇱🇰',
    color: '#FFC726',
    captain: 'Dasun Shanaka',
    coach: 'Chris Silverwood',
    ranking: { test: 7, odi: 8, t20: 7 },
    founded: 1981,
    homeGround: 'R. Premadasa Stadium, Colombo',
    totalPlayers: 15
  },
  {
    id: 'afghanistan',
    name: 'Afghanistan',
    code: 'AFG',
    flag: '🇦🇫',
    color: '#002A5C',
    captain: 'Hashmatullah Shahidi',
    coach: 'Jonathan Trott',
    ranking: { test: 10, odi: 10, t20: 10 },
    founded: 1995,
    homeGround: 'Sharjah Cricket Stadium',
    totalPlayers: 15
  }
];

export function getTeamById(id: string): CricketTeam | undefined {
  return cricketTeams.find(team => team.id === id);
}

export function getTeamByName(name: string): CricketTeam | undefined {
  return cricketTeams.find(team => team.name.toLowerCase() === name.toLowerCase());
}
