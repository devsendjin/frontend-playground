import { scope, invokeUntil } from '@scripts/utils';

scope(() => {
  scope(() => {
    let i = 0;

    invokeUntil(
      ({ invokeLimit, invokeCount, isInvokeLimitReached }) => {
        console.log(`Will be invoked max "10" times or until "i <= 6", outer count ${i}`, {
          invokeLimit,
          invokeCount,
          isInvokeLimitReached,
        });
        i++;
      },
      {
        immediateFirstInvoke: true,
        invokeLimit: 10,
        frequencyInMiliseconds: 1000,
        shouldInvoke: () => i < 6,
      }
    );
  }, 'invokeUntil');
}, 'Objects');
