export const invokeUntil = (
  callback: (options: { invokeLimit: number; invokeCount: number; isInvokeLimitReached: boolean }) => void,
  {
    invokeLimit = 3,
    frequencyInMiliseconds = 1500,
    immediateFirstInvoke = false,
    shouldInvoke,
  }: Partial<{
    invokeLimit: number;
    frequencyInMiliseconds: number;
    immediateFirstInvoke: boolean;
    shouldInvoke: () => boolean;
  }> = {}
) => {
  let intervalId: any = null;
  let invokeCount = 1;

  if (immediateFirstInvoke && invokeCount === 1) {
    callback({
      invokeLimit,
      invokeCount,
      isInvokeLimitReached: invokeCount === invokeLimit,
    });
    invokeCount++;
  }

  intervalId = setInterval(() => {
    if (shouldInvoke && !shouldInvoke()) {
      clearInterval(intervalId);
      return;
    } else if (invokeCount > invokeLimit) {
      clearInterval(intervalId);
      return;
    }

    callback({
      invokeLimit,
      invokeCount,
      isInvokeLimitReached: invokeCount === invokeLimit,
    });
    invokeCount++;
  }, frequencyInMiliseconds);
};
