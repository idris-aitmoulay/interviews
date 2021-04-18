import { forEach } from 'lodash';
import {InputStream} from "./input.stream";
import {ReservedTimeInDay} from "./utils/entities";
import {MeetingIntervalParser} from "./meeting-interval.parser";
import {MeetingSchedulePlannerAlgorithm} from "./meeting-schedule-planner.algorithm";

const paths = [1, 2, 3, 4, 5].map((chiffre: number) => `${__dirname}/../data/input${chiffre}.txt`);
forEach(paths, path => {
  try {
    const streams: string[] = InputStream.readFileAsLines(path);
    const times: ReservedTimeInDay[] = streams.map(MeetingIntervalParser.parse);
    const result = MeetingSchedulePlannerAlgorithm.solve(times, { startHour: '08:00', endHour: '17:59' }, { h: 1, m: 0 })
    const output = MeetingIntervalParser.toStream(result);
    console.log(path, " : ",output)
  } catch (e) {
    console.error(path, " : ", e.message)
  }
})


