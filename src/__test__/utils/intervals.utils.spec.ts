import { IntervalUtils } from "../../utils/intervals.utils";

describe('IntervalUtils',  () => {
  it('test for intervals which has intersection empty ', function () {
    const test = [
      { start: 10, end: 100 },
      { start: 110, end: 200 },
    ]

    const interval = IntervalUtils.union(test)
    expect(interval).toStrictEqual(test);
  });



});
