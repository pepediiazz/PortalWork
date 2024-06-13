export interface HandballResponse {
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
    response: HandballGame[];
  }
  
  export interface HandballGame {
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
      home: number | null;
      away: number | null;
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
      first: {
        home: number | null;
        away: number | null;
      };
      second: {
        home: number | null;
        away: number | null;
      };
      over_time?: {
        home: number | null;
        away: number | null;
      };
    };
    referees: string[];
  }
  
  
  interface Team {
    id: number;
    name: string;
    logo: string;
    winner: boolean | null;
  }
  
  interface ScoreDetail {
    half_1: number | null;
    half_2: number | null;
    over_time: number | null;
    total: number | null;
  }
  