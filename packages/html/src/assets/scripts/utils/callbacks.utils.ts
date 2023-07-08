type InvokeUntilCallbackParams = {
  invokeCount: number;
  isInvokeLimitReached: boolean;
};

type InvokeUntilOptions = {
  invokeLimit?: number;
  shouldInvokeResolver?: (params: { invokeCount: number }) => boolean;
  frequencyInMilliseconds?: number;
  immediateFirstInvoke?: boolean;
};

type InvokeUntilReturnType = {
  abortInvoker: () => void;
};

export const invoker = (
  callback: (params: InvokeUntilCallbackParams) => void,
  {
    frequencyInMilliseconds = 300,
    immediateFirstInvoke = false,
    shouldInvokeResolver,
    invokeLimit,
  }: InvokeUntilOptions = {}
): InvokeUntilReturnType => {
  let invokeCount = 0;
  let timeoutId: ReturnType<typeof window.setTimeout> | null = null;

  const invokeLimitReached = (): boolean => invokeCount === invokeLimit;

  const executeCallback = () => {
    callback({
      invokeCount,
      isInvokeLimitReached:
        typeof invokeLimit !== "undefined" &&
        invokeLimit - invokeCount === 1 /* because of "invokeCount" starts from index 0 */,
    });
    invokeCount++;
  };

  const invokeCallback = () => {
    if (invokeLimitReached() && timeoutId !== null) {
      clearTimeout(timeoutId);
      return;
    }

    const shouldInvokeResult = shouldInvokeResolver ? shouldInvokeResolver({ invokeCount }) : true;

    if (shouldInvokeResult) {
      executeCallback();
      timeoutId = setTimeout(invokeCallback, frequencyInMilliseconds);
    }
  };

  if (!invokeLimitReached()) {
    if (immediateFirstInvoke) {
      executeCallback();
    }
    timeoutId = setTimeout(invokeCallback, frequencyInMilliseconds);
  }

  return {
    abortInvoker: () => {
      if (timeoutId !== null) {
        clearTimeout(timeoutId);
      }
    },
  };
};
