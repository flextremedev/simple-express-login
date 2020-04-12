export const getExpirationByDuration = (duration: number): number => {
  return duration * 1000 + new Date().getTime();
};
