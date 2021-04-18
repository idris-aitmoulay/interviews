export interface ReservedTimeInDay {
  day: string;
  startHour: string;
  endHour: string;
}

export interface Interval {
  start: number;
  end: number;
}

export interface MinMaxInterval {
  startHour: string;
  endHour: string;
}

export interface Duration {
  h: number;
  m: number;
}

export interface IntervalInDay extends Interval{
  day: number;
}
