import { scope } from "scripts/utils";

scope(() => {
  function getFullName(this: { name: string; surname: string }): string {
    return `${this.name} ${this.surname}`;
  }

  const account = {
    name: "Bar",
    surname: "Baz",
    getFullName,
  };

  console.log(account.getFullName());
}, "context-typing");

export {};
