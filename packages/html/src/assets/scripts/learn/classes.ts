import { scope } from "scripts/utils";

scope(() => {
  // ====================================== Singleton ======================================
  class Singleton {
    private static _inctance;

    private constructor() {}

    public static get instance() {
      if (!Singleton._inctance) {
        Singleton._inctance = new Singleton();
      }
      return Singleton._inctance;
    }
  }

  const inst = Singleton.instance;
  const inst1 = Singleton.instance;
  const inst2 = Singleton.instance;

  console.log("Singleton", {
    "inst === inst1": inst === inst1,
    "inst === inst2": inst === inst2,
  });

  // ====================================== Abstract classes ======================================
  abstract class AbstractControl<T> {
    public model?: T;

    public abstract getValue(): T;
    public abstract onFocus(): void;
    public abstract onBlur(): void;
  }

  type TDropdownModel = {
    name: string;
    value: string;
  };
  class Dropdown extends AbstractControl<TDropdownModel> {
    public model: TDropdownModel = { name: "", value: "" };

    public constructor() {
      super();
    }

    getValue(): TDropdownModel {
      // some logic

      return { name: "", value: "" };
    }
    public onFocus(): void {}
    public onBlur(): void {}
  }

  console.log("new Dropdown()", new Dropdown());
}, "classes");

export {};
