import { scope, l } from "scripts/utils";

scope(() => {
  const a = { b: "Current ts" };
  l(a);
}, "Current ts");
