# Frontend playground for ideas

## Packages info

- html
  - [code highlight `microlight`](https://asvd.github.io/microlight/)
  - [code highlight `prismjs`](https://prismjs.com/index.html)
  - [prism.js](https://prismjs.com/download.html#themes=prism-twilight&languages=markup+css+clike+javascript+pug+typescript+typoscript&plugins=line-highlight+line-numbers+show-language+highlight-keywords+normalize-whitespace+toolbar+copy-to-clipboard+match-braces)
    - theme
      - Twilight
    - supports
      - Markup + HTML + XML + SVG + MathML + SSML + Atom + RSS
      - CSS
      - C-like
      - JavaScript
      - Pug
      - TypeScript
      - TypoScript + TSConfig
    - plugins
      - Line Highlight
      - Line Numbers
      - Show Invisibles
      - Autolinker
      - WebPlatform Docs
      - Custom Class
      - File Highlight
      - Show Language
      - JSONP Highlight
      - Highlight Keywords
      - Normalize Whitespace
      - Toolbar
      - Copy to Clipboard Button
      - Match braces
  - [faker](https://fakerjs.dev/guide/)

## TODO:

- common
  - [x] run `prettier` command only for changed files (maybe implement with bash)
  - [ ] patch `console.log` for dev process | create cusom log
    - [ ] option: `last` - if `true`, then clean prev console logs
  - [ ] doodle jump
  - [ ] nodejs online chat
  - [ ] transliteration app (ukr -> eng)
  - [ ] HistoryState (class implementation)
- react
  - [x] component with dynamic state using generics
  - [ ] AI password generator
  - [ ] `useEffectOnce`
  - [ ] create custom select component
  - [ ] Hint component
  - [ ] hook to manipulate dynamic array elements
  - [ ] do / undo / redo, references - [homerchen19/use-undo](https://github.com/homerchen19/use-undo) | [undomundo](https://github.com/philipmendels/undomundo) | [philipmendels/use-flexible-undo](https://github.com/philipmendels/use-flexible-undo)
  - [ ] "hover", "active", "focus" states ([idea](https://exogen.github.io/blog/focus-state/))

## Research

- scss
  - [ ] [adaptive value](https://css-tricks.com/linearly-scale-font-size-with-css-clamp-based-on-the-viewport/)
- ideas
  - [ ] [radix-ui](https://www.radix-ui.com/themes/docs/overview/getting-started)
- [ ] [@headlessui-react -> hooks](https://github.com/tailwindlabs/headlessui/tree/main/packages/%40headlessui-react)

## Try to use / implement / install:

- typescript
  - [ ] [ts-reset](https://github.com/total-typescript/ts-reset)
  - [ ] own compose func
  - [ ] [match-sorter](https://github.com/kentcdodds/match-sorter)
  - [ ] [VeritasSoftware/ts.validator](https://github.com/VeritasSoftware/ts.validator)
  - [ ] TypedObject (like using Object.keys() but typed version)
  - [ ] URL Builder (TS Class)
  - [ ] CacheManager
    ```ts
    export interface Cache<T> {
      get: (key: string) => T | undefined;
      set: (key: string, value: T) => void;
      clone: <U>(transform: (elem: T) => U) => Cache<U>;
    }
    ```
  - [ ] implement a simple DOM wrapper to support method chaining like jQuery
    ```ts
    $('#button')
      .css('color', '#fff')
      .css('backgroundColor', '#000')
      .css('fontWeight', 'bold')
    ```
  - [ ] create utils/time package
    ```ts
    export const Millisecond = 1;
    export const Second = 1000 * Millisecond;
    export const Minute = 60 * Second;
    export const Hour = 60 * Minute;
    export const Day = 24 * Hour;
    export const Week = 7 * Day;
    export const Month = 4 * Week;
    ```
  - [ ] abstract recursive function
    ```ts
    export const recursive = (options: {
      data: unknown;
      condition: (item: unknown) => boolean;
      callback: (data: unknown) => void
    }) => {
      // ...
    }
    ```
- html/react
  - [ ] [lightGallery](https://www.lightgalleryjs.com/)
  - [ ] [Swup - a versatile and extensible page transition library](https://github.com/swup/swup)
  - [ ] "site screensaver"
- html:
  - [x] [jumping link hovers](https://codepen.io/devsendjin/pen/ExyWYwz)
  - [ ] [floating paralax headers](https://codepen.io/amit_sheen/pen/BaJmWWj)
  - [ ] [css black-white text v1](https://codepen.io/havardob/pen/PoPaWaE)
  - [ ] [css black-white text v2](https://codepen.io/RickyMarou/pen/dyoMXYR)
  - [ ] [text undeline](https://codepen.io/iam_aspencer/pen/qvNPBv)
  - [ ] [text reveal animation](https://codepen.io/sedran/pen/GYPevV)
  - [ ] [letters show/hide animation effect](https://codepen.io/esse/pen/qxmqPQ)
  - [ ] [peeled text transformation](https://codepen.io/Moiety/pen/OPPKMr)
  - [ ] [neon text hover](https://codepen.io/primaapriansyah/pen/DjEFq/)
  - [ ] [skewed blockquote](https://codepen.io/mkstix6/pen/ERLLvb)
  - [ ] [Paralax on mouse move](https://codepen.io/Johnmuir2001/pen/rNWWegg)
  - [ ] [Pace progress](https://codebyzach.github.io/pace/)
- react:
  - hooks:
    - [ ] [use-debounce](https://github.com/xnimorz/use-debounce)
  - UI:
    - [ ] [react-custom-scroll](https://github.com/rommguy/react-custom-scroll)
    - [ ] [react-resizable-panels](https://github.com/bvaughn/react-resizable-panels)
    - [ ] [color picker](https://github.com/casesandberg/react-color)
    - [ ] [Cleave.js (format input text)](https://github.com/nosir/cleave.js)
    - [ ] [Virtuoso (virtualized scroll)](https://virtuoso.dev/)
    - [ ] [kbar (browser CLI)](https://github.com/timc1/kbar)
    - [ ] winbox - [demo](https://nextapps-de.github.io/winbox/) | [github](https://github.com/nextapps-de/winbox) | [react](https://github.com/rickonono3/react-winbox)
    - [ ] [floating-ui](https://github.com/floating-ui/floating-ui)
    - [ ] [muuri | JS layout engine | responsive, sortable, filterable, draggable and/or animated](https://github.com/haltu/muuri)
    - [ ] [harryheman/react-gsap](https://github.com/harryheman/blog-posts/tree/master/react-gsap)
    - [ ] dndkit - [dndkit](https://dndkit.com/) | [github](https://github.com/clauderic/dnd-kit)
  - tools:
    - [ ] [Recoil](https://recoiljs.org/)
    - [ ] [socket.io](https://socket.io/)
    - [ ] [plop.js (component scaffold generator)](https://github.com/plopjs/plop)
    - [ ] [localForage](https://dndkit.com/)
- tools / CLI:
  - [ ] [pre-commit](https://github.com/observing/pre-commit)
  - [ ] [commitizen/cz-cli](https://github.com/commitizen/cz-cli)
  - [ ] [nodegit](https://github.com/nodegit/nodegit)
  - [ ] [node-glob](https://github.com/isaacs/node-glob)
  - [ ] [consola](https://github.com/unjs/consola)
  - [ ] [single-spa](https://github.com/single-spa/single-spa)
