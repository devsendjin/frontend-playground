import { isFloat, isInt, scope } from "scripts/utils";

scope(() => {
  scope(() => {
    console.log("4 isFloat", isFloat(4));
    console.log("4 isInt", isInt(4));

    console.log("3.04 isFloat", isFloat(3.04));
    console.log("3.04 isInt", isInt(3.04));
  }, "isInt / isFloat");
}, "Numbers");
