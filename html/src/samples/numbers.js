import { isFloat, isInt } from '@/utils';
import { scope } from '@/utils/playground';

scope(
  () => {
    scope(
      () => {
        console.log('4 isFloat', isFloat(4));
        console.log('4 isInt', isInt(4));

        console.log('3.04 isFloat', isFloat(3.04));
        console.log('3.04 isInt', isInt(3.04));
      },
      { dividerAtStart: false, name: 'isInt / isFloat' }
    );
  },
  { dividerAtStart: false, name: 'Numbers' }
);