import { scope, l } from '@/scripts/utils/playground';

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

scope(() => {
  l({ template, regexp, 'test exec': test });
}, 'Regexp');

export {};
