export const invokeUntilTimes = (
  callback: () => void,
  { times = 3, frequencyInMiliseconds = 1000 }: Partial<{ times: number; frequencyInMiliseconds: number }> = {}
) => {
  let intervalId: any = null;
  let counter = 0;

  if (counter >= times) return;

  intervalId = setInterval(() => {
    callback();
    counter++;
    if (counter >= times) {
      clearInterval(intervalId);
    }
  }, frequencyInMiliseconds);
};
