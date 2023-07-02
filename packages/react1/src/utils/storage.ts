import { isNull, isString } from "./types.utils";

type IWebStorage = {
  get(key: string): void;

  set(key: string, payload: any): void;

  remove(key: string): void;

  forceClear(): void;

  update<ExpectedValueT>(key: string, callback: (param: ExpectedValueT) => ExpectedValueT): void;

  softClear(): void;

  addToExcludes(keys: string[]): void;
};

enum QUOTA_EXCEEDED_ERROR_STATUS_CODES {
  CHROME = 22,
  MOZILLA = 1014,
  SAFARI = 22,
  EDGE = 22,
  IE = 22,
}

class WebStorage implements IWebStorage {
  private readonly usedSpace: number;
  private readonly excludeList: string[] = [];

  constructor() {
    this.usedSpace = this.checkUsedSpace();
  }

  public get = <RT = string>(key: string): RT => {
    const payload = localStorage.getItem(key);

    if (!payload) throw Error(`Can not find any values by key ${key}`);

    let res;
    try {
      res = JSON.parse(payload);
    } catch (e) {
      res = payload;
    }

    return res;
  };

  public set = (key: string, payload: any): void => {
    if (!payload || !Object.keys(payload).length) return;
    try {
      localStorage.setItem(key, JSON.stringify(payload));
    } catch (e) {
      const error: any = e;
      if (this.matchToQuotaExceedError(error.code)) {
        console.log("Clear LS");
        this.softClear();
        localStorage.setItem(key, JSON.stringify(payload));
        return;
      }
      console.error(e);
    }
  };

  public remove = (key: string) => localStorage.removeItem(key);

  public update = <ExpectedValueT>(key: string, callback: (param: ExpectedValueT) => ExpectedValueT): void => {
    const value = this.get<ExpectedValueT>(key);
    if (!value) throw Error(`Can not find any values by key ${key}`);

    const newValue = callback(value);
    this.set(key, newValue);
  };

  public forceClear = () => localStorage.clear();

  public addToExcludes = (keys: string[]) => keys.forEach((k) => this.excludeList.push(k));

  /**
   * @description clear all LS values except exclude list items
   */
  public softClear = (): void => {
    const archive: [[string, string]] = [] as unknown as [[string, string]];

    for (let i = 0; i < this.excludeList.length; i++) {
      const item = this.excludeList[i];
      const result = localStorage.getItem(`${item}`);
      if (!result) continue;
      archive.push([item, result]);
    }

    this.forceClear();

    archive.forEach(([key, value]) => this.set(key, value));
  };

  private checkUsedSpace(): number {
    return Object.keys(window.localStorage)
      .map((key) => {
        return localStorage[key].length;
      })
      .reduce((a, b) => {
        return a + b;
      }, 0);
  }

  private matchToQuotaExceedError = (code: number): boolean => {
    let status: boolean = false;

    for (const [_, enumValue] of Object.entries(QUOTA_EXCEEDED_ERROR_STATUS_CODES)) {
      if (enumValue === code) {
        status = true;
        break;
      }
    }
    return status;
  };

  get getUsedSpace(): number {
    return this.usedSpace;
  }

  get getExcludeList(): string[] {
    return this.excludeList;
  }
}

export const LS = new WebStorage();

type LSPrimitives = number | string | boolean;
type LSPrimitiveKey = string | number;
type LSObject = Record<LSPrimitiveKey, any>;

const isLSPrimitive = (value: unknown): value is string => isString(value) && (!value.startsWith("{") && !value.startsWith("["));

export class LocalStorageManager<
  Data extends LSObject | LSPrimitives,
  Entity = Data extends LSObject ? keyof Data : never
> {
  constructor(private readonly storageKey: string) {}

  public get(entity: Entity): Data | null {
    const item = localStorage.getItem(this.storageKey);
    if (!item) return null;
    try {
      if (!isLSPrimitive(item)){
        const parsed = JSON.parse(item);
        return parsed[entity];
      }
      return item as Data;
    } catch (e) {
      console.error(e);
      return null;
    }
  }

  public getAll(): Data | null {
    const item = localStorage.getItem(this.storageKey);
    if (!item) return null;
    try {
      if (!isLSPrimitive(item)){
        return JSON.parse(item) as Data;
      }
      return item as Data;
    } catch (e) {
      console.error(e);
      return null;
    }
  }

  public set(entity: Entity, value: Data extends LSObject ? Data[keyof Data] : never): this {
    try {
      const savedData = this.getAll();

      if (!isLSPrimitive(savedData)) {
        localStorage.setItem(this.storageKey, JSON.stringify({[entity as unknown as keyof Data]: value}));
      }
    } catch (e) {
      console.error(e);
    } finally {
      return this;
    }
  }

  public override(value: Data): this {
    try {
      const dataToSet = isLSPrimitive(value) ? String.prototype.toString.call(value) : JSON.stringify(value);
      localStorage.setItem(this.storageKey, dataToSet);
    } catch (e) {
      console.error(e);
    } finally {
      return this;
    }
  }

  public remove(...entities: Entity[]): this {
    try {
      const savedData = this.getAll();
      if (!isNull(savedData) && !isLSPrimitive(savedData) && entities.length) {
        entities.forEach(entity => {
          if (entity in savedData) {
            delete savedData[entity as unknown as keyof Data];
          }
        })
        localStorage.setItem(this.storageKey, JSON.stringify(savedData));
      }
    } catch (e) {
      console.error(e);
    } finally {
      return this;
    }
  }

  public has(entity: Entity): boolean {
    return !!this.get(entity);
  }

  public clear(): this {
    localStorage.removeItem(this.storageKey);
    return this;
  }
}
