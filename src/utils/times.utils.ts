export const fromString = (time: string): number => {
  const [hh, mm] = time.split(':');
  return parseInt(hh)*60 + parseInt(mm);
};

export const toHHMMString = (time: number) => {
  const minute = time%60;
  const hour = Math.trunc(time/60);
  return `${hour}:${minute}`
};
