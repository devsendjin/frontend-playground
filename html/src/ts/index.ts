import { l, scope } from '@/ts/utils/playground';
import '@/styles/typescript.scss';

// console.log('typescript');

// write safe number converter
// suctom select component

scope(
  () => {
    enum QUOTA_EXCEEDED_ERROR_STATUS_CODES {
      CHROME = 22,
      MOZILLA = 1014,
      SAFARI = 22,
      EDGE = 22,
      IE = 22,
    }

    l({ 'Object.entries(QUOTA_EXCEEDED_ERROR_STATUS_CODES): ': Object.entries(QUOTA_EXCEEDED_ERROR_STATUS_CODES) });
  },
  { dividerAtStart: '', name: 'Draft ts' }
);
