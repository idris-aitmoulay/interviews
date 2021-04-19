import { uniqWith, forEach } from 'lodash';
import { Interval } from "./entities";

export class IntervalUtils {
  public static union(comingIntervals: Interval[]): Interval[] {
    let index = 0;
    const intervals = [...comingIntervals].sort((a: Interval, b: Interval) => a.start - b.start);
    forEach(intervals, (interval: Interval, i: number) => {
      if (intervals[index].end >=  interval.start)
      {
        intervals[index].start = Math.min(intervals[index].start, interval.start);
        intervals[index].end = Math.max(intervals[index].end, interval.end);
        intervals[i] = intervals[index];
      }
      else {
        index++;
        intervals[index] = intervals[i];
      }
    });

    return uniqWith(intervals, (a: Interval, b: Interval) => (a.start - b.start === 0) && (a.end-b.end ===0));
  }
}
