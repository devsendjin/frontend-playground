import { scope, l } from '@/scripts/utils/playground';

scope(() => {
  enum QUOTA_EXCEEDED_ERROR_STATUS_CODES {
    CHROME = 22,
    MOZILLA = 1014,
    SAFARI = 22,
    EDGE = 22,
    IE = 22,
  }

  l({ 'Object.entries(QUOTA_EXCEEDED_ERROR_STATUS_CODES): ': Object.entries(QUOTA_EXCEEDED_ERROR_STATUS_CODES) });
}, 'Draft ts');
