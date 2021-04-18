import {ReservedTimeInDay} from "./utils/entities";
import {messageError} from "./utils/constants";

export class MeetingIntervalParser {
  private static MEETING_INTERVALE_REGEX = /^[1-5] ([0-1]?[0-9]|2[0-3]):[0-5][0-9]-([0-1]?[0-9]|2[0-3]):[0-5][0-9]/;
  private static MEETING_INTERVALE_REGEX_SPLITING = / |-/;
  static parse(stream: string): ReservedTimeInDay {

    if (!MeetingIntervalParser.MEETING_INTERVALE_REGEX.test(stream)) { // @ts-ignore
      throw new Error(`'${stream}' ${messageError.streamUnparssable}`);
    }
    const [day, startHour, endHour] = stream.split(MeetingIntervalParser.MEETING_INTERVALE_REGEX_SPLITING);

    return {
      day,
      startHour,
      endHour
    }
  }

  static toStream({ day, startHour, endHour }: ReservedTimeInDay): string {
    return `${day} ${startHour} ${endHour}`
  }
};
