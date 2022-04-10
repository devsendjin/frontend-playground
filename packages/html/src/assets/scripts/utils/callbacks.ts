export const invokeUntil = (
  callback: (options: { invokeLimit: number; invokeCount: number }) => void,
  {
    invokeLimit = 3,
    frequencyInMiliseconds = 1500,
    shouldInvoke,
  }: Partial<{ invokeLimit: number; frequencyInMiliseconds: number; shouldInvoke: () => boolean }> = {}
) => {
  let intervalId: any = null;
  let invokeCount = 1;

  intervalId = setInterval(() => {
    if (shouldInvoke && !shouldInvoke()) {
      clearInterval(intervalId);
      return;
    } else if (invokeCount > invokeLimit) {
      clearInterval(intervalId);
      return;
    }

    callback({ invokeLimit, invokeCount });
    invokeCount++;
  }, frequencyInMiliseconds);
};
