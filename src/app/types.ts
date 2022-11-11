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

export type LeagueRound = {
  response: string;
};

export type ApiResponse = {
  errors: Array<any>;
  get: string;
  paging: object;
  parameters: object;
  response: Array<object>;
  results: number;
};

export type LeagueNews = {
  Image: string;
  NewsLink: string;
  PublisherDate: string;
  PublisherLogo: string;
  PublisherName: string;
  Title: string;
};
