// @ts-nocheck
interface IWebStorage {
  get(key: string): void;

  set(key: string, payload: any): void;

  remove(key: string): void;

  update<ExpectedValueT>(key: string, callback: (param: ExpectedValueT) => ExpectedValueT): void;

  clear(): void;

  softClear(): void;
}

// localStorage | sessionStorage | CacheStorage?
class WebStorage implements IWebStorage {}

export const LS = new WebStorage();
