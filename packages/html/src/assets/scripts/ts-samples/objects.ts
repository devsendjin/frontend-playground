import { scope, l, mergeDeep } from '@scripts/utils';

scope(() => {
  scope(() => {
    const a = { a: 'foo', b: { c: 'baz' } };
    const b = { a: 'bar', b: { c: 'bar-baz' } };
    l({ a, b, mergeDeep: mergeDeep(a, b) });
  }, 'deep merge');
}, 'Objects');
