import { scope, l } from "scripts/utils";

scope(() => {
  scope(() => {
    const arr = "aaabbbbcccddd".split("");
    const matching = arr.reduce<{ [key: string]: number }>((acc, char) => {
      acc[char] = acc[char] ? ++acc[char] : 1;
      return acc;
    }, {});
    console.log(matching);

    const result = Object.entries(matching).reduce<string>((acc, entry) => {
      acc = acc.concat(`${entry[0]}${entry[1]}`);
      return acc;
    }, "");
    console.log(result);
  }, "aaabbbbcccddd -> a3b4c3d3");
}, "Tasks");
