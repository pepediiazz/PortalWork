export interface BasketballResponse {
  get: string;
  parameters: {
    date: string;
  };
  errors: any[];
  results: number;
  paging: {
    current: number;
    total: number;
  };
  response: Game[];
}

export interface Game {
  id: number;
  league: {
    id: number;
    name: string;
    type: string;
    season: number;
    logo: string;
  };
  country: {
    id: number;
    name: string;
    code: string;
    flag: string;
  };
  teams: {
    home: Team;
    away: Team;
  };
  scores: {
    home: ScoreDetail;
    away: ScoreDetail;
  };
  status: {
    long: string;
    short: string;
    timer: string | null;
  };
  date: string;
  time: string;
  timestamp: number;
  periods: {
    current: number | null;
    total: number;
    endOfPeriod: boolean;
  };
  referees: string[];
  statistics?: Statistic[]; // Añadir esta línea
  events?: GameEvent[]; // Añadir esta línea
  lineups?: Lineup[]; // Añadir esta línea
}

interface Team {
  id: number;
  name: string;
  logo: string;
  winner: boolean | null;
}

interface ScoreDetail {
  quarter_1: number | null;
  quarter_2: number | null;
  quarter_3: number | null;
  quarter_4: number | null;
  over_time: number | null;
  total: number | null;
}

export interface GameStatisticsResponse {
  get: string;
  parameters: {
    game: string;
  };
  errors: any[];
  results: number;
  response: GameStatistics[];
}

export interface GameStatistics {
  team: Team;
  statistics: Statistic[];
}

interface Statistic {
  type: string;
  value: number | string;
}

export interface GameEventsResponse {
  get: string;
  parameters: {
    game: string;
  };
  errors: any[];
  results: number;
  response: GameEvent[];
}

export interface GameEvent {
  time: {
    quarter: number;
    minute: number;
  };
  team: Team;
  player: {
    id: number;
    name: string;
  };
  type: string;
  detail: string;
  comments: string | null;
}

export interface GameLineupsResponse {
  get: string;
  parameters: {
    game: string;
  };
  errors: any[];
  results: number;
  response: Lineup[];
}

export interface Lineup {
  team: Team;
  coach: {
    id: number;
    name: string;
  };
  startingFive: Player[];
  substitutes: Player[];
}

interface Player {
  id: number;
  name: string;
  number: number;
  position: string;
}
