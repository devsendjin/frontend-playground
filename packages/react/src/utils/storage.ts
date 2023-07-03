import { isBoolean, isNumber, isString } from "./types.utils";

const isLSObject = (value: unknown): value is LSObject =>
  value != null && typeof value === "object" && !Array.isArray(value);
const isLSPrimitive = (value: unknown): value is LSPrimitive => isNumber(value) || isString(value) || isBoolean(value);

type LSPrimitive = number | string | boolean;
type LSPrimitiveKey = string | number;
type LSObject = Record<LSPrimitiveKey, unknown>;

export class LocalStorageManager<Data extends LSPrimitive | LSPrimitive[] | LSObject | LSObject[]> {
  constructor(private readonly namespace: string) {}

  public set<
    KeyOrValue extends Data extends LSObject ? keyof Data : Data,
    Value extends Data extends LSObject ? Data[keyof Data] : never
  >(...args: Data extends LSObject ? [KeyOrValue, Value] : [Data]): void {
    const data = this.parse();

    // primitive
    if (args.length === 1) {
      const value = args[0];
      this.persist(value);
      return;
    }

    // object
    if (args.length === 2) {
      const key = args[0] as keyof Data;
      const value = args[1];
      const _data = data ?? {};
      const newObject = { ..._data, [key]: value };
      this.persist(newObject);
    }
  }

  public get<
    Key extends Data extends LSObject ? keyof Data : never,
    Value extends Data extends LSObject ? Data[keyof Data] : Data
  >(...args: Data extends LSObject ? [Key] : never): Value | null {
    const data = this.parse();
    if (isLSObject(data)) {
      const key = args[0];
      return (data[key] as Value) ?? null;
    }
    return (data as Value) ?? null;
  }

  public remove(...args: Data extends LSObject ? [keyof Data] : never): void {
    const data = this.parse();
    if (isLSObject(data)) {
      const key = args[0];
      if (!(key in data)) return;
      delete data[key];
      this.persist(data);
      return;
    }
    this.clear();
  }

  public clear(): void {
    localStorage.removeItem(this.namespace);
  }

  private persist<Value extends LSPrimitive | LSPrimitive[] | LSObject | LSObject[]>(value: Value): void {
    const stringifiedValue = isLSPrimitive(value) ? String(value) : JSON.stringify(value);
    localStorage.setItem(this.namespace, stringifiedValue);
  }

  private parse(): Data | null {
    const namespaceValue = localStorage.getItem(this.namespace);
    if (namespaceValue === null) return null;
    try {
      return JSON.parse(namespaceValue);
    } catch (error) {
      return null;
    }
  }
}

// const localStorageManager1 = new LocalStorageManager<{ a: number | null }>("testNamespace");
// localStorageManager1.set("a", null);
// localStorageManager1.get("a");

// const localStorageManager2 = new LocalStorageManager<string[]>("testNamespace1");
// localStorageManager2.set(["a"]);
// localStorageManager2.get();

// const localStorageManager3 = new LocalStorageManager<number[]>("testNamespace3");
// localStorageManager3.set([1, 2, 3]);
// localStorageManager3.get();

// const localStorageManager4 = new LocalStorageManager<number>("testNamespace4");
// localStorageManager4.set(3);
// localStorageManager4.get();
