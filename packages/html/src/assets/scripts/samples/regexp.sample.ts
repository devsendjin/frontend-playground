import { scope, l } from "scripts/utils";

scope(() => {
  const template = `
  -------
  title: some
  -------

  doctype html
  html(lang='en')
    head
      meta(charset='UTF-8')
      meta(http-equiv='X-UA-Compatible' content='IE=edge')
      meta(name='viewport' content='width=device-width, initial-scale=1.0')
      link(rel='stylesheet' href='/css/index.css')
      link(rel='preconnect' href='https://fonts.googleapis.com')
      link(rel='preconnect' href='https://fonts.gstatic.com' crossorigin='')
      link(href='https://fonts.googleapis.com/css2?family=Montserrat:wght@200;300;400;500;600;700;800;900&display=swap' rel='stylesheet')
      title HTML Playground
    body
      h1 HTML Playground
      script(src='/js/index.js')
  `;

  const regexp = /^-------[\n]\s*((.+\w):(.*))[\n]-------$/gim;
  const test = regexp.exec(template);

  l({ template, regexp, "test exec": test });
}, "Regexp exec");

scope(() => {
  // const str = '11111111111111111111';
  const regexp = new RegExp("^(-?\\d{0,4}-?)+$", "g");

  // const result = regexp.test(str);

  const validate = (value: any, length: any, regexp: any) => {
    l({ value, length, "value.length > length": value.length > length, "regexp.test(value)": regexp.test(value) });
    const isMatchLength = value.length > length;
    const isMatchPattern = regexp.test(value);
    return isMatchLength || isMatchPattern;
  };

  document.querySelector("#validate-with-regexp")?.addEventListener("input", (e: any) => {
    l({ validate: validate(e.target.value, 19, regexp) });
    if (!validate(e.target.value, 19, regexp)) return;
  });
}, "Validate with Regexp");

export {};
