export const uuid = (): string => {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    const r = (Math.random() * 16) | 0,
      v = c == 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
};

export const sleepBlocker = (time: number = 0) => {
  const wakeUpTime = Date.now() + time;
  while (Date.now() < wakeUpTime) {}
};
