export type Domain = {
  id: string;
  url: string;
};

export type URLDetails = {
  url: string;
  id: string;
  response_times: {
    date: Date;
    avg: number;
  }[];
  minimum: Statistic;
  maximum: Statistic;
  response_times_7: {
    date: Date;
    avg: number;
  }[];
  response_times_14: {
    date: Date;
    avg: number;
  }[];
  all: Statistic[];
  outages: Statistic[];
};

type Statistic = {
  id: string;
  url_id: string;
  headers: string;
  success: boolean;
  response_time: number;
  saved_at: Date;
};
