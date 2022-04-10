import { scope, invokeUntilTimes } from '@scripts/utils';

scope(() => {
  scope(() => {
    let i = 0;
    invokeUntilTimes(() => {
      console.log(`invokeUntilTimes ${i}`);
      i++;
    });
  }, 'invokeUntilTimes');
}, 'Objects');
