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
  round?: string;
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

export type DetailedPlayer = {
  age: number;
  birth: PlayerBirth;
  firstname: string;
  height: string;
  id: number;
  injured: boolean;
  lastname: string;
  name: string;
  nationality: string;
  photo: string;
  weight: string;
};

export type PlayerBirth = {
  date: string;
  place: string;
  country: string;
};

//types for the DetailedStats type

export type Cards = {
  yellow: number;
  yellowred: number;
  red: number;
};

export type Dribbles = {
  attempts: number;
  success: number;
  past: number | null;
};

export type Duels = {
  total: number;
  won: number;
};

export type Fouls = {
  drawn: number;
  commited: number;
};

export type Games = {
  appearences: number;
  captain: boolean;
  lineups: number;
  minutes: number;
  number: number | null;
  position: string;
  rating: string;
};

export type Goals = {
  assists: number;
  conceded: number;
  saves: number | null;
  total: number;
};

export type Passes = {
  accuracy: number;
  key: number;
  total: number;
};

export type Penalty = {
  commited: number | null;
  missed: number;
  saved: number | null;
  scored: number;
  won: number | null;
};

export type Shots = {
  on: number;
  total: number;
};

export type Substitutes = {
  bench: number;
  in: number;
  out: number;
};

export type Tackles = {
  blocks: number | null;
  interceptions: number;
  total: number;
};

//

export type DetailedStats = {
  cards: Cards;
  dribbles: Dribbles;
  duels: Duels;
  fouls: Fouls;
  games: Games;
  goals: Goals;
  league: LeagueInfo;
  passes: Passes;
  penalty: Penalty;
  shots: Shots;
  substitutes: Substitutes;
  tackles: Tackles;
  team: Team;
}[];

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

export type ExtendedTeamDetails = {
  team: TeamInfo;
  venue: VenueInfo;
};

export type ExtendedPlayerDetails = Player & Team;

export type TeamInfo = Team & {
  code: string;
  country: string;
  founded: number;
  national: boolean;
};

export type VenueInfo = MatchVenue & {
  address: string;
  capacity: number;
  image: string;
  surface: string;
};

export type Highlight = {
  competition: Competition;
  date: string;
  embed: string;
  side1: object;
  side2: object;
  thumbnail: string;
  title: string;
  url: string;
  videos: Array<object>;
};

export type Competition = {
  id: number;
  name: string;
  url: string;
};

export type PlayerDetails = {
  player: DetailedPlayer;
  statistics: DetailedStats;
};
