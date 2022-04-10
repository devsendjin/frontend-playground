import { scope, invokeUntil } from '@scripts/utils';

scope(() => {
  scope(() => {
    let i = 0;

    invokeUntil(
      ({ invokeLimit, invokeCount }) => {
        console.log(`Will be invoked max "10" times or until "i < 6", count ${i}`, { invokeLimit, invokeCount });
        i++;
      },
      { invokeLimit: 10, frequencyInMiliseconds: 500, shouldInvoke: () => i < 6 }
    );
  }, 'invokeUntil');
}, 'Objects');
