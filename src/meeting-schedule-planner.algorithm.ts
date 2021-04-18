import { Duration, IntervalInDay, MinMaxInterval, ReservedTimeInDay } from "./utils/entities";
import { fromString } from "./utils/times.utils";
import { map } from 'lodash';



export class MeetingSchedulePlannerAlgorithm {
  static solve(specimens: ReservedTimeInDay[], minmaxInterval: MinMaxInterval, duration: Duration ): ReservedTimeInDay {
    const entries: IntervalInDay[] = map(
      specimens,
      ({ day, endHour, startHour }: ReservedTimeInDay) => ({ day: parseInt(day), start: fromString(startHour), end: fromString(endHour) })
    );
    const minBoundary = fromString(minmaxInterval.startHour);
    const maxBoundary = fromString(minmaxInterval.endHour);
    const intDuration = fromString(`${duration.h}:${duration.m}`);


    return {} as ReservedTimeInDay;
  }
}
