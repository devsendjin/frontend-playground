import { chunk, replaceAt } from '@scripts/utils';
import { scope } from '@scripts/utils/playground';

scope(() => {
  scope(() => {
    const initialArr = [1, 2, 3, 4, 5, 6];

    console.log('initialArr', initialArr, '\nreplaceAt(initialArr): ', replaceAt(initialArr, 2, 20));
  }, 'replace element at index');

  scope(() => {
    const arr = [1, 2, 3];
    console.log(arr.concat([4, 5, 6]));
  }, 'concat array');

  scope(() => {
    const arr = Array.from({ length: 12 }, (_, index) => index);
    console.log(arr);

    // arr.forEach(a => {
    // 	console.log('a % 3   ', a % 3);
    // })

    const chunked = chunk(arr, 3);
    console.log(chunked);
  }, 'chunk array');
}, 'Arrays');
