import { scope } from "scripts/utils";

scope(() => {
  type Constructable = new (...args: any[]) => any;

  function Timestamp<BaseClass extends Constructable>(BC: BaseClass) {
    return class extends BC {
      public timestamp = new Date();
    };
  }

  function Tagged<BaseClass extends Constructable>(BC: BaseClass) {
    return class extends BC {
      public tags = ["TS", "JS"];
    };
  }

  class Subject {
    public constructor(public readonly teacher: string) {}
  }

  class User extends Timestamp(Tagged(Subject)) {}

  const user = new User("Bar Bazovi4");

  console.log("user.timestamp", user.timestamp);
  console.log("user.tags", user.tags);
  console.log("user.teacher", user.teacher);
}, "mixins");

export {};
