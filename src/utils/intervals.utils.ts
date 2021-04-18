import { forEach } from 'lodash';
import { Interval } from "./entities";

export class IntervalUtils {
  public static union(intervals: Interval[]): Interval[] {
    let index = 0;
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

    return intervals;
  }
}
