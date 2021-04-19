import {Duration, Interval, IntervalInDay, MinMaxInterval, ReservedTimeInDay} from "./utils/entities";
import { fromString, toHHMMString } from "./utils/times.utils";
import { groupBy, forEach, filter, last, map, get } from 'lodash';
import { IntervalUtils } from "./utils/intervals.utils";
import { messageError } from "./utils/constants";


export class MeetingSchedulePlannerAlgorithm {
  static solve(specimens: ReservedTimeInDay[], minmaxInterval: MinMaxInterval, duration: Duration ): ReservedTimeInDay {
    const entries: IntervalInDay[] = map(
      specimens,
      ({ day, endHour, startHour }: ReservedTimeInDay) => ({ day: parseInt(day), start: fromString(startHour), end: fromString(endHour) })
    );
    const minBoundary = fromString(minmaxInterval.startHour);
    const maxBoundary = fromString(minmaxInterval.endHour);
    const intDuration = fromString(`${duration.h}:${duration.m}`);


    const entriesIntervals = groupBy(entries, 'day');
    let suggestion: ReservedTimeInDay | typeof undefined = undefined;

    forEach(entriesIntervals, (item: IntervalInDay[], key: string) => {
      const intervals = IntervalUtils.union(item) as IntervalInDay[];
      const proposition: IntervalInDay | undefined = MeetingSchedulePlannerAlgorithm.findMeetingInsideIntervals(intervals, [minBoundary, maxBoundary], intDuration);
      if (proposition) {
        suggestion = {
          day: proposition.day + "",
          startHour: toHHMMString(proposition.start),
          endHour: toHHMMString(proposition.end)
        };
        return false;
      }
    });

    if (!suggestion) {
      throw new Error(messageError.meetingNotFound)
    }

    return suggestion as ReservedTimeInDay;
  }

  static findMeetingInsideIntervals(intervalUnions: IntervalInDay[], boundaries: number[], duration: number): IntervalInDay | undefined {
    const [bStart, bEnd] = boundaries;
    let founded = undefined;
    const workingIntervals = filter(intervalUnions, ({ start, end }: IntervalInDay) => start >= bStart || end <= bEnd);

    const [firstElement, ...restIntervals] = workingIntervals;

    if ((bStart + duration) <= firstElement.start) {
      return {
        day: get(firstElement, "day"),
        start: bStart,
        end: (bStart + duration - 1)
      }
    }
    let index = 0;
    forEach(restIntervals, (interval : Interval, i: number) => {
      const end = get(workingIntervals, `${index}.end`, 0);
      const timeBetween =  interval.start - end +1;
      if (duration <= timeBetween)
      {
        founded = {
          day: get(firstElement, "day", 0),
          start: (end +1),
          end: (end + duration)
        };
        return false
      }
      index++;
    });

    if (!founded) {
      const lastInterval: IntervalInDay | typeof undefined = last(workingIntervals);
      if (lastInterval && (lastInterval.end + duration) <= bEnd) {
        const end =  get(lastInterval, "end", 0);
        return {
          day: get(lastInterval,"day", 0),
          start: end + 1,
          end: end + duration,
        }
      }
    }
    return founded;
  }
}
