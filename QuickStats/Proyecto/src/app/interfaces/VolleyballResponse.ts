export interface VolleyballResponse {
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
  response: VolleyballGame[];
}

export interface VolleyballGame {
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
    code: string | null;
    flag: string | null;
  };
  teams: {
    home: VolleyballTeam;
    away: VolleyballTeam;
  };
  scores: {
    home: number;
    away: number;
  };
  status: {
    long: string;
    short: string;
  };
  date: string;
  time: string;
  timestamp: number;
  timezone: string;
  week: string | null;
  periods: {
    first: PeriodDetail;
    second: PeriodDetail;
    third: PeriodDetail;
    fourth: PeriodDetail;
    fifth: PeriodDetail;
  };
}

interface VolleyballTeam {
  id: number;
  name: string;
  logo: string;
  winner: boolean | null;
}

interface PeriodDetail {
  home: number | null;
  away: number | null;
}
