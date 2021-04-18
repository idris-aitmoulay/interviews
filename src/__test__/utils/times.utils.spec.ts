import {fromString, toHHMMString} from "../../utils/times.utils";

describe('Time Utils',  () => {
  it('fromString', () => {
    expect(fromString('12:00')).toBe(720)
  })

  it('toHHMMString', () => {
    expect(toHHMMString(720)).toBe('12:0')
  })
});
