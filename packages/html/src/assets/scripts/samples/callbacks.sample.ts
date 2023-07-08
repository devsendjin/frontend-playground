import { scope, invoker } from "scripts/utils";

scope(() => {
  scope(() => {
    let i = 0;

    invoker(
      ({ invokeCount, isInvokeLimitReached }) => {
        console.log(`Will be invoked max "10" times or until "i <= 6", outer count ${i}`, {
          invokeCount,
          isInvokeLimitReached,
        });
        i++;
      },
      {
        immediateFirstInvoke: true,
        invokeLimit: 10,
        frequencyInMilliseconds: 1000,
        shouldInvokeResolver: () => i < 6,
      }
    );
  }, "invokeUntil");
}, "Objects");
