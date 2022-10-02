import { scope, l, mergeDeep } from "scripts/utils";

scope(() => {
  scope(() => {
    const a = {
      bar: ["bar", "baz"],
      str: "a",
      foo: {
        str: "asd",
        f: ["b", "a", "e"],
        foo1: {
          f1: ["v", "g", "r"],
        },
        c: [["6", [1]]],
      },
      // bar: {c:'a'},
    };

    console.log("a ⮕", a);

    const b = {
      bar: ["1", "2"],
      str: "s",
      foo: {
        str: "dsa",
        f: ["a", "b", "c", "c", "d", "3", { qw: "qwe" }],
        foo1: {
          f1: ["v", "g", "r"],
        },
        e: ["2", "1", "3", ["4"]],
        c: [["6", [3]]],
      },
    };

    console.log("b ⮕", b);

    l({
      a,
      b,
      mergeDeep: mergeDeep(
        { arrayMergeOptions: { concatenate: true } },
        // {},
        a,
        b
      ),
    });
  }, "object deep merge");
}, "Objects");
