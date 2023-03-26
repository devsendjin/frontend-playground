import { scope, l } from "scripts/utils";
import { of, from } from 'rxjs';

scope(() => {

  scope(() => {
    const exampleOf$ = of(1, 2, 3);
    exampleOf$.subscribe(value => console.log(value));
    console.log("\n");
    exampleOf$.subscribe({
      next: (value) => console.log("next", value),
      error: (value) => console.log("error", value),
      complete: () => console.log("complete"),
    });
  }, "of");

  scope(() => {
    const exampleFrom$ = from([1, 2, 3]);
    exampleFrom$.subscribe(value => console.log(value));
  }, "from");

}, "rxjs");
