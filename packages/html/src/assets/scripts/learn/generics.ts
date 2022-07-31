import { scope } from '@scripts/utils';

scope(() => {
  function getPropertyObj<Obj, Key extends keyof Obj>(obj: Obj, key: Key): Obj[Key] {
    return obj[key];
  }

  // ====================================== Conditional types ======================================

  /*
// ========
// https://www.typescriptlang.org/play?#code/MYewdgzgLgBAhgJwQLhgbQBQEoYF4B8MARiCADYCmcYANDNnoWAK4C2RFCMAPjC2WQC6edAwIwoCZhTpimzAYIDcAKCgBPAA4UYAMQCWCaAFFKrCmCgAlClGYIwAFS0UAPI8K4YjmBQAeUBYAJhDo+mAAZpwwAKp0AHSJzGAA1mAgAO5gaIKCKjAwAPyxvgHBoRiJ8YgA5hCoyWmZ2YI44uFRXFb5BUUw3b0wqGAUAG6cPcNjnKoa2t66IgZGUKYU5pY2dg7O2q5zFCAR8Ej4KgD0570AeoVAA
// get return type of first element of array (here: boolean)
 const arr: [() => boolean, () => number | null] = [() => true, () => null];
type FirstElementReturnType<T> = T extends [infer U, ...unknown[]]
  ? U extends (...args: unknown[]) => infer R
    ? R
    : never
  : never;
type TElementType = FirstElementReturnType<typeof arr>;
*/

  /*
// ========
// https://www.typescriptlang.org/play?#code/PTAEHMFMBdQVwHYEsD2DTQJ4AdIGdQUAzUIxAY2lXWwEMAnWgWwIAoALSeyALlAThMARl1AAfUHmj0kCcONBCUKADaRaCAJQAoMgkrVSCVrT4DhXADSK+UmXOvk+S1eq3PlajaADe20KDc0HD06NJwkADc2gC+2tpYuKAAcmgAYhRUaAA8ACoAfKAAvKC5oJAAHtCQCAAmBBn6WegA-PyQAG6ifLnRiZCgjQZoAAoMzHh5hSVlldV1bAB0ywzgeHyyRKIAgvRrmsWFm6IASv6gbSAXKemZ1Nm7awDaANaQmMSgj3gAuoUSJ1AVwA7ih6C88OcAqxvq93p9vj9ylUavVBnc0NcEJ1ul89ng4R8SIiDgCgWBaih8AgAOSwUHg6zA9iYC4tc5mHH0aLachoKT8IgIPhDZpjRgsbL9T5C6agACMkSAA
// get union types of function params (here: number | string | boolean)
// @ts-ignore
function fn(a: number, b: string, c: boolean): boolean {
  return true;
}

// @ts-ignore
type NonFunction<T> = T extends Function ? never : T;
type FunctionParams<T> = T extends (...args: infer Args) => infer R
  ? // ? NonFunction<Args[keyof Args]> | R // works
    (Args[keyof Args] extends Function ? never : Args[keyof Args]) | R // doesn't work, why ??
  : never;

const nfn: FunctionParams<typeof fn> = 1;
console.log(nfn);
 */

  // ====================================== Mapped types ======================================
  /*
// https://www.typescriptlang.org/play?#code/JYOwLgpgTgZghgYwgAgJIFUDO1kG8BQyyUEcAJgPYgA2AnsiHALYQBcymYUoA5gNyFipSjXpwebBgFcmAI2gCioGBXa5kTONUmyKFbXBB8OWuFFrsQM+VGQBfAXfxhaABxQAlCEwoA3CABCtAAqbhAAPMEANMgAogB8yAC8eIIA2gAKyKDIANYQtBQwyMEAuuyxyBAAHpAgZJglmaXIAPwMEP627BmOafmFxWXGAPQjyP0FRSUtALTIAO5gxa34+AhUnMhS2FDsXj7+QaHu4Ri7MZzcIDyJKQDk4hD3AmNERAB6rUA
// exclude object properties by type
interface IUser {
  readonly name: string;
  readonly age: number;
  info: { male: boolean; salary: number };
}
type RemoveByType<T, E> = {
  [P in keyof T]: E extends T[P] ? never : P;
}[keyof T]; // [keyof T] - wtf ?

const user: RemoveByType<IUser, string> = 'age';
 */

  // ====================================== Nullable tuples ======================================
  // https://stackoverflow.com/questions/54607400/typescript-remove-entries-from-tuple-type
  /*
type FilterNullable<T extends any[]> = T extends [] ? [] :
    T extends [infer H, ...infer R] ?
    H extends undefined | null ? FilterNullable<R> : [H, ...FilterNullable<R>] : T; // works

type NullableTuple<T extends any[]> = T extends [] ? [] :
    T extends [infer H, ...infer R] ?
    H extends undefined | null ? [H, ...R] : NullableTuple<R> : T; // incorrect
    // H extends undefined | null ? FilterNullable<R> : [H, ...FilterNullable<R>] : T;

type M = { a: number }
type NumsUndefinedNull = [number | null | undefined, number | null]
type Filtered = FilterNullable<NumsUndefinedNull>
const a: Filtered = [1 ,2]
//    ^?

type Nums = [number, number]
type WithNull = NullableTuple<Nums>
const b: WithNull = [1 ,2]
//    ^?
*/
}, 'generics');
