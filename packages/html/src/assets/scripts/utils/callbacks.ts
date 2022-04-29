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

// type CallbackParams = { invokeLimit: number; invokeCount: number; isInvokeLimitReached: boolean };
// type Callback = (params: CallbackParams) => void;
// type Hanlders = Partial<{ onEvery: Callback; onSuccess: () => boolean; onError: () => boolean }>;
// type Options = Partial<{
//   invokeLimit: number;
//   frequencyInMiliseconds: number;
//   immediateInvoke: boolean;
//   shouldInvoke: () => boolean;
// }>;
// export const invoker = (
//   { onEvery, onSuccess, onError }: Hanlders,
//   { invokeLimit = 3, frequencyInMiliseconds = 1500, immediateInvoke = false, shouldInvoke }: Options
// ): void => {
//   let intervalId: NodeJS.Timer | null = null;
//   let invokeCount = 0;

//   const callbackParams = (): CallbackParams => {
//     return {
//       invokeLimit,
//       invokeCount,
//       isInvokeLimitReached: invokeCount === invokeLimit,
//     };
//   };

//   if (immediateInvoke && invokeCount === 1) {
//     onEvery(callbackParams());
//     invokeCount++;
//   }

//   intervalId = setInterval(() => {
//     if (shouldInvoke && !shouldInvoke()) {
//       clearInterval(intervalId);
//       return;
//     } else if (invokeCount === invokeLimit) {
//       clearInterval(intervalId);
//       return;
//     }

//     callback({
//       invokeLimit,
//       invokeCount,
//       isInvokeLimitReached: invokeCount === invokeLimit,
//     });
//     invokeCount++;
//   }, frequencyInMiliseconds);
// };
