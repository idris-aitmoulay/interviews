import {MeetingIntervalParser} from "../meeting-interval.parser";
import {messageError} from "../utils/constants";

describe('MeetingIntervalParser',  () => {
  it('Done: MeetingIntervalParser parse ', () => {
    const data = MeetingIntervalParser.parse("4 12:00-14:00");
    expect(data).toStrictEqual({
      day: "4",
      startHour: "12:00",
      endHour: "14:00"
    })
  })

  it('Fail: MeetingIntervalParser parse ', () => {
    expect(() => {
      MeetingIntervalParser.parse("12:00 14:00");
    }).toThrow(`'12:00 14:00' ${messageError.streamUnparssable}`)
  })
});
