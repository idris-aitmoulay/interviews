import { MeetingSchedulePlannerAlgorithm } from "../meeting-schedule-planner.algorithm";
import {messageError} from "../utils/constants";
import {ReservedTimeInDay} from "../utils/entities";

describe('MeetingSchedulePlannerAlgorithm',  () => {
  it('Done: MeetingIntervalParser parse ', () => {
    const specimen: ReservedTimeInDay[] = [
      { day: "1", startHour: "08:45", endHour: "12:59" },
      { day: "2", startHour: "08:24", endHour: "10:54" },
      { day: "1", startHour: "14:45", endHour: "14:47" },
      { day: "3", startHour: "09:56", endHour: "16:25" },
      { day: "5", startHour: "15:16", endHour: "16:28" },
    ];
    const data = MeetingSchedulePlannerAlgorithm.solve(specimen, { startHour: "08:00", endHour: "17:59" }, { h: 1, m: 0 });
    expect(data).toStrictEqual({
      day: "1",
      startHour: "13:0",
      endHour: "13:59"
    })
  });

  it('Fail: MeetingSchedulePlannerAlgorithm solve ', () => {
    const specimen: ReservedTimeInDay[] = [
      { day: "1", startHour: "08:00", endHour: "17:59" },
      { day: "2", startHour: "08:00", endHour: "17:59" },
      { day: "4", startHour: "08:00", endHour: "17:59" },
      { day: "3", startHour: "08:00", endHour: "17:59" },
      { day: "5", startHour: "08:00", endHour: "17:59" },
    ];
    expect(() => {
      MeetingSchedulePlannerAlgorithm.solve(specimen, { startHour: "08:00", endHour: "17:59" }, { h: 1, m: 0 });
    }).toThrow(messageError.meetingNotFound)
  })
});
