export type LeagueTable = {
  rank: number;
  team: object;
  points: number;
  goalsDiff: number;
  played: number;
  win: number;
  lose: number;
  draw: number;
};

export type LeagueResults = {
  awayLogo: string;
  awayTeam: string;
  awayTeamScore: string;
  homeLogo: string;
  homeTeam: string;
  homeTeamScore: string;
};
