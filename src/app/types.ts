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

export type LeagueInfo = {
  country: string;
  flag: string;
  id: number;
  logo: string;
  name: string;
  round: string;
  season: number;
};

export type Score = {
  extratime: any;
  fulltime: any;
  halftime: any;
  penalty: any;
};

export type Fixture = {
  fixture: FixtureDetails;
  goals: object;
  league: LeagueInfo;
  score: Score;
  teams: any;
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

export type Last5 = {
  fixture: object;
  goals: object;
  league: object;
  score: object;
  teams: object;
};

export type TeamStats = {
  all: object;
  away: object;
  home: object;
  description: string;
  form: string;
  goalsDiff: number;
  group: string;
  points: number;
  rank: number;
  status: string;
  team: Team;
  update: string;
};

export type Team = {
  id: number;
  name: string;
  logo: string;
};

export type Player = {
  age: number;
  id: number;
  name: string;
  number: number;
  photo: string;
  position: string;
};

export type FixtureDetails = {
  date: string;
  id: number;
  periods: object;
  referee: string;
  status: GameStatus;
  timestamp: number;
  timezone: string;
  venue: MatchVenue;
};

export type GameStatus = {
  elapsed: string;
  long: string;
  short: string;
};

export type MatchVenue = {
  id: number;
  name: string;
  city: string;
};
