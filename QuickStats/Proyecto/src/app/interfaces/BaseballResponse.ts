export interface BaseballResponse {
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
}

interface Team {
  id: number;
  name: string;
  logo: string;
  winner: boolean | null;
}

interface ScoreDetail {
  innings: { [key: string]: number | null };
  hits: number;
  errors: number;
  total: number | null;
}
