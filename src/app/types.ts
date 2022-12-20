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

export type DetailedStats = [
  {
    cards: any;
    dribbles: any;
    duels: any;
    fouls: any;
    games: any;
    goals: any;
    league: any;
    passes: any;
    penalty: any;
    shots: any;
    substitutes: any;
    tackles: any;
    team: Team;
  }
];

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

export type TopScorer = {
  player: DetailedPlayer;
  statistics: DetailedStats;
};
