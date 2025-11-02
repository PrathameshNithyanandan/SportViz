export interface CricketPlayer {
  id: string;
  name: string;
  teamId: string;
  team: string;
  role: 'Batsman' | 'Bowler' | 'All-rounder' | 'Wicket-keeper';
  battingStyle?: 'Right-hand' | 'Left-hand';
  bowlingStyle?: string;
  age: number;
  matches: {
    test?: number;
    odi?: number;
    t20?: number;
  };
  stats: {
    runs?: number;
    wickets?: number;
    average?: number;
    strikeRate?: number;
  };
  imageUrl?: string;
}

export const cricketPlayers: CricketPlayer[] = [
  // INDIA
  {
    id: 'rohit-sharma',
    name: 'Rohit Sharma',
    teamId: 'india',
    team: 'India',
    role: 'Batsman',
    battingStyle: 'Right-hand',
    age: 36,
    matches: { test: 56, odi: 265, t20: 148 },
    stats: { runs: 18000, average: 48.5, strikeRate: 88.9 }
  },
  {
    id: 'virat-kohli',
    name: 'Virat Kohli',
    teamId: 'india',
    team: 'India',
    role: 'Batsman',
    battingStyle: 'Right-hand',
    age: 35,
    matches: { test: 111, odi: 292, t20: 115 },
    stats: { runs: 25000, average: 53.6, strikeRate: 92.3 }
  },
  {
    id: 'kl-rahul',
    name: 'KL Rahul',
    teamId: 'india',
    team: 'India',
    role: 'Wicket-keeper',
    battingStyle: 'Right-hand',
    age: 31,
    matches: { test: 48, odi: 71, t20: 72 },
    stats: { runs: 9500, average: 45.2, strikeRate: 86.4 }
  },
  {
    id: 'jasprit-bumrah',
    name: 'Jasprit Bumrah',
    teamId: 'india',
    team: 'India',
    role: 'Bowler',
    battingStyle: 'Right-hand',
    bowlingStyle: 'Right-arm fast',
    age: 30,
    matches: { test: 35, odi: 83, t20: 70 },
    stats: { wickets: 450, average: 21.5, strikeRate: 42.8 }
  },
  {
    id: 'ravindra-jadeja',
    name: 'Ravindra Jadeja',
    teamId: 'india',
    team: 'India',
    role: 'All-rounder',
    battingStyle: 'Left-hand',
    bowlingStyle: 'Left-arm orthodox',
    age: 35,
    matches: { test: 70, odi: 195, t20: 74 },
    stats: { runs: 8500, wickets: 550, average: 32.4 }
  },

  // AUSTRALIA
  {
    id: 'pat-cummins',
    name: 'Pat Cummins',
    teamId: 'australia',
    team: 'Australia',
    role: 'Bowler',
    battingStyle: 'Right-hand',
    bowlingStyle: 'Right-arm fast',
    age: 30,
    matches: { test: 58, odi: 84, t20: 49 },
    stats: { wickets: 480, average: 22.1, strikeRate: 45.2 }
  },
  {
    id: 'steve-smith',
    name: 'Steve Smith',
    teamId: 'australia',
    team: 'Australia',
    role: 'Batsman',
    battingStyle: 'Right-hand',
    age: 34,
    matches: { test: 103, odi: 155, t20: 62 },
    stats: { runs: 17500, average: 56.8, strikeRate: 87.2 }
  },
  {
    id: 'david-warner',
    name: 'David Warner',
    teamId: 'australia',
    team: 'Australia',
    role: 'Batsman',
    battingStyle: 'Left-hand',
    age: 37,
    matches: { test: 107, odi: 161, t20: 110 },
    stats: { runs: 19000, average: 44.6, strikeRate: 91.5 }
  },
  {
    id: 'mitchell-starc',
    name: 'Mitchell Starc',
    teamId: 'australia',
    team: 'Australia',
    role: 'Bowler',
    battingStyle: 'Left-hand',
    bowlingStyle: 'Left-arm fast',
    age: 33,
    matches: { test: 85, odi: 115, t20: 61 },
    stats: { wickets: 620, average: 26.3, strikeRate: 48.1 }
  },
  {
    id: 'glenn-maxwell',
    name: 'Glenn Maxwell',
    teamId: 'australia',
    team: 'Australia',
    role: 'All-rounder',
    battingStyle: 'Right-hand',
    bowlingStyle: 'Right-arm off-break',
    age: 35,
    matches: { test: 7, odi: 137, t20: 121 },
    stats: { runs: 8500, wickets: 185, average: 34.2 }
  },

  // ENGLAND
  {
    id: 'ben-stokes',
    name: 'Ben Stokes',
    teamId: 'england',
    team: 'England',
    role: 'All-rounder',
    battingStyle: 'Left-hand',
    bowlingStyle: 'Right-arm fast-medium',
    age: 32,
    matches: { test: 99, odi: 113, t20: 43 },
    stats: { runs: 11500, wickets: 395, average: 36.8 }
  },
  {
    id: 'joe-root',
    name: 'Joe Root',
    teamId: 'england',
    team: 'England',
    role: 'Batsman',
    battingStyle: 'Right-hand',
    bowlingStyle: 'Right-arm off-break',
    age: 33,
    matches: { test: 141, odi: 165, t20: 32 },
    stats: { runs: 21000, average: 50.4, strikeRate: 86.7 }
  },
  {
    id: 'jos-buttler',
    name: 'Jos Buttler',
    teamId: 'england',
    team: 'England',
    role: 'Wicket-keeper',
    battingStyle: 'Right-hand',
    age: 33,
    matches: { test: 57, odi: 181, t20: 117 },
    stats: { runs: 13500, average: 40.2, strikeRate: 95.8 }
  },
  {
    id: 'james-anderson',
    name: 'James Anderson',
    teamId: 'england',
    team: 'England',
    role: 'Bowler',
    battingStyle: 'Left-hand',
    bowlingStyle: 'Right-arm fast-medium',
    age: 41,
    matches: { test: 183, odi: 194, t20: 19 },
    stats: { wickets: 950, average: 26.5, strikeRate: 56.2 }
  },
  {
    id: 'jonny-bairstow',
    name: 'Jonny Bairstow',
    teamId: 'england',
    team: 'England',
    role: 'Wicket-keeper',
    battingStyle: 'Right-hand',
    age: 34,
    matches: { test: 99, odi: 115, t20: 34 },
    stats: { runs: 12500, average: 42.8, strikeRate: 89.3 }
  },

  // PAKISTAN
  {
    id: 'babar-azam',
    name: 'Babar Azam',
    teamId: 'pakistan',
    team: 'Pakistan',
    role: 'Batsman',
    battingStyle: 'Right-hand',
    age: 29,
    matches: { test: 52, odi: 114, t20: 115 },
    stats: { runs: 14500, average: 54.2, strikeRate: 90.1 }
  },
  {
    id: 'shaheen-afridi',
    name: 'Shaheen Afridi',
    teamId: 'pakistan',
    team: 'Pakistan',
    role: 'Bowler',
    battingStyle: 'Left-hand',
    bowlingStyle: 'Left-arm fast',
    age: 23,
    matches: { test: 29, odi: 54, t20: 68 },
    stats: { wickets: 285, average: 24.1, strikeRate: 38.6 }
  },
  {
    id: 'mohammad-rizwan',
    name: 'Mohammad Rizwan',
    teamId: 'pakistan',
    team: 'Pakistan',
    role: 'Wicket-keeper',
    battingStyle: 'Right-hand',
    age: 31,
    matches: { test: 31, odi: 73, t20: 101 },
    stats: { runs: 8500, average: 46.5, strikeRate: 88.4 }
  },
  {
    id: 'shadab-khan',
    name: 'Shadab Khan',
    teamId: 'pakistan',
    team: 'Pakistan',
    role: 'All-rounder',
    battingStyle: 'Right-hand',
    bowlingStyle: 'Right-arm leg-break',
    age: 25,
    matches: { test: 5, odi: 86, t20: 99 },
    stats: { runs: 3200, wickets: 245, average: 28.4 }
  },
  {
    id: 'fakhar-zaman',
    name: 'Fakhar Zaman',
    teamId: 'pakistan',
    team: 'Pakistan',
    role: 'Batsman',
    battingStyle: 'Left-hand',
    age: 33,
    matches: { test: 5, odi: 82, t20: 74 },
    stats: { runs: 7800, average: 42.3, strikeRate: 93.7 }
  },

  // NEW ZEALAND
  {
    id: 'kane-williamson',
    name: 'Kane Williamson',
    teamId: 'new-zealand',
    team: 'New Zealand',
    role: 'Batsman',
    battingStyle: 'Right-hand',
    age: 33,
    matches: { test: 97, odi: 162, t20: 89 },
    stats: { runs: 18500, average: 52.4, strikeRate: 85.3 }
  },
  {
    id: 'trent-boult',
    name: 'Trent Boult',
    teamId: 'new-zealand',
    team: 'New Zealand',
    role: 'Bowler',
    battingStyle: 'Left-hand',
    bowlingStyle: 'Left-arm fast-medium',
    age: 34,
    matches: { test: 78, odi: 117, t20: 64 },
    stats: { wickets: 610, average: 27.2, strikeRate: 52.8 }
  },
  {
    id: 'devon-conway',
    name: 'Devon Conway',
    teamId: 'new-zealand',
    team: 'New Zealand',
    role: 'Wicket-keeper',
    battingStyle: 'Left-hand',
    age: 32,
    matches: { test: 12, odi: 43, t20: 54 },
    stats: { runs: 5400, average: 48.6, strikeRate: 87.9 }
  },
  {
    id: 'mitchell-santner',
    name: 'Mitchell Santner',
    teamId: 'new-zealand',
    team: 'New Zealand',
    role: 'All-rounder',
    battingStyle: 'Left-hand',
    bowlingStyle: 'Left-arm orthodox',
    age: 31,
    matches: { test: 26, odi: 101, t20: 105 },
    stats: { runs: 4200, wickets: 285, average: 31.8 }
  },
  {
    id: 'tim-southee',
    name: 'Tim Southee',
    teamId: 'new-zealand',
    team: 'New Zealand',
    role: 'Bowler',
    battingStyle: 'Right-hand',
    bowlingStyle: 'Right-arm fast-medium',
    age: 35,
    matches: { test: 95, odi: 159, t20: 126 },
    stats: { wickets: 720, average: 29.1, strikeRate: 54.3 }
  },

  // SOUTH AFRICA
  {
    id: 'quinton-de-kock',
    name: 'Quinton de Kock',
    teamId: 'south-africa',
    team: 'South Africa',
    role: 'Wicket-keeper',
    battingStyle: 'Left-hand',
    age: 31,
    matches: { test: 54, odi: 152, t20: 89 },
    stats: { runs: 13500, average: 44.3, strikeRate: 92.5 }
  },
  {
    id: 'kagiso-rabada',
    name: 'Kagiso Rabada',
    teamId: 'south-africa',
    team: 'South Africa',
    role: 'Bowler',
    battingStyle: 'Right-hand',
    bowlingStyle: 'Right-arm fast',
    age: 28,
    matches: { test: 64, odi: 98, t20: 65 },
    stats: { wickets: 510, average: 22.8, strikeRate: 41.2 }
  },
  {
    id: 'david-miller',
    name: 'David Miller',
    teamId: 'south-africa',
    team: 'South Africa',
    role: 'Batsman',
    battingStyle: 'Left-hand',
    age: 34,
    matches: { test: 2, odi: 165, t20: 125 },
    stats: { runs: 9800, average: 40.5, strikeRate: 138.4 }
  },
  {
    id: 'temba-bavuma',
    name: 'Temba Bavuma',
    teamId: 'south-africa',
    team: 'South Africa',
    role: 'Batsman',
    battingStyle: 'Right-hand',
    age: 33,
    matches: { test: 58, odi: 74, t20: 52 },
    stats: { runs: 7200, average: 35.8, strikeRate: 84.2 }
  },
  {
    id: 'anrich-nortje',
    name: 'Anrich Nortje',
    teamId: 'south-africa',
    team: 'South Africa',
    role: 'Bowler',
    battingStyle: 'Right-hand',
    bowlingStyle: 'Right-arm fast',
    age: 30,
    matches: { test: 16, odi: 35, t20: 31 },
    stats: { wickets: 185, average: 24.5, strikeRate: 39.8 }
  },

  // WEST INDIES
  {
    id: 'nicholas-pooran',
    name: 'Nicholas Pooran',
    teamId: 'west-indies',
    team: 'West Indies',
    role: 'Wicket-keeper',
    battingStyle: 'Left-hand',
    age: 28,
    matches: { test: 1, odi: 89, t20: 92 },
    stats: { runs: 6500, average: 38.7, strikeRate: 145.2 }
  },
  {
    id: 'jason-holder',
    name: 'Jason Holder',
    teamId: 'west-indies',
    team: 'West Indies',
    role: 'All-rounder',
    battingStyle: 'Right-hand',
    bowlingStyle: 'Right-arm fast-medium',
    age: 32,
    matches: { test: 71, odi: 141, t20: 58 },
    stats: { runs: 6800, wickets: 390, average: 28.4 }
  },
  {
    id: 'shimron-hetmyer',
    name: 'Shimron Hetmyer',
    teamId: 'west-indies',
    team: 'West Indies',
    role: 'Batsman',
    battingStyle: 'Left-hand',
    age: 27,
    matches: { test: 16, odi: 73, t20: 77 },
    stats: { runs: 5200, average: 36.4, strikeRate: 125.8 }
  },
  {
    id: 'alzarri-joseph',
    name: 'Alzarri Joseph',
    teamId: 'west-indies',
    team: 'West Indies',
    role: 'Bowler',
    battingStyle: 'Right-hand',
    bowlingStyle: 'Right-arm fast',
    age: 27,
    matches: { test: 17, odi: 54, t20: 48 },
    stats: { wickets: 235, average: 27.3, strikeRate: 43.5 }
  },
  {
    id: 'andre-russell',
    name: 'Andre Russell',
    teamId: 'west-indies',
    team: 'West Indies',
    role: 'All-rounder',
    battingStyle: 'Right-hand',
    bowlingStyle: 'Right-arm fast-medium',
    age: 35,
    matches: { test: 2, odi: 75, t20: 89 },
    stats: { runs: 4800, wickets: 195, average: 32.5, strikeRate: 165.3 }
  },

  // BANGLADESH
  {
    id: 'shakib-al-hasan',
    name: 'Shakib Al Hasan',
    teamId: 'bangladesh',
    team: 'Bangladesh',
    role: 'All-rounder',
    battingStyle: 'Left-hand',
    bowlingStyle: 'Left-arm orthodox',
    age: 36,
    matches: { test: 70, odi: 237, t20: 129 },
    stats: { runs: 14500, wickets: 680, average: 38.2 }
  },
  {
    id: 'mushfiqur-rahim',
    name: 'Mushfiqur Rahim',
    teamId: 'bangladesh',
    team: 'Bangladesh',
    role: 'Wicket-keeper',
    battingStyle: 'Right-hand',
    age: 36,
    matches: { test: 89, odi: 256, t20: 102 },
    stats: { runs: 16500, average: 37.8, strikeRate: 82.5 }
  },
  {
    id: 'tamim-iqbal',
    name: 'Tamim Iqbal',
    teamId: 'bangladesh',
    team: 'Bangladesh',
    role: 'Batsman',
    battingStyle: 'Left-hand',
    age: 35,
    matches: { test: 70, odi: 243, t20: 78 },
    stats: { runs: 15000, average: 36.7, strikeRate: 79.3 }
  },
  {
    id: 'mustafizur-rahman',
    name: 'Mustafizur Rahman',
    teamId: 'bangladesh',
    team: 'Bangladesh',
    role: 'Bowler',
    battingStyle: 'Left-hand',
    bowlingStyle: 'Left-arm fast-medium',
    age: 28,
    matches: { test: 16, odi: 89, t20: 102 },
    stats: { wickets: 385, average: 25.8, strikeRate: 44.2 }
  },
  {
    id: 'mehidy-hasan',
    name: 'Mehidy Hasan Miraz',
    teamId: 'bangladesh',
    team: 'Bangladesh',
    role: 'All-rounder',
    battingStyle: 'Right-hand',
    bowlingStyle: 'Right-arm off-break',
    age: 26,
    matches: { test: 46, odi: 95, t20: 58 },
    stats: { runs: 4500, wickets: 310, average: 31.2 }
  },

  // SRI LANKA
  {
    id: 'angelo-mathews',
    name: 'Angelo Mathews',
    teamId: 'sri-lanka',
    team: 'Sri Lanka',
    role: 'All-rounder',
    battingStyle: 'Right-hand',
    bowlingStyle: 'Right-arm medium',
    age: 36,
    matches: { test: 117, odi: 229, t20: 100 },
    stats: { runs: 17500, wickets: 315, average: 43.2 }
  },
  {
    id: 'wanindu-hasaranga',
    name: 'Wanindu Hasaranga',
    teamId: 'sri-lanka',
    team: 'Sri Lanka',
    role: 'All-rounder',
    battingStyle: 'Right-hand',
    bowlingStyle: 'Right-arm leg-break',
    age: 26,
    matches: { test: 6, odi: 53, t20: 69 },
    stats: { runs: 2800, wickets: 195, average: 28.5 }
  },
  {
    id: 'pathum-nissanka',
    name: 'Pathum Nissanka',
    teamId: 'sri-lanka',
    team: 'Sri Lanka',
    role: 'Batsman',
    battingStyle: 'Right-hand',
    age: 25,
    matches: { test: 18, odi: 44, t20: 35 },
    stats: { runs: 4200, average: 42.8, strikeRate: 85.7 }
  },
  {
    id: 'kusal-mendis',
    name: 'Kusal Mendis',
    teamId: 'sri-lanka',
    team: 'Sri Lanka',
    role: 'Wicket-keeper',
    battingStyle: 'Right-hand',
    age: 28,
    matches: { test: 74, odi: 135, t20: 66 },
    stats: { runs: 11500, average: 35.4, strikeRate: 86.9 }
  },
  {
    id: 'lahiru-kumara',
    name: 'Lahiru Kumara',
    teamId: 'sri-lanka',
    team: 'Sri Lanka',
    role: 'Bowler',
    battingStyle: 'Right-hand',
    bowlingStyle: 'Right-arm fast',
    age: 27,
    matches: { test: 29, odi: 58, t20: 42 },
    stats: { wickets: 265, average: 28.4, strikeRate: 48.3 }
  },

  // AFGHANISTAN
  {
    id: 'rashid-khan',
    name: 'Rashid Khan',
    teamId: 'afghanistan',
    team: 'Afghanistan',
    role: 'All-rounder',
    battingStyle: 'Right-hand',
    bowlingStyle: 'Right-arm leg-break',
    age: 25,
    matches: { test: 6, odi: 95, t20: 85 },
    stats: { runs: 2800, wickets: 485, average: 15.2 }
  },
  {
    id: 'mohammad-nabi',
    name: 'Mohammad Nabi',
    teamId: 'afghanistan',
    team: 'Afghanistan',
    role: 'All-rounder',
    battingStyle: 'Right-hand',
    bowlingStyle: 'Right-arm off-break',
    age: 38,
    matches: { test: 3, odi: 158, t20: 119 },
    stats: { runs: 7200, wickets: 320, average: 32.5 }
  },
  {
    id: 'rahmanullah-gurbaz',
    name: 'Rahmanullah Gurbaz',
    teamId: 'afghanistan',
    team: 'Afghanistan',
    role: 'Wicket-keeper',
    battingStyle: 'Right-hand',
    age: 22,
    matches: { odi: 42, t20: 58 },
    stats: { runs: 4100, average: 38.5, strikeRate: 128.4 }
  },
  {
    id: 'naveen-ul-haq',
    name: 'Naveen-ul-Haq',
    teamId: 'afghanistan',
    team: 'Afghanistan',
    role: 'Bowler',
    battingStyle: 'Right-hand',
    bowlingStyle: 'Right-arm fast-medium',
    age: 24,
    matches: { odi: 27, t20: 48 },
    stats: { wickets: 145, average: 23.5, strikeRate: 37.8 }
  },
  {
    id: 'fazalhaq-farooqi',
    name: 'Fazalhaq Farooqi',
    teamId: 'afghanistan',
    team: 'Afghanistan',
    role: 'Bowler',
    battingStyle: 'Left-hand',
    bowlingStyle: 'Left-arm fast-medium',
    age: 23,
    matches: { odi: 28, t20: 35 },
    stats: { wickets: 135, average: 22.8, strikeRate: 35.2 }
  }
];

export function getPlayersByTeam(teamId: string): CricketPlayer[] {
  return cricketPlayers.filter(player => player.teamId === teamId);
}

export function getPlayerById(id: string): CricketPlayer | undefined {
  return cricketPlayers.find(player => player.id === id);
}

export function searchPlayers(query: string): CricketPlayer[] {
  const lowerQuery = query.toLowerCase();
  return cricketPlayers.filter(player =>
    player.name.toLowerCase().includes(lowerQuery) ||
    player.team.toLowerCase().includes(lowerQuery)
  );
}
